DMessage("Edge_1_85: Beginning");
CMessage("%subname%", 0);
if (randomInteger(0, 1) == 1)
{
    CMessage("%stopstroking%", 0);
    stopStroking();
}
else
{
    startEdging();
    if (randomInteger(0, 9) <= 6)
    {
        CMessage("%stopstrokingedge%", null, false);
        CMessage("%lettheedgefade%", 0);
    }
    else
    {
        CMessage("%Holdtheedge%", 0);
        holdEdge(randomInteger(10, 60));
    }
}
DMessage("Edge_1_85: End");