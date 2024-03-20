reg rr = 0;
reg m = 0;
reg v = 0;function onNoteOn()
{
	m = Message.getNoteNumber();
	v = Message.getVelocity();
		
	if (m < 24)
		Message.ignoreEvent(1);
	
	if (m > 88)
		Message.ignoreEvent(1);	
		
	// Transient Offset
	
	Message.delayEvent(700);
	
	// Humanization
	Message.delayEvent(humanizationLeft);
	
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
 