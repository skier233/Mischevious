setTypeSpeed("INSTANT");
sendMessage("%SubName%, I'm glad you're here");
sendMessage("Check out this picture I found earlier today");
showTeaseImage();
answer = sendInput("That's fucking hot, isn't it? %Grin%");
if (answer.isLike("yes", "yep", "yea", "hot", "good"))
{
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
        sendMessage("So you're not that turned on yet?");
        sendMessage("That's okay");
        sendMessage("I'll just find one that WILL drive you insane %Lol%");
        thisOne();
        sendMessage("I knew I would get you with a little persistence %Grin%");
        sendMessage("And since you DID make me have to persist in finding a sexy picture");
        sendMessage("I'm going to make YOU persist in stroking that %Cock% until you're begging me for mercy %EmoteRandom%");
    }
}
else
{
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
    showTeaseImage();
    answer3 = sendInput("Do you like this one?");
    while (answer3.isLike("no", "nope", "not", "alright", "okay", "sort", "sorta")) {
        sendMessage("I'm not giving up");
        sendMessage("Do you like this one?");
        showTeaseImage();
        answer3.loop();
    }
}