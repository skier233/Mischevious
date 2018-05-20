function Stroking() {
    sendMessage("%startStroking%");
    startStroking(60);
    duration = 10;
    timeSoFar = 0;
    while (timeSoFar < duration) {
        java.lang.Thread.sleep(500);
        timeSoFar += .5;
    }
}
function andStroking() {
    sendMessage("And %startstroking%");
    startStroking(60);
    duration = 10;
    timeSoFar = 0;
    while (timeSoFar < duration) {
        java.lang.Thread.sleep(500);
        timeSoFar += .5;
    }
}

function randomInteger(lowest, highest) {
    return Math.floor(Math.random() * highest) + lowest;
}
function startEdging() {
    if (!isStroking)
    {
        startStroking();
    }
    setTempVar("edging", true);
    while (isEdging()) {
        java.lang.Thread.sleep(500);
    }
    stopStroking();
}
function isEdging() {
    return getVar("edging", false);
}
function stopEdging() {
    stopStroking();
    setTempVar("holdingedge", false);
}
function holdEdge() {
    setTempVar("edging", false);
    setTempVar("holdingedge", true);
}
function holdEdge(length) {
    timeHolding = 0;
    setTempVar("edging", false);
    setTempVar("holdingedge", true);
    while (timeHolding < length) {
        java.lang.Thread.sleep(500);
        timeHolding += .5;
    }
    sendMessage("%lettheedgefade", 0);
    stopEdging();
}