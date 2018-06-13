addResponseRegex("meh", "it's ok", "its alright", "^2$", "^2 ", " 2$", " 2 ", "it's alright", "its ok");
//run("allutils.js");

function imageOKResponse(message) {
    if (getResponsesDisabled()) {
        return false;
    }
    //sendMessage("in ok");
    if (message.toLowerCase().search("pic") != -1) {
        sendMessage("false pic");
        return false;
    }
    //sendMessage("in ok 2");
    if (getImageUrl() != null || getImagePath() != null)
    {
        //sendMessage("in ok 3");
        var z = getImagePath();
        z = "" + z;
        var x = z.split("\\");
        var fileName = x[x.length - 1];
        sortPicture(getImagePath(), 2);
        //sendMessage("flag 6712");
        //moveFile(getAppPath() + getImagePath(), getAppPath() + "images\\normal\\" + fileName);
        //sendMessage("complete");
    }
    return true;
}