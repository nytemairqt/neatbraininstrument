reg lastNote;

const knbTrigger = Content.addKnob("Trigger", 0, 0);
knbTrigger.set("text", "Trigger");
knbTrigger.setRange(0, 127, 1);

const btnTranspose = Content.addButton("UseTranspose", 150, 10);
btnTranspose.set("text", "Use Transpose");
btnTranspose.set("tooltip", "When enabled the last note will be triggered using the setTransposeAmount function.");function onNoteOn()
{
	local n = Message.getNoteNumber();
	local t = Message.getTransposeAmount();
	
	if (n == knbTrigger.getValue())
	{
		local interval = -Math.round(n - lastNote - t);
		
		if (btnTranspose.getValue())
			Message.setTransposeAmount(interval);
		else
			Message.setNoteNumber(lastNote);
	}

	if (!Synth.isKeyDown(knbTrigger.getValue()) && n != knbTrigger.getValue())
	    lastNote = n;
}
 function onNoteOff()
{
	local n = Message.getNoteNumber();
	local t = Message.getTransposeAmount();
	
	if (isDefined(lastNote) && n == knbTrigger.getValue())
	{
		local interval = -Math.round(n - lastNote - t);

		if (btnTranspose.getValue())
			Message.setTransposeAmount(interval);
		else
			Message.setNoteNumber(lastNote);
	}
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
 