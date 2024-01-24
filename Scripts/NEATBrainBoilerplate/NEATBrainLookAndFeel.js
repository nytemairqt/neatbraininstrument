const LAFSliderNEATBrain = Content.createLocalLookAndFeel();
const LAFButtonShowAdvancedPanel = Content.createLocalLookAndFeel();
const LAFButtonStiffness = Content.createLocalLookAndFeel();
const LAFButtonRandomRatios = Content.createLocalLookAndFeel();
const LAFButtonResetRatios = Content.createLocalLookAndFeel();
const LAFButtonPrev = Content.createLocalLookAndFeel();
const LAFButtonNext = Content.createLocalLookAndFeel();

const pnlBody = Content.getComponent("pnlBody");

const pnlBodyColour = 0xff2f2f34;

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
   
    g.setColour(obj.hover ? 0xFFD0E6E6 : 0xFFB1C1C1);
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


// Main Panel
pnlBody.setPaintRoutine(function(g)
{
	g.fillAll(pnlBodyColour);
	g.setColour(Colours.withAlpha(0xFFB1C1C1, .3));
	g.drawLine(10, 10, 20, 10, 1.5);
	g.drawLine(10, this.getWidth() / 2, 10, 10, 1.5);
	g.drawLine(this.getWidth() / 2, this.getWidth() / 2, 10, this.getHeight() - 44, 1.5);
	g.drawLine(this.getWidth() / 2, this.getWidth() - 10, this.getHeight() - 44, this.getHeight() - 44, 1.5);
	g.drawLine(this.getWidth() - 10, this.getWidth() - 10, this.getHeight() - 44, this.getHeight() - 54, 1.5);
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

const TESTVALUE = 1;

//const pnlPath = Content.createPath();

pnlProfilePartial.setPaintRoutine(function(g)
{
	var p = Content.createPath();
	var x = 90;
	g.setColour(Colours.grey);
	
	switch (cmbPartialProfile.getValue())
	{
		case 1:
			p.loadFromData(pathProfileA);
			break;
		case 2:
			p.loadFromData(pathProfileB);
			break;		
		case 3:
			p.loadFromData(pathProfileD);
			break;
	}
	
	g.drawPath(p, [x, 0, this.getWidth() - (2 * x), this.getHeight()], 1.0);
});

pnlProfileResidue.setPaintRoutine(function(g)
{
	var p = Content.createPath();
	var x = 50;
	var y = 130;
	g.setColour(Colours.grey);
	
	switch (cmbResidueProfile.getValue())
	{
		case 1:
			p.loadFromData(pathProfileAPkp);
			break;
		case 2:
			p.loadFromData(pathProfileBPkp);
			break;		
		case 3:
			p.loadFromData(pathProfileCPkp);
			break;
	}
	
	g.drawPath(p, [x, y, this.getWidth() - (2 * x), this.getHeight() - (2 * y)], 1.0);
});