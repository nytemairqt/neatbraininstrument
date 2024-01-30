reg m;
reg v;
reg note;
reg chance = .1; // 10% Chance
reg roll;function onNoteOn()
{
	Message.ignoreEvent(1);
}
 function onNoteOff()
{
	roll = Math.random();
	
	if (roll < chance)
	{
		note = Math.randInt(1, 15);
		v = Math.randInt(1, 127);
		Synth.playNote(note, v);
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
 