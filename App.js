// TODO collect html4 and html5 definitions
// https://github.com/jarib/webidl/blob/master/spec/fixtures/html5.idl - added as html5.idl
// http://www.w3.org/TR/html/webappapis.html#idl-definitions
// http://www.w3.org/TR/html4/

var WebIDL2 = require("webidl2");
var fs = require("fs");
var xml2js = require("xml2js");

var idlDirName = ".\\dom\\";
var idlDir = fs.readdirSync(idlDirName);
for (var fileIndex in idlDir) {
    if (!idlDir.hasOwnProperty(fileIndex)) continue;
    var file = idlDir[fileIndex];
    var code = fs.readFileSync(idlDirName + file, "utf8");
//var code = fs.readFileSync("./short.idl", "utf8");

    fs.writeSync(1, "parsing " + file + "\n");
    var tree = WebIDL2.parse(code);
    fs.writeSync(1, "IDL: " + file + "\n");
    fs.writeSync(1, JSON.stringify(tree) + "\n");
}

var stubsDirName = "C:\\idea_src\\ultimate\\plugins\\JavaScriptLanguage\\javascript-psi-impl\\src\\com\\intellij\\lang\\javascript\\index\\predefined\\";
var stubsDir = fs.readdirSync(stubsDirName);
for (var fileIndex in stubsDir) {
    if (!stubsDir.hasOwnProperty(fileIndex)) continue;
    var file = stubsDir[fileIndex];
    if (file.indexOf(".xml") == -1) continue;
    fs.writeSync(1, "Stub: " + file + "\n");

    var stub = fs.readFileSync(stubsDirName + file, "utf8");
    xml2js.parseString(stub, function (err, result) {
        // no way to make it sync https://github.com/Leonidas-from-XIV/node-xml2js/issues/76
        fs.writeSync(1, JSON.stringify(result) + "\n");
    });
}


// sync writes instead of console.log
// http://stackoverflow.com/questions/6471004/how-can-i-write-blocking-in-stdout-with-node-js
fs.fsyncSync(1);

/**
 *
 * @param {Object} [p]
 * @param {HTMLDocument} [p.foo]
 */
function f(p) {
    document
}