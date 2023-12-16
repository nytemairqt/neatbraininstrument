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
		local synth_GAIN_AHDSR = builder.create(builder.Modulators.AHDSR, name + "_" + i + "_GAIN_AHDSR", synth, builder.ChainIndexes.Gain);
		local synth_GAIN_AHDSRAttackRandom = builder.create(builder.Modulators.Random, name + "_" + i + "_GAIN_AHDSRAttackRandom", synth_GAIN_AHDSR, 1); 
		local synth_GAIN_AHDSRDecayRandom = builder.create(builder.Modulators.Random, name + "_" + i + "_GAIN_AHDSRDecayRandom", synth_GAIN_AHDSR, 2); 
		local synth_GAIN_AHDSRDecayFalloff = builder.create(builder.Modulators.Constant, name + "_" + i + "_GAIN_AHDSRDecayFalloff", synth_GAIN_AHDSR, 2);
		local synth_GAIN_Velocity = builder.create(builder.Modulators.Velocity, name + "_" + i + "_GAIN_Velocity", synth, builder.ChainIndexes.Gain);
		local synth_PITCH_Constant = builder.create(builder.Modulators.Constant, name + "_" + i + "_PITCH_Constant", synth, builder.ChainIndexes.Pitch);
		local synth_PITCH_Drift = builder.create(builder.Modulators.AHDSR, name + "_" + i + "_PITCH_Drift", synth, builder.ChainIndexes.Pitch);
		local synth_PITCH_Random = builder.create(builder.Modulators.Random, name + "_" + i + "_PITCH_Random", synth, builder.ChainIndexes.Pitch);
		local synth_PITCH_DriftVelocity = builder.create(builder.Modulators.Velocity, name + "_" + i + "_PITCH_DriftVelocity", synth_PITCH_Drift, 1); // attack level		
		local synth_PITCH_PitchWheel = builder.create(builder.Modulators.PitchWheel, name+"_" +i + "_PITCH_PitchWheel", synth, builder.ChainIndexes.Pitch);				
				
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
			local octaveConstant = builder.create(builder.Modulators.Constant, name + "_" + i + "_PITCH_OctaveConstant", synth, builder.ChainIndexes.Pitch);
			local octaveConstantref = builder.get(octaveConstant, builder.InterfaceTypes.Modulator);
			octaveConstantref.setIntensity(12);
		}

		// AHDSR
		local synth_GAIN_AHDSRref = builder.get(synth_GAIN_AHDSR, builder.InterfaceTypes.Modulator);
		local synth_GAIN_AHDSRAttackRandomref = builder.get(synth_GAIN_AHDSRAttackRandom, builder.InterfaceTypes.Modulator);
		local synth_GAIN_AHDSRDecayRandomref = builder.get(synth_GAIN_AHDSRDecayRandom, builder.InterfaceTypes.Modulator);
		local synth_GAIN_AHDSRDecayFalloffref = builder.get(synth_GAIN_AHDSRDecayFalloff, builder.InterfaceTypes.Modulator);

		synth_GAIN_AHDSRref.setAttribute(synth_GAIN_AHDSRref.Attack, MODE_ATTACK);
		synth_GAIN_AHDSRref.setAttribute(synth_GAIN_AHDSRref.Decay, MODE_DECAY);
		synth_GAIN_AHDSRref.setAttribute(synth_GAIN_AHDSRref.Sustain, MODE_SUSTAIN);
		synth_GAIN_AHDSRref.setAttribute(synth_GAIN_AHDSRref.Release, MODE_RELEASE);

		synth_GAIN_AHDSRAttackRandomref.setIntensity(MODE_ADHSR_RANDOM);
		synth_GAIN_AHDSRDecayRandomref.setIntensity(MODE_ADHSR_RANDOM);
		synth_GAIN_AHDSRDecayFalloffref.setIntensity(1.0 - (MODE_DECAY_COEFFICIENT * i));

		// Velocity
		local synth_GAIN_Velocityref = builder.get(synth_GAIN_Velocity, builder.InterfaceTypes.Modulator);
		synth_GAIN_Velocityref.setIntensity(MODE_HARMONIC_VELOCITY * i);

		// Pitch Constant (OnNote)
		local synth_PITCH_Constantref = builder.get(synth_PITCH_Constant, builder.InterfaceTypes.Modulator);		

		// Pitch Drift
		local synth_PITCH_Driftref = builder.get(synth_PITCH_Drift, builder.InterfaceTypes.Modulator);
		synth_PITCH_Driftref.setIntensity(MODE_PITCH_DRIFT);
		synth_PITCH_Driftref.setAttribute(synth_PITCH_Driftref.Attack, MODE_PITCH_ATTACK);
		synth_PITCH_Driftref.setAttribute(synth_PITCH_Driftref.Decay, MODE_PITCH_DECAY);
		synth_PITCH_Driftref.setAttribute(synth_PITCH_Driftref.Sustain, MODE_PITCH_SUSTAIN);
		synth_PITCH_Driftref.setAttribute(synth_PITCH_Driftref.Release, MODE_PITCH_RELEASE);

		// Pitch Velocity
		local synth_PITCH_DriftVelocityref = builder.get(synth_PITCH_DriftVelocity, builder.InterfaceTypes.Modulator);
		synth_PITCH_DriftVelocityref.setIntensity(MODE_PITCH_ATTACK_VELOCITY);		

		// Pitch Random
		local synth_PITCH_Randomref = builder.get(synth_PITCH_Random, builder.InterfaceTypes.Modulator);
		synth_PITCH_Randomref.setIntensity(MODE_INDIVIDUAL_RANDOM);
		
	}
			
	builder.flush();
}

inline function UPDATE_MODE_VALUES(channel)
{
	// Create Synth Groups	

	GET_MODAL_SYNTH_REFERENCES(channel);
		
	local name = (channel == "Left") ? "Mode_L" : "Mode_R";	
	local modes = (channel == "Left") ? MODES_L : MODES_R;	
	local groupName = (channel == "Left") ? "Group_L" : "Group_R";

	local group = Synth.getChildSynth(groupName);
	local groupFilter = Synth.getEffect(groupName + "_Filter");
	groupFilter.setAttribute(groupFilter.Frequency, GROUP_FILTER_CUTOFF);

	if (modesL.length == 0)
	{
		Console.print("Modes Modules not found, aborting...");
		return;
	}

	for (i=0; i<modesL.length; i++)
	{
		local synthRef = (channel == "Left") ? modesL[i] : modesR[i];

		// Pan
		if (STEREO_INSTRUMENT && channel == "Left")
			synthRef.setAttribute(synthRef.Balance, -100);
		if (STEREO_INSTRUMENT && channel == "Right")
			synthRef.setAttribute(synthRef.Balance, 100);

		// Harmonic Falloff
		local falloff = Engine.getGainFactorForDecibels(MODE_GAIN_BASE - (MODE_GAIN_COEFFICIENT * i));
		synthRef.setAttribute(synthRef.Gain, falloff);
		synthRef.setAttribute(synthRef.UseFreqRatio, 1);

		// GAIN

		local synth_GAIN_AHDSRref = Synth.getModulator(name + "_" + i + "_GAIN_AHDSR");
		local synth_GAIN_AHDSRAttackRandomref = Synth.getModulator(name + "_" + i + "_GAIN_AHDSRAttackRandom");
		local synth_GAIN_AHDSRDecayRandomref = Synth.getModulator(name + "_" + i + "_GAIN_AHDSRDecayRandom");
		local synth_GAIN_AHDSRDecayFalloffref = Synth.getModulator(name + "_" + i + "_GAIN_AHDSRDecayFalloff");

		synth_GAIN_AHDSRref.setAttribute(synth_GAIN_AHDSRref.Attack, MODE_ATTACK);
		synth_GAIN_AHDSRref.setAttribute(synth_GAIN_AHDSRref.Decay, MODE_DECAY);
		synth_GAIN_AHDSRref.setAttribute(synth_GAIN_AHDSRref.Sustain, MODE_SUSTAIN);
		synth_GAIN_AHDSRref.setAttribute(synth_GAIN_AHDSRref.Release, MODE_RELEASE);

		synth_GAIN_AHDSRAttackRandomref.setIntensity(MODE_ADHSR_RANDOM);
		synth_GAIN_AHDSRDecayRandomref.setIntensity(MODE_ADHSR_RANDOM);
		synth_GAIN_AHDSRDecayFalloffref.setIntensity(1.0 - (MODE_DECAY_COEFFICIENT * i));

		local synth_GAIN_Velocityref = Synth.getModulator(name + "_" + i + "_GAIN_Velocity");
		synth_GAIN_Velocityref.setIntensity(MODE_HARMONIC_VELOCITY * i);

		// PITCH

		local synth_PITCH_Constantref = Synth.getModulator(name + "_" + i + "_PITCH_Constant");

		local synth_PITCH_Driftref = Synth.getModulator(name + "_" + i + "_PITCH_Drift");
		synth_PITCH_Driftref.setIntensity(MODE_PITCH_DRIFT);
		synth_PITCH_Driftref.setAttribute(synth_PITCH_Driftref.Attack, MODE_PITCH_ATTACK);
		synth_PITCH_Driftref.setAttribute(synth_PITCH_Driftref.Decay, MODE_PITCH_DECAY);
		synth_PITCH_Driftref.setAttribute(synth_PITCH_Driftref.Sustain, MODE_PITCH_SUSTAIN);
		synth_PITCH_Driftref.setAttribute(synth_PITCH_Driftref.Release, MODE_PITCH_RELEASE);

		local synth_PITCH_DriftVelocityref = Synth.getModulator(name + "_" + i + "_PITCH_DriftVelocity");
		synth_PITCH_DriftVelocityref.setIntensity(MODE_PITCH_ATTACK_VELOCITY);

		local synth_PITCH_Randomref = Synth.getModulator(name + "_" + i + "_PITCH_Random");
		synth_PITCH_Randomref.setIntensity(MODE_INDIVIDUAL_RANDOM);			
	}
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
			modesL_GAIN_AHDSRs.push(Synth.getModulator("Mode_L_" + i + "_GAIN_AHDSR"));
			modesL_GAIN_AHDSRsAttackRandoms.push(Synth.getModulator("Mode_L_" + i + "_GAIN_AHDSRAttackRandom"));
			modesL_GAIN_AHDSRsDecayRandoms.push(Synth.getModulator("Mode_L_" + i + "_GAIN_AHDSRDecayRandom"));
			modesL_GAIN_AHDSRsDecayFalloffs.push(Synth.getModulator("Mode_L_" + i + "_GAIN_AHDSRDecayFalloff"));
			modesL_GAIN_Velocities.push(Synth.getModulator("Mode_L_" + i + "_GAIN_Velocity"));

			modesL_PITCH_Constants.push(Synth.getModulator("Mode_L_" + i + "_PITCH_Constant"));
			modesL_PITCH_Drifts.push(Synth.getModulator("Mode_L_" + i + "_PITCH_Drift"));
			modesL_PITCH_DriftsVelocities.push(Synth.getModulator("Mode_L_" + i + "_PITCH_DriftVelocity"));
			modesL_PITCH_Randoms.push(Synth.getModulator("Mode_L_" + i + "_PITCH_Random"));
			modesL_PITCH_PitchWheels.push(Synth.getModulator("Mode_L_" + i + "_PITCH_PitchWheel"));
		}	
	}
	else
	{
		samplers.push(Synth.getChildSynth("samplerResidueR"));
		for (i=0; i<NUM_MODES; i++)
		{
			modesR.push(Synth.getChildSynth("Mode_R_"+ i));	
			modesR_GAIN_AHDSRs.push(Synth.getModulator("Mode_R_" + i + "_GAIN_AHDSR"));
			modesR_GAIN_AHDSRsAttackRandoms.push(Synth.getModulator("Mode_R_" + i + "_GAIN_AHDSRAttackRandom"));
			modesR_GAIN_AHDSRsDecayRandoms.push(Synth.getModulator("Mode_R_" + i + "_GAIN_AHDSRDecayRandom"));
			modesR_GAIN_AHDSRsDecayFalloffs.push(Synth.getModulator("Mode_R_" + i + "_GAIN_AHDSRDecayFalloff"));
			modesR_GAIN_Velocities.push(Synth.getModulator("Mode_R_" + i + "_GAIN_Velocity"));

			modesR_PITCH_Constants.push(Synth.getModulator("Mode_R_" + i + "_PITCH_Constant"));
			modesR_PITCH_Drifts.push(Synth.getModulator("Mode_R_" + i + "_PITCH_Drift"));
			modesR_PITCH_DriftsVelocities.push(Synth.getModulator("Mode_R_" + i + "_PITCH_DriftVelocity"));
			modesR_PITCH_Randoms.push(Synth.getModulator("Mode_R_" + i + "_PITCH_Random"));
			modesR_PITCH_PitchWheels.push(Synth.getModulator("Mode_R_" + i + "_PITCH_PitchWheel"));
		}
	}	
}


inline function START_BUILDER()
{
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
			UPDATE_MODE_VALUES("Left");
			if (STEREO_INSTRUMENT)
				UPDATE_MODE_VALUES("RIGHT");
			
		case 6: 
			GET_MODAL_SYNTH_REFERENCES("Left");
			if (STEREO_INSTRUMENT)
				GET_MODAL_SYNTH_REFERENCES("Right");
			break;
	}
}

