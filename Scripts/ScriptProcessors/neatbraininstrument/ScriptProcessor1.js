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
	
	/*
	// Mute
	if (v < 64)
	{
		Console.print("Palm Mute");

		Message.ignoreEvent(1);
		Synth.playNote(m, Math.randInt(1, 8));
	}
		
	// Sustain
	if (v > 64 && v < 120)
	{
		Console.print("Sustain");

		Message.ignoreEvent(1);
		Synth.playNote(m, Math.randInt(9, 16));
	}
	
	// Harmonics
	
	if (v > 120)
	{
		Console.print("Harmonic");

		Message.ignoreEvent(1);
		Synth.playNote(m, Math.randInt(17, 24));
	}
	*/
	
	//Message.setVelocity(5);
	
	
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
 