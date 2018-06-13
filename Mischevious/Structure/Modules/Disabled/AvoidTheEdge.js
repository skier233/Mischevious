CMessage("%stopstroking%", 0);
stopStroking();
if (!getVar("playedavoidtheedge", false))
{
    CMessage("I want to play a little game with you #PetName");
    CMessage("I call it Avoid The Edge #EmoteHappy");
    CMessage("The rules are pretty simple really");
    CMessage("I'm going to pick one of your porn videos for you to watch");
    CMessage("And you have to stroke the entire time it's playing");
    CMessage("The thing is though...");
    CMessage("I don't want you to edge, I only want you to stroke");
    CMessage("But if you can't help yourself, and you DO get close, just tell me");
    CMessage("And I'll pause the video while I cool you down a little");
    CMessage("And just for the record");
    CMessage("That may not be as pleasant as it sounds #Grin");
    CMessage("All you have to do to win is make it through the whole video");
    CMessage("And don't worry about losing");
    CMessage("I'll make sure you won't #Lol");
    CMessage("So now that you know the rules");
    CMessage("Let's play %Grin%");
    avoidTheEdge();
    CMessage("You made it!");
    answer = sendInput("Pretty fun game, right?");
    if (answer.isLike("yes", "yea", "yep"))
    {
        CMessage("I'm glad you think so %PetName%");
    }
    else
    {
        CMessage("That's kind of a shame %PetName%");
    }
    CMessage("Cause we'll be playing a lot more of that, I'm sure %Grin%");
    CMessage("But for now");
    CMessage("I have something else in mind");
    setVar("playedavoidtheedge", true);

}
else
{
    CMessage("I want to play Avoid The Edge with you again");
    answer = sendInput("Up for it? %EmoteHappy%");
    if (answer.isLike("yes", "yea", "yep")) {
        CMessage("I was hoping you'd say that %Grin%");
        CMessage("Let's get started");
        avoidTheEdge();
        CMessage("You made it!");
        CMessage("That was fun %EmoteHappy%");
        CMessage("Next time I'll find an even better video for you to stroke to %Grin%");
    }
    else {
        CMessage("That's okay %PetName%");
        CMessage("I have plenty of other ways to make you squirm %Grin%");
    }
}
<<<<<<< HEAD
=======
CMessage("");
CMessage("I love making you do that %EmoteRandom%");
>>>>>>> origin/master

function avoidTheEdge()
{

}