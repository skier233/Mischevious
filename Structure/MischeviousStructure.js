DMessage("MischeviousStructure: Beginning");
preferredSessionLength = getVar("prefSessionLength");
DMessage("Starting session");
run("Structure" + separator + "Start" + separator + "*.js");
DMessage("Starting module");
firstRun = true;
while (continueSession() || firstRun)
{
    run("Structure" + separator + "Modules" + separator + "ModuleSelector.js");
    if (randomInteger(1, 4) == 1)
    {
        run("Structure" + separator + "Modules" + separator + "ModuleSelector.js");
    }
    else
    {
        run("Structure" + separator + "Link" + separator + "*.js");
    }
    firstRun = false;
}
run("Structure" + separator + "End" + separator + "*.js");
DMessage("MischeviousStructure: End");