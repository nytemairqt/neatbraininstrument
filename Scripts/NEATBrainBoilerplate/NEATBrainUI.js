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

// Random Global
inline function onknbPartialRandomGlobalControl(component, value)
{
	synthPartials.setAttribute(synthPartials.pitchRandomGlobalIntensity, value);
}

// Random Single
inline function onknbPartialRandomSingleControl(component, value)
{
	synthPartials.setAttribute(synthPartials.pitchRandomSingleIntensity, value);
}

// Falloff Intensity

inline function onknbPartialFalloffIntensityControl(component, value)
{
	synthPartials.setAttribute(synthPartials.pitchFalloffIntensity, value);
}

// Falloff Decay

inline function onknbPartialFalloffDecayControl(component, value)
{
	synthPartials.setAttribute(synthPartials.pitchFalloffDecay, value);
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

// Stiffness Type
inline function onknbPartialStiffnessTypeControl(component, value)
{
	synthPartials.setAttribute(synthPartials.stiffnessType, value);
}

// Stiffness Intensity
inline function onknbPartialStiffnessIntensityControl(component, value)
{
	synthPartials.setAttribute(synthPartials.stiffnessIntensity, value);
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

/* Instantiate Main Labels */

const lblResidue = createLabel("lblResidue", 487, 0, 128, 64, 24, "Residue_");
const lblModes = createLabel("lblModes", 15, 0, 128, 64, 24, "Modes_");

const lblPartialGain = createLabel("lblPartialGain", -30, 80 , 128, 32, 20, "Gain");
const lblPartialDrift = createLabel("lblPartialDrift", -30, lblPartialGain.get("y") + 140 , 128, 32, 20, "Drift");
const lblPartialTone = createLabel("lblPartialTone", -30, lblPartialDrift.get("y") + 140, 128, 32, 20, "Tone");

/* Instantiate Buttons */

const btnResetRatios = createButton("btnResetRatios", 420, 30, 30, 30, "reset", false, onbtnResetRatiosControl, true, true);
const btnShowAdvancedPanel = createButton("btnShowAdvancedPanel", 471, 227, 24, 80, "open", false, onbtnShowAdvancedPanelControl, false, true);

/* Instantiate Sliders */

// Partials

const knbPartialAttack = createKnob("knbPartialAttack", 75, lblPartialGain.get("y") + 30, 48, 48, "Attack", true, onknbPartialAttackControl, 5, 1000, 1.0, 5);
const knbPartialDecay = createKnob("knbPartialDecay", knbPartialAttack.get("x") + 100, lblPartialGain.get("y") + 30, 48, 48, "Decay", true, onknbPartialDecayControl, 500, 20000, 1.0, 15000);
const knbPartialSustain = createKnob("knbPartialSustain", knbPartialAttack.get("x") + 200, lblPartialGain.get("y") + 30, 48, 48, "Sustain", true, onknbPartialSustainControl, -100, 0, 1.0, -100);
const knbPartialRelease = createKnob("knbPartialRelease", knbPartialAttack.get("x") + 300, lblPartialGain.get("y") + 30, 48, 48, "Release", true, onknbPartialReleaseControl, 5, 15000, 1.0, 200);

const knbPartialRandomGlobal = createKnob("knbPartialRandomGlobal", 75, lblPartialDrift.get("y") + 30, 48, 48, "RandomGlobal", true, onknbPartialRandomGlobalControl, 0.0, 1.0, 0.01, 0.1);
const knbPartialRandomSingle = createKnob("knbPartialRandomSingle", knbPartialRandomGlobal.get("x") + 100, lblPartialDrift.get("y") + 30, 48, 48, "RandomSingle", true, onknbPartialRandomSingleControl, 0.0, 1.0, 0.01, 0.1);
const knbPartialFalloffIntensity = createKnob("knbPartialFalloffIntensity", knbPartialRandomSingle.get("x") + 100, lblPartialDrift.get("y") + 30, 48, 48, "FalloffIntensity", true, onknbPartialFalloffIntensityControl, 0.0, 1.0, 0.01, 0.1);
const knbPartialFalloffDecay = createKnob("knbPartialFalloffDecay", knbPartialFalloffIntensity.get("x") + 100, lblPartialDrift.get("y") + 30, 48, 48, "FalloffDecay", true, onknbPartialFalloffDecayControl, 0, 40000, 1.0, 2200);

const knbPartialFilter = createKnob("knbPartialFilter", 75, lblPartialTone.get("y") + 30, 48, 48, "Filter", true, onknbPartialFilterControl, 50, 20000, 1.0, 4000);
const knbPartialDampen = createKnob("knbPartialDampen", knbPartialFilter.get("x") + 100, lblPartialTone.get("y") + 30, 48, 48, "Dampening", true, onknbPartialDampenControl, 0.0, 1.0, 0.01, 0.0);
const knbPartialStiffnessType = createKnob("knbPartialStiffnessType", knbPartialDampen.get("x") + 100, lblPartialTone.get("y") + 30, 48, 48, "StiffnessType", true, onknbPartialStiffnessTypeControl, 0.0, 1.0, 1.0, 1.0);
const knbPartialStiffnessIntensity = createKnob("knbPartialStiffnessIntensity", knbPartialStiffnessType.get("x") + 100, lblPartialTone.get("y") + 30, 48, 48, "StiffnessIntensity", true, onknbPartialStiffnessIntensityControl, 0.0, 1.0, 0.01, 0.0);

// Residue

const knbResidueAttack = createKnob("knbResidueAttack", 564, 110, 48, 48, "Attack", true, onknbResidueAttackControl, 5, 1000, 1.0, 5);
const knbResidueDecay = createKnob("knbResidueDecay", 664, 110, 48, 48, "Decay", true, onknbResidueDecayControl, 500, 20000, 1.0, 15000);
const knbResidueSustain = createKnob("knbResidueSustain", 764, 110, 48, 48, "Sustain", true, onknbResidueSustainControl, -100, 0, 1.0, -100);
const knbResidueRelease = createKnob("knbResidueRelease", 864, 110, 48, 48, "Release", true, onknbResidueReleaseControl, 5, 15000, 1.0, 200);

/* Instantiate Individual Control Labels */

//Partials
const lblPartialAttack = createLabel("lblPartialAttack", knbPartialAttack.get("x") - 39, knbPartialAttack.get("y") + 50, 128, 32, 16, "Attack");
const lblPartialDecay = createLabel("lblPartialDecay", knbPartialDecay.get("x") - 40, knbPartialDecay.get("y") + 50, 128, 32, 16, "Decay");
const lblPartialSustain = createLabel("lblPartialSustain", knbPartialSustain.get("x") - 40, knbPartialSustain.get("y") + 50, 128, 32, 16, "Sustain");
const lblPartialRelease = createLabel("lblPartialRelease", knbPartialRelease.get("x") - 38, knbPartialRelease.get("y") + 50, 128, 32, 16, "Release");

const lblPartialRandomGlobal = createLabel("lblPartialRandomGlobal", knbPartialRandomGlobal.get("x") - 39, knbPartialRandomGlobal.get("y") + 50, 128, 32, 16, "Global");
const lblPartialRandomSingle = createLabel("lblPartialRandomSingle", knbPartialRandomSingle.get("x") - 40, knbPartialRandomGlobal.get("y") + 50, 128, 32, 16, "Inter");
const lblPartialFalloffIntensity = createLabel("lblPartialFalloffIntensity", knbPartialFalloffIntensity.get("x") - 40, knbPartialRandomGlobal.get("y") + 50, 128, 32, 16, "Falloff");
const lblPartialFalloffDecay = createLabel("lblPartialFalloffDecay", knbPartialFalloffDecay.get("x") - 40, knbPartialRandomGlobal.get("y") + 50, 128, 32, 16, "Decay");

const lblPartialFilter = createLabel("lblPartialFilter", knbPartialFilter.get("x") - 40, knbPartialFilter.get("y") + 50, 128, 32, 16, "Filter");
const lblPartialDampen = createLabel("lblPartialDampen", knbPartialDampen.get("x") - 40, knbPartialDampen.get("y") + 50, 128, 32, 16, "Dampen");
const lblPartialStiffnessType = createLabel("lblPartialStiffnessType", knbPartialStiffnessType.get("x") - 40, knbPartialStiffnessType.get("y") + 50, 128, 32, 16, "Type");
const lblPartialStiffnessA = createLabel("lblPartialStiffnessA", knbPartialStiffnessType.get("x") - 75, knbPartialStiffnessType.get("y") + 37, 128, 32, 16, "A");
const lblPartialStiffnessB = createLabel("lblPartialStiffnessB", knbPartialStiffnessType.get("x") - 5, knbPartialStiffnessType.get("y") + 37, 128, 32, 16, "B");
const lblPartialStiffnessIntensity = createLabel("lblPartialStiffnessIntensity", knbPartialStiffnessIntensity.get("x") - 40, knbPartialStiffnessIntensity.get("y") + 50, 128, 32, 16, "Amount");

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
knbPartialFilter.set("middlePosition", 12000);

