sendMessage("%SubName%, I'm glad you're here");
sendMessage("Check out this picture I found earlier today");
getTeasePicture();
answer = sendInput("That's fucking hot, isn't it? %Grin%");
if (answer.isLike("yes", "yep", "yea", "hot", "good", "3", "like"))
{
    sortPicture(getImagePath(), 3);
    sendMessage("I'm glad you think so");
    sendMessage("Because I wanted to get you squirming in that chair before we even started %EmoteRandom%");
    answer2 = sendInput("Are you squirming yet?");
    if (answer2.isLike("yes", "yea", "yep"))
    {
        sendMessage("Mmmmm you know what that means");
        sendMessage("It means we can get started %Grin%");
    }
    else
    {
        increaseAnger(1);
        sendMessage("So you're not that turned on yet?");
        sendMessage("That's okay");
        sendMessage("I'll just find one that WILL drive you insane %Lol%");
        thisOne();
        sendMessage("I knew I would get you with a little persistence %Grin%");
        sendMessage("And since you DID make me have to persist in finding a sexy picture");
        sendMessage("I'm going to make YOU persist in stroking that %Cock% until you're begging me for mercy %EmoteRandom%");
    }
}
else if (answer.isLike("fuck", "super", "sexy", "love", "4"))
{
    sortPicture(getImagePath(), 4);
    sendMessage("I knew that would fuck you over %grin%");
    sendMessage("And now...");
    sendMessage("I'm going to make you stroke to it");
}
else if (answer.isLike("alright", "meh", "ok", "2", "okay"))
{
    sortPicture(getImagePath(), 2);
    sendMessage("Wow I really thought you'd like this one more");
    sendMessage("That's okay");
    sendMessage("I'll just find one that WILL drive you insane %Lol%");
    thisOne();
    sendMessage("I knew I would get you with a little persistence %Grin%");
    sendMessage("And since you DID make me have to persist in finding a sexy picture");
    sendMessage("I'm going to make YOU persist in stroking that %Cock% until you're begging me for mercy %EmoteRandom%");
}
else
{
    sortPicture(getImagePath(), 1);
    sendMessage("Wow I really thought you'd like this one");
    sendMessage("That's okay");
    sendMessage("I'll just find one that WILL drive you insane %Lol%");
    thisOne();
    sendMessage("I knew I would get you with a little persistence %Grin%");
    sendMessage("And since you DID make me have to persist in finding a sexy picture");
    sendMessage("I'm going to make YOU persist in stroking that %Cock% until you're begging me for mercy %EmoteRandom%");
}
Stroking();

function thisOne()
{
    getTeasePicture();
    answer3 = sendInput("Do you like this one?");
    while (answer3.isLike("no", "nope", "not", "alright", "okay", "sort", "sorta", "2", "1", "meh", "ok")) {
        if (answer3.isLike("alright", "meh", "ok", "2", "okay")) {
            sendMessage("I'll find something better than this");
            sortPicture(getImagePath(), 2);
        }
        else {
            sendMessage("I'm not giving up");
            sortPicture(getImagePath(), 1);
        }
        sendMessage("Do you like this one?", 0);
        getTeasePicture();
        answer3.loop();
    }
    if (answer3.isLike("fuck", "super", "sexy", "love", "4")) {
        sortPicture(getImagePath(), 4);
    }
    else
    {
        sortPicture(getImagePath(), 3);
    }

}