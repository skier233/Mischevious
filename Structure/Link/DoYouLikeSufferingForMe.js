answer = getInput("Do you like suffering for me %SubName%?")
if (answer.isLike("yea", "yes", "yep"))
{
    increaseAnger(-2);
    CMessage("I'm glad to hear that");
    CMessage("Because I was actually about to start feeling sorry for you");
    CMessage("But now I know I don't have to %Grin%");
}
else
{
    increaseAnger(2);
    CMessage("But I like making you suffer %Grin%");
    CMessage("You can take it right?");
    answer2 = getInput("Since you know it pleases me so much?");
    if (answer2.isLike("yea", "yes", "yep"))
    {
        increaseAnger(-2);
        CMessage("Good boy");
    }
    else
    {
        CMessage("This might be a little fucked up...");
        CMessage("But that turns me on even more for some reason %Grin%");
    }
}
Stroking();