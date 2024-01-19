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

const attackAccent = Synth.getMidiProcessor("attackAccent");
const sampler0Legato = Synth.getMidiProcessor("sampler0Legato");

// knbValue
const knbValue = Content.addKnob("knbValue", 0, 0);
knbValue.set("text", "Value");
knbValue.setRange(0, 127, 1);
knbValue.setControlCallback(onknbValueControl);

inline function onknbValueControl(component, value)
{
	attackAccent.setAttribute(attackAccent.Dynamics, value);
	sampler0Legato.setAttribute(sampler0Legato.Pressure, value);
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
 