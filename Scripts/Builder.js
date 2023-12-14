// Build Module Tree

const var builder = Synth.createBuilder();

inline function CREATE_MODAL_SYNTH(numModes, channel)
{
	// Create Synth Groups

	local name = (channel == "Left") ? "Mode_L" : "Mode_R";	
	local data = (channel == "Left") ? DATA_L : DATA_R;

	for (i=0; i<numModes; i++)
	{
		/* Create Modules */

		local synth = builder.create("SineSynth", name + "_" + i, 0, builder.ChainIndexes.Direct);
		builder.clearChildren(synth, builder.ChainIndexes.Gain);
		local synthAHDSR = builder.create(builder.Modulators.AHDSR, name + "_" + i + "_AHDSR", synth, builder.ChainIndexes.Gain);
		local synthDrift = builder.create(builder.Modulators.AHDSR, name + "_" + i + "_Drift", synth, builder.ChainIndexes.Pitch);
		local synthRandom = builder.create(builder.Modulators.Random, name + "_" + i + "_Random", synth, builder.ChainIndexes.Pitch);
		local synthVelocity = builder.create(builder.Modulators.Velocity, name + "_" + i + "_Velocity", synthDrift, 1); // attack level		
		local synthPitchWheel = builder.create(builder.Modulators.PitchWheel, name+"_" +i + "_PitchWheel", synth, builder.ChainIndexes.Pitch);				
				
		/* Instantiate Values */			

		if (INITIALIZE_MODULE_DEFAULTS)
		{
			local synthRef = builder.get(synth, builder.InterfaceTypes.ChildSynth);

			if (channel == "Left" && STEREO_INSTRUMENT)
				synthRef.setAttribute(synthRef.Balance, -100);
			if (channel == "Right" && STEREO_INSTRUMENT)
				synthRef.setAttribute(synthRef.Balance, 100);

			synthRef.setAttribute(synthRef.Gain, data.gain);
			synthRef.setAttribute(synthRef.UseFreqRatio, 1);
			synthRef.setAttribute(synthRef.CoarseFreqRatio, Math.floor(data.ratios[i]));
			synthRef.setAttribute(synthRef.FineFreqRatio, data.ratios[i] - Math.floor(data.ratios[i]));

			local synthAHDSRref = builder.get(synthAHDSR, builder.InterfaceTypes.Modulator);
			local synthAHDSRcoefficient = .1;
			local synthAHDSRfalloff = data.decay * (synthAHDSRcoefficient * i);
			synthAHDSRref.setAttribute(synthAHDSRref.Attack, data.attack);
			synthAHDSRref.setAttribute(synthAHDSRref.Decay, data.decay - synthAHDSRfalloff);
			synthAHDSRref.setAttribute(synthAHDSRref.Sustain, data.sustain);
			synthAHDSRref.setAttribute(synthAHDSRref.Release, data.release);

			local synthDriftref = builder.get(synthDrift, builder.InterfaceTypes.Modulator);
			synthDriftref.setIntensity(.2);
			synthDriftref.setAttribute(synthDriftref.Attack, 5);
			synthDriftref.setAttribute(synthDriftref.Decay, 2000);
			synthDriftref.setAttribute(synthDriftref.Sustain, -100);
			synthDriftref.setAttribute(synthDriftref.Release, 200);

			local synthRandomref = builder.get(synthRandom, builder.InterfaceTypes.Modulator);
			synthRandomref.setIntensity(.07);

			local synthVelocityref = builder.get(synthVelocity, builder.InterfaceTypes.Modulator);
			synthVelocityref.setIntensity(.2);
		}
	}
			
	builder.flush();
}

function GET_MODAL_SYNTH_REFERENCES(channel)
{
	if (Synth.getNumChildSynths() < NUM_MODES)
	{
		Console.print("Module not initialized, aborting.");
		return;
	}
	
	if (channel == "Left")
	{
		for (i=0; i<NUM_MODES; i++)
		{
			modesL.push(Synth.getChildSynth("Mode_L_"+i));	
			driftsL.push(Synth.getModulator("Mode_L_" + i + "_Drift"));
			randomsL.push(Synth.getModulator("Mode_L_" + i + "_Random"));
			velocitiesL.push(Synth.getModulator("Mode_L_" + i + "_Velocity"));		
		}	
	}
	else
	{
		for (i=0; i<NUM_MODES; i++)
		{
			modesR.push(Synth.getChildSynth("Mode_R_"+i));	
			driftsR.push(Synth.getModulator("Mode_R_" + i + "_Drift"));
			randomsR.push(Synth.getModulator("Mode_R_" + i + "_Random"));
			velocitiesR.push(Synth.getModulator("Mode_R_" + i + "_Velocity"));		
		}
	}	
}