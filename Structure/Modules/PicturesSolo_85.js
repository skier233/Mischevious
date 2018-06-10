sendMessage("%stopstroking%", 0);
stopStroking();
sendMessage("Don't mind me, I'm just going to look through a few pictures while you relax %Grin%");
getTeasePicture(randomInteger(1, 4), 10);
getTeasePicture(randomInteger(1, 4), 10);
getTeasePicture(randomInteger(1, 4), 10);
while ((randomInteger(0, 9) > 1)) {
    getTeasePicture(randomInteger(1,4), 10);
}
sendMessage("Okay that's enough of that");
sendMessage("%edge%");
startEdging();
sendMessage("%stopstrokingedge%");
sendMessage("%lettheedgefade%");