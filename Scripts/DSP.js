// Adding Overtones

namespace DSP{

const overtonesDSP = "333.3ocSQ1rSBDCEE9VwYAS7gnKGhDCr13FXjDVngvfF11oyEogRuSZ6fhFdG8MR67CAZ5hd9N81dtsKrjDcNxBraWcrDAVbTlzpJ8yVCySA1ccR9r0igIGKENGV.LVuVLv9MhuoxH8JxvKsXovhqnEZwwDmXeoFWJ73Pdtlj6xTeiCh+Ite7o3qKpIBSp2QhbqvXPsqYaaHKOQxUF9Eb+.u0v0XDHMn9N9SbG+d9KB+1GD4tD2fGC7Swg40WGYlRFukzIlp84ncH+fPWcIW.K54BkmrY9Pxc.q2Dp3X1V5SSXczX3ckSkqwVQFoo5Ui.X5VktXw42SG.vRpxqLeDRjU8U3besZeFUYk3zt1IvX2.0k1nGUqCRHCMEMh+BiNyw0ZVm43ylPcyfFef+17TgW.g+lNVHKkn0qpaBVJdPIw1u39QonammJA3e.vGdYU";

inline function CREATE_OVERTONE_FX()
{

	local overtonesFX = Builder.builder.create("SlotFX", "OvertonesFX", 0, builder.ChainIndexes.FX);
	local overtonesFXref = Builder.builder.get(overtonesFX, builder.InterfaceTypes.SlotFX);
	local scriptFX =  overtonesFXref.setEffect("ScriptFX");
	scriptFX.restoreState(overtonesDSP);
}



} // end of namespace