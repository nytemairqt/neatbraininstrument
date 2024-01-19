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

namespace Card
{
	const components = {};

	// pnlCard
	const pnlCard = Content.getAllComponents("pnlCard*");
	
	for (x in pnlCard)
	{
		x.set("allowCallbacks", "All Callbacks");
		
		if (!isDefined(x.data.children))
			x.data.children = [];

		if (!isDefined(x.data.tabs))
			x.data.tabs = [];

		for (y in x.getChildComponents())
		{
			if (y.get("type") == "ScriptPanel" && y.get("parentComponent") == x.getId())
			{
				x.data.children.push(y);
				x.data.tabs.push(y.get("text"));
			}
		}

		x.setValue(0);
		x.data.hover = -1;
		
		x.setControlCallback(onpnlCardControl);
		x.setPaintRoutine(function(g) {cardPaintRoutine(g);});
		x.setMouseCallback(function(event) {cardMouseCallback(event);});
	}
	
	inline function onpnlCardControl(component, value)
	{
		for (i = 0; i < component.data.children.length; i++)
			component.data.children[i].showControl(i == value);
		
		component.repaint();
	}

	inline function cardPaintRoutine(g)
	{
		local a = this.getLocalBounds(0);
		local radius = this.get("borderRadius");

		g.setColour(this.get("itemColour"));
		g.fillRoundedRectangle([a[0], a[1], a[2], 40], {CornerSize: radius, Rounded:[1, 1, 0, 0]});
		
		g.setColour(this.get("bgColour"));
		g.fillRoundedRectangle([a[0], a[1] + 40, a[2], a[3] - 40], {CornerSize: radius, Rounded:[0, 0, 1, 1]});
		
		for (i = 0; i < this.data.tabs.length; i++)
		{
			local text = this.data.tabs[i];
			local w = a[2] / this.data.tabs.length;

			g.setColour(Colours.withAlpha(this.get("textColour"), this.data.hover == i || i == this.getValue() ? 1.0 : 0.6));
			g.setFont("medium", this.getValue() == i ? 20 : 16);
			g.drawAlignedText(text, [w * i, a[1], w, 40], "centred");

			if (i > 0)
			{
				g.setColour(Colours.withAlpha(this.get("textColour"), 0.5));
				g.drawVerticalLine(w * i, a[0] + 8, 32);
			}
		}		
	}
	
	inline function cardMouseCallback(event)
	{
		local value = Math.floor(event.x / this.getWidth() * this.data.tabs.length);

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
	}
	
	// Functions
	inline function drawComponents()
	{
		local exclude = ["pnlHeader", "pnlFooter", "pnlContainer", "pnlStatusBar", "pnlPresetBrowser", "pnlAdmin"];
		local panels = [];		
		
		for (x in Content.getAllComponents("(knb)|(flt)|(tbl)|(cmb)"))
		{
			local parentId = x.get("parentComponent");

			if (parentId.indexOf("pnl") == -1 || exclude.indexOf(parentId) != -1 || parentId.contains("pnlSettingsTab")) continue;
			
			if (!isDefined(components[parentId]))
			{
				components[parentId] = [];
				panels.push(Content.getComponent(parentId));
			}

			components[parentId].push(x);

			switch (x.get("type"))
			{
				case "ScriptSlider":
					if (x.getWidth() >= 88)
						x.setLocalLookAndFeel(LookAndFeel.bigKnob);
					else if (x.getWidth() >= 40)
						x.setLocalLookAndFeel(LookAndFeel.smallKnob);
					else if (x.get("style") == "Horizontal")
						x.setLocalLookAndFeel(LookAndFeel.horizontalSlider);
					else if (x.get("style") == "Vertical")
						x.setLocalLookAndFeel(LookAndFeel.verticalSlider);

					break;

				case "ScriptComboBox":
					x.setLocalLookAndFeel(LookAndFeel.comboBox);
					break;
					
				case "ScriptTable":
					x.setLocalLookAndFeel(LookAndFeel.table);
					break;
			}
		}
		
		for (x in panels)
		{
			if (x.getId().contains("pnlCard"))
				continue;

			x.setPaintRoutine(function(g)
			{
				var id = this.get("id");

				if (isDefined(Manifest.labels[id]))
					drawLabels(g, Manifest.labels[id]);

				for (c in components[id])
				{
					var a = [c.get("x"), c.get("y"), c.getWidth(), c.getHeight()];
					var manifestData;

					if (isDefined(Manifest.components))
					{
						for (componentData in Manifest.components)
						{
							if (componentData.id == c.getId())
							{
								manifestData = componentData;
								break;
							}
						}
					}

					switch (c.get("type"))
					{
						case "ScriptSlider":

							if (isDefined(manifestData.radialLabels))
								LookAndFeel.drawRadialLabels(g, c, manifestData.radialLabels);

							break;
						
						case "ScriptComboBox":
								LookAndFeel.drawComboBoxTitles(g, c, a);
							break;
					}
				}
			});
		}
	}
	
	inline function drawLabels(g, labels)
	{
		g.setColour(this.get("textColour"));

		for (l in labels)
		{
			local alignment = isDefined(l.alignment) == false ? "centred" : l.alignment;

			g.setFont("bold", 16);	
			g.drawAlignedText(l.text, l.area, alignment);
	    }
	}

	// Calls
	drawComponents();
}