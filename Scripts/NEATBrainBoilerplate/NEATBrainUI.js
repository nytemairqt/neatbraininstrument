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

include("NEATBrainBoilerplate/NEATBrainLookAndFeel.js");
include("NEATBrainBoilerplate/NEATBrainModules.js");
include("NEATBrainBoilerplate/NEATBrainUIConstructors.js");

const PARTIAL_PROFILES = ["A", "B", "C"];


/* Partials */


// Partial Gain
inline function onknbPartialGainControl(component, value)
{
	leftWG.setAttribute(leftWG.Gain, value);
	rightWG.setAttribute(rightWG.Gain, value);
}		

// AHDSR Attack
inline function onknbPartialAttackControl(component, value)
{
	leftWG_gainAHDSR.setAttribute(leftWG_gainAHDSR.Attack, value);
	rightWG_gainAHDSR.setAttribute(rightWG_gainAHDSR.Attack, value);
}

// AHDSR Decay
inline function onknbPartialDecayControl(component, value)
{
	leftWG_gainAHDSR.setAttribute(leftWG_gainAHDSR.Decay, value);
	rightWG_gainAHDSR.setAttribute(rightWG_gainAHDSR.Decay, value);
}

// AHDSR Sustain
inline function onknbPartialSustainControl(component, value)
{
	leftWG_gainAHDSR.setAttribute(leftWG_gainAHDSR.Sustain, value);
	rightWG_gainAHDSR.setAttribute(rightWG_gainAHDSR.Sustain, value);
}

// AHDSR Release
inline function onknbPartialReleaseControl(component, value)
{
	leftWG_gainAHDSR.setAttribute(leftWG_gainAHDSR.Release, value);
	rightWG_gainAHDSR.setAttribute(rightWG_gainAHDSR.Release, value);
}

// Hidden Combo Box
inline function oncmbPartialProfileControl(component, value)
{	
	leftWG_fxProfileA.setBypassed(1);
	leftWG_fxProfileB.setBypassed(1);
	leftWG_fxProfileC.setBypassed(1);
	
	rightWG_fxProfileA.setBypassed(1);
	rightWG_fxProfileB.setBypassed(1);
	rightWG_fxProfileC.setBypassed(1);

	switch(value)
	{
		case 1:
			leftWG_fxProfileA.setBypassed(0);
			rightWG_fxProfileA.setBypassed(0);
			break;
		case 2:
			leftWG_fxProfileB.setBypassed(0);
			rightWG_fxProfileB.setBypassed(0);
			break;
		case 3:
			leftWG_fxProfileC.setBypassed(0);
			rightWG_fxProfileC.setBypassed(0);
		break;
	}

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

// Show Custom Curve

inline function onbtnShowWGProfileCustomControl(component, value)
{
	pnlWGProfileCustom.set("visible", value);
	local state = leftWG_fxProfileCustom.exportState();
	rightWG_fxProfileCustom.restoreState(state);
}

// Connect Custom Profile

const wgProfileWatcher = Engine.createBroadcaster({"component" : "fltWGProfileCustom", "event" : "All Callbacks"});

wgProfileWatcher.attachToEqEvents("leftWG_fxProfileCustom", ["BandAdded", "BandRemoved", "BandSelected"], {"id" : wgProfileWatcher});
wgProfileWatcher.attachToComponentMouseEvents("fltWGProfileCustom", "All Callbacks", {"id" : "wgProfileWatcher"});

wgProfileWatcher.addListener("", "update something", function(component, value)
{
	var state = leftWG_fxProfileCustom.exportState();
	rightWG_fxProfileCustom.restoreState(state);
});


// Create UI Elements

const lblModes = createLabel("lblModes", -6, -6, 128, 64, 20, "medium", "WAVEGUIDE", "pnlBody", Colours.grey, "centred");
const lblPartialADSR = createLabel("lblPartialADSR", -30, 402 , 128, 32, 20, "regular", "Env", "pnlBody", Colours.grey, "centred");

const lblPartialGain = createLabel("lblPartialGain", 240, 0, 128, 64, 16, "regular", "VOL", "pnlBody", Colours.grey, "right");
const knbPartialGain = createKnob("knbPartialGain", lblPartialGain.get("x") + 140, lblPartialGain.get("y") + 25, 100, 16, "PartialGain", true, onknbPartialGainControl, 0, 1, 0.01, .75, "pnlBody", true);

const btnShowWGProfileCustom = createButton("btnShowWGProfileCustom", 110, 18, 18, 18, "open", false, onbtnShowWGProfileCustomControl, false, true, "pnlBody");
const pnlWGProfileCustom = createChildPanel("pnlWGProfileCustom", 10, 50, 460, 354, "pnlBody");
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

knbPartialGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);
btnShowWGProfileCustom.setLocalLookAndFeel(LAFButtonCustomProfile);
btnShowWGProfileCustom.set("enableMidiLearn", false);
btnPartialProfilePrev.set("enableMidiLearn", false);
btnPartialProfileNext.set("enableMidiLearn", false);

/* Residue */

// Residue Gain
inline function onknbResidueGainControl(component, value)
{
	leftRS.setAttribute(leftRS.Gain, value);
	rightRS.setAttribute(rightRS.Gain, value);
	
	leftRLS.setAttribute(leftRLS.Gain, value);
	rightRLS.setAttribute(rightRLS.Gain, value);
}

// AHDSR Attack
inline function onknbResidueAttackControl(component, value)
{
	leftRS_gainAHDSR.setAttribute(leftRS_gainAHDSR.Attack, value);
	rightRS_gainAHDSR.setAttribute(rightRS_gainAHDSR.Attack, value);
}

// AHDSR Decay
inline function onknbResidueDecayControl(component, value)
{
	leftRS_gainAHDSR.setAttribute(leftRS_gainAHDSR.Decay, value);
	rightRS_gainAHDSR.setAttribute(rightRS_gainAHDSR.Decay, value);
}

// AHDSR Sustain
inline function onknbResidueSustainControl(component, value)
{		
	leftRS_gainAHDSR.setAttribute(leftRS_gainAHDSR.Sustain, value);
	rightRS_gainAHDSR.setAttribute(rightRS_gainAHDSR.Sustain, value);	
}

// AHDSR Release
inline function onknbResidueReleaseControl(component, value)
{
	leftRS_gainAHDSR.setAttribute(leftRS_gainAHDSR.Release, value);
	rightRS_gainAHDSR.setAttribute(rightRS_gainAHDSR.Release, value);
}

// Hidden Combo Box
inline function oncmbResidueProfileControl(component, value)
{
	// replace with proper logic 

	pnlProfileResidue.repaintImmediately();
	
	leftRS_fxProfileA.setBypassed(1);
	leftRS_fxProfileB.setBypassed(1);
	leftRS_fxProfileC.setBypassed(1);
	
	rightRS_fxProfileA.setBypassed(1);
	rightRS_fxProfileB.setBypassed(1);
	rightRS_fxProfileC.setBypassed(1);
	
	switch (value)
	{
		case 1:
			leftRS_fxProfileA.setBypassed(0);
			rightRS_fxProfileA.setBypassed(0);
			break;
		case 2:
			leftRS_fxProfileB.setBypassed(0);
			rightRS_fxProfileB.setBypassed(0);
			break;
		case 3:
			leftRS_fxProfileC.setBypassed(0);
			rightRS_fxProfileC.setBypassed(0);
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

// Show Custom Curve

inline function onbtnShowRSProfileCustomControl(component, value)
{
	pnlRSProfileCustom.set("visible", value);
	local state = leftRS_fxProfileCustom.exportState();
	rightRS_fxProfileCustom.restoreState(state);	
}

// Connect Custom Profile
const rsProfileWatcher = Engine.createBroadcaster({"component" : "fltRSProfileCustom", "event" : "All Callbacks"});

rsProfileWatcher.attachToEqEvents("leftRS_fxProfileCustom", ["BandAdded", "BandRemoved", "BandSelected"], {"id" : rsProfileWatcher});
rsProfileWatcher.attachToComponentMouseEvents("fltRSProfileCustom", "All Callbacks", {"id" : "rsProfileWatcher"});
rsProfileWatcher.addListener("", "update something", function(component, value)
{
	var state = leftRS_fxProfileCustom.exportState();
	rightRS_fxProfileCustom.restoreState(state);
});

// Create UI Elements

const lblResidue = createLabel("lblResidue", 478, -6, 128, 64, 20, "medium", "RESIDUE", "pnlBody", Colours.grey, "centred");
const lblResidueGain = createLabel("lblResidueGain", 740, 0, 128, 64, 16, "regular", "VOL", "pnlBody", Colours.grey, "right");
const knbResidueGain = createKnob("knbResidueGain", lblResidueGain.get("x") + 140, lblResidueGain.get("y") + 25, 100, 16, "Residue_Gain", true, onknbResidueGainControl, 0, 1, 0.01, .75, "pnlBody", true);



const cmbResidueProfile = createComboBox("cmbResidueProfile", 0, 0, 10, 10, "profile", true, oncmbResidueProfileControl, PARTIAL_PROFILES, false, "pnlBody");
const btnResidueProfilePrev = createButton("btnResidueProfilePrev", 500 + btnPartialProfilePrev.get("x"), 205, 30, 30, "Prev", false, onbtnResiduePrevControl, true, true, "pnlBody");
const btnResidueProfileNext = createButton("btnResidueProfileNext", btnResidueProfilePrev.get("x") + 320, 205, 30, 30, "Prev", false, onbtnResidueNextControl, true, true, "pnlBody");
const btnShowRSProfileCustom = createButton("btnShowRSProfileCustom", 584, 18, 18, 18, "open", false, onbtnShowRSProfileCustomControl, false, true, "pnlBody");
const pnlRSProfileCustom = createChildPanel("pnlRSProfileCustom", 512, 50, 460, 354, "pnlBody");

//10, 50, 460, 354

const lblResidueADSR = createLabel("lblResidueADSR", 467, lblPartialADSR.get("y"), 128, 32, 20, "regular", "Env", "pnlBody", Colours.grey, "centred");

const knbResidueAttack = createKnob("knbResidueAttack", lblResidueADSR.get("x") + 120, lblResidueADSR.get("y") + 30, 48, 48, "R_Attack", true, onknbResidueAttackControl, 5, 1000, 1.0, 5, "pnlBody", true);
const knbResidueDecay = createKnob("knbResidueDecay", knbResidueAttack.get("x") + 100, lblResidueADSR.get("y") + 30, 48, 48, "R_Decay", true, onknbResidueDecayControl, 500, 20000, 1.0, 15000, "pnlBody", true);
const knbResidueSustain = createKnob("knbResidueSustain", knbResidueAttack.get("x") + 200, lblResidueADSR.get("y") + 30, 48, 48, "R_Sustain", true, onknbResidueSustainControl, -100, 0, 1.0, -100, "pnlBody", true);
const knbResidueRelease = createKnob("knbResidueRelease", knbResidueAttack.get("x") + 300, lblResidueADSR.get("y") + 30, 48, 48, "R_Release", true, onknbResidueReleaseControl, 5, 15000, 1.0, 200, "pnlBody", true);

const lblResidueAttack = createLabel("lblResidueAttack", knbResidueAttack.get("x") - 39, knbResidueAttack.get("y") + 50, 128, 32, 16, "regular", "Attack", "pnlBody", Colours.grey, "centred");
const lblResidueDecay = createLabel("lblResidueDecay", knbResidueDecay.get("x") - 40, knbResidueDecay.get("y") + 50, 128, 32, 16, "regular", "Decay", "pnlBody", Colours.grey, "centred");
const lblResidueSustain = createLabel("lblResidueSustain", knbResidueSustain.get("x") - 40, knbResidueSustain.get("y") + 50, 128, 32, 16, "regular", "Sustain", "pnlBody", Colours.grey, "centred");
const lblResidueRelease = createLabel("lblResidueRelease", knbResidueRelease.get("x") - 38, knbResidueRelease.get("y") + 50, 128, 32, 16, "regular", "Release", "pnlBody", Colours.grey, "centred");

knbResidueGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);
btnShowRSProfileCustom.setLocalLookAndFeel(LAFButtonCustomProfile);
btnShowRSProfileCustom.set("enableMidiLearn", false); // UNCOMMENT ME WHEN IMPLEMENTED
btnResidueProfilePrev.set("enableMidiLearn", false);
btnResidueProfileNext.set("enableMidiLearn", false);

/* Advanced Panel */


// Open Advanced Panel

inline function onbtnShowAdvancedPanelControl(component, value)
{
	pnlAdvanced.set("visible", value);
}

// Amp Velocity
inline function onknbAmpVelocityControl(component, value) 
{
	leftRS_gainVelocity.setIntensity(value * .1);
	leftWG_gainVelocity.setIntensity(value * .1);
	rightRS_gainVelocity.setIntensity(value * .1);
	rightWG_gainVelocity.setIntensity(value * .1);
}


// Amp LFO
inline function onknbAmpLFOControl(component, value)
{	
	leftRS_gainLFO.setIntensity(value * .1);
	leftWG_gainLFO.setIntensity(value * .1);
	rightRS_gainLFO.setIntensity(value * .1);
	rightWG_gainLFO.setIntensity(value * .1);
}

// Amp Random
inline function onknbAmpRandomControl(component, value)
{
	leftRS_gainRandom.setIntensity(value * .1);
	leftWG_gainRandom.setIntensity(value * .1);
	rightRS_gainRandom.setIntensity(value * .1);
	rightWG_gainRandom.setIntensity(value * .1);
}

// Pitch Velocity
inline function onknbPitchVelocityControl(component, value)
{
	leftWG_pitchAHDSR.setIntensity(value * .6);
	rightWG_pitchAHDSR.setIntensity(value * .6);
}

// Pitch Decay
inline function onknbPitchDecayControl(component, value)
{
	leftWG_pitchAHDSR.setAttribute(leftWG_pitchAHDSR.Decay, value);
	rightWG_pitchAHDSR.setAttribute(rightWG_pitchAHDSR.Decay, value);
}

// Pitch Random
inline function onknbPitchRandomControl(component, value)
{
	leftWG_pitchRandom.setIntensity(value * .5);
	rightWG_pitchRandom.setIntensity(value * .5);
}

// Pitch LFO 
inline function onknbPitchLFOControl(component, value)
{
	leftWG_pitchLFO.setIntensity(value * .2);
	rightWG_pitchLFO.setIntensity(value * .2);
}


// Tone Body
inline function onknbToneBodyControl(component, value)
{
	local idx = 0 * leftWG_fxToneControl.BandOffset + leftWG_fxToneControl.Gain;
	leftWG_fxToneControl.setAttribute(idx, 6.0 * value);
	rightWG_fxToneControl.setAttribute(idx, 6.0 * value);
}

// Tone Bite
inline function onknbToneBiteControl(component, value)
{
	local idx = 1 * leftWG_fxToneControl.BandOffset + leftWG_fxToneControl.Gain;
	leftWG_fxToneControl.setAttribute(idx, 6.0 * value);
	rightWG_fxToneControl.setAttribute(idx, 6.0 * value);
}

// Tone Shimmer
inline function onknbToneShimmerControl(component, value)
{
	local idx = 2 * leftWG_fxToneControl.BandOffset + leftWG_fxToneControl.Gain;
	leftWG_fxToneControl.setAttribute(idx, 6.0 * value);
	rightWG_fxToneControl.setAttribute(idx, 6.0 * value);
}

// Tone Dampen
inline function onknbToneDampenControl(component, value)
{	
	leftWG_fxDampen.setAttribute(leftWG_fxDampen.Dampen, value);
	rightWG_fxDampen.setAttribute(rightWG_fxDampen.Dampen, value);
}

// Instantiate UI Elements

const btnShowAdvancedPanel = createButton("btnShowAdvancedPanel", 471, 200, 24, 100, "open", false, onbtnShowAdvancedPanelControl, false, true, "pnlBody");
const pnlAdvanced = createChildPanel("pnlAdvanced", 496, 0, 500, 522, "pnlBody");
const lblAdvanced = createLabel("lblAdvanced", -11, 16, 128, 64, 20, "medium", "ADVANCED", "pnlAdvanced", Colours.grey, "centredTop");

pnlAdvanced.set("visible", false);
btnShowAdvancedPanel.setValue(0);
btnShowAdvancedPanel.set("enableMidiLearn", false);

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

const knbToneBody = createKnob("knbToneBody", lblTone.get("x") + 120, lblTone.get("y") + 30, 48, 48, "ToneBody", true, onknbToneBodyControl, -1.0, 1.0, 0.01, 0.0, "pnlAdvanced", true);
const knbToneBite = createKnob("knbToneBite", knbToneBody.get("x") + 100, lblTone.get("y") + 30, 48, 48, "ToneBite", true, onknbToneBiteControl, -1.0, 1.0, 0.01, 0.0, "pnlAdvanced", true);
const knbToneShimmer = createKnob("knbToneShimmer", knbToneBite.get("x") + 100, lblTone.get("y") + 30, 48, 48, "ToneBright", true, onknbToneShimmerControl, -1.0, 1.0, 0.01, 0.0, "pnlAdvanced", true);
const knbToneDampen = createKnob("knbToneDampen", knbToneShimmer.get("x") + 100, lblTone.get("y") + 30, 48, 48, "ToneDamp", true, onknbToneDampenControl, 0, 1, 0.01, 0.4, "pnlAdvanced", true);

const lblAmpVelocity = createLabel("lblAmpVelocity", knbAmpVelocity.get("x") - 39, knbAmpVelocity.get("y") + 50, 128, 32, 16, "regular", "Vel", "pnlAdvanced", Colours.grey, "centred");
const lblAmpLFO = createLabel("lblAmpLFO", knbAmpLFO.get("x") - 39, knbAmpLFO.get("y") + 50, 128, 32, 16, "regular", "Drift", "pnlAdvanced", Colours.grey, "centred");
const lblAmpRandom = createLabel("lblAmpRandom", knbAmpRandom.get("x") - 39, knbAmpRandom.get("y") + 50, 128, 32, 16, "regular", "Random", "pnlAdvanced", Colours.grey, "centred");

const lblPitchVelocity = createLabel("lblPitchVelocity", knbPitchVelocity.get("x") - 39, knbPitchVelocity.get("y") + 50, 128, 32, 16, "regular", "Vel", "pnlAdvanced", Colours.grey, "centred");
const lblPitchDecay = createLabel("lblPitchDecay", knbPitchDecay.get("x") - 39, knbPitchDecay.get("y") + 50, 128, 32, 16, "regular", "Decay", "pnlAdvanced", Colours.grey, "centred");
const lblPitchRandom = createLabel("lblPitchRandom", knbPitchRandom.get("x") - 39, knbPitchRandom.get("y") + 50, 128, 32, 16, "regular", "Random", "pnlAdvanced", Colours.grey, "centred");
const lblPitchLFO = createLabel("lblPitchLFO", knbPitchLFO.get("x") - 39, knbPitchLFO.get("y") + 50, 128, 32, 16, "regular", "Drift", "pnlAdvanced", Colours.grey, "centred");

const lblToneBody = createLabel("lblToneBody", knbToneBody.get("x") - 39, knbToneBody.get("y") + 50, 128, 32, 16, "regular", "Body", "pnlAdvanced", Colours.grey, "centred");
const lblToneBite = createLabel("lblToneBite", knbToneBite.get("x") - 39, knbToneBite.get("y") + 50, 128, 32, 16, "regular", "Bite", "pnlAdvanced", Colours.grey, "centred");
const lblToneShimmer = createLabel("lblToneShimmer", knbToneShimmer.get("x") - 39, knbToneShimmer.get("y") + 50, 128, 32, 16, "regular", "Shimmer", "pnlAdvanced", Colours.grey, "centred");
const lblToneDampen = createLabel("lblToneDampen", knbToneDampen.get("x") - 39, knbToneDampen.get("y") + 50, 128, 32, 16, "regular", "Dampen", "pnlAdvanced", Colours.grey, "centred");
	
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


/* Custom LAF */

// pnlWG_fxProfileCustom

pnlWGProfileCustom.setPaintRoutine(function(g)
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

// pnlRS_fxProfileCustom

pnlRSProfileCustom.setPaintRoutine(function(g)
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


// Advanced Panel
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
	
	

	
	