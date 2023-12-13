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

- pitch bend
- Call instruments "Memories"

*/

/* NEATBrain External Files*/

include("Builder.js");

/* NEATBrain Global Vars */

const NUM_MODES = 8; /* MAXIMUM 8 */
const STEREO_INSTRUMENT = false;
const BUILD_MODULE_TREE = false; /* set to false when exporting*/
const INITIALIZE_MODULE_DEFAULTS = true;

const DATA_L = {
	"gain" : 0.12,
	"object" : SynthGroupLeft,
	"attack" : 30,
	"decay" : 25000,
	"sustain" : -100,
	"release" : 5000,
	"filter" : 1600,
	"Q" : .5,
	"filterAttack" : 5,
	"filterDecay" : 25000,
	"filterSustain" : -100,
	"filterRelease" : 6000,
	"ratios" : [1.0,
    2.017527433721409,
    3.02109172841769,
    4.04319476129672,
    5.062172939147588,
    6.077214616423551,
    7.10009699417193,
    8.119516634399462,
    13.18585713232291,
    14.1573595622601   ]
}

const DATA_R = {
	"gain" : 0.5,
	"object" : SynthGroupRight,
	"attack" : 10,
	"decay" : 5645,
	"sustain" : 0,
	"release" : 15000,
	"filter" : 1000,
	"Q" : .3,
	"filterAttack" : 5,
	"filterDecay" : 1500,
	"filterSustain" : 0,
	"filterRelease" : 6000,
	"ratios" : [1.0,
    1.384065231176883,
    1.765772639492703,
    2.488449331421106,
    3.464810288997227]
}

const Modes_L = [];
const AHDSRS_L = [];
const Drifts_L = [];
const Randoms_L = [];
const Velocities_L = [];

const Modes_R = [];
const AHDSRS_R = [];
const Drifts_R = [];
const Randoms_R = [];
const Velocities_R = [];

// Build Module Tree

if (BUILD_MODULE_TREE)
{
	CREATE_MODAL_SYNTH(NUM_MODES, "Left");
	if (STEREO_INSTRUMENT)
		CREATE_MODAL_SYNTH(NUM_MODES, "Right");
}

// Get References

const SynthGroupLeft = Synth.getChildSynth("SynthGroupLeft");
const SynthGroupLeft_AHDSR = Synth.getModulator("SynthGroupLeft_AHDSR");
const SynthGroupLeft_Filter = Synth.getEffect("SynthGroupLeft_Filter");
const SynthGroupLeft_FilterAHDSR = Synth.getModulator("SynthGroupLeft_FilterAHDSR");

/*

const SynthGroupRight = Synth.getChildSynth("SynthGroupRight");
const SynthGroupRight_AHDSR = Synth.getModulator("SynthGroupRight_AHDSR");
const SynthGroupRight_Filter = Synth.getEffect("SynthGroupRight_Filter");
const SynthGroupRight_FilterAHDSR = Synth.getModulator("SynthGroupRight_FilterAHDSR");

*/

GET_MODAL_SYNTH_REFERENCES("Left");
if (STEREO_INSTRUMENT)
	GET_MODAL_SYNTH_REFERENCES("Right");

// Setup Default Values

if (INITIALIZE_MODULE_DEFAULTS)
{
	SET_MODAL_SYNTH_DEFAULTS("Left");
	if (STEREO_INSTRUMENT)
		SET_MODAL_SYNTH_DEFAULTS("Right");
}

//************************************************************



// Interface

// use helper functions like the example below to keep things clean 
// assign their functionality with scripting too because manually making stuff is annoying

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

inline function onknbAttackControl(component, value)
{
	SynthGroupLeft_AHDSR.setAttribute(SynthGroupLeft_AHDSR.Attack, value);
}

const knbAttack = createKnob("knbAttack", 50, 200, "Attack", true, onknbAttackControl, 5, 1000, 1.0);

/*
inline function createButton(id, x,y, text)
{
    // Create a button and stores it to the temporary variable 'b'
    local b = Content.addButton(id, x, y);
    
    // Use the arguments to set properties differently
    b.set("text", text);
    
    // Some random constant properties for every widget
    b.set("saveInPreset", false);
    b.set("visible", false);
    
    return b;
}

button1 = createButton("button1", 0, 0, "Test 1");
button2 = createButton("button2", 0, 0, "Test 2");	
*/

function onNoteOn()
{
	// Randomize Modal Ratios
	
	
	
	for (i=0; i<NUM_MODES; i++)
	{
		Modes_L[i].setAttribute(Modes_L[i].FineFreqRatio, DATA_L.ratios[i] - Math.floor(DATA_L.ratios[i]) + (Math.random() * .02));
	}
	
	if (STEREO_INSTRUMENT)
	{
		for (i=0; i<NUM_MODES; i++)
		{
			Modes_R[i].setAttribute(Modes_R[i].FineFreqRatio, DATA_R.ratios[i] - Math.floor(DATA_R.ratios[i]) + (Math.random() * .02));
		}
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
 