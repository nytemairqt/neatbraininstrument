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
		local synthVelocity = builder.create(builder.Modulators.Velocity, name + "_" + i + "_Drift", synthDrift, 1); // attack level
		
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
			synthDriftref.setIntensity(.7);
			synthDriftref.setAttribute(synthDriftref.Attack, 5);
			synthDriftref.setAttribute(synthDriftref.Decay, 2000);
			synthDriftref.setAttribute(synthDriftref.Sustain, -100);
			synthDriftref.setAttribute(synthDriftref.Release, 200);

			local synthRandomref = builder.get(synthRandom, builder.InterfaceTypes.Modulator);
			synthRandomref.setIntensity(.1);

			local synthVelocityref = builder.get(synthVelocity, builder.InterfaceTypes.Modulator);
			synthVelocityref.setIntensity(.5);
		}
	}
			
	builder.flush();
}



inline function SET_MODAL_SYNTH_DEFAULTS(channel)
{
	local data = (channel == "Left") ? DATA_L : DATA_R;
	
	local group;
	local groupAHDSR;
	local groupFilter;
	local groupFilterAHDSR;
	
	local modes;
	local drifts;
	local randoms;
	local velocities;
	local ratios;

	group = (channel == "Left") ? SynthGroupLeft : SynthGroupRight;
	groupAHDSR = (channel == "Left") ? SynthGroupLeft_AHDSR : SynthGroupRight_AHDSR;
	groupFilter = (channel == "Left") ? SynthGroupLeft_Filter : SynthGroupRight_Filter;
	groupFilterAHDSR = (channel == "Left") ? SynthGroupLeft_FilterAHDSR : SynthGroupRight_FilterAHDSR;

	modes = (channel == "Left") ? modesL : modesR;;
	drifts = (channel == "Left") ? driftsL : driftsR;
	randoms = (channel == "Left") ? randomsL : randomsR;
	velocities = (channel == "Left") ? velocitiesL : velocitiesR;
	
	
	// Panning & Gain
	
	group.setAttribute(group.Gain, data.gain);
	
	if (STEREO_INSTRUMENT && channel == "Left")
	{
		group.setAttribute(group.Balance, -100);
	}
	if (STEREO_INSTRUMENT && channel == "Right")
	{
		group.setAttribute(group.Balance, 100);
	}
		
	// AHDSR & Filter
	
	groupAHDSR.setAttribute(groupAHDSR.Attack, data.attack);
	groupAHDSR.setAttribute(groupAHDSR.Decay, data.decay);
	groupAHDSR.setAttribute(groupAHDSR.Sustain, data.sustain);
	groupAHDSR.setAttribute(groupAHDSR.Release, data.release);
	
	groupFilter.setAttribute(groupFilter.Frequency, data.filter);
	groupFilter.setAttribute(groupFilter.Q, data.Q);
	
	groupFilterAHDSR.setAttribute(groupFilterAHDSR.Attack, data.filterAttack);
	groupFilterAHDSR.setAttribute(groupFilterAHDSR.Decay, data.filterDecay);
	groupFilterAHDSR.setAttribute(groupFilterAHDSR.Sustain, data.filterSustain);
	groupFilterAHDSR.setAttribute(groupFilterAHDSR.Release, data.filterRelease);
	
	/* Setup Modes */
	
	for (i=0; i<NUM_MODES; i++)
	{
		// Modes
		
		modes[i].setAttribute(modes[i].UseFreqRatio, 1);
		modes[i].setAttribute(modes[i].CoarseFreqRatio, Math.floor(data.ratios[i]));
		modes[i].setAttribute(modes[i].FineFreqRatio, ratios[i] - Math.floor(data.ratios[i]));
		
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