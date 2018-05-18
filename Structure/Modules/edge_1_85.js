sendMessage("%subname%", 0);
if (randomInteger(0, 2) == 1)
{
    sendMessage("Stop Stroking", 0);
    stopStroking();
}
else
{
    sendMessage("%edge%");
    startEdging();
    while (isEdging())
    {
        java.lang.Thread.sleep(500);
    }
    if (randomInteger(0, 10) <= 6)
    {
        sendMessage("Let go of your %cock%", 0);
        stopStroking();
        stopEdging();
    }
    else
    {
        timeTotal = randomInteger(10, 20);
        sendMessage("%Holdtheedge%");
        timeHolding = 0;
        while (timeHolding < timeTotal)
        {
            java.lang.Thread.sleep(500);
            timeHolding += .5;
        }
        sendMessage("Let go of your %cock%", 0);
        stopStroking();
        stopEdging();
    }
}


function randomInteger(lowest, highest) {
    return Math.floor(Math.random() * highest) + lowest;
}