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

namespace Mixer
{
	const masterChainId = Synth.getIdList("Container")[0];
	const matrix = Synth.getRoutingMatrix(masterChainId);
	
	// pnlMixer
	const pnlMixer = Content.getComponent("pnlMixer");
	
	// btnMixer
	const btnMixer = Content.getAllComponents("btnMixer\\d");

	for (x in btnMixer)
	{
		x.setLocalLookAndFeel(LookAndFeel.iconButton);
		x.setControlCallback(onbtnMixerControl);
	}
	
	inline function onbtnMixerControl(component, value)
	{
		if (value)
			return;

		local index = btnMixer.indexOf(component);
		local currentValue = pnlMixer.getValue();
		local newValue = index == 0 ? currentValue - 1 : currentValue + 1;

		changePanel(newValue);
	}
	
	// pnlMixerControls
	const pnlMixerControls = Content.getAllComponents("pnlMixerControls");
	changePanel(0);

	for (x in pnlMixerControls)
	{
		x.data.levels = [0, 0, 0, 0, 0, 0];
		x.setPaintRoutine(function(g) {pnlMixerPaintRoutine();});
	}

	inline function pnlMixerPaintRoutine()
	{
		local numChannels = knbPan.length / pnlMixerControls.length;
		local channelWidth = this.getWidth() / numChannels;
		local pageIndex = pnlMixerControls.indexOf(this);

		g.setFont("bold", 14);
		
		for (i = 0; i < numChannels; i++)
		{
			local a = [i * channelWidth, knbPan[i].get("y") - 30, channelWidth, 15];
			local index = (pageIndex * numChannels) + i;

			g.setColour(this.get("textColour"));
			g.drawAlignedText(knbGain[index].get("text"), a, "centred");
		}
		
		if (cmbOutput.length > 0)
		{
			g.setFont("bold", 12);

			g.setColour(this.get("textColour"));
			g.drawAlignedText("OUTPUTS", [cmbOutput[0].get("x"), cmbOutput[0].get("y") - 35, cmbOutput[numChannels - 1].get("x") + cmbOutput[0].getWidth() - cmbOutput[0].get("x"), 10], "centred");
			
			g.setColour(Colours.withAlpha(this.get("textColour"), 0.3));
			g.drawLine(cmbOutput[0].get("x"), cmbOutput[numChannels - 1].get("x") + cmbOutput[0].getWidth(), cmbOutput[0].get("y") - 15, cmbOutput[0].get("y") - 15, 1);
		}
	}
			
	// knbPan
	const knbPan = Content.getAllComponents("knbPan\\d");

	// fltPeakMeter
	const fltPeakMeter = Content.getAllComponents("fltPeakMeter\\d");
	
	// knbGain
	const knbGain = Content.getAllComponents("knbGain\\d");
	
	// btnPurge
	const btnPurge = Content.getAllComponents("btnPurge\\d");

	for (i = 0; i < btnPurge.length; i++)
		btnPurge[i].setLocalLookAndFeel(LookAndFeel.ledButton);
	
	const btnPurgeChangeBroadcaster = Engine.createBroadcaster({"id": "Value change action", "args": ["component", "value"]});
	btnPurgeChangeBroadcaster.attachToComponentValue(btnPurge, "");

	btnPurgeChangeBroadcaster.addListener("", "btnPurgeChange listener", function(component, value)
	{
		var index = btnPurge.indexOf(component);
		knbGain[index].set("enabled", value);
	});		

	// cmbOutput
	const cmbOutput = Content.getAllComponents("cmbOutput*");
	
	for (i = 0; i < cmbOutput.length; i++)
	{
		cmbOutput[i].setLocalLookAndFeel(LookAndFeel.comboBox);
		cmbOutput[i].setControlCallback(oncmbOutputControl);
		Engine.isPlugin() ? cmbOutput[i].set("items", "1/2\n3/4\n5/6\n7/8\n9/10\n11/12") : cmbOutput[i].set("items", "1/2");
	}	

    inline function oncmbOutputControl(component, value)
    {
		local index = cmbOutput.indexOf(component);
		local v = (value - 1) * 2;

		matrix.addConnection(0 + (index * 2), v);
		local success = matrix.addConnection(1 + (index * 2), v + 1);

		//Reset to Channel 1+2 in case of an error
		if (!success)
		{
			matrix.addConnection(0 + (index * 2), 0);
			matrix.addConnection(1 + (index * 2), 1);
		}
	}

	inline function changePanel(index)
	{
		if (index < 0 || index >= pnlMixerControls.length)
			return;

		pnlMixer.setValue(index);

		for (i = 0; i < pnlMixerControls.length; i++)
			pnlMixerControls[i].showControl(index == i);
			
		if (pnlMixerControls.length <= 1)
			return;

		btnMixer[0].showControl(index > 0);
		btnMixer[1].showControl(index < pnlMixerControls.length - 1);
	}
}
