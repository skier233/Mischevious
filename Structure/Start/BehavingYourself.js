CMessage("%goodeveningsub%");
answer = getInput("%haveyoubeenbehavingyourself%");
if (answer.isLike("yes", "yep", "yea")) {
    CMessage("Good boy :)");
    CMessage("Since you were so good and didn't touch your %Cock% while you were gone");
    CMessage("I'm going to reward you");
    CMessage("By letting you touch it a <i>lot<> %Grin%");
}
else
{
    CMessage("Oh?");
    answer2 = getInput("Something I should know about?");
    if (answer2.isLike("yes", "yep", "yea", "came", "cum", "accident", "orgasm", "edge"))
    {
        answer3 = getInput("Tell me what you did %SubName%");
        if (answer3.isLike("came", "cum", "accident", "orgasm", "edge"))
        {
            CMessage("Awww, and I wasn't there to see it");
            CMessage("That's okay %PetName%");
            CMessage("All I have to do is build you back up as quickly as possible");
            CMessage("And I know a pretty good way to do that %Grin%");
        }
        else if (answer3.isLike("jerked", "touched", "masturbated", "played", "stroked", "stroke", "stroking"))
        {
            CMessage("Stroking yourself without my permission tsk tsk");
            CMessage("You're going to have to make that up to me you know");
            CMessage("And the best way I can think of to punish you for touching yourself without my permission");
            CMessage("Is to make you touch yourself <i>with<> my permission %Grin%");
        }
        else
        {
            CMessage("I only care about that %Cock% and whether or not it cums, anything else isn't really my business %Lol%");
            CMessage("But since you're here now...");
            CMessage("I feel like having a little fun with something that <i>is<> my business");
        }
    }
    else
    {
        CMessage("Okay, I'll take your word for it %Lol%");
        CMessage("All that matters is you're here now");
        CMessage("And <i>I'm<> the one that feels like misbehaving %Grin%");
    }
}
Stroking();