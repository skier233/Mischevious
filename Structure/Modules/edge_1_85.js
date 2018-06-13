CMessage("%subname%", 0);
if (randomInteger(0, 1) == 1)
{
    CMessage("%stopstroking%", 0);
    stopStroking();
}
else
{
    CMessage("%edge%", 0);
    startEdging();
    if (randomInteger(0, 9) <= 6)
    {
        CMessage("%stopstrokingedge%");
        CMessage("%lettheedgefade%", 0);
    }
    else
    {
        CMessage("%Holdtheedge%", 0);
        holdEdge(randomInteger(10, 60));
    }
}
