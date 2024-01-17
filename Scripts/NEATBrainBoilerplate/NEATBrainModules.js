// NEATBrain Modules

// Left Wavetable & Modulators

const synthWTLeft = Synth.getChildSynth("synthWTLeft");

const synthWTLeft_gainAHDSR = Synth.getModulator("synthWTLeft_gainAHDSR");
const synthWTLeft_gainVelocity = Synth.getModulator("synthWTLeft_gainVelocity");
const synthWTLeft_gainLFO = Synth.getModulator("synthWTLeft_gainLFO");
const synthWTLeft_gainRandom = Synth.getModulator("synthWTLeft_gainRandom");

const synthWTLeft_pitchAHDSR = Synth.getModulator("synthWTLeft_pitchAHDSR");
const synthWTLeft_pitchAHDSRVelocity = Synth.getModulator("synthWTLeft_pitchAHDSRVelocity");
const synthWTLeft_pitchRandom = Synth.getModulator("synthWTLeft_pitchRandom");
const synthWTLeft_pitchLFO = Synth.getModulator("synthWTLeft_pitchLFO");
const synthWTLeft_pitchBend = Synth.getModulator("synthWTLeft_pitchBend");

const synthWTLeft_fxLowpass = Synth.getEffect("synthWTLeft_fxLowpass");
const synthWTLeft_fxLowpassAHDSR = Synth.getModulator("synthWTLeft_fxLowpassAHDSR");

// Right Wavetable & Modulators

const synthWTRight = Synth.getChildSynth("synthWTRight");

const synthWTRight_gainAHDSR = Synth.getModulator("synthWTRight_gainAHDSR");
const synthWTRight_gainVelocity = Synth.getModulator("synthWTRight_gainVelocity");
const synthWTRight_gainLFO = Synth.getModulator("synthWTRight_gainLFO");
const synthWTRight_gainRandom = Synth.getModulator("synthWTRight_gainRandom");
const synthWTRight_pitchAHDSR = Synth.getModulator("synthWTRight_pitchAHDSR");
const synthWTRight_pitchAHDSRVelocity = Synth.getModulator("synthWTRight_pitchAHDSRVelocity");
const synthWTRight_pitchRandom = Synth.getModulator("synthWTRight_pitchRandom");
const synthWTRight_pitchLFO = Synth.getModulator("synthWTRight_pitchLFO");
const synthWTRight_pitchBend = Synth.getModulator("synthWTRight_pitchBend");
const synthWTRight_fxLowpass = Synth.getEffect("synthWTRight_fxLowpass");
const synthWTRight_fxLowpassAHDSR = Synth.getModulator("synthWTRight_fxLowpassAHDSR");




// Residue Samplers
const samplerResidueLeft = Synth.getChildSynth("samplerResidueLeft");
const samplerResidueRight = Synth.getChildSynth("samplerResidueRight");

// Other Samplers

const samplerReleaseLeft = Synth.getChildSynth("samplerReleaseLeft");
const samplerReleaseRight = Synth.getChildSynth("samplerReleaseRight");

// Sampler AHDSRs
const samplerResidueLeft_gainAHDSR = Synth.getModulator("samplerResidueLeft_gainAHDSR");
const samplerResidueRight_gainAHDSR = Synth.getModulator("samplerResidueRight_gainAHDSR");