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

reg lastNote = -1;
reg lastVelocity = 1;function onNoteOn()
{
	lastNote = Message.getNoteNumber();
	lastVelocity = Message.getVelocity();
}
 function onNoteOff()
{
	local n = Message.getNoteNumber();
	
	if (n == lastNote)
		Synth.playNote(n, Math.max(1, lastVelocity / 4));
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
 