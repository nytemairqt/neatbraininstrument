/*
    Copyright 2021, 2022 David Healey

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

namespace ReleaseTriggers
{
	// knbReleaseGain
	const knbReleaseGain = Content.getComponent("knbReleaseGain");
	knbReleaseGain.setLocalLookAndFeel(LookAndFeel.knob);
	knbReleaseGain.setControlCallback(onknbReleaseGainControl);
	
	inline function onknbReleaseGainControl(component, value)
	{
      	local gf = Engine.getGainFactorForDecibels(value);
      	local s = Configuration.samplers;
      	local index = 3;
      	
      	if (isDefined(Manifest.releaseSampler))
      		index = Manifest.releaseSampler;

        s[index].setAttribute(s[0].Gain, gf);
	}
}
