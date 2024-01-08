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
	pnlAdvanced.set("visible", value);
}

// Partials

// Partial Gain
inline function onknbPartialGainControl(component, value)
{
	synthPartials.setAttribute(synthPartials.Gain, value);	
}

// AHDSR Attack
inline function onknbPartialAttackControl(component, value)
{
	ahdsrPartials.setAttribute(ahdsrPartials.Attack, value);
}

// AHDSR Decay
inline function onknbPartialDecayControl(component, value)
{
	ahdsrPartials.setAttribute(ahdsrPartials.Decay, value);
}

// AHDSR Sustain
inline function onknbPartialSustainControl(component, value)
{		
	ahdsrPartials.setAttribute(ahdsrPartials.Sustain, value);
}

// AHDSR Release
inline function onknbPartialReleaseControl(component, value)
{
	ahdsrPartials.setAttribute(ahdsrPartials.Release, value);
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

// Partial Gain
inline function onknbResidueGainControl(component, value)
{
	samplerResidueL.setAttribute(samplerResidueL.Gain, value);	
	samplerResidueR.setAttribute(samplerResidueR.Gain, value);	
	samplerNoiseL.setAttribute(samplerNoiseL.Gain, value);
	samplerNoiseR.setAttribute(samplerNoiseR.Gain, value);
	samplerReleaseL.setAttribute(samplerReleaseL.Gain, value);
	samplerReleaseR.setAttribute(samplerReleaseR.Gain, value);
}

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

/* Partials */

const lblModes = createLabel("lblModes", -10, -6, 128, 64, 24, "Modes_", "pnlBody", Colours.grey, "centred");

const lblPartialADSR = createLabel("lblPartialADSR", -30, 390 , 128, 32, 20, "Env", "pnlBody", Colours.grey, "centred");



const lblPartialGain = createLabel("lblPartialGain", 240, 0, 128, 64, 14, "VOL", "pnlBody", Colours.grey, "right");
const knbPartialGain = createKnob("knbPartialGain", lblPartialGain.get("x") + 140, lblPartialGain.get("y") + 25, 100, 16, "Gain", true, onknbPartialGainControl, 0, 1, 0.01, .75, "pnlBody");

const knbPartialAttack = createKnob("knbPartialAttack", 75, lblPartialADSR.get("y") + 30, 48, 48, "Attack", true, onknbPartialAttackControl, 5, 1000, 1.0, 5, "pnlBody");
const knbPartialDecay = createKnob("knbPartialDecay", knbPartialAttack.get("x") + 100, lblPartialADSR.get("y") + 30, 48, 48, "Decay", true, onknbPartialDecayControl, 500, 20000, 1.0, 15000, "pnlBody");
const knbPartialSustain = createKnob("knbPartialSustain", knbPartialAttack.get("x") + 200, lblPartialADSR.get("y") + 30, 48, 48, "Sustain", true, onknbPartialSustainControl, -100, 0, 1.0, -100, "pnlBody");
const knbPartialRelease = createKnob("knbPartialRelease", knbPartialAttack.get("x") + 300, lblPartialADSR.get("y") + 30, 48, 48, "Release", true, onknbPartialReleaseControl, 5, 15000, 1.0, 200, "pnlBody");


const lblPartialAttack = createLabel("lblPartialAttack", knbPartialAttack.get("x") - 39, knbPartialAttack.get("y") + 50, 128, 32, 16, "Attack", "pnlBody", Colours.grey, "centred");
const lblPartialDecay = createLabel("lblPartialDecay", knbPartialDecay.get("x") - 40, knbPartialDecay.get("y") + 50, 128, 32, 16, "Decay", "pnlBody", Colours.grey, "centred");
const lblPartialSustain = createLabel("lblPartialSustain", knbPartialSustain.get("x") - 40, knbPartialSustain.get("y") + 50, 128, 32, 16, "Sustain", "pnlBody", Colours.grey, "centred");
const lblPartialRelease = createLabel("lblPartialRelease", knbPartialRelease.get("x") - 38, knbPartialRelease.get("y") + 50, 128, 32, 16, "Release", "pnlBody", Colours.grey, "centred");


/* Residue */

const lblResidue = createLabel("lblResidue", 483, -6, 128, 64, 24, "Residue_", "pnlBody", Colours.grey, "centred");
const lblResidueGain = createLabel("lblResidueGain", 740, 0, 128, 64, 14, "VOL", "pnlBody", Colours.grey, "right");
const knbResidueGain = createKnob("knbResidueGain", lblResidueGain.get("x") + 140, lblResidueGain.get("y") + 25, 100, 16, "Gain", true, onknbResidueGainControl, 0, 1, 0.01, .75, "pnlBody");


const lblResidueADSR = createLabel("lblResidueADSR", 467, 390, 128, 32, 20, "Env", "pnlBody", Colours.grey, "centred");

const knbResidueAttack = createKnob("knbResidueAttack", 573, lblResidueADSR.get("y") + 30, 48, 48, "Attack", true, onknbResidueAttackControl, 5, 1000, 1.0, 5, "pnlBody");
const knbResidueDecay = createKnob("knbResidueDecay", knbResidueAttack.get("x") + 100, lblResidueADSR.get("y") + 30, 48, 48, "Decay", true, onknbResidueDecayControl, 500, 20000, 1.0, 15000, "pnlBody");
const knbResidueSustain = createKnob("knbResidueSustain", knbResidueAttack.get("x") + 200, lblResidueADSR.get("y") + 30, 48, 48, "Sustain", true, onknbResidueSustainControl, -100, 0, 1.0, -100, "pnlBody");
const knbResidueRelease = createKnob("knbResidueRelease", knbResidueAttack.get("x") + 300, lblResidueADSR.get("y") + 30, 48, 48, "Release", true, onknbResidueReleaseControl, 5, 15000, 1.0, 200, "pnlBody");

const lblResidueAttack = createLabel("lblResidueAttack", knbResidueAttack.get("x") - 39, knbResidueAttack.get("y") + 50, 128, 32, 16, "Attack", "pnlBody", Colours.grey, "centred");
const lblResidueDecay = createLabel("lblResidueDecay", knbResidueDecay.get("x") - 40, knbResidueDecay.get("y") + 50, 128, 32, 16, "Decay", "pnlBody", Colours.grey, "centred");
const lblResidueSustain = createLabel("lblResidueSustain", knbResidueSustain.get("x") - 40, knbResidueSustain.get("y") + 50, 128, 32, 16, "Sustain", "pnlBody", Colours.grey, "centred");
const lblResidueRelease = createLabel("lblResidueRelease", knbResidueRelease.get("x") - 38, knbResidueRelease.get("y") + 50, 128, 32, 16, "Release", "pnlBody", Colours.grey, "centred");

/* Advanced Panel */

const btnShowAdvancedPanel = createButton("btnShowAdvancedPanel", 471, 227, 24, 80, "open", false, onbtnShowAdvancedPanelControl, false, true, "pnlBody");
const pnlAdvanced = createChildPanel("pnlAdvanced", 498, 20, 459, 482);

const lblAdvanced = createLabel("lblAdvanced", -8, -26, 128, 64, 24, "Advanced_", "pnlAdvanced", Colours.grey, "centred");
const lblRatios_L = createLabel("lblRatios_L", SliderPack_RatiosL.get("x") + 350, SliderPack_RatiosL.get("y") + 96, 128, 32, 16, "Ratios L", "pnlAdvanced", Colours.grey, "centred");
const lblRatios_R = createLabel("lblRatios_R", SliderPack_RatiosR.get("x") + 350, SliderPack_RatiosR.get("y") + 96, 128, 32, 16, "Ratios R", "pnlAdvanced", Colours.grey, "centred");
const lblPartialDrift = createLabel("lblPartialDrift", -31, SliderPack_RatiosR.get("y") + 108 , 128, 32, 20, "Drift", "pnlAdvanced", Colours.grey, "centred");
const lblPartialTone = createLabel("lblPartialTone", -31, lblPartialDrift.get("y") + 95, 128, 32, 20, "Tone", "pnlAdvanced", Colours.grey, "centred");

const btnResetRatios = createButton("btnResetRatios", 380, 0, 30, 30, "reset", false, onbtnResetRatiosControl, true, true, "pnlAdvanced");
const btnRandomRatios = createButton("btnRandomRatios", 420, 0, 30, 30, "reset", false, onbtnResetRatiosControl, true, true, "pnlAdvanced");

const knbPartialRandomGlobal = createKnob("knbPartialRandomGlobal", 75, lblPartialDrift.get("y") + 30, 48, 48, "RandomGlobal", true, onknbPartialRandomGlobalControl, 0.0, 1.0, 0.01, 0.02, "pnlAdvanced");
const knbPartialRandomSingle = createKnob("knbPartialRandomSingle", knbPartialRandomGlobal.get("x") + 100, lblPartialDrift.get("y") + 30, 48, 48, "RandomSingle", true, onknbPartialRandomSingleControl, 0.0, 1.0, 0.01, 0.1, "pnlAdvanced");
const knbPartialFalloffIntensity = createKnob("knbPartialFalloffIntensity", knbPartialRandomSingle.get("x") + 100, lblPartialDrift.get("y") + 30, 48, 48, "FalloffIntensity", true, onknbPartialFalloffIntensityControl, 0.0, 1.0, 0.01, 0.1, "pnlAdvanced");
const knbPartialFalloffDecay = createKnob("knbPartialFalloffDecay", knbPartialFalloffIntensity.get("x") + 100, lblPartialDrift.get("y") + 30, 48, 48, "FalloffDecay", true, onknbPartialFalloffDecayControl, 0, 20000, 1.0, 2200, "pnlAdvanced");

const knbPartialFilter = createKnob("knbPartialFilter", 75, lblPartialTone.get("y") + 30, 48, 48, "Filter", true, onknbPartialFilterControl, 50, 5000, 1.0, 4000, "pnlAdvanced");
const knbPartialDampen = createKnob("knbPartialDampen", knbPartialFilter.get("x") + 100, lblPartialTone.get("y") + 30, 48, 48, "Dampening", true, onknbPartialDampenControl, 0.0, 1.0, 0.01, 0.0, "pnlAdvanced");
const knbPartialStiffnessType = createKnob("knbPartialStiffnessType", knbPartialDampen.get("x") + 100, lblPartialTone.get("y") + 30, 48, 48, "StiffnessType", true, onknbPartialStiffnessTypeControl, 0.0, 1.0, 1.0, 1.0, "pnlAdvanced");
const knbPartialStiffnessIntensity = createKnob("knbPartialStiffnessIntensity", knbPartialStiffnessType.get("x") + 100, lblPartialTone.get("y") + 30, 48, 48, "StiffnessIntensity", true, onknbPartialStiffnessIntensityControl, 0.0, 0.3, 0.01, 0.0, "pnlAdvanced");

const lblPartialRandomGlobal = createLabel("lblPartialRandomGlobal", knbPartialRandomGlobal.get("x") - 39, knbPartialRandomGlobal.get("y") + 50, 128, 32, 16, "Global", "pnlAdvanced", Colours.grey, "centred");
const lblPartialRandomSingle = createLabel("lblPartialRandomSingle", knbPartialRandomSingle.get("x") - 40, knbPartialRandomGlobal.get("y") + 50, 128, 32, 16, "Inter", "pnlAdvanced", Colours.grey, "centred");
const lblPartialFalloffIntensity = createLabel("lblPartialFalloffIntensity", knbPartialFalloffIntensity.get("x") - 40, knbPartialRandomGlobal.get("y") + 50, 128, 32, 16, "Falloff", "pnlAdvanced", Colours.grey, "centred");
const lblPartialFalloffDecay = createLabel("lblPartialFalloffDecay", knbPartialFalloffDecay.get("x") - 40, knbPartialRandomGlobal.get("y") + 50, 128, 32, 16, "Decay", "pnlAdvanced", Colours.grey, "centred");
const lblPartialFilter = createLabel("lblPartialFilter", knbPartialFilter.get("x") - 40, knbPartialFilter.get("y") + 50, 128, 32, 16, "Filter", "pnlAdvanced", Colours.grey, "centred");
const lblPartialDampen = createLabel("lblPartialDampen", knbPartialDampen.get("x") - 40, knbPartialDampen.get("y") + 50, 128, 32, 16, "Dampen", "pnlAdvanced", Colours.grey, "centred");
const lblPartialStiffnessType = createLabel("lblPartialStiffnessType", knbPartialStiffnessType.get("x") - 40, knbPartialStiffnessType.get("y") + 50, 128, 32, 16, "Type", "pnlAdvanced", Colours.grey, "centred");
const lblPartialStiffnessA = createLabel("lblPartialStiffnessA", knbPartialStiffnessType.get("x") - 75, knbPartialStiffnessType.get("y") + 37, 128, 32, 16, "A", "pnlAdvanced", Colours.grey, "centred");
const lblPartialStiffnessB = createLabel("lblPartialStiffnessB", knbPartialStiffnessType.get("x") - 5, knbPartialStiffnessType.get("y") + 37, 128, 32, 16, "B", "pnlAdvanced", Colours.grey, "centred");
const lblPartialStiffnessIntensity = createLabel("lblPartialStiffnessIntensity", knbPartialStiffnessIntensity.get("x") - 40, knbPartialStiffnessIntensity.get("y") + 50, 128, 32, 16, "Amount", "pnlAdvanced", Colours.grey, "centred");

SliderPack_RatiosL.set("parentComponent", "pnlAdvanced");
SliderPack_RatiosR.set("parentComponent", "pnlAdvanced");

SliderPack_RatiosR.set("visible", STEREO_INSTRUMENT);
lblRatios_R.set("visible", STEREO_INSTRUMENT);
	
/* Horizontal Sliders */

knbPartialGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);
knbResidueGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);

Content.setPropertiesFromJSON("knbPartialGain", {
	    "bgColour": 0x0,
	    "itemColour": 0xFF6F6F6F,
	    "itemColour2": 0xffd7d0bc,
	    "textColour": 0xff343437,
	    "mode": "Decibel",
	    "style": "Horizontal",
	    "dragDirection": "Horizontal",
	    "showTextBox": false		    
	});
	
Content.setPropertiesFromJSON("knbResidueGain", {
	    "bgColour": 0x0,
	    "itemColour": 0xFF6F6F6F,
	    "itemColour2": 0xffd7d0bc,
	    "textColour": 0xff343437,
	    "mode": "Decibel",
	    "style": "Horizontal",
	    "dragDirection": "Horizontal",
	    "showTextBox": false		    
	});	

/* Setup Misc Defaults */

knbPartialSustain.set("middlePosition", -12.0);
knbPartialFilter.set("middlePosition", 3000);

