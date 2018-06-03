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
<<<<<<< HEAD
    if (randomInteger(0, 9) <= 6)
=======
    if (randomInteger(0, 10) <= 6)
>>>>>>> origin/master
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
