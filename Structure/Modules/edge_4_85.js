answer = getInput("Are you aching a lot right now %subname%?", 0);
if (answer.isLike("yes", "yea", "yep"))
{
    increaseAnger(-1);
    CMessage("Mmmm");
    CMessage("I want you to ache MORE");
    CMessage("%edge%");
    startEdging();
    CMessage("%stopstrokingedge%", null, false);
    CMessage("%lettheedgefade%", 0);
    stopEdging();
}
else
{
    CMessage("No?");
    CMessage("Well I can't have that %Grin%");
    increaseAnger(4);
    CMessage("%edge%");
    startEdging();
    if (randomInteger(0, 10) <= 6)
    {
        CMessage("%stopstrokingedge%", null, false);
        CMessage("%lettheedgefade%", 0);
    }
    else
    {
        CMessage("%Holdtheedge%", 0);
        holdEdge(randomInteger(10, 60));
        CMessage("%stopstrokingedge%", null, false);
        CMessage("%lettheedgefade%", 0);
    }
}
CMessage("Don't worry %PetName%");
CMessage("There's plenty more ache where that came from %Grin%");