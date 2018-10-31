addResponseIndicator("go faster", "faster", "speed up", "quicker");
//run("allutils.js");

function goFasterResponse(message) {
    DMessage("GoFaster: BeginningResponse");
    if (getResponsesDisabled()) {
        DMessage("GoFaster: EndResponse Response is Disabled");
        return false;
    }
    if (isEdging() || isStroking())
    {
        let apathyMood = getApathyMoodIndex();
        let random = randomInteger(0, 4);
        //y = 0.570431742766248 * r + 0.0242584577270187 * a * r ^ 2 - 1.18600458024922 - 0.0202156063838738 * a - 0.0203227514506511 * a * r - 0.0041657011023306 * a * r ^ 3
        let y = 0.5704317 * random + 0.02425845 * apathyMood * Math.pow(random, 2) - 1.1860045 - 0.0202156 * apathyMood - 0.0203227 * apathyMood * random - 0.0041657 * apathyMood *
            Math.pow(random, 3);
        if (y >= -1 && y < 1)
        {
            CMessage("You're going to keep going this same speed %petname% %grin%");
            DMessage("GoFaster: EndResponse");
            return true;
        }
        else if (y >= 1 && y < 2)
        {
            CMessage("Go a little faster %petname%");
        }
        else if (y >= 2 && y < 2.8) {
            CMessage("Go faster %petname%");
        }
        else if (y >= 2.8 && y <= 4) {
            CMessage("Go a lot faster %petname%");
        }
        else if (y >= -2 && y < -1) {
            CMessage("Oh you want to go faster?");
            CMessage("Go a bit slower %petname%");
        }
        else if (y >= -2.8 && y < -2) {
            CMessage("Oh you want to go faster?");
            CMessage("Go slower %petname%");
        }
        else if (y >= -4 && y < -2.8) {
            CMessage("Oh you want to go faster?");
            CMessage("Go way slower %petname%");
        }
        addStrokingBPM(Math.round(y * 15));
    }
    else {
        CMessage("You shouldnt even be stroking %petname%");
    }
    DMessage("GoFaster: EndResponse");
    return true;
}