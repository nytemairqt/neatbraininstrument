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

reg target = 64;

const var ccDynamics = Synth.getModulator("ccDynamics");

// btnMute
const btnMute = Content.addButton("Mute", 10, 10);

// knbDynamics
const knbDynamics = Content.addKnob("Dynamics", 150, 0);
knbDynamics.setRange(0, 127, 1);
knbDynamics.setControlCallback(onknbDynamicsControl);

inline function onknbDynamicsControl(component, value)
{
    ccDynamics.setAttribute(ccDynamics.DefaultValue, value);
}function onNoteOn()
{
    if (!btnMute.getValue())
    {
        if (Message.getVelocity() > 64 && Message.getVelocity() > knbDynamics.getValue())
        {
            target = knbDynamics.getValue();
            ccDynamics.setAttribute(ccDynamics.DefaultValue, knbDynamics.getValue() + Message.getVelocity() / 2);
            Synth.startTimer(0.005);
        }
    }
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	if (ccDynamics.getAttribute(ccDynamics.DefaultValue) > target && ccDynamics.getAttribute(ccDynamics.DefaultValue) > knbDynamics.getValue())
    {
        ccDynamics.setAttribute(ccDynamics.DefaultValue, ccDynamics.getAttribute(ccDynamics.DefaultValue) - 1);
    }
    else
    {
        Synth.stopTimer();
    }
}
 function onControl(number, value)
{
	
}
 