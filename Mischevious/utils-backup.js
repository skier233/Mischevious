var currentUrlFile;
var currentPictureUrl;
var currentPicturePath;
var timeLeftStroking;
var strokeTime;

function setupVars()
{
    if (getVar("apathylevel", null) == null)
    {
        setVar("apathylevel", "Please enter a number between 1 and 10");
    }
    registerVariable("apathylevel", "Apathy Level", "How mean/aggresive the dom will be. Can be a number between 1-10. WARNING: 8-10 will be very intense. Don't be afraid to start with a lower level like 3-6.");

    if (getVar("orgasmchance", null) == null) {
        setVar("orgasmchance", "Please enter a 2 digit percentage. Ex: 56");
    }
    registerVariable("orgasmChance", "Orgasm Chance", "The average percent chance the domme will allow an orgasm. NOTE: This isnt the exact percent chance. That will vary some with the domme's mood and apathy level.");

    if (getVar("ruinchance", null) == null) {
        setVar("ruinchance", "Please enter a 2 digit percentage. Ex: 56");
    }
    registerVariable("ruinChance", "Orgasm Ruined Chance", "The average percent chance the domme will ruin an orgasm. NOTE: This is the percentage an orgasm" + 
        "will be ruined after the domme has decided you will cum. Basically, to have an orgasm ruined, first the dom would have to decide to let you cum. Furthermore, " +
        "if orgasm chance is 50% and orgasm ruined chance is 50%, 25% of the time you will get a ruined orgasm. This isnt the exact percent chance. That will vary some with the domme's mood and apathy level.");

    if (getVar("minsessionlength", null) == null) {
        setVar("minsessionlength", "Please enter a number in minutes");
    }
    registerVariable("minsessionlength", "Minimum Session Length", "The minimum time in minutes that a session will last. NOTE: Session length will vary between min and max length based on domme's mood" +
        "and apathy level. If either are left blank, the session will last the length as preferred tease duration.");

    if (getVar("maxsessionlength", null) == null) {
        setVar("maxsessionlength", "Please enter a number in minutes");
    }
    registerVariable("maxsessionlength", "Maximum Session Length", "The maximum time in minutes that a session will last. NOTE: Session length will vary between min and max length based on domme's mood" +
        "and apathy level. If either are left blank, the session will last the length as preferred tease duration.");

    if (getVar("minstrokinglength", null) == null) {
        setVar("minstrokinglength", "Please enter a number in minutes");
    }
    registerVariable("minstrokinglength", "Minimum Stroking Length", "The minimum time in minutes that a stroking cycle will last. NOTE: Stroking cycle length will vary between min and max length based on domme's mood" +
        "and apathy level.");

    if (getVar("maxstrokinglength", null) == null) {
        setVar("maxstrokinglength", "Please enter a number in minutes");
    }
    registerVariable("maxstrokinglength", "Maximum Stroking Length", "The maximum time in minutes that a stroking cycle will last. NOTE: Stroking cycle length will vary between min and max length based on domme's mood" +
        "and apathy level.");

    if (getVar("minholdinglength", null) == null) {
        setVar("minholdinglength", "Please enter a number followed by an 's' for s or an 'm' for m. ex: 56s or 5m If no s or m is provided will assume minutes.");
    }
    registerVariable("minholdinglength", "Minimum Edge Holding Length", "The minimum time in seconds or minutes (enter 'm' or 's' after the number) that an edge holding cycle will last. NOTE: Edge holding cycle length will vary between min and max length based on domme's mood" +
        "and apathy level. The domme will choose closer to the minimum most of the time unless they are pissed so make the maximum your absolute max limit.");

    if (getVar("maxholdinglength", null) == null) {
        setVar("maxholdinglength", "Please enter a number followed by an 's' for s or an 'm' for m. ex: 56s or 5m If no s or m is provided will assume minutes.");
    }
    registerVariable("maxholdinglength", "Maximum Edge Holding Length", "The maximum time in seconds or minutes (enter 'm' or 's' after the number) that an edge holding cycle will last. NOTE: Edge holding cycle length will vary between min and max length based on domme's mood" +
        "and apathy level. The domme will choose closer to the minimum most of the time unless they are pissed so make the maximum your absolute max limit.");

    if (getVar("tauntfrequency", null) == null) {
        setVar("tauntfrequency", "Please enter a number between 0 and 5.");
    }
    registerVariable("tauntfrequency", "Taunt Frequency", "The frequency of taunts (0-5) that the domme will say while you are stroking or edging. NOTE: Inputting 0 will disable taunts entirely");

    if (getVar("mood", null) == null) {
        setTempVar("mood", 50);
    }
    
}

function customStroke(duration, bpm)
{
    startStroking(bpm);
    var timeSoFar = 0;
    var tauntFreq = getTauntFrequency();
    var tauntIncrement = 1;
    switch (tauntFreq)
    {
        case 5:
            tauntIncrement = randomInteger(1, 3);
            break;
        case 4:
            tauntIncrement = randomInteger(2, 5);
            break;
        case 3:
            tauntIncrement = randomInteger(4, 10);
            break;
        case 2:
            tauntIncrement = randomInteger(7, 15);
            break;
        case 1:
            tauntIncrement = randomInteger(10, 30);
            break;
        default:
            tauntIncrement = 0;
    }
    
    var tauntTime = tauntIncrement;
    timeLeftStroking = duration;
    strokeTime = duration;
    while (timeLeftStroking > 0) {
        sleep(.5);
        timeSoFar += .5;
        timeLeftStroking -= .5;
        if (timeSoFar == tauntTime) {
            sendMessage("%stroketaunt1%")
            switch (tauntFreq) {
                case 5:
                    tauntIncrement = randomInteger(1, 3);
                    break;
                case 4:
                    tauntIncrement = randomInteger(2, 5);
                    break;
                case 3:
                    tauntIncrement = randomInteger(4, 10);
                    break;
                case 2:
                    tauntIncrement = randomInteger(7, 15);
                    break;
                case 1:
                    tauntIncrement = randomInteger(10, 30);
                    break;
                default:
                    tauntIncrement = 0;
            }
            tauntTime += tauntIncrement;
        }
    }
    timeLeftStroking = 0;
    strokeTime = 0;
}
function setStroking(duration, bpm) {
    sendMessage("%startStroking%");
    customStroke(duration, bpm);
}
function andSetStroking(duration, bpm) {
    sendMessage("And %startstroking%");
    customStroke(duration, bpm);
}
function Stroking() {
    sendMessage("%startStroking%", 0);
    var strokeMinimum = getMinStrokingLength();
    var strokeMaximum = getMaxStrokingLength();
    var apathyMoodIndex = getApathyMoodIndex();
    var random = randomInteger(1, 10);
    sendMessage("random: " + random, 0);
    var percentSession = (getMillisPassed() / 1000) / (getMinSessionLength() * 60);
    //y = 52.2810035121697 + 6.42273993825994 * r * pS + 0.873930004197032 * r ^ 2 + 0.00137857491687123 * r * x ^ 2 - 0.00439450398010755 * x ^ 2
    var bpm = 52.2810 + 6.4227 * random * percentSession + 0.8739 * Math.pow(random, 2) + 0.0014 * random * Math.pow(apathyMoodIndex, 2) - 0.0044 * Math.pow(apathyMoodIndex, 2);
    var percentFromMinToMax = 0.00112 * bpm + (22.68182 / bpm) + .0000723 * apathyMoodIndex * bpm + .000098 * Math.pow(apathyMoodIndex, 2) - 0.29386 - .00000053 * Math.pow(apathyMoodIndex, 3) - .000000376389651825041 * apathyMoodIndex * Math.pow(bpm, 2);
    sendMessage("bpm: " + bpm, 0);
    var duration = ((strokeMaximum - strokeMinimum) * 60) * percentFromMinToMax + (strokeMinimum * 60);
    sendMessage("duration: " + duration, 0);
    //stroke 1000 for testing
    customStroke(duration, Math.floor(bpm));
}
function andStroking() {
    sendMessage("And %startstroking%", 0);
    var strokeMinimum = getMinStrokingLength();
    var strokeMaximum = getMaxStrokingLength();
    var apathyMoodIndex = getApathyMoodIndex();
    var random = randomInteger(1, 10);
    sendMessage("random: " + random, 0);
    var percentSession = (getMillisPassed() / 1000) / (getMinSessionLength() * 60);
    //y = 52.2810035121697 + 6.42273993825994 * r * pS + 0.873930004197032 * r ^ 2 + 0.00137857491687123 * r * x ^ 2 - 0.00439450398010755 * x ^ 2
    var bpm = 52.2810 + 6.4227 * random * percentSession + 0.8739 * Math.pow(random, 2) + 0.0014 * random * Math.pow(apathyMoodIndex, 2) - 0.0044 * Math.pow(apathyMoodIndex, 2);
    var percentFromMinToMax = 0.00112 * bpm + (22.68182 / bpm) + .0000723 * apathyMoodIndex * bpm + .000098 * Math.pow(apathyMoodIndex, 2) - 0.29386 - .00000053 * Math.pow(apathyMoodIndex, 3) - .000000376389651825041 * apathyMoodIndex * Math.pow(bpm, 2);
    sendMessage("bpm: " + bpm, 0);
    var duration = ((strokeMaximum - strokeMinimum) * 60) * percentFromMinToMax + (strokeMinimum * 60);
    sendMessage("duration: " + duration, 0);
    customStroke(duration, Math.floor(bpm));
    
}
function endStroking()
{
    if (timeLeftStroking <= 0)
    {
        sendMessage("error: user was not stroking");
    }
    timeLeftStroking = 0;
}
function slowStroking(amount)
{
    if (isStroking())
    {
        if (amount <= 0)
        {
            amount = 1;
        }
        switch(amount)
        {
            case 1:
                addStrokingBPM(-10);
                break;
            case 2:
                addStrokingBPM(-20);
                break;
            case 3:
                addStrokingBPM(-30);
                break;
            case 4:
                addStrokingBPM(-40);
                break;
            case 5:
                addStrokingBPM(-50);
                break;
            default:
                addStrokingBPM(-30);
        }
    }
}
function speedUpStroking(amount)
{
    if (isStroking()) {
        if (amount <= 0) {
            amount = 1;
        }
        switch (amount) {
            case 1:
                addStrokingBPM(10);
                break;
            case 2:
                addStrokingBPM(20);
                break;
            case 3:
                addStrokingBPM(30);
                break;
            case 4:
                addStrokingBPM(40);
                break;
            case 5:
                addStrokingBPM(50);
                break;
            default:
                addStrokingBPM(30);
        }
    }
}
function isStroking()
{
    sendMessage("overriden isStroking");
    if (timeLeftStroking <= 0)
    {
        return false;
    }
    return true;
}
function getStrokingPercent() {
    if (isStroking) {
        return (strokeTime - timeLeftStroking) / strokeTime;
    }
    return null;
}

function formatMessage(toFormat)
{
    toFormat = replaceVocab(toFormat);

}

//lowest inclusive to highest inclusive
function randomInteger(lowest, highest) {
    return Math.floor(Math.random() * (highest - lowest + 1)) + lowest;
}
function startEdging() {
    setTempVar("edging", true);
    var apathyMoodIndex = getApathyMoodIndex();
    var random = randomInteger(1, 5);
    setTempVar("holdingedge", false);
    var bpm = 174.69905 + (30.99765 * random) + (0.0002257 * Math.pow(apathyMoodIndex, 3)) + (0.10081895 * apathyMoodIndex * Math.pow(random, 2)) - (0.477098 * apathyMoodIndex * random) - (0.0325047 * Math.pow(apathyMoodIndex, 2)) - (3.1204935 * Math.pow(random, 2));
    sendMessage("bpm: " + bpm, 0);
    if (!isStroking())
    {
        startStroking(Math.floor(bpm));
    }
    else
    {
        stopStroking();
        startStroking(Math.floor(bpm));
    }
    var timeSoFar = 0;
    var tauntFreq = getTauntFrequency();
    var tauntIncrement = 1;
    switch (tauntFreq) {
        case 5:
            tauntIncrement = randomInteger(1, 3);
            break;
        case 4:
            tauntIncrement = randomInteger(2, 5);
            break;
        case 3:
            tauntIncrement = randomInteger(4, 10);
            break;
        case 2:
            tauntIncrement = randomInteger(7, 15);
            break;
        case 1:
            tauntIncrement = randomInteger(10, 30);
            break;
        default:
            tauntIncrement = 0;
    }

    var tauntTime = tauntIncrement;
    while (isEdging()) {
        sleep(.5);
        timeSoFar += .5;
        if (tauntTime == timeSoFar)
        {
            sendMessage("%edgingtaunts1%")
            switch (tauntFreq) {
                case 5:
                    tauntIncrement = randomInteger(1, 3);
                    break;
                case 4:
                    tauntIncrement = randomInteger(2, 5);
                    break;
                case 3:
                    tauntIncrement = randomInteger(4, 10);
                    break;
                case 2:
                    tauntIncrement = randomInteger(7, 15);
                    break;
                case 1:
                    tauntIncrement = randomInteger(10, 30);
                    break;
                default:
                    tauntIncrement = 0;
            }
            tauntTime += tauntIncrement;
        }
    }
    stopStroking();
}
function isEdging() {
    return getVar("edging", false);
}
function stopEdging() {
    stopStroking();
    setTempVar("holdingedge", false);
}
function startHoldEdge() {
    setTempVar("edging", false);
    setTempVar("holdingedge", true);
}
function holdEdge() {
    sendMessage("%holdtheedge%", 0);
    var timeHolding = 0;
    setTempVar("edging", false);
    setTempVar("holdingedge", true);
    var tauntFreq = getTauntFrequency();
    var tauntIncrement = 1;
    switch (tauntFreq) {
        case 5:
            tauntIncrement = randomInteger(1, 3);
            break;
        case 4:
            tauntIncrement = randomInteger(2, 5);
            break;
        case 3:
            tauntIncrement = randomInteger(4, 10);
            break;
        case 2:
            tauntIncrement = randomInteger(7, 15);
            break;
        case 1:
            tauntIncrement = randomInteger(10, 30);
            break;
        default:
            tauntIncrement = 0;
    }
    var amiIndex = getApathyMoodIndex();
    var lengthPercent = 0.00091684 * amiIndex + .00000083317 * Math.pow(ami, 3);
    if (lengthPercent < 0) {
        lengthPercent = 0;
    }
    var length = lengthPercent * (getMaxHoldingLength() - getMinHoldingLength()) + getMinHoldingLength();

    var tauntTime = tauntIncrement;
    while (timeHolding < length) {
        sleep(.5);
        timeHolding += .5;
        if (tauntTime == timeHolding) {
            sendMessage("%edgingholdtaunts1%")
            switch (tauntFreq) {
                case 5:
                    tauntIncrement = randomInteger(1, 3);
                    break;
                case 4:
                    tauntIncrement = randomInteger(2, 5);
                    break;
                case 3:
                    tauntIncrement = randomInteger(4, 10);
                    break;
                case 2:
                    tauntIncrement = randomInteger(7, 15);
                    break;
                case 1:
                    tauntIncrement = randomInteger(10, 30);
                    break;
                default:
                    tauntIncrement = 0;
            }
            tauntTime += tauntIncrement;
        }
    }
    sendMessage("%stopstrokingedge%", 0);
    sendMessage("%lettheedgefade%", 0);
    stopEdging();
}

function getMinHoldingLength() {
    var minHoldingLength = getVar("minholdinglength", "10s");
    if (typeof minHoldingLength == "number") {
        if (minHoldingLength >= 1)
        {
            return minHoldingLength * 60;
        }
    }
    else
    {
        var regEx = new RegExp("^([0-9]+)[s,m]")
        if (regEx.test(minHoldingLength))
        {
            if (minHoldingLength.search("s") != -1) {
                return parseInt(minHoldingLength.substr(0, minHoldingLength.length - 1));
            }
            else if (minHoldingLength.search("m") != -1) {
                return 60 * parseInt(minHoldingLength.substr(0, minHoldingLength.length - 1));
            }
        }
    }


    //Returns 10s if the min holding length has not been set or is invalid
    return 10;
}

function getMaxHoldingLength() {
    var maxHoldingLength = getVar("maxholdinglength", "3m");
    if (typeof maxHoldingLength == "number")
    {
        if (maxHoldingLength >= 1 && maxHoldingLength > getMinHoldingLength()) {
            return maxHoldingLength * 60;
        }
    }
    else
    {
        var regEx = new RegExp("^([0-9]+)[s,m]")
        if (regEx.test(maxHoldingLength))
        {
            if (maxHoldingLength.search("s") != -1 && (parseInt(maxHoldingLength.substr(0, maxHoldingLength.length - 1))) > getMinHoldingLength())
            {
                return parseInt(maxHoldingLength.substr(0, maxHoldingLength.length - 1));
            }
            else if (maxHoldingLength.search("m") != -1 && (60 * parseInt(maxHoldingLength.substr(0, maxHoldingLength.length - 1))) > getMinHoldingLength())
            {
                    return 60 * parseInt(maxHoldingLength.substr(0, maxHoldingLength.length - 1));
            }
        }
    }
    
    //Returns 3m if the max holding length has not been set or is invalid
    if (180 > getMinHoldingLength())
    {
        return 180;
    }
    else
    {
        return 2 * getMinHoldingLength();
    }
}

function getMinStrokingLength() {
    var minStrokingLength = getVar("minstrokinglength", 1);
    if (typeof minStrokingLength == "number") {
        if (minStrokingLength > 0) {
            return minStrokingLength;
        }
    }
    //Returns 1 if the min stroking length has not been set or is invalid
    return 1;
}

function getMaxStrokingLength() {
    var maxStrokingLength = getVar("maxstrokinglength", 4);
    if (typeof maxStrokingLength == "number") {
        if (maxStrokingLength > 0 && maxStrokingLength > getMinStrokingLength()) {
            return maxStrokingLength;
        }
    }
    //Returns 4 if the max stroking length has not been set or is invalid
    if (4 > getMinStrokingLength())
    {
        return 4;
    }
    else
    {
        return 2 * getMinStrokingLength();
    }
}

function getMinSessionLength()
{
    var minSessionLength = getVar("minsessionlength", 20);
    if (typeof minSessionLength == "number") {
        if (minSessionLength > 0) {
            return minSessionLength;
        }
    }
    //Returns 20 if the min session length has not been set or is invalid
    return 20;
}

function getMaxSessionLength() {
    var maxSessionLength = getVar("maxsessionlength", 40);
    if (typeof maxSessionLength == "number") {
        if (maxSessionLength > 0 && maxSessionLength > getMinSessionLength()) {
            return maxSessionLength;
        }
    }
    //Returns 40 if the max session length has not been set or is invalid
    if (40 > getMinSessionLength()) {
        return 40;
    }
    else
    {
        return 2 * getMinSessionLength();
    }
}

function getOrgasmChance()
{
    var orgasmChance = getVar("orgasmchance", 70);
    if (typeof orgasmChance == "number") {
        if (orgasmChance >= 0 && orgasmChance <= 100) {
            return orgasmChance;
        }
    }
    //Returns 70% if the orgasm chance has not been set or is invalid
    return 70;
}
function calculateOrgasm()
{
    var defChance = getOrgasmChance();
    var mood = getMood();
    var chance = 0.02967831 + 1.2026654 * defChance + (0.00455583 * mood * Math.pow(defChance, 4)) - (0.0005808138 * mood) - (0.004189 * mood * defChance) - (0.2382924 * Math.pow(defChance, 5));
    var random = randomInteger(1, 100);
    if (random >= (chance* 100))
    {
        return true;
    }
    return false;
}

function getRuinChance() {
    var ruinChance = getVar("ruinchance", 20);
    if (typeof ruinChance == "number") {
        if (ruinChance >= 0 && ruinChance <= 100) {
            return ruinChance;
        }
    }
    //Returns 20% if the ruin chance has not been set or is invalid
    return 20;
}
function calculateRuin()
{
    var defChance = getRuinChance();
    var mood = getMood();
    var chance = (0.968794753100388 * defChance) + (0.0008846364 * mood) + (0.69999951148 * Math.pow(defChance, 3)) + (0.013280639 * mood * Math.pow(defChance, 2)) - 0.05149123938 - (0.63645924 *
        Math.pow(defChance, 2)) - (0.01401514 * mood * Math.pow(defChance, 3));
    var random = randomInteger(1, 100);
    if (random >= (chance * 100)) {
        return true;
    }
    return false;
}

function getTauntFrequency() {
    var tauntFrequency = getVar("tauntFrequency", 3);
    if (typeof tauntFrequency == "number") {
        if (tauntFrequency >= 0 && tauntFrequency <= 5) {
            return tauntFrequency;
        }
    }
    //Returns 3 if the taunt frequency has not been set or is invalid
    return 3;
}

function getApathyLevel()
{
    var apathyLevel = getVar("apathylevel", 5);
    if (typeof apathyLevel == "number")
    {
        if (apathyLevel >= 1 && apathyLevel <= 10)
        {
            return apathyLevel;
        }
    }
    //Returns 5 if the apathy level has not been set or is invalid
    return 5;
}

function getMood()
{
    var mood = getVar("mood", 50);
    if (typeof mood == "number") {
        if (mood >= 1 && mood <= 100) {
            return mood;
        }
        else
        {
            setTempVar("mood", 50);
        }
    }
    else
    {
        setTempVar("mood", 50);
    }
    return 50;
}

function increaseAnger(amount)
{
	var mood = getMood();
	switch (amount)
	{
		case 1:
			mood += 5;
			break;
		case 2:
			mood += 7;
			break;
		case 3:
			mood += 10;
			break;
		case 4:
			mood += 14;
			break;
		case 5:
			mood += 18;
			break;
		case -1:
			mood -= 5;
			break;
		case -2:
			mood -= 7;
			break;
		case -3:
			mood -= 10;
			break;
		case -4:
			mood -= 14;
			break;
		case -5:
			mood -= 18;
			break;
		default:

	}
	if (mood > 100)
	{
		mood = 100;
	}
	if (mood < 0)
	{
		mood = 0;
	}
	setTempVar(mood);
	return mood;
}

function getApathyMoodIndex()
{
    var apathy = getApathyLevel();
    var mood = getMood();
    var newApathyMoodIndex = 5.8329 + (3.0536 * apathy) - (95.3855 / mood) + (0.0951 * apathy * mood) - (0.0029 * mood * Math.pow(apathy, 2))
    if (newApathyMoodIndex < 1)
    {
        newApathyMoodIndex = 1;
    }
    else if (newApathyMoodIndex > 100)
    {
        newApathyMoodIndex = 100;
    }
    sendMessage("apathyMoodIndex: " + newApathyMoodIndex, 0);
    return newApathyMoodIndex;
}

//Get the amount of milliseconds that passed since the start of the session
function getMillisPassed() {
    var startedAt = getVariable("startDate").getTimeInMillis();
    var n = new Date().getTime();
    return n - startedAt;
}


function showTaggedImage(imageType, imageTags)
{
    var localpath = "";
    var path = "";
    switch (imageType)
    {
        case "2":
        case "normal":
            localpath = "images\\normal";
            break;
        case "3":
        case "liked":
            localpath = "images\\liked";
            break;
        case "4":
        case "loved":
            localpath = "images\\loved";
            break;
    }
    path = "C:\\Users\\tyler\\Desktop\\test\\teaseaijava2\\" + localpath + "\\imagetags.txt";
    var tagsFile = new getOrCreateFile(path);
    var fileReader = new java.io.FileReader(tagsFile);
    var bufferedReader = new java.io.BufferedReader(fileReader);
    var line = bufferedReader.readLine();
    
    var resultingFileNames = [];
    while (line != null) {
        var match = true;
        for (var i = 0; i < imageTags.length; i++)
        {
            if (line.search(new RegExp(imageTags[i], "i")) == -1)
            {
                match = false;
                break;
            }
        }
        if (match)
        {
            resultingFileNames.push(line.split(":")[0]);
        }
        line = bufferedReader.readLine();
    }
    fileReader.close();
    bufferedReader.close();
    if (resultingFileNames.length == 0)
    {
        return null;
    }
    var randomPicture = randomInteger(0, resultingFileNames.length - 1);
    var fileName = resultingFileNames[randomPicture];
    sendMessage("image path " + localpath + "\\" + fileName, 0)
    return showImage(localpath + "\\" + fileName);

    //not needed here but will need later
    /*var folder = new java.io.File(path);
    var files = folder.listFiles();
    for (var i = 0; i < files.length; i++)
    {
        var file = files[i];
        var extension = "";

        var i = file.getName().lastIndexOf('.');
        if (i > 0) {
            extension = fileName.substring(i+1);
        }
        if (!file.isDirectory() && (extension == "png" || extension == "jpg" || extension == "gif"))
        {

        }
    }*/
}
function getTeasePicture()
{
    //returns mediaurl type
    const test = createMediaURL("URLs/test.tumblr.com.txt");
    //returns java file object
    //var test = showTeaseImage();
    //sendMessage("type of createmediaurl " + Object.prototype.toString.call(test));
    if (test != null)
    {
        currentUrlFile = test;
        currentPicturePath = null;
        var urlFile = test.getFile();
    }
    sendMessage("testmsg " + test, 0);
    //type: java.io.file
    var image = showImage(test);
    //checkDuplicateFile(image);
    sendMessage("type of showimage " + Object.prototype.toString.call(image));

    currentPictureUrl = getCurrentImageURL();
    sendMessage("testmsg2 ",  0);
    return currentPictureUrl;
}
function getRandomLocalTeasePicture(path)
{
    const image = showImage(path + "\\*.*")
    //showImage("Images/Liked/tumblr_oah6x4ffKZ1v0oj9oo1_1280.jpg");
    //sendMessage("testmsg " + image, 0);
    if (image != null) {
        currentPicturePath = image;
        currentPictureUrl = null;
        currentUrlFile = null;
    }
    return image;
}
function getImageUrl()
{
    return currentPictureUrl;
}
function getLocalTeasePicture(path, name) {
    const image = showImage(path + "\\" + name);
    //showImage("Images/Liked/tumblr_oah6x4ffKZ1v0oj9oo1_1280.jpg");
    //sendMessage("testmsg " + image, 0);
    if (image != null) {
        currentPicturePath = image;
        currentPictureUrl = null;
        currentUrlFile = null;
    }
    return image;
}
function getImagePath()
{
    return currentPicturePath;
}
function getCurrentUrlFile()
{
    return currentUrlFile;
}
function moveFile(path, newPath)
{
    //still needs work
    var file = new java.io.File(path);
    if (!checkDuplicateFile(file))
    {
        sendMessage("in move");
        var currTagsFile = getOrCreateFile(file.getParent() + "\\imagetags.txt");
        var thisTag = deleteTag(currTagsFile, file.getName());
        sendMessage("before move");
        file = internalmoveFile(path, newPath);
        sendMessage("File moved");
        if (thisTag != null)
        {
            sendMessage("in retag");
            var newFile = new java.io.File(newPath);
            currTagsFile = getOrCreateFile(newFile.getParent() + "\\imagetags.txt");
            sendMessage(file.getParent() + "\\imagetags.txt", 0);
            addTag(currTagsFile, file.getName(), thisTag);
        }
    }
    else
    {
        sendMessage("image is a duplicate. Deleting...");
        file.delete();
    }
}
function getTags(tagsFile, fileName) {
    var fileReader = new java.io.FileReader(tagsFile);
    var bufferedReader = new java.io.BufferedReader(fileReader);
    var line = bufferedReader.readLine();
    var toReturn;
    while (line != null) {
        if (line.search(fileName) != -1) {
            toReturn = line;
        }
        line = bufferedReader.readLine();
    }
    return toReturn;
}
function deleteTag(tagsFile, fileName)
{
    var fileReader = new java.io.FileReader(tagsFile);
    var bufferedReader = new java.io.BufferedReader(fileReader);
    var line = bufferedReader.readLine();
    var lines = [];
    var toReturn;
    while (line != null) {
        if (line.search(fileName) == -1)
        {
            lines.push(line);
        }
        else
        {
            toReturn = line;
        }
        line = bufferedReader.readLine();
    }
    fileReader.close();
    bufferedReader.close();
    var fileWriter = new java.io.FileWriter(tagsFile);
    var bufferedWriter = new java.io.BufferedWriter(fileWriter);
    for (var i = 0; i < lines.length; i++) {
        bufferedWriter.write(lines[i]);
        bufferedWriter.newLine();
    }
    bufferedWriter.flush();
    bufferedWriter.close();
    return toReturn;
}
function addTag(tagsFile, fileName, tag) {
    var fileReader = new java.io.FileReader(tagsFile);
    var bufferedReader = new java.io.BufferedReader(fileReader);
    var line = bufferedReader.readLine();
    var lines = [];
    while (line != null) {
        if (line.search(fileName) == -1) {
            lines.push(line);
        }
        line = bufferedReader.readLine();
    }
    fileReader.close();
    bufferedReader.close();
    lines.push(tag);
    var fileWriter = new java.io.FileWriter(tagsFile);
    var bufferedWriter = new java.io.BufferedWriter(fileWriter);
    for (var i = 0; i < lines.length; i++) {
        bufferedWriter.write(lines[i]);
        bufferedWriter.newLine();
    }
    bufferedWriter.flush();
    bufferedWriter.close();
}
function internalmoveFile(path, newPath)
{
    if (path != newPath) {
        var myFile = new java.io.File(path);
        myFile.renameTo(new java.io.File(newPath));
        myFile.delete();
        return myFile;
    }
}
function getOrCreateFile(path)
{
    var myFile = new java.io.File(path);
    myFile.createNewFile();
    return myFile;
}
function checkDuplicateFile(file)
{
    var normalImages = listFilesInFolder("images\\normal");
    var likedImages = listFilesInFolder("images\\liked");
    var lovedImages = listFilesInFolder("images\\loved");
    //sendMessage("normal images " + normalImages);
    var myHashMap = new Map();
    var fileMd5 = calculateMD5(file);
    if (normalImages != null) {
        for (var i = 0; i < normalImages.length; i++) {
            var md5 = calculateMD5(normalImages[i]);
            if (!myHashMap.has(md5)) {
                myHashMap.set(md5, normalImages[i].getPath());
            }
            else {
                sendMessage("duplicate files " + normalImages[i].getPath() + " and " + myHashMap.get(md5), 0);
            }
        }
    }
    if (likedImages != null) {
        for (var i = 0; i < likedImages.length; i++) {
            var md5 = calculateMD5(likedImages[i]);
            if (!myHashMap.has(md5)) {
                myHashMap.set(md5, likedImages[i].getPath());
            }
            else {
                sendMessage("duplicate files " + likedImages[i].getPath() + " and " + myHashMap.get(md5), 0);
            }
        }
    }
    if (lovedImages != null) {
        for (var i = 0; i < lovedImages.length; i++) {
            var md5 = calculateMD5(lovedImages[i]);
            if (!myHashMap.has(md5)) {
                myHashMap.set(md5, lovedImages[i].getPath());
            }
            else {
                sendMessage("duplicate files " + lovedImages[i].getPath() + " and " + myHashMap.get(md5), 0);
            }
        }
    }
    if (myHashMap.has(fileMd5))
    {
        if (myHashMap.get(fileMd5) != file.getPath())
        {
            return true;
        }
    }
    return false;
}
function listFilesInFolder(folder)
{
    var folderFile;
    if (folder instanceof java.io.File)
    {
        folderFile = folder;
    }
    else if (folder.search("C:") != -1 || folder.search("Users") != -1) {
        folderFile = new java.io.File(folder);
    }
    else {
        folderFile = new java.io.File("C:\\Users\\tyler\\Desktop\\test\\teaseaijava2\\" + folder);
    }
    return folderFile.listFiles();
}
function calculateMD5(file)
{
    var digest;
    try
    {
        digest = java.security.MessageDigest.getInstance("MD5");
    }
    catch(e)
    {
        return null;
    }
    var is;
    try
    {
        is = new java.io.FileInputStream(file);
    }
    catch (e)
    {
        return null;
    }
    var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 8192);
    var read;
    try
    {   
        while ((read = is.read(buffer)) > 0)
        {
            digest.update(buffer, 0, read);
        }
        md5sum = digest.digest();
        var bigInt = new java.math.BigInteger(1, md5sum);
        var output = bigInt.toString(16);
        output = java.lang.String.format("%32s", output).replace(' ', '0');
        //sendMessage(output);
        return output;
    }
    catch(e)
    {
        sendMessage("unable to process file for md5");
    }
    finally
    {
        try
        {
            is.close();
        }
        catch(e)
        {
            
        }
    }
}