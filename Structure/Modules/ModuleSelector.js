var random = 0;
var separator = java.io.File.separator;
var flag = true;
while (flag)
{
    random = randomInteger(0, 4);
    flag = false;
    var folder = "";
    if (random == 0)
    {
        folder = "Structure" + separator + "Modules" + separator + "ShortModules" + separator;
    }
    else if (random == 1)
    {
        folder = "Structure" + separator + "Modules" + separator + "MediumModules" + separator;
    }
    else if (random == 2)
    {
        folder = "Structure" + separator + "Modules" + separator + "LongModules" + separator;
    }
    else if (random == 3)
    {
        folder = "Structure" + separator + "Modules" + separator + "Games" + separator;
    }
    else if (random == 4)
    {
        folder = "Structure" + separator + "Modules" + separator + "Fetishes" + separator;
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