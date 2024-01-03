const var LAFSliderNEATBrain = Content.createLocalLookAndFeel();

const var pnlBody = Content.getComponent("pnlBody");

const pnlBodyColour = 0xff2f2f34;


inline function reduced(obj, amount)
{
    return [amount, amount, obj.area[2] - 2*amount, obj.area[3] - 2* amount];
}

//Slider Main

LAFSliderNEATBrain.registerFunction("drawRotarySlider", function(g, obj)
{
    var ringWidth = obj.area[2] / 16;    
    
    //background
    
    g.setColour(0x33000000);
    g.fillEllipse(reduced(obj, ringWidth * 2.0));
    
    //arc
    var sliderRing2 = Content.createPath();
    var sliderRing3 = Content.createPath();

    sliderRing2.startNewSubPath(0.5, 1.0);
    sliderRing2.addArc([0.0, 0.0, 1.0, 1.0], -Math.PI*0.75, Math.PI * 0.75);
    sliderRing3.startNewSubPath(0.0, 0.0);
    sliderRing3.startNewSubPath(1.0, 1.0);  

    var start = -Math.PI*0.75;

    //unfilled ring
    sliderRing3.addArc([0.0, 0.0, 1.0, 1.0], start, Math.max(start, start + Math.PI * 1.5 * obj.valueNormalized));
    g.setColour(obj.hover ? 0xFF292929 : 0xFF262626);
    g.drawPath(sliderRing2, reduced(obj, ringWidth), ringWidth * 2);

    //filled ring
    //g.setColour(obj.hover? Colours.white : Colours.lightblue);
    //g.setColour(Colours.lightblue);
    //g.setColour(0xFF99D4D4); //matte light blue
    //g.setColour(0xFFD0E6E6); //offwhite
    //g.setColour(0xFFB1C1C1); // light grey
    
    g.setColour(obj.hover ? 0xFFD0E6E6 : 0xFFB1C1C1);
    g.drawPath(sliderRing3, reduced(obj, ringWidth), ringWidth * (1.6));
    
    g.rotate((1.0 - (obj.valueNormalized - 0.02)) * -1.5 * Math.PI, [obj.area[2] / 2, obj.area[3] / 2]);  
    
    //Center Ellipse
        
    //g.setColour(obj.hover ? 0xFF2C2C2C : 0xFF1C1C1C);
    g.setColour(0xFF1C1C1C);
    g.fillEllipse(reduced(obj, obj.area[2] * .86));

    //value line

    g.setColour(Colours.lightgrey);    
    g.drawLine(obj.area[2] * .65, obj.area[2] * .83, obj.area[3] * .65, obj.area[3] * .83, 3);     
});

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