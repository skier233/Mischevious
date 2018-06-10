sendMessage("Time to find out if you get to cum %PetName%");
var cumming = calculateOrgasm();
var ruining = false;
if (cumming)
{
    ruining = calculateRuin();
}

if (ruining)
{
    sendMessage("Bring yourself to the edge one more time");
    startStroking(220);
    startEdging();
    stopStroking();
    stopEdging();
    answer = sendInput("%ruinyourorgasm%");
    if (answer.isLike("ruined", "finished", "did")) {
        sendMessage("Good %Grin%");
    }
    else {
        sendMessage("Hehe just calm down now");
        sendMessage("I love building up all that pleasure just to snatch it away from you");
        sendMessage("Better luck next time");
    }
}
else if (cumming)
{
    sendMessage("Bring yourself to the edge one more time");
    startStroking(220);
    startEdging();
    stopStroking();
    stopEdging();
    answer = sendInput("%cumforme%");
    if (answer.isLike("came", "finished", "did")) {
        sendMessage("Good %Grin%");
    }
    else {
        sendMessage("You're welcome %PetName% %Grin%");
        sendMessage("Hehe just calm down now");
        sendMessage("I hope you enjoyed that orgasm %SubName%");
        sendMessage("Who knows how many you're actually going to get?");
    }
}
else
{
    sendMessage("Bring yourself to the edge one more time");
    startStroking(220);
    startEdging();
    stopStroking();
    stopEdging();
    answer = sendInput("Put it back in your pants, you don't get to cum tonight");
    sendMessage("Too bad");
    sendMessage("Better luck next time %Grin%");
}
sendMessage("Thanks for giving me such a good time tonight %PetName%");
sendMessage("I can't wait to see you again %EmoteHappy%");