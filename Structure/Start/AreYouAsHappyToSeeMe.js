DMessage("AreYouAsHappyToSeeMe: Beginnning");
CMessage("%goodeveningsub%");
if (randomInteger(0, 1) == 1)
{
    answer = getInput("I'm really happy to see you this evening");
    if (answer.isLike("too", "as", "also"))
    {
        increaseAnger(-1);
        CMessage("Aww that's so sweet");
        CMessage("But I get the feeling your %Cock% isn't as glad to see me as you are");
        CMessage("Especially considering what I'm about to do to it %Grin%")
    }
    else if (answer.isLike("thanks", "thank", "nice", "sweet", "kind"))
    {
        increaseAnger(-1);
        CMessage("You're welcome %PetName%");
        CMessage("But I don't know if you should really be thanking me");
        CMessage("Considering that the reason I'm so happy to see you");
        CMessage("Is that I finally get to torment that %Cock% of yours some more %Grin%")
    }
    else
    {
        CMessage("Because I've been thinking about your %Cock%");
        CMessage("And how much I want it to suffer %Grin%");
    }
}
else
{
    answer = getInput("Are you as happy to see me as I am to see you?");
    if (answer.isLike("yes", "yea", "yep"))
    {
        increaseAnger(-1);
        CMessage("I'm glad to hear that %SubName%");
        CMessage("I've been thinking about all these fun ways to torment a cock this evening");
        CMessage("And there's not a lot of guys who can handle that");
        CMessage("That's why I'm always glad to see you here willing to please me");
        CMessage("And willing to suffer %Grin%");
        CMessage("Speaking of suffering...");
    }
    else
    {
        increaseAnger(3);
        CMessage("No?");
        CMessage("You must know what I'm about to do to that %Cock% then %Grin%");
        CMessage("But since you knew and came here anyway");
        CMessage("I don't have to feel guilty about it %Lol%")
    }
}
Stroking();
DMessage("AreYouAsHappyToSeeMe: End");