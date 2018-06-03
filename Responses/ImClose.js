addResponseIndicator("edge", "close", "there");

function imCloseResponse(message) {
<<<<<<< HEAD
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
=======
    setTempVar("edging", false);
>>>>>>> origin/master
    return true;
}