preferredSessionLength = getVar("prefSessionLength");
setUpVars();
setUpMedia();
setUpChat();
//loadUrlImages(20, null, false);
//getTeasePicture();
calculateOrgasm();
calculateRuin();
WMessage("no pics found", 0);
run("Structure\\Start\\*.js");
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