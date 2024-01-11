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

inline function createKnob(id, x, y, width, height, text, saveInPreset, callback, minValue, maxValue, stepSize, defaultValue, parent)
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
	k.setControlCallback(callback);

	Content.setPropertiesFromJSON(id, {
          parentComponent: parent
	});

	k.setLocalLookAndFeel(LAFSliderNEATBrain); // move this to outside the constructor...
	
	return k;
}

inline function createLabel(id, x, y, width, height, fontSize, text, parent, textColour, alignment)
{
	local p = Content.addPanel(id, x, y);

	p.set("width", width);
	p.set("height", height);
	p.set("text", text);
	p.data.textColour = textColour;
	p.data.alignment = alignment;

	p.data.text = text;
	p.data.fontSize = fontSize;
	
	Content.setPropertiesFromJSON(id, {
          parentComponent: parent
	});

	p.setPaintRoutine(function(g)
	{
		g.fillAll(Colours.withAlpha(Colours.grey, 0.0));
		g.setColour(this.data.textColour);
		g.setFont("bold", this.data.fontSize);
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