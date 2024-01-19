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

// sends
const sendIds = Synth.getIdList("Send Effect");
const sends = [];

for (x in sendIds)
	sends.push(Synth.getEffect(x));
	
// effects
const effectIds = Synth.getIdList("Convolution Reverb");
const effects = [];

for (x in effectIds)
	effects.push(Synth.getEffect(x));

// btnBypass
const btnBypass = [];

for (i = 0; i < effects.length; i++)
{
	btnBypass.push(Content.addButton("Bypass" + i, 10 + i * 150, 10));
	btnBypass[i].set("text", "Enable " + i);
	btnBypass[i].setControlCallback(onbtnBypassControl);
}

inline function onbtnBypassControl(component, value)
{
	local index = btnBypass.indexOf(component);
	
	sends[index].setBypassed(!value);
	sends[3 + index].setBypassed(!value);
	effects[index].setBypassed(!value);
}function onNoteOn()
{
	
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
 