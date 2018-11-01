addResponseRegex("^tag([ ]+[a-z|0-9]+)+", "^tagpicture([ ]+[a-z|0-9]+)+", "^t([ ]+[a-z|0-9]+)+", "^tag", "^t");

function tagPictureResponse(message) {
    DMessage("TagPicture: BeginningResponse");
    if (getResponsesDisabled()) {
        DMessage("TagPicture: EndResponse Response is Disabled");
        return false;
    }
    lockImages();
    if (message.toLowerCase() == "tag" || message.toLowerCase() == "t") {
        let taggedPicture = Java.type("me.goddragon.teaseai.api.picture.TaggedPicture");
        let z = getImagePath();
        z = "" + z;
        z = z.substr(1);
        DMessage("TagPicture: Image path " + z);
        //Try 2
        let thisFile = new java.io.File(z);
        let thisPicture = new taggedPicture(thisFile, true);
        let dressStateText = "N/A";
        if (thisPicture.getDressState() != null)
        {
            dressStateText = thisPicture.getDressState();
        }
        SMessage("<c=darkgreen b>Dress State: <> <c=indigo>" + dressStateText, 0);
        SMessage("<c=darkgreen b>Tags: <> <c=indigo>" + thisPicture.getTags(), 0);
        unlockImages();
        return;
    }
    if (getImageUrl() != null || getImagePath() != null) {
        message = message.toLowerCase();
        let tagsList = [];
        //First comes the dressState of the image
        if (message.search("[ ]+(naked|n|nude)($| )") != -1) {
            tagsList.push("Naked");
        }
        else if (message.search("[ ]+(halfdressed|half|hd)($| )") != -1) {
            tagsList.push("HalfDressed");
        }
        else if (message.search("[ ]+(dressed|clothes|d)($| )") != -1) {
            tagsList.push("FullyDressed");
        }
        else if (message.search("[ ]+(garmetcovering|gcovering|gc)($| )") != -1) {
            tagsList.push("GarmetCovering");
        }
        else if (message.search("[ ]+(handscovering|hcovering|h)($| )") != -1) {
            tagsList.push("HandsCovering");
        }
        else if (message.search("[ ]+(seethrough|sthrough|st)($| )") != -1) {
            tagsList.push("SeeThrough");
        }
        //Now the body parts visible
        if (message.search("[ ]+(wetpussy|wp)($| )") != -1) {
            tagsList.push("WetPussy");
        }
        if (message.search("[ ]+(creamypussy|cp)($| )") != -1) {
            tagsList.push("CreamyPussy");
        }
        if (message.search("[ ]+(drippussy|drippingpussy|dp)($| )") != -1) {
            tagsList.push("DrippingPussy");
        }
        if (message.search("[ ]+(pussy|p|vagina)($| )") != -1) {
            tagsList.push("Pussy");
        }
        if (message.search("[ ]+(boobs|tits|t|b)($| )") != -1) {
            tagsList.push("Boobs");
        }
        if (message.search("[ ]+(ass|butt|booty|a)($| )") != -1) {
            tagsList.push("Ass");
        }
        if (message.search("[ ]+(cumcoveredass|cca)($| )") != -1) {
            tagsList.push("CumCoveredAss");
        }
        if (message.search("[ ]+(cumcoveredboobs|ccb)($| )") != -1) {
            tagsList.push("CumCoveredBoobs");
        }
        if (message.search("[ ]+(cumcoveredcock|ccc)($| )") != -1) {
            tagsList.push("CumCoveredCock");
        }
        if (message.search("[ ]+(cumcoveredface|ccfa)($| )") != -1) {
            tagsList.push("CumCoveredFace");
        }
        if (message.search("[ ]+(cumcoveredfeet|ccf)($| )") != -1) {
            tagsList.push("CumCoveredFeet");
        }
        if (message.search("[ ]+(cumcoveredfingers|ccfi)($| )") != -1) {
            tagsList.push("CumCoveredFingers");
        }
        if (message.search("[ ]+(cumcoveredlegs|ccl)($| )") != -1) {
            tagsList.push("CumCoveredLegs");
        }
        if (message.search("[ ]+(cumcoveredpussy|ccp)($| )") != -1) {
            tagsList.push("CumCoveredPussy");
        }
        if (message.search("[ ]+(face|f)($| )") != -1) {
            tagsList.push("Face");
        }
        if (message.search("[ ]+(fingers|fgs|fs)($| )") != -1) {
            tagsList.push("Fingers");
        }
        if (message.search("[ ]+(feet|foot|ft)($| )") != -1) {
            tagsList.push("Feet");
        }
        if (message.search("[ ]+(legs|lg|ls|l)($| )") != -1) {
            tagsList.push("Legs");
        }
        if (message.search("[ ]+(cock|ck)($| )") != -1) {
            tagsList.push("Cock");
        }
        //Body Type
        if (message.search("[ ]+(blonde|bl)($| )") != -1) {
            tagsList.push("Blonde");
        }
        if (message.search("[ ]+(brunette|bru|bro|brown)($| )") != -1) {
            tagsList.push("Brunette");
        }
        if (message.search("[ ]+(redhead|red|re|ginger)($| )") != -1) {
            tagsList.push("Redhead");
        }
        if (message.search("[ ]+(skinny|sl|slim)($| )") != -1) {
            tagsList.push("Slim");
        }
        if (message.search("[ ]+(thick|th|thk)($| )") != -1) {
            tagsList.push("Thick");
        }
        //Now the category associated to the image
        if (message.search("[ ]+(allfours|allf)($| )") != -1) {
            tagsList.push("AllFours");
        }
        if (message.search("[ ]+(hardcore|hc|hard)($| )") != -1) {
            tagsList.push("Hardcore");
        }
        if (message.search("[ ]+(softcore|sc|soft)($| )") != -1) {
            tagsList.push("SoftCore");
        }
        if (message.search("[ ]+(lesbian|les|ls)($| )") != -1) {
            tagsList.push("Lesbian");
        }
        if (message.search("[ ]+(femdom|fd|fdom)($| )") != -1) {
            tagsList.push("FemDom");
        }
        if (message.search("[ ]+(lezdom|ld|lesdom|ldom)($| )") != -1) {
            tagsList.push("LezDom");
        }
        if (message.search("[ ]+(gay|g)($| )") != -1) {
            tagsList.push("Gay");
        }
        if (message.search("[ ]+(maledom|md|mdom)($| )") != -1) {
            tagsList.push("MaleDom");
        }
        if (message.search("[ ]+(captions|c|cap)($| )") != -1) {
            tagsList.push("Captions");
        }
        if (message.search("[ ]+(pointofview|pov)($| )") != -1) {
            tagsList.push("PointOfView");
        }
        if (message.search("[ ]+(bondage|bd|bg)($| )") != -1) {
            tagsList.push("Bondage");
        }
        if (message.search("[ ]+(shower|sh)($| )") != -1) {
            tagsList.push("Shower");
        }
        if (message.search("[ ]+(bath|bt|bh)($| )") != -1) {
            tagsList.push("Bath");
        }
        if (message.search("[ ]+(outside|outdoors|out|od|os)($| )") != -1) {
            tagsList.push("Outdoors");
        }
        if (message.search("[ ]+(cumcovered|cc)($| )") != -1) {
            tagsList.push("CumCovered");
        }
        //Now the people involved
        if (message.search("[ ]+(solofemale|sologirl|solowoman|solof|sf|sg|sw)($| )") != -1) {
            tagsList.push("OneFemale");
        }
        if (message.search("[ ]+(solomale|soloman|soloboy|solom|sm|sb)($| )") != -1) {
            tagsList.push("OneMale");
        }
        if (message.search("[ ]+(couple|cpl)($| )") != -1) {
            tagsList.push("OneMaleOneFemale");
        }
        if (message.search("[ ]+(2female|female2|2f|f2)($| )") != -1) {
            tagsList.push("TwoFemale");
        }
        if (message.search("[ ]+(3female|female3|3f|f3)($| )") != -1) {
            tagsList.push("ThreeeMale");
        }
        if (message.search("[ ]+(2male|male2|2m|m2)($| )") != -1) {
            tagsList.push("TwoMale");
        }
        if (message.search("[ ]+(3male|male3|3m|m3)($| )") != -1) {
            tagsList.push("ThreeMale");
        }
        if (message.search("[ ]+(2male1female|1female2male|2m1f|1f2m)($| )") != -1) {
            tagsList.push("OneFemaleTwoMale");
        }
        if (message.search("[ ]+(1male2female|2female1male|1m2f|2f1m)($| )") != -1) {
            tagsList.push("OneMaleTwoFemale");
        }
        //Any amount of people not listed above is classified as orgy
        if (message.search("[ ]+(orgy|or|o)($| )") != -1) {
            tagsList.push("Orgy");
        }
        //Now the action associated with the image
        if (message.search("[ ]+(blowjob|bj|blow)($| )") != -1) {
            tagsList.push("BlowJob");
        }
        if (message.search("[ ]+(masturbating|mb|m)($| )") != -1) {
            tagsList.push("Masturbating");
        }
        if (message.search("[ ]+(sucking|sck|sk|s)($| )") != -1) {
            tagsList.push("Sucking");
        }
        if (message.search("[ ]+(handjob|hj|hjob)($| )") != -1) {
            tagsList.push("Handjob");
        }
        if (message.search("[ ]+(fingering|fg)($| )") != -1) {
            tagsList.push("Fingering");
        }
        if (message.search("[ ]+(rubbing|rb)($| )") != -1) {
            tagsList.push("Rubbing");
        }
        if (message.search("[ ]+(licking|lk|lck)($| )") != -1) {
            tagsList.push("Licking");
        }
        if (message.search("[ ]+(facesitting|fs)($| )") != -1) {
            tagsList.push("FaceSitting");
        }
        if (message.search("[ ]+(missionary|sx|ms)($| )") != -1) {
            tagsList.push("Missionary");
        }
        if (message.search("[ ]+(doggystyle|dogstyle|ds)($| )") != -1) {
            tagsList.push("DoggyStyle");
        }
        if (message.search("[ ]+(cowgirl|cg)($| )") != -1) {
            tagsList.push("CowGirl");
        }
        if (message.search("[ ]+(standing|sd|sg)($| )") != -1) {
            tagsList.push("Standing");
        }
        if (message.search("[ ]+(anal|an|al)($| )") != -1) {
            tagsList.push("Anal");
        }
        if (message.search("[ ]+(gangbang|gb)($| )") != -1) {
            tagsList.push("GangBang");
        }
        if (message.search("[ ]+(glaring|gla)($| )") != -1) {
            tagsList.push("Glaring");
        }
        if (message.search("[ ]+(smiling|smi)($| )") != -1) {
            tagsList.push("Smiling");
        }
        //Views
        if (message.search("[ ]+(closeup|cu)($| )") != -1) {
            tagsList.push("CloseUp");
        }
        if (message.search("[ ]+(sideview|sv)($| )") != -1) {
            tagsList.push("Side_View");
        }

        //finally comes accessories
        if (message.search("[ ]+(dildo|dd|dl)($| )") != -1) {
            tagsList.push("Dildo");
        }
        if (message.search("[ ]+(vibrator|vb|v)($| )") != -1) {
            tagsList.push("Vibrator");
        }
        if (message.search("[ ]+(panties|panty|pt|py)($| )") != -1) {
            tagsList.push("Panties");
        }
        else if (message.search("[ ]+(wetpanties|wpant|wpa|wpt)($| )") != -1) {
            tagsList.push("WetPanties");
        }
        if (message.search("[ ]+(bra|br)($| )") != -1) {
            tagsList.push("Bra");
        }
        if (message.search("[ ]+(bathingsuit|swimtrunks|ss|ssuit)($| )") != -1) {
            tagsList.push("BathingSuit");
        }
        if (message.search("[ ]+(piercing|prc)($| )") != -1) {
            tagsList.push("Piercing");
        }
        let TeaseAI = Java.type("me.goddragon.teaseai.TeaseAI");
        let taggedPicture = Java.type("me.goddragon.teaseai.api.picture.TaggedPicture");
        let z = getImagePath();
        z = "" + z;
        z = z.substr(1);
        let thisFile = new java.io.File(z);
        let thisPicture = new taggedPicture(thisFile);

        //Converting tagsList from array of string to array of picturetags
        let pictureTagsList = [];
        let imageDressState = null;
        let dressStateType = Java.type("me.goddragon.teaseai.api.picture.DressState");
        let PictureTag = Java.type("me.goddragon.teaseai.api.picture.PictureTag");
        for (var i = 0; i < tagsList.length; i++)
        {
            if (tagsList[i].length < 2) {
                continue;
            }

            let dressState = dressStateType.getByTag("Tag" + tagsList[i]);
            if (dressState != null) {
                imageDressState = dressState;
                continue;
            }
            let thisPictureTag = PictureTag.getByTag(thisFile, "Tag" + tagsList[i]);
            if (thisPictureTag != null) {
                pictureTagsList.push(thisPictureTag);
            }

        }
        if (imageDressState != null) {
            thisPicture.setDressState(imageDressState);
        }
        else
        {
            CMessage("Please enter a valid dress state!");
            thisPicture.setDressState(dressStateType.FULLY_DRESSED);
        }
        SMessage("<c=darkgreen b>Dress State: <> <c=indigo>" + imageDressState, 0);
        SMessage("<c=darkgreen b>Tags: <> <c=indigo>" + pictureTagsList, 0);
        thisPicture.addTags(pictureTagsList);

        DMessage("TagPicture: EndResponse");
        unlockImages();
        return true;
    }
    DMessage("TagPicture: EndResponse");
    unlockImages();
    return false;

}
