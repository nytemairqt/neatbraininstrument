//License - Public Domain
//David Healey 2019, 2022, 2023

Content.setWidth(1050);

const var NUM_CHANNELS = 6;

const var samplerIds = Synth.getIdList("Sampler");
const var samplers = [];

for (id in samplerIds)
    samplers.push(Synth.getSampler(id));

// btnInvert
const btnInvert = Content.addButton("Invert", 10, 10);

// btnPurge
const var btnPurge = [];

for (i = 0; i < NUM_CHANNELS; i++)
{
    btnPurge[i] = Content.addButton("Purge" + i, 160 + i * 150, 10);
    btnPurge[i].setControlCallback(onbtnPurgeControl);
}

inline function onbtnPurgeControl(component, value)
{
    local index = btnPurge.indexOf(component);

	for (s in samplers)
	{
		if (s.getNumMicPositions() <= 1) continue;
		if (index >= s.getNumMicPositions()) continue;

		local micName = s.getMicPositionName(index);
		s.purgeMicPosition(micName, btnInvert.getValue() - value);
	}
}function onNoteOn()
{
	
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
 