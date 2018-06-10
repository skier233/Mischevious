sendMessage("%stopstroking%", 0);
stopStroking();
sendMessage("I think you could use a moment to calm down %Grin%");
answer = sendInput("Want to look at some pictures with me?");
if (answer.isLike("yes", "yep", "yea"))
{
    sendMessage("Let's see what I can find");
    getTeasePicture();
    answer = sendInput("Do you like this one?");
    if (answer.isLike("yes", "yep", "yea", "hot", "good", "3", "like"))
    {
        sortPicture(getImagePath(), 3);
        sendMessage("%LAPIllSaveThisOne_85%");
    }
    else if (answer.isLike("fuck", "super", "sexy", "love", "4")) {
        sortPicture(getImagePath(), 4);
        sendMessage("%LAPIllSaveThisOne_85%");
    }
    else if (answer.isLike("alright", "meh", "ok", "2", "okay")) {
        sortPicture(getImagePath(), 2);
        sendMessage("%LAPIllSaveThisOne_85%");
    }
    else {
        sendMessage("%LAPScratchThatOne_85%");
    }

    sendMessage("Hmmm");
    getTeasePicture();
    answer = sendInput("%LAPWhatAboutThisOne_85%");
    if (answer.isLike("yes", "yep", "yea", "hot", "good", "3", "like")) {
        sortPicture(getImagePath(), 3);
        sendMessage("%LAPIllSaveThisOne_85%");
    }
    else if (answer.isLike("fuck", "super", "sexy", "love", "4")) {
        sortPicture(getImagePath(), 4);
        sendMessage("%LAPIllSaveThisOne_85%");
    }
    else if (answer.isLike("alright", "meh", "ok", "2", "okay")) {
        sortPicture(getImagePath(), 2);
        sendMessage("%LAPIllSaveThisOne_85%");
    }
    else {
        sendMessage("%LAPScratchThatOne_85%");
    }
    while ((randomInteger(0, 9) > 0))
    {
        getTeasePicture();
        answer = sendInput("%LAPWhatAboutThisOne_85%");
        if (answer.isLike("yes", "yep", "yea", "hot", "good", "3", "like")) {
            sortPicture(getImagePath(), 3);
            sendMessage("%LAPIllSaveThisOne_85%");
        }
        else if (answer.isLike("fuck", "super", "sexy", "love", "4")) {
            sortPicture(getImagePath(), 4);
            sendMessage("%LAPIllSaveThisOne_85%");
        }
        else if (answer.isLike("alright", "meh", "ok", "2", "okay")) {
            sortPicture(getImagePath(), 2);
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