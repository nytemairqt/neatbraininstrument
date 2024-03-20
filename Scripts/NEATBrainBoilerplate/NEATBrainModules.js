// NEATBrain Modules

// Left Residue
const leftRS = Synth.getChildSynth("leftRS");
const leftRS_midiProcessor = Synth.getMidiProcessor("leftRS_midiProcessor");
const leftRS_gainAHDSR = Synth.getModulator("leftRS_gainAHDSR");
const leftRS_gainVelocity = Synth.getModulator("leftRS_gainVelocity");
const leftRS_gainLFO = Synth.getModulator("leftRS_gainLFO");
const leftRS_gainRandom = Synth.getModulator("leftRS_gainRandom");
const leftRS_fxLevelAdjust = Synth.getEffect("leftRS_fxLevelAdjust");
const leftRS_fxProfileA = Synth.getEffect("leftRS_fxProfileA");
const leftRS_fxProfileB = Synth.getEffect("leftRS_fxProfileB");
const leftRS_fxProfileC = Synth.getEffect("leftRS_fxProfileC");
const leftRS_fxToneAdjust = Synth.getEffect("leftRS_fxToneAdjust");

// Left Waveguide
const leftWG = Synth.getChildSynth("leftWG");
const leftWG_midiProcessor = Synth.getMidiProcessor("leftWG_midiProcessor");
const leftWG_gainAHDSR = Synth.getModulator("leftWG_gainAHDSR");
const leftWG_gainVelocity = Synth.getModulator("leftWG_gainVelocity");
const leftWG_gainLFO = Synth.getModulator("leftWG_gainLFO");
const leftWG_gainRandom = Synth.getModulator("leftWG_gainRandom");
const leftWG_pitchAHDSR = Synth.getModulator("leftWG_pitchAHDSR");
const leftWG_pitchAHDSRVelocity = Synth.getModulator("leftWG_pitchAHDSRVelocity");
const leftWG_pitchLFO = Synth.getModulator("leftWG_pitchLFO");
const leftWG_pitchRandom = Synth.getModulator("leftWG_pitchRandom");
const leftWG_pitchBend = Synth.getModulator("leftWG_pitchBend");
const leftWG_fxMuteLogic = Synth.getEffect("leftWG_fxMuteLogic");
const leftWG_fxDampen = Synth.getEffect("leftWG_fxDampen");
const leftWG_fxKarplus = Synth.getEffect("leftWG_fxKarplus");
const leftWG_fxKarplusAHDSR = Synth.getModulator("leftWG_fxKarplusAHDSR");
const leftWG_fxLevelAdjust = Synth.getEffect("leftWG_fxLevelAdjust");
const leftWG_fxProfileA = Synth.getEffect("leftWG_fxProfileA");
const leftWG_fxProfileB = Synth.getEffect("leftWG_fxProfileB");
const leftWG_fxProfileC = Synth.getEffect("leftWG_fxProfileC");
const leftWG_fxToneAdjust = Synth.getEffect("leftWG_fxToneAdjust");




/*

const samplerWTLeft = Synth.getChildSynth("samplerWTLeft");

const samplerWTLeft_gainAHDSR = Synth.getModulator("samplerWTLeft_gainAHDSR");
const samplerWTLeft_gainVelocity = Synth.getModulator("samplerWTLeft_gainVelocity");
const samplerWTLeft_gainLFO = Synth.getModulator("samplerWTLeft_gainLFO");
const samplerWTLeft_gainRandom = Synth.getModulator("samplerWTLeft_gainRandom");

const samplerWTLeft_pitchAHDSR = Synth.getModulator("samplerWTLeft_pitchAHDSR");
const samplerWTLeft_pitchAHDSRVelocity = Synth.getModulator("samplerWTLeft_pitchAHDSRVelocity");
const samplerWTLeft_pitchLFO = Synth.getModulator("samplerWTLeft_pitchLFO");
const samplerWTLeft_pitchRandom = Synth.getModulator("samplerWTLeft_pitchRandom");
const samplerWTLeft_pitchBend = Synth.getModulator("samplerWTLeft_pitchBend");

const samplerWTLeft_fxMuteLogic = Synth.getEffect("samplerWTLeft_fxMuteLogic");
const samplerWTLeft_fxDampen = Synth.getEffect("samplerWTLeft_fxDampen");
const samplerWTLeft_fxKarplus = Synth.getEffect("samplerWTLeft_fxKarplus");
const samplerWTLeft_fxKarplusAHDSR = Synth.getModulator("samplerWTLeft_fxKarplusAHDSR");
const samplerWTLeft_fxLevelAdjust = Synth.getEffect("samplerWTLeft_fxLevelAdjust");
const samplerWTLeft_fxProfileA = Synth.getEffect("samplerWTLeft_fxProfileA");
const samplerWTLeft_fxProfileB = Synth.getEffect("samplerWTLeft_fxProfileB");
const samplerWTLeft_fxProfileC = Synth.getEffect("samplerWTLeft_fxProfileC");
const samplerWTLeft_fxToneAdjust = Synth.getEffect("samplerWTLeft_fxToneAdjust");

Engine.addModuleStateToUserPreset("samplerWTLeft_fxProfileA");
Engine.addModuleStateToUserPreset("samplerWTLeft_fxProfileB");
Engine.addModuleStateToUserPreset("samplerWTLeft_fxProfileC");

*/





// OLD Left Wavetables & Modulators

const synthWTLeftA = Synth.getChildSynth("synthWTLeftA");
const synthWTLeftA_gainAHDSR = Synth.getModulator("synthWTLeftA_gainAHDSR");
const synthWTLeftA_gainVelocity = Synth.getModulator("synthWTLeftA_gainVelocity");
const synthWTLeftA_gainLFO = Synth.getModulator("synthWTLeftA_gainLFO");
const synthWTLeftA_gainRandom = Synth.getModulator("synthWTLeftA_gainRandom");
const synthWTLeftA_pitchAHDSR = Synth.getModulator("synthWTLeftA_pitchAHDSR");
const synthWTLeftA_pitchRandom = Synth.getModulator("synthWTLeftA_pitchRandom");
const synthWTLeftA_pitchLFO = Synth.getModulator("synthWTLeftA_pitchLFO");
const synthWTLeftA_dampen = Synth.getEffect("synthWTLeftA_dampen");
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
const synthWTRightA_dampen = Synth.getEffect("synthWTRightA_dampen");
const synthWTRightA_tableRandom = Synth.getModulator("synthWTRightA_tableRandom");
const synthWTRightA_tableEnv = Synth.getModulator("synthWTRightA_tableEnv");


// Residue Samplers
//const samplerResidueLeft = Synth.getChildSynth("samplerResidueLeft");
//const samplerResidueRight = Synth.getChildSynth("samplerResidueRight");

//const samplerResidueLeft_sampleOffset = Synth.getModulator("samplerResidueLeft_sampleOffset");
//const samplerResidueRight_sampleOffset = Synth.getModulator("samplerResidueRight_sampleOffset");

// Other Samplers

const samplerReleaseLeft = Synth.getChildSynth("samplerReleaseLeft");
const samplerReleaseRight = Synth.getChildSynth("samplerReleaseRight");

// Sampler AHDSRs
//const samplerResidueLeft_gainAHDSR = Synth.getModulator("samplerResidueLeft_gainAHDSR");
//const samplerResidueRight_gainAHDSR = Synth.getModulator("samplerResidueRight_gainAHDSR");

// FX

const residueProfileA = Synth.getEffect("residueProfileA");
const residueProfileB = Synth.getEffect("residueProfileB");
const residueProfileC = Synth.getEffect("residueProfileC");

const synthWTLeftA_toneAdjust = Synth.getEffect("synthWTLeftA_toneAdjust");
const synthWTRightA_toneAdjust = Synth.getEffect("synthWTRightA_toneAdjust");

Engine.addModuleStateToUserPreset("synthWTLeftA_toneAdjust");
Engine.addModuleStateToUserPreset("synthWTRightA_toneAdjust");

const synthWTLeftA_fxChorus = Synth.getEffect("synthWTLeftA_fxChorus");
const synthWTRightA_fxChorus = Synth.getEffect("synthWTRightA_fxChorus");

// PALM MUTE
const var synthWTLeftA_muteLogic = Synth.getEffect("synthWTLeftA_muteLogic");
const var synthWTRightA_muteLogic = Synth.getEffect("synthWTRightA_muteLogic");

// MODULE STATES

Engine.addModuleStateToUserPreset("residueProfileA");
Engine.addModuleStateToUserPreset("residueProfileB");
Engine.addModuleStateToUserPreset("residueProfileC");


