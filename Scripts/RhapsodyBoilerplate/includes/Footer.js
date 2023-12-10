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

namespace Footer
{    
    // pnlFooter
    const pnlFooter = Content.getComponent("pnlFooter");
        
	// pnlStatusBar
	const pnlStatusBar = Content.getComponent("pnlStatusBar");

	pnlStatusBar.setPaintRoutine(function(g)
	{
		var a = this.getLocalBounds(0);

		// Labels
		g.setColour(this.get("textColour"));
		g.setFont("bold", 14);
		g.drawAlignedText("PAN", [knbMasterPan.get("x") - 90, knbMasterPan.get("y") - 0.5, 80, knbMasterPan.getHeight()], "right");
		g.drawAlignedText("VOL", [knbMasterGain.get("x") - 90, knbMasterGain.get("y") - 0.5, 80, knbMasterGain.getHeight()], "right");
		
		// Default value markers
		g.setColour(this.get("textColour"));
		g.fillEllipse([knbMasterPan.get("x") + knbMasterPan.getWidth() / 2 - 4 / 2, knbMasterPan.get("y") - 7, 4, 4]);
		g.fillEllipse([knbMasterGain.get("x") + knbMasterGain.getWidth() / 2 - 4 / 2 + 25.5, knbMasterGain.get("y") - 7, 4, 4]);
	});
	
	// btnLogo
	const btnLogo = Content.getComponent("btnLogo");
	btnLogo.setLocalLookAndFeel(LookAndFeel.iconButton);	
	btnLogo.setControlCallback(onbtnLogoControl);

	inline function onbtnLogoControl(component, value)
	{
		if (!value)
		{
			Engine.showYesNoWindow("Open Website", "Would you like to visit the developer's website?", function(response)
			{
				if (response)
					Engine.openWebsite(Engine.getProjectInfo().CompanyURL);
			});
		}
	}

	// knbMasterPan
	const knbMasterPan = Content.getComponent("knbMasterPan");
	knbMasterPan.setLocalLookAndFeel(LookAndFeel.horizontalSlider);
	knbMasterPan.setControlCallback(onknbMasterPanControl);
	
	inline function onknbMasterPanControl(component, value)
	{
		if (isDefined(Configuration.masterChain))
			Configuration.masterChain.setAttribute(Configuration.masterChain.Balance, value / 100);
	}
	
	// knbMasterGain
	const knbMasterGain = Content.getComponent("knbMasterGain");
	knbMasterGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);
	
	// fltPeakMeter
	const fltPeakMeter = Content.getComponent("fltPeakMeter");
        
    // fltKeyboard
    const fltKeyboard = Content.getComponent("fltKeyboard");
    fltKeyboard.setLocalLookAndFeel(LookAndFeel.keyboard);

    for (i = 0; i < 128; i++)
    	Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.6));
        
    // btnPanic
    const btnPanic = Content.getComponent("btnPanic");
    btnPanic.setLocalLookAndFeel(LookAndFeel.iconButton);
    btnPanic.setControlCallback(onbtnPanicControl);

    inline function onbtnPanicControl(component, value)
    {
	    if (value)
	    	Engine.allNotesOff();
    }
}

