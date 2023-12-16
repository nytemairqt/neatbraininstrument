inline function disableGroupFilter()
{

}

inline function disableAHDSR()
{
	for (a in ahdsrsL)
		a.setBypassed(1);
	if (isDefined(ahdsrsR[0]))
		for (a in ahdsrsR)
			a.setBypassed(1);
}

inline function disablePitchConstant()
{
	for (a in ahdsrsL)
		a.setBypassed(1);
	if (isDefined(ahdsrsR[0]))
		for (a in ahdsrsR)
			a.setBypassed(1);
}


inline function disablePitchDrift()
{
	for (a in ahdsrsL)
		a.setBypassed(1);
	if (isDefined(ahdsrsR[0]))
		for (a in ahdsrsR)
			a.setBypassed(1);
}

inline function disablePitchRandom()
{

}

inline function disablePitchVelocity()
{
	
}

