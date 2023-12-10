/*
    Copyright 2021, 2022, 2023 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

namespace Expansions
{
	const expHandler = Engine.createExpansionHandler();

	// btnUnload
	const btnUnload = Content.getComponent("btnUnload");
	btnUnload.setLocalLookAndFeel(LookAndFeel.iconButton);
	btnUnload.setControlCallback(onbtnUnloadControl);
	
	inline function onbtnUnloadControl(component, value)
	{
		if (value)
			return;

		Engine.showYesNoWindow("Exit", "Do you want to unload " + getCurrentName() + "?", function(response)
		{
			if (response)
				expHandler.setCurrentExpansion("");
		});
	}

	// Functions
	inline function getCurrent()
	{
		return expHandler.getCurrentExpansion();
	}	

	inline function getCurrentName()
	{
		local e = expHandler.getCurrentExpansion();
		
		if (!isDefined(e))
			return Engine.getName();
			
		return e.getProperties().Name;
	}	

	inline function disableDuplicateSamples()
	{
		local e = expHandler.getCurrentExpansion();
		
		if (isDefined(e))
			e.setAllowDuplicateSamples(false);
	}
	
	inline function getWildcardReference(path)
	{
		local e = expHandler.getCurrentExpansion();
		
		if (isDefined(e))
			return e.getWildcardReference(path);
			
		return "{PROJECT_FOLDER}" + path;
	}
	
	inline function createDefaultLinkFile()
	{
		local filename = "";
		local appData = FileSystem.getFolder(FileSystem.AppData);
				
		switch (Engine.getOS())
		{
			case "OSX": filename = "LinkOSX"; break;
			case "LINUX": filename = "LinkLinux"; break;
			case "WIN": filename = "LinkWindows"; break;
		}
	
		local f = appData.getChildFile(filename);
	
		if (!isDefined(f) || !f.isFile())
			f.writeString(appData.toString(appData.FullPath));		
	}
	
	inline function checkIfMonolithExists(name)
	{
		local e = expHandler.getCurrentExpansion();
		
		if (!isDefined(e) || !isDefined(e.getSampleFolder()))
			return -1;
			
		local files = FileSystem.findFiles(e.getSampleFolder(), name + ".ch*", false);
		
		return files.length > 0;
	}
	
	inline function getCurrentUserPresetsFolder()
	{
		if (Engine.isHISE())
			return FileSystem.getFolder(FileSystem.UserPresets);	

		local e = expHandler.getCurrentExpansion();

		if (!isDefined(e))
			return undefined;

		local rootDir = e.getRootFolder();
		
		if (!isDefined(rootDir) || !rootDir.isDirectory())
			return undefined;

		return rootDir.getChildFile("UserPresets");
	}
	
	// Function calls
	createDefaultLinkFile();
	disableDuplicateSamples();
}

