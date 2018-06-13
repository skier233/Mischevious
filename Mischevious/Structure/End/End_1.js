CMessage("Time to find out if you get to cum %PetName%");
var cumming = calculateOrgasm();
var ruining = false;
if (cumming)
{
    ruining = calculateRuin();
}

if (ruining)
{
    CMessage("Bring yourself to the edge one more time");
    startStroking(220);
    startEdging();
    stopStroking();
    stopEdging();
    answer = getInput("%ruinyourorgasm%");
    if (answer.isLike("ruined", "finished", "did")) {
        CMessage("Good %Grin%");
    }
    else {
        CMessage("Hehe just calm down now");
        CMessage("I love building up all that pleasure just to snatch it away from you");
        CMessage("Better luck next time");
    }
}
else if (cumming)
{
    CMessage("Bring yourself to the edge one more time");
    startStroking(220);
    startEdging();
    stopStroking();
    stopEdging();
    answer = getInput("%cumforme%");
    if (answer.isLike("came", "finished", "did")) {
        CMessage("Good %Grin%");
    }
    else {
        CMessage("You're welcome %PetName% %Grin%");
        CMessage("Hehe just calm down now");
        CMessage("I hope you enjoyed that orgasm %SubName%");
        CMessage("Who knows how many you're actually going to get?");
    }
}
else
{
    CMessage("Bring yourself to the edge one more time");
    startStroking(220);
    startEdging();
    stopStroking();
    stopEdging();
    answer = getInput("Put it back in your pants, you don't get to cum tonight");
    CMessage("Too bad");
    CMessage("Better luck next time %Grin%");
}
CMessage("Thanks for giving me such a good time tonight %PetName%");
CMessage("I can't wait to see you again %EmoteHappy%");