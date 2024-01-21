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

namespace LookAndFeel
{
	Content.setUseHighResolutionForPanels(true);
	
	/*
	Engine.loadFontAs("{PROJECT_FOLDER}/images/fonts/Inter-Regular.ttf", "regular");
	Engine.loadFontAs("{PROJECT_FOLDER}/images/fonts/Inter-Medium.ttf", "medium");
	Engine.loadFontAs("{PROJECT_FOLDER}/images/fonts/Inter-SemiBold.ttf", "semibold");
	Engine.loadFontAs("{PROJECT_FOLDER}/images/fonts/Inter-Bold.ttf", "bold");
	Engine.loadFontAs("{PROJECT_FOLDER}/images/fonts/JosefinSans-Bold.ttf", "title");
	*/
	
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/Asap-Regular.ttf", "regular");
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/Asap-Medium.ttf", "medium");
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/Asap-SemiBold.ttf", "semibold");
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/Asap-Bold.ttf", "bold");
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/JosefinSans-Bold.ttf", "title");
	
	
	
	// Automation handler
	const automationHandler = Engine.createMidiAutomationHandler();
	
	automationHandler.setUpdateCallback(function(obj)
	{
		var excluded = [94];
	
		for (x in obj)
		{
			if (excluded.contains(x.Controller))
				Engine.showMessageBox("Internal Controller", "CC #" + x.Controller + " is used internally by the instrument. Assigning it to a control may cause issues. Please use a different controller number.", 4);
		}
	});
	
	inline function setCcNames()
	{
		local controllers = {"1": "Mod Wheel", "2": "Breath", "7": "Main Volume", "11": "Expression", "10": "Pan", "64": "Sustain Pedal", "72": "Release", "73": "Attack", "75": "Hold", "76": "Decay", "77": "Sustain", "78": "Attack Curve", "94": "Do Not Use"};
		local labels = [];
	
		for (i = 0; i < 128; i++)
		{
			if (isDefined(controllers[i]))
				labels.push("CC# " + i + " | " + controllers[i]);
			else
				labels.push("CC# " + i);
		}
	
		automationHandler.setControllerNumberNames("MIDI CC", labels);
	}
	
    const laf = Engine.createGlobalScriptLookAndFeel();
    
	// empty
	const empty = Content.createLocalLookAndFeel();
	
	empty.registerFunction("drawToggleButton", function(g, obj) {});
	empty.registerFunction("drawRotarySlider", function(g, obj) {});

	// table
	const table = Content.createLocalLookAndFeel();

	table.registerFunction("drawTableBackground", function(g, obj)
	{
		var a = obj.area;

		g.setColour(Colours.withAlpha(Colours.grey, 0.5));
		g.drawVerticalLine(a[2] / 2, a[1], a[3]);
		g.drawHorizontalLine(a[3] / 2, a[0], a[2]);
		
		g.setColour(Colours.withAlpha(Colours.grey, 0.2));
		g.drawVerticalLine(a[2] / 4, a[1], a[3]);
		g.drawVerticalLine(a[2] - a[2] / 4, a[1], a[3]);
		g.drawHorizontalLine(a[3] / 4, a[0], a[2]);
		g.drawHorizontalLine(a[3] - a[3] / 4, a[0], a[2]);
	});

	table.registerFunction("drawTablePath", function(g, obj)
	{
		var a = obj.area;

	    g.setGradientFill([obj.itemColour2, a[0], a[1], 0x0, a[2], a[3]]);
	    g.drawPath(obj.path, [a[0] - 2, a[1], a[2] + 4, a[3] + 2], 2.0);

	    g.setGradientFill([Colours.withAlpha(obj.itemColour, 0.5), a[2] / 2, a[1], 0x0, a[2] / 2, a[3]]);
	    g.fillPath(obj.path, a);
	});
	
	table.registerFunction("drawTablePoint", function(g, obj)
	{
		var a = obj.tablePoint;
		var inner = 8;
		
		g.setColour(Colours.withAlpha(obj.itemColour2, obj.hover ? 0.5 : 0.3));
		g.fillEllipse([a[0], a[1], a[2], a[3]]);

		g.setColour(Colours.withAlpha(obj.itemColour2, obj.hover ? 1.0 : 0.8));
		g.fillEllipse([a[0] + a[2] / 2 - inner / 2, a[1] + a[3] / 2 - inner / 2, inner, inner]);
	});

	table.registerFunction("drawTableRuler", function(g, obj)
	{
		var x = obj.position * obj.area[2];
		
	    g.setColour(Colours.withAlpha(obj.itemColour2, 0.1));	       
	    g.drawLine(x, x, 0, obj.area[3], 10.0);

	    g.setColour(Colours.withAlpha(Colours.white, 0.8));
	    g.drawLine(x, x, 0, obj.area[3], 0.6);
	});

	// Scrollbar
	laf.registerFunction("drawScrollbar", function(g, obj)
	{
		drawScrollbar(g, obj, 0xff302F34);
	});
	
	// AHDSR
	laf.registerFunction("drawAhdsrBackground", function(g, obj)
	{
		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(obj.area, 3);
	});
	
	laf.registerFunction("drawAhdsrPath", function(g, obj)
	{
		var a = obj.area;
		var p = obj.path;
		
		if (obj.enabled)
			g.setGradientFill([Colours.withAlpha(obj.itemColour, 0.5), a[2] / 2, a[1], 0x0, a[2] / 2, a[3]]);
		else
			g.setGradientFill([Colours.withAlpha(obj.itemColour, 0.5), a[2] / 2, a[1], 0x0, a[2] / 2, a[3]]);

		g.fillPath(p, a);

		if (!obj.isActive && obj.enabled)
		{
			g.setGradientFill([obj.itemColour2, a[2] / 2, a[1], 0x0, a[2] / 2, a[3]]);
			g.drawPath(p, a, 2.0);
		}
	});

	laf.registerFunction("drawAhdsrBall", function(g, obj)
	{
		if (!obj.enabled)
			return;

		g.setColour(obj.itemColour2);
		g.fillEllipse([obj.position[0] - 4, obj.position[1] - 4, 8, 8]);

		g.setColour(Colours.withAlpha(obj.itemColour2, 0.5));
		g.fillEllipse([obj.position[0] - 7, obj.position[1] - 7, 14, 14]);
			
	});

	// smallKnob
	const smallKnob = Content.createLocalLookAndFeel();

	smallKnob.registerFunction("drawRotarySlider", function(g, obj)
	{
		var a = obj.area.clone();
		a[1] = 20 * (obj.text != "");
		
		var discSize = 24;
		var disc = [a[2] / 2 - discSize / 2, a[1] + 8, discSize, discSize];
	
		// Title
		g.setFont("bold", 14);
		g.setColour(Colours.withAlpha(obj.textColour, obj.enabled ? 1.0 : 0.5));
		g.drawAlignedText(obj.text, [a[0], obj.area[1], a[2], a[3]], "centredTop");
	
		// Shadow
		var shadowPath = Content.createPath();
		shadowPath.addEllipse(disc);
		
		var shadowColour = Colours.withAlpha(Colours.black, obj.enabled ? 0.4 : 0.1);
		g.drawDropShadowFromPath(shadowPath, disc, shadowColour, 8, [0, 4]);
	
		// Body
		g.setColour(Colours.withAlpha(obj.bgColour, obj.enabled ? 1.0 : 0.5));
		g.fillEllipse(disc);
	
		// Arc
		var offset = 2.4;
		var endOffset = -offset + 2 * offset * obj.valueNormalized;
		var thickness = 2;
		var isBidirectional = -1.0 * obj.min == obj.max;
		var strokeStyle = {EndCapStyle: "rounded", Thickness: thickness};
		var diameter = disc[2] + 12;
	
		// Background arc
		var path = Content.createPath();
		g.setColour(obj.itemColour1);
		
		path.addArc([0, 0, 1, 1], -offset, offset);
	
		var pathArea = path.getBounds(diameter);
		pathArea[0] += a[2] / 2 - diameter / 2;
		pathArea[1] += a[1] + 2;
		g.drawPath(path, pathArea, strokeStyle);
	
		// Value arc
		path = Content.createPath();	
		g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1.0 : 0.5));
		
		path.addArc([0, 0, 1, 1], (-offset * !isBidirectional), endOffset);
		
		pathArea = path.getBounds(diameter);
		pathArea[0] += a[2] / 2 - diameter / 2;
		pathArea[1] += a[1] + 2;
		
		g.drawPath(path, pathArea, strokeStyle);
	
		// Value text
		g.setColour(Colours.withAlpha(obj.textColour, obj.enabled ? 1.0 : 0.5));
		g.setFont("semibold", 11);
		g.drawAlignedText(obj.valueAsText, [a[0], obj.area[1], a[2], a[3]], "centredBottom");
	
		// Value indicator
		g.setColour(Colours.withAlpha(obj.textColour, obj.enabled ? 1.0 : 0.5));
		g.rotate(endOffset, [obj.area[2] / 2, disc[1] + disc[3] / 2]);
		g.fillRoundedRectangle([obj.area[2] / 2 - 1, disc[1] + 2, 2, 6], 1);
	});
    
    // bigKnob
    const bigKnob = Content.createLocalLookAndFeel();
    
    bigKnob.registerFunction("drawRotarySlider", function(g, obj)
    {
    	var a = obj.area.clone();
    	a[1] = 35;
    
    	var discSize = a[2] - 26;
    	var disc = [a[2] / 2 - discSize / 2, a[1] + 13, discSize, discSize];
    
    	// Title
    	g.setFont("bold", 16);
    	g.setColour(Colours.withAlpha(obj.textColour, obj.enabled ? 1.0 : 0.5));
    	g.drawAlignedText(obj.text, [a[0], obj.area[1], a[2], a[3]], "centredTop");
    
    	// Shadow
    	var shadowPath = Content.createPath();
    	shadowPath.addEllipse(disc);
    
    	var shadowColour = Colours.withAlpha(Colours.black, obj.enabled ? 0.4 : 0.1);
    	g.drawDropShadowFromPath(shadowPath, disc, shadowColour, 8, [0, 4]);

		// Body
		var c1 = Colours.withAlpha(0xff4b4b53, obj.enabled ? 1.0 : 0.5);
		var c2 = Colours.withAlpha(0xff1d1d21, obj.enabled ? 1.0 : 0.5);
	
		g.setGradientFill([c1, a[0], disc[1], c2, a[0], disc[1] + disc[3]]);
		g.fillEllipse(disc);

		c1 = Colours.withAlpha(0xff161619, obj.enabled ? 1.0 : 0.5);
		c2 = Colours.withAlpha(0xff2f2f34, obj.enabled ? 1.0 : 0.5);
	
		g.setGradientFill([c1, a[0], disc[1], c2, a[0], disc[1] + disc[3]]);
		g.fillEllipse([disc[0] + 5, disc[1] + 5, disc[2] - 10, disc[3] - 10]);

    	// Arc
    	var offset = 2.4;
    	var endOffset = -offset + 2 * offset * obj.valueNormalized;
    	var thickness = 3;
    	var isBidirectional = -1.0 * obj.min == obj.max;
    	var strokeStyle = {EndCapStyle: "rounded", Thickness: thickness};
    	var diameter = disc[2] + 22;
    	
    	// Background arc
    	var path = Content.createPath();
    	g.setColour(obj.itemColour1);
    	
    	path.addArc([0, 0, 1, 1], -offset, offset);
    	
    	var pathArea = path.getBounds(diameter);
    	pathArea[0] += a[2] / 2 - diameter / 2;
    	pathArea[1] += a[1] + 2;
    
    	g.drawPath(path, pathArea, strokeStyle);
    
    	// Value arc
    	path = Content.createPath();	
    	g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1.0 : 0.5));
    	
    	path.addArc([0, 0, 1, 1], (-offset * !isBidirectional), endOffset);
    	
    	pathArea = path.getBounds(diameter);
    	pathArea[0] += a[2] / 2 - diameter / 2;
    	pathArea[1] += a[1] + 2;

    	g.drawPath(path, pathArea, strokeStyle);
        	
    	// Value text
    	g.setColour(Colours.withAlpha(obj.textColour, obj.enabled ? 1.0 : 0.5));
    	g.setFont("semibold", 14);
    	g.drawAlignedText(obj.valueAsText, [a[0], obj.area[1], a[2], a[3]], "centredBottom");
    
    	// Value indicator
    	g.setColour(Colours.withAlpha(obj.textColour, obj.enabled ? 1.0 : 0.5));
    	g.rotate(endOffset, [a[2] / 2, disc[1] + disc[3] / 2]);
    	g.fillRoundedRectangle([a[2] / 2 - 1.5, disc[1] + 8, 3, 9], 1.5);
    	g.rotate(-endOffset, [a[2] / 2, disc[1] + disc[3] / 2]);
    });
    
	// horizontalSlider
	const horizontalSlider = Content.createLocalLookAndFeel();

	horizontalSlider.registerFunction("drawLinearSlider", function(g, obj)
	{
		var a = obj.area;
		var isBidirectional = -1.0 * obj.min == obj.max;
	    var shadowPath = Content.createPath();
		var shadowColour = Colours.withAlpha(Colours.black, obj.enabled ? 0.8 : 0.1);
		
		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(a, 8);
	    
		g.setColour(Colours.withAlpha(obj.itemColour1, obj.enabled ? 1.0 : 0.5));
		g.fillRoundedRectangle([12, a[3] / 2 - 3 / 2, a[2] - 24, 3], 2);
		
		g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1.0 : 0.5));
		
		var x = 12;
		var fillWidth = (a[2] - 24) * obj.valueNormalized;
		
		if (isBidirectional)
		{
			var centerX = a[2] / 2;
		
		    if (obj.valueNormalized > 0.5)
		    {
		        x = centerX;
		        fillWidth = (a[2] - 12 - centerX) * (obj.valueNormalized - 0.5) * 2;
		    }
		    else
		    {
		        fillWidth = (centerX - 12) * (0.5 - obj.valueNormalized) * 2;
		        x = centerX - fillWidth;
		    }
		}
		
		g.fillRoundedRectangle([x, a[3] / 2 - 3 / 2, fillWidth, 3], 2);		
		
		var w = a[2] * 0.2;
		
		g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1.0 : 0.5));
	
		if (w >= 30)
		{
			var x = a[2] * obj.valueNormalized - (w + 4) * obj.valueNormalized + 2;
	
			shadowPath.addRoundedRectangle([x + 2, a[3] / 2 - a[3] / 2 + 2, w - 4, a[3] - 4], 8);
			g.drawDropShadowFromPath(shadowPath, [x + 2, a[3] / 2 - a[3] / 2 + 2, w - 4, a[3] - 4], shadowColour, 2, [0, 1]);
		
			g.setColour(0xff464646);
		    g.fillRoundedRectangle([x + 1, a[3] / 2 - (a[3] - 4) / 2, w - 2, a[3] - 4], 8);
	
		    g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1.0 : 0.5));
		    g.fillEllipse([x + w / 2 - a[3] / 6 / 2, a[3] / 2 - a[3] / 6 / 2, a[3] / 6, a[3] / 6]);
		}                
		else
		{
		    var c = a[3] - 4;
		    var x = a[2] * obj.valueNormalized - (c + 4) * obj.valueNormalized + 2;
		    
		    shadowPath.addEllipse([x + 2, a[3] / 2 - c / 2 + 2, c - 4, c - 4]);
		    g.drawDropShadowFromPath(shadowPath, [x + 2, a[3] / 2 - c / 2 + 2, c - 4, c - 4], shadowColour, 3, [0, 2]);
		
			g.setColour(0xff464646);
	    	g.fillEllipse([x, a[3] / 2 - c / 2, c, c]);
		    
		    g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1.0 : 0.5));
		    g.fillEllipse([x + c / 2 - a[3] / 6 / 2, a[3] / 2 - a[3] / 6 / 2, a[3] / 6, a[3] / 6]);
		}
	});
    
    // verticalSlider
    const verticalSlider = Content.createLocalLookAndFeel();
    
    verticalSlider.registerFunction("drawLinearSlider", function(g, obj)
    {
		var a = obj.area;
		var h = a[3] * 0.2;
		var v = obj.valueNormalized;

		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(a, 10);		

		g.setColour(Colours.black);
		g.fillRoundedRectangle([a[2] / 2 - 3 / 2, 0, 3, a[3]], 2);

		var y = a[3] - a[3] * v;
		g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1.0 : 0.2));
		g.fillRoundedRectangle([a[2] / 2 - 3 / 2, y, 3, a[3] - y], 2);

		y = a[3] - a[3] * obj.valueNormalized - h + h * obj.valueNormalized;
		var area = [a[2] / 2 - (a[2] - 4) / 2, y, a[2] - 4, h];
		
		// Shadow
		var shadowPath = Content.createPath();
		shadowPath.addRoundedRectangle(area, 8);
		
		var shadowColour = Colours.withAlpha(Colours.black, obj.enabled ? 0.8 : 0.4);
		g.drawDropShadowFromPath(shadowPath, [area[0] + 2, area[1], area[2] - 4, area[3]], shadowColour, 6, [0, 3]);
		
		g.setColour(Colours.withAlpha(obj.itemColour1, 1.0));
		g.fillRoundedRectangle(area, 8);
	
		g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 0.8 + (0.2 * obj.hover) : 0.2));
		g.fillEllipse([a[2] / 2 - a[2] / 4 / 2, y + h / 2 - a[2] / 4 / 2, a[2] / 4, a[2] / 4]); 
    });

	// midiInputButtons
	const midiInputButtons = Content.createLocalLookAndFeel();

	midiInputButtons.registerFunction("drawToggleButton", function(g, obj)
	{
		var a = obj.area;
		var wh = a[3] / 1.2;
		
		g.setColour(Colours.withAlpha(0xff161619, obj.over ? 1.0 : 0.8));
		g.fillRoundedRectangle([a[0] + a[3] / 2 - wh / 2, a[1] + a[3] / 2 - wh / 2, wh, wh], 3);
		
		g.setColour(Colours.black);
		g.drawRoundedRectangle([a[0] + a[3] / 2 - wh / 2, a[1] + a[3] / 2 - wh / 2, wh, wh], 3, 1);
		
		if (obj.value)
		{
			wh = a[3] / 1.8;

			g.setColour(Colours.withAlpha(Colours.white, obj.over ? 1.0 : 0.8));
			var iconArea = [a[3] / 2 - wh / 2, a[3] / 2 - (wh * 0.7) / 2, wh, wh * 0.7];
			g.fillPath(Paths.icons["check"], iconArea);
		}

		if (obj.text != "")
		{
			g.setFont("semibold", 16);
			g.setColour(Colours.white);
			g.drawFittedText(obj.text, [a[3] + 8, a[1], a[2] - a[3] - 8, a[3]], "left", 1, 1.0);
		}
	});

	midiInputButtons.registerFunction("drawScrollbar", function(g, obj)
	{
		drawScrollbar(g, obj, 0xff161619);
	});

    // textButton
    const textButton = Content.createLocalLookAndFeel();
    
    textButton.registerFunction("drawToggleButton", function(g, obj)
    {
		drawTextButton(obj, obj.text, obj.area);
    });
    
    // linkButton
    const linkButton = Content.createLocalLookAndFeel();
    
    linkButton.registerFunction("drawToggleButton", function(g, obj)
    {
	    var a = obj.area;
	    var text = obj.text;
	    	    
	    g.setFont("medium", 18);
	    g.setColour(Colours.withAlpha(obj.textColour, obj.over ? 1.0 - (0.3 * obj.value) : 0.8));
	    g.drawAlignedText(text, a, "left");
	    
	    g.drawHorizontalLine(a[3] - 2, a[0], a[2]);
    });

    // textToggleButton
    const textToggleButton = Content.createLocalLookAndFeel();
    
    textToggleButton.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;
		var alignment = "centred";
		var text = obj.text;
		var colour = obj.value ? obj.bgColour : obj.itemColour1;
		
		g.setColour(Colours.withAlpha(colour, obj.over ? 1.0 : 0.8));
		g.fillRoundedRectangle(a, 3);
		
    	g.setFont("medium", 18);
    	g.setColour(Colours.withAlpha(obj.textColour, obj.value ? 1.0 : 0.6));

    	g.drawAlignedText(text, [a[0], a[1], a[2], a[3]], alignment);
    });

    // iconButton
    const iconButton = Content.createLocalLookAndFeel();
    
    iconButton.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;
		var icon = obj.text;

		if (icon.indexOf("iconOff") != -1 && !obj.value)
		{
			icon = icon.substring(icon.indexOf("iconOff-") + 8, icon.indexOf(" "));
		}
		else if (icon.indexOf("iconOn") != -1 && obj.value)
		{
			icon = icon.substring(icon.indexOf("iconOn-") + 7, icon.length);
		}
		else
		{
			if (icon.indexOf("circle-") != -1)
			{
				icon = icon.replace("circle-");
				
				g.setColour(Colours.withAlpha(obj.bgColour, obj.over ? 1.0 : 0.8));
				g.fillEllipse(a);
				a = [a[2] / 2 - (a[2] / 2) / 2, a[3] / 2 - (a[3] / 2) / 2, a[2] / 2, a[3] / 2];
			}
		}

		var colour = obj.value == 0 ? obj.itemColour1 : obj.itemColour2;
		g.setColour(Colours.withAlpha(colour, obj.over && obj.enabled ? 1.0 - (0.2 * obj.down) : 0.8 - (0.2 * (obj.down + !obj.enabled))));

		g.fillPath(Paths.icons[icon], a);  
    });
    
    // iconTextButton
    const iconTextButton = Content.createLocalLookAndFeel();
    
    iconTextButton.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;
		var text = obj.text.substring(0, obj.text.indexOf("["));
		var icon = obj.text.substring(obj.text.indexOf("[") + 1, obj.text.length - 1);

		drawIconTextButton(obj.area, icon, text, [obj.bgColour, obj.textColour, obj.itemColour2]);
    });
    
    // filledIconButton
    const filledIconButton = Content.createLocalLookAndFeel();
    
    filledIconButton.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;
		var icon = obj.text;

		g.setColour(Colours.withAlpha(obj.bgColour, obj.over ? 0.8 - (0.3 * obj.down) : 1.0));
		g.fillRoundedRectangle(a, 5);

		var wh = a[3] / 3;
		g.setColour(obj.itemColour1);
		g.fillPath(Paths.icons[icon], [a[0] + a[2] / 2 - wh / 2, a[1] + a[3] / 2 - wh / 2, wh, wh]);    
    });        
        
    // toggleButton
    const toggleButton = Content.createLocalLookAndFeel();

    toggleButton.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;

	    obj.value ? g.setColour(obj.itemColour1) : g.setColour(obj.bgColour);
	    g.fillRoundedRectangle(a, 10);

	    g.setColour(Colours.withAlpha(obj.itemColour2, obj.over ? 0.8 : 1.0));
	    var x = obj.value ? a[2] - a[3] / 1.2 - 2 : 2;
	    g.fillEllipse([x, a[3] / 2 - a[3] / 1.2 / 2, a[3] / 1.2, a[3] / 1.2]);	    
    });
    
    // ledButton
    const ledButton = Content.createLocalLookAndFeel();
    
    ledButton.registerFunction("drawToggleButton", function(g, obj)
    {
    	var a = obj.area;
    	
    	g.setColour(obj.bgColour);
    	g.fillEllipse(a);

		if (!obj.enabled)
		{
			g.setColour(Colours.withAlpha(obj.value ? obj.itemColour2 : obj.itemColour1, 0.5));
			return g.fillEllipse([a[2] / 4, a[3] / 4, a[2] / 2, a[3] / 2]);
		}
		
		if (obj.value)
			g.setColour(Colours.withAlpha(obj.itemColour2, obj.over ? 1.0 - (0.2 * obj.down) : 0.8));
		else
			g.setColour(Colours.withAlpha(obj.over ? obj.itemColour2 : obj.itemColour1, obj.over ? 0.2 - (0.1 * obj.down) : 1.0));

    	g.fillEllipse([a[2] / 4, a[3] / 4, a[2] / 2, a[3] / 2]);
    });
    
    // checkBox
    const checkBox = Content.createLocalLookAndFeel();
    
    checkBox.registerFunction("drawToggleButton", function(g, obj)
    {
		var a = obj.area;

		g.setColour(Colours.withAlpha(obj.bgColour, obj.over ? 0.8 : 1.0));
		g.fillRoundedRectangle([a[0] + 0.5, a[1] + 0.5, a[3] - 1, a[3] - 1], 3);
		
		g.setColour(Colours.withAlpha(obj.itemColour1, obj.over ? 0.8 : 1.0));
		g.drawRoundedRectangle([a[0] + 0.5, a[1] + 0.5, a[3] - 1, a[3] - 1], 3, 1);
		
		if (obj.value)
		{
			g.setColour(Colours.withAlpha(obj.itemColour2, obj.over ? 0.8 : 1.0));
			var iconArea = [a[3] / 2 - (a[3] / 1.5) / 2, a[3] / 2 - (a[3] / 1.5 * 0.7) / 2, a[3] / 1.5, a[3] / 1.5 * 0.7];
			g.fillPath(Paths.icons["check"], iconArea);
		}

		if (obj.text != "")
		{
			g.setFont("semibold", 16);
			g.setColour(obj.textColour);
			g.drawAlignedText(obj.text, [a[3] + 10, a[1], a[2] - a[3], a[3]], "left");
		}
    });
    
    // customSettings
    const customSettings = Content.createLocalLookAndFeel();
    
    customSettings.registerFunction("drawComboBox", function(g, obj)
    {
		drawComboBox(g, obj);
    });
    
    customSettings.registerFunction("drawPopupMenuBackground", function(g, obj)
    {
	   	drawPopupMenuBackground();
    });

    customSettings.registerFunction("drawPopupMenuItem", function(g, obj)
    {
    	drawPopupMenuItem(g, obj);
    });
    
    customSettings.registerFunction("getIdealPopupMenuItemSize", function(obj)
    {
    	return [250, 30];
    });
    
    // Combo box
    const comboBox = Content.createLocalLookAndFeel();
    
    comboBox.registerFunction("drawComboBox", function(g, obj)
    {
		drawComboBox(g, obj);
    });

	comboBox.registerFunction("drawPopupMenuBackground", function(g, obj)
	{
	   	drawPopupMenuBackground();
	});

	comboBox.registerFunction("drawPopupMenuItem", function(g, obj)
	{
		drawPopupMenuItem(g, obj);
	});

	comboBox.registerFunction("getIdealPopupMenuItemSize", function(obj)
	{
		return getIdealPopupMenuItemSize(obj);
	});
	
	// Combo box text only
	const comboBoxTextOnly = Content.createLocalLookAndFeel();

	comboBoxTextOnly.registerFunction("drawComboBox", function(g, obj)
	{
		var a = obj.area;
	
		g.setColour(Colours.withAlpha(obj.textColour, obj.hover ? 1.0 : 0.8));
		g.setFont("medium", 14);
		g.drawAlignedText(obj.text, a, "left");
	});
	
	comboBoxTextOnly.registerFunction("drawPopupMenuBackground", function(g, obj)
	{
		drawPopupMenuBackground();
	});
	
	comboBoxTextOnly.registerFunction("drawPopupMenuItem", function(g, obj)
	{
		drawPopupMenuItem(g, obj);
	});
	
	comboBoxTextOnly.registerFunction("getIdealPopupMenuItemSize", function(obj)
	{
		return [75, 25];
	});

	laf.registerFunction("drawPopupMenuBackground", function(g, obj)
	{
	   	drawPopupMenuBackground();
	});
	
	laf.registerFunction("drawPopupMenuItem", function(g, obj)
	{
		drawPopupMenuItem(g, obj);
	});
	
	laf.registerFunction("getIdealPopupMenuItemSize", function(obj)
	{
		return [150, 25];
	});

	// Preset browser
	const presetBrowser = Content.createLocalLookAndFeel();
	const fltPresetBrowser = Content.getComponent("fltPresetBrowser");
    
    presetBrowser.registerFunction("drawPresetBrowserBackground", function(g, obj)
	{
		g.fillAll(obj.bgColour);
	});

    presetBrowser.registerFunction("drawPresetBrowserDialog", function(g, obj)
    {
        var a = obj.area;
        var la = obj.labelArea;
        var h = 40;
        
        g.drawDropShadow([a[0] - 50, a[1] - 50, a[2] + 100, a[3] + 100], Colours.withAlpha(Colours.black, 0.8), 20);

		g.setColour(0xff2F2F34);
		g.fillRect([a[0] - 50, a[1] - 50, a[2] + 100, a[3] + 100]);
                
        g.setColour(0xff161619);
        g.fillRect([a[0] - 50, a[1] - 50, a[2] + 100, h]);
        
        g.setFont("semibold", 20);
        g.setColour(Colours.white);
        g.drawAlignedText(obj.title, [a[0] - 35, a[1] - 50, a[2] + 100, h], "left");
        
        g.setColour(Colours.withAlpha(Colours.white, 0.3));
        g.drawRect([a[0] - 50, a[1] - 50, a[2] + 100, a[3] + 100], 1);

        g.setFont("medium", 18);
        g.setColour(Colours.white);

        if (obj.labelArea[2] != 0)
        {
            g.drawAlignedText(obj.text, [a[0], a[1] + 15, a[2], 20], "centred");
            g.setColour(0xff161619);
            g.fillRoundedRectangle([la[0] - 5, la[1], la[2] + 10, la[3]], 5);
        }
        else
        {
            g.drawAlignedText(obj.text, [a[0], a[1] + 40, a[2], 20], "centred");
        }
    });

    presetBrowser.registerFunction("drawPresetBrowserColumnBackground", function(g, obj)
    {
	    var a = obj.area;

	    if (obj.text == "Add a Bank" || obj.text == "Select a Nothing")
	        obj.text = "Select a Library";
	        
	    if (obj.text == "Select a Column")
	        obj.text = "Select a Category";
	        
	    if (a[2] > 400 && obj.text != "")
	        obj.text = "No Results";

		g.setColour(0xff161619);
	    g.fillRoundedRectangle([a[0], a[1], a[2], a[3]], 5);
	    
	    g.setColour(obj.textColour);
	    g.setFont("medium", 18);
	    g.drawAlignedText(obj.text, [a[0], a[1] - 10, a[2], a[3]], "centred");
    });
	
    presetBrowser.registerFunction("drawPresetBrowserListItem", function(g, obj)
    {
        var a = [obj.area[0] + 5, obj.area[1], obj.area[2] - 10, obj.area[3]];
        var col = obj.columnIndex;

		if (obj.selected)
		{
			g.setColour(fltPresetBrowser.get("itemColour2"));
			g.fillRoundedRectangle([a[0] - 5, a[1], 5, a[3]], {CornerSize: 5, Rounded:[1, 0, 1, 0]});		
		}

		g.setColour(Colours.withAlpha(0xff302f34, obj.hover && !obj.selected ? 0.5 : 0.8));
		
		if (obj.selected)
			g.fillRoundedRectangle([a[0], a[1], a[2] + 5, a[3]], {CornerSize: 5, Rounded:[0, 1, 0, 1]});
		else if (obj.hover)
			g.fillRoundedRectangle([a[0] - 5, a[1], a[2] + 10, a[3]], 5);

		// Preload Progress
		if (obj.selected && col == 2)
		{
			if (Engine.getPreloadProgress() > 0 && Engine.getPreloadProgress() < 1)
			{
				g.setColour(0xff524f56);
				g.fillRoundedRectangle([a[0], a[1], (a[2] + 5) * Engine.getPreloadProgress(), a[3]], {CornerSize: 5, Rounded:[0, 1, 0, 1]});
			}
		}

		g.setColour(Colours.white);
		g.setFont("medium", 20);
		
		if (col == 2) a[0] += 10;
		
		var t = obj.text;

		if (t.indexOf(" (") != -1)
			t = t.substring(0, t.indexOf(" ("));

		g.drawFittedText(t, [a[0] + 8 + (8 * (col == 2)), a[1], a[2] - 16, a[3]], "left", 1, 1.0);
    });

	presetBrowser.registerFunction("drawScrollbar", function(g, obj)
	{
		drawScrollbar(g, obj, 0xff302F34);
	});
        
    presetBrowser.registerFunction("drawPresetBrowserSearchBar", function(g, obj)
    {
        var a = obj.area;
        var wh = a[3] / 2.0;

        g.setColour(0xff161619);
        g.fillRoundedRectangle([a[0] + 20, a[1], a[2] - 20, a[3]], 5);

        g.setColour(Colours.withAlpha(Colours.white, 0.7));
        g.fillPath(Paths.icons.search, [a[0] + a[2] - 30, a[1] + a[3] / 2 - wh / 2 - 1, wh, wh]);      
    });
    
    presetBrowser.registerFunction("drawDialogButton", function(g, obj)
    {
		var a = obj.area;
		var editButtons = ["Add", "Rename", "Delete"];    
		
		if (editButtons.contains(obj.text))
		{
			var icons = ["add", "edit", "trash"];
			var path = Paths.icons[icons[editButtons.indexOf(obj.text)]];
			var bgColour = Colours.white;

			if (obj.text == "Delete")
				a = [a[0] + a[2] / 2 - 10, a[1] + a[3] / 2 - 11, 20, 22];
			else
				a = [a[0] + a[2] / 2 - 11, a[1] + a[3] / 2 - 11, 22, 22];

			drawPathButton(path, a, [Colours.withAlpha(bgColour, 0.8), Colours.withAlpha(bgColour, 1.0), Colours.withAlpha(bgColour, 0.5)]);
		}
		else if (obj.text == "Show Favorites" || obj.text == "Save Preset")
		{
			var icon = obj.text == "Show Favorites" ? "heartFilled" : "save";
			var text = obj.text == "Show Favorites" ? "Favourites" : "Save Preset";
			
			drawIconTextButton([a[0], a[1], a[2], a[3] - 1], icon, text, [0xff161619, Colours.white, Colours.withAlpha(Colours.white, 0.7)]);
		}
		else
		{
			var text = obj.text;
			obj.bgColour = 0xff161619;
			obj.textColour = Colours.white;

			drawTextButton(obj, text, a);
		}
    });
    
    presetBrowser.registerFunction("createPresetBrowserIcons", function(id)
    {
        if (id == "favorite_on")
            return Paths.icons.heartFilled;
    
        if (id == "favorite_off")
            return Paths.icons.heart;
    });

    // Alert window    
    laf.registerFunction("drawAlertWindow", function(g, obj)
    {        
        var a = obj.area;
        var h = 40;

		g.fillAll(0xff2F2F34);

        g.setColour(0xff161619);
        g.fillRect([a[0], a[1], a[2], h]);

        g.setFont("semibold", 20);
        g.setColour(Colours.white);
        g.drawAlignedText(obj.title, [a[0] + 15, a[1], a[2], h], "left");        
        
        g.setColour(Colours.withAlpha(Colours.white, 0.3));
		g.drawRect(a, 1);
    });
    
    laf.registerFunction("getAlertWindowMarkdownStyleData", function(obj)
    {
        obj.font = "medium";
        obj.fontSize = 18;
        obj.textColour = Colours.white;
        return obj;
    });
    
	laf.registerFunction("drawAlertWindowIcon", function(g, obj)
    {
        var a = [obj.area[0], obj.area[1] + 10, obj.area[2], obj.area[3] - 10];
        var path = Paths.icons[obj.type.toLowerCase()];
		var multiplier = 1;
		
        switch (obj.type)
        {
	        case "Info": multiplier = 0.46; break;
	        case "Warning": multiplier = 0.18; break;
	        case "Question": multiplier = 0.58; break;
	        case "Error":
	        	multiplier = 0.18;
	        	path = Paths.icons.warning;
	        	break;
		}

		g.setColour(Colours.white);
		g.fillPath(path, [a[0], a[1] + a[3] / 2 - a[3] / 1.5 / 2, a[3] * multiplier / 1.5, a[3] / 1.5]);
    });
        
    laf.registerFunction("drawDialogButton", function(g, obj)
    {   		
    	var a = obj.area;

    	obj.bgColour = 0xff161619;
    	obj.textColour = Colours.white;
    	var text = obj.text;

		if (["Update Available", "Exit", "Open Website", "Overwrite Preset"].contains(obj.parentName))
			text = obj.text == "OK" ? "Yes" : "No";

   		drawTextButton(obj, text, a);
    });
    
    // Peak meter floating tile
    laf.registerFunction("drawMatrixPeakMeter", function(g, obj)
    {
    	var a = obj.area;
    	var value = 0;
		var numActive = 0;
		
        for (x in obj.peaks)
        {
			if (x > 0)
			{
				numActive++;
				value += x;
			}	        
        }

        value = value / numActive;

    	g.setColour(obj.itemColour);
    	g.fillRoundedRectangle(a, 8);

    	g.setColour(Colours.withAlpha(obj.itemColour2, 0.2 + value / 4));

		if (a[2] > a[3])
		{
			a[2] *= value;
		}
    	else
    	{
	    	a[1] = a[1] + a[3] - a[3] * value;
	    	a[3] *= value;
    	}
    	
    	g.fillRoundedRectangle(a, 8);
    });
    
    // Keyboard floating tile    
    const keyboard = Content.createLocalLookAndFeel();
    
	keyboard.registerFunction("drawWhiteNote", function(g, obj)
	{
		var a = [obj.area[0], obj.area[1], obj.area[2], 66];
		var radius = 2;
		var isDisabled = obj.keyColour == 0;

		if (obj.down)
			a[3] += 1;

		// Undercoat
		g.setColour(Colours.withAlpha(Colours.white, (obj.hover || obj.down) && !isDisabled ? 0.8 : 1.0));
		g.fillRoundedRectangle(a, obj.down ? 0.0 : {CornerSize: radius, Rounded:[0, 0, 1, 1]});

		// Base colour
		if (obj.down && !isDisabled)
			g.setGradientFill([Colours.withAlpha(obj.keyColour, 0.4), 0, 0, Colours.withAlpha(obj.keyColour, 0.5), 0, a[3]]);
		else
			g.setColour(Colours.withAlpha(obj.keyColour, 0.4 + (0.2 * isDisabled)));

		g.fillRoundedRectangle(a, obj.down ? 0.0 : {CornerSize: radius, Rounded:[0, 0, 1, 1]});
		
		// Outline
		g.setColour(Colours.withAlpha(Colours.black, 0.8));
		g.drawRoundedRectangle([a[0], a[1] - 1, a[2], a[3] + 1], obj.down ? 0.0 : {CornerSize: radius, Rounded:[0, 0, 1, 1]}, 1);
			
		// Text
		var noteName = Engine.getMidiNoteName(obj.noteNumber);
		
		if (noteName.indexOf("C") != -1)
		{
			g.setColour(Colours.black);
			g.setFont("semibold", 9);
			g.drawAlignedText(noteName, [a[0], a[1], a[2], a[3] - 5], "centredBottom");
		}
	});
	
	keyboard.registerFunction("drawBlackNote", function(g, obj)
	{
		var a = [obj.area[0] + 0.5, obj.area[1], obj.area[2] - 1, obj.area[3] - 11];
		var radius = 2;
		var isDisabled = obj.keyColour == 0;
		
		// Undercoat
		g.setColour(isDisabled ? 0xff333333 : obj.hover || obj.down ? 0xff444444: 0xff222222);
		g.fillRoundedRectangle(a, {CornerSize: radius, Rounded:[0, 0, 1, 1]});
		
		if (isDisabled)
			return;

		// Base colour
		if (obj.down)
			g.setGradientFill([Colours.withAlpha(obj.keyColour, 0.5), 0, a[3] / 4, Colours.withAlpha(obj.keyColour, 0.5), 0, a[3]]);
		else
			g.setColour(Colours.withAlpha(obj.keyColour, 0.5 - (0.1 * obj.hover)));

		g.fillRoundedRectangle(a, {CornerSize: radius, Rounded:[0, 0, 1, 1]});
	});
    
    // Mpe
    const mpe = Content.createLocalLookAndFeel();
    
    mpe.registerFunction("drawDialogButton", function(g, obj)
    {
		var a = obj.area;
		var text = obj.text;
		
		if (text == "Enable MPE Mode" && Engine.isMpeEnabled())
			text = "Disable MPE Mode";
			
    	obj.bgColour = 0xff161619;
    	obj.textColour = Colours.white;

		drawTextButton(obj, text, a);
    });
    
    mpe.registerFunction("drawScrollbar", function(g, obj)
    {
    	drawScrollbar(g, obj, 0xff302F34);
    });
    
    // Cell (as in table with columns and rows);
    const cell = Content.createLocalLookAndFeel();
    
    cell.registerFunction("drawTableHeaderBackground", function(g, obj) {});
    
    cell.registerFunction("drawTableHeaderColumn", function(g, obj)
    {
		var a = obj.area;

    	g.setColour(0xbbffffff);
    	g.setFont("bold", 16);
    	
   		g.drawAlignedText(obj.text.toUpperCase(), a, "left");
    });
    
    cell.registerFunction("drawScrollbar", function(g, obj)
    {
    	drawScrollbar(g, obj, 0xff302F34);
    });
    
    cell.registerFunction("drawPopupMenuBackground", function(g, obj)
    {
    	   	drawPopupMenuBackground();
    });
    
    cell.registerFunction("drawPopupMenuItem", function(g, obj)
    {
    	drawPopupMenuItem(g, obj);
    });
    
    cell.registerFunction("getIdealPopupMenuItemSize", function(obj)
    {
    	return [100, 25];
    });

    // Helper functions
    inline function drawComboBoxTitles(g, c, a)
    {
		local text = c.get("text");
		
	    g.setFont("bold", 16);
	    g.setColour(this.get("textColour"));

	    g.drawAlignedText(text, [a[0] + 2, a[1] - 33, a[2], 25], "left");
    }
    
    inline function getKnobRange(c)
    {
   		local min = c.get("min");
   		local max = c.get("max");
   		
   		if (c.get("mode") == "NormalizedPercentage")
   			return [parseInt(min * 100), parseInt(max * 100)];
   		
   		if (c.get("stepSize") == 1.0)
   			return [parseInt(min), parseInt(max)];

   		return [min, max];
    }
    
    inline function drawDefaultValueMarker(g, c)
    {
        local a = [c.get("x"), c.get("y"), c.getWidth(), c.getHeight()];
        local skew = Math.log(0.5) / Math.log((c.get("middlePosition") - c.get("min")) / (c.get("max") - c.get("min")));
        local normalized = ((c.get("defaultValue") - c.get("min")) / (c.get("max") - c.get("min")));
        local v = Math.pow(normalized, skew);
    	
        g.setColour(c.get("itemColour2"));
    	
        switch(c.get("style"))
        {
            case "Horizontal":
                local w = a[2] * 0.2;
                local x = a[0] + a[2] * v - (w + 4) * v;
                g.fillEllipse([x + w / 2 - 3 / 2, a[1] - 15, 6, 6]);
                break;
            
            case "Vertical":
                local h = a[3] * 0.2;
                local y = a[1] + a[3] - a[3] * v - (h + 2) + (h + 4) * v;
                g.fillEllipse([a[0] - 15, y + h / 2 - a[2] / 4 / 2, a[2] / 4, a[2] / 4]);
                break;
            
            case "Knob":
                local ctx = a[0] + a[2] / 2;
                local cty = a[1] + a[2] / 2 - 2;
                local offset = 2.5 * 2 * v - 2.5;
                local ang = Math.toRadians(v * offset);
                local x = ctx + a[2] * Math.sin(ang + offset);
                local y = cty + a[2] * -Math.cos(ang + offset);
                
                g.fillEllipse([x - 3, y - 3, 6, 6]);
                break;
        }
    }
    
    /**
    * title		String		Title to display at top centre
    * text		String		Text to display below icon/above content
    * icon		Array		[icon name, icon width, icon height]. Will be centred horizontally.
    */
    inline function fullPageBackground(title, text, icon)
    {
    	local area = this.getLocalBounds(0);
    	
    	g.fillAll(this.get("bgColour"));
    	
    	g.setFont("semibold", 26);
    	g.setColour(this.get("textColour"));
    	g.drawAlignedText(title, [0, 70, area[2], 50], "centred");
    	
    	g.setFont("regular", 20);
    	g.setColour(this.get("textColour"));
    	g.drawAlignedText(text, [0, 265, this.getWidth(), 30], "centred");
    	
    	g.fillPath(Paths.icons[icon[0]], [area[0] + area[2] / 2 - icon[1] / 2, 160, icon[1], icon[2]]);
	}

    inline function drawInput(component, icon, outline, extraWidth)
    {
    	g.setColour(component.get("itemColour2"));
    
    	local area = [component.get("x") - 10, component.get("y"), component.getWidth() + 13 + extraWidth, component.getHeight()];
    	g.fillRoundedRectangle(area, 3);
    	    	    	
    	if (icon != "")
    	{
    		area[0] -= 30;
    		area[2] += 30;
    		g.setColour(component.get("itemColour2"));
    		g.fillRoundedRectangle(area, 3);
    
    		g.setColour(Colours.withAlpha(component.get("textColour"), component.get("enabled") ? 1.0 : 0.5));
    		g.drawLine(area[0] + 35, area[0] + 35, area[1] + 4, area[1] + area[3] - 4, 1);		
    		g.fillPath(Paths.icons[icon.id], [area[0] + 35 / 2 - icon.width / 2, area[1] + area[3] / 2 - icon.height / 2, icon.width, icon.height]);
    	}
    	
    	if (outline)
    	{
    		g.setColour(Colours.black);
    		g.drawRoundedRectangle([area[0] + 0.5, area[1] + 0.5, area[2] - 1, area[3] - 1], 3, 1);
    	}
    }
    
    inline function drawPathButton(path, area, colours)
    {
        g.setColour(colours[0]);

        if (obj.over)
            g.setColour(colours[1]);
            
        if (obj.down)
            g.setColour(colours[2]);
            
        g.fillPath(path, area);
    }
        
    inline function drawTextButton(obj, text, area)
    {
		local alignment = "centred";
		local down = obj.down || obj.value;
    
		g.setColour(Colours.withAlpha(obj.bgColour, obj.over && obj.enabled ? 0.7 + 0.3 * down: 0.9 - (0.3 * !obj.enabled)));
        g.fillRoundedRectangle(area, 5);
    
        g.setColour(Colours.withAlpha(obj.textColour, obj.over && obj.enabled ? 0.8 + 0.2 * down: 0.9 - (0.3 * !obj.enabled)));
        g.setFont("semibold", 16);
        g.drawAlignedText(text, [area[0], area[1], area[2], area[3]], alignment);
    }
        
    /*
    colours = [background, text, icon]
    */
	inline function drawIconTextButton(area, icon, text, colours)
	{
	    local a = area;
	    
   	    g.setColour(Colours.withAlpha(colours[0], obj.over ? 0.8 - (0.3 * obj.down) : 1.0));
   	    g.fillRoundedRectangle(a, 5);
   	    
   	    g.setFont("medium", 18);
   	    g.setColour(colours[1]);
   	    g.drawAlignedText(text, [a[0], a[1], a[2], a[3]], "centred");
   	    
   	    local wh = a[3] / 2.6;
   	    g.setColour(colours[2]);
   	    g.fillPath(Paths.icons[icon], [a[0] + 12, a[1] + a[3] / 2 - wh / 2, wh, wh]); 
	}
        
    inline function floatingWindowBackground(g)
    {
		local area = this.getLocalBounds(10);
		
		g.drawDropShadow(area, Colours.black, 12);

		g.setColour(this.get("bgColour"));
		g.fillRoundedRectangle(area, 5);
		
		g.setColour(this.get("itemColour"));
		g.drawRoundedRectangle(area, 5, 2);
    }
    
    inline function drawPopupMenuBackground()
    {
	    local a = [0, 0, obj.width, obj.height];

	    g.fillAll(0xff1d1d21);

	    g.setColour(Colours.grey);
	    g.drawRect(a, 1);
    }
    
    inline function drawPopupMenuItem(g, obj)
    {
    	local a = obj.area;
    
    	if (!obj.isSeparator)
    	{
	    	if (obj.isHighlighted)
	    		g.fillAll(0xffa9a9a9);

	    	g.setFont("medium", 16);
	    	obj.isHighlighted ? g.setColour(Colours.black): g.setColour(Colours.lightgrey);
	    	g.drawFittedText(obj.text, [a[0] + 10, a[1], a[2] - 20, a[3]], "left", 1, 1.0);
    	}
    	else
    	{	
    		g.setColour(Colours.white);
	    	g.drawHorizontalLine(a[3] / 2, a[0] + 5, a[2] - 10);
    	}
    }
    
    inline function getIdealPopupMenuItemSize(obj)
    {
	    return [125, 30];
    }
    
    inline function drawScrollbar(g, obj, bgColour)
    {
    	local a = obj.area;
    	local ha = obj.handle;
    	local w = a[2] > 10 ? 10 : a[2];

    	g.setColour(Colours.withAlpha(bgColour, 0.5));
    	g.fillRoundedRectangle([a[0] + a[2] - w + 2, a[1], w - 4, a[3]], 3);

    	g.setColour(Colours.withAlpha(0xff696970, obj.over ? 0.8 + (0.2 * obj.down) : 0.5));
    	g.fillRoundedRectangle([ha[0] + a[2] - w, ha[1], w, ha[3]], 5);
    }
    
    inline function drawComboBox(g, obj)
    {
		local a = obj.area;

		g.setColour(0xff161619);
		g.fillRoundedRectangle(a, 3);
	    		
		g.setColour(Colours.black);
		g.drawRoundedRectangle([a[0] + 0.5, a[1] + 0.5, a[2] - 1, a[3] - 1], 3, 1);
	    
		if (a[2] > 55)
		{
			if (!["CustomSettings"].contains(obj.parentType))
		    	g.setColour(Colours.withAlpha(obj.itemColour1, obj.hover ? 1.0 : 0.8));
		    else
		    	g.setColour(Colours.withAlpha(Colours.lightgrey, obj.hover ? 1.0 : 0.8));

		    g.fillPath(Paths.icons.keyboardArrowDown, [a[0] + a[2] - 20, a[3] / 2 - 4, 12, 7]);
		}
		
		// Text
		g.setFont("medium", 18);

		if (!["CustomSettings"].contains(obj.parentType))
			g.setColour(obj.textColour);
		else
			g.setColour(Colours.white);

		if (a[2] <= 55 && !["CustomSettings"].contains(obj.parentType))
		    g.drawFittedText(obj.text, [a[0], a[1], a[2], a[3]], "centred", 1, 1);
		else
			g.drawFittedText(obj.text, [a[0] + 10, a[1], a[2] - a[2] / 4, a[3]], "left", 1, 1);		
    }

	inline function drawFloatingPanelBg()
	{
		local a = this.getLocalBounds(0);
		local radius = this.get("borderRadius");

		g.setColour(this.get("itemColour"));
		g.fillRoundedRectangle([a[0], a[1], a[2], 40], {CornerSize: radius, Rounded:[1, 1, 0, 0]});
		
		g.setColour(this.get("bgColour"));
		g.fillRoundedRectangle([a[0], a[1] + 40, a[2], a[3] - 40], {CornerSize: radius, Rounded:[0, 0, 1, 1]});
				
		g.setColour(this.get("textColour"));
		
		g.setFont("medium", 20);
		g.drawAlignedText(this.get("text"), [0, a[1], a[2], 40], "centred");		
	}
	
	inline function textButtonGridPanel(panel, numCols, numRows, labels)
	{
		panel.data.numCols = numCols;
		panel.data.numRows = numRows;
		panel.data.labels = labels;
		panel.data.hover = -1;
	
		panel.setPaintRoutine(function(g)
		{
			var a = this.getLocalBounds(0);
			var w = a[2] / this.data.numCols;
			var h = a[3] / this.data.numRows;

			for (i = 0; i < this.data.labels.length; i++)
			{
				var x = (i % 4) * w;
				var y = Math.floor(i / 4) * h;
				var active = this.getValue() == i && this.get("enabled");
	
				if (active)
					g.setColour(this.get("itemColour"));
				else
					g.setColour(Colours.withAlpha(this.get("bgColour"), this.data.hover == i ? 1.0 : 0.6 - (0.2 * !this.get("enabled"))));
				
				g.fillRoundedRectangle([x, y, w - 5, h - 5], this.get("borderRadius"));
				
				g.setColour(active ? this.get("itemColour2") : this.get("itemColour"));				
				g.fillEllipse([x + 5, y + 5, 5, 5]);
	
				g.setFont("medium", 15);
				g.setColour(Colours.withAlpha(this.get("textColour"), active ? 1.0 : 0.7));
				g.drawFittedText(this.data.labels[i], [x + 5, y + 5, w - 15, h - 15], "centred", 2, 1.0);
			}		
		});
		
		panel.setMouseCallback(function(event)
		{
			var col = Math.floor(event.x / this.getWidth() * this.data.numCols);
			var row = Math.floor(event.y / this.getHeight() * this.data.numRows);
			var value = 1 * row * this.data.numCols + col;
			
			this.data.hover = event.hover ? value : -1;
			
			if (value >= this.data.labels.length)
				return this.repaint();
	
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
	}

    // Value Popups
    Content.setValuePopupData(
    {
        "fontName": "medium",
        "fontSize": 16,
        "borderSize": 1,
        "borderRadius": 3,
        "margin": 5,
        "bgColour": Colours.withAlpha(Colours.white, 0.5),
        "itemColour": 0x88000000,
        "itemColour2": 0x88000000,
        "textColour": Colours.white
    });
    
    // Calls
    setCcNames();
}
