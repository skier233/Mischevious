addResponseRegex("meh", "it's ok", "its alright", "^2$", "^2 ", " 2$", " 2 ", "it's alright", "its ok");
//run("allutils.js");

function imageOKResponse(message) {
    if (getResponsesDisabled()) {
        return false;
    }
    if (message.toLowerCase().search("pic") != -1) {
        sendMessage("false pic");
        return false;
    }
    if (getImageUrl() != null || getImagePath() != null)
    {
        sortPicture(getImagePath(), 2);
    }
    return false;
}