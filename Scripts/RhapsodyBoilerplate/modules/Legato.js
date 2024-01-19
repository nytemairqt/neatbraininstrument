/*
    Copyright 2018, 2019, 2020, 2021, 2022, 2023 David Healey

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

Content.setWidth(600);
Content.setHeight(350);

Synth.stopTimer();

const pitchBend = [[0], [0]];

reg eventId0 = -99;
reg eventId1 = -99;
reg lastNote = -99;
reg interval = 0;
reg retriggerNote = -99;
reg coarseDetune = 0;
reg fineDetune = 0;
reg transposition = 0;
reg lastTime = 0;
reg velocity;
reg channel;
reg gain;
reg isChord = false;

reg glideOrigin = -99;
reg glideTarget = -99;
reg glideNote = -99;
reg glideRate;
reg glideDirection = 0;
reg lastGlideNote = -99;

reg lastPressure = 0;
reg lastPressureTime = 0;
reg pressureTally = 1;
reg pressureReadings = 1;

// btnMute
const btnMute = Content.addButton("Mute", 10, 10);
btnMute.setControlCallback(onbtnMuteControl);

inline function onbtnMuteControl(component, value)
{
    if (!value)
    {
        eventId0 = -99;
        eventId1 = -99;
        lastNote = -99;
        retriggerNote = -99;
    }
}

// btnLastNoteRetrigger
const btnLastNoteRetrigger = Content.addButton("LastNoteRetrigger", 160, 10);
btnLastNoteRetrigger.set("text", "Last Note Retrigger");
btnLastNoteRetrigger.setTooltip("Enable/Disable last note legato retrigger");

// btnChords
const btnChords = Content.addButton("Chords", 310, 10);
btnChords.setTooltip("Enable/Disable chord detection and playing");

// knbXfadeTm
const knbXfadeTm = Content.addKnob("XfadeTm", 10, 50);
knbXfadeTm.set("text", "XFade Tm");
knbXfadeTm.set("mode", "Time");
knbXfadeTm.set("max", 1000);
knbXfadeTm.set("middlePosition", 500);
knbXfadeTm.set("defaultValue", 50);
knbXfadeTm.setTooltip("Maximum crossfade time.");

// knbBendTm
const knbBendTm = Content.addKnob("BendTm", 10, 100);
knbBendTm.set("text", "Bend Tm");
knbBendTm.set("mode", "Linear");
knbBendTm.setRange(0, 200, 1);
knbBendTm.set("suffix", "%");
knbBendTm.set("middlePosition", 100);
knbBendTm.set("defaultValue", 100);
knbBendTm.setTooltip("Maximum pitch bend time as a percentage of Xfade Tm.");

// knbXfadeVar
const knbXfadeVar = Content.addKnob("XfadeVar", 10, 150);
knbXfadeVar.set("text", "XFade Var");
knbXfadeVar.set("mode", "Linear");
knbXfadeVar.set("suffix", "%");
knbXfadeVar.setRange(0, 50, 1);
knbXfadeVar.set("defaultValue", 10);
knbXfadeVar.set("middlePosition", 12);
knbXfadeVar.set("tooltip", "Random variance for fade time.");

// knbMinBend
const knbBendMin = [];

knbBendMin[0] = Content.addKnob("BendMinUp", 160, 50);
knbBendMin[0].set("text", "Bend Min Up");
knbBendMin[0].set("suffix", " cts");
knbBendMin[0].setRange(0, 100, 1);
knbBendMin[0].set("defaultValue", 20);
knbBendMin[0].setControlCallback(onknbBendControl);

knbBendMin[1] = Content.addKnob("BendMinDn", 160, 100);
knbBendMin[1].set("text", "Bend Min Dn");
knbBendMin[1].set("suffix", " cts");
knbBendMin[1].setRange(0, 100, 1);
knbBendMin[1].set("defaultValue", 20);
knbBendMin[1].setControlCallback(onknbBendControl);

// knbBendVar
const knbBendVar = Content.addKnob("BendVar", 160, 150);
knbBendVar.set("text", "Bend Var");
knbBendVar.set("mode", "Linear");
knbBendVar.set("suffix", "%");
knbBendVar.setRange(0, 25, 1);
knbBendVar.set("defaultValue", 10);
knbBendVar.set("middlePosition", 12);
knbBendVar.set("tooltip", "Random variance for bend amount.");

// knbBendOct
const knbBendOct = [];

knbBendOct[0] = Content.addKnob("BendOctUp", 310, 50);
knbBendOct[0].set("text", "Bend Oct Up");
knbBendOct[0].setRange(0, 100, 0.1);
knbBendOct[0].set("defaultValue", 50);
knbBendOct[0].setControlCallback(onknbBendControl);

knbBendOct[1] = Content.addKnob("BendOctDn", 310, 100);
knbBendOct[1].set("text", "Bend Oct Dn");
knbBendOct[1].setRange(0, 100, 0.1);
knbBendOct[1].set("defaultValue", 50);
knbBendOct[1].setControlCallback(onknbBendControl);

inline function onknbBendControl(component, value)
{
    updatePitchBendTables();
}

// btnGlide
const btnGlide = Content.addButton("Glide", 10, 260);

// knbGlideMax
const knbGlideMax = Content.addKnob("GlideMax", 160, 250);
knbGlideMax.set("text", "Glide Max");
knbGlideMax.set("suffix", "st");
knbGlideMax.setRange(0, 24, 1);

// knbGlideBendVar
const knbGlideBendVar = Content.addKnob("GlideBendVar", 310, 250);
knbGlideBendVar.set("text", "Glide Bend Var");
knbGlideBendVar.set("mode", "Linear");
knbGlideBendVar.set("suffix", "%");
knbGlideBendVar.setRange(0, 25, 1);
knbGlideBendVar.set("middlePosition", 12);

// knbGlideRateMax
const knbGlideRateMax = Content.addKnob("GlideRateMax", 460, 250);
knbGlideRateMax.set("text", "Glide Rate Max");
knbGlideRateMax.set("mode", "Time");
knbGlideRateMax.set("min", 100);
knbGlideRateMax.set("max", 1000);
knbGlideRateMax.set("middlePosition", 500);
knbGlideRateMax.set("defaultValue", 350);

// btnBreath
const btnBreath = Content.addButton("Breath", 10, 310);

// knbPressure
const knbPressure = Content.addKnob("Pressure", 310, 300);
knbPressure.setRange(0, 127, 1);
knbPressure.setControlCallback(onknbPressureControl);

inline function onknbPressureControl(component, value)
{
    if (!btnMute.getValue() && btnBreath.getValue())
    {
        local trigger = knbTriggerLevel.getValue();

        if (value >= trigger && lastPressure < trigger && lastNote != -99)
        {
            lastPressureTime = Engine.getUptime();
            
            if (eventId0 != -99)
                Synth.noteOffByEventId(eventId0);
            
            if (btnPressureVelocity.getValue())
            {
                pressureTimer.startTimer(11);
            }
            else
            {
                eventId0 = Synth.playNote(lastNote, velocity);
                Synth.addPitchFade(eventId0, 0, coarseDetune, fineDetune);
            }
        }

        if (value < trigger - 5)
        {
            pressureTimer.stopTimer();

            if (eventId0 != -99)
                Synth.noteOffByEventId(eventId0);
            
            eventId0 = -99;
        }

        lastPressure = value;
    }
}

// knbTriggerLevel
const knbTriggerLevel = Content.addKnob("TriggerLevel", 460, 300);
knbTriggerLevel.set("text", "Trigger Level");
knbTriggerLevel.set("defaultValue", 6);
knbTriggerLevel.setRange(6, 127, 1);

// btnPressureVelocity
const btnPressureVelocity = Content.addButton("PressureVelocity", 160, 310);
btnPressureVelocity.set("text", "Pressure = Velocity");

// Pressure timer
const pressureTimer = Engine.createTimerObject();
pressureTimer.setTimerCallback(function()
{
    if (Engine.getUptime() - lastPressureTime > 0.15)
    {
        velocity = pressureTally / pressureReadings;
    
        eventId0 = Synth.playNote(lastNote, velocity);
        Synth.addPitchFade(eventId0, 0, coarseDetune, fineDetune);

        lastPressureTime = 0;
        pressureTally = 1;
        pressureReadings = 1;
        this.stopTimer();
    }
    else
    {
        pressureReadings++;
        pressureTally += knbPressure.getValue();
    }
});

// Functions

inline function getFadeTime(max, lastTime, velocity, interval)
{
    local tm = max - max * (velocity / 2 / 64);
    local speed = (Engine.getUptime() - lastTime) * 1000;
    local span = Math.min(12, interval + 3) / 12;
    local rand = Math.randInt(-knbXfadeVar.getValue(), knbXfadeVar.getValue() + 1) / 100;

    if (speed < tm)
        tm = speed - (speed * (velocity / 2 / 64));

    return Math.max(20, tm + tm * rand * span);
}

inline function getGlideTimerRate(velocity)
{
    local rate = knbGlideRateMax.getValue() * ((40 - velocity) / 40);
    return Math.max(75, rate);
}

inline function updatePitchBendTables()
{
    for (i = 0; i < knbBendMin.length; i++)
    {
        local min = knbBendMin[i].getValue();
        local oct = knbBendOct[i].getValue();

	    for (j = 1; j < 12; j++)
	    {
	        if (oct == 0.0)
	        {
	            pitchBend[i][j] = min;
	        }
	        else
	        {
	            if (i == 0)
	                pitchBend[i][j] = Math.round(j * (oct - min) / 11 + min);
	            else
	                pitchBend[i][j] = -Math.round(j * (oct - min) / 11 + min);
	        }
	    }
	}
}

inline function playLegatoNote(note, velocity)
{
    if (eventId0 != -99 && Synth.isArtificialEventActive(eventId0))
    {
		local interval = Math.abs(lastNote - note);

        local fadeTm = getFadeTime(knbXfadeTm.getValue(), lastTime, velocity, interval);

        // Crossfade gain
        Synth.addVolumeFade(eventId0, fadeTm, -100);
        Synth.addVolumeFade(eventId1, 0, -99);
        Synth.addVolumeFade(eventId1, fadeTm, Message.getGain());

        // Crossfade pitch
        local bendTm = fadeTm / 100 * knbBendTm.getValue();
        local bendAmt;

        if (interval > 0)
            bendAmt = pitchBend[lastNote > note][interval];
        else
            bendAmt = pitchBend[0][1] / 2;
            
        local rand = Math.randInt(-knbBendVar.getValue(), knbBendVar.getValue() + 1) / 100;

        bendAmt = bendAmt + bendAmt * rand;

        if (bendAmt != 0 && bendTm > 0)
        {
            local coarse = coarseDetune + parseInt((bendAmt + fineDetune) / 100);
            local fine = ((bendAmt + fineDetune) % 100);

            Synth.addPitchFade(eventId0, bendTm, coarse, fine);                        
            Synth.addPitchFade(eventId1, 0, -coarse, -fine);
            Synth.addPitchFade(eventId1, bendTm, coarseDetune, fineDetune);
        }
    }
}

inline function playGlideNote(rate, bend)
{
    if (eventId0 != -99 && rate > 0)
    {
        local rand = Math.randInt(-knbGlideBendVar.getValue(), knbGlideBendVar.getValue() + 1) / 100;
        local bendAmt = bend + bend * rand;
        
        local coarse = parseInt(bendAmt / 100);
        local fine = (fineDetune + bendAmt) % 100;

        // Fade out old note
        Synth.addPitchFade(eventId0, rate, coarseDetune + coarse, fine);
        Synth.addVolumeFade(eventId0, rate, -100);

        // Play new note
        eventId1 = Synth.playNoteWithStartOffset(channel, glideNote + transposition, velocity, Math.randInt(8000, 15000));

        // Fade in new note
        Synth.addVolumeFade(eventId1, 0, -99);
        Synth.addVolumeFade(eventId1, rate, gain);
        Synth.addPitchFade(eventId1, 0, coarseDetune - coarse, -fine);
        Synth.addPitchFade(eventId1, rate, coarseDetune, fineDetune);

        eventId0 = eventId1;
    }
}
function onNoteOn()
{
	if (!btnMute.getValue())
    {
        Synth.stopTimer();
		channel = Message.getChannel();		
        velocity = Message.getVelocity();
        gain = Message.getGain();
        coarseDetune = Message.getCoarseDetune();
        fineDetune = Message.getFineDetune();
        transposition = Message.getTransposeAmount();
        isChord = ((Engine.getUptime() - lastTime) < 0.025) * btnChords.getValue();
        local n = Message.getNoteNumber() + transposition;

		if (!isChord || (isChord && lastNote == n))
		{
	        if (btnBreath.getValue() && lastPressure < knbTriggerLevel.getValue())
	        {
		        Message.ignoreEvent(true);
	        }            
	        else
	        {
	            if (lastNote != -99)
	            {
	                // Calculate interval
	                interval = Math.abs(lastNote - n);

	                if (btnGlide.getValue() && Synth.isLegatoInterval() && (knbGlideMax.getValue() == 0 || interval <= knbGlideMax.getValue())) // Glide 
	                {
	                    Message.ignoreEvent(true);

	                    glideNote = lastNote;
	                    glideOrigin = lastNote;
	                    glideTarget = n;

	                    glideRate = getGlideTimerRate(velocity);

	                    Synth.startTimer(glideRate / 1000);
	                }
	                else // Legato 
	                {
						// Cap interval at 11 semitones
						interval = Math.min(interval, 11);

	                    eventId1 = Message.makeArtificial();
	                    	
	                    if (knbXfadeTm.getValue() > 0)
	                        playLegatoNote(n, velocity);
	                    else
	                        Synth.noteOffByEventId(eventId0);
	
	                    eventId0 = eventId1;
	                }
	            }
	            else // First note of phrase
	            {
	                eventId0 = Message.makeArtificial();
	            }
	        }

	        lastTime = Engine.getUptime();
	        retriggerNote = lastNote;
	        lastNote = n;
        }
    }
} function onNoteOff()
{
	if (btnMute.getValue())
	{
		// Prevent hanging notes when bypassed
		if (eventId0 != -99)
		{
		    Synth.noteOffByEventId(eventId0);
		    eventId0 = -99;
		    lastNote = -99;
		}

		return;
	}
	
	local t = Message.getTransposeAmount();
	local n = Message.getNoteNumber() + t;

	if (n == retriggerNote || !btnLastNoteRetrigger.getValue())
		retriggerNote = -99;

	if (Synth.isKeyDown(n) || n != lastNote)
		return;
	
	Message.ignoreEvent(true);
	
	if (retriggerNote != -99 && eventId0 != -99 && (!btnBreath.getValue() || lastPressure > knbTriggerLevel.getValue()))
	{
		interval = 0;
		eventId1 = Synth.playNoteWithStartOffset(channel, retriggerNote, velocity, 0);

		if (knbXfadeTm.getValue() > 0)
			playLegatoNote(retriggerNote, velocity);
		else
			Synth.noteOffByEventId(eventId0);

		lastTime = Engine.getUptime();
		lastNote = retriggerNote;
		retriggerNote = -99;

		if (eventId1 != -99)
			eventId0 = eventId1;
	}
	else
	{
		if (eventId0 != -99 && Synth.isArtificialEventActive(eventId0))
			Synth.noteOffByEventId(eventId0);

		eventId0 = -99;
		lastNote = -99;
	}
}
function onController()
{
    if (!btnMute.getValue())
    {
        if (Message.getControllerNumber() == 64)
        {
			Message.ignoreEvent(true);

            //Turn off the last note if the sutain pedal is lifted and last note is still playing
            if (!Synth.isSustainPedalDown() && Synth.getNumPressedKeys() == 0 && eventId0 != -99)
            {
                Synth.noteOffByEventId(eventId0);
                eventId0 = -99;
                lastNote = -99;
            }

            btnGlide.setValue(Synth.isSustainPedalDown());
        }
    }	
}
 function onTimer()
{
    local direction = glideOrigin > glideTarget;
    local bend = (100 * (1 - direction)) - (100 * direction);
    local rand = Math.randInt(-10, 11) / 100;
    local rate = glideRate + glideRate * rand;
    
    if (direction)
        glideNote--;
    else
        glideNote++;

    // Apply a curve to the rate so it speeds up
    local step = Math.abs(glideNote - glideOrigin) - 1;
    local percent = 0.85 / interval * step;
    rate = Math.max(10, rate - rate * percent);

    // Stop timer when target is reached
    if ((glideTarget > glideOrigin && glideNote > glideTarget) || (glideTarget < glideOrigin && glideNote < glideTarget) || (eventId[0] == -99 || glideNote == -99))
    {
        glideNote = glideTarget;
        Synth.stopTimer();
    }

    // Play next glide note
    if (Synth.isTimerRunning())
    {
        playGlideNote(rate, bend);
        Synth.startTimer(rate / 1000);
    }
    
}function onControl(number, value)
{
	
}
 