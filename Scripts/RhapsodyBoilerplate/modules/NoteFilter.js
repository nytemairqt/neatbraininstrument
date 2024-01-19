//License - Public Domain
//David Healey 2023

Content.setWidth(750);
Content.setHeight(100);

//knbLowNote
const knbLowNote = Content.addKnob("LowNote", 10, 0);
knbLowNote.setRange(0, 127, 1);
knbLowNote.set("tooltip", "Notes below this value will not be filtered.");

//knbHighNote
const knbHighNote = Content.addKnob("HighNote", 160, 0);
knbHighNote.setRange(0, 127, 1);
knbHighNote.set("tooltip", "Notes above this value will not be filtered.");

// btnNoteOff
const btnNoteOff = Content.addButton("NoteOff", 310, 10);
btnNoteOff.set("text", "Filter Note Off");
btnNoteOff.set("tooltip", "If active, note offs will also be filtered.");

// btnNote
const btnNote = addNoteButtons();

// Functions
inline function addNoteButtons()
{
	local result = [];
	
	for (i = 0; i < 12; i++)
	{
		local noteName = Engine.getMidiNoteName(i % 12).replace("-2");
	
		result[i] = Content.addButton("note" + i, 10 + 62 * i, 60);
		result[i].set("text", noteName);
		result[i].set("width", 55);
	}
	
	return result;
}function onNoteOn()
{
	local n = Message.getNoteNumber();
	
	if (n < knbLowNote.getValue() || n > knbHighNote.getValue())
		return;
		
	Message.ignoreEvent(!btnNote[n % 12].getValue());
}
 function onNoteOff()
{
	local n = Message.getNoteNumber();
	
	if (!btnNoteOff.getValue())
		return;
	
	if (n < knbLowNote.getValue() || n > knbHighNote.getValue())
		return;
		
	Message.ignoreEvent(!btnNote[n % 12].getValue());
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
 