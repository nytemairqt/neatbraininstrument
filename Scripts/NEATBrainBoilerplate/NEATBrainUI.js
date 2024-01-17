include("NEATBRAINBoilerplate/NEATBrainLookAndFeel.js");
include("NEATBRAINBoilerplate/NEATBrainModules.js");
include("NEATBRAINBoilerplate/NEATBrainUIConstructors.js");




/* Partials */


// Partial Gain
inline function onknbPartialGainControl(component, value)
{
	synthWTLeft.setAttribute(synthWTLeft.Gain, value);
}		

// AHDSR Attack
inline function onknbPartialAttackControl(component, value)
{
	synthWTLeft_gainAHDSR.setAttribute(synthWTLeft_gainAHDSR.Attack, value);
}

// AHDSR Decay
inline function onknbPartialDecayControl(component, value)
{
	synthWTLeft_gainAHDSR.setAttribute(synthWTLeft_gainAHDSR.Decay, value);
}

// AHDSR Sustain
inline function onknbPartialSustainControl(component, value)
{
	synthWTLeft_gainAHDSR.setAttribute(synthWTLeft_gainAHDSR.Sustain, value);
}

// AHDSR Release
inline function onknbPartialReleaseControl(component, value)
{
	synthWTLeft_gainAHDSR.setAttribute(synthWTLeft_gainAHDSR.Release, value);
}

// Create UI Elements

const lblModes = createLabel("lblModes", -10, -6, 128, 64, 24, "Modes_", "pnlBody", Colours.grey, "centred");
const lblPartialADSR = createLabel("lblPartialADSR", -30, 402 , 128, 32, 20, "Env", "pnlBody", Colours.grey, "centred");

const lblPartialGain = createLabel("lblPartialGain", 240, 0, 128, 64, 14, "VOL", "pnlBody", Colours.grey, "right");
const knbPartialGain = createKnob("knbPartialGain", lblPartialGain.get("x") + 140, lblPartialGain.get("y") + 25, 100, 16, "Gain", true, onknbPartialGainControl, 0, 1, 0.01, .75, "pnlBody");

knbPartialGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);

const knbPartialAttack = createKnob("knbPartialAttack", 75, lblPartialADSR.get("y") + 30, 48, 48, "Attack", true, onknbPartialAttackControl, 5, 1000, 1.0, 5, "pnlBody");
const knbPartialDecay = createKnob("knbPartialDecay", knbPartialAttack.get("x") + 100, lblPartialADSR.get("y") + 30, 48, 48, "Decay", true, onknbPartialDecayControl, 500, 20000, 1.0, 15000, "pnlBody");
const knbPartialSustain = createKnob("knbPartialSustain", knbPartialAttack.get("x") + 200, lblPartialADSR.get("y") + 30, 48, 48, "Sustain", true, onknbPartialSustainControl, -100, 0, 1.0, -100, "pnlBody");
const knbPartialRelease = createKnob("knbPartialRelease", knbPartialAttack.get("x") + 300, lblPartialADSR.get("y") + 30, 48, 48, "Release", true, onknbPartialReleaseControl, 5, 15000, 1.0, 200, "pnlBody");

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
const knbResidueGain = createKnob("knbResidueGain", lblResidueGain.get("x") + 140, lblResidueGain.get("y") + 25, 100, 16, "Gain", true, onknbResidueGainControl, 0, 1, 0.01, .75, "pnlBody");

knbResidueGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);

const lblResidueADSR = createLabel("lblResidueADSR", 467, lblPartialADSR.get("y"), 128, 32, 20, "Env", "pnlBody", Colours.grey, "centred");

const knbResidueAttack = createKnob("knbResidueAttack", lblResidueADSR.get("x") + 106, lblResidueADSR.get("y") + 30, 48, 48, "Attack", true, onknbResidueAttackControl, 5, 1000, 1.0, 5, "pnlBody");
const knbResidueDecay = createKnob("knbResidueDecay", knbResidueAttack.get("x") + 100, lblResidueADSR.get("y") + 30, 48, 48, "Decay", true, onknbResidueDecayControl, 500, 20000, 1.0, 15000, "pnlBody");
const knbResidueSustain = createKnob("knbResidueSustain", knbResidueAttack.get("x") + 200, lblResidueADSR.get("y") + 30, 48, 48, "Sustain", true, onknbResidueSustainControl, -100, 0, 1.0, -100, "pnlBody");
const knbResidueRelease = createKnob("knbResidueRelease", knbResidueAttack.get("x") + 300, lblResidueADSR.get("y") + 30, 48, 48, "Release", true, onknbResidueReleaseControl, 5, 15000, 1.0, 200, "pnlBody");

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
	synthWTLeft_gainVelocity.setIntensity(value);
}


// Amp LFO
inline function onknbAmpLFOControl(component, value)
{
	synthWTLeft_gainLFO.setIntensity(value);
}

// Amp Random
inline function onknbAmpRandomControl(component, value)
{
	synthWTLeft_gainRandom.setIntensity(value);
}

// Pitch Velocity
inline function onknbPitchVelocityControl(component, value)
{
	synthWTLeft_pitchAHDSRVelocity.setIntensity(value);
}

// Pitch Decay
inline function onknbPitchDecayControl(component, value)
{
	synthWTLeft_pitchAHDSR.setAttribute(synthWTLeft_pitchAHDSR.Decay, value);
}

// Pitch Random
inline function onknbPitchRandomControl(component, value)
{
	synthWTLeft_pitchRandom.setIntensity(value);
}

// Pitch LFO 
inline function onknbPitchLFOControl(component, value)
{
	synthWTLeft_pitchLFO.setIntensity(value);
}

// Tone Dampen
inline function onknbToneDampenControl(component, value)
{
	Console.print("Need to implement Dampen Functionality");
}

// Tone Decay 
inline function onknbToneDecayControl(component, value)
{
	Console.print("Need to implement Dampen Decay Functionality");
}

// Tone WT Position
// no idea what to do here
inline function onknbTonePositionControl(component, value) // rename this later?
{
	Console.print("Need to implement WT Position Functionality");
}

// Tone Stiffness Intensity
inline function onknbToneStiffnessControl(component, value)
{
	Console.print("Need to implement Stiffness Functionality");
}

// Tone Stiffness Type (Buttons)
inline function onbtnToneStiffnessTypeAControl(component, value){ Console.print("Need to implement Stiffness Type Functionality");}
inline function onbtnToneStiffnessTypeBControl(component, value){Console.print("Need to implement Stiffness Type Functionality");}

// Instantiate UI Elements

const btnShowAdvancedPanel = createButton("btnShowAdvancedPanel", 471, 200, 24, 100, "open", false, onbtnShowAdvancedPanelControl, false, true, "pnlBody");
const pnlAdvanced = createChildPanel("pnlAdvanced", 498, 20, 480, 490, "pnlBody");
const lblAdvanced = createLabel("lblAdvanced", -8, -26, 128, 64, 24, "Advanced_", "pnlAdvanced", Colours.grey, "centred");

const lblTone = createLabel("lblTone", -30, 382 , 128, 32, 20, "Tone", "pnlAdvanced", Colours.grey, "centred");
const lblPitch = createLabel("lblPitch", -30, lblTone.get("y") - 130, 128, 32, 20, "Pitch", "pnlAdvanced", Colours.grey, "centred");
const lblAmp = createLabel("lblAmp", -30, lblPitch.get("y") - 130, 128, 32, 20, "Amp", "pnlAdvanced", Colours.grey, "centred");

const knbAmpVelocity = createKnob("knbAmpVelocity", lblAmp.get("x") + 106, lblAmp.get("y") + 30, 48, 48, "Vel", true, onknbAmpVelocityControl, 0, 0.2, 0.01, 0.1, "pnlAdvanced");
const knbAmpLFO = createKnob("knbAmpLFO", knbAmpVelocity.get("x") + 100, lblAmp.get("y") + 30, 48, 48, "Vel", true, onknbAmpVelocityControl, 0, 0.1, 0.01, 0.1, "pnlAdvanced");
const knbAmpRandom = createKnob("knbAmpRandom", knbAmpLFO.get("x") + 100, lblAmp.get("y") + 30, 48, 48, "Vel", true, onknbAmpVelocityControl, 0, 0.1, 0.01, 0.1, "pnlAdvanced");

const knbPitchVelocity = createKnob("knbPitchVelocity", lblPitch.get("x") + 106, lblPitch.get("y") + 30, 48, 48, "Vel", true, onknbPitchVelocityControl, 0, 1.0, 0.01, 0.1, "pnlAdvanced");
const knbPitchDecay = createKnob("knbPitchDecay", knbPitchVelocity.get("x") + 100, lblPitch.get("y") + 30, 48, 48, "Vel", true, onknbPitchDecayControl, 20, 4000, 1.0, 1000, "pnlAdvanced");
const knbPitchLFO = createKnob("knbPitchLFO", knbPitchDecay.get("x") + 100, lblPitch.get("y") + 30, 48, 48, "Vel", true, onknbPitchLFOControl, 0, 0.1, 0.01, 0.1, "pnlAdvanced");
const knbPitchRandom = createKnob("knbPitchRandom", knbPitchLFO.get("x") + 100, lblPitch.get("y") + 30, 48, 48, "Vel", true, onknbPitchRandomControl, 0, 0.15, 0.01, 0.1, "pnlAdvanced");


const knbToneDampen = createKnob("knbToneDampen", lblTone.get("x") + 106, lblTone.get("y") + 30, 48, 48, "Vel", true, onknbToneDampenControl, 4000, 8000, 1.0, 6000, "pnlAdvanced");
const knbToneDecay = createKnob("knbToneDecay", knbToneDampen.get("x") + 100, lblTone.get("y") + 30, 48, 48, "Vel", true, onknbToneDecayControl, 0, 1.0, 0.01, 0.1, "pnlAdvanced");
const knbTonePosition = createKnob("knbTonePosition", knbToneDecay.get("x") + 100, lblTone.get("y") + 30, 48, 48, "Vel", true, onknbTonePositionControl, 0, 1.0, 0.01, 0.1, "pnlAdvanced");
const knbToneStiffness = createKnob("knbToneStiffness", knbTonePosition.get("x") + 100, lblTone.get("y") + 30, 48, 48, "Vel", true, onknbToneStiffnessControl, 0, 1.0, 0.01, 0.1, "pnlAdvanced");
const btnToneStiffnessTypeA = createButton("btnToneStiffnessTypeA", knbToneStiffness.get("x") + 66, knbToneStiffness.get("y") - 14, 24, 24, "A", true, onbtnToneStiffnessTypeAControl, false, true, "pnlAdvanced");
const btnToneStiffnessTypeB = createButton("btnToneStiffnessTypeB", knbToneStiffness.get("x") + 66, knbToneStiffness.get("y") + 34, 24, 24, "B", true, onbtnToneStiffnessTypeBControl, false, true, "pnlAdvanced");

btnToneStiffnessTypeA.setLocalLookAndFeel(LAFButtonStiffness);
btnToneStiffnessTypeB.setLocalLookAndFeel(LAFButtonStiffness);

btnToneStiffnessTypeA.set("radioGroup", 1);
btnToneStiffnessTypeB.set("radioGroup", 1);

const lblAmpVelocity = createLabel("lblAmpVelocity", knbAmpVelocity.get("x") - 39, knbAmpVelocity.get("y") + 50, 128, 32, 16, "Vel", "pnlAdvanced", Colours.grey, "centred");
const lblAmpLFO = createLabel("lblAmpLFO", knbAmpLFO.get("x") - 39, knbAmpLFO.get("y") + 50, 128, 32, 16, "Drift", "pnlAdvanced", Colours.grey, "centred");
const lblAmpRandom = createLabel("lblAmpRandom", knbAmpRandom.get("x") - 39, knbAmpRandom.get("y") + 50, 128, 32, 16, "Random", "pnlAdvanced", Colours.grey, "centred");

const lblPitchVelocity = createLabel("lblPitchVelocity", knbPitchVelocity.get("x") - 39, knbPitchVelocity.get("y") + 50, 128, 32, 16, "Vel", "pnlAdvanced", Colours.grey, "centred");
const lblPitchDecay = createLabel("lblPitchDecay", knbPitchDecay.get("x") - 39, knbPitchDecay.get("y") + 50, 128, 32, 16, "Decay", "pnlAdvanced", Colours.grey, "centred");
const lblPitchRandom = createLabel("lblPitchRandom", knbPitchRandom.get("x") - 39, knbPitchRandom.get("y") + 50, 128, 32, 16, "Random", "pnlAdvanced", Colours.grey, "centred");
const lblPitchLFO = createLabel("lblPitchLFO", knbPitchLFO.get("x") - 39, knbPitchLFO.get("y") + 50, 128, 32, 16, "Drift", "pnlAdvanced", Colours.grey, "centred");

const lblToneDampen = createLabel("lblToneDampen", knbToneDampen.get("x") - 39, knbToneDampen.get("y") + 50, 128, 32, 16, "Dampen", "pnlAdvanced", Colours.grey, "centred");
const lblToneDecay = createLabel("lblToneDecay", knbToneDecay.get("x") - 39, knbToneDecay.get("y") + 50, 128, 32, 16, "Decay", "pnlAdvanced", Colours.grey, "centred");
const lblTonePosition = createLabel("lblTonePosition", knbTonePosition.get("x") - 39, knbTonePosition.get("y") + 50, 128, 32, 16, "Position", "pnlAdvanced", Colours.grey, "centred");
const lblToneStiffness = createLabel("lblToneStiffness", knbToneStiffness.get("x") - 39, knbToneStiffness.get("y") + 50, 128, 32, 16, "Stiffness", "pnlAdvanced", Colours.grey, "centred");
	
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

const jsonInfoSubtitles = ["RATIOS", "GLOBAL", "INTER", "FALLOFF", "DECAY", "DRIFT", "FILTER", "DAMPEN", "STIFFNESS"];

const jsonInfoPopup = [
"Control Individual Partial Frequencies.",
"The amount of Global pitch randomization per note.",
"The amount of frequency randomization for each Partial.",
"The amount of upward pitch drift when playing harder velocities.",
"The time it takes for the Falloff to return to the base value.",
"The amount of time-varying pitch-drift applied to the Partials.",
"The cutoff frequency of a lowpass SVF filter.",
"Softens high frequencies over time, creating a dampening effect.",
"The amount and type of additional overtones added to Partialss"
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
    g.drawAlignedText("NEATBrain!", [70, 40, this.getWidth(), this.getHeight()], "topLeft");
    g.setColour(Colours.grey);
    g.drawAlignedText("Select a Partial and Residue Profile from the main window, then tweak and sculpt your ", [0, 75, this.getWidth(), this.getHeight()], "topLeft");
    g.drawAlignedText("sound with the Advanced controls.", [0, 95, this.getWidth(), this.getHeight()], "topLeft");
    g.drawAlignedText("Have fun!", [0, 125, this.getWidth(), this.getHeight()], "topLeft");

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

for (i = 0; i < 128; i++)
   	Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.2));

