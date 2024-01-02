include("NEATBRAINBoilerplate/NEATBrainLookAndFeel.js");
include("NEATBRAINBoilerplate/NEATBrainModules.js");
include("NEATBRAINBoilerplate/NEATBrainUIConstructors.js");

const SliderPack_RatiosL = Content.getComponent("SliderPack_RatiosL");
const SliderPack_RatiosR = Content.getComponent("SliderPack_RatiosR");

/* Key Colours */

for (i = 0; i < 128; i++)
   	Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.2));
   	



/* UI Control Methods */

// Reset Ratios
inline function onbtnResetRatiosControl(component, value)
{
	if (!value)
		return;	

	for (i=0; i<SliderPack_RatiosL.getNumSliders(); i++)
    {
        SliderPack_RatiosL.setSliderAtIndex(i, MODES_L[i]);
        SliderPack_RatiosL.changed();    
    }   
    for (i=0; i<SliderPack_RatiosR.getNumSliders(); i++)
	{
	    SliderPack_RatiosR.setSliderAtIndex(i, MODES_R[i]);
	    SliderPack_RatiosR.changed();    
	}
};

// Open Advanced Panel

inline function onbtnShowAdvancedPanelControl(component, value)
{
	if (value)	
		Console.print("opened!");
	else
		Console.print("closed!");
}

// AHDSR Attack
inline function onknbAttackControl(component, value)
{
}

// AHDSR Decay
inline function onknbDecayControl(component, value)
{
}

// AHDSR Sustain
inline function onknbSustainControl(component, value)
{		
}

// AHDSR Release
inline function onknbReleaseControl(component, value)
{
}

// Filter Static
inline function onknbFilterControl(component, value)
{
	synthPartials.setAttribute(synthPartials.filterStaticFrequency, value);
}

// Filter Decay
inline function onknbDampeningControl(component, value)
{
	synthPartials.setAttribute(synthPartials.filterFalloffDecay, value);
}

// Rhapsody Gain
inline function onknbMasterGainControl(component, value)
{
	/* might cause issues */
	if (isDefined(rhapsodyModules[0]))
		rhapsodyModules[0].setAttribute(rhapsodyModules[0].Gain, value);
}

// Rhapsody Pan
inline function onknbMasterPanControl(component, value)
{
	/* might cause issues */
	if (isDefined(rhapsodyModules[0]))
		rhapsodyModules[0].setAttribute(rhapsodyModules[0].Balance, value);
}

Content.getComponent("knbMasterGain").setControlCallback(onknbMasterGainControl);
Content.getComponent("knbMasterPan").setControlCallback(onknbMasterPanControl);

/* Instantiate Buttons */

const btnResetRatios = createButton("btnResetRatios", 420, 30, 30, 30, "reset", false, onbtnResetRatiosControl, true, true);

const btnShowAdvancedPanel = createButton("btnShowAdvancedPanel", 471, 200, 24, 80, "open", false, onbtnShowAdvancedPanelControl, false, true);

/* Instantiate Sliders */

const knbFilter = createKnob("knbFilter", 100, 400, 48, 48, "Filter", true, onknbFilterControl, 300, 4000, 1.0, 1200);
const knbDampening = createKnob("knbDampening", 500, 400, 48, 48, "Dampening", true, onknbDampeningControl, 0.0, 1.0, 0.01, 0.0);

const knbAttack = createKnob("knbAttack", 565, 120, 48, 48, "Attack", true, onknbAttackControl, 5, 1000, 1.0, 5);
const knbDecay = createKnob("knbDecay", 665, 120, 48, 48, "Decay", true, onknbDecayControl, 500, 20000, 1.0, 15000);
const knbSustain = createKnob("knbSustain", 765, 120, 48, 48, "Sustain", true, onknbSustainControl, -100, 0, 1.0, -100);
const knbRelease = createKnob("knbRelease", 865, 120, 48, 48, "Release", true, onknbReleaseControl, 5, 15000, 1.0, 200);

/* Instantiate Labels */

const lblResidue = createLabel("lblResidue", 487, 10, 128, 64, 24, "Residue_");
const lblModes = createLabel("lblModes", 15, 10, 128, 64, 24, "Modes_");

const lblAttack = createLabel("lblAttack", 535, 180, 128, 32, 16, "Attack");
const lblDecay = createLabel("lblDecay", 632, 180, 128, 32, 16, "Decay");
const lblSustain = createLabel("lblSustain", 733, 180, 128, 32, 16, "Sustain");
const lblRelease = createLabel("lblRelease", 836, 180, 128, 32, 16, "Release");

/* Setup Misc Defaults */

knbSustain.set("middlePosition", -12.0);
knbFilter.set("middlePosition", 1400);

