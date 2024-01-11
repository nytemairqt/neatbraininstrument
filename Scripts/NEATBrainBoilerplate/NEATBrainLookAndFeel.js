const LAFSliderNEATBrain = Content.createLocalLookAndFeel();
const LAFButtonShowAdvancedPanel = Content.createLocalLookAndFeel();
const LAFButtonStiffness = Content.createLocalLookAndFeel();
const LAFButtonRandomRatios = Content.createLocalLookAndFeel();
const LAFButtonResetRatios = Content.createLocalLookAndFeel();

const pnlBody = Content.getComponent("pnlBody");

const pnlBodyColour = 0xff2f2f34;

include("NEATBRAINBoilerplate/NEATBrainPathData.js");


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
    g.setFont("bold", 26);
    g.setColour(obj.over ? 0xFFE2E3F3 : Colours.grey);
    g.drawAlignedText("?", [0, 0, obj.area[2], obj.area[3]], "centred");

});

// Reset Ratios
LAFButtonResetRatios.registerFunction("drawToggleButton", function(g, obj)
{    
    var btnResetPath = Content.createPath();
    var leftOffset = 4;
    var rightOffset = 16;
    var reducedOffset = 7;	
    
    
    btnResetPath.clear();
    btnResetPath.loadFromData(pathResetButtonStroke);
    g.setColour(obj.over ? 0xFFE2E3F3 : Colours.grey);
    g.drawPath(btnResetPath, reduced(obj, reducedOffset), 3);
    btnResetPath.clear();
    btnResetPath.loadFromData(pathResetButtonFill);
    g.fillPath(btnResetPath, [obj.area[0] + leftOffset, obj.area[1] + leftOffset, obj.area[2] - rightOffset, obj.area[3] - rightOffset]);
});


// Main Panel
pnlBody.setPaintRoutine(function(g)
{
	g.fillAll(pnlBodyColour);
	g.setColour(Colours.withAlpha(0xFFB1C1C1, .3));
	g.drawLine(10, 10, 20, 10, 1.5);
	g.drawLine(10, this.getWidth() / 2, 10, 10, 1.5);
	g.drawLine(this.getWidth() / 2, this.getWidth() / 2, 10, this.getHeight() - 50, 1.5);
	g.drawLine(this.getWidth() / 2, this.getWidth() - 10, this.getHeight() - 50, this.getHeight() - 50, 1.5);
	g.drawLine(this.getWidth() - 10, this.getWidth() - 10, this.getHeight() - 50, this.getHeight() - 60, 1.5);
});