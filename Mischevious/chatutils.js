var debug = false;
var responsesDisabled;

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
    if (getVar("responsesDisabled", null) == null) {
        setTempVar("responsesDisabled", false);
    }
    else
    {
        getVar("responsesDisabled", false);
    }
}
function DMessage(message, delay=0)
{
    if (debug)
    {
        CustomizedMessage("<c=lightgreen b fs=16>Info: <><c=darkslategrey b fs=15>" + message, delay, -1);
    }
}
function CMessage(message, delay=-1, showTyping=true)
{
    CustomizedMessage(message, delay, 1, null, 13, showTyping);
}
function SMessage(message, delay=0, sender)
{
    CustomizedMessage(message, delay, sender);
}
function WMessage(message, delay=0)
{
    CustomizedMessage("<c=orange b fs=16>Personality Warning: <><c=darkslategrey b fs=15>" + message, delay, -1);
}
function EMessage(message, delay=0)
{
    CustomizedMessage("<c=red b fs=16>Personality Error: <><c=darkslategrey b fs=15>" + message, delay, -1);
}
function getInput(message, delay)
{
    setTempVar("responsesDisabled", true);
    DMessage("responses disabled", 0);
    if (delay == null)
    {
        var chatHandler = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
        var answer = sendInput(message);
        setTempVar("responsesDisabled", false);
        DMessage("responses enabled", 0);
        sleep(chatHandler.getHandler().getMillisToPause(message) / 1000);
        return answer;
    }
    var answer = sendInput(message, delay);
    setTempVar("responsesDisabled", false);
    DMessage("responses enabled", 0);
    return answer;
}
function CustomizedMessage(message, delay=0, sender=1, font, fontsize=13, showTyping=false){
    //sendMessage("flag 222", 0);
    var chatHandler = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    message = replaceVocab(message);

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
            textVar.setFont(javafx.scene.text.Font.font(localfont, bold, italics, localfontsize));

            //set vars back to defaults
            italics = javafx.scene.text.FontPosture.REGULAR;
            bold = javafx.scene.text.FontWeight.NORMAL;
            localfontsize = fontsize;
            localfont = font;

        }
        texts.push(textVar);
    }
    //sendMessage("flag 315", 0);
    if (sender < 0 || sender > 4)
    {
        chatHandler.getHandler().addLine(texts);
    }
    else
    {
        internalSendMessage(texts, sender, showTyping);
    }
    //sendMessage("flag 312", 0);
    if (delay >= 0)
    {
        sleep(delay);
    }
    else
    {
        //sendMessage("millistopause" + chatHandler.getHandler().getMillisToPause(message), 0);
        sleep(chatHandler.getHandler().getMillisToPause(message) / 1000);
    }
}
function internalSendMessage(texts, sender=1, showTyping=true)
{
    if (sender == null || sender < 0 || sender > 3)
    {
        sender = 1;
    }
    setSender(sender);
    //sendMessage("flag 930", 0);
    var Text = javafx.scene.text.Text;
    var Color = javafx.scene.paint.Color;
    var Font = javafx.scene.text.Font;
    var allTexts = [];
    var handlertype = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    var participanttype = Java.type("me.goddragon.teaseai.api.chat.ChatParticipant");
    var handler = handlertype.getHandler();
    var participant = handler.getCurrentDom();
    //sendMessage("flag 931", 0);
    var message = "";
    for (var i = 0; i < texts.length; i++)
    {
        message += texts[i].getText();
    }
    //sendMessage("flag 934" + participant, 0);
<<<<<<< HEAD:chatutils.js
    if (showTyping)
    {
        var startTyping = participanttype.class.getDeclaredMethod("startTyping", java.lang.String.class);
        startTyping.setAccessible(true);
        startTyping.invoke(participant, message);
    }
=======
    var startTyping = participanttype.class.getDeclaredMethod("startTyping", java.lang.String.class);
    startTyping.setAccessible(true);
    startTyping.invoke(participant, message);
>>>>>>> origin/master:Mischevious/chatutils.js
    var dateFormat = new java.text.SimpleDateFormat("hh:mm a");
    var dateText = new Text(dateFormat.format(new java.util.Date()) + " ");
    dateText.setFill(Color.DARKGRAY);
    dateText.setFont(Font.font(null, javafx.scene.text.FontWeight.MEDIUM, 12));
    var text = new Text(participant.getName() + ": ");
    text.setFill(participant.getChatColor());
    text.setFont(Font.font(null, javafx.scene.text.FontWeight.BOLD, 13));
    allTexts.push(dateText);
    allTexts.push(text);
    //sendMessage("flag 939", 0);
    for (var i = 0; i < texts.length; i++)
    {
        allTexts.push(texts[i]);
    }
    var responseHandler = Java.type("me.goddragon.teaseai.api.chat.response.ResponseHandler");
    var senderType = Java.type("me.goddragon.teaseai.api.chat.SenderType");
    var mediaHandler = Java.type("me.goddragon.teaseai.api.media.MediaHandler");
    var teaseAi = Java.type("me.goddragon.teaseai.TeaseAI");

    var response = responseHandler.getHandler().getLatestQueuedResponse();
    if (response != null)
    {
        responseHandler.getHandler().removeQueuedResponse(response);

        if (response.trigger())
        {
            return;
        }
    }
    //DMessage(/*participant.type + " " + mediaHandler.getHandler().isImagesLocked() + " " + */participant.pictureSet != null);
    if (participant.type != senderType.SUB && !mediaHandler.getHandler().isImagesLocked() && participant.pictureSet != null)
    {
        var session = teaseAi.application.getSession();
        var taggedPicture = session.getActivePersonality().getPictureSelector().getPicture(session, participant);
        if (taggedPicture != null)
        {
            mediaHandler.getHandler().showPicture(session.getActivePersonality().getPictureSelector().getPicture(session, participant).getFile());
        }
    }
    handlertype.getHandler().addLine(allTexts);
}
function getResponsesDisabled()
{
    return getVar("responsesDisabled", false);
}