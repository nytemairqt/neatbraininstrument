/*
    Copyright 2021, 2022, 2023 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

include("Manifest.js");
include("RhapsodyBoilerplate/includes/Configuration.js");

const Interface = Synth.getMidiProcessor("Interface");

reg data;
reg lastArticulation = 0;

// knbPatch
const knbPatch = Content.addKnob("knbPatch", 0, 0);
knbPatch.set("text", "Patch");
knbPatch.setRange(-1, 100, 1);
knbPatch.setControlCallback(onknbPatchControl);

inline function onknbPatchControl(component, value)
{
	if (value != -1)
	{
		local patch = Manifest.patches[value];
	
		Configuration.updateKeySwitches(patch);
		Configuration.updateKeyRanges(patch);
		data = getData(patch);
	}
}

// knbArticulation
const knbArticulation = Content.addKnob("knbArticulation", 150, 0);
knbArticulation.set("text", "Articulation");
knbArticulation.setRange(0, 100, 1);
knbArticulation.setControlCallback(onknbArticulationControl);

inline function onknbArticulationControl(component, value)
{
	changeArticulation(value);
}

// slpArticulationGain
const slpArticulationGain = Content.addSliderPack("slpArticulationGain", 300, 0);
if (isDefined(g_slpArticulationGainSliderPackData)) slpArticulationGain.referToData(g_slpArticulationGainSliderPackData);
slpArticulationGain.set("min", 0);
slpArticulationGain.set("max", 1);
slpArticulationGain.set("stepSize", 0.01);
slpArticulationGain.set("sliderAmount", 25);
slpArticulationGain.set("width", 128);

// Functions
inline function initialisePatch()
{
	local index = Interface.getAttribute(Interface.knbPatch);
	local patch = Manifest.patches[index];

	data = getData(patch);
	Configuration.updateKeySwitches(patch);
	Configuration.updateKeyRanges(patch);
	knbPatch.setValue(index);
}

initialisePatch();

inline function getArticulationIndexFromId(articulationId)
{
	if (!isDefined(Manifest.articulations))
		return -1;
		
	for (i = 0; i < Manifest.articulations.length; i++)
		if (Manifest.articulations[i].id == articulationId)
			return i;
			
	return -1;
}

inline function getArticulationObjectIds(arrayOfArticulationIndexes, key)
{
	local result = [];
	
	if (!isDefined(Manifest.articulations))
		return result;

	for (i = 0; i < arrayOfArticulationIndexes.length; i++)
	{
		local articulation = Manifest.articulations[arrayOfArticulationIndexes[i]];
	
		if (!isDefined(articulation[key]))
			continue;

		for (x in articulation[key])
			result.pushIfNotAlreadyThere(x.id);
	}

	return result;
}

inline function getObjectIds(object)
{
	local result = [];
	
	if (!isDefined(object))
		return result;
		
	for (x in object)
		result.pushIfNotAlreadyThere(x.id);
	
	return result;
}

inline function getPropertiesForArticulation(articulation, patch, key)
{
	local manifestObjects = {scripts: Manifest.scripts, modulators: Manifest.modulators, effects: Manifest.effects};
	local manifestObjectIds = getObjectIds(manifestObjects[key]);
	local patchObjectIds = getObjectIds(patch[key]);
	local allArticulationObjectIds = getArticulationObjectIds(patch.articulations.active, key);
	local articulationObjectIds = getArticulationObjectIds([getArticulationIndexFromId(articulation.id)], key);
	local result = [];

	if (isDefined(articulation[key]))
		result = articulation[key];

	for (id in allArticulationObjectIds)
	{
		if (articulationObjectIds.contains(id))
			continue;
	
		local object;

		if (isDefined(patch[key]) && patchObjectIds.contains(id))
			object = patch[key][patchObjectIds.indexOf(id)];			
		else if (isDefined(manifestObjects[key]) && manifestObjectIds.contains(id))
			object = manifestObjects[key][manifestObjectIds.indexOf(id)];			

		if (isDefined(object))
			result.push(object);
	}

	return result;
}

inline function getData(patch)
{
	local result = [];

	for (i = 0; i < patch.articulations.active.length; i++)
	{
		local index = patch.articulations.active[i];
		local articulation = Manifest.articulations[index];
		
		result[index] = {scripts: [], modulators: [], effects: []};
		
		result[index].scripts = getPropertiesForArticulation(articulation, patch, "scripts");
		result[index].modulators = getPropertiesForArticulation(articulation, patch, "modulators");
		result[index].effects = getPropertiesForArticulation(articulation, patch, "effects");
	}

	return result;
}

inline function changeArticulation(index)
{
	if (knbPatch.getValue() != -1)
	{
		local patch = Manifest.patches[knbPatch.getValue()];

		Configuration.setMidiProcessorAttributes(data[index].scripts);		
		Configuration.setModulatorAttributes(data[index].modulators);
		Configuration.setEffectAttributes(data[index].effects);

		Configuration.setNoteRangeFilter(index);
		
		lastArticulation = index;

		local art = Manifest.articulations[index];

		if (!isDefined(art) || !isDefined(art.samplers) || !art.samplers.length)
			return;

		// Set muters state
		for (i = 0; i < Configuration.muters.length; i++)
		{
			local m = Configuration.muters[i];
			m.setAttribute(m.ignoreButton, !art.samplers.contains(i));
		}
	}
}

inline function getArticulationGain(index)
{
	local v = slpArticulationGain.getSliderValueAt(index);        
	return (((v - 0) * (0 - -25)) / (1 - 0)) + -25;	
}function onNoteOn()
{
	local n = Message.getNoteNumber();
	local patch = Manifest.patches[knbPatch.getValue()];
	local index = Configuration.keySwitches.indexOf(n);

	if (index != -1 && index != lastArticulation)
	{
		knbArticulation.setValue(patch.articulations.active[index]);
		changeArticulation(patch.articulations.active[index]);
	}
	else
	{
		Message.setGain(getArticulationGain(knbArticulation.getValue()));
	}
}
 function onNoteOff()
{
	Message.setGain(getArticulationGain(knbArticulation.getValue()));
}
 function onController()
{
	local cc = Message.getControllerNumber();
	local cv = Message.getControllerValue();
	local patch = Manifest.patches[knbPatch.getValue()];
	local arts = patch.articulations.active;

	if (cc == 32 || Message.isProgramChange())
	{
		for (i in arts)
		{
			if (ccValue == Manifest.articulations[i].program)
			{
				if (i != lastArticulation)
				{
					knbArticulation.setValue(arts[index]);
					knbArticulation.changed();
				}

				break;
			}
		}
	}
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 