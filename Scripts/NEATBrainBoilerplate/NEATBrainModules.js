/*
    Copyright 2023, 2024 iamlamprey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

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
const leftRS_fxProfileCustom = Synth.getEffect("leftRS_fxProfileCustom");
const leftRS_fxToneAdjust = Synth.getEffect("leftRS_fxToneAdjust");

Engine.addModuleStateToUserPreset("leftRS_fxProfileA");
Engine.addModuleStateToUserPreset("leftRS_fxProfileB");
Engine.addModuleStateToUserPreset("leftRS_fxProfileC");
Engine.addModuleStateToUserPreset("leftRS_fxProfileCustom");
Engine.addModuleStateToUserPreset("leftRS_fxToneAdjust");

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
const leftWG_fxLevelAdjust = Synth.getEffect("leftWG_fxLevelAdjust");
const leftWG_fxProfileA = Synth.getEffect("leftWG_fxProfileA");
const leftWG_fxProfileB = Synth.getEffect("leftWG_fxProfileB");
const leftWG_fxProfileC = Synth.getEffect("leftWG_fxProfileC");
const leftWG_fxProfileCustom = Synth.getEffect("leftWG_fxProfileCustom");
const leftWG_fxToneControl = Synth.getEffect("leftWG_fxToneControl");
const leftWG_fxToneAdjust = Synth.getEffect("leftWG_fxToneAdjust");

Engine.addModuleStateToUserPreset("leftWG_fxProfileA");
Engine.addModuleStateToUserPreset("leftWG_fxProfileB");
Engine.addModuleStateToUserPreset("leftWG_fxProfileC");
Engine.addModuleStateToUserPreset("leftWG_fxProfileCustom");
Engine.addModuleStateToUserPreset("leftWG_fxToneControl");
Engine.addModuleStateToUserPreset("leftWG_fxToneAdjust");

// Left Release
const leftRLS = Synth.getChildSynth("leftRLS");
const leftRLS_midiProcessor = Synth.getMidiProcessor("leftRLS_midiProcessor");
const leftRLS_gainAHDSR = Synth.getModulator("leftRLS_gainAHDSR");

// Right Residue
const rightRS = Synth.getChildSynth("rightRS");
const rightRS_midiProcessor = Synth.getMidiProcessor("rightRS_midiProcessor");
const rightRS_gainAHDSR = Synth.getModulator("rightRS_gainAHDSR");
const rightRS_gainVelocity = Synth.getModulator("rightRS_gainVelocity");
const rightRS_gainLFO = Synth.getModulator("rightRS_gainLFO");
const rightRS_gainRandom = Synth.getModulator("rightRS_gainRandom");
const rightRS_fxLevelAdjust = Synth.getEffect("rightRS_fxLevelAdjust");
const rightRS_fxProfileA = Synth.getEffect("rightRS_fxProfileA");
const rightRS_fxProfileB = Synth.getEffect("rightRS_fxProfileB");
const rightRS_fxProfileC = Synth.getEffect("rightRS_fxProfileC");
const rightRS_fxProfileCustom = Synth.getEffect("rightRS_fxProfileCustom");
const rightRS_fxToneAdjust = Synth.getEffect("rightRS_fxToneAdjust");

Engine.addModuleStateToUserPreset("rightRS_fxProfileA");
Engine.addModuleStateToUserPreset("rightRS_fxProfileB");
Engine.addModuleStateToUserPreset("rightRS_fxProfileC");
Engine.addModuleStateToUserPreset("rightRS_fxProfileCustom");
Engine.addModuleStateToUserPreset("rightRS_fxToneAdjust");

// Right Waveguide
const rightWG = Synth.getChildSynth("rightWG");
const rightWG_midiProcessor = Synth.getMidiProcessor("rightWG_midiProcessor");
const rightWG_gainAHDSR = Synth.getModulator("rightWG_gainAHDSR");
const rightWG_gainVelocity = Synth.getModulator("rightWG_gainVelocity");
const rightWG_gainLFO = Synth.getModulator("rightWG_gainLFO");
const rightWG_gainRandom = Synth.getModulator("rightWG_gainRandom");
const rightWG_pitchAHDSR = Synth.getModulator("rightWG_pitchAHDSR");
const rightWG_pitchAHDSRVelocity = Synth.getModulator("rightWG_pitchAHDSRVelocity");
const rightWG_pitchLFO = Synth.getModulator("rightWG_pitchLFO");
const rightWG_pitchRandom = Synth.getModulator("rightWG_pitchRandom");
const rightWG_pitchBend = Synth.getModulator("rightWG_pitchBend");
const rightWG_fxLevelAdjust = Synth.getEffect("rightWG_fxLevelAdjust");
const rightWG_fxProfileA = Synth.getEffect("rightWG_fxProfileA");
const rightWG_fxProfileB = Synth.getEffect("rightWG_fxProfileB");
const rightWG_fxProfileC = Synth.getEffect("rightWG_fxProfileC");
const rightWG_fxProfileCustom = Synth.getEffect("rightWG_fxProfileCustom");
const rightWG_fxToneControl = Synth.getEffect("rightWG_fxToneControl");
const rightWG_fxToneAdjust = Synth.getEffect("rightWG_fxToneAdjust");

Engine.addModuleStateToUserPreset("rightWG_fxProfileA");
Engine.addModuleStateToUserPreset("rightWG_fxProfileB");
Engine.addModuleStateToUserPreset("rightWG_fxProfileC");
Engine.addModuleStateToUserPreset("rightWG_fxProfileCustom");
Engine.addModuleStateToUserPreset("rightWG_fxToneControl");
Engine.addModuleStateToUserPreset("rightWG_fxToneAdjust");

// Right Release
const rightRLS = Synth.getChildSynth("rightRLS");
const rightRLS_midiProcessor = Synth.getMidiProcessor("rightRLS_midiProcessor");
const rightRLS_gainAHDSR = Synth.getModulator("rightRLS_gainAHDSR");

