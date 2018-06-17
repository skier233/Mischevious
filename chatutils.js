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
    CustomizedMessage(message, delay, 1, null, null, showTyping);
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
    var chatHandler = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    var answertype = Java.type("me.goddragon.teaseai.api.chat.Answer");
    var teaseAi = Java.type("me.goddragon.teaseai.api.chat.Answer");
    var answer = new answertype(0);
    CMessage(message, 0);
    //sendMessage("flag 123", 0);
    chatHandler.getHandler().setCurrentCallback(answer);
    answer.setTimeout(false);
    answer.setAnswer(null);
    answer.setStartedAt(java.lang.System.currentTimeMillis());
    var teaseAi = Java.type("me.goddragon.teaseai.TeaseAI");
    teaseAi.application.waitPossibleScripThread(answer.getMillisTimeout());
    answer.checkTimeout();
    setTempVar("responsesDisabled", false);
    DMessage("responses enabled", 0);
    if (delay == null)
    {
        sleep(chatHandler.getHandler().getMillisToPause(message) / 1000);
    }
    else
    {
        sleep(delay);
    }
    DMessage("flag 123.6");
    return answer;
}

function getTexts(message, font, fontsize){
    var teaseAi = Java.type("me.goddragon.teaseai.TeaseAI");
    if (fontsize == null)
    {
        fontsize = teaseAi.application.CHAT_TEXT_SIZE;
    }
    //sendMessage("flag ", 0);
    sleep(.01);
    //sendMessage("fs " + fontsize, 0);
    var chatHandler = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    message = replaceVocab(message);

    var localfontsize = fontsize;
    var localfont = font; 
    var italics = javafx.scene.text.FontPosture.REGULAR;
    var bold = javafx.scene.text.FontWeight.NORMAL;
    var matches = message.match(/<([ ]*[a-z]*|[0-9]*|,*|=*[ ]*)*>/ig);
    var regex = /<(?:[ ]*(?:[a-z0-9]*)[,]*[=]*[ ]*)*>/;
    var messageParts = message.split(regex);
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
        else
        {
            textVar.setFont(javafx.scene.text.Font.font(localfont, localfontsize));
        }
        if (textVar.getText() != null && !textVar.getText().isEmpty() && textVar.getText().length() > 1)
        {
            texts.push(textVar);
        }
    }
    return texts;
}

function CustomizedMessage(message, delay=0, sender=1, font, fontsize, showTyping=false){
    var texts = getTexts(message, font, fontsize);
    var chatHandler = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    var participant = chatHandler.getHandler().getCurrentDom();
    if (participant == null)
    {
        setSender(1);
    }
    sleep(.01);
    participant = chatHandler.getHandler().getCurrentDom();
    if (sender < 1 || sender > 4)
    {
        chatHandler.getHandler().addLine(texts);
        if (delay >= 0)
        {
            sleep(delay);
        }
        else
        {
            sleep(chatHandler.getHandler().getMillisToPause(message) / 1000);
        }
    }
    else
    {
        if (delay < 0)
        {
            delay = chatHandler.getHandler().getMillisToPause(message);
        }
        else
        {
            delay *= 1000;
        }
        participant.sendMessage(message, delay, texts);
        //sendMessage("after part message", 0);
        //internalSendMessage(texts, sender, showTyping);
    }
}
function internalSendMessage(texts, sender=1, showTyping=true)
{
    if (sender == null || sender < 0 || sender > 3)
    {
        sender = 1;
    }
    setSender(sender);
    var Text = javafx.scene.text.Text;
    var Color = javafx.scene.paint.Color;
    var Font = javafx.scene.text.Font;
    var allTexts = [];
    var handlertype = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    var participanttype = Java.type("me.goddragon.teaseai.api.chat.ChatParticipant");
    var handler = handlertype.getHandler();
    var participant = handler.getCurrentDom();
    var message = "";
    for (var i = 0; i < texts.length; i++)
    {
        message += texts[i].getText();
    }
    if (showTyping)
    {
        var startTyping = participanttype.class.getDeclaredMethod("startTyping", java.lang.String.class);
        startTyping.setAccessible(true);
        startTyping.invoke(participant, message);
    }
    var dateFormat = new java.text.SimpleDateFormat("hh:mm a");
    var dateText = new Text(dateFormat.format(new java.util.Date()) + " ");
    dateText.setFill(Color.DARKGRAY);
    dateText.setFont(Font.font(null, javafx.scene.text.FontWeight.MEDIUM, getVar("fontsize", 13) - 1));
    var text = new Text(participant.getName() + ": ");
    text.setFill(participant.getChatColor());
    text.setFont(Font.font(null, javafx.scene.text.FontWeight.BOLD, getVar("fontsize", 13)));
    allTexts.push(dateText);
    allTexts.push(text);
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