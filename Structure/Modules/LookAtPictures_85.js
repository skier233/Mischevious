CMessage("%stopstroking%", 0);
stopStroking();
CMessage("I think you could use a moment to calm down %Grin%");
answer = getInput("Want to look at some pictures with me?");
if (answer.isLike("yes", "yep", "yea"))
{
    CMessage("Let's see what I can find");
    getTeasePicture();
    answer = getInput("Do you like this one?");
    if (answer.isLike("yes", "yep", "yea", "hot", "good", "3", "like"))
    {
        sortPicture(getImagePath(), 3);
        CMessage("%LAPIllSaveThisOne_85%");
    }
    else if (answer.isLike("fuck", "super", "sexy", "love", "4")) {
        sortPicture(getImagePath(), 4);
        CMessage("%LAPIllSaveThisOne_85%");
    }
    else if (answer.isLike("alright", "meh", "ok", "2", "okay")) {
        sortPicture(getImagePath(), 2);
        CMessage("%LAPIllSaveThisOne_85%");
    }
    else {
        CMessage("%LAPScratchThatOne_85%");
    }

    CMessage("Hmmm");
    getTeasePicture();
    answer = getInput("%LAPWhatAboutThisOne_85%");
    if (answer.isLike("yes", "yep", "yea", "hot", "good", "3", "like")) {
        sortPicture(getImagePath(), 3);
        CMessage("%LAPIllSaveThisOne_85%");
    }
    else if (answer.isLike("fuck", "super", "sexy", "love", "4")) {
        sortPicture(getImagePath(), 4);
        CMessage("%LAPIllSaveThisOne_85%");
    }
    else if (answer.isLike("alright", "meh", "ok", "2", "okay")) {
        sortPicture(getImagePath(), 2);
        CMessage("%LAPIllSaveThisOne_85%");
    }
    else {
        CMessage("%LAPScratchThatOne_85%");
    }
    while ((randomInteger(0, 9) > 0))
    {
        getTeasePicture();
        answer = getInput("%LAPWhatAboutThisOne_85%");
        if (answer.isLike("yes", "yep", "yea", "hot", "good", "3", "like")) {
            sortPicture(getImagePath(), 3);
            CMessage("%LAPIllSaveThisOne_85%");
        }
        else if (answer.isLike("fuck", "super", "sexy", "love", "4")) {
            sortPicture(getImagePath(), 4);
            CMessage("%LAPIllSaveThisOne_85%");
        }
        else if (answer.isLike("alright", "meh", "ok", "2", "okay")) {
            sortPicture(getImagePath(), 2);
            CMessage("%LAPIllSaveThisOne_85%");
        }
        else {
            CMessage("%LAPScratchThatOne_85%");
        }
    }
    CMessage("%thatsenough%");
}
else
{
    CMessage("%LAPYouNeedToSufferMore_85%");
}