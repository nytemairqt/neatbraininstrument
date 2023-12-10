/*
    Copyright 2021, 2022 David Healey

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

namespace Header
{    
    // pnlHeader
	const pnlHeader = Content.getComponent("pnlHeader");
	
	pnlHeader.setPaintRoutine(function(g)
	{
	});
	
	// btnTitle
	const btnTitle = Content.getComponent("btnTitle");

	const lafbtnTitle = Content.createLocalLookAndFeel();
	btnTitle.setLocalLookAndFeel(lafbtnTitle);
	
	lafbtnTitle.registerFunction("drawToggleButton", function(g, obj)
	{
		var a = obj.area;

		var fontSize = Engine.getOS() == "WIN" ? 44 : 28;

		g.setColour(obj.textColour);
		g.setFont("title", fontSize);
		g.drawAlignedText(obj.text, [a[0], a[1] + 2 - ((Engine.getOS() == "WIN") * 5), a[2], a[3]], "left");
	});
}

