namespace Builder{
		
// Build Module Tree

const var builder = Synth.createBuilder();


inline function DELETE_ALL_MODULES()
{
	builder.clear();
	builder.flush();
}

inline function CREATE_BASE_MODULES()
{
	// Reconstruct Rhapsody Defaults
	
	local masterGain = builder.create(builder.Effects.SimpleGain, "masterGain", 0, builder.ChainIndexes.FX);
	local globalModulatorContainer0 = builder.create(builder.SoundGenerators.GlobalModulatorContainer, "Global Modulator Container0", 0, builder.ChainIndexes.Direct);
	local container0 = builder.create(builder.SoundGenerators.SynthGroup, "Container0", 0, builder.ChainIndexes.Direct);
	
	// Create Samplers
	
	local samplerResidueL = builder.create(builder.SoundGenerators.StreamingSampler, "samplerResidueL", 0, builder.ChainIndexes.Direct);
	local samplerResidueR = builder.create(builder.SoundGenerators.StreamingSampler, "samplerResidueR", 0, builder.ChainIndexes.Direct);
	
	// Left
	local asSamplerL = builder.get(samplerResidueL, builder.InterfaceTypes.Sampler);	
	local asSynthL = builder.get(samplerResidueL, builder.InterfaceTypes.ChildSynth);	
	asSamplerL.loadSampleMap("sampleMapLeft");
	asSynthL.setAttribute(asSynthL.PitchTracking, 0);
	asSynthL.setAttribute(asSynthL.Gain, 1); // force gain to 0 
	if (STEREO_INSTRUMENT)
		asSynthL.setAttribute(asSynthL.Balance, -100);
	
	// Right
	local asSamplerR = builder.get(samplerResidueR, builder.InterfaceTypes.Sampler);
	local asSynthR = builder.get(samplerResidueR, builder.InterfaceTypes.ChildSynth);	
	asSamplerR.loadSampleMap("sampleMapRight");
	asSynthR.setAttribute(asSynthR.PitchTracking, 0);
	asSynthR.setAttribute(asSynthR.Gain, 1); // force gain to 0 
	if (STEREO_INSTRUMENT)
		asSynthR.setAttribute(asSynthR.Balance, 100);
}

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
			
	builder.flush();
}

// Overtone DSP

const overtonesDSPOld = "333.3ocSQ1rSBDCEE9VwYAS7gnKGhDCr13FXjDVngvfF11oyEogRuSZ6fhFdG8MR67CAZ5hd9N81dtsKrjDcNxBraWcrDAVbTlzpJ8yVCySA1ccR9r0igIGKENGV.LVuVLv9MhuoxH8JxvKsXovhqnEZwwDmXeoFWJ73Pdtlj6xTeiCh+Ite7o3qKpIBSp2QhbqvXPsqYaaHKOQxUF9Eb+.u0v0XDHMn9N9SbG+d9KB+1GD4tD2fGC7Swg40WGYlRFukzIlp84ncH+fPWcIW.K54BkmrY9Pxc.q2Dp3X1V5SSXczX3ckSkqwVQFoo5Ui.X5VktXw42SG.vRpxqLeDRjU8U3besZeFUYk3zt1IvX2.0k1nGUqCRHCMEMh+BiNyw0ZVm43ylPcyfFef+17TgW.g+lNVHKkn0qpaBVJdPIw1u39QonammJA3e.vGdYU";

//const overtonesDSP = "622.3oc0S0saSCCE1taAQiPbAZWir1UoPUUq3xIzjVKCMg.pV1P6V2jSaspicjsSYYS6Ndd3UfmEdC3MXbraJqhVI1sXkHkyu466b97XiNCrVsgP2+h5RfPiiRyLhR2oWQNaDg9rFS1oWMfbRcI2ZgbBkt2J2jV2SixzJqisjaXKTS97Rv3zJvllwknq2xFpUNP45wyy+fROI4vsy5vtr2zuKqemihiMvLldqlLnWeLlPIEJfMsRk4DZESq1tWIY5hRzT45hXRVAchuMlgmsaZH7Qw2gcdMHmAtgqqemHsSOqOEkynkC4R4Dd1hjcgiNG8GXVZfRtAtPOVxqSr7hRIbN2AcYSj5rEohaBfrc7cwrMJJrZNwmQR1btRARaHsoZCKIiITrGb2F8uJfMD.8Db01h7zxdMK4ib27d7IVLgW82yhN3fGyEeuKFe1DFZUCYSTUES.yFC0.dIzn2kKbZSpCYjkP26Dcdc5b8WU32QCHeQXESjvJiTsT6+pOgLbtPlOds9yRHjy0UNgZFBTi3ZrueppHUWYxfgMzD8QaQ7kFr66sQSRJnxCF2imlfC71zlfCVGjzrmIDZqFdgvwET9OuQpmJE4fgHPY9SiJp8ZVRfyDZ68IqOOhpOHZaUwN5zkmMh63HhnMfCGJkXQB+zjNBVJxfU2MaGMBrKb5x.5aTo3cz+M98iS5KweV85Yl0U6WJOIJDuPjmKgwZqvuze.d+5GVGT5Ende2dv2e+Ou4aGWHTaxfB90aTww1poS86uVQjoBYgE2lkmUvmgs3EQWZAVNLkWIcL6BrO3E5EP9E5P9jGEq14b8+EF9a.bz+k1A";

const overtonesDSP = "603.3ockS0raSDCD1tsKRYEhCndFY0SafnnDwwHTkZBEUg.h5lh5Uu6NIwJdsWY6szzpbimGdE3Yg2.dB.F6rKMhzKXsG7Ly27seyOdpQmCVq1PnGMacEPnwQo4FQk67qIWLgPeZiI67qGRNacE2ZgBBkd3V2jC9EMJWqrN1MbCakJ6S2.FmVA1zbtDc8F1XsxAJWedQw6U5rjS1G0I8XudPO1ftihiMvBldORF1e.FSnjBEvlWqxcBshoU6yURttrBMUtdnlj0P236iY3YeRCgGEuAYtUjK.2317eTk1su0CQ4LZ4XtTlwyWk7X5n6n+JyJCTwMvL8TIechkWVIgK4NnGKSpyWkJtKHxNwahY6jTXzblGQR9RtRARa.1bsgkjyDJ1Ct6f92FvFBfdBt5Xw5zxdEK4Cb2x97LahsK6k+ayn6HDJBeSL9sqJzplZMQUWlAlc5oA4RnQusP3zlTGVPVB8vyzEqSWp+hBuGMj7YgUjIgsFoZo1ea.gLdoPVLsc8yRHjK00NgZApSi3Vj2OVWlpqM4v3lpD8QOf3SMXOvailjTPUDL9MdZBNzaSaBNrMHoYLSvM3l5BkiKr3+rlM8Ton.LDAtkebz9iURn9IzNGQZOWcwDti2xIROVVUXRBe+fNAtQjCaeb0IZBXW4zUArMqY3ir+OE3aNzWf+30sc.qasuE+jH+CLRonnPBS0VgeD9fT+42sNnxus48c+we6c+3tudZoPsa0TxucmLN0VOeteZbPDYtPVZwYS0Ek7EHEOO5JKvJf47ZoiYWg7fuNWAEyzA7j+.YIG0p";

inline function CREATE_OVERTONE_FX()
{

	local overtonesFX = builder.create("SlotFX", "OvertonesFX", 0, builder.ChainIndexes.FX);
	local overtonesFXref = builder.get(overtonesFX, builder.InterfaceTypes.SlotFX);
	local scriptFX =  overtonesFXref.setEffect("ScriptFX");
	scriptFX.restoreState(overtonesDSP);
}

function GET_MODAL_SYNTH_REFERENCES(channel)
{
	if (Synth.getNumChildSynths() < NUM_MODES)
	{
		Console.print("Module not initialized, aborting.");
		return;
	}
	
	// Rhapsody Modules
	
	rhapsodyModules.push(Synth.getEffect("masterGain"));
	rhapsodyModules.push(Synth.getChildSynth("Global Modulator Container0"));
	rhapsodyModules.push(Synth.getChildSynth("Container0"));
	
	// Samplers
	
	samplers.push(Synth.getChildSynth("samplerResidueL"));
	samplers.push(Synth.getChildSynth("samplerResidueR"));
	
	if (channel == "Left")
	{
		for (i=0; i<NUM_MODES; i++)
		{
			modesL.push(Synth.getChildSynth("Mode_L_"+i));	
			ahdsrsL.push(Synth.getModulator("Mode_L_" + i + "_AHDSR"));
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
			ahdsrsR.push(Synth.getModulator("Mode_R_" + i + "_AHDSR"));
			driftsR.push(Synth.getModulator("Mode_R_" + i + "_Drift"));
			randomsR.push(Synth.getModulator("Mode_R_" + i + "_Random"));
			velocitiesR.push(Synth.getModulator("Mode_R_" + i + "_Velocity"));		
		}
	}	
}

} // end of namespace