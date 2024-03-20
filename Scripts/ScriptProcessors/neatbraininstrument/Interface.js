Content.makeFrontInterface(1000, 710);




/* Instantiate NEATBrain */

const MEMORYNAME = "Achromic";
const MEMORYTYPE = "Guitar";
const NUMPROFILES = 3;

global humanizationLeft = 0;
global humanizationRight = 0;

/* Instantiate Rhapsody UI */

include("RhapsodyBoilerplate/includes/Ui.js");
//Ui.createTemplate(MEMORYNAME); // Run this after updating Rhapsody Boilerplate

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

/* Global Vars */

reg m = 0;

/* NEATBrain Specific Init Funcs */

// GUITAR 
if (MEMORYTYPE == "Guitar")
{
	Console.print("Guitar Memory Detected: Activating Palm Mute Logic");
	synthWTLeftA_muteLogic.setBypassed(false);
	synthWTRightA_muteLogic.setBypassed(false);	
}
else
{
	Console.print("Deactivating Palm Mute Logic");
	synthWTLeftA_muteLogic.setBypassed(true);
	synthWTRightA_muteLogic.setBypassed(true);
}function onNoteOn()
{
	//Console.print(Message.getNoteNumber());	
	//Console.print(Message.getVelocity());	
	//Console.print(Engine.getMidiNoteName(Message.getNoteNumber()));
	//Console.print(Engine.getFrequencyForMidiNoteNumber(Message.getNoteNumber()));
	
	humanizationLeft = Math.randInt(0, 2000);
	humanizationRight = Math.randInt(0, 2000);
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
 