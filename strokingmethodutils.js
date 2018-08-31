function setUpStrokingMethods()
{
    var methods = getAllMethods();
    DMessage("Setting up methods");
    for (var i = 0; i < methods.length; i++)
    {
        if (getVar("Method" + methods[i].constructor.name, null) == null) {
            setVar("Method" + methods[i].constructor.name, "Enabled");
        }
        registerVariable(("Method" + methods[i].constructor.name), ("Method" + methods[i].constructor.name), "How often should this stroking method be used? (Options: Enabled, Disabled, 1 (rarely used), 2 (uncommonly used), 3 (commonly used), 4 (very commonly used))");
    }
}

function StrokeOtherMethods(duration, speed)
{
    //DMessage("debug 1");
    var activeMethods = getStrokingMethods();
    var methodToRun = activeMethods[randomInteger(0, activeMethods.length - 1)];
    DMessage("calculated speed " + methodToRun.speed);
    DMessage("calculated duration " + methodToRun.duration);
    //DMessage("debug 2");
    CMessage(methodToRun.startStrokingMethodString, 0);
    customStroke(methodToRun.duration, Math.floor(methodToRun.speed));
}

function EdgingMethod() {
    var methods = getStrokingMethods("close", .34);
    var edgingMethods = [];
    for (var i = 0; i < methods.length; i++) {
        if (methods[i].closeness > 2) {
            edgingMethods.push(methods[i]);
        }
    }
    var methodToRun = edgingMethods[randomInteger(0, edgingMethods.length - 1)];
    CMessage(methodToRun.startStrokingMethodString + " until you get to the edge", 0);
    var bpm = methodToRun.speed + 20;
    startEdgingBPM(bpm);
}

function getAllMethods()
{
    return [new FigureEightMethod(), new StrokeUnderLegMethod(), new StrokeUnderLegLubeMethod(), new PalmMethod(),
    new CircularPalmMethod(), new OneHandTopOneHandBottomMethod(), new RollingMethod(), new StomachRubMethod(), new PalmRubMethod(),
    new NormalStrokingMethod(), new NormalStrokingLubeMethod(), new NormalStrokingBothHandsLubeMethod(), new StrokeHeadMethod(),
    new StrokeTipMethod(), new HoldStrokeMethod(), new HoldStrokeHeadMethod(), new HoldStrokeTipMethod(), new RubSweetSpotMethod(),
    new TickleSweetSpotMethod(), new TwistMethod(), new TwistHeadMethod(), new TwistTipMethod(), new HoldTwistMethod(), new HoldTwistHeadMethod(),
    new HoldTwistTipMethod(), new OnlyDownMethod(), new OnlyUpMethod(), new OnlyDownCircleMethod(), new OnlyUpCircleMethod(), new TwistCircleMethod(),
    new FistPeekMethod(), new FingersTeaseMethod(), new OneFingerMethod()];
}

function getStrokingMethods(type, amount)
{
    returnmethods = [];
    var allmethods = getAllMethods();
    for (var i = 0; i < allmethods.length; i++)
    {
        var methodVar = getVar("Method" + allmethods[i].constructor.name, null);
        methodVar = methodVar + "";
        if (methodVar != null)
        {
            var numberMethods = 0;
            if (methodVar.toUpperCase() == "1")
            {
                numberMethods = 1;
            }
            else if (methodVar.toUpperCase() == "2")
            {
                numberMethods = 3;
            }
            else if (methodVar.toUpperCase() == "ENABLED")
            {
                numberMethods = 5;
            }
            else if (methodVar.toUpperCase() == "3")
            {
                numberMethods = 7;
            }
            else if (methodVar.toUpperCase() == "4")
            {
                numberMethods = 9;
            }
            if (type != null)
            {
                var percent = 1.00;
                if (type == "torture")
                {
                    if (allmethods[i].torture < 5)
                    {
                        percent = amount;
                    }
                }
                else if (type == "tease")
                {
                    if (allmethods[i].tease < 5)
                    {
                        percent = amount;
                    }
                }
                else if (type == "intense")
                {
                    if (allmethods[i].intensity < 5)
                    {
                        percent = amount;
                    }
                }
                else if (type == "close")
                {
                    if (allmethods[i].closeness < 5)
                    {
                        percent = amount;
                    }
                }
                numberMethods = Math.floor(numberMethods * percent);
            }
            for (var j = 0; j < numberMethods; j++)
            {
                returnmethods.push(allmethods[i]);
            }
        }
    }
    return returnmethods;
}

function StrokingMethod(startStrokingMethodString, intensity, tease, torture, closeness, useLube)
{
    this.startStrokingMethodString = startStrokingMethodString;
    this.intensity = intensity;
    this.tease = tease;
    this.torture = torture;
    this.closeness = closeness;
    this.useLube = useLube;
    if (useLube == null || useLube == undefined)
    {
        this.useLube = false;
    }
    var apm = getApathyMoodIndex();
    //this.duration = duration;
    if (tease >= 5) {
        apm += (5 - randomInteger(1, 10)) * 5;
        this.speed = 98.87 + 0.05 * apm * intensity - .556 * apm - 2.998 * intensity - .0034 * apm * Math.pow(intensity, 2);
    }
    else
    {
        this.speed = 160.8 - 3.685 * intensity - 7.007 * closeness - 7.739 * torture - 69.69 * Math.sin(123.7 * tease) - 1.773 * apm * Math.sin(13950 * tease);
    }
    if (this.speed < 20)
    {
        this.speed = 30;
    }

    var percentFromMinToMax = .9139 + .001934 * apm + .01167 * intensity * closeness - .0429 * intensity - .111 * closeness - .00236 * Math.pow(closeness, 2);
    apm += (5 - randomInteger(1, 10)) * 5;
    this.duration = ((getMaxStrokingLength() - getMinStrokingLength()) * 60) * percentFromMinToMax + (getMinStrokingLength() * 60);
    //this.speed = speed;
    if (this.useLube == true)
    {
        this.startStrokingMethodString += " with lube";
    }
}

function FigureEightMethod() {
    StrokingMethod.call(this, "Start doing the figure eight on your %cock%", 6, 0, 4, 7, true);
}
FigureEightMethod.prototype = Object.create(StrokingMethod.prototype);
FigureEightMethod.prototype.constructor = FigureEightMethod;

function StrokeUnderLegMethod() {
    StrokingMethod.call(this, "Start stroking your %cock% from under your leg", 4, 0, 1, 3);
}
StrokeUnderLegMethod.prototype = Object.create(StrokingMethod.prototype);
StrokeUnderLegMethod.prototype.constructor = StrokeUnderLegMethod;

function StrokeUnderLegLubeMethod() {
    StrokingMethod.call(this, "Start stroking your %cock% from under your leg", 6, 0, 3, 6);
}
StrokeUnderLegLubeMethod.prototype = Object.create(StrokingMethod.prototype);
StrokeUnderLegLubeMethod.prototype.constructor = StrokeUnderLegLubeMethod;

function PalmMethod() {
    StrokingMethod.call(this, "Start palming your %cock%", 9, 0, 9, 1, true);
}
PalmMethod.prototype = Object.create(StrokingMethod.prototype);
PalmMethod.prototype.constructor = PalmMethod;

function CircularPalmMethod() {
    StrokingMethod.call(this, "Start circular palming your %cock%", 10, 0, 10, 2, true);
}
CircularPalmMethod.prototype = Object.create(StrokingMethod.prototype);
CircularPalmMethod.prototype.constructor = CircularPalmMethod;

function OneHandTopOneHandBottomMethod() {
    StrokingMethod.call(this, "Place one hand palm down on the top of your %cock% and the other lengthwise on the bottom and wrap the fingers of the top hand around and stroke", 5, 0, 2, 4, true);
}
OneHandTopOneHandBottomMethod.prototype = Object.create(StrokingMethod.prototype);
OneHandTopOneHandBottomMethod.prototype.constructor = OneHandTopOneHandBottomMethod;

function RollingMethod() {
    StrokingMethod.call(this, "Start rolling your %cock% between your hands", 3, 3, 0, 3, false);
}
RollingMethod.prototype = Object.create(StrokingMethod.prototype);
RollingMethod.prototype.constructor = RollingMethod;

function StomachRubMethod() {
    StrokingMethod.call(this, "Start rubbing your %cock% back and forth across your stomach", 4, 7, 0, 3, true);
}
StomachRubMethod.prototype = Object.create(StrokingMethod.prototype);
StomachRubMethod.prototype.constructor = StomachRubMethod;

function PalmRubMethod() {
    StrokingMethod.call(this, "Push your cock against your stomach and start moving your palm up and down on top of it", 5, 6, 0, 4, true);
}
PalmRubMethod.prototype = Object.create(StrokingMethod.prototype);
PalmRubMethod.prototype.constructor = PalmRubMethod;

function NormalStrokingMethod() {
    StrokingMethod.call(this, "Start stroking with one hand with no lube", 4, 0, 1, 3, false);
}
NormalStrokingMethod.prototype = Object.create(StrokingMethod.prototype);
NormalStrokingMethod.prototype.constructor = NormalStrokingMethod;

function NormalStrokingLubeMethod() {
    StrokingMethod.call(this, "Start stroking with one hand", 6, 0, 3, 5, true);
}
NormalStrokingLubeMethod.prototype = Object.create(StrokingMethod.prototype);
NormalStrokingLubeMethod.prototype.constructor = NormalStrokingLubeMethod;

function NormalStrokingBothHandsLubeMethod() {
    StrokingMethod.call(this, "Start stroking with both hands", 7, 0, 2, 8, true);
}
NormalStrokingBothHandsLubeMethod.prototype = Object.create(StrokingMethod.prototype);
NormalStrokingBothHandsLubeMethod.prototype.constructor = NormalStrokingBothHandsLubeMethod;

function StrokeHeadMethod() {
    StrokingMethod.call(this, "Start stroking on the head of your %cock%", 6, 2, 4, 6, true);
}
StrokeHeadMethod.prototype = Object.create(StrokingMethod.prototype);
StrokeHeadMethod.prototype.constructor = StrokeHeadMethod;

function StrokeTipMethod() {
    StrokingMethod.call(this, "Start stroking on only the tip of your %cock%", 8, 4, 7, 4, true);
}
StrokeTipMethod.prototype = Object.create(StrokingMethod.prototype);
StrokeTipMethod.prototype.constructor = StrokeTipMethod;

function HoldStrokeMethod() {
    StrokingMethod.call(this, "Hold down the skin of your %cock% and stroke with the other hand", 8, 0, 3, 9, true);
}
HoldStrokeMethod.prototype = Object.create(StrokingMethod.prototype);
HoldStrokeMethod.prototype.constructor = HoldStrokeMethod;

function HoldStrokeHeadMethod() {
    StrokingMethod.call(this, "Hold down the skin of your %cock% and stroke the head with the other hand", 7, 2, 5, 7, true);
}
HoldStrokeHeadMethod.prototype = Object.create(StrokingMethod.prototype);
HoldStrokeHeadMethod.prototype.constructor = HoldStrokeHeadMethod;

function HoldStrokeTipMethod() {
    StrokingMethod.call(this, "Hold down the skin of your %cock% and stroke the tip with the other hand", 8, 4, 7, 4, true);
}
HoldStrokeTipMethod.prototype = Object.create(StrokingMethod.prototype);
HoldStrokeTipMethod.prototype.constructor = HoldStrokeTipMethod;

function RubSweetSpotMethod() {
    StrokingMethod.call(this, "Rub the sweet spot of your %cock%", 3, 3, 0, 7, false);
}
RubSweetSpotMethod.prototype = Object.create(StrokingMethod.prototype);
RubSweetSpotMethod.prototype.constructor = RubSweetSpotMethod;

function TickleSweetSpotMethod() {
    StrokingMethod.call(this, "Tickle the sweet spot of your %cock% without moving the skin", 1, 7, 0, 2, false);
}
TickleSweetSpotMethod.prototype = Object.create(StrokingMethod.prototype);
TickleSweetSpotMethod.prototype.constructor = TickleSweetSpotMethod;

function TwistMethod()
{
    StrokingMethod.call(this, "Start twisting your %cock% in opposite directions", 7, 0, 2, 8, true);
}
TwistMethod.prototype = Object.create(StrokingMethod.prototype);
TwistMethod.prototype.constructor = TwistMethod;

function TwistHeadMethod() {
    StrokingMethod.call(this, "Start twisting the head of your %cock%", 6, 2, 4, 6, true);
}
TwistHeadMethod.prototype = Object.create(StrokingMethod.prototype);
TwistHeadMethod.prototype.constructor = TwistHeadMethod;

function TwistTipMethod() {
    StrokingMethod.call(this, "Start twisting the tip of your %cock%", 7, 4, 6, 3, true);
}
TwistTipMethod.prototype = Object.create(StrokingMethod.prototype);
TwistTipMethod.prototype.constructor = TwistTipMethod;

function HoldTwistMethod() {
    StrokingMethod.call(this, "Hold down the skin of your %cock% and start twisting the shaft with the other", 8, 0, 3, 9, true);
}
HoldTwistMethod.prototype = Object.create(StrokingMethod.prototype);
HoldTwistMethod.prototype.constructor = HoldTwistMethod;

function HoldTwistHeadMethod() {
    StrokingMethod.call(this, "Hold down the skin of your %cock% and start twisting the head with the other", 7, 2, 5, 7, true);
}
HoldTwistHeadMethod.prototype = Object.create(StrokingMethod.prototype);
HoldTwistHeadMethod.prototype.constructor = HoldTwistHeadMethod;

function HoldTwistTipMethod() {
    StrokingMethod.call(this, "Hold down the skin of your %cock% and start twisting the tip with the other", 8, 4, 7, 4, true);
}
HoldTwistTipMethod.prototype = Object.create(StrokingMethod.prototype);
HoldTwistTipMethod.prototype.constructor = HoldTwistTipMethod;

function OnlyDownMethod() {
    StrokingMethod.call(this, "Start only stroking down your %cock%", 8, 0, 5, 5, true);
}
OnlyDownMethod.prototype = Object.create(StrokingMethod.prototype);
OnlyDownMethod.prototype.constructor = OnlyDownMethod;

function OnlyUpMethod() {
    StrokingMethod.call(this, "Start only stroking up your %cock%", 8, 0, 5, 5, true);
}
OnlyUpMethod.prototype = Object.create(StrokingMethod.prototype);
OnlyUpMethod.prototype.constructor = OnlyUpMethod;

function OnlyDownCircleMethod() {
    StrokingMethod.call(this, "Start only stroking down your %cock% with your fingers in a circular ring", 5, 6, 3, 3, true);
}
OnlyDownCircleMethod.prototype = Object.create(StrokingMethod.prototype);
OnlyDownCircleMethod.prototype.constructor = OnlyDownCircleMethod;

function OnlyUpCircleMethod() {
    StrokingMethod.call(this, "Start only stroking up your %cock% with your fingers in a circular ring", 5, 6, 3, 3, true);
}
OnlyUpCircleMethod.prototype = Object.create(StrokingMethod.prototype);
OnlyUpCircleMethod.prototype.constructor = OnlyUpCircleMethod;

function TwistCircleMethod() {
    StrokingMethod.call(this, "Make a circular ring with your fingers and start twisting around the bottom of the tip of your %cock%", 3, 6, 3, 2, true);
}
TwistCircleMethod.prototype = Object.create(StrokingMethod.prototype);
TwistCircleMethod.prototype.constructor = TwistCircleMethod;

function FistPeekMethod() {
    StrokingMethod.call(this, "Make a fist and start peeking the head of your %cock% into it", 10, 5, 10, 1, true);
}
FistPeekMethod.prototype = Object.create(StrokingMethod.prototype);
FistPeekMethod.prototype.constructor = FistPeekMethod;

function FingersTeaseMethod() {
    StrokingMethod.call(this, "Start teasing the head of your %cock% by having your fingers on all sides of the head, going up and down", 9, 6, 9, 1, true);
}
FingersTeaseMethod.prototype = Object.create(StrokingMethod.prototype);
FingersTeaseMethod.prototype.constructor = FingersTeaseMethod;

function OneFingerMethod()
{
    StrokingMethod.call(this, "Start moving one finger gently up and down your %cock%", 1, 9, 1, 0);
}
OneFingerMethod.prototype = Object.create(StrokingMethod.prototype);
OneFingerMethod.prototype.constructor = OneFingerMethod;