var WebIDL2 = require("webidl2");
var fs = require("fs");

var idlDir = fs.readdirSync("./dom");
for (var fileIndex in idlDir) {
    if (!idlDir.hasOwnProperty(fileIndex)) continue;
    var file = idlDir[fileIndex];
    var code = fs.readFileSync("./dom/" + file, "utf8");
//var code = fs.readFileSync("./short.idl", "utf8");

    fs.writeSync(1, "parsing " + file + "\n");
    var tree = WebIDL2.parse(code);
    fs.writeSync(1, "File: " + file + "\n");
    fs.writeSync(1, JSON.stringify(tree) + "\n");
}
// sync writes insead of console.log
// http://stackoverflow.com/questions/6471004/how-can-i-write-blocking-in-stdout-with-node-js
fs.fsyncSync(1);
