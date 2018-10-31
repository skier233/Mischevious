addResponseRegex("it's hot", "its hot", "^3$", "^3 ", " 3$", " 3 ", "sexy");
function imageLikeResponse(message) {
    DMessage("ImageLike: BeginningResponse");
    if (getResponsesDisabled()) {
        DMessage("ImageLike: EndResponse Response is Disabled");
        return false;
    }
    if (getImageUrl() != null || getImagePath() != null)
    {
        sortPicture(getImagePath(), 3);
    }
    DMessage("ImageLike: EndResponse");
    return false;
}