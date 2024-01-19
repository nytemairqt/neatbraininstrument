include("NEATBrainBoilerplate/NEATBrainLookAndFeel.js");
include("NEATBrainBoilerplate/NEATBrainModules.js");
include("NEATBrainBoilerplate/NEATBrainUIConstructors.js");




/* Partials */


// Partial Gain
inline function onknbPartialGainControl(component, value)
{
	synthWTLeftA.setAttribute(synthWTLeftA.Gain, value);
	synthWTRightA.setAttribute(synthWTRightA.Gain, value);
	
	synthWTLeftB.setAttribute(synthWTLeftB.Gain, value);
	synthWTRightB.setAttribute(synthWTRightB.Gain, value);
}		

// AHDSR Attack
inline function onknbPartialAttackControl(component, value)
{
	synthWTLeftA_gainAHDSR.setAttribute(synthWTLeftA_gainAHDSR.Attack, value);
	synthWTRightA_gainAHDSR.setAttribute(synthWTRightA_gainAHDSR.Attack, value);
	
	synthWTLeftB_gainAHDSR.setAttribute(synthWTLeftB_gainAHDSR.Attack, value);
	synthWTRightB_gainAHDSR.setAttribute(synthWTRightB_gainAHDSR.Attack, value);
}

// AHDSR Decay
inline function onknbPartialDecayControl(component, value)
{
	synthWTLeftA_gainAHDSR.setAttribute(synthWTLeftA_gainAHDSR.Decay, value);
	synthWTRightA_gainAHDSR.setAttribute(synthWTRightA_gainAHDSR.Decay, value);
	
	synthWTLeftB_gainAHDSR.setAttribute(synthWTLeftB_gainAHDSR.Decay, value);
	synthWTRightB_gainAHDSR.setAttribute(synthWTRightB_gainAHDSR.Decay, value);
}

// AHDSR Sustain
inline function onknbPartialSustainControl(component, value)
{
	synthWTLeftA_gainAHDSR.setAttribute(synthWTLeftA_gainAHDSR.Sustain, value);
	synthWTRightA_gainAHDSR.setAttribute(synthWTRightA_gainAHDSR.Sustain, value);
	
	synthWTLeftB_gainAHDSR.setAttribute(synthWTLeftB_gainAHDSR.Sustain, value);
	synthWTRightB_gainAHDSR.setAttribute(synthWTRightB_gainAHDSR.Sustain, value);
}

// AHDSR Release
inline function onknbPartialReleaseControl(component, value)
{
	synthWTLeftA_gainAHDSR.setAttribute(synthWTLeftA_gainAHDSR.Release, value);
	synthWTRightA_gainAHDSR.setAttribute(synthWTRightA_gainAHDSR.Release, value);
	
	synthWTLeftB_gainAHDSR.setAttribute(synthWTLeftB_gainAHDSR.Release, value);
	synthWTRightB_gainAHDSR.setAttribute(synthWTRightB_gainAHDSR.Release, value);
}

// Create UI Elements

const lblModes = createLabel("lblModes", -10, -6, 128, 64, 24, "Modes_", "pnlBody", Colours.grey, "centred");
const lblPartialADSR = createLabel("lblPartialADSR", -30, 402 , 128, 32, 20, "Env", "pnlBody", Colours.grey, "centred");

const lblPartialGain = createLabel("lblPartialGain", 240, 0, 128, 64, 14, "VOL", "pnlBody", Colours.grey, "right");
const knbPartialGain = createKnob("knbPartialGain", lblPartialGain.get("x") + 140, lblPartialGain.get("y") + 25, 100, 16, "Partial Gain", true, onknbPartialGainControl, 0, 1, 0.01, .75, "pnlBody", true);

knbPartialGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);

const knbPartialAttack = createKnob("knbPartialAttack", 75, lblPartialADSR.get("y") + 30, 48, 48, "P Attack", true, onknbPartialAttackControl, 5, 1000, 1.0, 5, "pnlBody", true);
const knbPartialDecay = createKnob("knbPartialDecay", knbPartialAttack.get("x") + 100, lblPartialADSR.get("y") + 30, 48, 48, "P Decay", true, onknbPartialDecayControl, 500, 20000, 1.0, 15000, "pnlBody", true);
const knbPartialSustain = createKnob("knbPartialSustain", knbPartialAttack.get("x") + 200, lblPartialADSR.get("y") + 30, 48, 48, "P Sustain", true, onknbPartialSustainControl, -100, 0, 1.0, -100, "pnlBody", true);
const knbPartialRelease = createKnob("knbPartialRelease", knbPartialAttack.get("x") + 300, lblPartialADSR.get("y") + 30, 48, 48, "P Release", true, onknbPartialReleaseControl, 5, 15000, 1.0, 200, "pnlBody", true);

const lblPartialAttack = createLabel("lblPartialAttack", knbPartialAttack.get("x") - 39, knbPartialAttack.get("y") + 50, 128, 32, 16, "Attack", "pnlBody", Colours.grey, "centred");
const lblPartialDecay = createLabel("lblPartialDecay", knbPartialDecay.get("x") - 40, knbPartialDecay.get("y") + 50, 128, 32, 16, "Decay", "pnlBody", Colours.grey, "centred");
const lblPartialSustain = createLabel("lblPartialSustain", knbPartialSustain.get("x") - 40, knbPartialSustain.get("y") + 50, 128, 32, 16, "Sustain", "pnlBody", Colours.grey, "centred");
const lblPartialRelease = createLabel("lblPartialRelease", knbPartialRelease.get("x") - 38, knbPartialRelease.get("y") + 50, 128, 32, 16, "Release", "pnlBody", Colours.grey, "centred");

/* Residue */

// Residue Gain
inline function onknbResidueGainControl(component, value)
{
	samplerResidueLeft.setAttribute(samplerResidueLeft.Gain, value);	
	samplerResidueRight.setAttribute(samplerResidueRight.Gain, value);	
	samplerReleaseLeft.setAttribute(samplerReleaseLeft.Gain, value);
	samplerReleaseRight.setAttribute(samplerReleaseRight.Gain, value);
}

// AHDSR Attack
inline function onknbResidueAttackControl(component, value)
{
	samplerResidueLeft_gainAHDSR.setAttribute(samplerResidueLeft_gainAHDSR.Attack, value);
	samplerResidueRight_gainAHDSR.setAttribute(samplerResidueRight_gainAHDSR.Attack, value);
}

// AHDSR Decay
inline function onknbResidueDecayControl(component, value)
{
	samplerResidueLeft_gainAHDSR.setAttribute(samplerResidueLeft_gainAHDSR.Decay, value);
	samplerResidueRight_gainAHDSR.setAttribute(samplerResidueRight_gainAHDSR.Decay, value);
}

// AHDSR Sustain
inline function onknbResidueSustainControl(component, value)
{		
	samplerResidueLeft_gainAHDSR.setAttribute(samplerResidueLeft_gainAHDSR.Sustain, value);
	samplerResidueRight_gainAHDSR.setAttribute(samplerResidueRight_gainAHDSR.Sustain, value);
}

// AHDSR Release
inline function onknbResidueReleaseControl(component, value)
{
	samplerResidueLeft_gainAHDSR.setAttribute(samplerResidueLeft_gainAHDSR.Release, value);
	samplerResidueRight_gainAHDSR.setAttribute(samplerResidueRight_gainAHDSR.Release, value);
}

// Create UI Elements

const lblResidue = createLabel("lblResidue", 483, -6, 128, 64, 24, "Residue_", "pnlBody", Colours.grey, "centred");
const lblResidueGain = createLabel("lblResidueGain", 740, 0, 128, 64, 14, "VOL", "pnlBody", Colours.grey, "right");
const knbResidueGain = createKnob("knbResidueGain", lblResidueGain.get("x") + 140, lblResidueGain.get("y") + 25, 100, 16, "Residue Gain", true, onknbResidueGainControl, 0, 1, 0.01, .75, "pnlBody", true);

knbResidueGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);

const lblResidueADSR = createLabel("lblResidueADSR", 467, lblPartialADSR.get("y"), 128, 32, 20, "Env", "pnlBody", Colours.grey, "centred");

const knbResidueAttack = createKnob("knbResidueAttack", lblResidueADSR.get("x") + 106, lblResidueADSR.get("y") + 30, 48, 48, "R Attack", true, onknbResidueAttackControl, 5, 1000, 1.0, 5, "pnlBody", true);
const knbResidueDecay = createKnob("knbResidueDecay", knbResidueAttack.get("x") + 100, lblResidueADSR.get("y") + 30, 48, 48, "R Decay", true, onknbResidueDecayControl, 500, 20000, 1.0, 15000, "pnlBody", true);
const knbResidueSustain = createKnob("knbResidueSustain", knbResidueAttack.get("x") + 200, lblResidueADSR.get("y") + 30, 48, 48, "R Sustain", true, onknbResidueSustainControl, -100, 0, 1.0, -100, "pnlBody", true);
const knbResidueRelease = createKnob("knbResidueRelease", knbResidueAttack.get("x") + 300, lblResidueADSR.get("y") + 30, 48, 48, "R Release", true, onknbResidueReleaseControl, 5, 15000, 1.0, 200, "pnlBody", true);

const lblResidueAttack = createLabel("lblResidueAttack", knbResidueAttack.get("x") - 39, knbResidueAttack.get("y") + 50, 128, 32, 16, "Attack", "pnlBody", Colours.grey, "centred");
const lblResidueDecay = createLabel("lblResidueDecay", knbResidueDecay.get("x") - 40, knbResidueDecay.get("y") + 50, 128, 32, 16, "Decay", "pnlBody", Colours.grey, "centred");
const lblResidueSustain = createLabel("lblResidueSustain", knbResidueSustain.get("x") - 40, knbResidueSustain.get("y") + 50, 128, 32, 16, "Sustain", "pnlBody", Colours.grey, "centred");
const lblResidueRelease = createLabel("lblResidueRelease", knbResidueRelease.get("x") - 38, knbResidueRelease.get("y") + 50, 128, 32, 16, "Release", "pnlBody", Colours.grey, "centred");

/* Advanced Panel */


// Open Advanced Panel

inline function onbtnShowAdvancedPanelControl(component, value)
{
	pnlAdvanced.set("visible", value);
}

//Modulator.setIntensity(value)
//Changes the Intensity of the Modulator. Ranges: Gain Mode 0 ... 1, PitchMode -12 ... 12.



// Amp Velocity
inline function onknbAmpVelocityControl(component, value) 
{
	synthWTLeftA_gainVelocity.setIntensity(value * .1);
	synthWTRightA_gainVelocity.setIntensity(value * .1);
	
	synthWTLeftB_gainVelocity.setIntensity(value * .1);
	synthWTRightB_gainVelocity.setIntensity(value * .1);
}


// Amp LFO
inline function onknbAmpLFOControl(component, value)
{
	synthWTLeftA_gainLFO.setIntensity(value * .1);
	synthWTRightA_gainLFO.setIntensity(value * .1);
	
	synthWTLeftB_gainLFO.setIntensity(value * .1);
	synthWTRightB_gainLFO.setIntensity(value * .1);
}

// Amp Random
inline function onknbAmpRandomControl(component, value)
{
	synthWTLeftA_gainRandom.setIntensity(value * .1);
	synthWTRightA_gainRandom.setIntensity(value * .1);
	
	synthWTLeftB_gainRandom.setIntensity(value * .1);
	synthWTRightB_gainRandom.setIntensity(value * .1);
}

// Pitch Velocity
inline function onknbPitchVelocityControl(component, value)
{
	synthWTLeftA_pitchAHDSR.setIntensity(value * .6);
	synthWTRightA_pitchAHDSR.setIntensity(value * .6);
	
	synthWTLeftB_pitchAHDSR.setIntensity(value * .6);
	synthWTRightB_pitchAHDSR.setIntensity(value * .6);
}

// Pitch Decay
inline function onknbPitchDecayControl(component, value)
{
	synthWTLeftA_pitchAHDSR.setAttribute(synthWTLeftA_pitchAHDSR.Decay, value);
	synthWTRightA_pitchAHDSR.setAttribute(synthWTLeftA_pitchAHDSR.Decay, value);
	
	synthWTLeftB_pitchAHDSR.setAttribute(synthWTLeftB_pitchAHDSR.Decay, value);
	synthWTRightB_pitchAHDSR.setAttribute(synthWTLeftB_pitchAHDSR.Decay, value);
}

// Pitch Random
inline function onknbPitchRandomControl(component, value)
{
	synthWTLeftA_pitchRandom.setIntensity(value * .5);
	synthWTRightA_pitchRandom.setIntensity(value * .5);
	
	synthWTLeftB_pitchRandom.setIntensity(value * .5);
	synthWTRightB_pitchRandom.setIntensity(value * .5);
}

// Pitch LFO 
inline function onknbPitchLFOControl(component, value)
{
	synthWTLeftA_pitchLFO.setIntensity(value * .2);
	synthWTRightA_pitchLFO.setIntensity(value * .2);
	
	synthWTLeftB_pitchLFO.setIntensity(value * .2);
	synthWTRightB_pitchLFO.setIntensity(value * .2);
}

// Tone Dampen
inline function onknbToneDampenControl(component, value)
{	
		// Low Pass Frequency
		local min = 2000;
		local max = 10000;
		
		local f = Math.round(max - (value * (max-min)));
			
		synthWTLeftA_fxDampen.setAttribute(synthWTLeftA_fxDampen.Frequency, f);		
		synthWTRightA_fxDampen.setAttribute(synthWTRightA_fxDampen.Frequency, f);		
		synthWTLeftB_fxDampen.setAttribute(synthWTLeftB_fxDampen.Frequency, f);		
		synthWTRightB_fxDampen.setAttribute(synthWTRightB_fxDampen.Frequency, f);		
}

// Tone Decay 
inline function onknbToneClampControl(component, value)
{
	local min = 200;
	local max = 2000;
	
	local d = Math.round(max - (value * (max-min)));
	
	synthWTLeftA_fxDampenAHDSR.setAttribute(synthWTLeftA_fxDampenAHDSR.Decay, d);
	synthWTRightA_fxDampenAHDSR.setAttribute(synthWTRightA_fxDampenAHDSR.Decay, d);
	synthWTLeftB_fxDampenAHDSR.setAttribute(synthWTLeftB_fxDampenAHDSR.Decay, d);
	synthWTRightB_fxDampenAHDSR.setAttribute(synthWTRightB_fxDampenAHDSR.Decay, d);
}

// Chorus
inline function onknbToneChorusControl(component, value)
{
	if (value == 0)
	{
		synthWTLeftA_chorusJ.setBypassed(1);
		synthWTRightA_chorusJ.setBypassed(1);
		synthWTLeftB_chorusJ.setBypassed(1);
		synthWTRightB_chorusJ.setBypassed(1);
	}
	else
	{
		synthWTLeftA_chorusJ.setBypassed(0);
		synthWTRightA_chorusJ.setBypassed(0);
		synthWTLeftB_chorusJ.setBypassed(0);
		synthWTRightB_chorusJ.setBypassed(0);
	}

	synthWTLeftA_chorusJ.setAttribute(synthWTLeftA_chorusJ.Depth, value * 0.25);
	synthWTRightA_chorusJ.setAttribute(synthWTRightA_chorusJ.Depth, value * 0.25);
	synthWTLeftB_chorusJ.setAttribute(synthWTLeftB_chorusJ.Depth, value * 0.25);
	synthWTRightB_chorusJ.setAttribute(synthWTRightB_chorusJ.Depth, value * 0.25);	
}

// Tone Stiffness Intensity
inline function onknbToneBrightnessControl(component, value)
{	
	local lpf = 1;
	local highshelf = 3;
	
	// Low Pass Frequency
	local idx = (lpf * synthWTLeftA_toneAdjust.BandOffset) + 1; // Low Pass Frequency
	local min = 7000;
	local max = 10000;
	
	local f = Math.round(min + (value * (max-min)));	
		
	synthWTLeftA_toneAdjust.setAttribute(idx, f);
	synthWTRightA_toneAdjust.setAttribute(idx, f);
	synthWTLeftB_toneAdjust.setAttribute(idx, f);
	synthWTRightB_toneAdjust.setAttribute(idx, f);
	
	// High Shelf Gain
	idx = (highshelf * synthWTLeftA_toneAdjust.BandOffset) + 0;
	
	synthWTLeftA_toneAdjust.setAttribute(idx, value * 6);
	synthWTRightA_toneAdjust.setAttribute(idx, value * 6);
	synthWTLeftB_toneAdjust.setAttribute(idx, value * 6);
	synthWTRightB_toneAdjust.setAttribute(idx, value * 6);
}

// Instantiate UI Elements

const btnShowAdvancedPanel = createButton("btnShowAdvancedPanel", 471, 200, 24, 100, "open", false, onbtnShowAdvancedPanelControl, false, true, "pnlBody");
const pnlAdvanced = createChildPanel("pnlAdvanced", 498, 16, 480, 498, "pnlBody");
const lblAdvanced = createLabel("lblAdvanced", -8, -2, 128, 64, 24, "Advanced_", "pnlAdvanced", Colours.grey, "centredTop");

pnlAdvanced.set("visible", false);
btnShowAdvancedPanel.setValue(0);

const lblTone = createLabel("lblTone", -31, 386, 128, 32, 20, "Tone", "pnlAdvanced", Colours.grey, "centred");
const lblPitch = createLabel("lblPitch", -31, lblTone.get("y") - 150, 128, 32, 20, "Pitch", "pnlAdvanced", Colours.grey, "centred");
const lblAmp = createLabel("lblAmp", -31, lblPitch.get("y") - 150, 128, 32, 20, "Amp", "pnlAdvanced", Colours.grey, "centred");

const knbAmpVelocity = createKnob("knbAmpVelocity", lblAmp.get("x") + 106, lblAmp.get("y") + 30, 48, 48, "Amp Vel", true, onknbAmpVelocityControl, 0, 1.0, 0.01, 0.5, "pnlAdvanced", true);
const knbAmpLFO = createKnob("knbAmpLFO", knbAmpVelocity.get("x") + 100, lblAmp.get("y") + 30, 48, 48, "Amp LFO", true, onknbAmpLFOControl, 0, 1.0, 0.01, 0.5, "pnlAdvanced", true);
const knbAmpRandom = createKnob("knbAmpRandom", knbAmpLFO.get("x") + 100, lblAmp.get("y") + 30, 48, 48, "Amp Rand", true, onknbAmpRandomControl, 0, 1.0, 0.01, 0.5, "pnlAdvanced", true);

const knbPitchVelocity = createKnob("knbPitchVelocity", lblPitch.get("x") + 106, lblPitch.get("y") + 30, 48, 48, "Pitch Vel", true, onknbPitchVelocityControl, 0, 1.0, 0.01, 0.5, "pnlAdvanced", true);
const knbPitchDecay = createKnob("knbPitchDecay", knbPitchVelocity.get("x") + 100, lblPitch.get("y") + 30, 48, 48, "Pitch Dec", true, onknbPitchDecayControl, 20, 4000, 1.0, 1000, "pnlAdvanced", true);
const knbPitchLFO = createKnob("knbPitchLFO", knbPitchDecay.get("x") + 100, lblPitch.get("y") + 30, 48, 48, "Pitch LFO", true, onknbPitchLFOControl, 0, 1.0, 0.01, 0.5, "pnlAdvanced", true);
const knbPitchRandom = createKnob("knbPitchRandom", knbPitchLFO.get("x") + 100, lblPitch.get("y") + 30, 48, 48, "Pitch Rand", true, onknbPitchRandomControl, 0, 1.0, 0.01, 0.5, "pnlAdvanced", true);

const knbToneDampen = createKnob("knbToneDampen", lblTone.get("x") + 106, lblTone.get("y") + 30, 48, 48, "Tone Damp", true, onknbToneDampenControl, 0, 1, 0.01, 1, "pnlAdvanced", true);
const knbToneClamp = createKnob("knbToneClamp", knbToneDampen.get("x") + 100, lblTone.get("y") + 30, 48, 48, "Tone Clamp", true, onknbToneClampControl, 0, 1.0, 0.01, 0.5, "pnlAdvanced", true);
const knbToneChorus = createKnob("knbToneChorus", knbToneClamp.get("x") + 100, lblTone.get("y") + 30, 48, 48, "Tone Chorus", true, onknbToneChorusControl, 0, 1.0, 0.01, 0.5, "pnlAdvanced", true);
const knbToneBrightness = createKnob("knbToneBrightness", knbToneChorus.get("x") + 100, lblTone.get("y") + 30, 48, 48, "Tone Bright", true, onknbToneBrightnessControl, 0, 1.0, 0.01, 0.5, "pnlAdvanced", true);

const lblAmpVelocity = createLabel("lblAmpVelocity", knbAmpVelocity.get("x") - 39, knbAmpVelocity.get("y") + 50, 128, 32, 16, "Vel", "pnlAdvanced", Colours.grey, "centred");
const lblAmpLFO = createLabel("lblAmpLFO", knbAmpLFO.get("x") - 39, knbAmpLFO.get("y") + 50, 128, 32, 16, "Drift", "pnlAdvanced", Colours.grey, "centred");
const lblAmpRandom = createLabel("lblAmpRandom", knbAmpRandom.get("x") - 39, knbAmpRandom.get("y") + 50, 128, 32, 16, "Random", "pnlAdvanced", Colours.grey, "centred");

const lblPitchVelocity = createLabel("lblPitchVelocity", knbPitchVelocity.get("x") - 39, knbPitchVelocity.get("y") + 50, 128, 32, 16, "Vel", "pnlAdvanced", Colours.grey, "centred");
const lblPitchDecay = createLabel("lblPitchDecay", knbPitchDecay.get("x") - 39, knbPitchDecay.get("y") + 50, 128, 32, 16, "Decay", "pnlAdvanced", Colours.grey, "centred");
const lblPitchRandom = createLabel("lblPitchRandom", knbPitchRandom.get("x") - 39, knbPitchRandom.get("y") + 50, 128, 32, 16, "Random", "pnlAdvanced", Colours.grey, "centred");
const lblPitchLFO = createLabel("lblPitchLFO", knbPitchLFO.get("x") - 39, knbPitchLFO.get("y") + 50, 128, 32, 16, "Drift", "pnlAdvanced", Colours.grey, "centred");

const lblToneDampen = createLabel("lblToneDampen", knbToneDampen.get("x") - 39, knbToneDampen.get("y") + 50, 128, 32, 16, "Dampen", "pnlAdvanced", Colours.grey, "centred");
const lblToneClamp = createLabel("lblToneClamp", knbToneClamp.get("x") - 39, knbToneClamp.get("y") + 50, 128, 32, 16, "Clamp", "pnlAdvanced", Colours.grey, "centred");
const lblToneChorus = createLabel("lblToneChorus", knbToneChorus.get("x") - 39, knbToneChorus.get("y") + 50, 128, 32, 16, "Chorus", "pnlAdvanced", Colours.grey, "centred");
const lblToneBrightness = createLabel("lblToneBrightness", knbToneBrightness.get("x") - 39, knbToneBrightness.get("y") + 50, 128, 32, 16, "Brightness", "pnlAdvanced", Colours.grey, "centred");
	
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

const pnlInfoPopup = createChildPanel("pnlInfoPopup", 10, 10, 485, 510, "pnlBody");
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
	g.fillAll(pnlBodyColour);
	g.setFont("bold", 24);
    
    g.setColour(0xFFE2E3F3);
    g.drawAlignedText("Memory Journal", [0, 0, this.getWidth(), this.getHeight()], "centredTop");
    
    var baseVerticalOffset = 180;
    var verticalOffset = 24;
    
    g.setFont("bold", 16);
    
    g.setColour(Colours.grey);
    
    g.drawAlignedText("Welcome to", [0, 40, this.getWidth(), this.getHeight()], "topLeft");
    g.setColour(0xFFE2E3F3);
    g.drawAlignedText("NEATBrain.", [70, 40, this.getWidth(), this.getHeight()], "topLeft");
    g.setColour(Colours.grey);
    g.drawAlignedText("Select a Partial and Residue Profile from the main window, then tweak and sculpt your ", [0, 75, this.getWidth(), this.getHeight()], "topLeft");
    g.drawAlignedText("sound with the Advanced controls.", [0, 95, this.getWidth(), this.getHeight()], "topLeft");
    g.drawAlignedText("Advanced controls are separated by function (Amplitude, Pitch & Tone)", [0, 125, this.getWidth(), this.getHeight()], "topLeft");

	g.setColour(0xFFE2E3F3);
    for (i=0; i<jsonInfoSubtitles.length; i++)
    {
    	g.drawAlignedText(jsonInfoSubtitles[i] + ":", [-410, baseVerticalOffset + verticalOffset * i, this.getWidth(), this.getHeight()], "topRight");
    }

    g.setColour(Colours.grey);

    for (i=0; i<jsonInfoPopup.length; i++)
    {
	    g.drawAlignedText(jsonInfoPopup[i], [90, baseVerticalOffset + verticalOffset * i, this.getWidth(), this.getHeight()], "topLeft");
    }    
});


	
/* Info Mouseover Panel */

const pnlShowInfoPopup = createChildPanel("pnlShowInfoPopup", 436, 0, 16, 16, "pnlAdvanced");

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

pnlAdvanced.setPaintRoutine(function(g)
{
	g.fillAll(pnlBodyColour);
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

for (i = 24; i < 90; i++)
   	Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.2));

for (i=90; i<100; i++)   	
	Engine.setKeyColour(i, Colours.withAlpha(Colours.blue, 0.2));

