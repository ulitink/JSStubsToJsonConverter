/* http://www.w3.org/TR/2012/CR-WebIDL-20120419/ */

/* Lexical */

whitespace "whitespace"
    = [\t\n\r ]+|[\t\n\r ]*(("//".*|"/*".*"*/")[\t\n\r ]*)+

integer
    = \-?(0([0-7]*|[Xx][0-9A-Fa-f]+)|[1-9][0-9]*)

float
    = \-?(([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)([Ee][+-]?[0-9]+)?|[0-9]+[Ee][+-]?[0-9]+)

identifier
    = [A-Za-z][0-9A-Za-z]*

string
    = \"[^"]*\"

/* Parser */

start
    = Definitions

Defititions
    = (Definition Definitions)*

Definition
    = "interface" identifier "{" "}" ";"

