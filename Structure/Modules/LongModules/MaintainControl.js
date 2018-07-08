CMessage("%stopstroking%", 0);
stopStroking();
CMessage("You know what I really love?");
CMessage("The control you maintain over that %Cock%");
CMessage("Getting so close");
CMessage("Knowing how fucking <i>good<> it would feel if you just let yourself go over");
CMessage("But holding back for me");
CMessage("No matter how much you want it");
CMessage("How much it <i>hurts<>");
CMessage("Because it's what I want");
CMessage("%Edge% %PetName%", 0);
startEdging();
CMessage("%stopstrokingedge%", null, false);
CMessage("%lettheedgefade%");
CMessage("Every time you get close like that");
answer = getInput("It hurts just a little bit more, doesn't it %PetName%?");
if (answer.isLike("yes", "yea", "yep"))
{
    increaseAnger(-1);
    CMessage("mmmm");
}
else
{
    CMessage("You wanna be sassy with me huh? You'll regret that %petname%...%grin%");
    increaseAnger(5);
}
CMessage("Your %Cock% is %Gonna% reach a point");
CMessage("A very desperate...");
CMessage("Very achey point");
CMessage("Where your desire to please me will be challenged");
CMessage("By the absolute <i>need<> in every little frustrated inch");
CMessage("%Edge% again");
startEdging();
CMessage("%stopstrokingedge%", null, false);
CMessage("%lettheedgefade%");
CMessage("Pain");
CMessage("Pleasure");
CMessage("Relief");
CMessage("Agony");
CMessage("Those words don't mean anything to your %cock% %SubName%");
CMessage("Not anymore");
CMessage("The only words that matter to that cock are the words on your screen right now");
CMessage("My words");
CMessage("My will");
CMessage("Edge, and be ready to hold it");
startEdging();
holdEdge(randomInteger(10, 50));
CMessage("From now own, the only pain you will truly feel");
CMessage("Is the pain of disappointing me");
CMessage("The only pleasure you will truly feel");
CMessage("Is the pleasure of making me happy");
CMessage("Rest while you can and think about that");
CMessage("Because you'll start stroking again soon enough");
CMessage("And no matter how much agony you're in");
CMessage("Or how badly you need relief, you'll wrap those fingers around that %Cock%");
CMessage("And you'll stroke");
CMessage("Just to make me happy %EmoteHappy%");