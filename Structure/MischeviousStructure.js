preferredSessionLength = getVar("prefSessionLength");
DMessage("Starting session");
run("Structure\\Start\\*.js");
DMessage("Starting module");
firstRun = true;
while (continueSession() || firstRun)
{
    run("Structure\\Modules\\ModuleSelector.js");
    if (randomInteger(1, 4) == 1)
    {
        run("Structure\\Modules\\ModuleSelector.js");
    }
    else
    {
        run("Structure\\Link\\*.js");
    }
    firstRun = false;
}
run("Structure\\End\\*.js");