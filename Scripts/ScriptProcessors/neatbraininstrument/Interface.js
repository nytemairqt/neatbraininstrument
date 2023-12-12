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

/*DO NOT USE IN COMPILED PLUGIN*/

const var builder = Synth.createBuilder();

inline function CREATE_MODE(synthName, index)
{
	// Instantiate Sine Synth
	local synth = builder.create("SineSynth", synthName + "_" + index, 0, builder.ChainIndexes.Direct);
	
	// Remove Default Simple Envelope
	builder.clearChildren(synth, builder.ChainIndexes.Gain); 
	
	// Add the AHDSR
	local ahdsr = builder.create(builder.Modulators.AHDSR, synthName + "_" + index + "_AHDSR", synth, builder.ChainIndexes.Gain);	
		
	// Add the Pitch Modulators	
	local constant = builder.create(builder.Modulators.Constant, synthName + "_" + index + "_Constant", synth, builder.ChainIndexes.Pitch);
	local drift = builder.create(builder.Modulators.AHDSR, synthName + "_" + index + "_Drift", synth, builder.ChainIndexes.Pitch);
	local random = builder.create(builder.Modulators.Random, synthName + "_" + index + "_Random", synth, builder.ChainIndexes.Pitch);
	local velocity = builder.create(builder.Modulators.Velocity, synthName + "_" + index + "_Velocity", drift, 1); // 1 is for Attack Level
	
	return synth;

}

const modes = [];
const ahdsrs = [];
const constants = [];
const drifts = [];
const randoms = [];
const velocities = [];

inline function CREATE_MODES(numModes)
{
	for (i=0; i<numModes; i++)
	{
		local build = CREATE_MODE("Mode", i);
		local mode = Synth.getChildSynth("Mode_" + i);
		local ahdsr = Synth.getModulator("Mode_" + i + "_AHDSR");
		local constant = Synth.getModulator("Mode_" + i + "_Constant");
		local drift = Synth.getModulator("Mode_" + i + "_Drift");
		local random = Synth.getModulator("Mode_" + i + "_Random");
		local velocity = Synth.getModulator("Mode_" + i + "_Velocity");
		
		modes.push(mode);
		ahdsrs.push(ahdsr);
		constants.push(constant);
		randoms.push(random);
		drifts.push(drift);
		velocities.push(velocity);
	}
	builder.flush();
	
	// Setting Default Values
	
	for (i=0; i<numModes; i++)
	{
		// Frequency Ratio
		
		//ratios_l
		
		local floor = Math.floor(ratios_l[i]);
		
		modes[i].setAttribute(modes[i].UseFreqRatio, 1);
		modes[i].setAttribute(modes[i].CoarseFreqRatio, floor);
		modes[i].setAttribute(modes[i].FineFreqRatio, ratios_l[i] - floor);
		
		
		
		
		// AHDSR
		
		ahdsrs[i].setAttribute(ahdsrs[i].Attack, 5);
		ahdsrs[i].setAttribute(ahdsrs[i].Decay, 2000);
		ahdsrs[i].setAttribute(ahdsrs[i].Sustain, -100);
		ahdsrs[i].setAttribute(ahdsrs[i].Release, 15000);			
		
		// Constant Pitch
		
		constants[i].setIntensity(0.0);
		
		// Pitch Drift
		
		drifts[i].setAttribute(drifts[i].Attack, 5);
		drifts[i].setAttribute(drifts[i].Decay, 2000);
		drifts[i].setAttribute(drifts[i].Sustain, -100);
		drifts[i].setAttribute(drifts[i].Release, 200);
		
		// Random
		
		randoms[i].setIntensity(.1);
		
		// Velocity
		
		velocities[i].setIntensity(.5);
	}
}

//CREATE_MODES(5);

// Setup Initial Ratios

const ModalSynth = Synth.getChildSynth("ModalSynth");




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
 