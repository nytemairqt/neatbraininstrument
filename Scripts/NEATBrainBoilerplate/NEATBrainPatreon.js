const pnlPatreon = createChildPanel("pnlPatreon", 546, 21, 18, 18, "pnlHeader");
const pnlStore = createChildPanel("pnlStore", 516, 21, 18, 18, "pnlHeader");

pnlPatreon.set("tooltip", "Support on Patreon.");
pnlPatreon.set("allowCallbacks", "Clicks & Hover");
pnlStore.set("tooltip", "Browse Instruments.");
pnlStore.set("allowCallbacks", "Clicks & Hover");

// Callbacks
pnlPatreon.setMouseCallback(function(event)
{
	if (event.clicked)
	{
		Engine.openWebsite("https://www.iamlamprey.com");
	}

	this.data.hover = event.hover;
	this.repaint();	
});

pnlStore.setMouseCallback(function(event)
{
	if (event.clicked)
	{
		Engine.openWebsite("https://www.iamlamprey.com");
	}

	this.data.hover = event.hover;
	this.repaint();	
});

// Paint Routines
pnlPatreon.setPaintRoutine(function(g)
{
	g.setColour(Colours.withAlpha(0xFFCFCFCF, this.data.hover ? 1.0 : 0.8));
	
	g.fillRect([0, 0, 4, 18]);
	g.fillEllipse([5, 0, 12, 12]);
});

pnlStore.setPaintRoutine(function(g)
{
	g.setColour(Colours.withAlpha(0xFFCFCFCF, this.data.hover ? 1.0 : 0.8));
	

	// Body
	g.fillRect([2, 5, 14, 14]);
	
	// Handle
	g.drawLine(5, 5, 5, 1, 2.0); 
	g.drawLine(13, 13, 5, 1, 2.0);
	g.drawLine(6, 12, 2, 2, 2.0);
	
});