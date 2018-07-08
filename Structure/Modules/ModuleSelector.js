var random = randomInteger(0, 4);
var flag = true;
while (flag)
{
    flag = false;
    var folder = "";
    if (random == 0)
    {
        folder = "Structure\\Modules\\ShortModules\\";
    }
    else if (random == 1)
    {
        folder = "Structure\\Modules\\MediumModules\\";
    }
    else if (random == 2)
    {
        folder = "Structure\\Modules\\LongModules\\";
    }
    else if (random == 3)
    {
        folder = "Structure\\Modules\\Games\\";
    }
    else if (random == 4)
    {
        folder = "Structure\\Modules\\Fetishes\\";
    }
    var files = listFilesInFolder(folder);
    if (files == null)
    {
        DMessage("files is null. likely a problem!");
    }
    if (files.length == 0)
    {
        flag = true;
    }
    else
    {
        run(folder + "*.js");
    }
}