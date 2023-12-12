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

const ratios_l = [1.0, 1.83829594498603, 3.26433619017115, 4.600857033422893, 6.404116475251082, 19.67718441824997];

// Build Module Tree

const var builder = Synth.createBuilder();

const modes = [];
const ahdsrs = [];
const drifts = [];
const randoms = [];
const velocities = [];

inline function CREATE_MODAL_SYNTH(numModes, synthName)
{
	// Create Synth Group First
	
	local synthGroup = builder.create("SynthGroup", "SynthGroupLeft", 0, builder.ChainIndexes.Direct);
	builder.clearChildren(synthGroup, builder.ChainIndexes.Gain);
	local synthGroupAHDSR = builder.create(builder.Modulators.AHDSR, "SynthGroupLeft_AHDSR", synthGroup, builder.ChainIndexes.Gain);
	local synthGroupFilter = builder.create(builder.Effects.PolyphonicFilter, "SynthGroupLeft_Filter", synthGroup, builder.ChainIndexes.FX);
	local synthGroupFilter_AHDSR = builder.create(builder.Modulators.AHDSR, "SynthGroupLeft_FilterAHDSR", synthGroupFilter, 0);
	
	// Create Individual Sine Generators
	
	for (i=0; i<numModes; i++)
	{
		local synth = builder.create("SineSynth", synthName + "_" + i, synthGroup, builder.ChainIndexes.Direct);
		builder.clearChildren(synth, builder.ChainIndexes.Gain);
		local synthAHDSR = builder.create(builder.Modulators.AHDSR, synthName + "_" + i + "_AHDSR", synth, builder.ChainIndexes.Gain);
		local synthDrift = builder.create(builder.Modulators.AHDSR, synthName + "_" + i + "_Drift", synth, builder.ChainIndexes.Pitch);
		local synthRandom = builder.create(builder.Modulators.Random, synthName + "_" + i + "_Random", synth, builder.ChainIndexes.Pitch);
		local synthVelocity = builder.create(builder.Modulators.Velocity, synthName + "_" + i + "_Velocity", synthDrift, 1); // 1 is for Attack Level
		
		modes.push(synth);
		ahdsrs.push(synthAHDSR);
		drifts.push(synthDrift);
		randoms.push(synthRandoms);
		velocities.push(synthVelocity);
	}	
	
	builder.flush();
}

function GET_MODAL_SYNTH_REFERENCES()
{
	for (i=0; i<NUM_MODES; i++)
	{
		Modes.push(Synth.getChildSynth("Mode_"+i));	
		AHDSRS.push(Synth.getModulator("Mode_"+i+"_AHDSR"));
		Drifts.push(Synth.getModulator("Mode_" + i + "_Drift"));
		Randoms.push(Synth.getModulator("Mode_" + i + "_Random"));
		Velocities.push(Synth.getModulator("Mode_" + i + "_Velocity"));		
	}	
}

function SET_MODAL_SYNTH_DEFAULTS()
{
	SynthGroupLeft.setAttribute(SynthGroupLeft.Gain, .5);	

	SynthGroupLeft_AHDSR.setAttribute(SynthGroupLeft_AHDSR.Attack, 5);
	SynthGroupLeft_AHDSR.setAttribute(SynthGroupLeft_AHDSR.Decay, 2500);
	SynthGroupLeft_AHDSR.setAttribute(SynthGroupLeft_AHDSR.Sustain, -100);
	SynthGroupLeft_AHDSR.setAttribute(SynthGroupLeft_AHDSR.Release, 15000);
	
	SynthGroupLeft_Filter.setAttribute(SynthGroupLeft_Filter.Frequency, 1000);
	SynthGroupLeft_Filter.setAttribute(SynthGroupLeft_Filter.Q, .3);
	
	SynthGroupLeft_FilterAHDSR.setAttribute(SynthGroupLeft_FilterAHDSR.Attack, 5);
	SynthGroupLeft_FilterAHDSR.setAttribute(SynthGroupLeft_FilterAHDSR.Decay, 2500);
	SynthGroupLeft_FilterAHDSR.setAttribute(SynthGroupLeft_FilterAHDSR.Sustain, -100);
	SynthGroupLeft_FilterAHDSR.setAttribute(SynthGroupLeft_FilterAHDSR.Release, 5000);

	for (i=0; i<NUM_MODES; i++)
	{
		// Modes
		
		Modes[i].setAttribute(Modes[i].UseFreqRatio, 1);
		Modes[i].setAttribute(Modes[i].CoarseFreqRatio, Math.floor(ratios_l[i]));
		Modes[i].setAttribute(Modes[i].FineFreqRatio, ratios_l[i] - Math.floor(ratios_l[i]));	
		
		// AHDSRS
						
		AHDSRS[i].setAttribute(AHDSRS[i].Attack, 5);
		AHDSRS[i].setAttribute(AHDSRS[i].Decay, 2500);
		AHDSRS[i].setAttribute(AHDSRS[i].Sustain, -100);
		AHDSRS[i].setAttribute(AHDSRS[i].Release, 15000);
		
		// Drifts
							
		Drifts[i].setAttribute(Drifts[i].Attack, 5);
		Drifts[i].setAttribute(Drifts[i].Decay, 2000);
		Drifts[i].setAttribute(Drifts[i].Sustain, -100);
		Drifts[i].setAttribute(Drifts[i].Release, 200);
		
		// Randoms
							
		Randoms[i].setIntensity(.1);
		
		// Velocities
						
		Velocities[i].setIntensity(.5);
	}
}

//************************************************************
// Build Modal Synth Module Tree

const Modes = [];
const AHDSRS = [];
const Drifts = [];
const Randoms = [];
const Velocities = [];

// COMMENT OUT IN PLUGIN VERSION AFTER SAVING

CREATE_MODAL_SYNTH(NUM_MODES, "Mode");

// Get References

const SynthGroupLeft = Synth.getChildSynth("SynthGroupLeft");
const SynthGroupLeft_AHDSR = Synth.getModulator("SynthGroupLeft_AHDSR");
const SynthGroupLeft_Filter = Synth.getEffect("SynthGroupLeft_Filter");
const SynthGroupLeft_FilterAHDSR = Synth.getModulator("SynthGroupLeft_FilterAHDSR");

GET_MODAL_SYNTH_REFERENCES();

// Setup Defaults
SET_MODAL_SYNTH_DEFAULTS();

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
 