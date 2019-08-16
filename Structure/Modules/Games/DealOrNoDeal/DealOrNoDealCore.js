let values = null;
let chosenCases = [];
let caseChoosing = false;
let chooseOrder = [6, 6, 6, 4, 2]
let chooseOrderToken = -1;
let leftToChoose = 1;
let chosenCase = -1
let shuffledBriefcases = null;
let Window = null;
let textFlow = null;
let ScrollPane = null;
let choiceMade = false;
let testWindow = null;
let breakScriptLoop = false;
let scriptRunnable = null;
let RunnableClass = Java.type("java.lang.Runnable");
let dealTakenValue = false;

function dealOrNoDealStart(inWindow, newvalues, rawValues)
{
    values = newvalues;
    Window = inWindow;
    currentDeal = "";
    shuffledBriefcases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    shuffledBriefcases = shuffle(shuffledBriefcases);
    chosenCase = -1;
    caseChoosing = false;
    chooseOrderToken = -1;
    leftToChoose = 1;
    chosenCases = [];
    let FileUtils = Java.type("me.goddragon.teaseai.utils.FileUtils");
    let Scene = null;
    let RunnableClass2 = Java.extend(RunnableClass, {
        run: function () {
            let FXMLLoader = javafx.fxml.FXMLLoader;
            let loader = new FXMLLoader(new java.net.URL("file:///" + FileUtils.getTAJPath() + "/Personalities/Mischevious/Structure/Modules/Games/DealOrNoDeal/DealOrNoDeal.fxml"));
            if (inWindow)
            {
                let mainGui = Java.type("me.goddragon.teaseai.gui.main.MainGuiController");
                mainGui = mainGui.getController();
                Scene = mainGui.getMainScenes().get(0);
                let guiAnchor = mainGui.getGuiAnchorPane();
                let pane = loader.load();
                javafx.scene.layout.AnchorPane.setTopAnchor(pane, 0);
                javafx.scene.layout.AnchorPane.setLeftAnchor(pane, 0);
                javafx.scene.layout.AnchorPane.setRightAnchor(pane, 0);
                javafx.scene.layout.AnchorPane.setBottomAnchor(pane, 0);
            }
            else
            {
                let Stage = javafx.stage.Stage;
                testWindow = new Stage();
                testWindow.setResizable(false);
                testWindow.setTitle("Deal or No Deal");
                Scene = new javafx.scene.Scene(loader.load(), 1280, 650);
                testWindow.setScene(Scene);
                testWindow.show();
                let TextFlow = Scene.lookup("#dealTextFlow")
                ScrollPane = Scene.lookup("#dealScrollPane");
                ScrollPane.setContent(TextFlow);
                textFlow = TextFlow;

            }

            for (let i = 0; i < values.length; i++) {
                Scene.lookup("#sidelabel" + (i + 1)).setText(values[i]);
            }
            for (let j = 1; j <= 26; j++) {
                let customEventHandler = Java.extend(javafx.event.EventHandler, {
                    handle: function(mouseEvent)
                    {
                        if (caseChoosing)
                        {
                            let stackPane = mouseEvent.getPickResult().getIntersectedNode();
                            while (!(stackPane instanceof javafx.scene.layout.StackPane)) {
                                stackPane = stackPane.getParent();
                            }
                            let thisId = Number(stackPane.getId().replace("briefcase", ""));
                            if (chosenCases.indexOf(thisId) == -1 && chosenCase != thisId) {
                                stackPane.setOpacity(0.30);
                                chooseCase(thisId, Scene);
                            }
                            else {
                                dm(thisId + "already chosen");
                            }
                        }
                    }
                });
                Scene.lookup("#briefcase" + j).addEventFilter(javafx.scene.input.MouseEvent.MOUSE_PRESSED, new customEventHandler());
            }
            chooseYourCase();
        }
    });
    let runnable = new RunnableClass2();
    runGui(runnable);

    outerLoop: while(true) {
        wait(10);
        if(scriptRunnable != null) {
            scriptRunnable.run();
            scriptRunnable = null;
        }
        if (breakScriptLoop)
        {
            break;
        }
    }
}

function endGame()
{
    testWindow.close();
}

function dealSendMessage(messages, caseChoosingValue)
{
    if (!Window)
    {
        dm(messages[0]);
        let RunnableClass2 = Java.extend(RunnableClass, {
            run: function () {
                for (var i = 0; i < messages.length; i++){
                    let message = messages[i]
                    let dateFormat = new java.text.SimpleDateFormat("hh:mm a");
                    let dateText = new javafx.scene.text.Text(dateFormat.format(new java.util.Date()) + " ");
                    dateText.setFont(javafx.scene.text.Font.font(null, javafx.scene.text.FontWeight.MEDIUM, Java.type("me.goddragon.teaseai.TeaseAI").application.CHAT_TEXT_SIZE.getDouble()));
                    let dommeParticipant = Java.type("me.goddragon.teaseai.api.chat.ChatHandler").getHandler().getParticipants().toArray()[1];
                    let millisToWait = dommeParticipant.getTypeSpeed().getTypeDuration(message);
                    if (millisToWait > 0) {
                        let text2 = new javafx.scene.text.Text(dommeParticipant.toString() + " is typing...");
                        text2.setFill(javafx.scene.paint.Color.AQUA);
                        text2.setFont(javafx.scene.text.Font.font(null, javafx.scene.text.FontWeight.BOLD, Java.type("me.goddragon.teaseai.TeaseAI").application.CHAT_TEXT_SIZE.getDouble() + 2));
                        let RunnableClass3 = Java.extend(RunnableClass, {
                            run: function () {
                                textFlow.getChildren().add(text2);
                                textFlow.layout();
                                ScrollPane.layout();
                                ScrollPane.setVvalue(1.0);
                            }
                        });
                        runGui(new RunnableClass3());
                        Java.type("me.goddragon.teaseai.TeaseAI").application.sleepPossibleScripThread(millisToWait, true);
                        let RunnableClass4 = Java.extend(RunnableClass, {
                            run: function () {
                                textFlow.getChildren().remove(text2);
                            }
                        });
                        runGui(new RunnableClass4());
                    }
                    let nameText = new javafx.scene.text.Text(dommeParticipant.toString() + ": ");
                    nameText.setFill(dommeParticipant.getNameColor());
                    nameText.setFont(javafx.scene.text.Font.font(null, javafx.scene.text.FontWeight.BOLD, Java.type("me.goddragon.teaseai.TeaseAI").application.CHAT_TEXT_SIZE.getDouble() + 1));
                    let RunnableClass5 = Java.extend(RunnableClass, {
                        run: function () {
                            textFlow.getChildren().addAll(dateText, nameText, new javafx.scene.text.Text(message + "\n"));
                            textFlow.layout();
                            ScrollPane.layout();
                            ScrollPane.setVvalue(1.0);
                        }
                    });
                    runGui(new RunnableClass5());
                    sleep(1);
                }
                if (caseChoosingValue != null)
                    caseChoosing = caseChoosingValue;
            }
        });
        scriptRunnable = new RunnableClass2();
        notifyScript();
    }
}

function chooseCase(caseId, Scene)
{
    let chooseMessage = true;
    let id = caseId;
    leftToChoose--;
    if (chooseOrderToken == -1)
    {
        chosenCase = id;
        yourCaseChosen(id);
        chooseMessage = false;
        caseChoosing = false;
        IncrementChooseOrder(Scene);
    }
    else {
        chosenCases.push(id);
        var caseOpeningPane = Scene.lookup("#caseOpeningPane");
        caseOpeningPane.setVisible(true);
        Scene.lookup("#caseRevealNumber").setText("" + id);
        let caseValueNumber = shuffledBriefcases[id - 1] + 1;
        Scene.lookup("#caseRevealValue").setText(values[caseValueNumber - 1]);
        let fadeTransition = new javafx.animation.FadeTransition(javafx.util.Duration.millis(2000), Scene.lookup("#caseReveal"));
        fadeTransition.setFromValue(1.0);
        fadeTransition.setToValue(0.0);
        let sleeper = Java.extend(javafx.concurrent.Task,{
            call: function()
            {
                try
                {
                    java.lang.Thread.sleep(2000);
                }
                catch (e)
                {

                }
            }
        });
        sleeper = new sleeper();
        let chooseCasePart2Event = Java.extend(javafx.event.EventHandler,{
            handle: function()
            {
                if (chooseMessage)
                {
                    caseChosen(id, caseValueNumber);
                }
                chooseCasePart2(caseOpeningPane, Scene, caseValueNumber);
            }
        });
        sleeper.setOnSucceeded(new chooseCasePart2Event());
        let callSleeper = Java.extend(javafx.event.EventHandler,{
            handle: function()
            {
                new java.lang.Thread(sleeper).start();
            }
        });
        fadeTransition.setOnFinished(new callSleeper());
        fadeTransition.play();
        /*let TimerTask = Java.extend(java.util.TimerTask, {
            run: function () {
                caseOpeningPane.setVisible(false);
                Scene.lookup("#sidelabel" + caseValueNumber).getParent().setOpacity(0.3);
                if (leftToChoose == 0) {
                    caseChoosing = false;
                    IncrementChooseOrder(Scene);
                }
            }
        });
        //new java.util.Timer().schedule(new TimerTask(), 3000);*/

    }
}

function chooseCasePart2(caseOpeningPane, Scene, caseValueNumber)
{
    caseOpeningPane.setVisible(false);
    Scene.lookup("#sidelabel" + caseValueNumber).getParent().setOpacity(0.3);
    if (leftToChoose == 0) {
        caseChoosing = false;
        IncrementChooseOrder(Scene);
    }
}

function IncrementChooseOrder(Scene)
{
    dm("0.2");
    chooseOrderToken++;
    if (chooseOrderToken < chooseOrder.length)
    {
        dm("next round of case choosing");
        if (chooseOrderToken != 0)
        {
            let dealPane = Scene.lookup("#dealStackPane");
            let chosenCaseWeights = [];
            for (let i = 0; i < chosenCases.length; i++)
            {
                chosenCaseWeights.push(rawValues[shuffledBriefcases[chosenCases[i]-1]])
            }
            Scene.lookup("#offerText").setText(calculateOffer(chosenCaseWeights));
            Scene.lookup("#noDealButton").onAction = function() noDeal(Scene);
            Scene.lookup("#dealButton").onAction = function() deal();
            dealPane.setVisible(true);
        }
        leftToChoose = chooseOrder[chooseOrderToken];
    }
    else
    {
        finalChoice2(Scene);
    }
}

function finalChoice2(Scene)
{
    let endMenu = Scene.lookup("#finalChoicePane");
    let finalCase = -1;
    for (var i = 1; i <= 26; i++)
    {
        if (chosenCases.indexOf(i) == -1 && chosenCase != i)
        {
            finalCase = i-1;
            break;
        }
    }
    Scene.lookup("#finalCaseLabel2").setText("" + (finalCase + 1));
    Scene.lookup("#finalCaseLabel1").setText("" + chosenCase);
    Scene.lookup("#finalCaseValue").setText(values[shuffledBriefcases[finalCase]]);
    Scene.lookup("#yourCaseValue").setText(values[shuffledBriefcases[chosenCase - 1]])
    let customEventHandler = Java.extend(javafx.event.EventHandler, {
        handle: function(mouseEvent)
        {
            if (checkChoose())
            {
                Scene.lookup("#yourCasePane").setVisible(false);
                finalChoiceMade(rawValues[shuffledBriefcases[chosenCase - 1]]);
            }
        }
    });
    let customEventHandler2 = Java.extend(javafx.event.EventHandler, {
        handle: function(mouseEvent)
        {
            if (checkChoose())
            {
                Scene.lookup("#finalCasePane").setVisible(false);
                finalChoiceMade(rawValues[shuffledBriefcases[finalCase]]);
            }
        }
    });
    let urcasearray = Scene.lookup("#yourCasePane").getChildren().toArray();
    for (var i = 0; i < urcasearray.length; i++)
    {
        urcasearray[i].addEventFilter(javafx.scene.input.MouseEvent.MOUSE_PRESSED, new customEventHandler())
    }
    let finalcasearray = Scene.lookup("#finalCasePane").getChildren().toArray();
    for (var i = 0; i < finalcasearray.length; i++)
    {
        finalcasearray[i].addEventFilter(javafx.scene.input.MouseEvent.MOUSE_PRESSED, new customEventHandler2())
    }

    endMenu.setVisible(true);
}

function checkChoose()
{
    let temp = choiceMade;
    if (!temp)
    {
        choiceMade = true;
    }
    return !temp;
}

function noDeal(Scene)
{
    if (!dealTakenValue) {
        Scene.lookup("#dealStackPane").setVisible(false);
        currentOffer = null;
    }
}

function deal()
{
    dealTakenValue = true;
    dealTaken();
}

function finalChoiceMade(value)
{
    finalChoice(value)
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}