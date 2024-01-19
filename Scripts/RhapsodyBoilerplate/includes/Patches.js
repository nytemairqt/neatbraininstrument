/*
    Copyright 2021, 2022, 2023 David Healey

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

namespace Patches
{
	const articulationHandler = Synth.getMidiProcessor("articulationHandler");
	reg lastPatch = -1;

	// knbPatch
	const knbPatch = Content.getComponent("knbPatch");
	knbPatch.setControlCallback(onknbPatchControl);
	
	inline function onknbPatchControl(component, value)
	{
		changePatch(value);
	}
		
	// Functions
	inline function changePatch(index)
	{
		local patch = Manifest.patches[index];
		
		if (!isDefined(patch))
			return;

		if (index == lastPatch)
			return;

		articulationHandler.setAttribute(articulationHandler.knbPatch, index);
	
		Configuration.enableAllModules();
	
		// Apply manifest level settings
		Configuration.setMidiProcessorAttributes(Manifest.scripts);
		Configuration.setModulatorAttributes(Manifest.modulators);
		Configuration.setEffectAttributes(Manifest.effects);
		Configuration.setSamplerAttributes(Manifest.samplers);
		Configuration.setComponentProperties(Manifest.components);

		// Apply patch level settings
		Configuration.setMidiProcessorAttributes(patch.scripts);
		Configuration.setModulatorAttributes(patch.modulators);
		Configuration.setEffectAttributes(patch.effects);
		Configuration.setSamplerAttributes(patch.samplers);
		Configuration.setComponentProperties(patch.components);
	
		Configuration.updateKeySwitches(patch);
		Configuration.updateKeyRanges(patch);	

		if (isDefined(Articulations.init))
			Articulations.init();
			
		Configuration.setMasterMuter(false);
		
		local samplerData;

		if (isDefined(Manifest.patches[index].samplers))
			samplerData = Manifest.patches[index].samplers;
		else if (isDefined(Manifest.samplers))
			samplerData = Manifest.samplers;

		if (isDefined(samplerData))
			Configuration.loadSampleMaps(samplerData);
			
		lastPatch = index;
	}

	/*
	* Returns the current patch
	*
	* @return    object    The patch
	*/
	inline function getCurrentPatch()
	{
		return Manifest.patches[knbPatch.getValue()];
	}
	
	/*
	* Returns the index of the current patch
	*
	* @return	int    The value of knbPatch
	*/
	inline function getPatchIndex()
	{
		return knbPatch.getValue();
	}
	
	/*
	* Sets the value of knbPatch and triggers its callback.
	*
	* @value    int    The value to assign.
	*/
	inline function set(value)
	{
		knbPatch.setValue(value);
		knbPatch.changed();
	}
}
