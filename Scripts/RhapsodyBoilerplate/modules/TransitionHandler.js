/*
    Copyright 2019, 2021, 2023 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this file. If not, see <http://www.gnu.org/licenses/>.
*/

reg lastNote = -1; //The last note that was pressed
reg lastTime;
reg retriggerNote = -1;
reg eventId;

// Modulators
const attackModIds = [];
const attackMods = [];
const releaseModIds = [];
const releaseMods = [];

for (id in Synth.getIdList("Constant"))
{
	if (id.toLowerCase().contains("attack"))
	{
		attackModIds.push(id);
		attackMods.push(Synth.getModulator(id));		
	}
	else if (id.toLowerCase().contains("release"))
	{
		releaseModIds.push(id);
		releaseMods.push(Synth.getModulator(id));		
	}
}

// cmbAttackMod
const cmbAttackMod = Content.addComboBox("cmbAttackMod", 10, 10);
cmbAttackMod.set("items", attackModIds.join("\n"));

// cmbReleaseMod
const cmbReleaseMod = Content.addComboBox("cmbReleaseMod", 160, 10);
cmbReleaseMod.set("items", releaseModIds.join("\n"));

// knbRetriggerMultiplier
const knbRetriggerMultiplier = Content.addKnob("RetriggerMultiplier", 310, 0);
knbRetriggerMultiplier.set("mode", "normalizedPercentage");
knbRetriggerMultiplier.setRange(0, 1, 0.01);

inline function setModulators(value)
{
	attackMods[cmbAttackMod.getValue() - 1].setIntensity(1 - value);
	releaseMods[cmbReleaseMod.getValue() - 1].setIntensity(1 - value);
}function onNoteOn()
{
    local n = Message.getNoteNumber();
    
    if (Engine.getUptime() - lastTime > 0.3)
    	setModulators(1.0);
    
	if (Synth.isLegatoInterval() && !Synth.isSustainPedalDown() && Engine.getNumVoices() > 0)
    {
        Message.setNoteNumber(lastNote);
        retriggerNote = lastNote;
    }
    else
    {
        Message.ignoreEvent(true);
        retriggerNote = -1;
    }

    lastNote = n;
    lastTime = Engine.getUptime();
}function onNoteOff()
{
	local n = Message.getNoteNumber();

    if (n == retriggerNote)
        retriggerNote = -1;

    if (n == lastNote && retriggerNote != -1 && Engine.getNumVoices() > 0)
    {
        eventId = Synth.playNote(lastNote + Message.getTransposeAmount(), 64);
        Synth.addPitchFade(eventId, 0, Message.getCoarseDetune(), Message.getFineDetune());
        Synth.addVolumeFade(eventId, 0, Message.getGain());

		if (Engine.getUptime() - lastTime < 0.25)
			setModulators(knbRetriggerMultiplier.getValue());

        lastNote = retriggerNote;
    }
    else
    {
	    setModulators(1.0);
    }    	
    
    lastTime = Engine.getUptime();
}
function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 