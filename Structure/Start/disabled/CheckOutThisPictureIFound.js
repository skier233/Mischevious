CMessage("%SubName%, I'm glad you're here");
CMessage("Check out this picture I found earlier today", 0);
getTeasePicture();
answer = getInput("That's fucking hot, isn't it? %Grin%");
if (answer.isLike("yes", "yep", "yea", "hot", "good", "3", "like"))
{
    sortPicture(getImagePath(), 3);
    CMessage("I'm glad you think so");
    CMessage("Because I wanted to get you squirming in that chair before we even started %EmoteRandom%");
    answer2 = getInput("Are you squirming yet?");
    if (answer2.isLike("yes", "yea", "yep"))
    {
        CMessage("Mmmmm you know what that means");
        CMessage("It means we can get started %Grin%");
    }
    else
    {
        increaseAnger(1);
        CMessage("So you're not that turned on yet?");
        CMessage("That's okay");
        CMessage("I'll just find one that WILL drive you insane %Lol%");
        thisOne();
        CMessage("I knew I would get you with a little persistence %Grin%");
        CMessage("And since you DID make me have to persist in finding a sexy picture");
        CMessage("I'm going to make YOU persist in stroking that %Cock% until you're begging me for mercy %EmoteRandom%");
    }
}
else if (answer.isLike("fuck", "super", "sexy", "love", "4"))
{
    sortPicture(getImagePath(), 4);
    CMessage("I knew that would fuck you over %grin%");
    CMessage("And now...");
    CMessage("I'm going to make you stroke to it");
}
else if (answer.isLike("alright", "meh", "ok", "2", "okay"))
{
    sortPicture(getImagePath(), 2);
    CMessage("Wow I really thought you'd like this one more");
    CMessage("That's okay");
    CMessage("I'll just find one that WILL drive you insane %Lol%");
    thisOne();
    CMessage("I knew I would get you with a little persistence %Grin%");
    CMessage("And since you DID make me have to persist in finding a sexy picture");
    CMessage("I'm going to make YOU persist in stroking that %Cock% until you're begging me for mercy %EmoteRandom%");
}
else
{
    sortPicture(getImagePath(), 1);
    CMessage("Wow I really thought you'd like this one");
    CMessage("That's okay");
    CMessage("I'll just find one that WILL drive you insane %Lol%");
    thisOne();
    CMessage("I knew I would get you with a little persistence %Grin%");
    CMessage("And since you DID make me have to persist in finding a sexy picture");
    CMessage("I'm going to make YOU persist in stroking that %Cock% until you're begging me for mercy %EmoteRandom%");
}
Stroking();

function thisOne()
{
    getTeasePicture();
    answer3 = getInput("Do you like this one?");
    while (answer3.isLike("no", "nope", "not", "alright", "okay", "sort", "sorta", "2", "1", "meh", "ok")) {
        if (answer3.isLike("alright", "meh", "ok", "2", "okay")) {
            CMessage("I'll find something better than this");
            sortPicture(getImagePath(), 2);
        }
        else {
            CMessage("I'm not giving up");
            sortPicture(getImagePath(), 1);
        }
        getTeasePicture();
        answer3 = getInput("Do you like this one?");
    }
    if (answer3.isLike("fuck", "super", "sexy", "love", "4")) {
        sortPicture(getImagePath(), 4);
    }
    else
    {
        sortPicture(getImagePath(), 3);
    }

}