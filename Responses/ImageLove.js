addResponseIndicator("love it", "it's amazing", "its hot", "^4$", " 4$", "^4 ", " 4 ", "awesome", "fuck");
//run("allutils.js");

function imageLoveResponse(message) {
    if (getResponsesDisabled()) {
        return false;
    }
    if (message.toLowerCase().search("pic") != -1) {
        sendMessage("false pic");
        return false;
    }
    if (getImageUrl() != null || getImagePath() != null)
    {
        sortPicture(getImagePath(), 4);
    }
    return false;
}