var currentUrlFile;
var currentPictureUrl;
var currentPicturePath;
var teasePath;
var personalityPath;
/**
* setUpMedia method will set up this util class. Call this at the beginning of the personality.
**/
function setUpMedia() {
    var TeaseAI = Java.type("me.goddragon.teaseai.TeaseAI");
    var file = new java.io.File(TeaseAI.class.getProtectionDomain().getCodeSource().getLocation().toURI());
    //The path to the main directory
    teasePath = file.getParent();
    var file2 = TeaseAI.application.getSession().getActivePersonality().getFolder();
    //The path to your personality directory
    personalityPath = file2.getAbsolutePath();
}

/**
* getAppPath method will return the directory path to the base directory of the app
**/
function getAppPath() {
    return teasePath + "\\";
}
/**
* showTaggedImage method will show and return a random picture of the given type (2, 3 ,4 (normal, liked, loved)) with
* the tags provided as an array
**/
function showTaggedImage(imageType, imageTags) {
    //TODO: modify this function to have more checks in place and also have a delay option
    var localpath = "";
    switch (imageType) {
        case "2":
        case "normal":
            localpath = "images\\normal";
            break;
        case "3":
        case "liked":
            localpath = "images\\liked";
            break;
        case "4":
        case "loved":
            localpath = "images\\loved";
            break;
    }
    var path = teasePath + localpath + "\\imagetags.txt";
    var tagsFile = new getOrCreateFile(path);
    var fileReader = new java.io.FileReader(tagsFile);
    var bufferedReader = new java.io.BufferedReader(fileReader);
    var line = bufferedReader.readLine();

    var resultingFileNames = [];
    while (line != null) {
        var match = true;
        for (var i = 0; i < imageTags.length; i++) {
            if (line.search(new RegExp(imageTags[i], "i")) == -1) {
                match = false;
                break;
            }
        }
        if (match) {
            resultingFileNames.push(line.split(":")[0]);
        }
        line = bufferedReader.readLine();
    }
    fileReader.close();
    bufferedReader.close();
    if (resultingFileNames.length == 0) {
        return null;
    }
    var randomPicture = randomInteger(0, resultingFileNames.length - 1);
    var fileName = resultingFileNames[randomPicture];
    sendMessage("image path " + localpath + "\\" + fileName, 0)
    return showImage(localpath + "\\" + fileName);
        
}
function sortPicture(file, sortPlace=2)
{
    CMessage(file, 0);
    var myFile;
    if (file instanceof java.io.File) {
        myFile = file;
    }
    else if (file.search(teasePath) != -1) {
        myFile = new java.io.File(file);
    }
    else {
        myFile = new java.io.File(teasePath + "\\" + file);
    }
    var localpath = "";
    switch (sortPlace) {
        case 1:
        case "dislike":
            localpath = "delete";
            break;
        case 2:
        case "normal":
            localpath = "images\\normal\\";
            break;
        case 3:
        case "liked":
            localpath = "images\\liked\\";
            break;
        case 4:
        case "loved":
            localpath = "images\\loved\\";
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
        var z = myFile.getPath();
        z = "" + z;
        var x = z.split("\\");
        var fileName = x[x.length - 1];
        return moveFile(z, getAppPath() + localpath + fileName);
    }
    return false;
}
/**
* getTeasePicture method will show and return a random picture from a url file
**/
function loadUrlImages(amount, urlfilename, removed) {
    //returns mediaurl type
    var urlfile;
    if (urlfilename == null)
    {
        urlfile = createMediaURL("../../Images/System/URL Files/*.txt");
        while (!(urlfile.isUseForTease()))
        {
            urlfile = createMediaURL("../../Images/System/URL Files/*.txt");
        }
    }
    else
    {
        urlfile = createMediaURL("../../Images/System/URL Files/" + urlfilename);
    }
    if (removed)
    {
        //TODO:
        //implement manually going thru media urls and removing them
    }
    else
    {

        var consecutiveDuplicates = 0;
        //var image = showImage(urlfile);
        //var image = showImage(urlfile);
        //var image = showImage(urlfile);
        for (var i = 0; i < amount; i++)
        {
            var image = showImage(urlfile, 0);
            if (checkDuplicateFile(image))
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
    return 1;
}
/**
* getTeasePicture method will show and return a random picture from one of the category files. Use 1 for tumblr images, 2 for normal images, 3 for liked images, 4 for loved images
**/
function getTeasePicture(flag=1, time)
{
    var tumblrimages = listFilesInFolder("images\\system\\tumblr\\");
    if (tumblrimages.length < 100)
    {
        DMessage("loading images");
        //loadUrlImages(100 - tumblrimages.length, null);
    }
    var path = "images\\system\\tumblr\\";
    switch(flag)
    {
        case 1:
            path = "images\\system\\tumblr\\";
            break;
        case 2:
            path = "images\\normal\\";
            break;
        case 3:
            path = "images\\liked\\";
            break;
        case 4:
            path = "images\\loved\\";
            break;
    }
    var directoryFiles = listFilesInFolder(path);
    var jFile = directoryFiles[randomInteger(0, directoryFiles.length - 1)];

    var extension = "";
    var i = jFile.getName().lastIndexOf('.');
    if (i > 0) {
        extension = jFile.getName().substring(i+1);
    }
    var consecutiveNotPic = 0;
    while (jFile.isDirectory() || (extension != "png" && extension != "jpg" && extension != "gif"))
    {
        var r = randomInteger(0, directoryFiles.length - 1);
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
    var toReturn = showImage(jFile);
    if (time != null)
    {
        sleep(time);
    }
    return toReturn;
}

/**
* getURLTeasePicture method will show and return a random picture from a url file
**/
function getURLTeasePicture() {
    //TODO: look at this method. Might need to be removed now
    //returns mediaurl type
    const test = createMediaURL("URLs/test.tumblr.com.txt");
    //returns java file object
    //var test = showTeaseImage();
    //sendMessage("type of createmediaurl " + Object.prototype.toString.call(test));
    if (test != null) {
        currentUrlFile = test;
        currentPicturePath = null;
        var urlFile = test.getFile();
    }
    sendMessage("testmsg " + test, 0);
    //type: java.io.file
    var image = showImage(test);
    //checkDuplicateFile(image);
    sendMessage("type of showimage " + Object.prototype.toString.call(image));

    currentPictureUrl = getCurrentImageURL();
    sendMessage("testmsg2 ", 0);
    return currentPictureUrl;
}

/**
* getImageUrl method will return the url of the current displayed image
**/
function getImageUrl() {
    return currentPictureUrl;
}

function getLocalTeasePicture(path, name) {
    const image = showImage(path + "\\" + name);
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
/**
* moveFile method will move the file from its current path to a new path
**/
function moveFile(path, newPath) {
    //still needs work
    var file = new java.io.File(path);
    if (!checkDuplicateFile(file)) {
        //sendMessage("in move", 40);
        var currTagsFile = getOrCreateFile(file.getParent() + "\\imagetags.txt");
        var thisTag = deleteTag(currTagsFile, file.getName());
        //sendMessage("before move");
        file = internalmoveFile(path, newPath);
        sendMessage("File moved", 0);
        if (thisTag != null) {
            sendMessage("in retag", 0);
            var newFile = new java.io.File(newPath);
            currTagsFile = getOrCreateFile(newFile.getParent() + "\\imagetags.txt");
            sendMessage(file.getParent() + "\\imagetags.txt", 0);
            addTag(currTagsFile, file.getName(), thisTag);
        }
    }
    else {
        sendMessage("image is a duplicate. Deleting...");
        file.delete();
        return false;
    }
    return true;
}
/**
* getTags method will return a string of the tags for the provided filename
**/
function getTags(tagsFile, fileName) {
    var fileReader = new java.io.FileReader(tagsFile);
    var bufferedReader = new java.io.BufferedReader(fileReader);
    var line = bufferedReader.readLine();
    var toReturn;
    while (line != null) {
        if (line.search(fileName) != -1) {
            toReturn = line;
        }
        line = bufferedReader.readLine();
    }
    return toReturn;
}
/**
* deleteTag method will delete all tags associate to the file provided for the provided tagsfile (java file)
**/
function deleteTag(tagsFile, fileName) {
    var fileReader = new java.io.FileReader(tagsFile);
    var bufferedReader = new java.io.BufferedReader(fileReader);
    var line = bufferedReader.readLine();
    var lines = [];
    var toReturn;
    while (line != null) {
        if (line.search(fileName) == -1) {
            lines.push(line);
        }
        else {
            toReturn = line;
        }
        line = bufferedReader.readLine();
    }
    fileReader.close();
    bufferedReader.close();
    var fileWriter = new java.io.FileWriter(tagsFile);
    var bufferedWriter = new java.io.BufferedWriter(fileWriter);
    for (var i = 0; i < lines.length; i++) {
        bufferedWriter.write(lines[i]);
        bufferedWriter.newLine();
    }
    bufferedWriter.flush();
    bufferedWriter.close();
    return toReturn;
}
/**
* addTag method will add the tags provided to the filename in the provided tagsfile (java file)
**/
function addTag(tagsFile, fileName, tag) {
    var fileReader = new java.io.FileReader(tagsFile);
    var bufferedReader = new java.io.BufferedReader(fileReader);
    var line = bufferedReader.readLine();
    var lines = [];
    while (line != null) {
        if (line.search(fileName) == -1) {
            lines.push(line);
        }
        line = bufferedReader.readLine();
    }
    fileReader.close();
    bufferedReader.close();
    lines.push(tag);
    var fileWriter = new java.io.FileWriter(tagsFile);
    var bufferedWriter = new java.io.BufferedWriter(fileWriter);
    for (var i = 0; i < lines.length; i++) {
        bufferedWriter.write(lines[i]);
        bufferedWriter.newLine();
    }
    bufferedWriter.flush();
    bufferedWriter.close();
}
/**
* internalmoveFile internal method that will move a file.
* Do not call this directly unless you know what you are doing!
**/
function internalmoveFile(path, newPath) {
    if (path != newPath) {
        var myFile = new java.io.File(path);
        myFile.renameTo(new java.io.File(newPath));
        myFile.delete();
        return myFile;
    }
}
/**
* getOrCreateFile helper method will return the java file from the path or create it if it doesnt exist
**/
function getOrCreateFile(path) {
    var myFile = new java.io.File(path);
    myFile.createNewFile();
    return myFile;
}
/**
* checkDuplicateFile method will check if there are any duplicates of the current file
**/
function checkDuplicateFile(file) {
    if (file == null)
    {
        throw new Error("check duplicate called with null file");
    }
    var normalImages = listFilesInFolder("images\\normal");
    var likedImages = listFilesInFolder("images\\liked");
    var lovedImages = listFilesInFolder("images\\loved");
    //sendMessage("normal images " + normalImages);
    var myHashMap = new Map();
    var fileMd5 = calculateMD5(file);
    if (normalImages != null) {
        for (var i = 0; i < normalImages.length; i++) {
            var md5 = calculateMD5(normalImages[i]);
            if (!myHashMap.has(md5)) {
                myHashMap.set(md5, normalImages[i].getPath());
                //sendMessage("file path: " + normalImages[i].getPath() + " md5 " + md5, 0);
            }
            else {
                sendMessage("duplicate files " + normalImages[i].getPath() + " and " + myHashMap.get(md5), 0);
            }
        }
    }
    if (likedImages != null) {
        for (var i = 0; i < likedImages.length; i++) {
            var md5 = calculateMD5(likedImages[i]);
            if (!myHashMap.has(md5)) {
                myHashMap.set(md5, likedImages[i].getPath());
            }
            else {
                sendMessage("duplicate files " + likedImages[i].getPath() + " and " + myHashMap.get(md5), 0);
            }
        }
    }
    if (lovedImages != null) {
        for (var i = 0; i < lovedImages.length; i++) {
            var md5 = calculateMD5(lovedImages[i]);
            if (!myHashMap.has(md5)) {
                myHashMap.set(md5, lovedImages[i].getPath());
            }
            else {
                sendMessage("duplicate files " + lovedImages[i].getPath() + " and " + myHashMap.get(md5), 0);
            }
        }
    }
    if (myHashMap.has(fileMd5)) {
        if (myHashMap.get(fileMd5) != file.getPath()) {
            return true;
        }
    }
    return false;
}
/**
* listFilesInFolder method that will return all files in a folder. Pass in either a path or a java file.
**/
function listFilesInFolder(folder) {
    var folderFile;
    if (folder instanceof java.io.File) {
        folderFile = folder;
    }
    else if (folder.search("C:") != -1 || folder.search("Users") != -1) {
        folderFile = new java.io.File(folder);
    }
    else {
        folderFile = new java.io.File(teasePath + "\\" + folder);
    }
    return folderFile.listFiles();
}
/**
* calculateMD5 internal method that will calculate the md5checksum for a file. 
* Do not call this directly unless you know what you are doing!
**/
function calculateMD5(file) {
    var digest;
    try {
        digest = java.security.MessageDigest.getInstance("MD5");
    }
    catch (e) {
        return null;
    }
    var is;
    try {
        is = new java.io.FileInputStream(file);
    }
    catch (e) {
        return null;
    }
    var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 8192);
    var read;
    try {
        while ((read = is.read(buffer)) > 0) {
            digest.update(buffer, 0, read);
        }
        md5sum = digest.digest();
        var bigInt = new java.math.BigInteger(1, md5sum);
        var output = bigInt.toString(16);
        output = java.lang.String.format("%32s", output).replace(' ', '0');
        //sendMessage(output);
        return output;
    }
    catch (e) {
        sendMessage("unable to process file for md5");
    }
    finally {
        try {
            is.close();
        }
        catch (e) {

        }
    }
}
    //lowest inclusive to highest inclusive
function randomInteger(lowest, highest) {
    return Math.floor(Math.random() * (highest - lowest + 1)) + lowest;
}