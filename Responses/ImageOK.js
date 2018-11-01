addResponseRegex("^2$", "^2 ", " 2$", " 2 ");
//run("allutils.js");

function imageOKResponse(message) {
    DMessage("ImageOK: BeginningResponse");
    if (getResponsesDisabled()) {
        DMessage("ImageOK: EndResponse Response is Disabled");
        return false;
    }
    if (getImageUrl() != null || getImagePath() != null)
    {
        sortPicture(getImagePath(), 2);
    }
    DMessage("ImageOK: EndResponse");
    return false;
}