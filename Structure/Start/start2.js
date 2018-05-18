sendMessage("%goodeveningsub%");
if (randomInteger(0, 2) == 1)
{
    answer = sendInput("I'm really happy to see you this evening");
    if (answer.isLike("too", "as", "also"))
    {
        sendMessage("Aww that's so sweet");
        sendMessage("But I get the feeling your %Cock% isn't as glad to see me as you are");
        sendMessage("Especially considering what I'm about to do to it %Grin%")
    }
    else if (answer.isLike("thanks", "thank", "nice", "sweet", "kind"))
    {
        sendMessage("You're welcome %PetName%");
        sendMessage("But I don't know if you should really be thanking me");
        sendMessage("Considering that the reason I'm so happy to see you");
        sendMessage("Is that I finally get to torment that %Cock% of yours some more %Grin%")
    }
    else
    {
        sendMessage("Because I've been thinking about your %Cock%");
        sendMessage("And how much I want it to suffer %Grin%");
    }
}
else
{
    answer = sendInput("Are you as happy to see me as I am to see you?");
    if (answer.isLike("yes", "yea", "yep"))
    {
        sendMessage("I'm glad to hear that %SubName%");
        sendMessage("I've been thinking about all these fun ways to torment a cock this evening");
        sendMessage("And there's not a lot of guys who can handle that");
        sendMessage("That's why I'm always glad to see you here willing to please me");
        sendMessage("And willing to suffer %Grin%");
        sendMessage("Speaking of suffering...");
    }
    else
    {
        sendMessage("No?");
        sendMessage("You must know what I'm about to do to that %Cock% then %Grin%");
        sendMessage("But since you knew and came here anyway");
        sendMessage("I don't have to feel guilty about it %Lol%")
    }
}
Stroking();

function Stroking()
{
    sendMessage("%startStroking%");
    startStroking(60);
    duration = 10;
    timeSoFar = 0;
    while (timeSoFar < duration)
    {
        java.lang.Thread.sleep(500);
        timeSoFar += .5;
    }
}

function randomInteger(lowest, highest)
{
    return Math.floor(Math.random() * highest) + lowest;
}