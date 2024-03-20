reg rr = 0;
reg m = 0;
reg v = 0;function onNoteOn()
{
	m = Message.getNoteNumber();
	v = Message.getVelocity();
	
	// Humanization
	Message.delayEvent(humanizationLeft);
	
}
 function onNoteOff()
{
	// Humanization FIX
	Message.delayEvent(humanizationLeft + 1);
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
 