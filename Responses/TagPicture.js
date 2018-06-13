addResponseRegex("^tag([ ]+[a-z|0-9]+)+", "^tagpicture([ ]+[a-z|0-9]+)+", "^t([ ]+[a-z|0-9]+)+");
run("allutils.js");

function tagPictureResponse(message) {
    if (getResponsesDisabled()) {
        return false;
    }
    if (getImageUrl() != null || getImagePath() != null)
    {
        var tagsList = "|";
        //First comes the dressState of the image
        if (message.search("[ ]+(naked|n|nude)($| )") != -1)
        {
            tagsList += " #Naked";
        }
        else if (message.search("[ ]+(halfdressed|half|hd)($| )") != -1) {
            tagsList += " #HalfDressed";
        }
        else if (message.search("[ ]+(dressed|clothes|d)($| )") != -1) {
            tagsList += " #Dressed";
        }
        else if (message.search("[ ]+(garmetcovering|gcovering|gc)($| )") != -1) {
            tagsList += " #GarmetCovering";
        }
        else if (message.search("[ ]+(handsvoering|hcovering|h)($| )") != -1) {
            tagsList += " #HandsCovering";
        }
        else if (message.search("[ ]+(seethrough|sthrough|st)($| )") != -1) {
            tagsList += " #SeeThrough";
        }
        tagsList += " |";
        //Now the body parts visible
        if (message.search("[ ]+(wetpussy|wp)($| )") != -1) {
            tagsList += " #WetPussy";
        }
        if (message.search("[ ]+(creamypussy|cp)($| )") != -1) {
            tagsList += " #CreamyPussy";
        }
        if (message.search("[ ]+(drippussy|drippingpussy|dp)($| )") != -1) {
            tagsList += " #DrippingPussy";
        }
        if (message.search("[ ]+(pussy|p|vagina)($| )") != -1) {
            tagsList += " #Pussy";
        }
        if (message.search("[ ]+(boobs|tits|t|b)($| )") != -1) {
            tagsList += " #Boobs";
        }
        if (message.search("[ ]+(ass|butt|booty|a)($| )") != -1) {
            tagsList += " #Ass";
        }
        if (message.search("[ ]+(face|f)($| )") != -1) {
            tagsList += " #Face";
        }
        if (message.search("[ ]+(fingers|fgs|fs)($| )") != -1) {
            tagsList += " #Fingers";
        }
        if (message.search("[ ]+(feet|foot|ft)($| )") != -1) {
            tagsList += " #Feet";
        }
        if (message.search("[ ]+(legs|lg|ls|l)($| )") != -1) {
            tagsList += " #Legs";
        }
        if (message.search("[ ]+(cock|ck)($| )") != -1) {
            tagsList += " #Cock";
        }
        if (message.search("[ ]+(blonde|bl)($| )") != -1) {
            tagsList += " #Blonde";
        }
        if (message.search("[ ]+(brunette|bru|bro|brown)($| )") != -1) {
            tagsList += " #Brunette";
        }
        if (message.search("[ ]+(redhead|red|re|ginger)($| )") != -1) {
            tagsList += " #Redhead";
        }
        if (message.search("[ ]+(skinny|sl|slim)($| )") != -1) {
            tagsList += " #Slim";
        }
        if (message.search("[ ]+(thick|th|thk)($| )") != -1) {
            tagsList += " #Thick";
        }
        tagsList += " |";
        //Now the category associated to the image
        if (message.search("[ ]+(hardcore|hc|hard)($| )") != -1) {
            tagsList += " #Hardcore";
        }
        if (message.search("[ ]+(softcore|sc|soft)($| )") != -1) {
            tagsList += " #SoftCore";
        }
        if (message.search("[ ]+(lesbian|les|ls)($| )") != -1) {
            tagsList += " #Lesbian";
        }
        if (message.search("[ ]+(femdom|fd|fdom)($| )") != -1) {
            tagsList += " #FemDom";
        }
        if (message.search("[ ]+(lezdom|ld|lesdom|ldom)($| )") != -1) {
            tagsList += " #LezDom";
        }
        if (message.search("[ ]+(gay|g)($| )") != -1) {
            tagsList += " #Gay";
        }
        if (message.search("[ ]+(maledom|md|mdom)($| )") != -1) {
            tagsList += " #MaleDom";
        }
        if (message.search("[ ]+(captions|c|cap)($| )") != -1) {
            tagsList += " #Captions";
        }
        if (message.search("[ ]+(pointofview|pov)($| )") != -1) {
            tagsList += " #POV";
        }
        if (message.search("[ ]+(bondage|bd|bg)($| )") != -1) {
            tagsList += " #Bondage";
        }
        if (message.search("[ ]+(shower|sh)($| )") != -1) {
            tagsList += " #Shower";
        }
        if (message.search("[ ]+(bath|bt|bh)($| )") != -1) {
            tagsList += " #Bath";
        }
        if (message.search("[ ]+(outside|outdoors|out|od|os)($| )") != -1) {
            tagsList += " #Outdoors";
        }
        if (message.search("[ ]+(closeup|cu)($| )") != -1) {
            tagsList += " #CloseUp";
        }
        if (message.search("[ ]+(cumcovered|cc)($| )") != -1) {
            tagsList += " #CumCovered";
        }
        tagsList += " |";
        //Now the people involved
        if (message.search("[ ]+(solofemale|sologirl|solowoman|solof|sf|sg|sw)($| )") != -1) {
            tagsList += " #SoloFemale";
        }
        if (message.search("[ ]+(solomale|soloman|soloboy|solom|sm|sb)($| )") != -1) {
            tagsList += " #SoloMan";
        }
        if (message.search("[ ]+(couple|cpl)($| )") != -1) {
            tagsList += " #Couple";
        }
        if (message.search("[ ]+(2female|female2|2f|f2)($| )") != -1) {
            tagsList += " #2Female";
        }
        if (message.search("[ ]+(3female|female3|3f|f3)($| )") != -1) {
            tagsList += " #3Female";
        }
        if (message.search("[ ]+(2male|male2|2m|m2)($| )") != -1) {
            tagsList += " #2Male";
        }
        if (message.search("[ ]+(3male|male3|3m|m3)($| )") != -1) {
            tagsList += " #3Male";
        }
        if (message.search("[ ]+(2male1female|1female2male|2m1f|1f2m)($| )") != -1) {
            tagsList += " #2Male1Female";
        }
        if (message.search("[ ]+(1male2female|2female1male|1m2f|2f1m)($| )") != -1) {
            tagsList += " #2Female1Male";
        }
        //Any amount of people not listed above is classified as orgy
        if (message.search("[ ]+(orgy|or|o)($| )") != -1) {
            tagsList += " #Orgy";
        }
        tagsList += " |";
        //Now the action associated with the image
        if (message.search("[ ]+(blowjob|bj|blow)($| )") != -1) {
            tagsList += " #BlowJob";
        }
        if (message.search("[ ]+(masturbating|mb|m)($| )") != -1) {
            tagsList += " #Masturbating";
        }
        if (message.search("[ ]+(sucking|sck|sk|s)($| )") != -1) {
            tagsList += " #Sucking";
        }
        if (message.search("[ ]+(handjob|hj|hjob)($| )") != -1) {
            tagsList += " #Handjob";
        }
        if (message.search("[ ]+(fingering|fg)($| )") != -1) {
            tagsList += " #Fingering";
        }
        if (message.search("[ ]+(rubbing|rb)($| )") != -1) {
            tagsList += " #Rubbing";
        }
        if (message.search("[ ]+(licking|lk|lck)($| )") != -1) {
            tagsList += " #Licking";
        }
        if (message.search("[ ]+(facesitting|fs)($| )") != -1) {
            tagsList += " #FaceSitting";
        }
        if (message.search("[ ]+(missionary|sx|ms)($| )") != -1) {
            tagsList += " #Missionary";
        }
        if (message.search("[ ]+(doggystyle|dogstyle|ds)($| )") != -1) {
            tagsList += " #DoggyStyle";
        }
        if (message.search("[ ]+(cowgirl|cg)($| )") != -1) {
            tagsList += " #CowGirl";
        }
        if (message.search("[ ]+(standing|sd|sg)($| )") != -1) {
            tagsList += " #Standing";
        }
        if (message.search("[ ]+(anal|an|al)($| )") != -1) {
            tagsList += " #Anal";
        }
        if (message.search("[ ]+(gangbang|gb)($| )") != -1) {
            tagsList += " #GangBang";
        }
        tagsList += " |";
        //finally comes accessories
        if (message.search("[ ]+(dildo|dd|dl)($| )") != -1) {
            tagsList += " #Dildo";
        }
        if (message.search("[ ]+(vibrator|vb|v)($| )") != -1) {
            tagsList += " #Vibrator";
        }
        if (message.search("[ ]+(panties|panty|pt|py)($| )") != -1) {
            tagsList += " #Panties";
        }
        else if (message.search("[ ]+(wetpanties|wpant|wpa|wpt)($| )") != -1) {
            tagsList += " #WetPanties";
        }
        if (message.search("[ ]+(bra|bathingsuit|swimtrunks|br|ss|ssuit)($| )") != -1) {
            tagsList += " #BathingSuitOrBra";
        }


        var z = getImagePath();
        z = "" + z;
        var x = z.split("\\");
        sendMessage("Tags: " + tagsList, 0);
        var currentDir = "";
        for (var i = 0; i < x.length - 1; i++)
        {
            currentDir += x[i] + "\\";
        }
        var fileName = x[x.length-1];
        var tagsFile = getOrCreateFile(getAppPath() + currentDir + "imagetags.txt");
        var fileReader = new java.io.FileReader(tagsFile);
        var bufferedReader = new java.io.BufferedReader(fileReader);
        var line = bufferedReader.readLine();
        var lines = [];
        var isTagged = false;
        while (line != null)
        {
            if (line.search(fileName) != -1)
            {
                line = fileName + ":" + tagsList;
                isTagged = true;
            }
            lines.push(line);
            line = bufferedReader.readLine();
        }
        fileReader.close();
        bufferedReader.close();
        if (!isTagged)
        {
            lines.push(fileName + ":" + tagsList);
        }
        var fileWriter = new java.io.FileWriter(tagsFile);
        var bufferedWriter = new java.io.BufferedWriter(fileWriter);
        for (var i = 0; i < lines.length; i++)
        {
            bufferedWriter.write(lines[i]);
            bufferedWriter.newLine();
        }
        bufferedWriter.flush();
        bufferedWriter.close();

    }
    return true;
}