addResponseIndicator("edge", "close", "there");

function imCloseResponse(message) {
    if (isEdging())
    {
        setTempVar("edging", false);
    }
    else if (isStroking())
    {
        //todo
    }
    else
    {
        sendMessage("You shouldnt even be stroking %petname%");
    }
    return true;
}