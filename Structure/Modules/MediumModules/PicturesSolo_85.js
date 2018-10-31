DMessage("PicturesSolo_85: Beginning");
CMessage("%stopstroking%", 0);
stopStroking();
CMessage("Don't mind me, I'm just going to look through a few pictures while you relax %Grin%");
lockImages();
getTeasePicture(randomInteger(1, 4), 9);
getTeasePicture(randomInteger(1, 4), 9);
getTeasePicture(randomInteger(1, 4), 9);
while ((randomInteger(0, 9) > 1)) {
    getTeasePicture(randomInteger(1,4), 9);
}
CMessage("Okay that's enough of that");
startEdging();
unlockImages();
CMessage("%stopstrokingedge%", null, false);
CMessage("%lettheedgefade%");
DMessage("PicturesSolo_85: End");