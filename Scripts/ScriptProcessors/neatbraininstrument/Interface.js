Content.makeFrontInterface(1000, 710);

include("RhapsodyBoilerplate/includes/Ui.js");
include("RhapsodyBoilerplate/includes/LookAndFeel.js");
include("RhapsodyBoilerplate/includes/Paths.js");
include("RhapsodyBoilerplate/includes/Expansions.js");
include("RhapsodyBoilerplate/includes/Header.js");
include("RhapsodyBoilerplate/includes/Footer.js");
include("RhapsodyBoilerplate/includes/Presets.js");
include("RhapsodyBoilerplate/includes/UserSettings.js");
include("RhapsodyBoilerplate/includes/Spinner.js");

/* TO DO

- Call instruments "Memories"
- add frontend controls for overtones
- add frontend controls for Samplers

*/

/* NEATBrain External Files*/

include("Builder.js");

/* NEATBrain Global Vars */

const NUM_MODES = 10; /* MAXIMUM 8 */
const STEREO_INSTRUMENT = true;
const BUILD_MODULE_TREE = true; /* set to false when exporting*/
const INITIALIZE_MODULE_DEFAULTS = true;
const PITCH_RANDOMIZATION = 0.03;

const DATA_L = {
	"gain" : 0.07,
	"object" : SynthGroupLeft,
	"attack" : 30,
	"decay" : 25000,
	"sustain" : -100,
	"release" : 300,
	"filter" : 500,
	"Q" : .5,
	"filterAttack" : 5,
	"filterDecay" : 25000,
	"filterSustain" : -100,
	"filterRelease" : 6000,
	"ratios" : [1.0,
    1.50611545132335,
    2.016324247621238,
    2.527350129491297,
    3.035309537051999,
    3.525344403230273,
    4.04593794204812,
    4.571776977544238,
    5.099654773656049,
    5.651269572535853   ]
}

const DATA_R = {
	"gain" : 0.07,
	"object" : SynthGroupRight,
	"attack" : 30,
	"decay" : 25000,
	"sustain" : -100,
	"release" : 300,
	"filter" : 500,
	"Q" : .5,
	"filterAttack" : 5,
	"filterDecay" : 25000,
	"filterSustain" : -100,
	"filterRelease" : 300,
	"ratios" : [1.0,
    1.505414182546647,
    2.008330638755872,
    2.514642394668172,
    3.02555840107908,
    3.528748398971077,
    4.039515179259625,
    4.559517235889062,
    5.085521589146554,
    5.619901838351733]
}

/* Mode Vars */

const modesL = [];
const driftsL = [];
const randomsL = [];
const velocitiesL = [];

const modesR = [];
const driftsR = [];
const randomsR = [];
const velocitiesR = [];


// Build Module Tree

if (BUILD_MODULE_TREE)
{
	CREATE_MODAL_SYNTH(NUM_MODES, "Left");
	if (STEREO_INSTRUMENT)
		CREATE_MODAL_SYNTH(NUM_MODES, "Right");
}

// Get References

/*
const SynthGroupLeft = Synth.getChildSynth("SynthGroupLeft");
const SynthGroupLeft_AHDSR = Synth.getModulator("SynthGroupLeft_AHDSR");
const SynthGroupLeft_Filter = Synth.getEffect("SynthGroupLeft_Filter");
const SynthGroupLeft_FilterAHDSR = Synth.getModulator("SynthGroupLeft_FilterAHDSR");

const SynthGroupRight = Synth.getChildSynth("SynthGroupRight");
const SynthGroupRight_AHDSR = Synth.getModulator("SynthGroupRight_AHDSR");
const SynthGroupRight_Filter = Synth.getEffect("SynthGroupRight_Filter");
const SynthGroupRight_FilterAHDSR = Synth.getModulator("SynthGroupRight_FilterAHDSR");


*/

//************************************************************

// Interface

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
	/*

	SynthGroupLeft_AHDSR.setAttribute(SynthGroupLeft_AHDSR.Attack, value);
	
	if (STEREO_INSTRUMENT)
		SynthGroupRight_AHDSR.setAttribute(SynthGroupRight_AHDSR.Attack, value);
	*/

}

inline function onknbDecayControl(component, value)
{
	/*

	SynthGroupLeft_AHDSR.setAttribute(SynthGroupLeft_AHDSR.Decay, value);
	
	if (STEREO_INSTRUMENT)
		SynthGroupRight_AHDSR.setAttribute(SynthGroupRight_AHDSR.Decay, value);
	*/
		
}

inline function onknbSustainControl(component, value)
{	
	/*
	SynthGroupLeft_AHDSR.setAttribute(SynthGroupLeft_AHDSR.Sustain, value);
	
	if (STEREO_INSTRUMENT)
		SynthGroupRight_AHDSR.setAttribute(SynthGroupRight_AHDSR.Sustain, value);
	*/
		
}

inline function onknbReleaseControl(component, value)
{
	/*

	SynthGroupLeft_AHDSR.setAttribute(SynthGroupLeft_AHDSR.Release, value);
	
	if (STEREO_INSTRUMENT)
		SynthGroupRight_AHDSR.setAttribute(SynthGroupRight_AHDSR.Release, value);
		
	*/
		
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

inline function onknbHarmonicsControl(component, value)
{
	// add logic
}


/* Instantiate Sliders */

const knbAttack = createKnob("knbAttack", 100, 200, "Attack", true, onknbAttackControl, 5, 1000, 1.0);
const knbDecay = createKnob("knbDecay", 300, 200, "Decay", true, onknbDecayControl, 500, 20000, 1.0);
const knbSustain = createKnob("knbSustain", 500, 200, "Sustain", true, onknbSustainControl, -100, 0, 1.0);
const knbRelease = createKnob("knbRelease", 700, 200, "Release", true, onknbReleaseControl, 5, 15000, 1.0);

const knbBrightness = createKnob("knbBrightness", 100, 400, "Brightness", true, onknbBrightnessControl, 500, 12000, 1.0);
const knbHarmonics = createKnob("knbHarmonics", 300, 400, "Harmonics", true, onknbHarmonicsControl, 0, 1, 0.01);

/* Setup Misc Defaults */

knbSustain.set("middlePosition", -12.0);

function onNoteOn()
{
	// Randomize Modal Ratios	
	
	/*
	for (i=0; i<NUM_MODES; i++)
	{
		modesL[i].setAttribute(modesL[i].FineFreqRatio, DATA_L.ratios[i] - Math.floor(DATA_L.ratios[i]) + (Math.random() * PITCH_RANDOMIZATION));
	}
	
	if (STEREO_INSTRUMENT)
	{
		for (i=0; i<NUM_MODES; i++)
		{
			modesR[i].setAttribute(modesR[i].FineFreqRatio, DATA_R.ratios[i] - Math.floor(DATA_R.ratios[i]) + (Math.random() * PITCH_RANDOMIZATION));
		}
	}	
	*/
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 