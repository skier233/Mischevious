addResponseIndicator("love it", "it's amazing", "its hot", "^4$", " 4$", "^4 ", " 4 ");

function imageLoveResponse(message) {
    DMessage("ImageLove: BeginningResponse");
    if (getResponsesDisabled()) {
        DMessage("ImageLove: EndResponse Response is Disabled");
        return false;
    }
    if (getImageUrl() != null || getImagePath() != null)
    {
        sortPicture(getImagePath(), 4);
    }
    DMessage("ImageLove: EndResponse");
    return false;
}