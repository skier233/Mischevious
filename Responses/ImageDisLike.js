addResponseRegex("^1$", "^1 ", " 1$", " 1 ");
//run("allutils.js");

function imageDisLikeResponse(message) {
    DMessage("ImageDislike: BeginningResponse");
    if (getResponsesDisabled()) {
        DMessage("ImageDislike: EndResponse Response is Disabled");
        return false;
    }
    if (getImageUrl() != null || getImagePath() != null)
    {
        let myFile = new java.io.File(getAppPath() + getImagePath());
        myFile.delete();
    }
    DMessage("ImageDislike: EndResponse");
    return false;
}