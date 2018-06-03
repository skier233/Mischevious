preferredSessionLength = getVar("prefSessionLength");
setupVars();
run("Structure\\Start\\*.js");
firstRun = true;
while ((preferredSessionLength * 60 >= (getMillisPassed() / 1000)) || firstRun)
{
    run("Structure\\Modules\\*.js");
    if (randomInteger(0, 4) == 1)
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