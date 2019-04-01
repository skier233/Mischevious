DMessage("MediaUtils: Beginning");
let currentUrlFile;
let currentPictureUrl;
let currentPicturePath;
let teasePath;
let personalityPath;

/**
* setUpMedia method will set up this util class. Call this at the beginning of the personality.
**/
function setUpMedia() {
    let TeaseAI = Java.type("me.goddragon.teaseai.TeaseAI");
    let fileUtils = Java.type("me.goddragon.teaseai.utils.FileUtils");
    teasePath = fileUtils.getTAJPath();
    DMessage(teasePath);
    let file2 = TeaseAI.application.getSession().getActivePersonality().getFolder();
    //The path to your personality directory
    personalityPath = file2.getAbsolutePath();
    setVar("stopdownloading", false);
}

/**
* getAppPath method will return the directory path to the base directory of the app
**/
function getAppPath() {
    return teasePath + separator;
}
/**
* showTaggedImage method will show and return a random picture of the given type (2, 3 ,4 (normal, liked, loved)) with
* the tags provided as an array
**/
function showTaggedImage(imageType, imageTags, delay) {
    if (rapidTesting)
    {
        delay = 0;
    }
    //TODO add functionality for what if there isnt an image with all of the tags but there is one with all but one...?
    let localpath = "";
    let imageInt;
    switch (imageType) {
        case 2:
        case "Normal":
            imageInt = 2;
            localpath = "Images" + separator + "Normal";
            break;
        case 3:
        case "Liked":
            imageInt = 3;
            localpath = "Images" + separator + "Liked";
            break;
        case 4:
        case "Loved":
            imageInt = 4;
            localpath = "Images" + separator + "Loved";
            break;
        default:
            localpath = "Images" + separator + "Normal";
    }
    let path = teasePath + separator + localpath;
    let pictureHandler = Java.type("me.goddragon.teaseai.api.picture.PictureHandler");
    DMessage("path " + path);
    DMessage("imageTags " + imageTags);
    let matchingImages = pictureHandler.getHandler().getTaggedPicturesExact(new java.io.File(path), imageTags);
    DMessage("matchingImages " + imageInt + " " + matchingImages);
    //DMessage(matchingImages.toString());
    while(matchingImages == null)
    {
        if (imageInt <= 2)
        {
            return null;
        }
        else
        {
            imageInt--;
            switch (imageInt) {
                case 2:
                    localpath = "Images" + separator + "Normal";
                    break;
                case 3:
                    localpath = "Images" + separator + "Liked";
                    break;
                case 4:
                    localpath = "Images" + separator + "Loved";
                    break;
                default:
                    localpath = "Images" + separator + "Normal";
            }
            path = teasePath + separator + localpath;
            matchingImages = pictureHandler.getHandler().getTaggedPicturesExact(new java.io.File(path), imageTags);
            DMessage("matchingImages " + imageInt + " " + matchingImages);
        }
    }
    let randomImage = matchingImages.get(randomInteger(0, matchingImages.length - 1));

    let toReturn = showImage(randomImage.getFile().getPath());
    if (delay != null)
    {
        sleep(delay);
    }
    return toReturn;
        
}
function sortPicture(file, sortPlace=2)
    {
        let taggedPicture = Java.type("me.goddragon.teaseai.api.picture.TaggedPicture");
        DMessage("Moving file" + file, 0);
        let myFile;
        let taggedFile;
        if (file instanceof java.io.File) {
            myFile = file;
            taggedFile = new taggedPicture(myFile);
        }
        else if (file.search(teasePath) != -1) {
            myFile = new java.io.File(file);
            taggedFile = new taggedPicture(myFile);
        }
        else if (file instanceof taggedPicture)
        {
            taggedFile = file;
        }
        else {
            myFile = new java.io.File(teasePath + separator + file);
            taggedFile = new taggedPicture(myFile);
        }
        let localpath = "";
        switch (sortPlace) {
            case 1:
            case "dislike":
                localpath = "delete";
                break;
            case 2:
            case "Normal":
                localpath = "Images" + separator + "Normal" + separator;
                break;
            case 3:
            case "Liked":
                localpath = "Images" + separator + "Liked" + separator;
                break;
            case 4:
            case "Loved":
                localpath = "Images" + separator + "Loved" + separator;
                break;
            default:
                localpath = null;
        }
        if (localpath == null)
        {
            EMessage("sortPicture called with invalid args!");
        }
        else if (localpath == "delete")
        {
            myFile.delete();
            return true;
        }
        else
        {
            getOrCreateFolder((getAppPath() + localpath));
            return taggedFile.move(getAppPath() + localpath + myFile.getName());
        }
        return false;
    }

    function downloadUrlContent(thisurl)
    {
        let fileUtils = Java.type("me.goddragon.teaseai.utils.FileUtils");
        fileUtils.disableSslVerification();
        let taggedPicture = Java.type("me.goddragon.teaseai.api.picture.TaggedPicture");
        var urlFiles = listFilesInFolder("Images" + separator + "System" + separator + "URL files", true);
        for (var i = 0; i < urlFiles.length; i++)
        {
            if (urlFiles[i].getName().contains(thisurl))
            {
                var urlFile2 = urlFiles[i];
                if (!urlFile2.getName().contains(".com.txt"))
                {
                    continue;
                }
                var thisPath = ".." + separator + ".." + separator + "Images" + separator + "System" + separator + "URL files" + separator + urlFile2.getName();
                urlFile2 = createMediaURL(thisPath);
                let mediaUrls = urlFile2.getMediaURLs();
                var fileLength = listFilesInFolder("Images" + separator + urlFiles[i].getName().replaceAll(".tumblr.com.txt", ""), true);
                if (fileLength != null && fileLength.length >= (mediaUrls.length * 0.90))
                {
                    SMessage("<c=chocolate b>" + urlFiles[i].getName() + " is already downloaded.");
                    continue;
                }
                SMessage("<c=green b>Downloading Images from:" + thisPath);
                var previousPercent = -1;
                for (let j = 0; j < mediaUrls.length; j++)
                {
                    var percent = (j * 100.0) / (mediaUrls.length * 1.0);
                    if (getVar("stopdownloading", false))
                    {
                        setVar("stopdownloading", false);
                        return;
                    }
                    if ((Math.round(percent) % 5 == 0) && (Math.round(percent) != previousPercent))
                    {
                        SMessage("<c=indianred b>" + Math.round(percent) + "% of " + urlFiles[i].getName() + "Downloaded: " + (j+1) + " of " + (mediaUrls.length + 1));
                        previousPercent = Math.round(percent);
                    }
                    let image = getFileFromUrl(mediaUrls[j], urlFiles[i].getName().replaceAll(".tumblr.com.txt", ""));
                }
                SMessage("<c=indianred b>100% of " + urlFiles[i].getName() + "Downloaded");
            }
        }
    }

    function downloadAllUrlContent()
    {
        DMessage("in download");
        let taggedPicture = Java.type("me.goddragon.teaseai.api.picture.TaggedPicture");
        let fileUtils = Java.type("me.goddragon.teaseai.utils.FileUtils");
        fileUtils.disableSslVerification();
        var urlFiles = listFilesInFolder("Images" + separator + "System" + separator + "URL files", true);
        DMessage("in download all content2" + urlFiles.length);
        for (var i = 0; i < urlFiles.length; i++)
        {
            var urlFile2 = urlFiles[i];
            if (!urlFile2.getName().contains(".com.txt"))
            {
                continue;
            }
            var thisPath = ".." + separator + ".." + separator + "Images" + separator + "System" + separator + "URL files" + separator + urlFile2.getName();
            urlFile2 = createMediaURL(thisPath);
            let mediaUrls = urlFile2.getMediaURLs();
            var fileLength = listFilesInFolder("Images" + separator + urlFiles[i].getName().replaceAll(".tumblr.com.txt", ""), true);
            if (fileLength != null && fileLength.length >= (mediaUrls.length * 0.90))
            {
                SMessage("<c=chocolate b>" + urlFiles[i].getName() + " is already downloaded.");
                if (getVar("stopdownloading", false))
                {
                    setVar("stopdownloading", false);
                    return;
                }
                continue;
            }
            SMessage("<c=green b>Downloading Images from:" + thisPath);
            var previousPercent = -1;
            for (let j = 0; j < mediaUrls.length; j++)
            {
                var percent = (j * 100.0) / (mediaUrls.length * 1.0);
                if ((Math.round(percent) % 5 == 0) && (Math.round(percent) != previousPercent))
                {
                    if (getVar("stopdownloading", false))
                    {
                        setVar("stopdownloading", false);
                        return;
                    }
                    SMessage("<c=indianred b>" + Math.round(percent) + "% of " + urlFiles[i].getName() + "Downloaded: " + (j+1) + " of " + (mediaUrls.length + 1));
                    previousPercent = Math.round(percent);
                }
                let image = getFileFromUrl(mediaUrls[j], urlFiles[i].getName().replaceAll(".tumblr.com.txt", ""));
            }
            SMessage("<c=indianred b>100% of " + urlFiles[i].getName() + "Downloaded");
        }
    }

    function loadUrlImages(amount, urlfilename, removed) {
        //returns mediaurl type
        DMessage("loadUrlImages: Loading files from url");
        let taggedPicture = Java.type("me.goddragon.teaseai.api.picture.TaggedPicture");
        let urlfile;
        if (urlfilename == null)
        {
            DMessage("loadUrlImages: debug 1");
            var counter = 0;
            urlfile = createMediaURL("../../Images/System/URL files/*.txt");
            while (!(urlfile.isUseForTease()) && counter < 30)
            {
                urlfile = createMediaURL("../../Images/System/URL files/*.txt");
                counter++;
            }
        }
        else
        {
            urlfile = createMediaURL("../../Images/System/URL files/" + urlfilename);
        }
        if (removed)
        {
            DMessage("currentUrlFile: " + urlfile);
            let mediaUrls = urlfile.getMediaURLs();
            let deleteFile = false;
            let duplicates = 0;
            if (mediaUrls.length < amount)
            {
                amount = mediaUrls.length;
                deleteFile = true;
            }
            for (let i = 0; i < amount; i++)
            {
                let myfile = getFileFromUrl(mediaUrls[i]);
                let taggedFile = new taggedPicture(myfile);
                if (taggedFile.isDuplicate())
                {
                    myfile.delete();
                    i--;
                    duplicates++;
                }
            }
            mediaUrls.subList(0, (amount + duplicates + 1)).clear();
            urlfile.saveToFile();
        }
        else
        {
            let consecutiveDuplicates = 0;
            let mediaUrls = urlfile.getMediaURLs();
            for (let i = 0; i < amount; i++)
            {
                let image = getFileFromUrl(mediaUrls[randomInteger(0, mediaUrls.length - 1)]);
                let taggedFile = new taggedPicture(image);
                if (taggedFile.isDuplicate())
                {
                    consecutiveDuplicates++;
                    image.delete();
                    i--;
                }
                else
                {
                    consecutiveDuplicates = 0;
                }
                if (consecutiveDuplicates >= 30)
                {
                    WMessage("This file does not have enough images for the amount requested", 0);
                    break;
                }
            }
        }
        DMessage("loadUrlImages: End");
        return 1;
    }
    /**
    * getTeasePicture method will show and return a random picture from one of the category files. Use 1 for tumblr images, 2 for normal images, 3 for liked images, 4 for loved images
    **/
    function getTeasePicture(flag=1, time)
        {
            DMessage("GetTeasePicture: Beginning");
            let tumblrimages = listFilesInFolder("Images" + separator + "System" + separator + "Downloaded Images" + separator, true);
            if (tumblrimages.length < 20)
            {
                DMessage("GetTeasePicture: loading images");
                loadUrlImages(100 - tumblrimages.length, null, true);
                DMessage("GetTeasePicture: Finished loading images");
            }
            let path = "Images" + separator + "System" + separator + "Downloaded Images" + separator;
            switch(flag)
            {
                case 1:
                    path = "Images" + separator + "System" + separator + "Downloaded Images" + separator;
                    break;
                case "Normal":
                case 2:
                    path = "Images" + separator + "Normal" + separator;
                    break;
                case "Liked":
                case 3:
                    path = "Images" + separator + "Liked" + separator;
                    break;
                case "Loved":
                case 4:
                    path = "Images" + separator + "Loved" + separator;
                    break;
            }
            DMessage("GetTeasePicture: Debug 2");
            let directoryFiles = listFilesInFolder(path, true);
            let jFile = directoryFiles[randomInteger(0, directoryFiles.length - 1)];

            let extension = "";
            let i = jFile.getName().lastIndexOf('.');
            if (i > 0) {
                extension = jFile.getName().substring(i+1);
            }
            let consecutiveNotPic = 0;
            while (jFile.isDirectory() || (extension != "png" && extension != "jpg" && extension != "gif"))
            {
                let r = randomInteger(0, directoryFiles.length - 1);
                jFile = directoryFiles[r];
                consecutiveNotPic++;
                if (consecutiveNotPic >= 30)
                {
                    WMessage(path + " directory is empty!");
                    return null;
                }
                extension = "";
                i = jFile.getName().lastIndexOf('.');
                if (i > 0) {
                    extension = jFile.getName().substring(i+1);
                }
            }
            currentPicturePath = jFile.getPath().replace(teasePath, "");
            let toReturn = showImage(jFile);
            if (time != null)
            {
                sleep(time);
            }
            DMessage("GetTeasePicture: End");
            return toReturn;
        }

        /**
        * getImageUrl method will return the url of the current displayed image
        **/
        function getImageUrl() {
            return currentPictureUrl;
        }

        function getLocalTeasePicture(path, name) {
            const image = showImage(path + separator + name);
            //showImage("Images/Liked/tumblr_oah6x4ffKZ1v0oj9oo1_1280.jpg");
            //sendMessage("testmsg " + image, 0);
            if (image != null) {
                currentPicturePath = image;
                currentPictureUrl = null;
                currentUrlFile = null;
            }
            return image;
        }
        /**
        * getImagePath method will return the path of the displayed image
        **/
        function getImagePath() {
            return currentPicturePath;
        }
        /**
        * getCurrentUrlFile method will return the file the current url is displayed from
        **/
        function getCurrentUrlFile() {
            return currentUrlFile;
        }

        function getOrCreateFolder(path)
        {
            let myFile = new java.io.File(path);
            if (!myFile.exists())
            {
                myFile.mkdirs();
            }
            return myFile;
        }
        /**
        * getOrCreateFile helper method will return the java file from the path or create it if it doesnt exist
        **/
        function getOrCreateFile(path) {
            let myFile = new java.io.File(path);
            new java.io.File(myFile.getParent()).mkdirs();
            myFile.createNewFile();
            return myFile;
        }

        /**
        * listFilesInFolder method that will return all files in a folder. Pass in either a path or a java file.
        **/
        function listFilesInFolder(folder,flag=false) {
            let folderFile;
            if (folder instanceof java.io.File) {
                folderFile = folder;
            }
            else if (folder.search("C:") != -1 || folder.search("Users") != -1) {
                folderFile = new java.io.File(folder);
            }
            else {
                if (flag)
                {
                    folderFile = new java.io.File(teasePath + separator + folder);
                }
                else
                {
                    folderFile = new java.io.File(personalityPath + separator + folder);
                }
            }
            if (!folderFile.exists())
            {
                folderFile = new java.io.File(teasePath + separator + folder);
                if (!folderFile.exists())
                {
                    WMessage("File does not exist " + folderFile.getPath());
                    return;
                }
            }
            if (!folderFile.isDirectory())
            {
                EMessage("File is not a directory " + folderFile.getPath());
            }
            return folderFile.listFiles();
        }
            function getFileFromUrl(url, path2)
            {
                let split = url.split("/");
                let path = split[split.length - 1];
                if (path2 != null)
                {
                    getOrCreateFolder(teasePath + separator + "Images" + separator + path2);
                    path = teasePath + separator + "Images" + separator + path2 + separator + path;
                }
                else
                {
                    path = teasePath + separator + "Images" + separator + "System" + separator + "Downloaded Images" + separator + path;
                }
                let file = new java.io.File(path);
                if (file.exists())
                {
                    return file;
                }
                try{
                    let inputstream = new java.io.BufferedInputStream(new java.net.URL(url).openStream());
                    let out = new java.io.ByteArrayOutputStream();
                    let buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
                    let n;
                    while (-1 != (n = inputstream.read(buf)))
                    {
                        out.write(buf, 0 , n);
                    }
                    out.close();
                    inputstream.close();
                    let response  = out.toByteArray();
                    let fos = new java.io.FileOutputStream(path);
                    fos.write(response);
                    fos.close();

                }catch(e)
                {
                    EMessage(e.message);
                    return null
                }
                if (file.exists())
                {
                    return file;
                }
                return null;
            }

            //lowest inclusive to highest inclusive
            function randomInteger(lowest, highest) {
                return Math.floor(Math.random() * (highest - lowest + 1)) + lowest;
            }
            DMessage("MediaUtils: End");