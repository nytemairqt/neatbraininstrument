/*
    Copyright 2018, 2019, 2020, 2022 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

Content.setWidth(750);
Content.setHeight(175);

Content.setName("Release Trigger With Legato");

reg legatoChord = false;
reg lastTime;
reg lastNote = 0;

const CHORD_THRESHOLD = 25; //For testing if chords were played in legato mode
const noteIds = Engine.createMidiList();
const velocityValues = Engine.createMidiList();
const times = [];

const btnMute = Content.addButton("Mute", 0, 10);

const btnLegato = Content.addButton("Legato", 150, 10);
btnLegato.set("tooltip", "When enabled release samples will only be triggered when no other keys are held.");

const btnAttenuate = Content.addButton("Attenuate", 300, 10);

const knbTime = Content.addKnob("Time", 450, 0);
knbTime.setRange(0, 60, 0.1);

const tblTime = Content.addTable("tblTime", 140, 0);
tblTime.setPosition(0, 60, 250, 100);

const knbLength = Content.addKnob("Length", 600, 0);
knbLength.set("mode", "Time");
knbLength.set("min", 50);

inline function playReleaseNote(noteNumber, velocity)
{
	local c = Message.getCoarseDetune();
	local f = Message.getFineDetune();

    noteIds.setValue(noteNumber, Synth.playNote(noteNumber + Message.getTransposeAmount(), velocity));
    Synth.addPitchFade(noteIds.getValue(noteNumber), 0, c, f);
    Synth.addVolumeFade(noteIds.getValue(noteNumber), 0, Message.getGain());
    
    if (btnAttenuate.getValue()) //Attenuation is enabled
    {
        //Use delay between this note and last note to calculate the table value based on the user set time (knbTime)
        local delay = Math.min(((Engine.getUptime() - times[noteNumber]) / knbTime.getValue()), 1.0);

        //Use the normalized table value to determine the amount of attenuation
        local attenuation = tblTime.getTableValue(delay) * 30;

        //Attenuate the note
        Synth.addVolumeFade(noteIds.getValue(noteNumber), 0, -attenuation);
    }

    Synth.noteOffDelayedByEventId(noteIds.getValue(noteNumber), Engine.getSamplesForMilliSeconds(knbLength.getValue()));
}function onNoteOn()
{
	if (!btnMute.getValue())
	{
		Message.ignoreEvent(true);
		
		local n = Message.getNoteNumber();
		local v = Message.getVelocity();
		local t = Engine.getUptime();

		velocityValues.setValue(n, v);
		times[n] = t;

		// If a legato chord was played, set the flag
		legatoChord = false;

		if (btnLegato.getValue() && ((t - lastTime) * 1000 < CHORD_THRESHOLD))
	        legatoChord = true;

	    lastNote = n;
	    lastTime = t;
	}
}
function onNoteOff()
{
	// If not muted and a velocity was recorded in the note on callback - this prevents release triggering for the wrong articulation
	if (!btnMute.getValue() && velocityValues.getValue(Message.getNoteNumber()) > 0 && !Synth.isSustainPedalDown())
	{
		Message.ignoreEvent(true);

		// Only play release triggers if legato is disabled or legato is enabled, no keys are held, and previous voices are still playing
		if (btnLegato.getValue() == 0 || legatoChord == true || (btnLegato.getValue() && !Synth.getNumPressedKeys()) && Engine.getNumVoices() > 0)
		    playReleaseNote(Message.getNoteNumber(), velocityValues.getValue(Message.getNoteNumber()));
	}
}

function onController()
{
    if (Message.getControllerNumber() == 64 && !Synth.isSustainPedalDown() && Synth.getNumPressedKeys() == 0 && Engine.getNumVoices() > 0)
    {
		if (velocityValues.getValue(lastNote) > 0 && velocityValues.getValue(lastNote) < 128)
        	playReleaseNote(lastNote, velocityValues.getValue(lastNote));
    }
}
function onTimer()
{
	
}
 function onControl(number, value)
{
	switch (number)
	{
		case btnMute:
			velocityValues.clear();
			times.clear();
		break;

		case btnAttenuate:
			knbTime.set("visible", value);
			tblTime.set("visible", value);
		break;
	}
}
