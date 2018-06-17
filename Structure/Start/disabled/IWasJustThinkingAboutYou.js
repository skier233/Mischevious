CMessage("I was just thinking about you %SubName%");
if (randomInteger(0, 1) == 1)
{
    CMessage("And here you are %Grin%");
    answer = getInput("Feel like having a little fun with me this evening?");
    if (answer.isLike("yes", "yea", "yep"))
    {
        CMessage("%Yay%");
        CMessage("Then what I want you to do");
        CMessage("Is take that %Cock% out of your pants")
    }
    else
    {
        CMessage("You don't?");
        if (randomInteger(0, 1) == 1)
        {
            answer2 = getInput("Well whose cock is that between your legs?");
            if (answer2.isLike("you", "your", "yours"))
            {
                CMessage("That's right %Grin%");
                CMessage("And since it is my cock...");
                CMessage("I get to have fun with it whenever I want");
                CMessage("Whether you want to or not %Grin%");
                CMessage("And what sounds fun to me right now is making you suffer");
                CMessage("So pull that %Cock% out");
            }
            else
            {
                CMessage("Oh you think it belongs to you huh?");
                CMessage("In that case why don't you pull <i>your<> cock out");
                CMessage("And I'll make you put it through so much ache and abuse");
                CMessage("That you'll beg me to take it from you and make it mine %Grin%");
                CMessage("So why don't you wrap your fingers around our little piece of disputed property");
            }
        }
        else
        {
            CMessage("Somehow I don't believe you %Lol%");
            CMessage("But I guess there's only one way to really put it to the test %Grin%");
            CMessage("%SubName%");
            CMessage("I want you to take hold of that %Cock%");
        }

        CMessage("And how much I want it to suffer %Grin%");
    }
}
else
{
    CMessage("Your %Cock% must have sensed I'm feeling a little wicked this afternoon");
    if (randomInteger(0, 1) == 1)
    {
        CMessage("Well since you're both here...");
        CMessage("Why don't you pull it out of your pants...");
    }
    else
    {
        CMessage("In fact, I'm feeling <i>so<> wicked");
        CMessage("That the only thing that's going to satisfy me is making you suffer %Grin%");
        CMessage("So why don't you wrap your hand around that %Cock%");
    }
}
customStroking("and %startstroking%");