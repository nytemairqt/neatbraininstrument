Content.makeFrontInterface(1000, 710);

include("RhapsodyBoilerplate/includes/Ui.js");
include("RhapsodyBoilerplate/includes/LookAndFeel.js");
include("RhapsodyBoilerplate/includes/Paths.js");
include("RhapsodyBoilerplate/includes/Expansions.js");
include("RhapsodyBoilerplate/includes/Header.js");
include("RhapsodyBoilerplate/includes/Footer.js");
include("RhapsodyBoilerplate/includes/Presets.js");
include("RhapsodyBoilerplate/includes/UserSettings.js");
include("RhapsodyBoilerplate/includes/Spinner.js");

/* NEATBrain External Files */

include("NEATBRAINBoilerplate/NEATBrainUi.js");

/* Managing WaveTables */

const MEMORYNAME = "Achromic";

Engine.loadAudioFilesIntoPool();

const audioFiles = FileSystem.getFolder(FileSystem.AudioFiles);
const subfolder = audioFiles.createDirectory(MEMORYNAME);

reg rr = 0;
var RR = 0;
reg m = 0;

/*
	on load, check for wavetables in "subfolder"
	if they don't exist, prompt user to "build wavetables" with a popup panel
	when user builds wavetables, extract them from a zip in the samples zip
	
	NEED TO SHIP .hwt files along with either the Samples or the .HXI

*/
function onNoteOn()
{


	m = Message.getNoteNumber();
	
	Console.print(m);
	
	if (m < 24)
		Message.ignoreEvent(1);
	
	if (m > 96)
		Message.ignoreEvent(1);
	
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
 