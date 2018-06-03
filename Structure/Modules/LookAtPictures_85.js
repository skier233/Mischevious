sendMessage("%stopstroking%", 0);
stopStroking();
sendMessage("I think you could use a moment to calm down %Grin%");
answer = sendInput("Want to look at some pictures with me?");
if (answer.isLike("yes", "yep", "yea"))
{
    sendMessage("Let's see what I can find");
    showTeaseImage();
    answer = sendInput("Do you like this one?");
    if (answer.isLike("yes", "yep", "yea", "like", "good", "hot", "sexy"))
    {
        sendMessage("%LAPIllSaveThisOne_85%");
    }
    else
    {
        sendMessage("%LAPScratchThatOne_85%");
    }

    sendMessage("Hmmm");
    showTeaseImage();
    answer = sendInput("%LAPWhatAboutThisOne_85%");
    if (answer.isLike("yes", "yep", "yea", "like", "good", "hot", "sexy")) {
        sendMessage("%LAPIllSaveThisOne_85%");
    }
    else {
        sendMessage("%LAPScratchThatOne_85%");
    }
    while ((randomInteger(0, 9) > 1))
    {
        showTeaseImage();
        answer = sendInput("%LAPWhatAboutThisOne_85%");
        if (answer.isLike("yes", "yep", "yea", "like", "good", "hot", "sexy")) {
            sendMessage("%LAPIllSaveThisOne_85%");
        }
        else {
            sendMessage("%LAPScratchThatOne_85%");
        }
    }
    sendMessage("%thatsenough%");
}
else
{
    sendMessage("%LAPYouNeedToSufferMore_85%");
}