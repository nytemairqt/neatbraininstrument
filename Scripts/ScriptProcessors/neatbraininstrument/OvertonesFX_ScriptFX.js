 function prepareToPlay(sampleRate, blockSize)
{
	
}
 function processBlock(channels)
{
	for (c in channels)
	{
		for (s in c)
		{
			s = s + Math.abs(s);
		}
	}
}
 function onControl(number, value)
{
	
}
 