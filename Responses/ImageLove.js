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
        /*if (java.nio.file.Files.move(java.nio.file.Paths.get("C:\\Desktop\\Test\\TeaseAIJava2\\tumblr_o9pi96pxXN1v0oj9oo1_400.gif"), java.nio.file.Paths.get("C:\\Desktop\\Test\\tumblr_o9pi96pxXN1v0oj9oo1_400.gif")) == null)
        {
            sendMessage("failed")
        }*/
        var z = getImagePath();
        z = "" + z;
        var x = z.split("\\");
        var fileName = x[x.length - 1];
        sortPicture(getImagePath(), 4);
        //sendMessage("flag 617");
        //moveFile(getAppPath() + getImagePath(), getAppPath() + "\\images\\loved\\" + fileName);
        //sendMessage("complete");
    }
    return true;
}