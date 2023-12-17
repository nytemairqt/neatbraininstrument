
for (i = 0; i < 128; i++)
   	Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.2));

inline function createKnob(id, x, y, text, saveInPreset, callback, minValue, maxValue, stepSize)
{
	local k = Content.addKnob(id, x, y);
	
	k.set("text", text);
	k.set("min", minValue);
	k.set("max", maxValue);
	k.set("stepSize", stepSize);
	
	k.set("saveInPreset", saveInPreset);
	k.setControlCallback(callback);

	Content.setPropertiesFromJSON(id, {
          parentComponent: "pnlBody"
	});
	
	return k;
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

// NEATBrain Front End Controls

inline function onknbDampeningControl(component, value)
{
	if (modesL_GAIN_AHDSRsDecayFalloffs.length == 0)
		return;

	/* Iterate through the Constants and REDUCE their intensity incrementally based on the strengthFactor */
	/* I promise its working lmao (combination of Lowpass filter & Harmonic Ratios make it hard to tell) */

	local strengthFactor = 0.05;
	for (i=0; i<modesL_GAIN_AHDSRsDecayFalloffs.length; i++)
	{		
		MODE_DECAY_COEFFICIENT = 1.0 - ((strengthFactor * value) * i);
		modesL_GAIN_AHDSRsDecayFalloffs[i].setIntensity(1-MODE_DECAY_COEFFICIENT);
		if (STEREO_INSTRUMENT)
			modesR_GAIN_AHDSRsDecayFalloffs[i].setIntensity(1-MODE_DECAY_COEFFICIENT);
	}		
}

inline function onknbFilterControl(component, value)
{
	if (modalFilters.length == 0)
		return; 

	for (filter in modalFilters)
		filter.setAttribute(filter.Frequency, value);
}

/* Instantiate Sliders */

const var pnlBody = Content.getComponent("pnlBody");

const knbFilter = createKnob("knbFilter", 100, 400, "Filter", true, onknbFilterControl, 50, 20000, 1.0);
const knbDampening = createKnob("knbDampening", 500, 400, "Dampening", true, onknbDampeningControl, 0.0, 1.0, 0.01);

const knbAttack = createKnob("knbAttack", 100, 200, "Attack", true, onknbAttackControl, 5, 1000, 1.0);
const knbDecay = createKnob("knbDecay", 300, 200, "Decay", true, onknbDecayControl, 500, 20000, 1.0);
const knbSustain = createKnob("knbSustain", 500, 200, "Sustain", true, onknbSustainControl, -100, 0, 1.0);
const knbRelease = createKnob("knbRelease", 700, 200, "Release", true, onknbReleaseControl, 5, 15000, 1.0);

/* Setup Misc Defaults */

knbSustain.set("middlePosition", -12.0);
knbFilter.set("middlePosition", 1400);