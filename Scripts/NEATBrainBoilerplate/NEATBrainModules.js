// NEATBrain Modules

// Partial Synth
const synthPartials = Synth.getChildSynth("synthPartials");
const synthPartialsEQ = Synth.getEffect("synthPartialsEQ");
const ahdsrPartials = Synth.getModulator("ahdsrPartials");


// Residue Samplers
const var samplerResidueL = Synth.getChildSynth("samplerResidueL");
const var samplerResidueR = Synth.getChildSynth("samplerResidueR");

// Other Samplers

const var samplerNoiseL = Synth.getChildSynth("samplerNoiseL");
const var samplerNoiseR = Synth.getChildSynth("samplerNoiseR");

const var samplerReleaseL = Synth.getChildSynth("samplerReleaseL");
const var samplerReleaseR = Synth.getChildSynth("samplerReleaseR");