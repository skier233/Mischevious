addResponseRegex("downloadallurls", "DownloadAllUrls", "downloadallurlcontent");

function downloadAllUrlsResponse(message) {
    DMessage("downloadallurls: BeginningResponse");
    downloadAllUrlContent();
    DMessage("downloadallurls: EndResponse");
    return true;
}