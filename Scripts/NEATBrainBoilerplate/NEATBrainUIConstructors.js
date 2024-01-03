/* Constructors */
   	
inline function createButton(id, x, y, width, height, text, saveInPreset, callback, isMomentary, visible)
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
	          parentComponent: "pnlBody"
		});
	
	return b;
}

inline function createKnob(id, x, y, width, height, text, saveInPreset, callback, minValue, maxValue, stepSize, defaultValue)
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
          parentComponent: "pnlBody"
	});

	k.setLocalLookAndFeel(LAFSliderNEATBrain); // move this to outside the constructor...
	
	return k;
}

inline function createLabel(id, x, y, width, height, fontSize, text)
{
	local p = Content.addPanel(id, x, y);

	p.set("width", width);
	p.set("height", height);
	p.set("text", text);

	p.data.text = text;
	p.data.fontSize = fontSize;
	
	Content.setPropertiesFromJSON(id, {
          parentComponent: "pnlBody"
	});

	p.setPaintRoutine(function(g)
	{
		g.fillAll(Colours.withAlpha(Colours.grey, 0.0));
		g.setColour(Colours.withAlpha(Colours.grey, 1.0));
		g.setFont("bold", this.data.fontSize);
		g.drawAlignedText(this.data.text, [0, 0, this.getWidth(), this.getHeight()], "centred");

	});
	
	return p;
}

inline function createChildPanel(id, x, y, width, height)
{
	local p = Content.addPanel(id, x, y);

	p.set("width", width);
	p.set("height", height);
	
	Content.setPropertiesFromJSON(id, {
          parentComponent: "pnlBody"
	});

	p.setPaintRoutine(function(g)
	{
		g.fillAll(pnlBodyColour);

		//g.fillAll(Colours.withAlpha(Colours.grey, 0.4));
	});
	
	return p;
}