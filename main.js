let separator = java.io.File.separator;
run("chatutils.js");
DMessage("Setting up chat");
setUpChat();
DMessage("main: Beginning");
run("mediautils.js");
DMessage("Setting up media");
setUpMedia();
run("personalityutils.js");
DMessage("Setting up personality");
setUpVars();
run("Structure" + separator + "MischeviousStructure.js");
DMessage("main: End");