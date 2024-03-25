/*
    Copyright 2023, 2024 iamlamprey

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

/* Constructors */
   	
inline function createButton(id, x, y, width, height, text, saveInPreset, callback, isMomentary, visible, parent)
{
	local b = Content.addButton(id, x, y);
	
	b.set("width", width);
	b.set("height", height);
	b.set("text", text);
	b.set("saveInPreset", saveInPreset);
	b.set("isMomentary", isMomentary);
	b.set("visible", visible);
	b.setControlCallback(callback);
	
	Content.setPropertiesFromJSON(id, {
	          parentComponent: parent
		});
	
	return b;
}

inline function createComboBox(id, x, y, width, height, text, saveInPreset, callback, items, visible, parent)
{
	local c = Content.addComboBox(id, x, y);
	
	c.set("width", width);
	c.set("height", height);
	c.set("text", text);
	c.set("saveInPreset", saveInPreset);
	c.set("visible", visible);
	c.setControlCallback(callback);
	
	c.set("items", "");
	
	for (item in items)
		c.addItem(item);
	
	
	
	Content.setPropertiesFromJSON(id, {
	          parentComponent: parent,
		});
	
	return c;
}

inline function createKnob(id, x, y, width, height, text, saveInPreset, callback, minValue, maxValue, stepSize, defaultValue, parent, isParameter)
{
	local k = Content.addKnob(id, x, y);
	
	k.set("text", text);
	k.set("min", minValue);
	k.set("max", maxValue);
	k.set("stepSize", stepSize);
	k.set("defaultValue", defaultValue);
	k.set("width", width);
	k.set("height", height);
	
	k.set("saveInPreset", saveInPreset);
	k.set("isPluginParameter", isParameter);
	if (isParameter)
		k.set("pluginParameterName", text);
	k.setControlCallback(callback);

	Content.setPropertiesFromJSON(id, {
          parentComponent: parent
	});

	k.setLocalLookAndFeel(LAFSliderNEATBrain); // move this to outside the constructor...
	
	return k;
}

inline function createLabel(id, x, y, width, height, fontSize, style, text, parent, textColour, alignment)
{
	local p = Content.addPanel(id, x, y);

	p.set("width", width);
	p.set("height", height);
	p.set("text", text);
	p.data.textColour = textColour;
	p.data.alignment = alignment;
	p.data.style = style;

	p.data.text = text;
	p.data.fontSize = fontSize;
	
	Content.setPropertiesFromJSON(id, {
          parentComponent: parent
	});

	p.setPaintRoutine(function(g)
	{
		g.fillAll(Colours.withAlpha(Colours.grey, 0.0));
		g.setColour(this.data.textColour);
		g.setFont(this.data.style, this.data.fontSize);
		g.drawAlignedText(this.data.text, [0, 0, this.getWidth(), this.getHeight()], this.data.alignment);
	});
	
	return p;
}

inline function createChildPanel(id, x, y, width, height, parent)
{
	local p = Content.addPanel(id, x, y);

	p.set("width", width);
	p.set("height", height);
	
	Content.setPropertiesFromJSON(id, {
          parentComponent: parent
	});	
	
	return p;
}