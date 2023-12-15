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
- setup programmatic Sampler building
	- turn off Tracking
	- give it AHDSR
- setup release Sampler
*/

/* NEATBrain External Files*/


include("Builder.js");

/* DATA SLOTS */

const DATA_L = {
	"gain" : 0.03,
	"attack" : 30,
	"decay" : 25000,
	"sustain" : -100,
	"release" : 300,
	"ratios" : [1.0,
    2.00393903654452,
    3.017350156388935,
    4.02011890664535,
    5.032332957188848,
    6.03497637636802,
    7.058176409317743,
    8.071792386497687,
    9.103482297486988,
    10.13067662114036,
    11.17598365129806,
    12.15215262695358,
    13.22660381193059,
    15.37239089241594]
}

const DATA_R = {
	"gain" : 0.03,
	"attack" : 30,
	"decay" : 25000,
	"sustain" : -100,
	"release" : 300,
	"ratios" : [1.0,
    1.935252604224486,
    2.937627227270407,
    3.942324779347079,
    4.943760993578503,
    5.920186255617268,
    7.000049607635912,
    7.853682793178827,
    8.866755326748125,
    9.888974073503855,
    10.94668858915583,
    13.01145640006715,
    13.9860943290484,
    15.07775799466983,
    16.11725880368434]
}

/* NEATBrain Global Vars */

const NUM_MODES = DATA_L.ratios.length;
var STEREO_INSTRUMENT = false;
if (isDefined(DATA_R))
{
	STEREO_INSTRUMENT = true;
}

const CLEAR_MODULE_TREE = false; /* keep false unless rebuilding modules */
const BUILD_MODULE_TREE = false; /* set to false when exporting*/

/* Hyperparameters */

const PITCH_RANDOMIZATION = 0.03;
reg pitchOffsetL = 0.00;
reg pitchOffsetR = 0.00;

// Module Vars 

const rhapsodyModules = [];
const samplers = [];

const modesL = [];
const ahdsrsL = [];
const driftsL = [];
const randomsL = [];
const velocitiesL = [];

const modesR = [];
const ahdsrsR = [];
const driftsR = [];
const randomsR = [];
const velocitiesR = [];

// Build Module Tree

if (CLEAR_MODULE_TREE)
{
	DELETE_ALL_MODULES();
}

if (BUILD_MODULE_TREE)
{
	CREATE_BASE_MODULES();

	CREATE_MODAL_SYNTH(NUM_MODES, "Left");
	if (STEREO_INSTRUMENT)
		CREATE_MODAL_SYNTH(NUM_MODES, "Right");
}

GET_MODAL_SYNTH_REFERENCES("Left");
GET_MODAL_SYNTH_REFERENCES("Right");


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

inline function onknbHarmonicsControl(component, value)
{
	// add logic
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

/*
const knbAttack = createKnob("knbAttack", 100, 200, "Attack", true, onknbAttackControl, 5, 1000, 1.0);
const knbDecay = createKnob("knbDecay", 300, 200, "Decay", true, onknbDecayControl, 500, 20000, 1.0);
const knbSustain = createKnob("knbSustain", 500, 200, "Sustain", true, onknbSustainControl, -100, 0, 1.0);
const knbRelease = createKnob("knbRelease", 700, 200, "Release", true, onknbReleaseControl, 5, 15000, 1.0);

const knbBrightness = createKnob("knbBrightness", 100, 400, "Brightness", true, onknbBrightnessControl, 500, 12000, 1.0);
const knbHarmonics = createKnob("knbHarmonics", 300, 400, "Harmonics", true, onknbHarmonicsControl, 0, 1, 0.01);

*/

/* Setup Misc Defaults */

//knbSustain.set("middlePosition", -12.0);



function onNoteOn()
{
	// Randomize Modal Ratios	
	
	pitchOffsetL = Math.randInt(-3, 3) / 100;
	pitchOffsetR = Math.randInt(-3, 3) / 100;
	
	if (modesL.length > 0)
		for (i=0; i<NUM_MODES; i++)
		{
			modesL[i].setAttribute(modesL[i].FineFreqRatio, DATA_L.ratios[i] - Math.floor(DATA_L.ratios[i]) + pitchOffsetL + (Math.random() * PITCH_RANDOMIZATION));
		}
	
	if (modesR.length > 0)
		for (i=0; i<NUM_MODES; i++)
		{
			modesR[i].setAttribute(modesR[i].FineFreqRatio, DATA_R.ratios[i] - Math.floor(DATA_R.ratios[i]) + pitchOffsetR + (Math.random() * PITCH_RANDOMIZATION));
		}	
	
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
 