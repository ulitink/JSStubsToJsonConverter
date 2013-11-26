/* http://www.w3.org/TR/2012/CR-WebIDL-20120419/ */

%lex
%%
[\t\n\r ]+|[\t\n\r ]*(("//".*|"/*".*"*/")[\t\n\r ]*)+                          /* skip whitespace and comments */
\-?(0([0-7]*|[Xx][0-9A-Fa-f]+)|[1-9][0-9]*)                                    return "integer"
\-?(([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)([Ee][+-]?[0-9]+)?|[0-9]+[Ee][+-]?[0-9]+)   return "float"
"interface" return "interface"
[A-Za-z][0-9A-Za-z]*                                                           return "identifier"
\"[^"]*\"                                                                      return "string"
[^\t\n\r 0-9A-Z_a-z]                                                           return yytext

/lex

%start Definitions

%%

Definitions
    : ExtendedAttributeList Definition Definitions
    |
    ;

Definition
    : CallbackOrInterface
    ;

CallbackOrInterface
    : Interface
    ;

Interface
    : interface identifier "{" "}" ";"
    ;

ExtendedAttributeList
    : {}
    ;

expressions
    : e EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | e '!'
        {{
          $$ = (function fact (n) { return n==0 ? 1 : fact(n-1) * n })($1);
        }}
    | e '%'
        {$$ = $1/100;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;
