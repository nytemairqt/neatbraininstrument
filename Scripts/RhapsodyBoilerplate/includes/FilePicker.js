/*
    Copyright 2022 David Healey

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

namespace FilePicker
{
	reg startFolder = FileSystem.Downloads;
	reg storePath = false;
	reg mode = 0;
	reg hideOnSubmit = true;
	reg filter = "";
	reg file;
	reg callback;

	// pnlFilePicker
	const pnlFilePicker = Content.getComponent("pnlFilePicker");
	pnlFilePicker.showControl(false);

	pnlFilePicker.setPaintRoutine(function(g)
	{
		var a = this.getLocalBounds(0);
		var lblArea = [lblFilePicker.get("x") - 5, lblFilePicker.get("y"), lblFilePicker.getWidth() + 40, lblFilePicker.getHeight()];

		LookAndFeel.fullPageBackground(this.data.title, this.data.message, this.data.icon);

		g.setColour(lblFilePicker.get("bgColour"));
		g.fillRoundedRectangle(lblArea, 3);
	});
	
	// lblFilePicker
	const lblFilePicker = Content.getComponent("lblFilePicker");
	lblFilePicker.setLocalLookAndFeel(LookAndFeel.empty);
	lblFilePicker.set("text", "");

	// btnFilePicker
	const btnFilePicker = Content.getComponent("btnFilePicker");
	btnFilePicker.setLocalLookAndFeel(LookAndFeel.iconButton);
	btnFilePicker.setControlCallback(onbtnFilePickerControl);
	
	inline function onbtnFilePickerControl(component, value)
	{
	    if (!value)
			mode == 0 ? showFileBrowser() : showDirectoryBrowser();			
	}

	// btnFilePickerCancel
	const btnFilePickerCancel = Content.getComponent("btnFilePickerCancel");
	btnFilePickerCancel.setLocalLookAndFeel(LookAndFeel.textButton);
	btnFilePickerCancel.setControlCallback(onbtnFilePickerCancelControl);
	
	inline function onbtnFilePickerCancelControl(component, value)
	{
	    if (!value)
	    	hide();
	}
	
	// btnFilePickerSubmit
    const btnFilePickerSubmit = Content.getComponent("btnFilePickerSubmit");
    btnFilePickerSubmit.setLocalLookAndFeel(LookAndFeel.textButton);
    btnFilePickerSubmit.setControlCallback(onbtnFilePickerSubmitControl);

    inline function onbtnFilePickerSubmitControl(component, value)
    {
        if (!value)
        {
			if (hideOnSubmit)
	        	hide();

	        callback(file);
        }
    }

    // Functions
	inline function show(properties, cb)
	{
		pnlFilePicker.data.title = properties.title;
		pnlFilePicker.data.message = properties.message;
		pnlFilePicker.data.icon = properties.icon;
		filter = isDefined(properties.filter) ? properties.filter : "";
		mode = properties.mode;
		hideOnSubmit = !isDefined(properties.hideOnSubmit) || properties.hideOnSubmit;
		storePath = !isDefined(properties.startFolder);
		callback = cb;
		btnFilePickerSubmit.set("text", properties.buttonText);
		btnFilePickerSubmit.set("enabled", false);

		if (isDefined(properties.startFolder) && properties.startFolder != "" && properties.startFolder.isDirectory())
			startFolder = properties.startFolder;
		else
			startFolder = readDirFromDisk();

		if (isDefined(startFolder))
		{
			btnFilePickerSubmit.set("enabled", mode == 1);
			lblFilePicker.set("text", startFolder.toString(startFolder.FullPath));
			file = startFolder;
		}
		else
		{
			lblFilePicker.set("text", "");
		}

		pnlFilePicker.repaint();
		
		if (!isDefined(properties.fadeIn) || properties.fadeIn)
			pnlFilePicker.fadeComponent(true, 100);
		else
			pnlFilePicker.fadeComponent(true, 1);
	}
    
    inline function hide()
    {
	    pnlFilePicker.fadeComponent(false, 100);
    }
    
    inline function showFileBrowser()
    {
	    FileSystem.browse(startFolder, false, filter, function(f)
	    {
			if (isDefined(f) && f.isFile())
			{
				file = f;
				btnFilePickerSubmit.set("enabled", true);
				lblFilePicker.set("text", f.toString(f.Filename));
			}
	    });
    }

    inline function showDirectoryBrowser()
    {
	    FileSystem.browseForDirectory(startFolder, function(dir)
	    {
		    if (isDefined(dir) && dir.isDirectory())
		    {
		    	file = dir;

		    	if (storePath)
		    		writePathToDisk(dir.toString(dir.FullPath));

		    	btnFilePickerSubmit.set("enabled", true);
		    	lblFilePicker.set("text", dir.toString(file.FullPath));
		    }
	    });
    }
    
    inline function getLastFile()
    {
	    return file;
    }
    
    inline function writePathToDisk(path)
    {
		local f = FileSystem.getFolder(FileSystem.AppData).getChildFile("lastDir.txt");
		
		if (isDefined(f))
			return f.writeString(path);
			
		return false;
    }

    inline function readDirFromDisk()
    {
	    local f = FileSystem.getFolder(FileSystem.AppData).getChildFile("lastDir.txt");

	    if (isDefined(f) && f.isFile());
	    {
			local path = f.loadAsString();

			if (isDefined(path) && path != "")
			{
				local dir = FileSystem.fromAbsolutePath(path);
				file = dir;
				return dir;
			}
	    }
	
	    return FileSystem.getFolder(FileSystem.Desktop);
    }
}
