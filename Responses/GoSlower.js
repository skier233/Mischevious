addResponseIndicator("go slower", "slower", "slow down", "slow");
//run("allutils.js");

function goSlowerResponse(message) {
    DMessage("GoSlower: BeginningResponse");
    if (getResponsesDisabled()) {
        DMessage("GoSlower: EndResponse Response is Disabled");
        return false;
    }
    if (isEdging() || isStroking()) {
        let apathyMood = getApathyMoodIndex();
        let random = randomInteger(0, 4);
        //y = 0.570431742766248 * r + 0.0242584577270187 * a * r ^ 2 - 1.18600458024922 - 0.0202156063838738 * a - 0.0203227514506511 * a * r - 0.0041657011023306 * a * r ^ 3
        let y = 0.5704317 * random + 0.02425845 * apathyMood * Math.pow(random, 2) - 1.1860045 - 0.0202156 * apathyMood - 0.0203227 * apathyMood * random - 0.0041657 * apathyMood *
            Math.pow(random, 3);
        DMessage("y" + y);
        if (y >= -1 && y < 1) {
            CMessage("You're going to keep going this same speed %petname% %grin%");
            DMessage("GoSlower: EndResponse");
            return true;
        }
        else if (y >= 1 && y < 2) {
            CMessage("Go a little slower %petname%");
        }
        else if (y >= 2 && y < 2.8) {
            CMessage("Go slower %petname%");
        }
        else if (y >= 2.8 && y <= 4) {
            CMessage("Go a lot slower %petname%");
        }
        else if (y >= -2 && y < -1) {
            CMessage("Oh you want to go slower?");
            CMessage("Go a bit faster %petname%");
        }
        else if (y >= -2.8 && y < -2) {
            CMessage("Oh you want to go slower?");
            CMessage("Go faster %petname%");
        }
        else if (y >= -4 && y < -2.8) {
            CMessage("Oh you want to go slower?");
            CMessage("Go way faster %petname%");
        }
        addStrokingBPM(Math.round((0 - y) * 15));
    }
    else {
        CMessage("You shouldnt even be stroking %petname%");
    }
    DMessage("GoSlower: EndResponse");
    return true;
}