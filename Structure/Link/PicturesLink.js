CMessage("%stopstroking%", 0);
stopStroking();
CMessage("Don't mind me, I'm just going to look through a few pictures while you relax %Grin%");
lockImages();
getTeasePicture(randomInteger(1, 4), 10);
getTeasePicture(randomInteger(1, 4), 10);
getTeasePicture(randomInteger(1, 4), 10);
while ((randomInteger(0, 9) > 1)) {
    getTeasePicture(randomInteger(1, 4), 10);
}
unlockImages();
CMessage("Okay that's enough of that");
Stroking();