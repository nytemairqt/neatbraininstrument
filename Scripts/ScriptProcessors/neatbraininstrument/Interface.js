Content.makeFrontInterface(1000, 710);


Engine.loadAudioFilesIntoPool();

include("RhapsodyBoilerplate/includes/Ui.js");
include("RhapsodyBoilerplate/includes/LookAndFeel.js");
include("RhapsodyBoilerplate/includes/Paths.js");
include("RhapsodyBoilerplate/includes/Expansions.js");
include("RhapsodyBoilerplate/includes/Header.js");
include("RhapsodyBoilerplate/includes/Footer.js");
include("RhapsodyBoilerplate/includes/Presets.js");
include("RhapsodyBoilerplate/includes/UserSettings.js");
include("RhapsodyBoilerplate/includes/Spinner.js");

const var ComboBox1 = Content.getComponent("ComboBox1");

//ComboBox1.set("items", "nothing");

for (w in Engine.getWavetableList())
{
	Console.print(w);
	ComboBox1.addItem(w);
}


/* NEATBrain Global Vars */

const MODES_L = [    
   1.0,
  1.552380952380952,
  2.076190476190476,
  2.619047619047619,
  3.190476190476191,
  3.695238095238095,
  4.257142857142857,
  4.79047619047619,
  5.285714285714286,
  5.895238095238096
  ];
  
const MODES_R = [
    1.0,
      1.537735849056604,
      2.066037735849056,
      2.622641509433962,
      3.19811320754717,
      3.69811320754717,
      4.283018867924528,
      4.726415094339623,
      5.29245283018868,
      5.90566037735849];

const NUM_MODES = MODES_L.length;
const INITIALIZE_RATIOS = false;
var STEREO_INSTRUMENT = true;
reg randomGlobalIntensity = .1;
reg randomGlobalDirection = 0.5;
reg randomGlobalBang = 0.0;

/* NEATBrain External Files */

include("NEATBRAINBoilerplate/NEATBrainUi.js");

/* INSTRUMENT DATA */



/*
const MODES_L = [1.0,
    1.984811516404366,
    2.989343587647727,
    3.987621589028747,
    4.994306573992338,
    5.996539273606929,
    6.993069999405504,
    8.031158333590003,
    9.060198886798654,
    10.12726228734718,
    11.16737207126846,
    12.21771477510835,
    13.285298156059,
    14.34680741315559,
    15.45087241525689,
    16.53472203639681,
    17.67059404683915,
    18.76762827202367,
    19.94338396877705,
    21.30332125725249,
    22.39275635543807,
    24.74455797192716,
    26.00811965603957,
    27.19706068972287,
    28.53020745197155,
    29.7514432324793,
    31.11213974195163];
*/

// Comment out for Mono Instruments

/*
const MODES_R = [1.0,
    1.997420838486636,
    2.995898201674351,
    3.995868175566671,
    4.997510768606655,
    5.998439466400024,
    7.006170177062672,
    8.011351171143776,
    9.020196782090531,
    10.03089567712434,
    11.05010977438268,
    12.05216471629338,
    13.05726391895568,
    14.08014368859455,
    15.17413642007382,
    16.18025080630547,
    17.2200771904748,
    18.25423565208579,
    19.07272679659623,
    20.45492212382793,
    21.44072871531024,
    22.53225606059556,
    23.58942200664093,
    24.68886685057051,
    26.86579718386571,
    27.96432995023516,
    29.07589813787308];
*/



//SliderPack_RatiosL.set("sliderAmount", NUM_MODES);
//SliderPack_RatiosR.set("sliderAmount", NUM_MODES);



//Content.getComponent("Button1").setControlCallback(onButton1Control);


if (isDefined(MODES_R))
{
	STEREO_INSTRUMENT = true;   
    
}

function onNoteOn()
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
 