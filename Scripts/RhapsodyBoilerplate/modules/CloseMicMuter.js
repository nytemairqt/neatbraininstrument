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

const var simpleGain = Synth.getEffect("mixerGain0");
const var Interface = Synth.getMidiProcessor("Interface");

// btnMute
const btnMute = Content.addButton("Mute", 10, 10);
btnMute.set("text", "Enable");
btnMute.setControlCallback(onbtnMuteControl);

inline function onbtnMuteControl(component, value)
{
	local v;

	if (value)
		v = Interface.getAttribute(Interface.knbGain0);
	else
		v = -100;

	simpleGain.setAttribute(simpleGain.Gain, v);
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
 