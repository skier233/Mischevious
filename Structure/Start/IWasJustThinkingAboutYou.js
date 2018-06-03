sendMessage("I was just thinking about you %SubName%");
if (randomInteger(0, 1) == 1)
{
    sendMessage("And here you are %Grin%");
    answer = sendInput("Feel like having a little fun with me this evening?");
    if (answer.isLike("yes", "yea", "yep"))
    {
        sendMessage("%Yay%");
        sendMessage("Then what I want you to do");
        sendMessage("Is take that %Cock% out of your pants")
    }
    else
    {
        sendMessage("You don't?");
        if (randomInteger(0, 1) == 1)
        {
            answer2 = sendInput("Well whose cock is that between your legs?");
            if (answer2.isLike("you", "your", "yours"))
            {
                sendMessage("That's right %Grin%");
                sendMessage("And since it is my cock...");
                sendMessage("I get to have fun with it whenever I want");
                sendMessage("Whether you want to or not %Grin%");
                sendMessage("And what sounds fun to me right now is making you suffer");
                sendMessage("So pull that %Cock% out");
            }
            else
            {
                sendMessage("Oh you think it belongs to you huh?");
                sendMessage("In that case why don't you pull YOUR cock out");
                sendMessage("And I'll make you put it through so much ache and abuse");
                sendMessage("That you'll beg me to take it from you and make it mine %Grin%");
                sendMessage("So why don't you wrap your fingers around our little piece of disputed property");
            }
        }
        else
        {
            sendMessage("Somehow I don't believe you %Lol%");
            sendMessage("But I guess there's only one way to really put it to the test %Grin%");
            sendMessage("%SubName%");
            sendMessage("I want you to take hold of that %Cock%");
        }

        sendMessage("And how much I want it to suffer %Grin%");
    }
}
else
{
    sendMessage("Your %Cock% must have sensed I'm feeling a little wicked this afternoon");
    if (randomInteger(0, 1) == 1)
    {
        sendMessage("Well since you're both here...");
        sendMessage("Why don't you pull it out of your pants...");
    }
    else
    {
        sendMessage("In fact, I'm feeling SO wicked");
        sendMessage("That the only thing that's going to satisfy me is making you suffer %Grin%");
        sendMessage("So why don't you wrap your hand around that %Cock%");
    }
}
andStroking();