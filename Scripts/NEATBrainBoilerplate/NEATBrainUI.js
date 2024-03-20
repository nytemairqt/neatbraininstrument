include("NEATBrainBoilerplate/NEATBrainLookAndFeel.js");
include("NEATBrainBoilerplate/NEATBrainModules.js");
include("NEATBrainBoilerplate/NEATBrainUIConstructors.js");

const PARTIAL_PROFILES = ["A", "B", "C"];


/* Partials */


// Partial Gain
inline function onknbPartialGainControl(component, value)
{
	left_WG.setAttribute(left_WG.Gain, value);
	
	//samplerWTLeft.setAttribute(samplerWTLeft.Gain, value);
	//samplerWTRight.setAttribute(samplerWTRight.Gain, value);

	//synthWTLeftA.setAttribute(synthWTLeftA.Gain, value);
	//synthWTRightA.setAttribute(synthWTRightA.Gain, value);
}		

// AHDSR Attack
inline function onknbPartialAttackControl(component, value)
{
	left_gainAHDSR.setAttribute(left_gainAHDSR.Attack, value);

	//samplerWTLeft_gainAHDSR.setAttribute(samplerWTLeft_gainAHDSR.Attack, value);
	//samplerWTRight_gainAHDSR.setAttribute(samplerWTRight_gainAHDSR.Attack, value);

	//synthWTLeftA_gainAHDSR.setAttribute(synthWTLeftA_gainAHDSR.Attack, value);
	//synthWTRightA_gainAHDSR.setAttribute(synthWTRightA_gainAHDSR.Attack, value);
}

// AHDSR Decay
inline function onknbPartialDecayControl(component, value)
{
	left_gainAHDSR.setAttribute(left_gainAHDSR.Decay, value);

	//samplerWTLeft_gainAHDSR.setAttribute(samplerWTLeft_gainAHDSR.Decay, value);
	//samplerWTRight_gainAHDSR.setAttribute(samplerWTRight_gainAHDSR.Decay, value);

	//synthWTLeftA_gainAHDSR.setAttribute(synthWTLeftA_gainAHDSR.Decay, value);
	//synthWTRightA_gainAHDSR.setAttribute(synthWTRightA_gainAHDSR.Decay, value);
}

// AHDSR Sustain
inline function onknbPartialSustainControl(component, value)
{
	left_gainAHDSR.setAttribute(left_gainAHDSR.Sustain, value);

	//samplerWTLeft_gainAHDSR.setAttribute(samplerWTLeft_gainAHDSR.Sustain, value);
	//samplerWTRight_gainAHDSR.setAttribute(samplerWTRight_gainAHDSR.Sustain, value);

	//synthWTLeftA_gainAHDSR.setAttribute(synthWTLeftA_gainAHDSR.Sustain, value);
	//synthWTRightA_gainAHDSR.setAttribute(synthWTRightA_gainAHDSR.Sustain, value);
}

// AHDSR Release
inline function onknbPartialReleaseControl(component, value)
{
	left_gainAHDSR.setAttribute(left_gainAHDSR.Release, value);

	//samplerWTLeft_gainAHDSR.setAttribute(samplerWTLeft_gainAHDSR.Release, value);
	//samplerWTRight_gainAHDSR.setAttribute(samplerWTRight_gainAHDSR.Release, value);

	//synthWTLeftA_gainAHDSR.setAttribute(synthWTLeftA_gainAHDSR.Release, value);
	//synthWTRightA_gainAHDSR.setAttribute(synthWTRightA_gainAHDSR.Release, value);	
}

// Hidden Combo Box
inline function oncmbPartialProfileControl(component, value)
{
	//samplerWTLeft_fxProfileA.setBypassed(1);
	//samplerWTLeft_fxProfileB.setBypassed(1);
	//samplerWTLeft_fxProfileC.setBypassed(1);
	
	left_fxProfileA.setBypassed(1);
	left_fxProfileB.setBypassed(1);
	left_fxProfileC.setBypassed(1);

	switch(value)
	{
		case 1:
			left_fxProfileA.setBypassed(0);
			//samplerWTLeft_fxProfileA.setBypassed(0);
			break;
		case 2:
			left_fxProfileB.setBypassed(0);
			//samplerWTLeft_fxProfileB.setBypassed(0);
			break;
		case 3:
			left_fxProfileC.setBypassed(0);
			//samplerWTLeft_fxProfileC.setBypassed(0);
	}

	//local offset = 1; // keep

	//synthWTLeftA.setAttribute(synthWTLeftA.LoadedBankIndex, value); 
	//synthWTRightA.setAttribute(synthWTRightA.LoadedBankIndex, value + offset); 
	pnlProfilePartial.repaintImmediately();	
}

// Profile Previous
inline function onbtnPartialPrevControl(component, value)
{	
	if (value)
	{
		if (cmbPartialProfile.getValue() == 1)
			cmbPartialProfile.setValue(PARTIAL_PROFILES.length);
		else
			cmbPartialProfile.setValue(cmbPartialProfile.getValue() - 1);			
		cmbPartialProfile.changed();
	}
	
}

// Profile Next
inline function onbtnPartialNextControl(component, value)
{
	if (value)
	{
		if (cmbPartialProfile.getValue() < PARTIAL_PROFILES.length)
			cmbPartialProfile.setValue(cmbPartialProfile.getValue() + 1);
		else
			cmbPartialProfile.setValue(1);			
		cmbPartialProfile.changed();
	}
}

// Create UI Elements

const lblModes = createLabel("lblModes", -6, -6, 128, 64, 20, "medium", "PARTIAL", "pnlBody", Colours.grey, "centred");
const lblPartialADSR = createLabel("lblPartialADSR", -30, 402 , 128, 32, 20, "regular", "Env", "pnlBody", Colours.grey, "centred");

const lblPartialGain = createLabel("lblPartialGain", 240, 0, 128, 64, 16, "regular", "VOL", "pnlBody", Colours.grey, "right");
const knbPartialGain = createKnob("knbPartialGain", lblPartialGain.get("x") + 140, lblPartialGain.get("y") + 25, 100, 16, "PartialGain", true, onknbPartialGainControl, 0, 1, 0.01, .75, "pnlBody", true);

knbPartialGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);


const cmbPartialProfile = createComboBox("cmbPartialProfile", 0, 0, 10, 10, "profile", true, oncmbPartialProfileControl, PARTIAL_PROFILES, false, "pnlBody");

const btnPartialProfilePrev = createButton("btnPartialProfilePrev", 66, 205, 30, 30, "Prev", false, onbtnPartialPrevControl, true, true, "pnlBody");
const btnPartialProfileNext = createButton("btnPartialProfileNext", btnPartialProfilePrev.get("x") + 320, 205, 30, 30, "Prev", false, onbtnPartialNextControl, true, true, "pnlBody");

const knbPartialAttack = createKnob("knbPartialAttack", lblPartialADSR.get("x") + 120, lblPartialADSR.get("y") + 30, 48, 48, "P_Attack", true, onknbPartialAttackControl, 5, 1000, 1.0, 5, "pnlBody", true);
const knbPartialDecay = createKnob("knbPartialDecay", knbPartialAttack.get("x") + 100, lblPartialADSR.get("y") + 30, 48, 48, "P_Decay", true, onknbPartialDecayControl, 500, 20000, 1.0, 15000, "pnlBody", true);
const knbPartialSustain = createKnob("knbPartialSustain", knbPartialAttack.get("x") + 200, lblPartialADSR.get("y") + 30, 48, 48, "P_Sustain", true, onknbPartialSustainControl, -100, 0, 1.0, -100, "pnlBody", true);
const knbPartialRelease = createKnob("knbPartialRelease", knbPartialAttack.get("x") + 300, lblPartialADSR.get("y") + 30, 48, 48, "P_Release", true, onknbPartialReleaseControl, 5, 15000, 1.0, 200, "pnlBody", true);

const lblPartialAttack = createLabel("lblPartialAttack", knbPartialAttack.get("x") - 39, knbPartialAttack.get("y") + 50, 128, 32, 16, "regular", "Attack", "pnlBody", Colours.grey, "centred");
const lblPartialDecay = createLabel("lblPartialDecay", knbPartialDecay.get("x") - 40, knbPartialDecay.get("y") + 50, 128, 32, 16, "regular", "Decay", "pnlBody", Colours.grey, "centred");
const lblPartialSustain = createLabel("lblPartialSustain", knbPartialSustain.get("x") - 40, knbPartialSustain.get("y") + 50, 128, 32, 16, "regular", "Sustain", "pnlBody", Colours.grey, "centred");
const lblPartialRelease = createLabel("lblPartialRelease", knbPartialRelease.get("x") - 38, knbPartialRelease.get("y") + 50, 128, 32, 16, "regular", "Release", "pnlBody", Colours.grey, "centred");

/* Residue */

// Residue Gain
inline function onknbResidueGainControl(component, value)
{
	left_RS.setAttribute(left_RS.Gain, value);

	//samplerResidueLeft.setAttribute(samplerResidueLeft.Gain, value);	
	//samplerResidueRight.setAttribute(samplerResidueRight.Gain, value);	
	//samplerReleaseLeft.setAttribute(samplerReleaseLeft.Gain, value);
	//samplerReleaseRight.setAttribute(samplerReleaseRight.Gain, value);
}

// AHDSR Attack
inline function onknbResidueAttackControl(component, value)
{
	

	//samplerResidueLeft_gainAHDSR.setAttribute(samplerResidueLeft_gainAHDSR.Attack, value);
	//samplerResidueRight_gainAHDSR.setAttribute(samplerResidueRight_gainAHDSR.Attack, value);
}

// AHDSR Decay
inline function onknbResidueDecayControl(component, value)
{
	//samplerResidueLeft_gainAHDSR.setAttribute(samplerResidueLeft_gainAHDSR.Decay, value);
	//samplerResidueRight_gainAHDSR.setAttribute(samplerResidueRight_gainAHDSR.Decay, value);
}

// AHDSR Sustain
inline function onknbResidueSustainControl(component, value)
{		
	//samplerResidueLeft_gainAHDSR.setAttribute(samplerResidueLeft_gainAHDSR.Sustain, value);
	//samplerResidueRight_gainAHDSR.setAttribute(samplerResidueRight_gainAHDSR.Sustain, value);
}

// AHDSR Release
inline function onknbResidueReleaseControl(component, value)
{
	//samplerResidueLeft_gainAHDSR.setAttribute(samplerResidueLeft_gainAHDSR.Release, value);
	//samplerResidueRight_gainAHDSR.setAttribute(samplerResidueRight_gainAHDSR.Release, value);
}

// Hidden Combo Box
inline function oncmbResidueProfileControl(component, value)
{
	// replace with proper logic 

	pnlProfileResidue.repaintImmediately();
	
	//residueProfileA.setBypassed(1);
	//residueProfileB.setBypassed(1);
	//residueProfileC.setBypassed(1);
	
	switch (value)
	{
		case 1:
			//samplerResidueLeft_sampleOffset.setIntensity(1.0);
			//samplerResidueRight_sampleOffset.setIntensity(1.0);			
			//residueProfileA.setBypassed(0);
			break;
		case 2:
			//samplerResidueLeft_sampleOffset.setIntensity(.5);
			//samplerResidueRight_sampleOffset.setIntensity(.5);
			//residueProfileB.setBypassed(0);
			break;
		case 3:
			//samplerResidueLeft_sampleOffset.setIntensity(.5);
			//samplerResidueRight_sampleOffset.setIntensity(.5);
			//residueProfileC.setBypassed(0);
			break;		
	}

}

// Profile Previous
inline function onbtnResiduePrevControl(component, value)
{	
	if (value)
	{
		if (cmbResidueProfile.getValue() == 1)
			cmbResidueProfile.setValue(PARTIAL_PROFILES.length);
		else
			cmbResidueProfile.setValue(cmbResidueProfile.getValue() - 1);			
		cmbResidueProfile.changed();
	}	
}

// Profile Next
inline function onbtnResidueNextControl(component, value)
{
	if (value)
	{
		if (cmbResidueProfile.getValue() < PARTIAL_PROFILES.length)
			cmbResidueProfile.setValue(cmbResidueProfile.getValue() + 1);
		else
			cmbResidueProfile.setValue(1);			
		cmbResidueProfile.changed();
	}
}

// Create UI Elements

const lblResidue = createLabel("lblResidue", 478, -6, 128, 64, 20, "medium", "RESIDUE", "pnlBody", Colours.grey, "centred");
const lblResidueGain = createLabel("lblResidueGain", 740, 0, 128, 64, 16, "regular", "VOL", "pnlBody", Colours.grey, "right");
const knbResidueGain = createKnob("knbResidueGain", lblResidueGain.get("x") + 140, lblResidueGain.get("y") + 25, 100, 16, "Residue_Gain", true, onknbResidueGainControl, 0, 1, 0.01, .75, "pnlBody", true);

knbResidueGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);

const cmbResidueProfile = createComboBox("cmbResidueProfile", 0, 0, 10, 10, "profile", true, oncmbResidueProfileControl, PARTIAL_PROFILES, false, "pnlBody");

const btnResidueProfilePrev = createButton("btnResidueProfilePrev", 500 + btnPartialProfilePrev.get("x"), 205, 30, 30, "Prev", false, onbtnResiduePrevControl, true, true, "pnlBody");
const btnResidueProfileNext = createButton("btnResidueProfileNext", btnResidueProfilePrev.get("x") + 320, 205, 30, 30, "Prev", false, onbtnResidueNextControl, true, true, "pnlBody");

const lblResidueADSR = createLabel("lblResidueADSR", 467, lblPartialADSR.get("y"), 128, 32, 20, "regular", "Env", "pnlBody", Colours.grey, "centred");

const knbResidueAttack = createKnob("knbResidueAttack", lblResidueADSR.get("x") + 120, lblResidueADSR.get("y") + 30, 48, 48, "R_Attack", true, onknbResidueAttackControl, 5, 1000, 1.0, 5, "pnlBody", true);
const knbResidueDecay = createKnob("knbResidueDecay", knbResidueAttack.get("x") + 100, lblResidueADSR.get("y") + 30, 48, 48, "R_Decay", true, onknbResidueDecayControl, 500, 20000, 1.0, 15000, "pnlBody", true);
const knbResidueSustain = createKnob("knbResidueSustain", knbResidueAttack.get("x") + 200, lblResidueADSR.get("y") + 30, 48, 48, "R_Sustain", true, onknbResidueSustainControl, -100, 0, 1.0, -100, "pnlBody", true);
const knbResidueRelease = createKnob("knbResidueRelease", knbResidueAttack.get("x") + 300, lblResidueADSR.get("y") + 30, 48, 48, "R_Release", true, onknbResidueReleaseControl, 5, 15000, 1.0, 200, "pnlBody", true);

const lblResidueAttack = createLabel("lblResidueAttack", knbResidueAttack.get("x") - 39, knbResidueAttack.get("y") + 50, 128, 32, 16, "regular", "Attack", "pnlBody", Colours.grey, "centred");
const lblResidueDecay = createLabel("lblResidueDecay", knbResidueDecay.get("x") - 40, knbResidueDecay.get("y") + 50, 128, 32, 16, "regular", "Decay", "pnlBody", Colours.grey, "centred");
const lblResidueSustain = createLabel("lblResidueSustain", knbResidueSustain.get("x") - 40, knbResidueSustain.get("y") + 50, 128, 32, 16, "regular", "Sustain", "pnlBody", Colours.grey, "centred");
const lblResidueRelease = createLabel("lblResidueRelease", knbResidueRelease.get("x") - 38, knbResidueRelease.get("y") + 50, 128, 32, 16, "regular", "Release", "pnlBody", Colours.grey, "centred");

/* Advanced Panel */


// Open Advanced Panel

inline function onbtnShowAdvancedPanelControl(component, value)
{
	pnlAdvanced.set("visible", value);
}

// Amp Velocity
inline function onknbAmpVelocityControl(component, value) 
{
	left_gainVelocity.setIntensity(value * .1);

	//samplerWTLeft_gainVelocity.setIntensity(value * .1);
	//samplerWTRight_gainVelocity.setIntensity(value * .1);

	//synthWTLeftA_gainVelocity.setIntensity(value * .1);
	//synthWTRightA_gainVelocity.setIntensity(value * .1);
}


// Amp LFO
inline function onknbAmpLFOControl(component, value)
{
	left_gainLFO.setIntensity(value * .1);

	//samplerWTLeft_gainLFO.setIntensity(value * .1);
	//samplerWTRight_gainLFO.setIntensity(value * .1);

	//synthWTLeftA_gainLFO.setIntensity(value * .1);
	//synthWTRightA_gainLFO.setIntensity(value * .1);
}

// Amp Random
inline function onknbAmpRandomControl(component, value)
{
	left_gainRandom.setIntensity(value * .1);

	//samplerWTLeft_gainRandom.setIntensity(value * .1);
	//samplerWTRight_gainRandom.setIntensity(value * .1);

	//synthWTLeftA_gainRandom.setIntensity(value * .1);
	//synthWTRightA_gainRandom.setIntensity(value * .1);
}

// Pitch Velocity
inline function onknbPitchVelocityControl(component, value)
{
	left_pitchAHDSR.setIntensity(value * .6);

	//samplerWTLeft_pitchAHDSR.setIntensity(value * .6);
	//samplerWTRight_pitchAHDSR.setIntensity(value * .6);

	//synthWTLeftA_pitchAHDSR.setIntensity(value * .6);
	//synthWTRightA_pitchAHDSR.setIntensity(value * .6);
}

// Pitch Decay
inline function onknbPitchDecayControl(component, value)
{
	left_pitchAHDSR.setAttribute(left_pitchAHDSR.Decay, value);

	//samplerWTLeft_pitchAHDSR.setAttribute(samplerWTLeft_pitchAHDSR.Decay, value);
	//samplerWTRight_pitchAHDSR.setAttribute(samplerWTRight_pitchAHDSR.Decay, value);

	//synthWTLeftA_pitchAHDSR.setAttribute(synthWTLeftA_pitchAHDSR.Decay, value);
	//synthWTRightA_pitchAHDSR.setAttribute(synthWTLeftA_pitchAHDSR.Decay, value);
}

// Pitch Random
inline function onknbPitchRandomControl(component, value)
{
	left_pitchRandom.setIntensity(value * .5);

	//samplerWTLeft_pitchRandom.setIntensity(value * .5);
	//samplerWTRight_pitchRandom.setIntensity(value * .5);

	//synthWTLeftA_pitchRandom.setIntensity(value * .5);
	//synthWTRightA_pitchRandom.setIntensity(value * .5);
}

// Pitch LFO 
inline function onknbPitchLFOControl(component, value)
{
	left_pitchLFO.setIntensity(value * .2);

	//samplerWTLeft_pitchLFO.setIntensity(value * .2);
	//samplerWTRight_pitchLFO.setIntensity(value * .2);

	//synthWTLeftA_pitchLFO.setIntensity(value * .2);
	//synthWTRightA_pitchLFO.setIntensity(value * .2);
}

// Tone Dampen
inline function onknbToneDampenControl(component, value)
{	
	left_WGDampen.setAttribute(left_WGDampen.Dampen, value);
	//samplerWTLeft_fxDampen.setAttribute(samplerWTLeft_fxDampen.Dampen, value);
	//samplerWTRight_fxDampen.setAttribute(samplerWTRight_fxDampen.Dampen, value);
	
	//synthWTLeftA_dampen.setAttribute(synthWTLeftA_dampen.Dampen, value);
	//synthWTRightA_dampen.setAttribute(synthWTRightA_dampen.Dampen, value);
}

// Tone Decay 
inline function onknbToneClampControl(component, value)
{
	// what is this

}

// Chorus
inline function onknbToneChorusControl(component, value)
{
	// probably removing Chorusing

	/*

	if (value == 0)
	{
		synthWTLeftA_fxChorus.setBypassed(1);
		synthWTRightA_fxChorus.setBypassed(1);
	}
	else
	{
		synthWTLeftA_fxChorus.setBypassed(0);
		synthWTRightA_fxChorus.setBypassed(0);
	}
	
	synthWTLeftA_fxChorus.setAttribute(synthWTLeftA_fxChorus.Width, value * .5);
	synthWTRightA_fxChorus.setAttribute(synthWTRightA_fxChorus.Width, value * .5);	
	*/
}

// Tone Stiffness Intensity
inline function onknbToneBrightnessControl(component, value)
{	
	// move to separate effect, keep toneAdjust static & hidden from end-user
	
	// might deprecate
	
	/*
	local lpf = 1;
	local highshelf = 3;
	
	// Low Pass Frequency
	local idx = (lpf * synthWTLeftA_toneAdjust.BandOffset) + 1; // Low Pass Frequency
	local min = 7000;
	local max = 10000;
	
	local f = Math.round(min + (value * (max-min)));	
		
	synthWTLeftA_toneAdjust.setAttribute(idx, f);
	synthWTRightA_toneAdjust.setAttribute(idx, f);
	
	// High Shelf Gain
	idx = (highshelf * synthWTLeftA_toneAdjust.BandOffset) + 0;
	
	synthWTLeftA_toneAdjust.setAttribute(idx, value * 6);
	synthWTRightA_toneAdjust.setAttribute(idx, value * 6);
	*/
}

// Instantiate UI Elements

const btnShowAdvancedPanel = createButton("btnShowAdvancedPanel", 471, 200, 24, 100, "open", false, onbtnShowAdvancedPanelControl, false, true, "pnlBody");
const pnlAdvanced = createChildPanel("pnlAdvanced", 496, 0, 500, 522, "pnlBody");
const lblAdvanced = createLabel("lblAdvanced", -11, 16, 128, 64, 20, "medium", "ADVANCED", "pnlAdvanced", Colours.grey, "centredTop");

pnlAdvanced.set("visible", false);
btnShowAdvancedPanel.setValue(0);

const lblTone = createLabel("lblTone", -29, 402, 128, 32, 20, "regular", "Tone", "pnlAdvanced", Colours.grey, "centred");
const lblPitch = createLabel("lblPitch", -29, lblTone.get("y") - 140, 128, 32, 20, "regular", "Pitch", "pnlAdvanced", Colours.grey, "centred");
const lblAmp = createLabel("lblAmp", -29, lblPitch.get("y") - 140, 128, 32, 20, "regular", "Amp", "pnlAdvanced", Colours.grey, "centred");

const knbAmpVelocity = createKnob("knbAmpVelocity", lblAmp.get("x") + 120, lblAmp.get("y") + 30, 48, 48, "AmpVel", true, onknbAmpVelocityControl, 0, 1.0, 0.01, 0.3, "pnlAdvanced", true);
const knbAmpLFO = createKnob("knbAmpLFO", knbAmpVelocity.get("x") + 120, lblAmp.get("y") + 30, 48, 48, "AmpLFO", true, onknbAmpLFOControl, 0, 1.0, 0.01, 0.3, "pnlAdvanced", true);
const knbAmpRandom = createKnob("knbAmpRandom", knbAmpLFO.get("x") + 120, lblAmp.get("y") + 30, 48, 48, "AmpRand", true, onknbAmpRandomControl, 0, 1.0, 0.01, 0.3, "pnlAdvanced", true);

const knbPitchVelocity = createKnob("knbPitchVelocity", lblPitch.get("x") + 120, lblPitch.get("y") + 30, 48, 48, "PitchVel", true, onknbPitchVelocityControl, 0, 1.0, 0.01, 0.2, "pnlAdvanced", true);
const knbPitchDecay = createKnob("knbPitchDecay", knbPitchVelocity.get("x") + 100, lblPitch.get("y") + 30, 48, 48, "PitchDec", true, onknbPitchDecayControl, 20, 4000, 1.0, 1000, "pnlAdvanced", true);
const knbPitchLFO = createKnob("knbPitchLFO", knbPitchDecay.get("x") + 100, lblPitch.get("y") + 30, 48, 48, "PitchLFO", true, onknbPitchLFOControl, 0, 1.0, 0.01, 0.3, "pnlAdvanced", true);
const knbPitchRandom = createKnob("knbPitchRandom", knbPitchLFO.get("x") + 100, lblPitch.get("y") + 30, 48, 48, "PitchRand", true, onknbPitchRandomControl, 0, 1.0, 0.01, 0.3, "pnlAdvanced", true);

const knbToneDampen = createKnob("knbToneDampen", lblTone.get("x") + 120, lblTone.get("y") + 30, 48, 48, "ToneDamp", true, onknbToneDampenControl, 0, 1, 0.01, 0.4, "pnlAdvanced", true);
const knbToneChorus = createKnob("knbToneChorus", knbToneDampen.get("x") + 120, lblTone.get("y") + 30, 48, 48, "ToneChorus", true, onknbToneChorusControl, 0, 1.0, 0.01, 0.25, "pnlAdvanced", true);
const knbToneBrightness = createKnob("knbToneBrightness", knbToneChorus.get("x") + 120, lblTone.get("y") + 30, 48, 48, "ToneBright", true, onknbToneBrightnessControl, 0, 1.0, 0.01, 0.3, "pnlAdvanced", true);

const lblAmpVelocity = createLabel("lblAmpVelocity", knbAmpVelocity.get("x") - 39, knbAmpVelocity.get("y") + 50, 128, 32, 16, "regular", "Vel", "pnlAdvanced", Colours.grey, "centred");
const lblAmpLFO = createLabel("lblAmpLFO", knbAmpLFO.get("x") - 39, knbAmpLFO.get("y") + 50, 128, 32, 16, "regular", "Drift", "pnlAdvanced", Colours.grey, "centred");
const lblAmpRandom = createLabel("lblAmpRandom", knbAmpRandom.get("x") - 39, knbAmpRandom.get("y") + 50, 128, 32, 16, "regular", "Random", "pnlAdvanced", Colours.grey, "centred");

const lblPitchVelocity = createLabel("lblPitchVelocity", knbPitchVelocity.get("x") - 39, knbPitchVelocity.get("y") + 50, 128, 32, 16, "regular", "Vel", "pnlAdvanced", Colours.grey, "centred");
const lblPitchDecay = createLabel("lblPitchDecay", knbPitchDecay.get("x") - 39, knbPitchDecay.get("y") + 50, 128, 32, 16, "regular", "Decay", "pnlAdvanced", Colours.grey, "centred");
const lblPitchRandom = createLabel("lblPitchRandom", knbPitchRandom.get("x") - 39, knbPitchRandom.get("y") + 50, 128, 32, 16, "regular", "Random", "pnlAdvanced", Colours.grey, "centred");
const lblPitchLFO = createLabel("lblPitchLFO", knbPitchLFO.get("x") - 39, knbPitchLFO.get("y") + 50, 128, 32, 16, "regular", "Drift", "pnlAdvanced", Colours.grey, "centred");

const lblToneDampen = createLabel("lblToneDampen", knbToneDampen.get("x") - 39, knbToneDampen.get("y") + 50, 128, 32, 16, "regular", "Dampen", "pnlAdvanced", Colours.grey, "centred");
const lblToneChorus = createLabel("lblToneChorus", knbToneChorus.get("x") - 39, knbToneChorus.get("y") + 50, 128, 32, 16, "regular", "Chorus", "pnlAdvanced", Colours.grey, "centred");
const lblToneBrightness = createLabel("lblToneBrightness", knbToneBrightness.get("x") - 39, knbToneBrightness.get("y") + 50, 128, 32, 16, "regular", "Brightness", "pnlAdvanced", Colours.grey, "centred");
	
/* Horizontal Sliders */

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

/* Info Popup Panel */

const pnlInfoPopup = createChildPanel("pnlInfoPopup", 0, 10, 494, 510, "pnlBody");
pnlInfoPopup.set("visible", 0);

// need to include text as a JSON object and iterate through the lines

const jsonInfoSubtitles = ["VEL", "DRIFT", "RANDOM", "DECAY", "DAMPEN", "CLAMP", "CHORUS", "BRIGHTNESS"];

const jsonInfoPopup = [
"The amount of Upward Drift Modulation when playing harder velocities.",
"The amount of Time-Varying LFO Modulation applied to the signal.",
"The amount of randomization applied when a note is played.",
"The time it takes for the relevant \"Upward\" Modulator to return to zero.",
"The amount of Clamping applied to harsh upper frequencies.",
"The speed of Clamping applied to the Dampen Parameter.",
"The amount of inter-modal chorusing applied to Partials.",
"The amount of additional amplitude applied to high frequencies."
 ];

pnlInfoPopup.setPaintRoutine(function(g)
{	
	//g.fillAll(pnlBodyColour);
	g.setColour(pnlBodyColour);
	g.fillRoundedRectangle([5, 0, this.getWidth(), this.getHeight()], 1.0);
	g.setFont("bold", 24);
	
	var noiseData = {
				"alpha" : .1,
				"monochromatic" : false,
				"scaleFactor" : 2,
				"area" : [0, 0, this.getWidth(), this.getHeight()]		
			};
			
		g.addNoise(noiseData);
    
    g.setColour(0xFFE2E3F3);
    g.drawAlignedText("Memory Journal", [0, 0, this.getWidth(), this.getHeight()], "centredTop");
    
    var baseYOffset = 180;
    var yOffset = 24;
    var xOffset = 10;
    
    g.setFont("bold", 16);
    
    g.setColour(Colours.grey);
    
    g.drawAlignedText("Welcome to", [0 + xOffset, 40, this.getWidth(), this.getHeight()], "topLeft");
    g.setColour(0xFFE2E3F3);
    g.drawAlignedText("NEATBrain.", [70 + xOffset, 40, this.getWidth(), this.getHeight()], "topLeft");
    g.setColour(Colours.grey);
    g.drawAlignedText("Select a Partial and Residue Profile from the main window, then tweak and sculpt your ", [0 + xOffset, 75, this.getWidth(), this.getHeight()], "topLeft");
    g.drawAlignedText("sound with the Advanced controls.", [0 + xOffset, 95, this.getWidth(), this.getHeight()], "topLeft");
    g.drawAlignedText("Advanced controls are separated by function (Amplitude, Pitch & Tone)", [0 + xOffset, 125, this.getWidth(), this.getHeight()], "topLeft");

	g.setColour(0xFFE2E3F3);
    for (i=0; i<jsonInfoSubtitles.length; i++)
    {
    	g.drawAlignedText(jsonInfoSubtitles[i] + ":", [-410 + xOffset, baseYOffset + yOffset * i, this.getWidth(), this.getHeight()], "topRight");
    }

    g.setColour(Colours.grey);

    for (i=0; i<jsonInfoPopup.length; i++)
    {
	    g.drawAlignedText(jsonInfoPopup[i], [90 + xOffset, baseYOffset + yOffset * i, this.getWidth(), this.getHeight()], "topLeft");
    }    
});


	
/* Info Mouseover Panel */

const pnlShowInfoPopup = createChildPanel("pnlShowInfoPopup", 436, 16, 16, 16, "pnlAdvanced");

pnlShowInfoPopup.set("allowCallbacks", "Clicks & Hover");

pnlShowInfoPopup.setMouseCallback(function(event)
{
	this.data.over = event.hover;
	this.repaint();
	
	pnlInfoPopup.set("visible", event.hover);

});

pnlShowInfoPopup.setPaintRoutine(function(g)
{
	g.setFont("bold", 20);
    g.setColour(this.data.over ? 0xFFE2E3F3 : Colours.grey);
    g.drawAlignedText("?", [0, 0, this.getWidth(), this.getHeight()], "centred");
});

/* Custom LAF */

btnShowAdvancedPanel.setLocalLookAndFeel(LAFButtonShowAdvancedPanel);

btnPartialProfilePrev.setLocalLookAndFeel(LAFButtonPrev);
btnPartialProfileNext.setLocalLookAndFeel(LAFButtonNext);

btnResidueProfilePrev.setLocalLookAndFeel(LAFButtonPrev);
btnResidueProfileNext.setLocalLookAndFeel(LAFButtonNext);

pnlAdvanced.setPaintRoutine(function(g)
{
	// Internal Gradient
	var gradientData = [pnlBodyColour, 0, 0, pnlBodyColourTop, 0, this.getHeight(), false];
	g.setGradientFill(gradientData);
	g.fillRoundedRectangle([0, 13, this.getWidth(), this.getHeight() - 16], 1.0);
	
	var noiseData = {
			"alpha" : .15,
			"monochromatic" : false,
			"scaleFactor" : 2,
			"area" : [0, 13, this.getWidth(), this.getHeight() - 16]		
		};
		
	g.addNoise(noiseData);
});

/* Rhapsody Stuff */

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

/* Key Colours */

for (i = 24; i < 89; i++)
   	Engine.setKeyColour(i, Colours.withAlpha(Colours.lightblue, 1.0));

for (i=89; i<100; i++)   	
	Engine.setKeyColour(i, Colours.withAlpha(Colours.lightgreen, 1.0));

