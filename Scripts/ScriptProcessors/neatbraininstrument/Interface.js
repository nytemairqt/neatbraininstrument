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

const WAVETABLES = ["L_05", "R_05", "L_08", "R_08"];

Engine.loadAudioFilesIntoPool();

const audioFiles = FileSystem.getFolder(FileSystem.AudioFiles);
const subfolder = audioFiles.createDirectory(MEMORYNAME);

// check for wavetables

const sf = FileSystem.findFiles(subfolder, "*.hwt", false);
const af = FileSystem.findFiles(audioFiles, "*.hwt", false);


reg m = 0;

/*
	RHAPSODY EXTRACTS ALL FILES FROM SAMPLES FOLDER AGNOSTICALLY
	
	therefore:
	
	1. manually drag WT's into samples.lwz
	2. init check for missing .hwt files from AudioFiles folder
	3. if missing: copy them from Samples folder 
	4. maybe give a nice popup "Initial Setup" or something
	5. manually populate synths with the appropriate WT's

*/
function onNoteOn()
{


	m = Message.getNoteNumber();
	
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
 