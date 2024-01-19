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

namespace Velocity
{
	const velocityMod = Synth.getTableProcessor("velocity").getTable(0);

	const tableData = [];

	for (i = 0; i < Manifest.articulations.length; i++)
		tableData.push(Engine.createAndRegisterTableData(100 + i));

	// tblVelocity
	const tblVelocity = Content.getAllComponents("tblVelocity");

	for (i = 0; i < tblVelocity.length; i++)
	{
		tblVelocity[i].setLocalLookAndFeel(LookAndFeel.table);
		tblVelocity[i].referToData(tableData[i]);
		
		tblVelocity[i].setTablePopupFunction(function(x, y)
		{
			return Math.round(128 * x) + " | " + Math.round(126 * y + 1);
		});
	}

	// Functions
	inline function connectTableToModulator(index)
	{
		for (i = 0; i < tblVelocity.length; i++)
			tblVelocity[i].showControl(i == index);

		velocityMod.linkTo(tableData[index]);
	}

	if (isDefined(Articulations.broadcasters))
	{
		Articulations.broadcasters.articulationChanged.addListener("articulationChanged", "Velocity Table", function(index)
		{
			connectTableToModulator(parseInt(index));
		});
	}
}
