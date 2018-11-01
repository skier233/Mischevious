DMessage("BallsAreLikeAHardDrive: Beginnning");
CMessage("You know what just occurred to me?");
if (getVar("balldiskspace", false))
{
    CMessage("Your %Balls% might have some more space on them since the last time I stored some ache there");
    CMessage("I should save a few more pictures there %Grin%");
    lockImages();
    CMessage("Like this one", 0);
    getTeasePicture();
    CMessage("Maybe this one", 0);
    getTeasePicture();
    CMessage("Definitely this one", 0);
    getTeasePicture();
    CMessage("Am I running out of space yet %EmoteRandom%", 0);
    getTeasePicture();
    CMessage("I think I can fit a few more", 0);
    getTeasePicture();
    CMessage("Can't leave this one", 0);
    getTeasePicture();
    CMessage("Or this one", 0);
    getTeasePicture();
    CMessage("We might have to upgrade you to some bigger balls #Lol", 0);
    unlockImages();
}
else
{
    CMessage("Balls are a lot like a hard drive");
    CMessage("But instead of data");
    CMessage("They store all that ache I've been sending your way");
    CMessage("Think about it");
    CMessage("You start looking at sexy pictures on the internet", 0);
    getTeasePicture();
    CMessage("You like what you see", 0);
    getTeasePicture();
    CMessage("So you download a picture here", 0);
    getTeasePicture();
    CMessage("A picture there", 0);
    getTeasePicture();
    CMessage("And slowly but surely", 0);
    getTeasePicture();
    CMessage("All that space begins to fill up", 0);
    getTeasePicture();
    CMessage("Until there's no room left at all %EmoteRandom%", 0);
    getTeasePicture();
    CMessage("Hold on a second, I'm getting a notification");
    CMessage("You are running low on space in %SubName%'s balls. Would you like to delete some ache?");
    CMessage("No thanks %Lol%");
}
Stroking();
DMessage("BallsAreLikeAHardDrive: End");