addResponseRegex("like", "it's hot", "its hot", "^3$", "^3 ", " 3$", " 3 ", "sexy", "good");
run("allutils.js");
function imageLikeResponse(message) {
    if (message.toLowerCase().search("pic") != -1)
    {
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
        moveFile(getAppPath() + getImagePath(), getAppPath() + "\\images\\liked\\" + fileName);
        //sendMessage("complete");
    }
    return true;
}