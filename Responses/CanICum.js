addResponseIndicator("can i cum", "can i orgasm", "please cum", "please orgasm", "let me cum", "let me orgasm");
run("allutils.js");

function canICumResponse(message) {
    if (isEdging())
    {
        var percentSession = (getMillisPassed() / 1000) / (getMinSessionLength() * 60);
        var apathyMood = getApathyMoodIndex();
        y = 0.0712955830560892 + 2.62980454704404 * dp - dp ^ 3 - 0.000546472206165911 * m - 0.000644708195203979 * m * dp - 2.55738740002257 * dp * cos(dp)
        var chance = 0.071295 + 2.6298045 * percentSession - Math.pow(percentSession, 3) - 0.00054647 * apathyMood - 
            (0.0006447 * apathyMood * percentSession) - (2.557387 * percentSession * Math.cos(percentSession));
        var random = randomInteger(1, 100);
        if (random >= (chance * 100)) {
            run("Structure\\End\\*.js");
        }
        else
        {
            increaseAnger(3);
        }
    }
    else if (isStroking())
    {
        var percentSession = (getMillisPassed() / 1000) / (getMinSessionLength() * 60);
        var apathyMood = getApathyMoodIndex();
        y = 0.0412955830560892 + 2.22980454704404 * dp - dp ^ 3 - 0.000546472206165911 * m - 0.000644708195203979 * m * dp - 2.55738740002257 * dp * cos(dp)
        var chance = 0.041295 + 2.2298045 * percentSession - Math.pow(percentSession, 3) - 0.00054647 * apathyMood -
            (0.0006447 * apathyMood * percentSession) - (2.557387 * percentSession * Math.cos(percentSession));
        var random = randomInteger(1, 100);
        if (random >= (chance * 100)) {
            run("Structure\\End\\*.js");
        }
        else {
            increaseAnger(3);
        }
    }
    else {
        sendMessage("You shouldnt even be stroking %petname%");
    }
    return true;
}