var timeLeftStroking;
var strokeTime;
var angereddate;

/**
* setupVars method to setup variables used by the personality
**/
function setUpVars() {
    if (getVar("apathylevel", null) == null) {
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

    setTempVar("mood", 50);
    if (getVar("mood", null) != null) {
        //Register something for last session mood
    }
}

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
* STROKING METHODS: SORTED BY MOST LIKELY TO USE -> LEAST LIKELY TO USE |
*///|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

/**
* Stroking method to have the sub start stroking. This is the method you will primarily want to
* call in scripts.
**/
function Stroking() {
    CMessage("%startStroking%", 0);
    var strokeMinimum = getMinStrokingLength();
    var strokeMaximum = getMaxStrokingLength();
    var apathyMoodIndex = getApathyMoodIndex();
    var random = randomInteger(1, 10);
    DMessage("random: " + random, 0);
    var percentSession = (getMillisPassed() / 1000) / (getMinSessionLength() * 60);
    //y = 52.2810035121697 + 6.42273993825994 * r * pS + 0.873930004197032 * r ^ 2 + 0.00137857491687123 * r * x ^ 2 - 0.00439450398010755 * x ^ 2
    var bpm = 52.2810 + 6.4227 * random * percentSession + 0.8739 * Math.pow(random, 2) + 0.0014 * random * Math.pow(apathyMoodIndex, 2) - 0.0044 * Math.pow(apathyMoodIndex, 2);
    var percentFromMinToMax = 0.00112 * bpm + (22.68182 / bpm) + .0000723 * apathyMoodIndex * bpm + .000098 * Math.pow(apathyMoodIndex, 2) - 0.29386 - .00000053 * Math.pow(apathyMoodIndex, 3) - .000000376389651825041 * apathyMoodIndex * Math.pow(bpm, 2);
    DMessage("bpm: " + bpm, 0);
    var duration = ((strokeMaximum - strokeMinimum) * 60) * percentFromMinToMax + (strokeMinimum * 60);
    DMessage("duration: " + duration, 0);
    //stroke 1000 for testing
    customStroke(duration, Math.floor(bpm));
}

/**
* customStroking method to have the sub start stroking with a custom message. This is the method you will primarily want to
* call in scripts when you want a message other than the default.
**/
function customStroking(message) {
    CMessage(message, 0);
    var strokeMinimum = getMinStrokingLength();
    var strokeMaximum = getMaxStrokingLength();
    var apathyMoodIndex = getApathyMoodIndex();
    var random = randomInteger(1, 10);
    DMessage("random: " + random, 0);
    var percentSession = (getMillisPassed() / 1000) / (getMinSessionLength() * 60);
    //y = 52.2810035121697 + 6.42273993825994 * r * pS + 0.873930004197032 * r ^ 2 + 0.00137857491687123 * r * x ^ 2 - 0.00439450398010755 * x ^ 2
    var bpm = 52.2810 + 6.4227 * random * percentSession + 0.8739 * Math.pow(random, 2) + 0.0014 * random * Math.pow(apathyMoodIndex, 2) - 0.0044 * Math.pow(apathyMoodIndex, 2);
    var percentFromMinToMax = 0.00112 * bpm + (22.68182 / bpm) + .0000723 * apathyMoodIndex * bpm + .000098 * Math.pow(apathyMoodIndex, 2) - 0.29386 - .00000053 * Math.pow(apathyMoodIndex, 3) - .000000376389651825041 * apathyMoodIndex * Math.pow(bpm, 2);
    DMessage("bpm: " + bpm, 0);
    var duration = ((strokeMaximum - strokeMinimum) * 60) * percentFromMinToMax + (strokeMinimum * 60);
    DMessage("duration: " + duration, 0);
    customStroke(duration, Math.floor(bpm));

}

/**
* isStroking method that will check if the sub is stroking. Note, if the sub is edging, this will return false.
**/
function isStroking() {
    if (timeLeftStroking <= 0) {
        return false;
    }
    return true;
}

/**
* slowStroking method that will slow the pace of the stroking down. The arguments are 1-5. 1 will slow down a small amount,
* and 5 will slow down a lot.
**/
function slowStroking(amount) {
    if (isStroking()) {
        if (amount <= 0) {
            amount = 1;
        }
        switch (amount) {
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

/**
* speedUpStroking method that will speed up the pace of the stroking down. The arguments are 1-5. 1 will speed up a small amount,
* and 5 will speed up a lot.
**/
function speedUpStroking(amount) {
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

/**
* setStroking method that allows the developer to set the duration and
* bpm manually. Normally, it's better to use Stroking.
**/
function setStroking(duration, bpm) {
    CMessage("%startStroking%", 0);
    customStroke(duration, bpm);
}

/**
* customSetStroking method that allows the developer to set the duration, bpm,
* and message manually. Normally, it's better to use Stroking or customStroking.
**/
function customSetStroking(duration, bpm, message) {
    CMessage(message, 0);
    customStroke(duration, bpm);
}

/**
* getStrokingPercent method that will check the percent of time that the sub has stroked for out of this stroke cycle.
**/
function getStrokingPercent() {
    if (isStroking) {
        return (strokeTime - timeLeftStroking) / strokeTime;
    }
    return null;
}

/*||||||||||||||||||||||
* END STROKING METHODS |
*///||||||||||||||||||||


/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
* EDGING METHODS: SORTED BY MOST LIKELY TO USE -> LEAST LIKELY TO USE |
*///|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
/**
* DoEdges method that will make the sub do some number of edges. holdChancePerEdge is the chance of doing a edgehold for each edge.
**/
function DoEdges(minEdges, maxEdges, holdChancePerEdge)
{
    if (holdChancePerEdge <= 1)
    {
        holdChancePerEdge = holdChancePerEdge * 100;
    }
    var ap = getApathyMoodIndex();
    var r = randomInteger(1, 5);
    var edgesPercent = 0.004027 * ap + 0.00235 * ap * r + 0.016498 * Math.pow(r, 2) - 0.086467 - 0.0003822 * ap * Math.pow(r, 2);
    var numEdges = edgesPercent * (maxEdges - minEdges) + minEdges;
    for (var i = 0; i < Math.round(numEdges) ; i++)
    {
        if (i != 0)
        {
            var random = randomInteger(1, 3);
            switch (random) {
                case 1:
                    CMessage("The question is...", 2);
                    CMessage("Should I make you edge again?");
                    CMessage("Just kidding. Thats not a question at all %lol%");
                    break;
                case 2:
                    CMessage("I'm going to roll a 12 sided dice.", 1);
                    CMessage("If it lands on 1, I'm going to make you edge again.");
                    CMessage("Good odds right? Lets roll...");
                    CMessage("Yay! It was a 1 %petname% %grin%");
                case 3:
                    CMessage("That last edge wasnt so great %subname%");
                    CMessage("Thankfully, I believe in second chances %petname%");
                    break;
            }
        }
        CMessage("%startEdging%");
        startEdging();
        if (randomInteger(1, 100) <= holdChancePerEdge) {
            var random = randomInteger(1, 3);
            switch (random)
            {
                case 1:
                    CMessage("Youre lucky that I let you get to the edge %petname%");
                    CMessage("I might just make you do that again... %grin%", 1.5);
                    CMessage("But first...");
                    break;
                case 2:
                    CMessage("You did a pretty good job getting to the edge %petname%");
                    CMessage("Lets see how good of a job you do while I make you stay there %lol%", 1.5);
                    break;
                case 3:
                    CMessage("That was a good edge %petname%");
                    CMessage("Now you're going to hold that edge");
                    break;

            }           
            holdEdge();
        }
        //TODO: make these messages actually use a variable file
    }
}
/**
* startEdging method that will make the sub edge.
**/
function startEdging() {
    setTempVar("edging", true);
    var apathyMoodIndex = getApathyMoodIndex();
    var random = randomInteger(1, 5);
    setTempVar("holdingedge", false);
    var bpm = 174.69905 + (30.99765 * random) + (0.0002257 * Math.pow(apathyMoodIndex, 3)) + (0.10081895 * apathyMoodIndex * Math.pow(random, 2)) - (0.477098 * apathyMoodIndex * random) - (0.0325047 * Math.pow(apathyMoodIndex, 2)) - (3.1204935 * Math.pow(random, 2));
    DMessage("bpm: " + bpm, 0);
    if (!isStroking()) {
        startStroking(Math.floor(bpm));
    }
    else {
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
        if (tauntTime == timeSoFar) {
            CMessage("%edgingtaunts1%")
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

/**
* isEdging method to check if the sub is edging
**/
function isEdging() {
    return getVar("edging", false);
}

/**
* holdEdge method to make the sub hold an edge. This is the method you will want to call most of the time to make
* the sub hold an edge.
**/
function holdEdge() {
    CMessage("%holdtheedge%", 0);
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
    var lengthPercent = 0.00091684 * amiIndex + .00000083317 * Math.pow(amiIndex, 3);
    if (lengthPercent < 0) {
        lengthPercent = 0;
    }
    var length = lengthPercent * (getMaxHoldingLength() - getMinHoldingLength()) + getMinHoldingLength();

    var tauntTime = tauntIncrement;
    while (timeHolding < length) {
        sleep(.5);
        timeHolding += .5;
        if (tauntTime == timeHolding) {
            CMessage("%edgingholdtaunts1%")
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
    CMessage("%stopstrokingedge%", 0);
    CMessage("%lettheedgefade%", 0);
    stopEdging();
}

/**
* startHoldEdge method to start holding an edge. Note: this will never end unless you call stopEdging!
**/
function startHoldEdge() {
    setTempVar("edging", false);
    setTempVar("holdingedge", true);
}

/*||||||||||||||||||||
* END EDGING METHODS |
*///||||||||||||||||||


/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
* ORGASM METHODS: SORTED BY MOST LIKELY TO USE -> LEAST LIKELY TO USE |
*///|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

/**
* calculateOrgasm method to calculate if the sub will cum right now
**/
function calculateOrgasm() {
    var defChance = getOrgasmChance() / 100;
    var mood = getMood();
    var chance = 1.39117 * defChance + 0.006631 * mood * Math.pow(defChance, 3) - 0.0083217 - 0.006919 * mood * defChance - 0.37457 * Math.pow(defChance, 3);
    var random = randomInteger(1, 100);
    if (random <= (chance * 100)) {
        return true;
    }
    return false;
}

/**
* calculateRuin method to call after calculateOrgasm has been called and is true. This method calculates if the orgasm will be
* ruined
**/
function calculateRuin() {
    var defChance = getRuinChance() / 100;
    var mood = getMood();
    var chance = 0.456827 * defChance + 0.009303 * mood * defChance + 0.50545 * Math.pow(defChance, 2) - 0.008689 * mood * Math.pow(defChance, 2);
    var random = randomInteger(1, 100);
    if (random <= (chance * 100)) {
        return true;
    }
    return false;
}

/*||||||||||||||||||||
* END ORGASM METHODS |
*///||||||||||||||||||


/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
* MOOD METHODS: SORTED BY MOST LIKELY TO USE -> LEAST LIKELY TO USE |
*///|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

/**
* increaseAnger method to change the dommes current mood value. Use a negative value to make the domme happier. 
* CAUTION: It's important to note that the higher the value of the mood, the more angry/upset the domme is. 
* A low value means the domme is happy. 50 is neutral.
**/
function increaseAnger(amount) {
    var mood = getMood();
    switch (amount) {
        case 1:
            mood += 5;
            break;
        case 2:
            mood += 7;
            break;
        case 3:
            mood += 8;
            break;
        case 4:
            mood += 12;
            break;
        case 5:
            mood += 14;
            break;
        case -1:
            mood -= 5;
            break;
        case -2:
            mood -= 7;
            break;
        case -3:
            mood -= 8;
            break;
        case -4:
            mood -= 12;
            break;
        case -5:
            mood -= 14;
            break;
        default:

    }
    if (mood > 100) {
        mood = 100;
    }
    if (mood < 0) {
        mood = 0;
    }
    if (mood > 70 && mood < 85)
    {
        CMessage("You're really starting to annoy me %badpetname%");
    }
    else if (mood > 85)
    {
        CMessage("You've really pissed me off now %awfulpetname%");
    }
    setTempVar("mood", mood);
    DMessage("Mood: " + mood, 0);
    angereddate = setDate();
    angereddate.addMinute(3);
    return mood;
}

/**
* Calculates the current apathyMoodIndex. This value is used everywhere to figure out how harsh the domme will be when she is 
* edging/stroking/holdingtheedge the sub. You may use this method to figure out how harsh the domme will be. It may take some
* experimentation to figure out the apathyMoodIndex value thresholds you need for your application.
* DO NOT MODIFY this function. The formula is very complex and even a slight change to it will have drastic effects and may
* cause errors.
**/
function getApathyMoodIndex() {
    var apathy = getApathyLevel();
    var mood = getMood();
    var newApathyMoodIndex = 5.8329 + (3.0536 * apathy) - (95.3855 / mood) + (0.0951 * apathy * mood) - (0.0029 * mood * Math.pow(apathy, 2))
    if (newApathyMoodIndex < 1) {
        newApathyMoodIndex = 1;
    }
    else if (newApathyMoodIndex > 100) {
        newApathyMoodIndex = 100;
    }
    DMessage("apathyMoodIndex: " + newApathyMoodIndex, 0);
    return newApathyMoodIndex;
}

/**
* getMood getter method to get the dommes current mood value. CAUTION: It's important to note that the higher the value of
* the mood, the more angry/upset the domme is. A low value means the domme is happy. 50 is neutral.
**/
function getMood() {
    if (angereddate != null && angereddate.hasPassed()) {
        increaseAnger(-2);
        angereddate = setDate().addMinute(3);
    }
    var mood = getVar("mood", 50);
    if (typeof mood == "number") {
        if (mood >= 1 && mood <= 100) {
            DMessage("Mood:" + mood);
            return mood;
        }
        else {
            setTempVar("mood", 50);
        }
    }
    else {
        setTempVar("mood", 50);
    }
    return 50;
}

/**
* getApathyLevel getter method to get the personality variable "apathylevel". If you are wanting to figure out how mean the
* domme should be for something, use getApathyMoodIndex instead which will also factor in the domme's mood as well as his/her
* apathy level. You can use this method to figure out how aggressive the domme will be when typing things to the sub or something
* like that.
**/
function getApathyLevel() {
    var apathyLevel = getVar("apathylevel", 5);
    if (typeof apathyLevel == "number") {
        if (apathyLevel >= 1 && apathyLevel <= 10) {
            return apathyLevel;
        }
    }
    //Returns 5 if the apathy level has not been set or is invalid
    return 5;
}

/*||||||||||||||||||
* END MOOD METHODS |
*///||||||||||||||||

//Helper methods:

/**
* simple helper method to calculate the time passed since the beginning of the session
**/
function getMillisPassed() {
    var startedAt = getVariable("startDate").getTimeInMillis();
    var n = new Date().getTime();
    return n - startedAt;
}
//lowest inclusive to highest inclusive
function randomInteger(lowest, highest) {
    return Math.floor(Math.random() * (highest - lowest + 1)) + lowest;
}

function continueSession()
{
    var secsPassed = (getMillisPassed() / 1000);
    if (getMinSessionLength() * 60 <= secsPassed)
    {
        if (getMaxSessionLength() * 60 <= secsPassed)
        {
            DMessage("overmax session return true");
            return false;
        }
        var percMinToMax = (secsPassed - (getMinSessionLength() * 60)) / ((getMaxSessionLength() * 60) - (getMinSessionLength() * 60));
        var random = randomInteger(1, 5);
        var api = getApathyMoodIndex();
        var percThreshold = 0.3657209 + 0.00629 * api + 0.03762 * Math.pow(random, 2) + 0.000102 * api * Math.pow(random, 3) - 0.044676 * random - 0.00826 * Math.pow(random, 3) -
            0.00056 * api * Math.pow(random, 2);
        DMessage("percmintomax: " + percMinToMax + " out of percthreshold " + percThreshold);
        if (percMinToMax > percThreshold)
        {
            return false;
        }
    }
    return true;
}


/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
* INTERNAL METHODS: DON'T USE THESE UNLESS YOU KNOW WHAT YOU'RE DOING! |
*///||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

/**
* CustomStroke internal stroking method. Do not call this directly!
**/
function customStroke(duration, bpm) {
    startStroking(bpm);
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
    timeLeftStroking = duration;
    strokeTime = duration;
    while (timeLeftStroking > 0) {
        sleep(.5);
        timeSoFar += .5;
        timeLeftStroking -= .5;
        if (timeSoFar == tauntTime) {
            DMessage("In taunt ");
            CMessage("%stroketaunt1%")
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
            DMessage("current time " + timeSoFar);
            DMessage("next taunt time " + tauntTime);
        }
    }
    timeLeftStroking = 0;
    strokeTime = 0;
}

/**
* endstroking internal method that will end stroking. Do not call this directly unless you know what you are doing!
**/
function endStroking() {
    if (timeLeftStroking <= 0) {
        WMessage("error: user was not stroking");
    }
    timeLeftStroking = 0;
}

/**
* getMaxHoldingLength getter method to get the personality variable "maxholdinglength". You probably won't want to call this 
* directly.
**/
function getMaxHoldingLength() {
    var maxHoldingLength = getVar("maxholdinglength", "3m");
    if (typeof maxHoldingLength == "number") {
        if (maxHoldingLength >= 1 && maxHoldingLength > getMinHoldingLength()) {
            return maxHoldingLength * 60;
        }
    }
    else {
        var regEx = new RegExp("^([0-9]+)[s,m]")
        if (regEx.test(maxHoldingLength)) {
            if (maxHoldingLength.search("s") != -1 && (parseInt(maxHoldingLength.substr(0, maxHoldingLength.length - 1))) > getMinHoldingLength()) {
                return parseInt(maxHoldingLength.substr(0, maxHoldingLength.length - 1));
            }
            else if (maxHoldingLength.search("m") != -1 && (60 * parseInt(maxHoldingLength.substr(0, maxHoldingLength.length - 1))) > getMinHoldingLength()) {
                return 60 * parseInt(maxHoldingLength.substr(0, maxHoldingLength.length - 1));
            }
        }
    }

    //Returns 3m if the max holding length has not been set or is invalid
    if (180 > getMinHoldingLength()) {
        return 180;
    }
    else {
        return 2 * getMinHoldingLength();
    }
}

/**
* getMaxSessionLength getter method to get the personality variable "maxsessionlength". You probably won't want to call this 
* directly.
**/
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
    else {
        return 2 * getMinSessionLength();
    }
}

/**
* getMaxStrokingLength getter method to get the personality variable "maxstrokinglength". You probably won't want to call this 
* directly.
**/
function getMaxStrokingLength() {
    var maxStrokingLength = getVar("maxstrokinglength", 4);
    if (typeof maxStrokingLength == "number") {
        if (maxStrokingLength > 0 && maxStrokingLength > getMinStrokingLength()) {
            return maxStrokingLength;
        }
    }
    //Returns 4 if the max stroking length has not been set or is invalid
    if (4 > getMinStrokingLength()) {
        return 4;
    }
    else {
        return 2 * getMinStrokingLength();
    }
}

/**
* getMinHoldingLength getter method to get the personality variable "minholdinglength". You probably won't want to call this 
* directly.
**/
function getMinHoldingLength() {
    var minHoldingLength = getVar("minholdinglength", "10s");
    if (typeof minHoldingLength == "number") {
        if (minHoldingLength >= 1) {
            return minHoldingLength * 60;
        }
    }
    else {
        var regEx = new RegExp("^([0-9]+)[s,m]")
        if (regEx.test(minHoldingLength)) {
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

/**
* getMinSessionLength getter method to get the personality variable "minsessionlength". You probably won't want to call this 
* directly.
**/
function getMinSessionLength() {
    var minSessionLength = getVar("minsessionlength", 20);
    if (typeof minSessionLength == "number") {
        if (minSessionLength > 0) {
            return minSessionLength;
        }
    }
    //Returns 20 if the min session length has not been set or is invalid
    return 20;
}

/**
* getMinStrokingLength getter method to get the personality variable "minstrokinglength". You probably won't want to call this 
* directly.
**/
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

/**
* getRuinChance getter method to get the personality variable "ruinchance". You probably won't want to call this directly.
**/
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

/**
* getOrgasmChance getter method to get the personality variable "orgasmchance". You probably won't want to call this directly.
**/
function getOrgasmChance() {
    var orgasmChance = getVar("orgasmchance", 70);
    if (typeof orgasmChance == "number") {
        if (orgasmChance >= 0 && orgasmChance <= 100) {
            return orgasmChance;
        }
    }
    //Returns 70% if the orgasm chance has not been set or is invalid
    return 70;
}

/**
* getTauntFrequency getter method to get the personality variable "tauntFrequency". You probably won't want to call this 
* directly.
**/
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


/**
* stopEdging method to stop edging or holdingTheEdge. You probably won't want to call this directly.
**/
function stopEdging() {
    stopStroking();
    setTempVar("holdingedge", false);
}
