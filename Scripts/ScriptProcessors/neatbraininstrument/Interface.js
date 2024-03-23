Content.makeFrontInterface(1000, 710);

/* Instantiate NEATBrain */

const MEMORYNAME = "Achromic";
const MEMORYTYPE = "Guitar";
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
include("NEATBrainBoilerplate/NEATBrainPatreon.js");

/* NEATBrain Specific Init Funcs */

// GUITAR 
if (MEMORYTYPE == "Guitar")
{
	Console.print("Guitar Memory Detected: Activating Palm Mute Logic");
	//leftWG_fxMute.setBypassed(0);
	//rightWG_fxMute.setBypassed(0);
}
else
{
	Console.print("Deactivating Palm Mute Logic");
	leftWG_fxMute.setBypassed(1);
	rightWG_fxMute.setBypassed(1);
	
}function onNoteOn()
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
 