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

namespace UserSettings
{
	// Samplers
	const samplerIds = Synth.getIdList("Sampler");
	const samplers = [];
	
	for (id in samplerIds)
		samplers.push(Synth.getChildSynth(id));

	// pnlSettingsContainer
	const pnlSettingsContainer = Content.getComponent("pnlSettingsContainer");
	
	pnlSettingsContainer.setPaintRoutine(function(g)
	{
		var a = [pnlSettings.get("x"), pnlSettings.get("y"), pnlSettings.getWidth(), pnlSettings.getHeight()];
		
		g.fillAll(this.get("bgColour"));

		g.drawDropShadow(a, Colours.withAlpha(Colours.black, 0.8), 20);
	});
	
	pnlSettingsContainer.setMouseCallback(function(event)
	{
		if (event.clicked)
			hide();
	});
	
	// pnlSettings
	const pnlSettings = Content.getComponent("pnlSettings");

	pnlSettings.setPaintRoutine(function(g)
	{
	    var a = this.getLocalBounds(0);
		var radius = this.get("borderRadius");

		g.setColour(this.get("bgColour"));
		g.fillRoundedRectangle([a[0], a[1], a[2], a[3]], radius);
	
		g.setColour(this.get("itemColour"));
		g.fillRoundedRectangle([a[0], a[1], 175, a[3]], {CornerSize: radius, Rounded:[1, 0, 1, 0]});
		
		g.setColour(this.get("textColour"));
		g.setFont("bold", 22);
		g.drawAlignedText(this.get("text"), [a[0] + 20, a[1] + 15, 175, 25], "left");
		
		g.setFont("regular", 14);
		g.setColour(Colours.withAlpha(Colours.grey, 0.5));
				
		var versionText = Engine.getName() + ": v" + Engine.getVersion();
		var e = Expansions.getCurrent();

		if (isDefined(e))
			versionText = e.getProperties().Name + ": v" + e.getProperties().Version;
				
		g.drawAlignedText(versionText, [a[0], a[3] - 30, 161, 25], "right");
	});

	// pnlSettingsMenu
	const pnlSettingsMenu = Content.getComponent("pnlSettingsMenu");
	pnlSettingsMenu.data.hover = -1;
	pnlSettingsMenu.data.children = [];
	pnlSettingsMenu.data.tabs = [];
	pnlSettingsMenu.setControlCallback(onpnlSettingsMenuControl);
	pnlSettingsMenu.set("bgColour", 0xff2a292e);

	inline function onpnlSettingsMenuControl(component, value)
	{
		changeTab(value);
	}

	for (x in pnlSettings.getChildComponents())
	{
		if (x.get("type") == "ScriptPanel" && x.get("parentComponent") == "pnlSettings")
		{
			if (x.getId() == "pnlSettingsMenu") continue;

			pnlSettingsMenu.data.children.push(x);
			pnlSettingsMenu.data.tabs.push(x.get("text"));
		}
	}
	
	pnlSettingsMenu.setPaintRoutine(function(g)
	{
	    var a = this.getLocalBounds(0);
		var h = a[3] / this.data.tabs.length;
		var radius = this.get("borderRadius");

		for (i = 0; i < this.data.tabs.length; i++)
		{
			var text = this.data.tabs[i];

			if (i == this.getValue() || i == this.data.hover)
			{
				g.setColour(Colours.withAlpha(this.get("bgColour"), i == this.getValue() ? 1.0 : 0.5));
				g.fillRoundedRectangle([a[0], i * h, a[2], h - 10], radius);
				
				if (i == this.getValue())
				{
					g.setColour(this.get("itemColour"));
					g.fillRoundedRectangle([a[0], i * h, 5, h - 10], {CornerSize: radius, Rounded:[1, 0, 1, 0]});
				}
			}

			g.setColour(this.get("textColour"));
			g.setFont("medium", 18);
			g.drawAlignedText(text, [a[0] + 15, i * h, a[2], h - 10], "left");
		}
	});

	pnlSettingsMenu.setMouseCallback(function(event)
	{
		var value = Math.floor(event.y / this.getHeight() * this.data.tabs.length);

		this.data.hover = event.hover && this.data.tabs.length > 1 ? value : -1;

		if (event.clicked && !event.rightClick)
		{
			this.setValue(value);
			this.changed();
		}
		else
		{
			this.repaint();
		}
	});

	// btnSettingsClose
	const btnSettingsClose = Content.getComponent("btnSettingsClose");
	btnSettingsClose.setValue(true);
	btnSettingsClose.setLocalLookAndFeel(LookAndFeel.filledIconButton);
	btnSettingsClose.setControlCallback(onbtnSettingsCloseControl);
	
	inline function onbtnSettingsCloseControl(component, value)
	{
		if (!value)
			hide();
	}

	// btnSettings
	const btnSettings = Content.getComponent("btnSettings");
	btnSettings.setValue(parseInt(pnlSettingsContainer.get("visible")));
	btnSettings.setLocalLookAndFeel(LookAndFeel.iconButton);
	btnSettings.setControlCallback(onbtnSettingsControl);
	
	inline function onbtnSettingsControl(component, value)
	{
		value ? show() : hide();
	}
	
	// pnlSettingsTab
	const pnlSettingsTab = Content.getAllComponents("pnlSettingsTab\\d");

	// pnlSettingsTab0 - General
	pnlSettingsTab[0].setPaintRoutine(function(g)
	{
		var a = this.getLocalBounds(0);	

		g.setColour(this.get("textColour"));
		g.setFont("medium", 16);

		g.drawAlignedText("Lazy Load", [18, btnLazyLoad.get("y"), 120, btnLazyLoad.getHeight()], "right");
		g.drawAlignedText("Tuning", [18, knbCoarseDetune.get("y") - 2, 120, knbCoarseDetune.getHeight() - 2], "right");
		g.drawAlignedText("Transpose", [18, knbTranspose.get("y") - 2, 120, knbTranspose.getHeight() - 2], "right");

		LookAndFeel.drawKnobRange(g, knbCoarseDetune, this, []);
		LookAndFeel.drawKnobRange(g, knbFineDetune, this, []);
		LookAndFeel.drawKnobRange(g, knbTranspose, this, []);
	});

	// pnlSettingsTab1 - Audio
	pnlSettingsTab[1].setPaintRoutine(function(g){});

	// pnlSettingsTab2 - MIDI
	pnlSettingsTab[2].setPaintRoutine(function(g)
	{
		var a = this.getLocalBounds(0);

		g.setFont("bold", 16);
		g.setColour(this.get("textColour"));
		g.drawAlignedText("CHANNELS", [fltMidiChannels.get("x") + 8, a[1], fltMidiChannels.getWidth(), 25], "left");

		if (!Engine.isPlugin())
		{
			g.drawAlignedText("INPUT DEVICES", [fltMidiSources.get("x") + 8, a[1], fltMidiSources.getWidth(), 25], "left");

			g.setColour(Colours.withAlpha(this.get("textColour"), 0.3));
			g.drawVerticalLine(fltMidiChannels.get("x") + fltMidiChannels.getWidth() + 18, a[1] + 60, a[3] - 60);
		}
	});
	
	// pnlSettingsTab3 - Automation
	pnlSettingsTab[3].setPaintRoutine(function(g)
	{
		var a = [fltMidiLearn.get("x") - 20, fltMidiLearn.get("y") - 15, fltMidiLearn.getWidth() + 37, fltMidiLearn.getHeight() + 32];

		g.setColour(this.get("bgColour"));
		g.fillRoundedRectangle(a, this.get("borderRadius"));
	});
	
	// fltEngineSettings
	const fltEngineSettings = Content.getComponent("fltEngineSettings");
	fltEngineSettings.setLocalLookAndFeel(LookAndFeel.customSettings);
	
	// fltAudioSettings
	const fltAudioSettings = Content.getComponent("fltAudioSettings");
	fltAudioSettings.setLocalLookAndFeel(LookAndFeel.customSettings);

	// btnLazyLoad
	const btnLazyLoad = Content.getComponent("btnLazyLoad");
	btnLazyLoad.setLocalLookAndFeel(LookAndFeel.toggleButton);
	btnLazyLoad.setControlCallback(onbtnLazyLoadControl);
	
	inline function onbtnLazyLoadControl(component, value)
	{
		setProperty("rhapsody", "lazyLoad", value);
		setLazyLoad(value);
	}
	
	// knbCoarseDetune
	const knbCoarseDetune = Content.getComponent("knbCoarseDetune");
	knbCoarseDetune.setLocalLookAndFeel(LookAndFeel.knob);
	
	// knbFineDetune
	const knbFineDetune = Content.getComponent("knbFineDetune");
	knbFineDetune.setLocalLookAndFeel(LookAndFeel.knob);
	
	// knbTranspose
	const knbTranspose = Content.getComponent("knbTranspose");
	knbTranspose.setLocalLookAndFeel(LookAndFeel.knob);

	// fltMidiSources
	const fltMidiSources = Content.getComponent("fltMidiSources");
	fltMidiSources.setLocalLookAndFeel(LookAndFeel.midiInputButtons);
	fltMidiSources.showControl(!Engine.isPlugin());
	
	// fltMidiChannels
	const fltMidiChannels = Content.getComponent("fltMidiChannels");
	fltMidiChannels.setLocalLookAndFeel(LookAndFeel.midiInputButtons);
	
	// fltMidiLearn
	const fltMidiLearn = Content.getComponent("fltMidiLearn");
	fltMidiLearn.setLocalLookAndFeel(LookAndFeel.cell);
    
    // fltMpe
    const fltMpe = Content.getComponent("fltMpe");
    fltMpe.setLocalLookAndFeel(LookAndFeel.mpe);   
    
    // Functions
    inline function show()
    {
		btnSettings.setValue(true);
		btnSettingsClose.setValue(true);
	    pnlSettingsContainer.fadeComponent(true, 100);
	    
	    if (Engine.getName() != "Rhapsody")
	    	Presets.hide();
    }
    
    inline function hide()
    {
		btnSettings.setValue(false);
	    pnlSettingsContainer.fadeComponent(false, 100);
    }

	inline function changeTab(index)
	{
		for (i = 0; i < pnlSettingsMenu.data.children.length; i++)
			pnlSettingsMenu.data.children[i].showControl(i == index);
			
		pnlSettingsMenu.repaint();
	}

	inline function setLazyLoad(state)
	{
		if (!isDefined(samplers) || !samplers.length)
			return;

		for (s in samplers)
			s.setAttribute(s.Purged, state == 0 ? false : 2);
	}

	/**
	* Store a key value pair in the AppData/UserSettings.json file.
	* 
	* @scope	string    	The scope that the value affects. For global settings use "rhapsody".
	*					  	For project specific settings use the project's name or a unique id.
	* @key		string	  	The key that the value is associated with
	* @value	string/int	The value to store
	*/
    inline function setProperty(scope, key, value)
    {
		local obj = {};
		local f = FileSystem.getFolder(FileSystem.AppData).getChildFile("UserSettings.json");
		
		if (isDefined(f) && f.isFile())
			obj = f.loadAsObject();
			
		if (!isDefined(obj[scope]))
			obj[scope] = {};
			
		obj[scope][key] = value;
		
		f.writeObject(obj);
    }
    
    /**
    * Store a key value pair in the AppData/UserSettings.json file.
    * 
    * @scope	string    The scope that the value affects. For global settings use "rhapsody".
    *                     For project specific settings use the project's name or a unique id.
    * @key		string    The key for the value you want to retrieve.
    *
    * @return		      The value that matches the scope and key, or undefined
    */
    inline function getProperty(scope, key)
    {
		local obj = {};
	    local f = FileSystem.getFolder(FileSystem.AppData).getChildFile("UserSettings.json");
	    
	    if (isDefined(f) && f.isFile())
	    	obj = f.loadAsObject();

	    return obj[scope][key];
    }
    
    inline function init()
    {
	    local lazyLoad = getProperty("rhapsody", "lazyLoad");
	    
	    if (isDefined(lazyLoad))
	    {
		    btnLazyLoad.setValue(lazyLoad);
		    setLazyLoad(lazyLoad);
	    }
	
		pnlSettingsMenu.setValue(0);
		changeTab(0);
    }
    
    // Calls
    init();
}

