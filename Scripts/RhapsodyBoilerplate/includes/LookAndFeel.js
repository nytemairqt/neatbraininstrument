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
	
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/Asap-Regular.ttf", "regular");
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/Asap-Medium.ttf", "medium");
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/Asap-MediumItalic.ttf", "mediumItalic");
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/Asap-SemiBold.ttf", "semibold");
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/Asap-Bold.ttf", "bold");
	Engine.loadFontAs("{PROJECT_FOLDER}fonts/JosefinSans-Bold.ttf", "title");
	
    const laf = Engine.createGlobalScriptLookAndFeel();
    
    reg style = {
	    "card": 
	    {
		  "bg": 0xff1d1d21
	    },
	    "presetBrowser":
	    {
		    "columnBg": 0xff161619,
		    "searchBarBg": 0xff161619,
		    "searchBarIcon": 0xff9f9fb1,
		    "iconButtonBg": Colours.white,
		    "itemSelected": 0xff302f34,
		    "itemHighlight": 0xffe9e9e9,
		    "itemText": Colours.white,
	    },
	    "alertWindow": {
		    "textButtonBg": 0xff161619,
		    "textButtonTextColour": Colours.white
	    },
	    "comboBox":
	    {
		    "bg": 0xff161619,
		    "itemColour": Colours.lightgrey,
		    "itemColour1": 0xffa9a9a9,
		    "textColour": Colours.white 
	    },
	    "cell": {
		    "columnHeader": {text: 0xbbffffff}
	    }
    };

	if (isDefined(Theme.style))
	{
	    for (x in style)
	    {
		    if (isDefined(Theme.style[x]))
		    	style[x] = Theme.style[x];
	    }
    }

	// empty
	const empty = Content.createLocalLookAndFeel();
	
	empty.registerFunction("drawToggleButton", function(g, obj) {});
	empty.registerFunction("drawRotarySlider", function(g, obj) {});

	// table
	const table = Content.createLocalLookAndFeel();

	table.registerFunction("drawTableBackground", function(g, obj)
	{
		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(obj.area, 3);
	});

	table.registerFunction("drawTablePath", function(g, obj)
	{
		var a = obj.area;

		g.setColour(obj.itemColour);
		g.fillPath(obj.path, a);
		
	    g.setColour(obj.itemColour2);
	    g.drawPath(obj.path, a, 2.0);
	});
	
	table.registerFunction("drawTablePoint", function(g, obj)
	{
		var a = obj.tablePoint;

		g.setColour(Colours.withAlpha(obj.itemColour2, obj.hover ? 1.0 : 0.8));
		g.fillEllipse(a);
	});

	table.registerFunction("drawTableRuler", function(g, obj)
	{
		var x = obj.position * obj.area[2];
		
	    g.setColour(Colours.withAlpha(obj.itemColour2, 0.1));	       
	    g.drawLine(x, x, 0, obj.area[3], 10.0);

	    g.setColour(obj.itemColour2);
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
		g.fillAll(style.card.bg);
		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(obj.area, 3);
	});
	
	laf.registerFunction("drawAhdsrPath", function(g, obj)
	{
		var a = obj.area;
		var p = obj.path;
		
		if (obj.enabled)
			g.setColour(obj.itemColour);
		else
			g.setColour(Colours.withAlpha(obj.itemColour, 0.2));

		g.fillPath(p, a);
		
		g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled && obj.isActive ? 0.2 : 0.0));
		g.fillPath(p, a);

		if (!obj.isActive)
		{
			g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1.0 : 0.5));
			g.drawPath(p, a, 2.0);
		}
	});

	laf.registerFunction("drawAhdsrBall", function(g, obj)
	{
		g.setColour(obj.itemColour2);

		if (obj.enabled)
			g.fillEllipse([obj.position[0] - 5, obj.position[1] - 5, 10, 10]);
	});

	// knob
	const knob = Content.createLocalLookAndFeel();
	
	knob.registerFunction("drawRotarySlider", function(g, obj)
	{
		var a = [obj.area[0] + 2, obj.area[1], obj.area[2] - 4, obj.area[3] - 4];
		var shadow = 4;
		
		if (obj.enabled)
		{
			g.setColour(Colours.withAlpha(Colours.black, obj.enabled ? 0.2 : 0.1));
			g.fillEllipse([a[0], a[1] + shadow, a[2], a[3]]);
		}
		
		g.setColour(Colours.withAlpha(obj.bgColour, obj.enabled ? 1.0 : 0.5));
		g.fillEllipse(a);
		
        var startOffset = 2.5;
        var endOffset = startOffset * 2 * obj.valueNormalized - startOffset;
        var markWidth = obj.area[2] / 12;
        
        g.rotate(endOffset, [obj.area[2] / 2, obj.area[2] / 2 - 2]);
        g.setColour(Colours.withAlpha(obj.itemColour1, obj.enabled ? 1.0 : 0.5));
        g.fillRoundedRectangle([2 + a[2] / 2 - markWidth / 2, 2, markWidth, a[3] / 3], 2);
	});
    
	// horizontalSlider
	const horizontalSlider = Content.createLocalLookAndFeel();
    
    horizontalSlider.registerFunction("drawLinearSlider", function(g, obj)
    {
		var a = obj.area;
	    
		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(a, 8);
	    
		g.setColour(obj.itemColour1);
		g.fillRoundedRectangle([12, a[3] / 2 - 3 / 2, a[2] - 24, 3], 2);
		
		var w = a[2] * 0.2;
		
		g.setColour(Colours.withAlpha(obj.itemColour2, obj.enabled ? 1 : 0.5));

		if (w >= 30)
		{
		    var x = a[2] * obj.valueNormalized - (w + 4) * obj.valueNormalized + 2;
		    g.fillRoundedRectangle([x + 1, a[3] / 2 - (a[3] - 4) / 2, w - 2, a[3] - 4], 8);
		    
		    g.setColour(obj.textColour);
		    g.fillEllipse([x + w / 2 - a[3] / 4 / 2, a[3] / 2 - a[3] / 4 / 2, a[3] / 4, a[3] / 4]);
		}                
		else
		{
		    var c = a[3] - 4;
		    var x = a[2] * obj.valueNormalized - (c + 4) * obj.valueNormalized + 2;
		    g.fillEllipse([x, a[3] / 2 - c / 2, c, c]);
		    g.setColour(obj.textColour);
		    g.fillEllipse([x + c / 2 - a[3] / 4 / 2, a[3] / 2 - a[3] / 4 / 2, a[3] / 4, a[3] / 4]);
		}
    });
    
    // verticalSlider
    const verticalSlider = Content.createLocalLookAndFeel();
    
    verticalSlider.registerFunction("drawLinearSlider", function(g, obj)
    {
		var a = obj.area;
	    
		g.setColour(obj.bgColour);
		g.fillRoundedRectangle(a, 10);

		g.setColour(obj.itemColour1);
		g.fillRoundedRectangle([a[2] / 2 - 3 / 2, 12, 3, a[3] - 24], 2);
		
		var h = a[3] * 0.2;
		
		obj.enabled == 1 ? g.setColour(obj.itemColour2) : g.setColour(Colours.withAlpha(obj.itemColour2, 0.5));
		
		if (h > 30)
		{
		    var y = a[3] - a[3] * obj.valueNormalized - (h + 2) + (h + 4) * obj.valueNormalized;
		    
		    g.fillRoundedRectangle([a[2] / 2 - (a[2] - 4) / 2, y + 1, a[2] - 4, h - 2], 8);
		
		    g.setColour(obj.textColour);
		    g.fillEllipse([a[2] / 2 - a[2] / 4 / 2, y + h / 2 - a[2] / 4 / 2, a[2] / 4, a[2] / 4]);
		}
		else
		{
		    var c = a[2] - 4;
		    var y = a[3] - a[3] * obj.valueNormalized - (c + 2) + (c + 4) * obj.valueNormalized;
		    
		    g.fillEllipse([a[2] / 2 - c / 2, y, c, c]);
		    g.setColour(obj.textColour);
		    g.fillEllipse([a[2] / 2 - a[2] / 4 / 2, y + c / 2 - a[2] / 4 / 2, a[2] / 4, a[2] / 4]);
		}	    
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
			g.setFont("semibold", 16 + 3 * (Engine.getOS() == "WIN"));
			g.setColour(Colours.white);
			g.drawFittedText(obj.text, [a[3] + 8, a[1], a[2] - a[3] - 8, a[3] - 2 * (Engine.getOS() == "WIN")], "left", 1, 1.0);
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
		drawTextButton(obj.text, obj.area, [obj.bgColour, Colours.withAlpha(obj.bgColour, 0.8), Colours.withAlpha(obj.bgColour, 0.5), obj.textColour], 18);	
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
		
    	g.setFont("medium", 18 + 3 * (Engine.getOS() == "WIN"));
    	g.setColour(Colours.withAlpha(obj.textColour, obj.value ? 1.0 : 0.6));

    	g.drawAlignedText(text, [a[0], a[1], a[2], a[3] - 2 * (Engine.getOS() == "WIN")], alignment);
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
			g.setFont("semibold", 16 + 3 * (Engine.getOS() == "WIN"));
			g.setColour(obj.textColour);
			g.drawAlignedText(obj.text, [a[3] + 10, a[1], a[2] - a[3], a[3] - 2 * (Engine.getOS() == "WIN")], "left");
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
		g.setFont("medium", 14 + 3 * (Engine.getOS() == "WIN"));
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
		return [250, 25];
	});
	
	// Preset browser
	const presetBrowser = Content.createLocalLookAndFeel();
    
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
        
        g.setFont("semibold", 20 + 3 * (Engine.getOS() == "WIN"));
        g.setColour(Colours.white);
        g.drawAlignedText(obj.title, [a[0] - 35, a[1] - 50, a[2] + 100, h], "left");
        
        g.setColour(Colours.withAlpha(Colours.white, 0.3));
        g.drawRect([a[0] - 50, a[1] - 50, a[2] + 100, a[3] + 100], 1);

        g.setFont("medium", 18 + 3 * (Engine.getOS() == "WIN"));
        g.setColour(Colours.white);
        
        if (obj.labelArea[2] != 0)
        {
            g.drawAlignedText(obj.text, [a[0], a[1] + 15, a[2], 20], "centred");
            g.setColour(style.presetBrowser.searchBarBg);
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
	        
	    if (a[2] > 300 && obj.text != "")
	        obj.text = "No Results";

		g.setColour(style.presetBrowser.columnBg);
	    g.fillRoundedRectangle([a[0], a[1], a[2], a[3]], 5);
	    
	    g.setColour(obj.textColour);
	    g.setFont("medium", 18 + 3 * (Engine.getOS() == "WIN"));
	    g.drawAlignedText(obj.text, [a[0], a[1] - 10, a[2], a[3]], "centred");
    });

    presetBrowser.registerFunction("drawPresetBrowserListItem", function(g, obj)
    {
        var a = [obj.area[0] + 5, obj.area[1], obj.area[2] - 10, obj.area[3]];
        var col = obj.columnIndex;
        
        if (col == -1)
        {
			var alpha = 0.6;
			
			if (obj.selected)
				alpha += 0.3;

			if (obj.hover)
				alpha += 0.1;

			g.setColour(Colours.withAlpha(Colours.white, alpha));

			if (this.isImageLoaded(obj.text))
				g.drawImage(obj.text, [a[0], a[1], a[2], a[3] - 30], 0, 0);
			else
				drawExpansionPlaceholder();

			g.setColour(style.presetBrowser.itemSelected);
			g.fillRoundedRectangle([a[0], a[1] + a[3] - 30, a[2], 25], {CornerSize: 5, Rounded:[0, 0, 1, 1]});
	    	
	    	g.setFont("regular", 18 + 3 * (Engine.getOS() == "WIN"));
	    	g.setColour(Colours.withAlpha(Colours.white, alpha));
	    	g.drawAlignedText(obj.text, [a[0], a[1] + a[3] - 30, a[2], 25], "centred");
        }
		else
		{
			if (obj.selected)
			{
				g.setColour(style.presetBrowser.itemHighlight);
				g.fillRoundedRectangle([a[0] - 5, a[1], 5, a[3]], {CornerSize: 5, Rounded:[1, 0, 1, 0]});
			}

			g.setColour(Colours.withAlpha(style.presetBrowser.itemSelected, obj.hover && !obj.selected ? 0.5 : 0.8));
			
			if (obj.selected)
				g.fillRoundedRectangle([a[0], a[1], a[2] + 5, a[3]], {CornerSize: 5, Rounded:[0, 1, 0, 1]});
			else if (obj.hover)
				g.fillRoundedRectangle([a[0] - 5, a[1], a[2] + 10, a[3]], 5);

			g.setColour(style.presetBrowser.itemText);

			g.setFont("medium", 20 + 3 * (Engine.getOS() == "WIN"));
			
			if (col == 2) a[0] += 10;
			
			var t = obj.text;

			if (t.indexOf(" (") != -1)
				t = t.substring(0, t.indexOf(" ("));
			
			g.drawFittedText(t, [a[0] + 8 + (8 * (col == 2)), a[1], a[2] - 16, a[3]], "left", 1, 1.0);
		}
    });

	inline function drawExpansionPlaceholder()
	{
		g.setColour(0x882F2F34);
		g.fillRoundedRectangle([a[0], a[1], a[2], a[3] - 30], {CornerSize: 5, Rounded: [1, 1, 0, 0]});
		
		g.setColour(0xffe2e2e2);
		g.fillPath(Paths.rhapsodyLogoWithBg, [a[0] + a[2] / 2 - a[2] / 5 / 2, a[1] + (a[3] - 35) / 2 - a[2] / 5 / 2, a[2] / 5, a[2] / 5]);
	}

	presetBrowser.registerFunction("drawScrollbar", function(g, obj)
	{
		drawScrollbar(g, obj, 0xff302F34);
	});
        
    presetBrowser.registerFunction("drawPresetBrowserSearchBar", function(g, obj)
    {
        var a = obj.area;
        var wh = a[3] / 2.0;

        g.setColour(style.presetBrowser.searchBarBg);
        g.fillRoundedRectangle([a[0] + 20, a[1], a[2] - 20, a[3]], 5);

        g.setColour(style.presetBrowser.searchBarIcon);
        g.fillPath(obj.icon, [a[0] + a[2] - 30, a[1] + a[3] / 2 - wh / 2 - 1, wh, wh]);      
    });
    
    presetBrowser.registerFunction("drawDialogButton", function(g, obj)
    {
		var a = obj.area;
		var editButtons = ["Add", "Rename", "Delete"];    
		
		if (editButtons.contains(obj.text))
		{
			var icons = ["add", "edit", "trash"];
			var path = Paths.icons[icons[editButtons.indexOf(obj.text)]];
			var bgColour = style.presetBrowser.iconButtonBg;

			if (obj.text == "Delete")
				a = [a[0] + a[2] / 2 - 10, a[1] + a[3] / 2 - 11, 20, 22];
			else
				a = [a[0] + a[2] / 2 - 11, a[1] + a[3] / 2 - 11, 22, 22];

			drawPathButton(path, a, [Colours.withAlpha(bgColour, 0.8), Colours.withAlpha(bgColour, 1.0), Colours.withAlpha(bgColour, 0.5)]);
		}
		else if (obj.text == "Show Favorites" || obj.text == "Save Preset")
		{
			var icon = obj.text == "Show Favorites" ? "star" : "save";
			var text = obj.text == "Show Favorites" ? "Favourites" : "Save Preset";
			
			drawIconTextButton([a[0], a[1], a[2], a[3] - 1], icon, text, [0xff161619, Colours.white, 0xff9F9FB1]);
		}
		else
		{
			var text = obj.text;
			var bgColour = style.alertWindow.textButtonBg;
			var textColour = style.alertWindow.textButtonTextColour;
			
			drawTextButton(text, a, [bgColour, Colours.withAlpha(bgColour, 0.7), Colours.withAlpha(bgColour, 0.5), textColour], 18);
		}
    });
    
    presetBrowser.registerFunction("createPresetBrowserIcons", function(id)
    {
        if (id == "favorite_on")
            return Paths.icons.star;
    
        if (id == "favorite_off")
            return Paths.icons.starOutline;
    });

    // Alert window    
    laf.registerFunction("drawAlertWindow", function(g, obj)
    {        
        var a = obj.area;
        var h = 40;

		g.fillAll(0xff2F2F34);

        g.setColour(0xff161619);
        g.fillRect([a[0], a[1], a[2], h]);

        g.setFont("semibold", 20 + 3 * (Engine.getOS() == "WIN"));
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
    	
    	var bgColour = style.alertWindow.textButtonBg;
    	var textColour = style.alertWindow.textButtonTextColour;
    	var text = obj.text;

		if (["Update Available", "Exit", "Open Website", "Overwrite Preset"].contains(obj.parentName))
			text = obj.text == "OK" ? "Yes" : "No";

   		drawTextButton(text, a, [Colours.withAlpha(bgColour, 1.0), Colours.withAlpha(bgColour, 0.7), Colours.withAlpha(bgColour, 0.5), textColour], 16);
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

    	g.setColour(Colours.withAlpha(obj.itemColour2, 0.2 + value));

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

		if (obj.down)
			a[3] += 1;
	
		g.setColour(Colours.white);
		g.fillRoundedRectangle(a, radius);
		
		g.setColour(0xff161619);
		g.fillRect([a[0], a[1], a[2], 1]);
		
		if (obj.down)
		{
			g.setGradientFill([0x00, a[0], a[1], Colours.withAlpha(Colours.black, 0.2), a[0], a[3]]);
			g.fillRect(a);
		}
		
		if (obj.keyColour != 0)
		{
			g.setColour(obj.keyColour);
			g.fillRoundedRectangle(a, radius);
		}

		if (obj.hover)
		{
			g.setColour(Colours.withAlpha(Colours.coral, 0.3));
			obj.down ? g.fillRect(a) : g.fillRoundedRectangle(a, radius);
		}
	
		g.setColour(Colours.withAlpha(0xff161619, 1.0));
		g.drawRoundedRectangle([a[0], a[1] - 1, a[2], a[3] + 1], radius - (radius * obj.down), 1);
		
		var noteName = Engine.getMidiNoteName(obj.noteNumber);
		
		if (noteName.indexOf("C") != -1)
		{
			g.setColour(Colours.black);
			g.setFont("semibold", 10);
			g.drawAlignedText(noteName, [a[0], a[1] + a[3] - 20, a[2], 20], "centred");
		}
		
		g.setGradientFill([Colours.withAlpha(Colours.black, 0.2), a[2] / 2, 0, 0x00, a[2] / 2, a[3] / 4]);
		g.fillRoundedRectangle(a, radius);
	});
	
	keyboard.registerFunction("drawBlackNote", function(g, obj)
	{
		var a = [obj.area[0] + 0.5, obj.area[1], obj.area[2] - 1, obj.area[3] - 11];
	
		g.setColour(0xff454545);
		g.fillRoundedRectangle(a, 1);

		g.setColour(0xff161619);
		g.fillRect([a[0], a[1], a[2], 1]);
	
		if (obj.down)
		{
			g.setGradientFill([0x00, a[0], a[1], Colours.withAlpha(Colours.grey, 0.7), a[0], a[3]]);
			g.fillRect(a);
		}
	
		if (obj.keyColour != 0)
		{
			g.setColour(obj.keyColour);
			g.fillRoundedRectangle(a, 1);
		}
			
		if (obj.hover)
		{
			g.setColour(Colours.withAlpha(Colours.coral, 0.3));
			obj.down ? g.fillRect(a) : g.fillRoundedRectangle(a, 1);
		}
		
		g.setGradientFill([Colours.withAlpha(Colours.black, 0.5), a[2] / 2, 0, 0x00, a[2] / 2, a[3] / 4]);
		g.fillRoundedRectangle(a, 3);
	});
    
    // Mpe
    const mpe = Content.createLocalLookAndFeel();
    
    mpe.registerFunction("drawDialogButton", function(g, obj)
    {
		var a = obj.area;
		var text = obj.text;
		
		if (text == "Enable MPE Mode" && Engine.isMpeEnabled())
			text = "Disable MPE Mode";
			
		var bgColour = style.alertWindow.textButtonBg;
		var textColour = style.alertWindow.textButtonTextColour;
		
		drawTextButton(text, a, [bgColour, Colours.withAlpha(bgColour, 0.7), Colours.withAlpha(bgColour, 0.5), textColour], 16);
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

    	g.setColour(style.cell.columnHeader.text);
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
    inline function drawKnobRange(g, c, pnl, range)
    {
        local a = [c.get("x"), c.get("y"), c.getWidth(), c.getHeight()];
    
        g.setColour(c.get("textColour"));
       
       	if (a[3] > 50)
       	{
			g.fillEllipse([a[0] - 4, a[1] + a[3] - 1, 10, 10]);
			g.fillEllipse([a[0] + a[2] - 6, a[1] + a[3] - 1, 10, 10]);

	        local p = Content.createPath();
	        p.addArc([a[0] - 15, a[1] - 17, a[2] + 30, a[3] + 30], -2.5, 2.5);
	    
	        local pathArea = p.getBounds(1);
	        g.drawPath(p, pathArea, 3);	       	
       	}
    
    	local knobRange = range;
    	
    	if (!isDefined(range) || !range.length)
    		knobRange = getKnobRange(c);
    
    	local suffix = c.get("text").contains("[no_suffix]") ? "" : c.get("suffix");

       	g.setFont("regular", 14 + 3 * (Engine.getOS() == "WIN"));
       	g.setColour(c.get("itemColour2"));
       	g.drawAlignedText(knobRange[0], [a[0] - a[2] / 2 + 1, a[1] + a[3] + (16 * (a[3] > 50)), a[2], 20], "centred");
       	g.drawAlignedText(knobRange[1] + suffix, [a[0] + a[2] - a[2] / 2 - 1, a[1] + a[3] + (16 * (a[3] > 50)), a[2], 20], "centred");
    }

    inline function drawKnobTitles(g, text, a, range)
    {
    	g.setFont("bold", 16 + 3 * (Engine.getOS() == "WIN"));
    	g.setColour(this.get("textColour"));

    	local y = a[1] - 30;

    	if (a[2] == 55)
	    	y = (isDefined(range) && !range) ? a[1] - 35 : a[1] - 72;    		

    	g.drawAlignedText(text, [a[0] - 20, y, a[2] + 40, 25], "centred");
    }

    inline function drawComboBoxTitles(g, c, a)
    {
		local text = c.get("text");
		
	    g.setFont("bold", 16 + 3 * (Engine.getOS() == "WIN"));
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
    
    inline function setKnobPopupFunction(c)
    {	
    	if (c.get("min") == 0 && c.get("max") == 127 && c.get("suffix") == "%")
    	{
    		c.setValuePopupFunction(function(value)
    		{
    			return Engine.doubleToString(Math.floor(value / 127 * 100), 0) + "%";
    		});
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
    	
    	g.setFont("semibold", 26 + 3 * (Engine.getOS() == "WIN"));
    	g.setColour(this.get("textColour"));
    	g.drawAlignedText(title, [0, 70, area[2], 50], "centred");
    	
    	g.setFont("regular", 20 + 3 * (Engine.getOS() == "WIN"));
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
    
    /*
    colours = [background, over, down, text]
    */
    inline function drawTextButton(text, area, colours, fontSize)
    {
		local alignment = "centred";
		local c = colours[0];

        if (obj.over)
            c = colours[1];

        if (obj.down)
            c = colours[2];

		if (!obj.enabled)
			c = Colours.withAlpha(colours[0], 0.5);

		g.setColour(c);

        g.fillRoundedRectangle(area, 5);

        g.setColour(colours[3]);
        g.setFont("semibold", fontSize + 3 * (Engine.getOS() == "WIN"));
        g.drawAlignedText(text, area, alignment);
    }
        
    /*
    colours = [background, text, icon]
    */
	inline function drawIconTextButton(area, icon, text, colours)
	{
	    local a = area;
	    
   	    g.setColour(Colours.withAlpha(colours[0], obj.over ? 0.8 - (0.3 * obj.down) : 1.0));
   	    g.fillRoundedRectangle(a, 5);
   	    
   	    g.setFont("medium", 18 + 3 * (Engine.getOS() == "WIN"));
   	    g.setColour(colours[1]);
   	    g.drawAlignedText(text, [a[0], a[1], a[2], a[3] - 2 * (Engine.getOS() == "WIN")], "centred");
   	    
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
	    		g.fillAll(style.comboBox.itemColour1);

	    	g.setFont("medium", 16 + 3 * (Engine.getOS() == "WIN"));
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

		g.setColour(style.comboBox.bg);
		g.fillRoundedRectangle(a, 3);
	    		
		g.setColour(Colours.black);
		g.drawRoundedRectangle([a[0] + 0.5, a[1] + 0.5, a[2] - 1, a[3] - 1], 3, 1);
	    
		if (a[2] > 55)
		{
			if (!["CustomSettings"].contains(obj.parentType))
		    	g.setColour(Colours.withAlpha(obj.itemColour1, obj.hover ? 1.0 : 0.8));
		    else
		    	g.setColour(Colours.withAlpha(style.comboBox.itemColour, obj.hover ? 1.0 : 0.8));

		    g.fillPath(Paths.icons.caretDown, [a[0] + a[2] - 20, a[3] / 2 - 4, 12, 8]);
		}
		
		// Text
		g.setFont("medium", 18 + 3 * (Engine.getOS() == "WIN"));

		if (!["CustomSettings"].contains(obj.parentType))
			g.setColour(obj.textColour);
		else
			g.setColour(style.comboBox.textColour);

		if (a[2] <= 55 && !["CustomSettings"].contains(obj.parentType))
		    g.drawFittedText(obj.text, [a[0], a[1] - (Engine.getOS() == "WIN") - 1, a[2], a[3]], "centred", 1, 1);
		else
			g.drawFittedText(obj.text, [a[0] + 10, a[1] - 1, a[2] - a[2] / 4, a[3]], "left", 1, 1);		
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
		
		local fontSizeModifier = Engine.getOS() == "WIN" ? 3 : 0;
		g.setFont("medium", 20 + (3 * (Engine.getOS() == "WIN")));
		g.drawAlignedText(this.get("text"), [0, a[1] - (Engine.getOS() == "WIN"), a[2], 40], "centred");		
	}
	
	inline function drawRadialLabels(g, c, labels)
	{
		local a = [(this.getWidth() - this.getHeight()) / 2, 0, this.getHeight(), this.getHeight()];		
		local start = -Math.PI/4.0;
		local arc = 3.0 * Math.PI / 2.0;
		local step = arc / (labels.length-1);
		local reversePoint = Math.floor(labels.length / 2.0);
		local indent = 170;

		g.rotate(start, [a[0] + a[2] / 2, a[3] / 2]);

		for (i = 0; i < labels.length; i++)
		{
			g.setFont("bold", 16 + 3 * (Engine.getOS() == "WIN"));
			g.setColour((c.getValue() == i ) ? this.get("itemColour") : this.get("textColour"));
			
			if (!c.get("enabled"))
				g.setColour(Colours.withAlpha(this.get("textColour"), 0.3));

			if (i < reversePoint)
			{
				g.drawAlignedText(labels[i], [a[0] - indent, a[1], a[2], a[3]], "right");
				g.rotate(step, [a[0] + a[2] / 2, a[3] / 2]);
				continue;
			}
			
			if (i == reversePoint)
				g.rotate(Math.PI, [a[0] + a[2] / 2, a[3] / 2]);
			
			g.drawAlignedText(labels[i], [a[0] + indent, a[1], a[2], a[3]], "left");
			g.rotate(step, [a[0] + a[2] / 2, a[3] / 2]);
		}
	}

    // Value Popups
    Content.setValuePopupData(
    {
        "fontName": "bold",
        "fontSize": 20,
        "borderSize": 2,
        "borderRadius": 5,
        "margin": 10,
        "bgColour": Colours.lightgrey,
        "itemColour": 0xa8000000,
        "itemColour2": 0xa8000000,
        "textColour": Colours.white
    });
}

