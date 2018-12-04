addResponseRegex("downloadurl", "DownloadUrl");

function downloadUrlResponse(message) {
    DMessage("downloadUrl: BeginningResponse");
    var argument1 = message.toLowerCase().replace("downloadurl", "").trim();
    downloadUrlContent(argument1);
    DMessage("downloadUrl: EndResponse");
    return true;
}
