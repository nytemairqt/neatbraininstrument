include("NEATBRAINBoilerplate/NEATBrainLookAndFeel.js");

const synthPartials = Synth.getChildSynth("synthPartials");

for (i = 0; i < 128; i++)
   	Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.2));

inline function createKnob(id, x, y, width, height, text, saveInPreset, callback, minValue, maxValue, stepSize, defaultValue)
{
	local k = Content.addKnob(id, x, y);
	
	k.set("text", text);
	k.set("min", minValue);
	k.set("max", maxValue);
	k.set("stepSize", stepSize);
	k.set("defaultValue", defaultValue);
	k.set("width", width);
	k.set("height", height);
	
	k.set("saveInPreset", saveInPreset);
	k.setControlCallback(callback);

	Content.setPropertiesFromJSON(id, {
          parentComponent: "pnlBody"
	});

	k.setLocalLookAndFeel(LAFSliderNEATBrain);
	
	return k;
}

inline function createTextPanel(id, x, y, width, height, fontSize, text)
{
	local p = Content.addPanel(id, x, y);

	p.set("width", width);
	p.set("height", height);
	p.set("text", text);

	p.data.text = text;
	p.data.fontSize = fontSize;
	
	Content.setPropertiesFromJSON(id, {
          parentComponent: "pnlBody"
	});

	p.setPaintRoutine(function(g)
	{
		g.fillAll(Colours.withAlpha(Colours.grey, 0.0));
		g.setColour(Colours.withAlpha(Colours.grey, 1.0));
		g.setFont("bold", this.data.fontSize);
		g.drawAlignedText(this.data.text, [0, 0, this.getWidth(), this.getHeight()], "centred");

	});
}


/* AHDSR */

inline function onknbAttackControl(component, value)
{
	if (modesL_GAIN_AHDSRs.length == 0)
		return;

	for (a in modesL_GAIN_AHDSRs)
	{
		a.setAttribute(a.Attack, value);
	}
	
	if (STEREO_INSTRUMENT)
		for (a in modesR_GAIN_AHDSRs)
		{
			a.setAttribute(a.Attack, value);
		}
}

inline function onknbDecayControl(component, value)
{
	if (modesL_GAIN_AHDSRs.length == 0)
		return;

	for (a in modesL_GAIN_AHDSRs)
		{
			a.setAttribute(a.Decay, value);
		}
		
		if (STEREO_INSTRUMENT)
			for (a in modesR_GAIN_AHDSRs)
			{
				a.setAttribute(a.Decay, value);
			}
}

inline function onknbSustainControl(component, value)
{		
	if (modesL_GAIN_AHDSRs.length == 0)
		return;

	for (a in modesL_GAIN_AHDSRs)
	{
		a.setAttribute(a.Sustain, value);
	}
	
	if (STEREO_INSTRUMENT)
		for (a in modesR_GAIN_AHDSRs)
		{
			a.setAttribute(a.Sustain, value);
		}
}

inline function onknbReleaseControl(component, value)
{
	if (modesL_GAIN_AHDSRs.length == 0)
		return;

	for (a in modesL_GAIN_AHDSRs)
		{
			a.setAttribute(a.Release, value);
		}
		
	if (STEREO_INSTRUMENT)
		for (a in modesR_GAIN_AHDSRs)
		{
			a.setAttribute(a.Release, value);
		}		
}

/* TONE */

inline function onknbFilterControl(component, value)
{
	synthPartials.setAttribute(synthPartials.filterStaticFrequency, value);
}

inline function onknbDampeningControl(component, value)
{
	synthPartials.setAttribute(synthPartials.filterFalloffDecay, value);
}

// Rhapsody Front End Controls

inline function onknbMasterGainControl(component, value)
{
	if (isDefined(rhapsodyModules[0]))
		rhapsodyModules[0].setAttribute(rhapsodyModules[0].Gain, value);
}

inline function onknbMasterPanControl(component, value)
{
	if (isDefined(rhapsodyModules[0]))
		rhapsodyModules[0].setAttribute(rhapsodyModules[0].Balance, value);
}

Content.getComponent("knbMasterGain").setControlCallback(onknbMasterGainControl);
Content.getComponent("knbMasterPan").setControlCallback(onknbMasterPanControl);

/* Instantiate Sliders */

const knbFilter = createKnob("knbFilter", 100, 400, 64, 64, "Filter", true, onknbFilterControl, 300, 4000, 1.0, 1200);
const knbDampening = createKnob("knbDampening", 500, 400, 64, 64, "Dampening", true, onknbDampeningControl, 0.0, 1.0, 0.01, 0.0);

const knbAttack = createKnob("knbAttack", 565, 120, 64, 64, "Attack", true, onknbAttackControl, 5, 1000, 1.0, 5);
const knbDecay = createKnob("knbDecay", 665, 120, 64, 64, "Decay", true, onknbDecayControl, 500, 20000, 1.0, 15000);
const knbSustain = createKnob("knbSustain", 765, 120, 64, 64, "Sustain", true, onknbSustainControl, -100, 0, 1.0, -100);
const knbRelease = createKnob("knbRelease", 865, 120, 64, 64, "Release", true, onknbReleaseControl, 5, 15000, 1.0, 200);

/* Setup Misc Defaults */

knbSustain.set("middlePosition", -12.0);
knbFilter.set("middlePosition", 1400);

/* Generic UI Elements */


//id, x, y, width, height, fontSize, text
const lblResidue = createTextPanel("lblResidue", 20, 10, 128, 64, 24, "Residue_");
const lblModes = createTextPanel("lblModes", 480, 10, 128, 64, 24, "Modes_");

const lblAttack = createTextPanel("lblAttack", 535, 180, 128, 32, 16, "Attack");
const lblDecay = createTextPanel("lblDecay", 632, 180, 128, 32, 16, "Decay");
const lblSustain = createTextPanel("lblSustain", 733, 180, 128, 32, 16, "Sustain");
const lblRelease = createTextPanel("lblRelease", 836, 180, 128, 32, 16, "Release");