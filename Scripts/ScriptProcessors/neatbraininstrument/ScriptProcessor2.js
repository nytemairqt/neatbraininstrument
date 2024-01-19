reg rr = 0;
reg m = 0;function onNoteOn()
{
	Message.ignoreEvent(rr);
	
	rr = 1-rr;
	
	m = Message.getNoteNumber();
		
	if (m < 24)
		Message.ignoreEvent(1);
	
	if (m > 88)
		Message.ignoreEvent(1);	
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
 