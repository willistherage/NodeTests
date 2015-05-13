/*
 * Node script that takes combines the animation data of every ThreeJS FBX converted JSON file in a directory.
 * The script assumes that your folder only has similar JS files that all have animation data.
 * It will go through and pull the animation from each file and store it in one array.
 * It then duplicates all the other information (UVS, Vertex, Normals, Materials) from the first file in the 
 * directory and then adds all the other animations to it's animation array.
 *
 * Parameters:
 * Directory Path - Path to the directory containing files you wish to combine.
 * New File Name - The name of the new file that will contain your combined animations.
 *
 * Usage:
 * node animatic path/to/directory path/to/newfile.json
 *
 */

var fs = require('fs');
var params = process.argv.slice(2, process.argv.length);
var fileName = params[1];
var dirName = params[0];
var fileList, comboFile, nextFileName;
var readFirst = false;

fs.readdir(dirName, directoryReadComplete);

function fileReadComplete(error, data)
{
	var object = JSON.parse(data.toString());

	if(!readFirst)
	{
		readFirst = true;
		comboFile = object;
	}
	 else
	{
		for(var i = 0; i < object.animations.length; i++)
		{
			comboFile.animations.push(object.animations[i]);
		}
	}

	readNextFile();
}

function directoryReadComplete(error, data)
{
	console.log('Directory Read Complete. ');

	fileList = data;

	if(fileList.length <= 1)
	{
		console.log('Insufficient number of files to combine.');
		return;
	}

	console.log('Combining '+fileList.length+' files.');
	
	readNextFile();
}

function readNextFile()
{
	if(fileList.length)
	{
		var nextFile = fileList.shift();

		nextFileName = dirName+'/'+nextFile;

		fs.readFile(nextFileName, fileReadComplete);
	}
	 else
	{
		console.log('Combination Complete');
		fs.writeFile(fileName, JSON.stringify(comboFile), 'utf8', onFileWriteComplete);
	}
}

function onFileWriteComplete(error, written, string)
{
	console.log('File Write Complete');
}
