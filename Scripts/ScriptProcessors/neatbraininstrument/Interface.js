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

// Setup Initial Ratios

const ModalSynth = Synth.getChildSynth("ModalSynth");
const var knbModalRandomizationStrength = Content.getComponent("knbModalRandomizationStrength");

knbModalRandomizationStrength.setLocalLookAndFeel(LookAndFeel.horizontalSlider);


const ratios_l = [1.0, 1.83829594498603, 3.26433619017115, 4.600857033422893, 6.404116475251082, 19.67718441824997];

const attributes = [ModalSynth.F0,
ModalSynth.F1,
ModalSynth.F2,
ModalSynth.F3,
ModalSynth.F4,
ModalSynth.F5,
ModalSynth.F6,
ModalSynth.F7,
ModalSynth.F8,
ModalSynth.F9, 
ModalSynth.F10];

for (i=0; i<ratios_l.length; i++)
{
	ModalSynth.setAttribute(attributes[i], ratios_l[i]);
}


function onNoteOn()
{
	// Randomize Modal Ratios
	
	/*
	for (i=0; i<ratios_l.length; i++)
	{
		ModalSynth.setAttribute(attributes[i], ratios_l[i] + (knbModalRandomizationStrength.getValue() * Math.random()));
	}
	*/
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
 