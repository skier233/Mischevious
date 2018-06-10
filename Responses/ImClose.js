addResponseIndicator("edge", "close", "there");
run("allutils.js");

var timesClose;
function imCloseResponse(message) {
    if (timesClose == null) {
        timesClose = 0;
    }
    if (isEdging())
    {
        timesClose++;
        setTempVar("edging", false);
    }
    else if (isStroking())
    {
        timesClose++;
        var apmIndex = getApathyMoodIndex();
        var random = randomInteger(1, 5);
        var percentStroking = getStrokingPercent();
        var decision = 1.054196 + (0.004457 * apmIndex * random) + (0.470061 * percentStroking * Math.pow(random, 2)) - (0.105613 * random) - (1.553526 * percentStroking * random)
        if (decision < 0) {
            decision = 0;
        }
        sendMessage("random " + random + " apm " + apmIndex + " percentstroke " + percentStroking, 0);
        sendMessage(decision, 0);
        switch (Math.round(decision))
        {
            case 0:
                sendMessage("This is really hard for you %petname%.");
                sendMessage("Strangely though, I'm feeling generous...")
                endStroking();
                break;
            case 1:
                sendMessage("I can't have you edging so easily %petname%.");
                sendMessage("%strokeslower%");
                slowStroking(2);
                break;
            case 2:
                sendMessage("Oh, you are on the edge?");
                sendMessage("It's funny that you think that I care...");
                sendMessage("Keep stroking %petname%");
                break;
            case 3:
                sendMessage("I bet you want to cum so badly %grin%.");
                sendMessage("Too bad you can't");
                sendMessage("Keep stroking %petname%");
                sendMessage("Oh...", 2);
                sendMessage("And to make it harder for you...");
                sendMessage("Stare at this while you keep stroking %grin%.");
                getRandomLocalTeasePicture("images\\loved");
                break;
            case 4:
                sendMessage("The fact that you are on the edge right now means that I haven't been hard enough on you");
                sendMessage("I'm very sorry about that %petname%. I'll make sure to go harder on you %grin%.");
                sendMessage("Why don't you keep stroking while you stare at this");
                getRandomLocalTeasePicture("images\\loved");
                sendMessage("Oh and also...", 2);
                sendMessage("%strokefaster%");
                speedUpStroking(3);
                break;
        }
    }
    else
    {
        sendMessage("You shouldnt even be stroking %petname%");
    }
    return true;
}