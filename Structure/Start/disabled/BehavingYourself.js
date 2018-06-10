sendMessage("%goodeveningsub%");
answer = sendInput("%haveyoubeenbehavingyourself%");
if (answer.isLike("yes", "yep", "yea")) {
    increaseAnger(-1);
    sendMessage("Good boy :)");
    sendMessage("Since you were so good and didn't touch your %Cock% while you were gone");
    sendMessage("I'm going to reward you");
    sendMessage("By letting you touch it a LOT %Grin%");
}
else
{
    sendMessage("Oh?");
    answer2 = sendInput("Something I should know about?");
    if (answer2.isLike("yes", "yep", "yea", "came", "cum", "accident", "orgasm", "edge"))
    {
        answer3 = sendInput("Tell me what you did %SubName%");
        if (answer3.isLike("came", "cum", "accident", "orgasm", "edge"))
        {
            increaseAnger(4);
            sendMessage("Awww, and I wasn't there to see it");
            sendMessage("I'll remember that %PetName%");
            sendMessage("All I have to do is build you back up as quickly as possible");
            sendMessage("And I know a pretty good way to do that %Grin%");
        }
        else if (answer3.isLike("jerked", "touched", "masturbated", "played", "stroked", "stroke", "stroking"))
        {
            increaseAnger(3);
            sendMessage("Stroking yourself without my permission tsk tsk");
            sendMessage("You're going to have to make that up to me you know");
            sendMessage("And the best way I can think of to punish you for touching yourself without my permission");
            sendMessage("Is to make you touch yourself WITH my permission %Grin%");
        }
        else
        {
            sendMessage("I only care about that %Cock% and whether or not it cums, anything else isn't really my business %Lol%");
            sendMessage("But since you're here now...");
            sendMessage("I feel like having a little fun with something that IS my business");
        }
    }
    else
    {
        sendMessage("Okay, I'll take your word for it %Lol%");
        sendMessage("All that matters is you're here now");
        sendMessage("And I'M the one that feels like misbehaving %Grin%");
    }
}
Stroking();