include("NEATBRAINBoilerplate/NEATBrainLookAndFeel.js");
include("NEATBRAINBoilerplate/NEATBrainModules.js");
include("NEATBRAINBoilerplate/NEATBrainUIConstructors.js");


/* Key Colours */

for (i = 0; i < 128; i++)
   	Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.2));
   	
/* UI Control Methods */



// Open Advanced Panel

inline function onbtnShowAdvancedPanelControl(component, value)
{
	pnlAdvanced.set("visible", value);
}

// Partials

// Partial Gain
inline function onknbPartialGainControl(component, value){}		

// AHDSR Attack
inline function onknbPartialAttackControl(component, value){}

// AHDSR Decay
inline function onknbPartialDecayControl(component, value){}

// AHDSR Sustain
inline function onknbPartialSustainControl(component, value){}

// AHDSR Release
inline function onknbPartialReleaseControl(component, value){}

// Random Global
inline function onknbPartialRandomGlobalControl(component, value){}

// Random Single
inline function onknbPartialRandomSingleControl(component, value){}

// Falloff Intensity
inline function onknbPartialFalloffIntensityControl(component, value){}

// Falloff Decay
inline function onknbPartialFalloffDecayControl(component, value){}

// Pitch LFO Drift
inline function onknbPartialDriftIntensityControl(component, value){}

// Filter Static
inline function onknbPartialFilterControl(component, value){}

// Filter Decay
inline function onknbPartialDampenControl(component, value){}

// Stiffness Types
inline function onbtnPartialStiffnessTypeAControl(component, value){}

inline function onbtnPartialStiffnessTypeBControl(component, value){}

// Stiffness Intensity
inline function onknbPartialStiffnessIntensityControl(component, value){}

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

const lblResidue = createLabel("lblResidue", 483, -6, 128, 64, 24, "Residue_", "pnlBody", Colours.grey, "centred");

const lblResidueGain = createLabel("lblResidueGain", 740, 0, 128, 64, 14, "VOL", "pnlBody", Colours.grey, "right");
const knbResidueGain = createKnob("knbResidueGain", lblResidueGain.get("x") + 140, lblResidueGain.get("y") + 25, 100, 16, "Gain", true, onknbResidueGainControl, 0, 1, 0.01, .75, "pnlBody");

knbResidueGain.setLocalLookAndFeel(LookAndFeel.horizontalSlider);

const lblResidueADSR = createLabel("lblResidueADSR", 467, lblPartialADSR.get("y"), 128, 32, 20, "Env", "pnlBody", Colours.grey, "centred");

const knbResidueAttack = createKnob("knbResidueAttack", 573, lblResidueADSR.get("y") + 30, 48, 48, "Attack", true, onknbResidueAttackControl, 5, 1000, 1.0, 5, "pnlBody");
const knbResidueDecay = createKnob("knbResidueDecay", knbResidueAttack.get("x") + 100, lblResidueADSR.get("y") + 30, 48, 48, "Decay", true, onknbResidueDecayControl, 500, 20000, 1.0, 15000, "pnlBody");
const knbResidueSustain = createKnob("knbResidueSustain", knbResidueAttack.get("x") + 200, lblResidueADSR.get("y") + 30, 48, 48, "Sustain", true, onknbResidueSustainControl, -100, 0, 1.0, -100, "pnlBody");
const knbResidueRelease = createKnob("knbResidueRelease", knbResidueAttack.get("x") + 300, lblResidueADSR.get("y") + 30, 48, 48, "Release", true, onknbResidueReleaseControl, 5, 15000, 1.0, 200, "pnlBody");

const lblResidueAttack = createLabel("lblResidueAttack", knbResidueAttack.get("x") - 39, knbResidueAttack.get("y") + 50, 128, 32, 16, "Attack", "pnlBody", Colours.grey, "centred");
const lblResidueDecay = createLabel("lblResidueDecay", knbResidueDecay.get("x") - 40, knbResidueDecay.get("y") + 50, 128, 32, 16, "Decay", "pnlBody", Colours.grey, "centred");
const lblResidueSustain = createLabel("lblResidueSustain", knbResidueSustain.get("x") - 40, knbResidueSustain.get("y") + 50, 128, 32, 16, "Sustain", "pnlBody", Colours.grey, "centred");
const lblResidueRelease = createLabel("lblResidueRelease", knbResidueRelease.get("x") - 38, knbResidueRelease.get("y") + 50, 128, 32, 16, "Release", "pnlBody", Colours.grey, "centred");

/* Advanced Panel */

const btnShowAdvancedPanel = createButton("btnShowAdvancedPanel", 471, 200, 24, 100, "open", false, onbtnShowAdvancedPanelControl, false, true, "pnlBody");
const pnlAdvanced = createChildPanel("pnlAdvanced", 498, 20, 480, 490, "pnlBody");


const lblAdvanced = createLabel("lblAdvanced", -8, -26, 128, 64, 24, "Advanced_", "pnlAdvanced", Colours.grey, "centred");
	
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

