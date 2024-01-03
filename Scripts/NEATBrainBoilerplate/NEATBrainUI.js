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
	pnlAdvancedPartialSettings.set("visible", value);
}

// Partials

// AHDSR Attack
inline function onknbPartialAttackControl(component, value)
{
}

// AHDSR Decay
inline function onknbPartialDecayControl(component, value)
{
}

// AHDSR Sustain
inline function onknbPartialSustainControl(component, value)
{		
}

// AHDSR Release
inline function onknbPartialReleaseControl(component, value)
{
}

// Filter Static
inline function onknbPartialFilterControl(component, value)
{
	synthPartials.setAttribute(synthPartials.filterStaticFrequency, value);
}

// Filter Decay
inline function onknbPartialDampenControl(component, value)
{
	synthPartials.setAttribute(synthPartials.filterFalloffDecay, value);
}

// Residue

// AHDSR Attack
inline function onknbResidueAttackControl(component, value)
{
}

// AHDSR Decay
inline function onknbResidueDecayControl(component, value)
{
}

// AHDSR Sustain
inline function onknbResidueSustainControl(component, value)
{		
}

// AHDSR Release
inline function onknbResidueReleaseControl(component, value)
{
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
const btnShowAdvancedPanel = createButton("btnShowAdvancedPanel", 471, 227, 24, 80, "open", false, onbtnShowAdvancedPanelControl, false, true);

/* Instantiate Sliders */

// Partials
const knbPartialFilter = createKnob("knbPartialFilter", 100, 400, 48, 48, "Filter", true, onknbPartialFilterControl, 300, 4000, 1.0, 1200);
const knbPartialDampen = createKnob("knbPartialDampen", 200, 400, 48, 48, "Dampening", true, onknbPartialDampenControl, 0.0, 1.0, 0.01, 0.0);

const knbPartialAttack = createKnob("knbPartialAttack", 75, 110, 48, 48, "Attack", true, onknbPartialAttackControl, 5, 1000, 1.0, 5);
const knbPartialDecay = createKnob("knbPartialDecay", 175, 110, 48, 48, "Decay", true, onknbPartialDecayControl, 500, 20000, 1.0, 15000);
const knbPartialSustain = createKnob("knbPartialSustain", 275, 110, 48, 48, "Sustain", true, onknbPartialSustainControl, -100, 0, 1.0, -100);
const knbPartialRelease = createKnob("knbPartialRelease", 375, 110, 48, 48, "Release", true, onknbPartialReleaseControl, 5, 15000, 1.0, 200);

// Residue

const knbResidueAttack = createKnob("knbResidueAttack", 564, 110, 48, 48, "Attack", true, onknbResidueAttackControl, 5, 1000, 1.0, 5);
const knbResidueDecay = createKnob("knbResidueDecay", 664, 110, 48, 48, "Decay", true, onknbResidueDecayControl, 500, 20000, 1.0, 15000);
const knbResidueSustain = createKnob("knbResidueSustain", 764, 110, 48, 48, "Sustain", true, onknbResidueSustainControl, -100, 0, 1.0, -100);
const knbResidueRelease = createKnob("knbResidueRelease", 864, 110, 48, 48, "Release", true, onknbResidueReleaseControl, 5, 15000, 1.0, 200);

/* Instantiate Labels */

// Partials
const lblResidue = createLabel("lblResidue", 487, 0, 128, 64, 24, "Residue_");
const lblModes = createLabel("lblModes", 15, 0, 128, 64, 24, "Modes_");

const lblPartialAttack = createLabel("lblPartialAttack", knbPartialAttack.get("x") - 39, knbPartialAttack.get("y") + 50, 128, 32, 16, "Attack");
const lblPartialDecay = createLabel("lblPartialDecay", knbPartialDecay.get("x") - 40, knbPartialDecay.get("y") + 50, 128, 32, 16, "Decay");
const lblPartialSustain = createLabel("lblPartialSustain", knbPartialSustain.get("x") - 40, knbPartialSustain.get("y") + 50, 128, 32, 16, "Sustain");
const lblPartialRelease = createLabel("lblPartialRelease", knbPartialRelease.get("x") - 38, knbPartialRelease.get("y") + 50, 128, 32, 16, "Release");

const lblPartialFilter = createLabel("lblPartialFilter", knbPartialFilter.get("x") - 40, knbPartialFilter.get("y") + 50, 128, 32, 16, "Filter");
const lblPartialDampen = createLabel("lblPartialDampen", knbPartialDampen.get("x") - 40, knbPartialDampen.get("y") + 50, 128, 32, 16, "Dampen");

// Residue
const lblResidueAttack = createLabel("lblResidueAttack", knbResidueAttack.get("x") - 39, knbResidueAttack.get("y") + 50, 128, 32, 16, "Attack");
const lblResidueDecay = createLabel("lblResidueDecay", knbResidueDecay.get("x") - 40, knbResidueDecay.get("y") + 50, 128, 32, 16, "Decay");
const lblResidueSustain = createLabel("lblResidueSustain", knbResidueSustain.get("x") - 40, knbResidueSustain.get("y") + 50, 128, 32, 16, "Sustain");
const lblResidueRelease = createLabel("lblResidueRelease", knbResidueRelease.get("x") - 38, knbResidueRelease.get("y") + 50, 128, 32, 16, "Release");

/* Create Advanced Panel */

const pnlAdvancedPartialSettings = createChildPanel("pnlAdvancedPartialSettings", 498, 20, 459, 482);
const lblAdvancedPartialSettings = createLabel("lblAdvancedPartialSettings", -4, -20, 128, 64, 24, "Advanced_");
const lblRatios_L = createLabel("lblRatios_L", -26, 44, 128, 32, 16, "Ratios L");
const lblRatios_R = createLabel("lblRatios_R", -26, 193, 128, 32, 16, "Ratios R");

SliderPack_RatiosL.set("parentComponent", "pnlAdvancedPartialSettings");
SliderPack_RatiosR.set("parentComponent", "pnlAdvancedPartialSettings");
lblAdvancedPartialSettings.set("parentComponent", "pnlAdvancedPartialSettings");
lblRatios_L.set("parentComponent", "pnlAdvancedPartialSettings");
lblRatios_R.set("parentComponent", "pnlAdvancedPartialSettings");

SliderPack_RatiosR.set("visible", STEREO_INSTRUMENT);
lblRatios_R.set("visible", STEREO_INSTRUMENT);
	
	

/* Setup Misc Defaults */

knbPartialSustain.set("middlePosition", -12.0);
knbPartialFilter.set("middlePosition", 1400);

