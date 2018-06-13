preferredSessionLength = getVar("prefSessionLength");
DMessage("Starting session");
CMessage("test message <i>abcdef<>");
run("Structure\\Start\\*.js");
DMessage("Starting module");
firstRun = true;
while (continueSession())
{
    run("Structure\\Modules\\*.js");
    if (randomInteger(1, 4) == 1)
    {
        run("Structure\\Modules\\*.js");
    }
    else
    {
        run("Structure\\Link\\*.js");
    }
    firstRun = false;
}
run("Structure\\End\\*.js");