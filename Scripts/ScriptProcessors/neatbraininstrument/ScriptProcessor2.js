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
	
	// Mute
	if (v < 64)
	{
		Message.ignoreEvent(1);
		Synth.playNote(m, Math.randInt(1, 8));
	}
		
	// Sustain
	if (v > 64 && v < 120)
	{
		Message.ignoreEvent(1);
		Synth.playNote(m, Math.randInt(9, 16));
	}
	
	// Harmonics
	
	if (v > 120)
	{
		Message.ignoreEvent(1);
		Synth.playNote(m, Math.randInt(17, 24));
	}
	
	
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
 