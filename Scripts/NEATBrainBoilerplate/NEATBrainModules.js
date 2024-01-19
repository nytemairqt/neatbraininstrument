// NEATBrain Modules

// Left Wavetables & Modulators

const synthWTLeftA = Synth.getChildSynth("synthWTLeftA");
const synthWTLeftA_gainAHDSR = Synth.getModulator("synthWTLeftA_gainAHDSR");
const synthWTLeftA_gainVelocity = Synth.getModulator("synthWTLeftA_gainVelocity");
const synthWTLeftA_gainLFO = Synth.getModulator("synthWTLeftA_gainLFO");
const synthWTLeftA_gainRandom = Synth.getModulator("synthWTLeftA_gainRandom");
const synthWTLeftA_pitchAHDSR = Synth.getModulator("synthWTLeftA_pitchAHDSR");
const synthWTLeftA_pitchRandom = Synth.getModulator("synthWTLeftA_pitchRandom");
const synthWTLeftA_pitchLFO = Synth.getModulator("synthWTLeftA_pitchLFO");
const synthWTLeftA_fxLowpass = Synth.getEffect("synthWTLeftA_fxLowpass");
const synthWTLeftA_fxLowpassAHDSR = Synth.getModulator("synthWTLeftA_fxLowpassAHDSR");

const synthWTLeftB = Synth.getChildSynth("synthWTLeftB");
const synthWTLeftB_gainAHDSR = Synth.getModulator("synthWTLeftB_gainAHDSR");
const synthWTLeftB_gainVelocity = Synth.getModulator("synthWTLeftB_gainVelocity");
const synthWTLeftB_gainLFO = Synth.getModulator("synthWTLeftB_gainLFO");
const synthWTLeftB_gainRandom = Synth.getModulator("synthWTLeftB_gainRandom");
const synthWTLeftB_pitchAHDSR = Synth.getModulator("synthWTLeftB_pitchAHDSR");
const synthWTLeftB_pitchRandom = Synth.getModulator("synthWTLeftB_pitchRandom");
const synthWTLeftB_pitchLFO = Synth.getModulator("synthWTLeftB_pitchLFO");
const synthWTLeftB_fxLowpass = Synth.getEffect("synthWTLeftB_fxLowpass"); // maybe move these to group
const synthWTLeftB_fxLowpassAHDSR = Synth.getModulator("synthWTLeftB_fxLowpassAHDSR"); // maybe move these to group

// Right Wavetables & Modulators

const synthWTRightA = Synth.getChildSynth("synthWTRightA");
const synthWTRightA_gainAHDSR = Synth.getModulator("synthWTRightA_gainAHDSR");
const synthWTRightA_gainVelocity = Synth.getModulator("synthWTRightA_gainVelocity");
const synthWTRightA_gainLFO = Synth.getModulator("synthWTRightA_gainLFO");
const synthWTRightA_gainRandom = Synth.getModulator("synthWTRightA_gainRandom");
const synthWTRightA_pitchAHDSR = Synth.getModulator("synthWTRightA_pitchAHDSR");
const synthWTRightA_pitchRandom = Synth.getModulator("synthWTRightA_pitchRandom");
const synthWTRightA_pitchLFO = Synth.getModulator("synthWTRightA_pitchLFO");
const synthWTRightA_fxLowpass = Synth.getEffect("synthWTRightA_fxLowpass");
const synthWTRightA_fxLowpassAHDSR = Synth.getModulator("synthWTRightA_fxLowpassAHDSR");

const synthWTRightB = Synth.getChildSynth("synthWTRightB");
const synthWTRightB_gainAHDSR = Synth.getModulator("synthWTRightB_gainAHDSR");
const synthWTRightB_gainVelocity = Synth.getModulator("synthWTRightB_gainVelocity");
const synthWTRightB_gainLFO = Synth.getModulator("synthWTRightB_gainLFO");
const synthWTRightB_gainRandom = Synth.getModulator("synthWTRightB_gainRandom");
const synthWTRightB_pitchAHDSR = Synth.getModulator("synthWTRightB_pitchAHDSR");
const synthWTRightB_pitchRandom = Synth.getModulator("synthWTRightB_pitchRandom");
const synthWTRightB_pitchLFO = Synth.getModulator("synthWTRightB_pitchLFO");
const synthWTRightB_fxLowpass = Synth.getEffect("synthWTRightB_fxLowpass");
const synthWTRightB_fxLowpassAHDSR = Synth.getModulator("synthWTRightB_fxLowpassAHDSR");




// Residue Samplers
const samplerResidueLeft = Synth.getChildSynth("samplerResidueLeft");
const samplerResidueRight = Synth.getChildSynth("samplerResidueRight");

// Other Samplers

const samplerReleaseLeft = Synth.getChildSynth("samplerReleaseLeft");
const samplerReleaseRight = Synth.getChildSynth("samplerReleaseRight");

// Sampler AHDSRs
const samplerResidueLeft_gainAHDSR = Synth.getModulator("samplerResidueLeft_gainAHDSR");
const samplerResidueRight_gainAHDSR = Synth.getModulator("samplerResidueRight_gainAHDSR");


// FX

const var synthWTLeftA_toneAdjust = Synth.getEffect("synthWTLeftA_toneAdjust");
const var synthWTRightA_toneAdjust = Synth.getEffect("synthWTRightA_toneAdjust");
const var synthWTLeftB_toneAdjust = Synth.getEffect("synthWTLeftB_toneAdjust");
const var synthWTRightB_toneAdjust = Synth.getEffect("synthWTRightB_toneAdjust");

Engine.addModuleStateToUserPreset("synthWTLeftA_toneAdjust");
Engine.addModuleStateToUserPreset("synthWTRightA_toneAdjust");
Engine.addModuleStateToUserPreset("synthWTLeftB_toneAdjust");
Engine.addModuleStateToUserPreset("synthWTRightB_toneAdjust");

const var synthWTLeftA_chorus = Synth.getEffect("synthWTLeftA_chorus");
const var synthWTRightA_chorus = Synth.getEffect("synthWTRightA_chorus");
const var synthWTLeftB_chorus = Synth.getEffect("synthWTLeftB_chorus");
const var synthWTRightB_chorus = Synth.getEffect("synthWTRightB_chorus");
