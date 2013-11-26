var PEG = require("pegjs");
var fs = require("fs");


//var code = fs.readFileSync("./dom/dom2traversal.idl", "utf8");
var code = fs.readFileSync("./short.idl", "utf8");
var grammar = fs.readFileSync("./webidl.pegjs", "utf8");
var parser = PEG.buildParser(grammar);
var tree = parser.parse(code);
console.log(tree);
