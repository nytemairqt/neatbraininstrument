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
- setup release Sampler
	- disable it using a global 
*/

/* NEATBrain External Files */

include("NEATBRAINBoilerplate/Builder.js");
include("NEATBRAINBoilerplate/Ui.js");
include("NEATBRAINBoilerplate/Constants.js");
include("NEATBRAINBoilerplate/Debug_DisableModules.js");

/* CONSTRUCTOR */

const MODULE_BUILD_MODE = 5; // 0=DoNothing, 1=ClearModules(Modes), 2=ClearModules(All) 3=RebuildBaseModules, 4=RebuildModes, 5=Release

/* INSTRUMENT DATA */

const MODES_L = [1.0,
    1.984811516404366,
    2.989343587647727,
    3.987621589028747,
    4.994306573992338,
    5.996539273606929,
    6.993069999405504,
    8.031158333590003,
    9.060198886798654,
    10.12726228734718,
    11.16737207126846,
    12.21771477510835,
    13.285298156059,
    14.34680741315559,
    15.45087241525689,
    16.53472203639681,
    17.67059404683915,
    18.76762827202367,
    19.94338396877705,
    21.30332125725249,
    22.39275635543807,
    24.74455797192716,
    26.00811965603957,
    27.19706068972287,
    28.53020745197155,
    29.7514432324793,
    31.11213974195163];

const MODES_R = [1.0,
    1.997420838486636,
    2.995898201674351,
    3.995868175566671,
    4.997510768606655,
    5.998439466400024,
    7.006170177062672,
    8.011351171143776,
    9.020196782090531,
    10.03089567712434,
    11.05010977438268,
    12.05216471629338,
    13.05726391895568,
    14.08014368859455,
    15.17413642007382,
    16.18025080630547,
    17.2200771904748,
    18.25423565208579,
    19.07272679659623,
    20.45492212382793,
    21.44072871531024,
    22.53225606059556,
    23.58942200664093,
    24.68886685057051,
    26.86579718386571,
    27.96432995023516,
    29.07589813787308];


// NEATBrain Global Vars 

const NUM_MODES = MODES_L.length;
var STEREO_INSTRUMENT = false;
if (isDefined(MODES_R))
{
	STEREO_INSTRUMENT = true;
}

// Hyperparameters

reg pitchOffsetL = 0.00;
reg pitchOffsetR = 0.00;

const GROUP_FILTER_CUTOFF = 1200;
const MODE_INDIVIDUAL_RANDOM = 0.1;
const MODE_GROUP_RANDOM = 20;

const MODE_ATTACK = 30;
const MODE_DECAY = 19999;
const MODE_SUSTAIN = -100;
const MODE_RELEASE = 500;
const MODE_ADHSR_RANDOM = .25;
const MODE_HARMONIC_VELOCITY = .07;

const MODE_GAIN_GROUP = Engine.getGainFactorForDecibels(-3);
const MODE_GAIN_BASE = -24;
reg MODE_GAIN_COEFFICIENT = 1.9; // connect to slider, larger value = quieter harmonics
reg MODE_DECAY_COEFFICIENT = .03; // connect to slider, larger value = faster harmonic falloff

const MODE_ATTACK_RANDOM = .1; 
const MODE_DECAY_RANDOM = .1; 

const MODE_PITCH_DRIFT = .13;
const MODE_PITCH_ATTACK = 20;
const MODE_PITCH_DECAY = 2000;
const MODE_PITCH_SUSTAIN = -100;
const MODE_PITCH_RELEASE = 200;
const MODE_PITCH_ATTACK_VELOCITY = .2;

// Build Module Tree

switch(MODULE_BUILD_MODE)
{
	case 0:
		return;

	case 1:
		CLEAR_MODULE_TREE(false);
		break;

	case 2:
		CLEAR_MODULE_TREE(true);
		break;

	case 3:
		REBUILD_MODULE_TREE();
		break;

	case 4:
		REBUILD_MODES(NUM_MODES, "Left");
		if (STEREO_INSTRUMENT)
			REBUILD_MODES(NUM_MODES, "Right");
		break;

	case 5:
		GET_MODAL_SYNTH_REFERENCES("Left");
		if (STEREO_INSTRUMENT)
			GET_MODAL_SYNTH_REFERENCES("Right");
		break;
}

// Interface

// Keyboard





function onNoteOn()
{
	// Randomize Modal Ratios	
	
	pitchOffsetL = Math.randInt(-MODE_GROUP_RANDOM, MODE_GROUP_RANDOM) / 100;
	pitchOffsetR = Math.randInt(-MODE_GROUP_RANDOM, MODE_GROUP_RANDOM) / 100;
	
	Console.print(pitchOffsetL);
	Console.print(pitchOffsetR);

	if (constantsL.length > 0)
		for (i=0; i<constantsL.length; i++)
		{
			constantsL[i].setIntensity(pitchOffsetL);
		}
	if (constantsR.length > 0)
		for (i=0; i<constantsR.length; i++)
		{
			constantsR[i].setIntensity(pitchOffsetR);
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
 