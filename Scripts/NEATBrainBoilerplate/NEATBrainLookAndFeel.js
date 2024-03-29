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

const LAFSliderNEATBrain = Content.createLocalLookAndFeel();
const LAFButtonShowAdvancedPanel = Content.createLocalLookAndFeel();
const LAFButtonStiffness = Content.createLocalLookAndFeel();
const LAFButtonRandomRatios = Content.createLocalLookAndFeel();
const LAFButtonResetRatios = Content.createLocalLookAndFeel();
const LAFButtonPrev = Content.createLocalLookAndFeel();
const LAFButtonNext = Content.createLocalLookAndFeel();

const pnlBody = Content.getComponent("pnlBody");

const pnlBodyColour = 0xff2f2f34;
const pnlBodyColourTop = 0xFF37373C;
const pnlBodyColourDark = 0xFF2C2C30;
const offWhite = 0xFFEDEDED;

include("NEATBrainBoilerplate/NEATBrainPathData.js");


inline function reduced(obj, amount)
{
    return [amount, amount, obj.area[2] - 2*amount, obj.area[3] - 2* amount];
}

//Slider Main

LAFSliderNEATBrain.registerFunction("drawRotarySlider", function(g, obj)
{
    var ringWidth = obj.area[2] / 16;    
    
    // Background    
    g.setColour(0x33000000);
    g.fillEllipse(reduced(obj, ringWidth * 2.0));
    
    // Arc
    var sliderRing2 = Content.createPath();
    var sliderRing3 = Content.createPath();

    sliderRing2.startNewSubPath(0.5, 1.0);
    sliderRing2.addArc([0.0, 0.0, 1.0, 1.0], -Math.PI*0.75, Math.PI * 0.75);
    sliderRing3.startNewSubPath(0.0, 0.0);
    sliderRing3.startNewSubPath(1.0, 1.0);  

    var start = -Math.PI*0.75;

    // Unfilled ring
    sliderRing3.addArc([0.0, 0.0, 1.0, 1.0], start, Math.max(start, start + Math.PI * 1.5 * obj.valueNormalized));
    g.setColour(obj.hover ? 0xFF292929 : 0xFF262626);
    g.drawPath(sliderRing2, reduced(obj, ringWidth), ringWidth * 2);
   	
   	
    //g.setColour(obj.hover ? 0xFFD0E6E6 : 0xFFB1C1C1);
    g.setColour(obj.hover ? offWhite : Colours.lightgrey);
    g.drawPath(sliderRing3, reduced(obj, ringWidth), ringWidth * (1.6));
    
    g.rotate((1.0 - (obj.valueNormalized - 0.02)) * -1.5 * Math.PI, [obj.area[2] / 2, obj.area[3] / 2]);  
    
    // Center Ellipse        
    g.setColour(0xFF1C1C1C);
    g.fillEllipse(reduced(obj, obj.area[2] * .86));

    // Value line
    g.setColour(Colours.lightgrey);        
    g.drawLine(obj.area[2] * .65, obj.area[2] * .83, obj.area[3] * .65, obj.area[3] * .83, 3);     
});


const miscTextAdvanced = ["A", "d", "v", "a", "n", "c", "e", "d"];
const miscTextAdvancedOffset = 10;

// Button Show Advanced Panel
LAFButtonShowAdvancedPanel.registerFunction("drawToggleButton", function(g, obj)
{
	g.setFont("bold", 22);

	g.setColour(obj.over ? 0xFFE2E3F3 : Colours.grey);
	if (obj.value)
		g.setColour(0xFFE2E3F3);
	g.rotate(Math.toRadians(270), [obj.area[2] / 2, obj.area[3] / 2]);
	for (i=0; i<miscTextAdvanced.length; i++)
	{
		g.drawAlignedText(miscTextAdvanced[i], [(miscTextAdvancedOffset * i) - 40, 0, obj.area[2], obj.area[3]], "right"); // lol
	}  
});

// Stiffness Type
LAFButtonStiffness.registerFunction("drawToggleButton", function(g, obj)
{
    g.setFont("bold", 16);
    g.setColour(obj.over ? 0xFFE2E3F3 : Colours.grey);
    if (obj.value)
        g.setColour(0xFFE2E3F3);
    
    g.drawAlignedText(obj.text, [0, 0, obj.area[2], obj.area[3]], "centred");
});

// Random Ratios
LAFButtonRandomRatios.registerFunction("drawToggleButton", function(g, obj)
{
    g.setFont("bold", 16);
    g.setColour(obj.over ? 0xFFE2E3F3 : Colours.grey);
    g.drawAlignedText("Random", [0, 0, obj.area[2], obj.area[3]], "centred");

});

// Reset Ratios
LAFButtonResetRatios.registerFunction("drawToggleButton", function(g, obj)
{    
    g.setFont("bold", 16);
    g.setColour(obj.over ? 0xFFE2E3F3 : Colours.grey);
    g.drawAlignedText("Reset", [0, 0, obj.area[2], obj.area[3]], "centred");
});


// Panel Body
pnlBody.setPaintRoutine(function(g)
{
	// Fill Gradient	
	var gradientData = [pnlBodyColourTop, 0, 0, pnlBodyColour, 0, this.getHeight(), false];
	g.setGradientFill(gradientData);
	g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 1.0);
	
	// Right Side
	
	gradientData = [pnlBodyColour, 0, 0, pnlBodyColourTop, 0, this.getHeight(), false];	
	g.setGradientFill(gradientData);
	g.fillRoundedRectangle([this.getWidth() / 2, 9, (this.getWidth() / 2), this.getHeight() - 52], 1.0);
	
	var noiseData = {
		"alpha" : .15,
		"monochromatic" : false,
		"scaleFactor" : 2,
		"area" : [0, 0, this.getWidth(), this.getHeight()]		
	};
	
	g.addNoise(noiseData);
	
	// Lines	
	g.setColour(Colours.withAlpha(0xFFB1C1C1, .2));
	g.drawLine(this.getWidth() / 2, this.getWidth(), 10, 10, 1.5);
	g.drawLine(this.getWidth() / 2, this.getWidth() / 2, 10, this.getHeight() - 44, 1.5);
	g.drawLine(this.getWidth() / 2, this.getWidth(), this.getHeight() - 44, this.getHeight() - 44, 1.5);
});

// Prev Profile
LAFButtonPrev.registerFunction("drawToggleButton", function(g, obj)
{	
	var offset = obj.area[2] / 4;
	var lineThickness = 5;
	
	g.setColour(obj.over ? 0xFFE2E3F3 : Colours.grey);
	
	g.drawLine(obj.area[2], offset, obj.area[3] / 2, obj.area[3] / 2, lineThickness);
	
	g.fillTriangle([0, offset, offset * 2, offset * 2], Math.toRadians(270));
});

// Next Profile
LAFButtonNext.registerFunction("drawToggleButton", function(g, obj)
{	
	var offset = obj.area[2] / 4;
	var lineThickness = 5;
	
	g.setColour(obj.over ? 0xFFE2E3F3 : Colours.grey);
	g.drawLine(obj.area[2] - offset, 0, obj.area[3] / 2, obj.area[3] / 2, lineThickness);
	g.fillTriangle([obj.area[2] - (offset * 2), offset, offset * 2, offset * 2], Math.toRadians(90));
});


// Panel Images

const var pnlProfilePartial = Content.getComponent("pnlProfilePartial");
const var pnlProfileResidue = Content.getComponent("pnlProfileResidue");

pnlProfilePartial.setPaintRoutine(function(g)
{
	var x = 90;
	
	switch (cmbPartialProfile.getValue())
	{
		case 1:
			pnlProfilePartial.loadImage("{PROJECT_FOLDER}wgProfileA.png", "wgProfileImage");
			break;
		case 2:
			pnlProfilePartial.loadImage("{PROJECT_FOLDER}wgProfileB.png", "wgProfileImage");
			break;
		case 3:
			pnlProfilePartial.loadImage("{PROJECT_FOLDER}wgProfileC.png", "wgProfileImage");
			break;
	}
	
	g.setOpacity(.6);
	g.drawImage("wgProfileImage", [0, 0, this.getWidth(), this.getHeight()], 0, 0);	
});

pnlProfileResidue.setPaintRoutine(function(g)
{
	
	var x = 20;
	var y = 20;
	
	switch (cmbResidueProfile.getValue())
		{
			case 1:
				pnlProfileResidue.loadImage("{PROJECT_FOLDER}rsProfileA.png", "rsProfileImage");
				break;
			case 2:
				pnlProfileResidue.loadImage("{PROJECT_FOLDER}rsProfileB.png", "rsProfileImage");
				break;
			case 3:
				pnlProfileResidue.loadImage("{PROJECT_FOLDER}rsProfileC.png", "rsProfileImage");
				break;
		}
		
		g.setOpacity(.6);
		g.drawImage("rsProfileImage", [x, y, this.getWidth() - (2 * x), this.getHeight() - (2 * y)], 0, 0);	
});