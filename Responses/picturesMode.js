addResponseRegex("picturesmode([ ]*([a-z|0-9]*[ ]*)*)", "Picturesmode([ ]*([a-z|0-9]*[ ]*)*)", "picmode([ ]*([a-z|0-9]*[ ]*)*)");

function picturesModeResponse(message) {
    DMessage("PicturesMode: BeginningResponse");
    if (getResponsesDisabled()) {
        DMessage("PicturesMode: EndResponse Response is Disabled");
        return false;
    }
    lockImages();
    let folderNumber;
    DMessage(message, 0);
    let path = "Images" + separator + "System" + separator + "Tumblr";
    folderNumber = 1;
    if (message.search("liked") != -1 || message.search("3") != -1) {
        path = "Images" + separator + "Liked";
        folderNumber = 3;
    }
    else if (message.search("normal") != -1 || message.search("2") != -1) {
        path = "Images" + separator + "Normal";
        folderNumber = 2;
    }
    else if (message.search("loved") != -1 || message.search("4") != -1) {
        path = "Images" + separator + "Loved";
        folderNumber = 4;
    }
    DMessage("Picturesmode going through files");
    if (message.search("untagged") != -1 || message.search("ut") != -1)
    {
        let x = "4";
        let currentFile = 0;
        let tagsFile = new getOrCreateFile(getAppPath() + path + separator + "imagetags.txt");
        let folder = tagsFile.getParentFile();
        let folderImages = listFilesInFolder(folder);
        while (x != "5" && x != "quit" && x != "exit" && x != "q" && x != "e")
        {
            let extension = "";

            let i = folderImages[currentFile].getName().lastIndexOf('.');
            if (i > 0) {
                extension = folderImages[currentFile].getName().substring(i + 1);
            }
            if (!folderImages[currentFile].isDirectory() && (extension == "png" || extension == "jpg" || extension == "gif")) {
                if (getTags(tagsFile, folderImages[currentFile].getName()) == null) {
                    let thispath = path + separator8 + folderImages[currentFile].getName();
                    getLocalTeasePicture(path, folderImages[currentFile].getName());
                    answer = getInput("Do you like this one? (Options: hate, ok, like, love, next (1,2,3,4,n))", 0);
                    //sendMessage("flag 47");
                    x = answer.getAnswer();
                    //sendMessage("flag 671");
                    while (x != "1" && x != "2" && x != "3" && x != "4" && x != "liked" && x != "normal" && x != "loved" && x != "hate" && x != "n" && x != "next" && x != "5" && x != "quit" && x != "exit" && x != "q" && x != "e") {
                        answer = getInput("Invalid answer! (Options: hate, ok, like, love, next (1,2,3,4,n))", 0);
                        x = answer.getAnswer();
                    }
                }
            }
            currentFile++;
            if (currentFile >= folderImages.length) {
                DMessage("reached end of files", 0);
                break;
            }
            //sendMessage("flag 672");
        }
        unlockImages();
        return true;
    }

    let x = "4";
    while (x != "5" && x != "quit" && x!= "exit" && x!= "q" && x != "e")
    {
        DMessage("Picmode: Searching for picture in " + folderNumber, 0);
        //THERE IS SOME BIZARRE TIMING ISSUE HERE. THIS FIXED IT. DO NOT REMOVE!
        sleep(.01);
        randomimage = getTeasePicture(folderNumber);
        let extension = "";
        DMessage("Picmode: Found Image");

        let i = randomimage.getName().lastIndexOf('.');
        if (i > 0) {
            extension = randomimage.getName().substring(i + 1);
        }
        DMessage("Picmode: extension " + extension);
        if ((extension == "png" || extension == "jpg" || extension == "gif")) {
            DMessage("path: " + getImagePath(), 0);
            answer = getInput("Do you like this one? (Options: hate, ok, like, love, next (1,2,3,4,n))", 0, false);
            x = answer.getAnswer();
            while (x != "1" && x != "2" && x != "3" && x != "4" && x != "liked" && x != "normal" && x != "loved" && x != "hate" && x != "n" && x != "next" && x != "5" && x != "quit" && x != "exit" && x != "q" && x != "e" &&
                !x.includes("tag") && x != "t" && !x.includes("t ")) {
                answer = getInput("Invalid answer! (Options: hate, ok, like, love, next (1,2,3,4,n))", 0, false);
                x = answer.getAnswer();
            }
            //sendMessage("flag 6713", 0);
        }
        //sendMessage("flag 6714",0);
    }
    DMessage("PicturesMode: EndResponse");
    unlockImages();
    return true;
}