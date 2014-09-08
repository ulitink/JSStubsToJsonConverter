// TODO collect html4 and html5 definitions
// https://github.com/jarib/webidl/blob/master/spec/fixtures/html5.idl - added as html5.idl
// https://github.com/heycam/webidl
// http://www.w3.org/TR/html/webappapis.html#idl-definitions
// http://www.w3.org/TR/html4/

var WebIDL2 = require("webidl2");
var fs = require("fs");
var xmldoc = require("xmldoc");

var idlClasses = {};
var idlDirName = ".\\dom\\";
var idlDir = fs.readdirSync(idlDirName);
for (var fileIndex in idlDir) {
    if (!idlDir.hasOwnProperty(fileIndex)) continue;
    var file = idlDir[fileIndex];
    var code = fs.readFileSync(idlDirName + file, "utf8");
//var code = fs.readFileSync("./short.idl", "utf8");

    fs.writeSync(1, "parsing " + file + "\n");
    var tree = WebIDL2.parse(code);
    for (var treeElemIndex in tree) {
        var treeElem = tree[treeElemIndex];
        if (!idlClasses[treeElem.name]) idlClasses[treeElem.name] = {};
        else fs.writeSync(1, "Class '" + treeElem.name + "' overloaded.\n");
        var idlClass = idlClasses[treeElem.name];
        for (var treeElemMemberIndex in treeElem.members) {
            var treeElemMember = treeElem.members[treeElemMemberIndex];
            var idlClassMember = {
                readonly: treeElemMember.readonly,
                type:treeElemMember.idlType.idlType,
                kind:treeElemMember.type  === "operation" ? "method" : "property"
            };
            if (treeElemMember.type === "operation") {
                idlClassMember.parameters = [];
                for (var i=0; i < treeElemMember.arguments.length; i++) {
                    idlClassMember.parameters.push({
                        name:treeElemMember.arguments[i].name,
                        optional:treeElemMember.arguments[i].optional,
                        type:treeElemMember.arguments[i].idlType.idlType
                    });
                }

            }
            idlClass[treeElemMember.name] = idlClassMember;
        }
    }
    fs.writeSync(1, "IDL: " + file + "\n");
    fs.writeSync(1, JSON.stringify(tree) + "\n");
}

var stubsDirName = "C:\\idea_src\\ultimate\\plugins\\JavaScriptLanguage\\javascript-psi-impl\\src\\com\\intellij\\lang\\javascript\\index\\predefined\\";
var stubsDir = fs.readdirSync(stubsDirName);
/** @type {Object.<string, Object.<string, *>>} */
var stubsClasses = {};
for (var fileIndex in stubsDir) {
    if (!stubsDir.hasOwnProperty(fileIndex)) continue;
    var file = stubsDir[fileIndex];
    if (file.indexOf(".xml") == -1) continue;
    if (file.indexOf("EcmaScript") != -1) continue;
    fs.writeSync(1, "Stub: " + file + "\n");

    var stub = fs.readFileSync(stubsDirName + file, "utf8");
    var stubDoc = new xmldoc.XmlDocument(stub);
    stubDoc.eachChild(function(topElement) {
        if (topElement.name === "class") {
            var className = topElement.attr.name;
            if (!stubsClasses[className]) stubsClasses[className] = {};
            else fs.writeSync(1, "Class '" + className + "' overloaded.\n");
            var classMembers = stubsClasses[className];
            topElement.eachChild(function(topElementMember) {
                var classMember = {
                    readonly:topElementMember.attr.readonly,
                    type:topElementMember.name === "method" ? topElementMember.attr.returnType : topElementMember.attr.type,
                    kind:topElementMember.name
                };
                if (topElementMember.name == "method" && topElementMember.children) {
                    classMember.parameters = [];
                    for (var i = 0; i < topElementMember.children.length; i++) {
                        classMember.parameters.push({
                            name:topElementMember.children[i].attr.name,
                            optional:Boolean(topElementMember.children[i].attr.optional),
                            type:topElementMember.children[i].attr.type
                        });
                    }
                }
                classMembers[topElementMember.attr.name] = classMember;
            });
        }
        else {
            fs.writeSync(1, "Undefined element: " + topElement.name + "\n");
        }
    });
    var lib = stubDoc.childNamed("class");
    fs.writeSync(1, JSON.stringify(lib) + "\n\n");
}

// use http://ulitink.github.io/JsonDiff/ for result diff
fs.writeSync(1, "Stubs classes: \n " + JSON.stringify(stubsClasses) + "\n");
fs.writeSync(1, "IDL classes: \n " + JSON.stringify(idlClasses) + "\n");

// sync writes instead of console.log
// http://stackoverflow.com/questions/6471004/how-can-i-write-blocking-in-stdout-with-node-js
fs.fsyncSync(1);
