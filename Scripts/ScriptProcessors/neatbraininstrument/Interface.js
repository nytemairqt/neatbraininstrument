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

const NUM_MODES = 6;
const STEREO_INSTRUMENT = false;
const BUILD_MODULE_TREE = true; /* set to false when exporting*/

const DATA_L = {
	"object" : SynthGroupLeft,
	"attack" : 5,
	"decay" : 5000,
	"sustain" : -100,
	"release" : 15000,
	"filter" : 1000,
	"Q" : .5,
	"filterAttack" : 5,
	"filterDecay" : 2500,
	"filterSustain" : -100,
	"filterRelease" : 5000,
	"ratios" : [1.0, 1.83829594498603, 3.26433619017115, 4.600857033422893, 6.404116475251082, 19.67718441824997]
}

const DATA_R = {
	"object" : SynthGroupRight,
	"attack" : 10,
	"decay" : 5645,
	"sustain" : -60,
	"release" : 1000,
	"filter" : 3000,
	"Q" : .2,
	"filterAttack" : 150,
	"filterDecay" : 126,
	"filterSustain" : -11,
	"filterRelease" : 583,
	"ratios" : [2.0, 2.83829594498603, 2.26433619017115, 2.600857033422893, 2.404116475251082, 2.67718441824997]
}

// Build Module Tree

const var builder = Synth.createBuilder();

inline function CREATE_MODAL_SYNTH(numModes, channel)
{
	// Create Synth Groups

	local groupName = (channel == "Left") ? "SynthGroupLeft" : "SynthGroupRight";
	local name = (channel == "Left") ? "Mode_L" : "Mode_R";	
	
	local synthGroup = builder.create("SynthGroup", groupName, 0, builder.ChainIndexes.Direct);
	builder.clearChildren(synthGroup, builder.ChainIndexes.Gain);
	local synthGroupAHDSR = builder.create(builder.Modulators.AHDSR, groupName + "_AHDSR", synthGroup, builder.ChainIndexes.Gain);
	local synthGroupFilter = builder.create(builder.Effects.PolyphonicFilter, groupName + "_Filter", synthGroup, builder.ChainIndexes.FX);
	local synthGroupFilter_AHDSR = builder.create(builder.Modulators.AHDSR, groupName + "_FilterAHDSR", synthGroupFilter, 0);
		
	// Create Individual Sine Generators
	
	for (i=0; i<numModes; i++)
	{
		local synth = builder.create("SineSynth", name + "_" + i, synthGroup, builder.ChainIndexes.Direct);
		builder.clearChildren(synth, builder.ChainIndexes.Gain);
		local synthAHDSR = builder.create(builder.Modulators.AHDSR, name + "_" + i + "_AHDSR", synth, builder.ChainIndexes.Gain);
		local synthDrift = builder.create(builder.Modulators.AHDSR, name + "_" + i + "_Drift", synth, builder.ChainIndexes.Pitch);
		local synthRandom = builder.create(builder.Modulators.Random, name + "_" + i + "_Random", synth, builder.ChainIndexes.Pitch);
		local synthVelocity = builder.create(builder.Modulators.Velocity, name + "_" + i + "_Velocity", synthDrift, 1); // 1 is for Attack Level
	}
	
	builder.flush();
}

function GET_MODAL_SYNTH_REFERENCES(channel)
{
	if (channel == "Left")
	{
		for (i=0; i<NUM_MODES; i++)
		{
			Modes_L.push(Synth.getChildSynth("Mode_L_"+i));	
			AHDSRS_L.push(Synth.getModulator("Mode_L_"+i+"_AHDSR"));
			Drifts_L.push(Synth.getModulator("Mode_L_" + i + "_Drift"));
			Randoms_L.push(Synth.getModulator("Mode_L_" + i + "_Random"));
			Velocities_L.push(Synth.getModulator("Mode_L_" + i + "_Velocity"));		
		}	
	}
	else
	{
		for (i=0; i<NUM_MODES; i++)
		{
			Modes_R.push(Synth.getChildSynth("Mode_R_"+i));	
			AHDSRS_R.push(Synth.getModulator("Mode_R_"+i+"_AHDSR"));
			Drifts_R.push(Synth.getModulator("Mode_R_" + i + "_Drift"));
			Randoms_R.push(Synth.getModulator("Mode_R_" + i + "_Random"));
			Velocities_R.push(Synth.getModulator("Mode_R_" + i + "_Velocity"));		
		}
	}	
}

inline function SET_MODAL_SYNTH_DEFAULTS(channel)
{
	/* need to setup panning */
	
	local data = (channel == "Left") ? DATA_L : DATA_R;
	
	local group = (channel == "Left") ? SynthGroupLeft : SynthGroupRight;
	local group_AHDSR = (channel == "Left") ? SynthGroupLeft_AHDSR : SynthGroupRight_AHDSR;
	local group_Filter = (channel == "Left") ? SynthGroupLeft_Filter : SynthGroupRight_Filter;
	local group_FilterAHDSR = (channel == "Left") ? SynthGroupLeft_FilterAHDSR : SynthGroupRight_FilterAHDSR;
		
	local modes = (channel == "Left" ) ? Modes_L : Modes_R;
	local AHDSRS = (channel == "Left") ? AHDSRS_L : AHDSRS_R;
	local drifts = (channel == "Left") ? Drifts_L : Drifts_R;
	local randoms = (channel == "Left") ? Randoms_L : Randoms_R;
	local velocities = (channel == "Left") ? Velocities_L : Velocities_R;
	local ratios = (channel == "Left") ? DATA_L.ratios : DATA_R.ratios;

	
	group.setAttribute(group.Gain, .5);
	
	group_AHDSR.setAttribute(group_AHDSR.Attack, data.attack);
	group_AHDSR.setAttribute(group_AHDSR.Decay, data.decay);
	group_AHDSR.setAttribute(group_AHDSR.Sustain, data.sustain);
	group_AHDSR.setAttribute(group_AHDSR.Release, data.release);
	
	group_Filter.setAttribute(group_Filter.Frequency, data.filter);
	group_Filter.setAttribute(group_Filter.Q, data.Q);
	
	group_FilterAHDSR.setAttribute(group_FilterAHDSR.Attack, data.filterAttack);
	group_FilterAHDSR.setAttribute(group_FilterAHDSR.Decay, data.filterDecay);
	group_FilterAHDSR.setAttribute(group_FilterAHDSR.Sustain, data.filterSustain);
	group_FilterAHDSR.setAttribute(group_FilterAHDSR.Release, data.filterRelease);

	for (i=0; i<NUM_MODES; i++)
	{
		// Modes
				
		modes[i].setAttribute(modes[i].UseFreqRatio, 1);
		modes[i].setAttribute(modes[i].CoarseFreqRatio, Math.floor(data.ratios[i]));
		modes[i].setAttribute(modes[i].FineFreqRatio, ratios[i] - Math.floor(data.ratios[i]));	
		
		// AHDSRS
		
		/*temp probably*/
						
		AHDSRS[i].setAttribute(AHDSRS[i].Attack, 5);
		AHDSRS[i].setAttribute(AHDSRS[i].Decay, 2500);
		AHDSRS[i].setAttribute(AHDSRS[i].Sustain, -100);
		AHDSRS[i].setAttribute(AHDSRS[i].Release, 15000);
		
		// Drifts
							
		drifts[i].setAttribute(drifts[i].Attack, 5);
		drifts[i].setAttribute(drifts[i].Decay, 2000);
		drifts[i].setAttribute(drifts[i].Sustain, -100);
		drifts[i].setAttribute(drifts[i].Release, 200);
		
		// Randoms
		
		/*not temp*/
							
		randoms[i].setIntensity(.1);
		
		// Velocities
						
		velocities[i].setIntensity(.5);
	}
}

//************************************************************
// Build Modal Synth Module Tree

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

// COMMENT OUT IN PLUGIN VERSION AFTER SAVING

if (BUILD_MODULE_TREE)
{
	CREATE_MODAL_SYNTH(NUM_MODES, "Left");
	CREATE_MODAL_SYNTH(NUM_MODES, "Right");
}

// Get References

const SynthGroupLeft = Synth.getChildSynth("SynthGroupLeft");
const SynthGroupLeft_AHDSR = Synth.getModulator("SynthGroupLeft_AHDSR");
const SynthGroupLeft_Filter = Synth.getEffect("SynthGroupLeft_Filter");
const SynthGroupLeft_FilterAHDSR = Synth.getModulator("SynthGroupLeft_FilterAHDSR");

const SynthGroupRight = Synth.getChildSynth("SynthGroupRight");
const SynthGroupRight_AHDSR = Synth.getModulator("SynthGroupRight_AHDSR");
const SynthGroupRight_Filter = Synth.getEffect("SynthGroupRight_Filter");
const SynthGroupRight_FilterAHDSR = Synth.getModulator("SynthGroupRight_FilterAHDSR");

GET_MODAL_SYNTH_REFERENCES("Left");
GET_MODAL_SYNTH_REFERENCES("Right");

// Setup Defaults

if (BUILD_MODULE_TREE)
{
	SET_MODAL_SYNTH_DEFAULTS("Left");
	SET_MODAL_SYNTH_DEFAULTS("Right");
}

//************************************************************



// Interface

// use helper functions like the example below to keep things clean 
// assign their functionality with scripting too because manually making stuff is annoying

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
	
	/*
	for (i=0; i<ratios_l.length; i++)
	{
		ModalSynth.setAttribute(attributes[i], ratios_l[i] + (knbModalRandomizationStrength.getValue() * Math.random()));
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
 