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

namespace Articulations 
{
	const articulationHandler = Synth.getMidiProcessor("articulationHandler");
	const ROW_HEIGHT = 38;
	const ROW_SPACE = 7;
	reg componentProperties = [];
	
	const broadcasters = {};
	
	broadcasters.articulationChanged = Engine.createBroadcaster({
		"id": "Articulation Changed",
		"args": ["index"]
	});

	// vptArticulations
	const vptArticulations = Content.getComponent("vptArticulations");
	
	// Viewport Parent
	const parent = Content.getComponent(vptArticulations.get("parentComponent"));
	
	// pnlArticulationList
	const pnlArticulationList = Content.getComponent("pnlArticulationList");
	pnlArticulationList.data.hover = -1;
	pnlArticulationList.setControlCallback(onpnlArticulationListControl);
	
	inline function onpnlArticulationListControl(component, value)
	{
		changeArticulation(value);
		articulationHandler.setAttribute(articulationHandler.knbArticulation, value);
	}
	
	pnlArticulationList.setPaintRoutine(function(g)
	{
        var arts = Patches.getCurrentPatch().articulations.active;
        var ks = Configuration.keySwitches;
		var radius = this.get("borderRadius");
		
		for (i = 0; i < arts.length; i++)
		{
			var artIndex = arts[i];
			var art = Manifest.articulations[artIndex];

			var a = [0, i * (ROW_HEIGHT + ROW_SPACE), this.getWidth(), ROW_HEIGHT];

			if (this.getValue() == artIndex)
				g.setColour(this.get("itemColour"));
			else
				g.setColour(Colours.withAlpha(this.get("bgColour"), this.data.hover == i ? 1.0 : 0.6));

			g.fillRoundedRectangle(a, radius);
			
			if (this.getValue() == artIndex)
			{
				g.setColour(this.get("itemColour2"));
				g.fillRoundedRectangle([a[0], a[1], 5, a[3]], {CornerSize: radius, Rounded:[1, 0, 1, 0]});
			}

			g.setColour(Colours.withAlpha(this.get("textColour"), this.getValue() == artIndex ? 1.0 : 0.7));

			// Articulation name
			var text = art.label != undefined ? art.label : art.id;
			g.setFont("medium", 18);
			g.drawAlignedText(text, [a[0] + 10, a[1], a[2], a[3]], "left");
                
			// Keyswitch
			g.setFont("regular", 14);
			if (ks != undefined && ks[i] != undefined)
				g.drawAlignedText(Engine.getMidiNoteName(ks[i]), [a[0], a[1], a[2] - 35, a[3]], "right");

			// Tooltip
			if (this.data.hover == artIndex)
			{
				if (isDefined(art.comment))
					this.set("tooltip", art.comment);
				else
					this.set("tooltip", "");
			}		
		}
	});
	
	pnlArticulationList.setMouseCallback(function(event)
	{
		var arts = Patches.getCurrentPatch().articulations.active;
        var value = Math.floor(event.y / this.getHeight() * arts.length);
        
        this.data.hover = event.hover ? arts[value] : -1;

        if (event.clicked)
        {
            this.setValue(arts[value]);
            this.changed();
        }
        else
        {
        	this.repaint();
        }
	});
	
	// slpArticulationGain
	const slpArticulationGain = Content.getComponent("slpArticulationGain");
	global g_slpArticulationGainSliderPackData = Engine.createAndRegisterSliderPackData(0);
	slpArticulationGain.referToData(g_slpArticulationGainSliderPackData);
	
    // pnlArticulationGain
    const pnlArticulationGain = Content.getComponent("pnlArticulationGain");
	
	pnlArticulationGain.setPaintRoutine(function(g)
	{
        var arts = Patches.getCurrentPatch().articulations.active;
		var radius = this.get("borderRadius");
		
		for (i = 0; i < arts.length; i++)
		{
			var a = this.data.sliders[i];
			
			if (isDefined(a))
			{
				var v = slpArticulationGain.getSliderValueAt(arts[i]);
				var h = a[3] * v - 4 * v;
				var y = a[1] + a[3] - a[3] * v - 2 + 4 * v;
	
				g.setColour(this.get("bgColour"));
				g.fillRoundedRectangle(a, radius);
	
				g.setColour(this.get("itemColour"));				
				g.fillRoundedRectangle([a[0] + 2, y, a[2] - 4, h], {CornerSize: radius / 2, Rounded:[v == 1, v == 1, 1, 1]});
			}
		}

	});
	
	pnlArticulationGain.setMouseCallback(function(event)
	{
		var arts = Patches.getCurrentPatch().articulations.active;
		var index =  parseInt(event.y / (ROW_HEIGHT + ROW_SPACE));
		var art = Manifest.articulations[index];
		var text = art.label != undefined ? art.label : art.id;

		this.set("tooltip", text + " volume");

        if (event.clicked)
        {
            this.data.index = index;
            this.data.downValue = slpArticulationGain.getSliderValueAt(this.data.index);
        }
        
        if (event.doubleClick)
        {
            slpArticulationGain.setSliderAtIndex(arts[this.data.index], 1);
            this.repaint();
        }

        if (event.drag)
        {
            var a = this.data.sliders[this.data.index];

            // Calculate the distance using diagonal drag support
             var dragDistance = event.dragX + -1.0 * event.dragY;
        
            // Calculate the sensitivity value based on the value range
            var dragSensitivity = 40 / (this.get("max") - this.get("min"));

            var normalizedDistance = dragDistance / dragSensitivity;
        
            // Calculate the new value (limit it to the given range)
            var value = Math.range(this.data.downValue + normalizedDistance, this.get("min"), this.get("max"));
        
            slpArticulationGain.setSliderAtIndex(arts[this.data.index], value);
            this.repaint();
        }  
	});
	
	// Functions
	inline function init()
	{
		local arts = Patches.getCurrentPatch().articulations.active;
		local pHeight = arts.length * (ROW_HEIGHT + ROW_SPACE) - ROW_SPACE;
		
		if (pHeight > vptArticulations.getHeight())
		{
			vptArticulations.set("width", parent.getWidth() - 20);
			pnlArticulationList.set("width", parent.getWidth() - 35);
		}			
		else
		{
			vptArticulations.set("width", parent.getWidth() - 20);
			pnlArticulationList.set("width", parent.getWidth() - 20);
		}

		pnlArticulationList.set("height", pHeight);
        pnlArticulationGain.setPosition(pnlArticulationList.getWidth() - 20, 0, 20, pHeight);
        
        updateGainSliderAreas();
        componentProperties = getComponentProperties();

        changeArticulation(pnlArticulationList.getValue());
        articulationHandler.setAttribute(articulationHandler.knbArticulation, pnlArticulationList.getValue());
        
        pnlArticulationList.repaint();
        pnlArticulationGain.repaint();
	}
	
	inline function changeArticulation(index)
	{
		local art = Manifest.articulations[index];
		local disabledComponents = getDisabledComponents(index);

		pnlArticulationList.setValue(index);
		pnlArticulationList.repaint();

		Configuration.setComponentProperties(componentProperties[index]);

		// Update envelope
		if (isDefined(art.ahdsr) && art.ahdsr != false)
			Envelope.setProcessorId(art.ahdsr);

		Envelope.restoreFromSliderPack(index);

		Configuration.setKeyColours(index);

		// Disable components that are not used
		Configuration.enableAllComponents(disabledComponents);

		broadcasters.articulationChanged.sendAsyncMessage(index);
	}
	
	inline function getComponentProperties()
	{
		local result = [];		
		local patch = Patches.getCurrentPatch();

		for (art in Manifest.articulations)
		{
			if (isDefined(art.components))
				result.push(art.components);
			else if (isDefined(patch.components))
				result.push(patch.components);
			else if (isDefined(Manifest.components))
				result.push(Manifest.components);
		}

		return result;
	}
	
	inline function getDisabledComponents(index)
	{
		local result = [];
		local patch = Patches.getCurrentPatch();
		local art = Manifest.articulations[index];
		
		if (isDefined(patch.disabledComponents))
			result = patch.disabledComponents;
			
		if (isDefined(art.disabledComponents))
		{
			for (x in art.disabledComponents)
				result.pushIfNotAlreadyThere(x);
		}

		return result;
	}

	inline function updateViewportPosition(index)
	{
		local numArts = Patches.getCurrentPatch().articulations.active.length;
		local y = 1 / (numArts - 1) * index;

		vptArticulations.set("viewPositionY", y);
	}
	
	/*
	* Get the current articulation index
	*
	* @return	int    The value of pnlArticulationList
	*/
	inline function getCurrent()
	{
		return pnlArticulationList.getValue();
	}

    inline function updateGainSliderAreas()
    {
		local p = pnlArticulationGain;
        local h = ROW_HEIGHT - 8;
        local w = p.getWidth() / 2;
        
        p.data.sliders = [];

        for (i = 0; i < Manifest.articulations.length; i++)
        {
            local x = p.getWidth() / 2;
            local y = (i * (ROW_HEIGHT + ROW_SPACE)) + ROW_HEIGHT / 2 - h / 2;
            local a = [w / 2, y, w, h];
            p.data.sliders.push(a);
        }
    }
    
	inline function onNoteOnHandler(note)
	{
		local arts = Patches.getCurrentPatch().articulations.active;
		local index = Configuration.keySwitches.indexOf(note);

		if (index != -1 && index != pnlArticulationList.getValue())
		{
			changeArticulation(arts[index]);
			updateViewportPosition(index);
		}
    }

    inline function onControllerHandler(ccValue)
    {
		local arts = Patches.getCurrentPatch().articulations.active;

		for (i in arts)
		{
			if (ccValue == Manifest.articulations[i].program)
			{
				if (i != pnlArticulationList.getValue())
				{
					changeArticulation(arts[i]);
					updateViewportPosition(index);
				}

				break;
			}
		}
    }
}
