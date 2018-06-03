sendMessage("%stopstroking%", 0);
stopStroking();
if (!getVar("playedavoidtheedge", false))
{
    sendMessage("I want to play a little game with you #PetName");
    sendMessage("I call it Avoid The Edge #EmoteHappy");
    sendMessage("The rules are pretty simple really");
    sendMessage("I'm going to pick one of your porn videos for you to watch");
    sendMessage("And you have to stroke the entire time it's playing");
    sendMessage("The thing is though...");
    sendMessage("I don't want you to edge, I only want you to stroke");
    sendMessage("But if you can't help yourself, and you DO get close, just tell me");
    sendMessage("And I'll pause the video while I cool you down a little");
    sendMessage("And just for the record");
    sendMessage("That may not be as pleasant as it sounds #Grin");
    sendMessage("All you have to do to win is make it through the whole video");
    sendMessage("And don't worry about losing");
    sendMessage("I'll make sure you won't #Lol");
    sendMessage("So now that you know the rules");
    sendMessage("Let's play %Grin%");
    avoidTheEdge();
    sendMessage("You made it!");
    answer = sendInput("Pretty fun game, right?");
    if (answer.isLike("yes", "yea", "yep"))
    {
        sendMessage("I'm glad you think so %PetName%");
    }
    else
    {
        sendMessage("That's kind of a shame %PetName%");
    }
    sendMessage("Cause we'll be playing a lot more of that, I'm sure %Grin%");
    sendMessage("But for now");
    sendMessage("I have something else in mind");
    setVar("playedavoidtheedge", true);

}
else
{
    sendMessage("I want to play Avoid The Edge with you again");
    answer = sendInput("Up for it? %EmoteHappy%");
    if (answer.isLike("yes", "yea", "yep")) {
        sendMessage("I was hoping you'd say that %Grin%");
        sendMessage("Let's get started");
        avoidTheEdge();
        sendMessage("You made it!");
        sendMessage("That was fun %EmoteHappy%");
        sendMessage("Next time I'll find an even better video for you to stroke to %Grin%");
    }
    else {
        sendMessage("That's okay %PetName%");
        sendMessage("I have plenty of other ways to make you squirm %Grin%");
    }
}
<<<<<<< HEAD
=======
sendMessage("");
sendMessage("I love making you do that %EmoteRandom%");
>>>>>>> origin/master

function avoidTheEdge()
{

}