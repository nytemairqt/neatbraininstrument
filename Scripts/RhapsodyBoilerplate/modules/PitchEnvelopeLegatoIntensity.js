/*
    Copyright 2023 David Healey

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

// Table Envelopes
const envelopes = [];
const envelopeIds = [];

for (id in Synth.getIdList("Table Envelope"))
{
	if (!id.toLowerCase().contains("pitch")) continue;
	envelopeIds.push(id);
	envelopes.push(Synth.getModulator(id));
}	

reg lastTime = 0;

// btnMute
const btnMute = Content.addButton("Mute", 10, 10);

// knbSemiTones
const knbSemiTones = Content.addKnob("SemiTones", 150, 0);
knbSemiTones.setRange(-12, 12, 1);
knbSemiTones.set("middlePosition", 0);

// cmbEnvelope
const cmbEnvelope = Content.addComboBox("Envelope", 300, 10);
cmbEnvelope.set("items", envelopeIds.join("\n"));function onNoteOn()
{
	if (btnMute.getValue() || knbSemiTones.getValue() == 0) return;
	
	local envelope = envelopes[cmbEnvelope.getValue() - 1];

	if (Synth.isLegatoInterval() && ((Engine.getUptime() - lastTime) > 0.025))
		envelope.setIntensity(knbSemiTones.getValue());
	else
		envelope.setIntensity(0);
		
	lastTime = Engine.getUptime();
}
 function onNoteOff()
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
 