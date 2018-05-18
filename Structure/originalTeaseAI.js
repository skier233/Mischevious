preferredSessionLength = getVar("prefSessionLength");

run("Structure\\Start\\*.js");
firstRun = true;
while ((preferredSessionLength * 60 >= (getMillisPassed() / 1000)) || firstRun)
{
    run("Structure\\Modules\\*.js");
    run("Structure\\Link\\*.js");
    firstRun = false;
}
run("Structure\\End\\*.js");

//Get the amount of milliseconds that passed since the start of the session
function getMillisPassed() {
    var startedAt = getVariable("startDate").getTimeInMillis();
    var n = new Date().getTime();
    return n - startedAt;
}