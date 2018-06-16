addResponseRegex("dont like", "don't like", "bad", "^1$", "^1 ", " 1$", " 1 ", "hate", "awful");
//run("allutils.js");

function imageDisLikeResponse(message) {
    if (getResponsesDisabled()) {
        return false;
    }
    if (message.toLowerCase().search("pic") != -1) {
        sendMessage("false pic");
        return false;
    }
    if (getImageUrl() != null || getImagePath() != null)
    {
        var myFile = new java.io.File(getAppPath() + getImagePath());
        myFile.delete();
    }
    return false;
}