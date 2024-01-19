 function onNoteOn()
{
	if (Synth.isLegatoInterval())
		Message.ignoreEvent(true);
}
 function onNoteOff()
{
	if (Synth.isLegatoInterval())
		Message.ignoreEvent(true);
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
 