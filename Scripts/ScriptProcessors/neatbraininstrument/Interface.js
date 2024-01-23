Content.makeFrontInterface(1000, 710);

/* Instantiate NEATBrain */

const MEMORYNAME = "Achromic";
const MEMORYTYPE = "Guitar";
const NUMPROFILES = 3;

/* Instantiate Rhapsody UI */

include("RhapsodyBoilerplate/includes/Ui.js");
//Ui.createTemplate(MEMORYNAME); // Run this after updating Rhapsody Boilerplate

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
	synthWTLeftA_fxPalmMute.setBypassed(false);
	synthWTRightA_fxPalmMute.setBypassed(false);
	synthWTLeftB_fxPalmMute.setBypassed(false);
	synthWTRightB_fxPalmMute.setBypassed(false);
}
else
{
	Console.print("Deactivating Palm Mute Logic");
	synthWTLeftA_fxPalmMute.setBypassed(true);
	synthWTRightA_fxPalmMute.setBypassed(true);
	synthWTLeftB_fxPalmMute.setBypassed(true);
	synthWTRightB_fxPalmMute.setBypassed(true);
}function onNoteOn()
{
	Console.print(Message.getNoteNumber());

	
	
	// need to implement fx-keys ignore events specifically inside the WT synths
	// need to then adjust Residue samplemaps to include them
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
 