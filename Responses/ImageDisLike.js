addResponseIndicator("dont like", "don't like", "bad", "1", "hate", "awful");
run("utils.js");

function imageDisLikeResponse(message) {
    if (getImageUrl() != null || getImagePath() != null)
    {
        var myFile = new java.io.File("C:\\Users\\tyler\\Desktop\\test\\teaseaijava2\\" + getImagePath());
        myFile.delete();
        //sendMessage("complete");
    }
    return true;
}