addResponseRegex("like", "it's hot", "its hot", "^3$", "^3 ", " 3$", " 3 ", "sexy", "good");
function imageLikeResponse(message) {
    if (getResponsesDisabled()) {
        return false;
    }
    if (message.toLowerCase().search("pic") != -1)
    {
        sendMessage("false pic");
        return false;
    }
    if (getImageUrl() != null || getImagePath() != null)
    {
        sortPicture(getImagePath(), 3);
    }
    return false;
}