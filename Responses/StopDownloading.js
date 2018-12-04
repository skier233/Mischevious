addResponseRegex("stopdownloading", "StopDownloading");

function stopDownloadingResponse(message) {
    DMessage("stopdownloading: BeginningResponse");
    setVar("stopdownloading", true);

    DMessage("stopdownloading: EndResponse");
    return false;

}
