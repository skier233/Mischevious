DMessage("ModuleSelector start");
    while (true) {
        let folder = "Structure" + separator + "Modules" + separator +
            ["ShortModules", "MediumModules", "LongModules", "Games", "Fetishes"][randomInteger(0, 4)]
            + separator;
        let files = listFilesInFolder(folder);
        if (files == null) {
            WMessage("File list is null while accessing'" + folder + "'likely a problem! Maybe directory missing/permissions?");
        } else if (files.length == 0) {
            // do nothing, we ignore an empty directory, it does not count.
        } else {
            DMessage("Running *.js from folder '" + folder + "'");
            run(folder + "*.js");
            break; // exit when one module was executed
        }
    }
DMessage("ModuleSelector end");