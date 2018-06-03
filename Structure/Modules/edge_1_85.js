sendMessage("%subname%", 0);
if (randomInteger(0, 1) == 1)
{
    sendMessage("%stopstroking%", 0);
    stopStroking();
}
else
{
    sendMessage("%edge%", 0);
    startEdging();
    if (randomInteger(0, 9) <= 6)
    {
        sendMessage("%stopstrokingedge%");
        sendMessage("%lettheedgefade%", 0);
    }
    else
    {
        sendMessage("%Holdtheedge%", 0);
        holdEdge(randomInteger(10, 60));
    }
}
