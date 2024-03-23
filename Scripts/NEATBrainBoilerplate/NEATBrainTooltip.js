// Rhapsody UI Elements

const RHAPSbtnUnload = Content.getComponent("btnUnload");
const RHAPSbtnSettings = Content.getComponent("btnSettings");
const RHAPSbtnMasterGain = Content.getComponent("knbMasterGain");
const RHAPSbtnMasterPan = Content.getComponent("knbMasterPan");
const RHAPSbtnPreset0 = Content.getComponent("btnPreset0");
const RHAPSbtnPreset1 = Content.getComponent("btnPreset1");
const RHAPSbtnPresetSave = Content.getComponent("btnPresetSave");

/* Tooltip Descriptions */

const pnlTooltip = createChildPanel("pnlTooltip", 300, 10, 350, 20, "pnlStatusBar");

pnlTooltip.setPaintRoutine(function(g)
{
	var tooltip = Content.getCurrentTooltip();

	g.setColour(Colours.grey);
	g.setFont("Arial", 14);
	
	g.drawAlignedText(tooltip, [0, 0, this.getWidth(), this.getHeight()], "centred");
});

pnlTooltip.setTimerCallback(function()
{
	 this.repaint();
});

pnlTooltip.startTimer(17);

// Setting Tooltips

btnPartialProfilePrev.set("tooltip", "Previous Partial Profile.");
btnPartialProfileNext.set("tooltip", "Next Partial Profile.");
btnResidueProfilePrev.set("tooltip", "Previous Residue Profile.");
btnResidueProfileNext.set("tooltip", "Next Residue Profile.");
btnShowAdvancedPanel.set("tooltip", "Display Advanced settings.");
knbPartialGain.set("tooltip", "Partial Gain.");
knbPartialAttack.set("tooltip", "Partial Attack time.");
knbPartialDecay.set("tooltip", "Partial Decay time.");
knbPartialSustain.set("tooltip", "Partial Sustain level.");
knbPartialRelease.set("tooltip", "Partial Release time.");
knbResidueGain.set("tooltip", "Residue Gain.");
knbResidueAttack.set("tooltip", "Residue Attack time.");
knbResidueDecay.set("tooltip", "Residue Decay time.");
knbResidueSustain.set("tooltip", "Residue Sustain level.");
knbResidueRelease.set("tooltip", "Residue Release time.");
knbAmpVelocity.set("tooltip", "Amplitude-velocity influence.");
knbAmpLFO.set("tooltip", "Amplitude drift over time.");
knbAmpRandom.set("tooltip", "Per-Note amplitude randomization.");
knbPitchVelocity.set("tooltip", "Adds subtle Pitch-Bend for harder Velocities.");
knbPitchDecay.set("tooltip", "Decay time for the Velocity Pitch-Bend.");
knbPitchLFO.set("tooltip", "Subtle Pitch Drift over time.");
knbPitchRandom.set("tooltip", "Per-voice Pitch Randomization.");
knbToneBody.set("tooltip", "Transparent lower frequency (135Hz) EQ Sculpt.");
knbToneBite.set("tooltip", "Transparent upper-mid frequency (2.5kHz) EQ Sculpt.");
knbToneShimmer.set("tooltip", "Transparent high (8kHz) frequency EQ Sculpt.");
knbToneDampen.set("tooltip", "Dynamic pitch-based harshness attenuation.");
RHAPSbtnUnload.set("tooltip", "Unload this instrument.");
RHAPSbtnSettings.set("tooltip", "Open Settings.");
RHAPSbtnMasterGain.set("tooltip", "Master Gain.");
RHAPSbtnMasterPan.set("tooltip", "Master Pan.");
RHAPSbtnPreset0.set("tooltip", "Previous Preset.");
RHAPSbtnPreset1.set("tooltip", "Next Preset.");
RHAPSbtnPresetSave.set("tooltip", "Save Preset.");



