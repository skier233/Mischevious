CMessage("Tell me something %PetName%", 0);
var assOrTits = getVar("assortits", "none");
if (assOrTits == "none")
{
    CMessage("Are you more of an ass man");
    answer = getInput("Or do you prefer a nice pair of tits?");
    if (answer.isLike("ass", "butt", "first", "former", "behind", "rear", "hienie", "bum", "booty"))
    {
        setVar("assortits", "ass");
        CMessage("Here's an ass you can edge to right now %Grin%", 0);
        showCategoryImage("BUTTS");
        startEdging();
        CMessage("%lettheedgefade%");
        CMessage("So you're an ass man...");
        CMessage("I'm %Gonna% remember that %SubName% %Grin%");
    }
    else
    {
        setVar("assortits", "tits");
        CMessage("Here's some %Boobs% you can edge to right now %Grin%", 0);
        showCategoryImage("BOOBS");
        startEdging();
        CMessage("%stopstrokingedge%");
        CMessage("%lettheedgefade%");
        CMessage("So you're a tit man...");
        CMessage("I'm %Gonna% remember that %SubName% %Grin%");
    }
}
else if (assOrTits == "ass")
{
    showCategoryImage("BUTTS");
    answer = getInput("Do you think this is a nice ass?");
    if (answer.isLike("yes", "yep", "yea", "hot", "sexy"))
    {
        increaseAnger(-1);
        CMessage("I'm glad to hear you think so");
    }
    else
    {
        increaseAnger(1);
        CMessage("That's too bad");
    }
    CMessage("Cause you're %Gonna% edge to it right now %Grin%");
    startEdging();
    CMessage("%stopstrokingedge%");
    CMessage("%lettheedgefade%");
    CMessage("I told you I'd remember you're an ass man");
    CMessage("And this won't be the last time I remind you of that %Grin%");
}
else
{
    showCategoryImage("BOOBS");
    answer = getInput("Do you think these are some nice %boobs%?");
    if (answer.isLike("yes", "yep", "yea", "hot", "sexy")) {
        increaseAnger(-1);
        CMessage("I'm glad to hear you think so");
    }
    else {
        increaseAnger(1);
        CMessage("That's too bad");
    }
    CMessage("Cause you're %Gonna% edge to it right now %Grin%");
    startEdging();
    CMessage("%stopstrokingedge%");
    CMessage("%lettheedgefade%");
    CMessage("I told you I'd remember you're a tit man");
    CMessage("And this won't be the last time I remind you of that %Grin%");
}
