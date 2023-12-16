// Build Module Tree

const builder = Synth.createBuilder();

const BASE_MODULES = {
	"rhapsody" : ["masterGain", 
	"Global Modulator Container0", 
	"Container0"],
	"samplers" : ["samplerResidueL", 
	"samplerReleaseL",
	"samplerNoiseL",
	"samplerResidueR",
	"samplerReleaseR",
	"samplerNoiseR"],
	"sampleMaps" : ["sampleMapLeft",
		undefined,
		undefined,
		"sampleMapRight",
		undefined,
		undefined]
};


inline function CLEAR_MODULE_TREE(clearAllModules)
{
	if (clearAllModules)
	{
		builder.clear();
		builder.flush();
	}
	else
	{
		local groupLref = builder.getExisting("Group_L");
		local groupRref = builder.getExisting("Group_R");

		builder.clearChildren(groupLref, builder.ChainIndexes.Direct);
		builder.clearChildren(groupRref, builder.ChainIndexes.Direct);
		builder.flush();
	}	
}

inline function REBUILD_MODULE_TREE()
{
	// Reconstruct Rhapsody Defaults	
	
	local masterGain = builder.create(builder.Effects.SimpleGain, "masterGain", 0, builder.ChainIndexes.FX);
	local globalModulatorContainer0 = builder.create(builder.SoundGenerators.GlobalModulatorContainer, "Global Modulator Container0", 0, builder.ChainIndexes.Direct);
	local container0 = builder.create(builder.SoundGenerators.SynthChain, "Container0", 0, builder.ChainIndexes.Direct);
		
	// Create Samplers

	for (i=0; i<BASE_MODULES.samplers.length; i++)
	{
		local sampler = builder.create(builder.SoundGenerators.StreamingSampler, BASE_MODULES.samplers[i], 0, builder.ChainIndexes.Direct);
		builder.clearChildren(sampler, builder.ChainIndexes.Gain);
		local samplerAHDSR = builder.create(builder.Modulators.AHDSR, BASE_MODULES.samplers[i] + "_AHDSR", sampler, builder.ChainIndexes.Gain);

		local asSampler = builder.get(sampler, builder.InterfaceTypes.Sampler);
		local asSynth = builder.get(sampler, builder.InterfaceTypes.ChildSynth);
		
		asSynth.setAttribute(asSynth.PitchTracking, 0);
		asSynth.setAttribute(asSynth.Gain, 1);

		// Panning 

		if (STEREO_INSTRUMENT)		
		{	
			if (i<3)
				asSynth.setAttribute(asSynth.Balance, -100);
			else 
				asSynth.setAttribute(asSynth.Balance, 100);
		}

		// Load Sample Maps

		if (BASE_MODULES.sampleMaps[i] != undefined)
			asSampler.loadSampleMap(BASE_MODULES.sampleMaps[i]); 
	}

	// Create Mode Groups

	for (i=0; i<2; i++)
	{
		local groupName = (i==0) ? "Group_L" : "Group_R";
		local group = builder.create(builder.SoundGenerators.SynthChain, groupName, 0, builder.ChainIndexes.Direct);
		local filter = builder.create(builder.Effects.PolyphonicFilter, groupName + "_Filter", group, builder.ChainIndexes.FX);
		local filterref = builder.get(filter, builder.InterfaceTypes.Effect);
		filterref.setAttribute(filterref.Frequency, GROUP_FILTER_CUTOFF);
	}

	builder.flush();
}

inline function REBUILD_MODES(numModes, channel)
{	
	// Create Synth Groups	
		
	local name = (channel == "Left") ? "Mode_L" : "Mode_R";	
	local modes = (channel == "Left") ? MODES_L : MODES_R;	
	local groupName = (channel == "Left") ? "Group_L" : "Group_R";
	
	local container = builder.getExisting(groupName);

	for (i=0; i<numModes; i++)
	{
		/* Create Modules */

		local synth = builder.create("SineSynth", name + "_" + i, container, builder.ChainIndexes.Direct);
		builder.clearChildren(synth, builder.ChainIndexes.Gain);
		local synthAHDSR = builder.create(builder.Modulators.AHDSR, name + "_" + i + "_AHDSR", synth, builder.ChainIndexes.Gain);
		local synthAHDSRAttackRandom = builder.create(builder.Modulators.Random, name + "_" + i + "_AHDSRAttackRandom", synthAHDSR, 1); 
		local synthAHDSRDecayRandom = builder.create(builder.Modulators.Random, name + "_" + i + "_AHDSRDecayRandom", synthAHDSR, 2); 
		local synthAHDSRDecayFalloff = builder.create(builder.Modulators.Constant, name + "_" + i + "_AHDSRDecayFalloff", synthAHDSR, 2);
		local synthVelocity = builder.create(builder.Modulators.Velocity, name + "_" + i + "_HarmonicVelocity", synth, builder.ChainIndexes.Gain);
		local synthPitchConstant = builder.create(builder.Modulators.Constant, name + "_" + i + "_Constant", synth, builder.ChainIndexes.Pitch);
		local synthPitchDrift = builder.create(builder.Modulators.AHDSR, name + "_" + i + "_Drift", synth, builder.ChainIndexes.Pitch);
		local synthPitchRandom = builder.create(builder.Modulators.Random, name + "_" + i + "_Random", synth, builder.ChainIndexes.Pitch);
		local synthPitchVelocity = builder.create(builder.Modulators.Velocity, name + "_" + i + "_Velocity", synthPitchDrift, 1); // attack level		
		local synthPitchWheel = builder.create(builder.Modulators.PitchWheel, name+"_" +i + "_PitchWheel", synth, builder.ChainIndexes.Pitch);				

				
		/* Instantiate Values */			

		local synthRef = builder.get(synth, builder.InterfaceTypes.ChildSynth);

		// Panning
		if (channel == "Left" && STEREO_INSTRUMENT)
			synthRef.setAttribute(synthRef.Balance, -100);
		if (channel == "Right" && STEREO_INSTRUMENT)
			synthRef.setAttribute(synthRef.Balance, 100);

		// Base Sine Wave Generator
		local falloff = Engine.getGainFactorForDecibels(MODE_GAIN_BASE - (MODE_GAIN_COEFFICIENT * i));
		synthRef.setAttribute(synthRef.Gain, falloff);
		synthRef.setAttribute(synthRef.UseFreqRatio, 1);

		// Scale Mode if Ratio > 16
		local scaledMode = (modes[i] > 16) ? modes[i] / 2 : modes[i];
		synthRef.setAttribute(synthRef.CoarseFreqRatio, Math.floor(scaledMode));
		synthRef.setAttribute(synthRef.FineFreqRatio, scaledMode - Math.floor(scaledMode));

		if (modes[i] > 16)
		{
			local octaveConstant = builder.create(builder.Modulators.Constant, name + "_" + i + "_Octave", synth, builder.ChainIndexes.Pitch);
			local octaveConstantref = builder.get(octaveConstant, builder.InterfaceTypes.Modulator);
			octaveConstantref.setIntensity(12);
		}

		// AHDSR
		local synthAHDSRref = builder.get(synthAHDSR, builder.InterfaceTypes.Modulator);
		local synthAHDSRAttackRandomref = builder.get(synthAHDSRAttackRandom, builder.InterfaceTypes.Modulator);
		local synthAHDSRDecayRandomref = builder.get(synthAHDSRDecayRandom, builder.InterfaceTypes.Modulator);
		local synthAHDSRDecayFalloffref = builder.get(synthAHDSRDecayFalloff, builder.InterfaceTypes.Modulator);

		synthAHDSRref.setAttribute(synthAHDSRref.Attack, MODE_ATTACK);
		synthAHDSRref.setAttribute(synthAHDSRref.Decay, MODE_DECAY);
		synthAHDSRref.setAttribute(synthAHDSRref.Sustain, MODE_SUSTAIN);
		synthAHDSRref.setAttribute(synthAHDSRref.Release, MODE_RELEASE);

		synthAHDSRAttackRandomref.setIntensity(MODE_ADHSR_RANDOM);
		synthAHDSRDecayRandomref.setIntensity(MODE_ADHSR_RANDOM);
		synthAHDSRDecayFalloffref.setIntensity(1.0 - (MODE_DECAY_COEFFICIENT * i));

		// Pitch Constant (OnNote)
		local synthPitchConstantref = builder.get(synthPitchConstant, builder.InterfaceTypes.Modulator);

		// Velocity
		local synthVelocityref = builder.get(synthVelocity, builder.InterfaceTypes.Modulator);
		synthVelocityref.setIntensity(MODE_HARMONIC_VELOCITY * i);

		// Pitch Drift
		local synthPitchDriftref = builder.get(synthPitchDrift, builder.InterfaceTypes.Modulator);
		synthPitchDriftref.setIntensity(MODE_PITCH_DRIFT);
		synthPitchDriftref.setAttribute(synthPitchDriftref.Attack, MODE_PITCH_ATTACK);
		synthPitchDriftref.setAttribute(synthPitchDriftref.Decay, MODE_PITCH_DECAY);
		synthPitchDriftref.setAttribute(synthPitchDriftref.Sustain, MODE_PITCH_SUSTAIN);
		synthPitchDriftref.setAttribute(synthPitchDriftref.Release, MODE_PITCH_RELEASE);

		// Pitch Random
		local synthPitchRandomref = builder.get(synthPitchRandom, builder.InterfaceTypes.Modulator);
		synthPitchRandomref.setIntensity(MODE_INDIVIDUAL_RANDOM);

		// Pitch Velocity
		local synthPitchVelocityref = builder.get(synthPitchVelocity, builder.InterfaceTypes.Modulator);
		synthPitchVelocityref.setIntensity(MODE_PITCH_ATTACK_VELOCITY);
		
	}
			
	builder.flush();
}



// Overtone DSP

const overtonesDSP = "330.3ocYQ0zSBDCDcJX0vZh+F3HlPLveAX0HGD2vhDuV5NJMzsyl1tfqFu6+ZsEVhlX6k4Mya95MYVRhNGYA1YKapPfkvykVUk+tmgYo.6J9i6PqmLnKMOClzTIbNr.XrtG4Aru38eo1H8JxzuxhUBKtjxzhlANQYkFWH73v9q0jbat5c75jOR5k7YxeS5vPLIxXfbivXPs6+zHyTx3sjdfotbMZG1emPW+a8.142Vn7jM2G5nCXcmPEM4an8lfMeLrR4Tq03QPNoon0H.ltQoKxNoDN.fETsWYd8Ag2pdCX740k4TsUhSamtfOVGHl5A7nHN.gbzTb.7c30FbbDyZCN9TPHtLnwG7OG86I61PiYrVaf0Ip9WxuWXKIiR5fUn0EjAfcAezMgO.OMKU3EwrZqUXGpBGKUb4Yo3NkDOdT6wSQ2VOUAvOPqhQIV";

inline function CREATE_OVERTONE_FX() // fix later revert to regular ScriptFX
{
	/*
	local scriptFX = builder.create(builder.Effects.ScriptFX, "overtonesFX", 0, builder.ChainIndexes.FX);
	
	builder.get(scriptFX, builder.InterfaceTypes.Effect).restoreState(overtonesDSP);
	
	builder.flush();
	*/
}

function GET_MODAL_SYNTH_REFERENCES(channel)
{
	// Rhapsody Modules
	
	rhapsodyModules.push(Synth.getEffect("masterGain"));
	rhapsodyModules.push(Synth.getChildSynth("Global Modulator Container0"));
	rhapsodyModules.push(Synth.getChildSynth("Container0"));	
	
	if (channel == "Left")
	{
		samplers.push(Synth.getChildSynth("samplerResidueL"));
		for (i=0; i<NUM_MODES; i++)
		{
			modesL.push(Synth.getChildSynth("Mode_L_"+ i));	
			ahdsrsL.push(Synth.getModulator("Mode_L_" + i + "_AHDSR"));
			decayFalloffsL.push(Synth.getModulator("Mode_L_" + i + "_AHDSRDecayFalloff"));
			constantsL.push(Synth.getModulator("Mode_L_" + i + "_Constant"));
			driftsL.push(Synth.getModulator("Mode_L_" + i + "_Drift"));
			randomsL.push(Synth.getModulator("Mode_L_" + i + "_Random"));
			velocitiesL.push(Synth.getModulator("Mode_L_" + i + "_Velocity"));				
		}	
	}
	else
	{
		samplers.push(Synth.getChildSynth("samplerResidueR"));
		for (i=0; i<NUM_MODES; i++)
		{
			modesR.push(Synth.getChildSynth("Mode_R_"+i));	
			ahdsrsR.push(Synth.getModulator("Mode_R_" + i + "_AHDSR"));
			decayFalloffsR.push(Synth.getModulator("Mode_R_" + i + "_Constant"));
			constantsR.push(Synth.getModulator("Mode_R_" + i + "_Constant"));
			driftsR.push(Synth.getModulator("Mode_R_" + i + "_Drift"));
			randomsR.push(Synth.getModulator("Mode_R_" + i + "_Random"));
			velocitiesR.push(Synth.getModulator("Mode_R_" + i + "_Velocity"));	
		}
	}	
}