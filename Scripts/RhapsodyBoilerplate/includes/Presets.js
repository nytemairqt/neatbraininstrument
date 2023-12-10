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

namespace Presets
{
	reg expansionIndex = -1;
	reg masterGainValue;
	reg currentPresetFile;

	const uph = Engine.createUserPresetHandler();

	uph.setPreCallback(function(presetData)
	{
		 if (!uph.isInternalPresetLoad())
			masterGainValue = Footer.knbMasterGain.getValue();
	});

	uph.setPostCallback(function(presetFile)
	{
		if (!uph.isInternalPresetLoad() && isDefined(masterGainValue))
		{
			Footer.knbMasterGain.setValue(masterGainValue);
			Footer.knbMasterGain.changed();
		}

		currentPresetFile = presetFile;
		updatePresetLabel();
	});
    
    // pnlPresetDisplay
    const pnlPresetDisplay = Content.getComponent("pnlPresetDisplay");
    
    pnlPresetDisplay.setPaintRoutine(function(g)
    {
		var a = this.getLocalBounds(0);
		var radius = this.get("borderRadius");
		
		g.setColour(this.get("bgColour"));
		g.fillRoundedRectangle(a, radius);
    });

	// pnlPresetBrowserContainer
	const pnlPresetBrowserContainer = Content.getComponent("pnlPresetBrowserContainer");
    
    pnlPresetBrowserContainer.setPaintRoutine(function(g)
    {
		var a = [pnlPresetBrowser.get("x"), pnlPresetBrowser.get("y"), pnlPresetBrowser.getWidth(), pnlPresetBrowser.getHeight()];
		
		g.fillAll(this.get("bgColour"));

		g.drawDropShadow(a, Colours.withAlpha(Colours.black, 0.8), 20);
    });
    
    pnlPresetBrowserContainer.setMouseCallback(function(event)
    {
		if (event.clicked)
			hide();
    });
    
    // pnlPresetBrowser
    const pnlPresetBrowser = Content.getComponent("pnlPresetBrowser");
    
    pnlPresetBrowser.setPaintRoutine(function(g)
    {
	   var a = this.getLocalBounds(0);
	   
	   g.setColour(this.get("bgColour"));	   
	   g.fillRoundedRectangle(a, this.get("borderRadius"));
    });

    // pnlPresetNotesBlocker
    const pnlPresetNotesBlocker = Content.getComponent("pnlPresetNotesBlocker");

    pnlPresetNotesBlocker.setPaintRoutine(function(g)
    {
		var titles = this.data.titles;

        g.fillAll(this.get("bgColour"));

        g.setColour(this.get("textColour"));
        g.setFont("bold", 16 + 3 * (Engine.getOS() == "WIN"));

		for (i = 0; i < titles.length; i++)
		{
			var w = this.getWidth() / titles.length;
			var x = w * i + (4 * i);

			if (titles.length == 2 && i == 1)
				w = w * 3;
			
			g.setColour(this.get("textColour"));
			g.drawAlignedText(titles[i], [x, 0, w, this.getHeight()], "centred");
		}
    });
    
    // btnPresetBrowserClose
    const btnPresetBrowserClose = Content.getComponent("btnPresetBrowserClose");
    btnPresetBrowserClose.setLocalLookAndFeel(LookAndFeel.filledIconButton);
    btnPresetBrowserClose.setControlCallback(onbtnPresetBrowserCloseControl);
    
    inline function onbtnPresetBrowserCloseControl(component, value)
    {
	    if (!value)
	    	hide();
    }
    
    // fltPresetBrowser
    const fltPresetBrowser = Content.getComponent("fltPresetBrowser");
    fltPresetBrowser.setLocalLookAndFeel(LookAndFeel.presetBrowser);
    
    // Broadcaster
    const bc = Engine.createBroadcaster({"id": "PresetBrowser", "args": [component, obj]});
    
    bc.attachToComponentMouseEvents(["fltPresetBrowser", "btnPreset0", "btnPreset1"], "Clicks Only", "");
    
    bc.addListener("mouseAction", "Mouse action for preset browser", function(component, event)
    {
		if (!event.mouseUp)
		{
			if (!isDefined(event.columnIndex))
				return;

			switch (event.columnIndex)
			{					
				case 2: // Presets
					if (event.doubleClick)
						hide();
					break;
			}
			
			return;
		}
		
		if (event.mouseUp)
		{
			if (event.target == "favoriteButton")
				setTitles(event.buttonState);
		}
    });
    
    // btnPresetBrowser
    const btnPresetBrowser = Content.getComponent("btnPresetBrowser");
    btnPresetBrowser.setValue(parseInt(pnlPresetBrowserContainer.get("visible")));
    btnPresetBrowser.setControlCallback(onbtnPresetBrowserControl);    

    inline function onbtnPresetBrowserControl(component, value)
    {		
		value ? show() : hide();
    }

	const lafbtnPresetBrowser = Content.createLocalLookAndFeel();
	btnPresetBrowser.setLocalLookAndFeel(lafbtnPresetBrowser);

    lafbtnPresetBrowser.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;

		g.fillAll(0x0);
				
		g.setFont("bold", 18 + 2 * (Engine.getOS() == "WIN"));
		g.setColour(Colours.withAlpha(obj.textColour, obj.over ? 1.0 : 0.8));
		g.drawAlignedText(obj.text, [a[0] + 10, a[1], a[2], a[3]], "left");
    });

    // btnPreset - previous/next preset buttons
    const btnPreset = [];

    for (i = 0; i < 2; i++)
    {
        btnPreset.push(Content.getComponent("btnPreset" + i));
        btnPreset[i].setLocalLookAndFeel(LookAndFeel.iconButton);
        btnPreset[i].setControlCallback(onbtnPresetControl);
    }
    
    inline function onbtnPresetControl(component, value)
    {
		if (value || Patches.getPatchIndex() == -1)
			return;

        local index = btnPreset.indexOf(component);

		index == 0 ? Engine.loadPreviousUserPreset(false) : Engine.loadNextUserPreset(false);
    }
    
    // btnPresetSave
    const btnPresetSave = Content.getComponent("btnPresetSave");
    btnPresetSave.setLocalLookAndFeel(LookAndFeel.iconButton);
    btnPresetSave.setControlCallback(onbtnPresetSaveControl);
    
    inline function onbtnPresetSaveControl(component, value)
    {
	    if (value)
	    	return;
	    	
	    savePreset();
    }
   
    // Functions    
    inline function updatePresetLabel()
    {
		if (!isDefined(currentPresetFile))
			return;

		local category = currentPresetFile.getParentDirectory().toString(currentPresetFile.NoExtension);
		local name = currentPresetFile.toString(currentPresetFile.NoExtension);

		btnPresetBrowser.set("text", category + " | " + name);
    }

    inline function show()
    {
        pnlPresetBrowserContainer.fadeComponent(true, 100);
       	btnPresetBrowser.setValue(true);
		btnPresetBrowserClose.setValue(true);
    }
    
    inline function hide()
    {
		pnlPresetBrowserContainer.fadeComponent(false, 100);
		btnPresetBrowser.setValue(false);
    }
    
    inline function setTitles(favourites)
    {
		if (favourites)
			pnlPresetNotesBlocker.data.titles = ["FAVOURITES"];
		else
			pnlPresetNotesBlocker.data.titles = ["BANK", "CATEGORY", "PRESET"];

		pnlPresetNotesBlocker.repaint();
    }
        
    inline function savePreset()
    {
	    local presetName = Engine.getCurrentUserPresetName();
	    local isReadOnly = false;

	    if (isDefined(currentPresetFile))
	    	isReadOnly = Engine.isUserPresetReadOnly(currentPresetFile);	    	

	   	if (isDefined(presetName) && presetName != "" && !isReadOnly)
	   		overwriteCurrentPreset(presetName);
	   	else
	   		createNewPreset();
    }
    
    inline function overwriteCurrentPreset(presetName)
    {
	    Engine.showYesNoWindow("Overwrite Preset", "Do you want to overwrite the current preset?", function[presetName](response)
	    {
			if (response)
				Engine.saveUserPreset(presetName);
			else
				createNewPreset();
	    });
    }
    
    inline function createNewPreset()
    {
		local userPresetsFolder = Expansions.getCurrentUserPresetsFolder();

		if (!isDefined(userPresetsFolder))
			return;

	    FileSystem.browse(userPresetsFolder, true, "*.preset", function[userPresetsFolder](f)
	    {
			var grandparent = f.getParentDirectory().getParentDirectory().getParentDirectory();

			if (!userPresetsFolder.isSameFileAs(grandparent))
				return Engine.showMessageBox("Invalid Location", "Presets must be saved in a bank and category folder within the instrument's user presets folder.", 0);

			var isReadOnly = Engine.isUserPresetReadOnly(f);
			
			if (isReadOnly)
				return Engine.showMessageBox("Read Only", "The selected preset is read-only. Please create a new preset.", 0);

			Engine.saveUserPreset(f.toString(f.FullPath).replace(".preset"));

			currentPresetFile = f;
			updatePresetLabel();
	    });
    }
    
    // Function calls
    setTitles(false);
}

