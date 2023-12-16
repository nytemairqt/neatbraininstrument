
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
	
	return k;
}

/* AHDSR */

inline function onknbAttackControl(component, value)
{
	if (ahdsrsL.length == 0)
		return;

	for (a in ahdsrsL)
	{
		a.setAttribute(a.Attack, value);
	}
	
	if (STEREO_INSTRUMENT)
		for (a in ahdsrsR)
		{
			a.setAttribute(a.Attack, value);
		}
}

inline function onknbDecayControl(component, value)
{
	if (ahdsrsL.length == 0)
		return;

	for (a in ahdsrsL)
		{
			a.setAttribute(a.Decay, value);
		}
		
		if (STEREO_INSTRUMENT)
			for (a in ahdsrsR)
			{
				a.setAttribute(a.Decay, value);
			}
}

inline function onknbSustainControl(component, value)
{		
	if (ahdsrsL.length == 0)
		return;

	for (a in ahdsrsL)
	{
		a.setAttribute(a.Sustain, value);
	}
	
	if (STEREO_INSTRUMENT)
		for (a in ahdsrsR)
		{
			a.setAttribute(a.Sustain, value);
		}
}

inline function onknbReleaseControl(component, value)
{
	if (ahdsrsL.length == 0)
		return;

	for (a in ahdsrsL)
		{
			a.setAttribute(a.Release, value);
		}
		
	if (STEREO_INSTRUMENT)
		for (a in ahdsrsR)
		{
			a.setAttribute(a.Release, value);
		}		
}

/* TONE */


inline function onknbBrightnessControl(component, value)
{
	/*

	SynthGroupLeft_Filter.setAttribute(SynthGroupLeft_Filter.Frequency, value);
	if (STEREO_INSTRUMENT)
		SynthGroupRight_Filter.setAttribute(SynthGroupRight_Filter.Frequency, value);
	*/
		
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

// NEATBrain Front End Controls

inline function onknbHarmonicsControl(component, value)
{
	if (isDefined(neatbrainModules[0]))
		neatbrainModules[0].setAttribute(neatbrainModules.harmonics, value);
}

inline function onknbDampeningControl(component, value)
{
	if (modesL_GAIN_AHDSRsDecayFalloffs.length == 0)
		return;

	/* Iterate through the Constants and REDUCE their intensity incrementally based on the strengthFactor */

	local strengthFactor = 0.05;
	//MODE_DECAY_COEFFICIENT = 1 - (value * strengthFactor); 

	//MODE_DECAY_COEFFICIENT = 1.0 - ((strengthFactor * value) * i);

	for (i=0; i<modesL_GAIN_AHDSRsDecayFalloffs.length; i++)
	{		
		MODE_DECAY_COEFFICIENT = 1.0 - ((strengthFactor * value) * i);
		modesL_GAIN_AHDSRsDecayFalloffs[i].setIntensity(1-MODE_DECAY_COEFFICIENT);
		if (STEREO_INSTRUMENT)
			modesR_GAIN_AHDSRsDecayFalloffs[i].setIntensity(1-MODE_DECAY_COEFFICIENT);
	}
		
		/*
	if (STEREO_INSTRUMENT)
		for (i=0; i<modesR_GAIN_AHDSRsDecayFalloffs.length; i++)
		{
			
			//modesR_GAIN_AHDSRsDecayFalloffs[i].setIntensity(1.0 - (MODE_DECAY_COEFFICIENT * i));
		}
		*/
}

/* Instantiate Sliders */

const knbHarmonics = createKnob("knbHarmonics", 300, 400, "Harmonics", true, onknbHarmonicsControl, 0, 1, 0.01);
const knbDampening = createKnob("knbDampening", 500, 400, "Dampening", true, onknbDampeningControl, 0.0, 1.0, 0.01);

const knbAttack = createKnob("knbAttack", 100, 200, "Attack", true, onknbAttackControl, 5, 1000, 1.0);
const knbDecay = createKnob("knbDecay", 300, 200, "Decay", true, onknbDecayControl, 500, 20000, 1.0);
const knbSustain = createKnob("knbSustain", 500, 200, "Sustain", true, onknbSustainControl, -100, 0, 1.0);
const knbRelease = createKnob("knbRelease", 700, 200, "Release", true, onknbReleaseControl, 5, 15000, 1.0);

//const knbBrightness = createKnob("knbBrightness", 100, 400, "Brightness", true, onknbBrightnessControl, 500, 12000, 1.0);

/* Setup Misc Defaults */

knbSustain.set("middlePosition", -12.0);