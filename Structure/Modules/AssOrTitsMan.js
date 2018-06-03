sendMessage("Tell me something %PetName%", 0);
var assOrTits = getVar("assortits", "none");
if (assOrTits == "none")
{
    sendMessage("Are you more of an ass man");
    answer = sendInput("Or do you prefer a nice pair of tits?");
    if (answer.isLike("ass", "butt", "first", "former", "behind", "rear", "hienie", "bum", "booty"))
    {
        setVar("assortits", "ass");
        sendMessage("Here's an ass you can edge to right now %Grin%", 0);
        showCategoryImage("BUTTS");
        startEdging();
        sendMessage("%lettheedgefade%");
        sendMessage("So you're an ass man...");
        sendMessage("I'm %Gonna% remember that %SubName% %Grin%");
    }
    else
    {
        setVar("assortits", "tits");
        sendMessage("Here's some %Boobs% you can edge to right now %Grin%", 0);
        showCategoryImage("BOOBS");
        startEdging();
        sendMessage("%stopstrokingedge%");
        sendMessage("%lettheedgefade%");
        sendMessage("So you're a tit man...");
        sendMessage("I'm %Gonna% remember that %SubName% %Grin%");
    }
}
else if (assOrTits == "ass")
{
    showCategoryImage("BUTTS");
    answer = sendInput("Do you think this is a nice ass?");
    if (answer.isLike("yes", "yep", "yea", "hot", "sexy"))
    {
        sendMessage("I'm glad to hear you think so");
    }
    else
    {
        sendMessage("That's too bad");
    }
    sendMessage("Cause you're %Gonna% edge to it right now %Grin%");
    startEdging();
    sendMessage("%stopstrokingedge%");
    sendMessage("%lettheedgefade%");
    sendMessage("I told you I'd remember you're an ass man");
    sendMessage("And this won't be the last time I remind you of that %Grin%");
}
else
{
    showCategoryImage("BOOBS");
    answer = sendInput("Do you think these are some nice %boobs%?");
    if (answer.isLike("yes", "yep", "yea", "hot", "sexy")) {
        sendMessage("I'm glad to hear you think so");
    }
    else {
        sendMessage("That's too bad");
    }
    sendMessage("Cause you're %Gonna% edge to it right now %Grin%");
    startEdging();
    sendMessage("%stopstrokingedge%");
    sendMessage("%lettheedgefade%");
    sendMessage("I told you I'd remember you're a tit man");
    sendMessage("And this won't be the last time I remind you of that %Grin%");
}
