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
const RATIOS_L = [1.0, 1.83829594498603, 3.26433619017115, 4.600857033422893, 6.404116475251082, 19.67718441824997];
const RATIOS_R = [5.0, 4.83829594498603, 3.26433619017115, 2.600857033422893, 1.404116475251082, 8.67718441824997];

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
	
	local group = (channel == "Left") ? SynthGroupLeft : SynthGroupRight;
	local group_AHDSR = (channel == "Left") ? SynthGroupLeft_AHDSR : SynthGroupRight_AHDSR;
	local group_Filter = (channel == "Left") ? SynthGroupLeft_Filter : SynthGroupRight_Filter;
	local group_FilterAHDSR = (channel == "Left") ? SynthGroupLeft_FilterAHDSR : SynthGroupRight_FilterAHDSR;
	local modes = (channel == "Left" ) ? Modes_L : Modes_R;
	local AHDSRS = (channel == "Left") ? AHDSRS_L : AHDSRS_R;
	local drifts = (channel == "Left") ? Drifts_L : Drifts_R;
	local randoms = (channel == "Left") ? Randoms_L : Randoms_R;
	local velocities = (channel == "Left") ? Velocities_L : Velocities_R;
	local ratios = (channel == "Left") ? RATIOS_L : RATIOS_R;
	
	group.setAttribute(group.Gain, .5);
	
	group_AHDSR.setAttribute(group_AHDSR.Attack, 5);
	group_AHDSR.setAttribute(group_AHDSR.Decay, 2500);
	group_AHDSR.setAttribute(group_AHDSR.Sustain, -100);
	group_AHDSR.setAttribute(group_AHDSR.Release, 15000);
	
	group_Filter.setAttribute(group_Filter.Frequency, 1000);
	group_Filter.setAttribute(group_Filter.Q, .3);
	
	group_FilterAHDSR.setAttribute(group_FilterAHDSR.Attack, 5);
	group_FilterAHDSR.setAttribute(group_FilterAHDSR.Decay, 2500);
	group_FilterAHDSR.setAttribute(group_FilterAHDSR.Sustain, -100);
	group_FilterAHDSR.setAttribute(group_FilterAHDSR.Release, 5000);

	for (i=0; i<NUM_MODES; i++)
	{
		// Modes
		
		modes[i].setAttribute(modes[i].UseFreqRatio, 1);
		modes[i].setAttribute(modes[i].CoarseFreqRatio, Math.floor(ratios[i]));
		modes[i].setAttribute(modes[i].FineFreqRatio, ratios[i] - Math.floor(ratios[i]));	
		
		// AHDSRS
						
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

CREATE_MODAL_SYNTH(NUM_MODES, "Left");
CREATE_MODAL_SYNTH(NUM_MODES, "Right");

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
SET_MODAL_SYNTH_DEFAULTS("Left");
SET_MODAL_SYNTH_DEFAULTS("Right");

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
 