addResponseRegex("picturesmode([ ]*([a-z|0-9]*))", "Picturesmode([ ]*([a-z|0-9]*))", "picmode([ ]*([a-z|0-9]*))");

function picturesModeResponse(message) {


    //this needs debugging. not hitting right paths
    sendMessage(message);
    var path = "images\\normal";
    if (message.search("liked") != -1 || message.search("3") != -1) {
        path = "images\\liked";
    }
    else if (message.search("normal") != -1 || message.search("2") != -1) {
        path = "images\\normal";
    }
    else if (message.search("loved") != -1 || message.search("4") != -1) {
        path = "images\\loved";
    }
    var x = "4";
    while (x != "5")
    {
        getLocalTeasePicture(path);
        sendMessage("path: " + getImagePath(), 0);
        answer = sendInput("Do you like this one? (Options: hate, ok, like, love (1,2,3,4))", 0);
        x = answer.getAnswer();
    }
    return true;
}