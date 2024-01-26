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
const synthWTLeftA_fxDampen = Synth.getEffect("synthWTLeftA_fxDampen");
const synthWTLeftA_tableRandom = Synth.getModulator("synthWTLeftA_tableRandom");
const synthWTLeftA_tableEnv = Synth.getModulator("synthWTLeftA_tableEnv");



// Right Wavetables & Modulators

const synthWTRightA = Synth.getChildSynth("synthWTRightA");
const synthWTRightA_gainAHDSR = Synth.getModulator("synthWTRightA_gainAHDSR");
const synthWTRightA_gainVelocity = Synth.getModulator("synthWTRightA_gainVelocity");
const synthWTRightA_gainLFO = Synth.getModulator("synthWTRightA_gainLFO");
const synthWTRightA_gainRandom = Synth.getModulator("synthWTRightA_gainRandom");
const synthWTRightA_pitchAHDSR = Synth.getModulator("synthWTRightA_pitchAHDSR");
const synthWTRightA_pitchRandom = Synth.getModulator("synthWTRightA_pitchRandom");
const synthWTRightA_pitchLFO = Synth.getModulator("synthWTRightA_pitchLFO");
const synthWTRightA_fxDampen = Synth.getEffect("synthWTRightA_fxDampen");;
const synthWTRightA_tableRandom = Synth.getModulator("synthWTRightA_tableRandom");
const synthWTRightA_tableEnv = Synth.getModulator("synthWTRightA_tableEnv");


// Residue Samplers
const samplerResidueLeft = Synth.getChildSynth("samplerResidueLeft");
const samplerResidueRight = Synth.getChildSynth("samplerResidueRight");

const samplerResidueLeft_sampleOffset = Synth.getModulator("samplerResidueLeft_sampleOffset");
const samplerResidueRight_sampleOffset = Synth.getModulator("samplerResidueRight_sampleOffset");

// Other Samplers

const samplerReleaseLeft = Synth.getChildSynth("samplerReleaseLeft");
const samplerReleaseRight = Synth.getChildSynth("samplerReleaseRight");

// Sampler AHDSRs
const samplerResidueLeft_gainAHDSR = Synth.getModulator("samplerResidueLeft_gainAHDSR");
const samplerResidueRight_gainAHDSR = Synth.getModulator("samplerResidueRight_gainAHDSR");

// FX

const residueProfileA = Synth.getEffect("residueProfileA");
const residueProfileB = Synth.getEffect("residueProfileB");
const residueProfileC = Synth.getEffect("residueProfileC");

const synthWTLeftA_toneAdjust = Synth.getEffect("synthWTLeftA_toneAdjust");
const synthWTRightA_toneAdjust = Synth.getEffect("synthWTRightA_toneAdjust");

Engine.addModuleStateToUserPreset("synthWTLeftA_toneAdjust");
Engine.addModuleStateToUserPreset("synthWTRightA_toneAdjust");

const synthWTLeftA_chorusJ = Synth.getEffect("synthWTLeftA_chorusJ");
const synthWTRightA_chorusJ = Synth.getEffect("synthWTRightA_chorusJ");

// PALM MUTE

const synthWTLeftA_fxPalmMute = Synth.getEffect("synthWTLeftA_fxPalmMute");
const synthWTRightA_fxPalmMute = Synth.getEffect("synthWTRightA_fxPalmMute");

const var synthWTLeftA_fxPalmMuteAHDSR = Synth.getModulator("synthWTLeftA_fxPalmMuteAHDSR");
const var synthWTRightA_fxPalmMuteAHDSR = Synth.getModulator("synthWTRightA_fxPalmMuteAHDSR");


// MODULE STATES

Engine.addModuleStateToUserPreset("residueProfileA");
Engine.addModuleStateToUserPreset("residueProfileB");
Engine.addModuleStateToUserPreset("residueProfileC");
