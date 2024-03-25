/*
    Copyright 2023, 2024 iamlamprey

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

Content.makeFrontInterface(1000, 710);

/* Instantiate NEATBrain */

const MEMORYNAME = "Achromic";
const NUMPROFILES = 3;

/* Instantiate Rhapsody UI */

include("RhapsodyBoilerplate/includes/Ui.js");
//Ui.createTemplate(MEMORYNAME); // Run this after updating Rhapsody Boilerplate

// Hide Button
const btnLogo = Content.getComponent("btnLogo");
btnLogo.set("visible", false);

include("RhapsodyBoilerplate/includes/LookAndFeel.js");
include("RhapsodyBoilerplate/includes/Paths.js");
include("RhapsodyBoilerplate/includes/Expansions.js");
include("RhapsodyBoilerplate/includes/Header.js");
include("RhapsodyBoilerplate/includes/Footer.js");
include("RhapsodyBoilerplate/includes/Presets.js");
include("RhapsodyBoilerplate/includes/UserSettings.js");
include("RhapsodyBoilerplate/includes/Spinner.js");

/* NEATBrain External Files */

include("NEATBrainBoilerplate/NEATBrainUI.js");
include("NEATBrainBoilerplate/NEATBrainTooltip.js");
include("NEATBrainBoilerplate/NEATBrainPatreon.js");function onNoteOn()
{
	//Console.print(Message.getNoteNumber());	
	//Console.print(Message.getVelocity());	
	//Console.print(Engine.getMidiNoteName(Message.getNoteNumber()));
	//Console.print(Engine.getFrequencyForMidiNoteNumber(Message.getNoteNumber()));	
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
 