/*
    Copyright 2021, 2022 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

namespace Configuration
{
	const keyRanges = [];
	const keySwitches = [];	
	const allComponents = getAllComponentsArrangedById();
	
	// masterChain
	const containerIds = Synth.getIdList("Container");
	const masterChain = Synth.getChildSynth(containerIds[0]);	

	// Midi Muters
	const masterMuter = Synth.getMidiProcessor("masterMidiMuter");
	const muterIds = Synth.getIdList("MidiMuter");
	const muters = [];
	
	for (id in muterIds)
	{
		if (id != "masterMidiMuter")
			muters.push(Synth.getMidiProcessor(id));
	}

	// MIDI Processors
	const noteRangeFilter = [];
	const processorIds = Synth.getIdList("Script Processor");
	const scriptProcessors = [];

	for (id in processorIds)
	{
		scriptProcessors.push(Synth.getMidiProcessor(id));
		
		if (id.indexOf("oteRangeFilter") != -1)
			noteRangeFilter.push(Synth.getMidiProcessor(id));			
	}	    
	     
	const processorAttributeIds = getAttributeIds(scriptProcessors);
	
	// Modulators
	const modulatorIds = [];
	const modulators = [];
	
	for (m in Synth.getAllModulators(""))
	{
	    var id = m.getId();
	
	    if (m.getType() == "ModulatorChain") continue;
	
	    modulatorIds.push(id);
	    modulators.push(m);
	}
	
	const modulatorAttributeIds = getAttributeIds(modulators);
		
	// Effects
	const effectIds = [];
	const effects = [];
	const mixerGain = [];

	for (e in Synth.getAllEffects(""))
	{
	    effectIds.push(e.getId());
    	effects.push(e);

	    if (e.getId().indexOf("mixerGain") != -1)
	    	mixerGain.push(e);
	}    
	
	const effectAttributeIds = getAttributeIds(effects);
		
	// Samplers
	const samplerIds = Synth.getIdList("Sampler");
	const samplers = [];
	const samplerTables = [];

	for (id in samplerIds)
	{
		samplers.push(Synth.getChildSynth(id));
		samplerTables.push(Synth.getTableProcessor(id));
	}

	const samplerAttributeIds = getAttributeIds(samplers);

	// Functions
    inline function getAttributeIds(modules)
    {
        local result = {};
        local i;
        
        for (m in modules)
        {
            result[m.getId()] = [];
            
            for (i = 0; i < m.getNumAttributes(); i++)
                result[m.getId()].push(m.getAttributeId(i));
        }
        
        return result;
    }
    
    inline function toggleModulesBypass(modules, ignoreIds, state)
    {
        for (m in modules)
        {
            if (ignoreIds.contains(m.getId()) != -1) continue;
            m.setBypassed(state);
        }
    }
    
    inline function bypassAllModules()
    {
        toggleModulesBypass(scriptProcessors, ["Interface"], true);
        toggleModulesBypass(modulators, [], true);
        toggleModulesBypass(effects, [], true);
    }
    
    inline function enableAllModules()
    {
        toggleModulesBypass(scriptProcessors, ["Interface"], false);
        toggleModulesBypass(modulators, [], false);
        toggleModulesBypass(effects, [], false);
    }
    
    inline function setAttributes(modules, moduleIds, attributeIds, data)
    {
        Console.assertTrue(Array.isArray(data));

        for (d in data)
        {
            local props = d.properties;
            local index = moduleIds.indexOf(d.id);

            if (index != -1)
            {
                // Enable the module
                if (modules[index].isBypassed())
	                modules[index].setBypassed(false);

                // Get attribute Ids
                local id = d.id;
                local attributes = attributeIds[id];

                // Set attribute values
                if (props != undefined)
                {
                    for (p in props)
                    {
                        if (!attributes.contains(p) && !["Bypass", "Intensity", "File", "Table"].contains(p)) continue;

                        if (p == "Bypass")
                            modules[index].setBypassed(props[p]);
                        else if (p == "Gain" && samplerIds.contains(id))
                            modules[index].setAttribute(attributes.indexOf(p), Engine.getGainFactorForDecibels(props[p]));
                        else if (p == "Intensity")
                            modules[index].setIntensity(props[p]);
						else if (p == "File" && props[p] != "")
							Synth.getAudioSampleProcessor(modules[index].getId()).setFile(Expansions.getWildcardReference(props[p]));							
						else if (p == "Table")
							modules[index].asTableProcessor().restoreFromBase64(props[p][0], props[p][1]);
                        else if (attributes.contains(p))
	                        modules[index].setAttribute(attributes.indexOf(p), props[p]);                    
                    }
                }
            }
            else
            {
                Console.print("Missing Module: " + d.id);
            }
        }
    }
    
    inline function loadSampleMaps(data)
    {
		if (!isDefined(data))
			return;
        	
		// Get IDs of samplers used by patch
		local patchSamplerIds = [];

		for (x in data)
			patchSamplerIds.push(x.id);

		local missingSamples = [];

		for (i = 0; i < samplerIds.length; i++)
		{
			local id = samplerIds[i];
			local s = samplers[i];
        
			if (patchSamplerIds.contains(id))
			{
				local sampleMap = data[patchSamplerIds.indexOf(id)].properties.SampleMap;

				if (!isDefined(sampleMap))
					return Console.print("Sample Map is undefined");

				s.setBypassed(false);
				s.asSampler().loadSampleMap(sampleMap);
				setCrossfadeTables(i, data[patchSamplerIds.indexOf(id)].properties.Crossfade);
				
				continue;	
			}

			s.setBypassed(true);
			s.asSampler().clearSampleMap();
			s.setAttribute(s.VoiceAmount, 1);
			s.setAttribute(s.VoiceLimit, 1);
		}		
    }
    
    inline function setCrossfadeTables(samplerIndex, crossfadeData)
    {
		local data = crossfadeData;
		
		if (!isDefined(data) && isDefined(Manifest.samplers[0].properties.Crossfade))
			data = Manifest.samplers[0].properties.Crossfade;

		if (isDefined(data))
		{
			for (i = 0; i < data.length; i++)
				samplerTables[samplerIndex].restoreFromBase64(i, data[i]);
		}
    }
    
	inline function setAllMutersIgnoreState(state)
	{
        for (m in muters)
            m.setAttribute(m.ignoreButton, state);
	}
	
	inline function setKeyColours(index)
	{
		local kr = keyRanges[index];

		for (i = 0; i < 128; i++)
			Engine.setKeyColour(i, 0);
	
		if (isDefined(kr))
		{
			for (r in kr)
	       	{
				for (i = 0; i < 128; i++)
				{
					if (i >= r[0] && i <= r[1])
					{
						if ((isDefined(r[3]) && r[3] && isBlackKey(i)) || (!isDefined(r[3]) || !r[3]))
							Engine.setKeyColour(i, r[2]);						
					}						
				}
			}
		}
	}
	
	inline function isBlackKey(n)
	{
		local blackKeys = [1, 3, 6, 8, 10];
		return blackKeys.indexOf(parseInt(n) % 12) != -1;
	}

	// Called from articulation handler
	inline function setNoteRangeFilter(index)
	{
		local kr = keyRanges[index];

		for (i = 0; i < noteRangeFilter.length; i++)
		{
			if (!isDefined(kr[0][0]) || !isDefined(kr[0][1])) continue;

			noteRangeFilter[i].setAttribute(noteRangeFilter[i].LowNote, kr[0][0]);
			noteRangeFilter[i].setAttribute(noteRangeFilter[i].HighNote, kr[0][1]);
		}
	}
	
	inline function enableAllComponents(disabled)
	{		
		local ignore = ["fltAudioSettings"];

		for (c in Content.getAllComponents(""))
		{
			local id = c.getId();

			if (ignore.contains(id) || id.contains("knbGain")) continue;
			c.set("enabled", !disabled.contains(id));

			if (c.get("type") == "ScriptPanel")
				c.repaint();
		}			
	}
	
	inline function getAllComponentsArrangedById()
	{
		local result = {};
		
		for (c in Content.getAllComponents(""))
			result[c.getId()] = c;
			
		return result;
	}	
	
	inline function setComponentProperties(data)
	{
		if (!isDefined(data) || data.length == 0)
			return;

		for (component in data)
		{
			if (!isDefined(component.id) || !isDefined(component.properties))
				continue;

			local c = allComponents[component.id];
			
			if (!isDefined(c)) continue;
			
			for (property in component.properties)
				c.set(property, component.properties[property]);

			c.sendRepaintMessage();				
		}
	}
	
	inline function updateKeyRanges(patch)
	{
		local patchArts = patch.articulations;

		keyRanges.clear();
	
		for (i = 0; i < patchArts.active.length; i++)
		{
			local range = [];

			if (isDefined(patch.keyRanges))
				range = patch.keyRanges.clone();
			else if (isDefined(Manifest.keyRanges))
				range = Manifest.keyRanges.clone();

			keyRanges[patchArts.active[i]] = range;

			if (isDefined(patchArts.keyRanges[i]))
			{
				for (j = 0; j < patchArts.keyRanges[i].length; j++)
					range[j] = patchArts.keyRanges[i][j];
			}
			else if (isDefined(Manifest.articulations[patchArts.active[i]].keyRanges))
			{
				for (j = 0; j < Manifest.articulations[patchArts.active[i]].keyRanges.length; j++)
					range[j] = Manifest.articulations[patchArts.active[i]].keyRanges[j];
			}
		}
	}
	
	inline function updateKeySwitches(patch)
	{
		keySwitches.clear();
	
		local firstKs = patch.firstKs;
		local numArts = patch.articulations.active.length;
	
        for (i = 0; i < numArts; i++)
            keySwitches.push(firstKs + i);
	}

	inline function loadDefaults()
	{
		for (x in samplers)
		{
			x.setBypassed(true);
			x.asSampler().clearSampleMap();
			x.setAttribute(x.VoiceAmount, 1);
			x.setAttribute(x.VoiceLimit, 1);
		}
				
		for (x in effects)
		{
			if (x.getId().indexOf("Convolution") != -1)
				Synth.getAudioSampleProcessor(x.getId()).setFile("");
		}
	}
	
	// Helpers
	inline function setMidiProcessorAttributes(data)
	{
		if (isDefined(data))
	    	setAttributes(scriptProcessors, processorIds, processorAttributeIds, data);
	}
	
	inline function setModulatorAttributes(data)
	{
		if (isDefined(data))
	    	setAttributes(modulators, modulatorIds, modulatorAttributeIds, data);
	}
	
	inline function setEffectAttributes(data)
	{
		if (isDefined(data))
	    	setAttributes(effects, effectIds, effectAttributeIds, data);
	}
	
	inline function setSamplerAttributes(data)
	{
		if (isDefined(data))
			setAttributes(samplers, samplerIds, samplerAttributeIds, data);	    	
	}
	
	inline function setMasterMuter(state)
	{
		masterMuter.setAttribute(masterMuter.ignoreButton, state);
	}
}
