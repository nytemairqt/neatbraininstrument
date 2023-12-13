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

	// Panning & Gain
	
	group.setAttribute(group.Gain, data.gain);
	
	if (STEREO_INSTRUMENT && channel == "Left")
		group.setAttribute(group.Balance, -100);
	if (STEREO_INSTRUMENT && channel == "Right")
		group.setAttribute(group.Balance, 100);
	
	// AHDSR & Filter
	
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
		AHDSRS[i].setAttribute(AHDSRS[i].Sustain, 0);
		AHDSRS[i].setAttribute(AHDSRS[i].Release, 1000);
		
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