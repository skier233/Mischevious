let newvalues = ["1 Edge", "2 Edges", "3 Edges", "4 Edges", "5 Edges", "7 Edges", "10 Edges", "12 Edges", "15 Edges", "20 Edges", "25 Edges", "30 Edges", "35 Edges", "40 Edges", "45 Edges", "50 Edges", "55 Edges", "60 Edges", "65 Edges", "70 Edges", "75 Edges", "80 Edges", "85 Edges", "90 Edges", "95 Edges", "100 Edges"];
let rawValues = [1, 2, 3, 4, 5, 7, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
let currentOffer = null;

function dealStart(inWindow)
{
    if (inWindow == null)
    {
        inWindow = false;
    }
    run("Structure" + separator + "Modules" + separator + "Games" + separator + "DealOrNoDeal" + separator + "DealOrNoDealCore.js");
    dealOrNoDealStart(inWindow, newvalues, rawValues);
}

function calculateOffer(chosenCaseWeights)
{
    dm("caseweights: " + chosenCaseWeights);
    let allValues = rawValues.slice();
    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    dm("allvalues: " + allValues.toString());
    for (let i = 0; i < chosenCaseWeights.length; i++)
    {
        allValues.remove(chosenCaseWeights[i]);
    }
    dm("allvalues2: " + allValues.toString());
    let currentMean = 0;
    for (let j = 0; j < allValues.length; j++)
    {
        currentMean += allValues[j];
    }
    dm("mean: " + currentMean);
    currentMean = currentMean / allValues.length;
    dm("mean2: " + currentMean);
    let currentStdev = 0;
    for (let k = 0; k < allValues.length; k++)
    {
        let temp = allValues[k] - currentMean;
        currentStdev += temp * temp;
    }
    currentStdev = currentStdev / allValues.length;
    currentStdev = Math.sqrt(currentStdev);
    dm("mean: " + currentMean);
    dm("stdev: " + currentStdev);

    //returning mean means 50% of offers above and 50% below
    //using a z-table, adding 0.26*stdev to the mean will make 60% of all values below the offer
    // adding 0.13*stdev will make 55* of all values below the offer which will be the default value
    value = Math.round(currentMean + (0.13 * currentStdev))
    currentOffer = value;
    return value + " Edges and " + Math.round(1000/value) + " tokens";
}

function dealTaken()
{
    dealSendMessage(["deal was taken: " + currentOffer + " edges"]);
    gameEnded(currentOffer);
}

function finalChoice(value)
{
    dealSendMessage(["final choice was " + value + " edges"]);
    gameEnded(value);
}

function chooseYourCase()
{
    dealSendMessage(["Please choose your case"], true);
}

function yourCaseChosen(id)
{
    caseChoosing = false;
    dealSendMessage(["Case number " + id + " will be your case. Let's hope you made the right choice *wicked grin*", "Now pick " + chooseOrder[0] + " cases"], true);
}

function caseChosen(id, caseValue)
{
    caseChoosing = false;
    let index = caseValue
    let length = rawValues.length;
    dm ("casevalue " + caseValue + " index "+ index + " length " + length + " length*0.05 " + length*0.05)
    let random = randomInteger(1, 7);
    if (index == 1)
    {
        if (random <= 2)
            dealSendMessage(["You wouldn't believe how excited I am to see that one go!"], true);
        else if (random <= 3)
            dealSendMessage(["I'm so fucking excited thats gone"], true);
        else if (random <= 5)
        {
            dealSendMessage(["I'd love to see the look on your face after losing that *wicked grin*"], true);
        }
        else
        {
            dealSendMessage(["You knew it was gonna happen... Lets be honest"], true)
        }
    }
    else if (index <= length * 0.1)
    {
        if (random <= 2)
            dealSendMessage(["I'm really glad to see that one go"], true);
        else if (random <= 4)
        {
            dealSendMessage(["Seeing anything that low get gone is absolutely perfect"]);
        }
        else if (dealSendMessage <= 7)
        {
            dealSendMessage(["And there goes another... *wicked grin*"])
        }
    }
    else if(index <= length * 0.2)
    {
        if (random <= 2)
            dealSendMessage(["I bet your not so happy about losing that one..."], true);
        else if (random <= 4)
            dealSendMessage(["Thats great news to see that one go!"], true);
        else if (random <= 6)
            dealSendMessage(["Is it painful to lose that one?"], true)
        else
            dealSendMessage(["I'm pretty happy to see that go"], true);
    }
    else if(index <= length * 0.35)
    {
        if (random <= 1)
            dealSendMessage(["I'll take that"], true);
        else if (random <= 3)
            dealSendMessage(["That one was too low anyway"], true);
        else if (random <= 5)
            dealSendMessage(["I bet you aren't super pleased to see that one go."], true);
        else if (random <= 6)
            dealSendMessage(["Thats a pretty big win for you I guess. We'll see who's winning later *grin*"], true);
        else
            dealSendMessage(["I can't say I was dissapointed to see that one go"], true);
    }
    else if (index <= length * 0.5)
    {
        if (random <= 1)
            dealSendMessage(["At least its on the left column"], true);
        else if (random <= 3)
            dealSendMessage(["That one is lower than I'm going for"], true);
        else if (random <= 5)
            dealSendMessage(["You might feel pleased now. But you might miss that one later *wicked grin*"], true);
        else if (random <= 6)
            dealSendMessage(["I'm not too upset. I have my eyes set on higher numbers..."], true);
        else
            dealSendMessage(["At least it isn't an actual high number"], true);
    }
    else if (index <= length * 0.75)
    {
        if (random <= 1)
            dealSendMessage(["That's not what I was hoping for exactly..."], true);
        else if (random <= 2)
            dealSendMessage(["Not gonna lie, It stings a bit too see that one go."], true);
        else if (random <= 3)
            dealSendMessage(["I bet you're feeling happy about that."], true);
        else if (random <= 4)
            dealSendMessage(["Well it could've went better"], true);
        else if (random <= 5)
            dealSendMessage(["I hope you miss this one..."], true);
        else if (random <= 6)
            dealSendMessage(["This one would've been so fun though. You sure you don't wanna do it anyway?"], true);
        else
            dealSendMessage(["I think we need to look for some lower numbers instead"], true);
    }
    else if (index <= length * 0.95)
    {
        if (random <= 1)
            dealSendMessage(["I think I might have shed a tear over losing that one"], true);
        else if (random <= 2)
            dealSendMessage(["That one hurt to lose"], true);
        else if (random <= 3)
            dealSendMessage(["Dont you worry, I'll make sure you get those in eventually *wicked grin*"], true);
        else if (random <= 4)
            dealSendMessage(["Not what I was thinking of exactly"], true);
        else if (random <= 5)
            dealSendMessage(["I would've been really happy with this one"], true);
        else if (random <= 6)
            dealSendMessage(["You might want to wipe that smile off your face..."], true);
        else
            dealSendMessage(["Yikes! That's painful"], true);
    }
    else if (index <= length * 0.99)
    {
        if (random <= 2)
            dealSendMessage(["I was really hoping to keep that one"], true);
        else if (random <= 4)
            dealSendMessage(["Well that really sucks"], true);
        else
            dealSendMessage(["I'm feeling a little sad now"], true);
    }
    else
    {
        if (random <= 3)
            dealSendMessage(["I was hoping that one would stay so fucking bad."], true)
        else
            dealSendMessage(["I'm very disappointed about that"], true);
    }
    //dealSendMessage("case chosen: " + id, true);
}

function gameEnded(numEdges)
{
    dealSendMessage(["Let's head back to the chat"]);
    let sleeper = Java.extend(javafx.concurrent.Task,{
        call: function()
        {
            try
            {
                java.lang.Thread.sleep(4000);
            }
            catch (e)
            {

            }
        }
    });
    let RunnableClass2 = Java.extend(RunnableClass, {
        run: function () {
            gameEndedHelper(numEdges);
        }
    });
    let gameEndedTimer = Java.extend(javafx.event.EventHandler,{
        handle: function()
        {
            endGame();
            scriptRunnable = new RunnableClass2();
            breakScriptLoop = true;
            notifyScript();
        }
    });
    sleeper = new sleeper();
    sleeper.setOnSucceeded(new gameEndedTimer());
    new java.lang.Thread(sleeper).start();
}

function gameEndedHelper(numEdges)
{
    sendInput("Did you enjoy the game?");
    sm("Oh wait I just remembered... I don't care");
    sm("First things first, let me give you your tokens");
    //give tokens

    sm("There you go");
    sm("%subname% you still owe me something though...");
    sm("or did you think I forgot");
    sm("You owe me " + numEdges + " edges");
    let answer = sendInput("Do you want to do them with me now or on your own later?")
    while (!answer.isLike("now", "you", "here") && !answer.isLike("own", "alone", "later", "myself"))
    {
        answer = sendInput("With me or on your own %subname%?");
    }
    if (answer.isLike("now", "you", "here"))
    {
        sm("I was hoping you would say that *grin*");
        if (numEdges > 5)
        {
            sm("Ready for the first one of many?");
            startEdging();
            sm("%stopstrokingedge%")
            sm("%lettheedgefade%");
        }
        else
        {
            startEdging();
            sm("%stopstrokingedge%");
            sm("%lettheedgefade%");
        }
        for (let counter = 1; counter < numEdges; counter++)
        {
            startEdging();
            sm("%stopstrokingedge%")
            sm("%lettheedgefade%");
            if (((numEdges - 1) - counter) % 10 == 0 && counter != (numEdges - 1))
            {
                sm(((numEdges - 1) - counter) + " more edges to go...");
            }
        }
    }
    else
    {
        sm("Ok, but you better not forget to do them...");
        if (numEdges > 10)
        {
            sm("Or maybe I'll have you triple it *wicked grin*");
        }
        else
        {
            sm("Or maybe I'lk make you do 10 times the amount *wicked grin*");
        }
    }
}