/*
    Copyright 2021, 2022, 2023 David Healey

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

Content.setHeight(100);

const intervalMultiplier = [0, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

reg lastNote = -1;
reg retriggerNote = -1;
reg lastAttackTime;
reg lastReleaseTime;

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
const cmbReleaseMod = Content.addComboBox("cmbReleaseMod", 10, 60);
cmbReleaseMod.set("items", releaseModIds.join("\n"));

// knbLegatoDivider
const knbLegatoDivider = Content.addKnob("LegatoDivider", 160, 0);
knbLegatoDivider.set("mode", "normalizedPercentage");
knbLegatoDivider.setRange(0, 1, 0.05);

// knbReleaseMin
const knbReleaseMin = Content.addKnob("ReleaseMin", 160, 50);
knbReleaseMin.set("mode", "normalizedPercentage");
knbReleaseMin.setRange(0, 1, 0.05);
knbReleaseMin.set("defaultValue", 0.25);
knbReleaseMin.set("tooltip", "This is the lowest possible release time.");

// knbTrillAttack
const knbTrillAttack = Content.addKnob("TrillAttack", 310, 0);
knbTrillAttack.set("mode", "normalizedPercentage");
knbTrillAttack.setRange(0, 1, 0.05);
knbTrillAttack.set("defaultValue", 0.25);

// tblVelocity
const tblVelocity = Content.addTable("Offset", 460, 10);
tblVelocity.set("width", 125);
tblVelocity.set("height", 75);
tblVelocity.set("tooltip", "Velocity to attack for non-legato notes.");function onNoteOn()
{
	local n = Message.getNoteNumber();
    local v = Message.getVelocity();
    local tableValue = tblVelocity.getTableValue(v / 127);
    local duration = Engine.getUptime() - lastAttackTime;
    local isChord = (duration < 0.025);
    local attack = 1;

	if (Synth.isLegatoInterval() && !isChord)
	{
		if (Synth.isSustainPedalDown())
		{
			attack = 0.2;
		}
		else
		{
			local interval = Math.min(Math.abs(n - lastNote), 11);
			local modifier = (interval / 11);
			
			attack = knbLegatoDivider.getValue();
			
			if (interval > 0)
				attack -= (attack / 2) * (1 - (tableValue / 2) - (interval / 11));
		}
	}
	else
	{
		attack = tableValue;
	}

	if (!Synth.isSustainPedalDown())
		attack *= Math.range((duration - 0.15) / (1 - 0.15) * (1 - 0.35) + 0.35, 0.35, 1);

	attackMods[cmbAttackMod.getValue() - 1].setIntensity(1 - attack);

    lastAttackTime = Engine.getUptime();
    
    retriggerNote = lastNote;
    lastNote = n;
}
 function onNoteOff()
{
	local duration = Engine.getUptime() - lastReleaseTime;
	local min = knbReleaseMin.getValue();
	local release = Math.range((duration - 0.15) / (1 - 0.15) * (1 - min) + min, min, 1);

	if (Synth.isKeyDown(retriggerNote))
		attackMods[cmbAttackMod.getValue() - 1].setIntensity(1 - knbTrillAttack.getValue());

	releaseMods[cmbReleaseMod.getValue() - 1].setIntensity(1 - release);

	lastReleaseTime = Engine.getUptime();
	lastNote = retriggerNote;
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
 