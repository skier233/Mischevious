var debug = false;
function setUpChat()
{
    if (getVar("debug", null) == null) {
        setVar("debug", false);
    }
    else
    {
        debug = getVar("debug", null);
    }
    registerVariable("debug", "Debug Mode", "Set this to true to turn on debug mode for more info.");
}
function DMessage(message, delay=0)
{
    if (debug)
    {
        CustomizedMessage("<c=lightgreen b fs=16>Info: <><c=darkslategrey b fs=15>" + message, delay);
    }
}
function CMessage(message, delay=0)
{
    CustomizedMessage(replaceVocab(message), delay, null, null, 1);
}
function SMessage(message, delay=0, sender)
{
    CustomizedMessage(message, delay, sender);
}
function WMessage(message, delay=0)
{
    CustomizedMessage("<c=orange b fs=16>Personality Warning: <><c=darkslategrey b fs=15>" + message, delay);
}
function EMessage(message, delay=0)
{
    CustomizedMessage("<c=red b fs=16>Personality Error: <><c=darkslategrey b fs=15>" + message, delay);
}
function CustomizedMessage(message, delay=0, font, fontsize=14, sender=1){
    var chatHandler = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    var localfontsize = fontsize;
    var localfont = font; 
    var italics = javafx.scene.text.FontPosture.REGULAR;
    var bold = javafx.scene.text.FontWeight.NORMAL;
    var matches = message.match(/<([ ]*[a-z]*|[0-9]*|,*|=*[ ]*)*>/ig);
    var regex = /<(?:[ ]*(?:[a-z0-9]*)[,]*[=]*[ ]*)*>/;
    var messageParts = message.split(regex);
    var objArray = Java.type("java.lang.Object[]");
    var dummyArray = new objArray(1);
    var texts = [];
    //var texts = new objArray(messageParts.length - 1);
    var firstArg;
    for (var i = 0; i < messageParts.length; i++)
    {
        if (messageParts[i].charAt(0) != ' ' | '\0')
        {
            messageParts[i] = "\0" + messageParts[i];
        }
        var textVar = new javafx.scene.text.Text(messageParts[i]);
        if (i % 2 == 1)
        {
            var j = i - 1;
            if (matches[j].search(/(^|\W)s($|\W)/i) != -1)
            {
                textVar.setStrikethrough(true);
            }
            if (matches[j].search(/(^|\W)u($|\W)/i) != -1)
            {
                textVar.setUnderline(true);
            }
            if (matches[j].search(/(^|\W)i($|\W)/i) != -1)
            {
                italics = javafx.scene.text.FontPosture.ITALIC;
            }
            if (matches[j].search(/(^|\W)b($|\W)/i) != -1)
            {
                bold = javafx.scene.text.FontWeight.BOLD;
            }
            if (matches[j].search(/(^|\W)fs *= *[0-9]+($|\W)/i) != -1)
            {
                var fsMatch = matches[j].match(/(^|\W)fs *= *[0-9]+($|\W)/i);
                localfontsize = parseInt(fsMatch[0].match(/[0-9]+/g)[0]);
            }
            if (matches[j].search(/(^|\W)f *= *[a-z]+($|\W)/i) != -1)
            {
                var fsMatch = matches[j].match(/(^|\W)f *= *[a-z]+($|\W)/i);
                localfont = fsMatch[0].match(/[a-z][a-z][a-z]+/g)[0];
            }
            if (matches[j].search(/(^|\W)c *= *[a-z]+($|\W)/i) != -1)
            {
                var fsMatch = matches[j].match(/(^|\W)c *= *[a-z]+($|\W)/i);
                var color;
                try {
                    color = javafx.scene.paint.Color.valueOf(fsMatch[0].match(/[a-z][a-z][a-z]+/g)[0].toUpperCase());
                } catch (e) {
                    WMessage("Invalid color: " + e.message, 0);
                    return;
                }
                textVar.setFill(color);
            }
            textVar.setFont(javafx.scene.text.Font.font("Verona", bold, italics, localfontsize));

            //set vars back to defaults
            italics = javafx.scene.text.FontPosture.REGULAR;
            bold = javafx.scene.text.FontWeight.NORMAL;
            localfontsize = fontsize;
            localfont = font;

        }
        texts.push(textVar);
    }
    chatHandler.getHandler().addLine(texts);
    sleep(delay);
}