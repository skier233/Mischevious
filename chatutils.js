let debug = false;
let responsesDisabled;
let rapidTesting = false;
let logger = Java.type("me.goddragon.teaseai.utils.TeaseLogger");

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
    addCheckBox("Debug Settings", "debug");
    if (getVar("responsesDisabled", null) == null) {
        setTempVar("responsesDisabled", false);
    }
    else
    {
        getVar("responsesDisabled", false);
    }
    if (getVar("rapidtesting", null) == null) {
        setVar("rapidtesting", false);
    }
    else
    {
        rapidTesting = getVar("rapidtesting", false);
    }
    registerVariable("rapidtesting", "Rapid Testing", "Set this to true to turn on rapid testing mode.");
    addCheckBox("Debug Settings", "rapidtesting");
    //DMessage("Finished setting up chat.");
}

function setUpChat2()
{
    rapidTesting = getVar("rapidtesting", false);
    debug = getVar("debug", null);
}
//UTILITY METHODS
function DMessage(message, delay=0)
{
    if (debug)
    {
        CustomizedMessage("<c=lightgreen b fs=16>Info: <><c=darkslategrey b fs=15>" + message, delay, -1);
    }
    else
    {
        logger.getLogger().log(java.util.logging.Level.INFO, message);
    }
}
function CMessage(message, delay=-1, showTyping=true)
{
    CustomizedMessage(message, delay, 1, null, null, showTyping);
}
function SMessage(message, delay=0, sender=-1)
{
    CustomizedMessage(message, delay, sender, null, null, true);
}
function WMessage(message, delay=0)
{
    CustomizedMessage("<c=orange b fs=16>Personality Warning: <><c=darkslategrey b fs=15>" + message, delay, -1);
    logger.getLogger().log(java.util.logging.Level.WARNING, message);
}
function EMessage(message, delay=0)
{
    CustomizedMessage("<c=red b fs=16>Personality Error: <><c=darkslategrey b fs=15>" + message, delay, -1);
    logger.getLogger().log(java.util.logging.Level.SEVERE, message);
}
function getInput(message, delay, disableResponses=true)
{
    let answertype = Java.type("me.goddragon.teaseai.api.chat.Answer");
    if (rapidTesting)
    {
        delay = 0;
        CMessage(message, 0);
        let answer = new answertype(0);
        answer.setTimeout(false);
        answer.setAnswer("yes");
        answer.setStartedAt(java.lang.System.currentTimeMillis());
        return answer;
    }
    if (disableResponses) {
        setTempVar("responsesDisabled", true);
        DMessage("responses disabled", 0);
    }
    let chatHandler = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    let answer = new answertype(0);

    CMessage(message, 0);
    //sendMessage("flag 123", 0);
    chatHandler.getHandler().setCurrentCallback(answer);
    answer.setTimeout(false);
    answer.setAnswer(null);
    answer.setStartedAt(java.lang.System.currentTimeMillis());
    let teaseAi = Java.type("me.goddragon.teaseai.TeaseAI");
    teaseAi.application.waitPossibleScripThread(answer.getMillisTimeout());
    answer.checkTimeout();
    if (disableResponses) {
        setTempVar("responsesDisabled", false);
        DMessage("responses enabled", 0);
    }
    if (delay == null)
    {
        sleep(chatHandler.getHandler().getMillisToPause(message) / 1000);
    }
    else
    {
        sleep(delay);
    }
    return answer;
}
//END UTILITY METHODS

//INTERNAL METHODS
function getTexts(message, font, fontsize){
    let teaseAi = Java.type("me.goddragon.teaseai.TeaseAI");
    if (fontsize == null)
    {
        fontsize = teaseAi.application.CHAT_TEXT_SIZE;
    }
    //sendMessage("flag ", 0);
    sleep(.01);
    //sendMessage("fs " + fontsize, 0);
    let chatHandler = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    message = replaceVocab(message);

    let localfontsize = fontsize;
    let localfont = font; 
    let italics = javafx.scene.text.FontPosture.REGULAR;
    let bold = javafx.scene.text.FontWeight.NORMAL;
    let matches = message.match(/<([ ]*[a-z]*|[0-9]*|,*|=*[ ]*)*>/ig);
    let regex = /<(?:[ ]*(?:[a-z0-9]*)[,]*[=]*[ ]*)*>/;
    let messageParts = message.split(regex);
    let texts = [];
    //let texts = new objArray(messageParts.length - 1);
    let firstArg;
    for (let i = 0; i < messageParts.length; i++)
    {
        if (messageParts[i].charAt(0) != ' ' | '\0')
        {
            messageParts[i] = "\0" + messageParts[i];
        }
        let textVar = new javafx.scene.text.Text(messageParts[i]);

        if (i % 2 == 1)
        {
            let j = i - 1;
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
                let fsMatch = matches[j].match(/(^|\W)fs *= *[0-9]+($|\W)/i);
                localfontsize = parseInt(fsMatch[0].match(/[0-9]+/g)[0]);
            }
            if (matches[j].search(/(^|\W)f *= *[a-z]+($|\W)/i) != -1)
            {
                let fsMatch = matches[j].match(/(^|\W)f *= *[a-z]+($|\W)/i);
                localfont = fsMatch[0].match(/[a-z][a-z][a-z]+/g)[0];
            }
            if (matches[j].search(/(^|\W)c *= *[a-z]+($|\W)/i) != -1)
            {
                let fsMatch = matches[j].match(/(^|\W)c *= *[a-z]+($|\W)/i);
                let color;
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
    if (rapidTesting)
    {
        delay = 0;
        showTyping = false;
    }
    let texts = getTexts(message, font, fontsize);
    let chatHandler = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    let participant = chatHandler.getHandler().getCurrentDom();

    if (participant == null)
    {
        setSender(1);
    }
    sleep(.01);
    participant = chatHandler.getHandler().getCurrentDom();
    
    if (sender >= 0 && sender <= 4)
    {
        participant = chatHandler.getHandler().getParticipantById(sender);
    }
    else
    {
        showTyping = false;
    }
    if (showTyping)
    {
        let participanttype = Java.type("me.goddragon.teaseai.api.chat.ChatParticipant");
        let startTyping = participanttype.class.getDeclaredMethod("startTyping", java.lang.String.class);
        startTyping.setAccessible(true);
        startTyping.invoke(participant, message);
    }
    if (sender < 0 || sender > 4)
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
        if (sender == 0)
        {
            setTempVar("responsesDisabled", true);
            DMessage("responses disabled", 0);
        }
        participant.sendMessage(message, delay, texts);
        if (sender = 0)
        {
            setTempVar("responsesDisabled", false);
            DMessage("responses enabled", 0);
        }
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
    let Text = javafx.scene.text.Text;
    let Color = javafx.scene.paint.Color;
    let Font = javafx.scene.text.Font;
    let allTexts = [];
    let handlertype = Java.type("me.goddragon.teaseai.api.chat.ChatHandler");
    let participanttype = Java.type("me.goddragon.teaseai.api.chat.ChatParticipant");
    let handler = handlertype.getHandler();
    let participant = handler.getCurrentDom();
    let message = "";
    for (let i = 0; i < texts.length; i++)
    {
        message += texts[i].getText();
    }
    if (showTyping)
    {
        let startTyping = participanttype.class.getDeclaredMethod("startTyping", java.lang.String.class);
        startTyping.setAccessible(true);
        startTyping.invoke(participant, message);
    }
    let dateFormat = new java.text.SimpleDateFormat("hh:mm a");
    let dateText = new Text(dateFormat.format(new java.util.Date()) + " ");
    dateText.setFill(Color.DARKGRAY);
    dateText.setFont(Font.font(null, javafx.scene.text.FontWeight.MEDIUM, getVar("fontsize", 13) - 1));
    let text = new Text(participant.getName() + ": ");
    text.setFill(participant.getChatColor());
    text.setFont(Font.font(null, javafx.scene.text.FontWeight.BOLD, getVar("fontsize", 13)));
    allTexts.push(dateText);
    allTexts.push(text);
    for (let i = 0; i < texts.length; i++)
    {
        allTexts.push(texts[i]);
    }
    let responseHandler = Java.type("me.goddragon.teaseai.api.chat.response.ResponseHandler");
    let senderType = Java.type("me.goddragon.teaseai.api.chat.SenderType");
    let mediaHandler = Java.type("me.goddragon.teaseai.api.media.MediaHandler");
    let teaseAi = Java.type("me.goddragon.teaseai.TeaseAI");

    let response = responseHandler.getHandler().getLatestQueuedResponse();
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
        let session = teaseAi.application.getSession();
        let taggedPicture = session.getActivePersonality().getPictureSelector().getPicture(session, participant);
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