/*
    Copyright 2023 David Healey

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

Content.setHeight(250);

reg lastTime;

// Modulators
const startOffsetModIds = [];
const startOffsetMods = [];
reg mod;

for (id in Synth.getIdList("Constant"))
{
	if (!id.toLowerCase().contains("start")) continue;

	startOffsetModIds.push(id);
	startOffsetMods.push(Synth.getModulator(id));
}

// cmbStartOffsetMod
const cmbStartOffsetMod = Content.addComboBox("StartOffsetMod", 10, 10);
cmbStartOffsetMod.set("items", startOffsetModIds.join("\n"));
cmbStartOffsetMod.setControlCallback(oncmbStartOffsetModControl);

inline function oncmbStartOffsetModControl(component, value)
{
	mod = startOffsetMods[value - 1];
}

// btnChords
const btnChords = Content.addButton("Chords", 160, 10);

// knbLegatoOffset
const knbLegatoOffset = Content.addKnob("LegatoOffset", 310, 0);
knbLegatoOffset.set("text", "Legato Offset");
knbLegatoOffset.set("mode", "NormalizedPercentage");
knbLegatoOffset.setRange(0, 1, 0.01);
knbLegatoOffset.set("defaultValue", 0.5);
knbLegatoOffset.set("tooltip", "Sample start offset time for legato.");

// tblOffset
const tblOffset = Content.addTable("Offset", 10, 60);
tblOffset.set("width", 425);
tblOffset.set("height", 175);
tblOffset.set("tooltip", "Velocity to sample start offset for non-legato notes.");

// Functions
inline function setStartOffsetModIntensity(value)
{	
	if (isDefined(mod))
		mod.setIntensity(1 - value);
}
function onNoteOn()
{
	local v = Message.getVelocity();
	local isChord = ((Engine.getUptime() - lastTime) < 0.025) * btnChords.getValue();	
	local offset;

	if (Synth.isLegatoInterval() && !isChord)
		offset = knbLegatoOffset.getValue() + ((0.9 - knbLegatoOffset.getValue()) * Synth.isSustainPedalDown());
	else
		offset = tblOffset.getTableValue(v / 127);

	setStartOffsetModIntensity(offset);

	lastTime = Engine.getUptime();
}function onNoteOff()
{
	
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
 