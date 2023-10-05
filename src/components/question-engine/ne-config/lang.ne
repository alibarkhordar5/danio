@{%
	const getItem = (tag, attrs, args, v) => ({type: "elem", tag, attrs, args, v});
	const getData = (tag, val) => ({type: "data", tag, val});
	const collapse = (array) => array ? array.filter(d => d) : array;
	const flatten = (arrayOfArrays) => [].concat.apply([], arrayOfArrays);
%}


main -> (_:? macros {% d => d[1] %}):* _:? {% d => d[0] %}
macros -> (macro | math_macro | mx_macro) {% d => d[0][0] %}

# Element macros
macro ->
	"\\" (name_token {% d => d[0] %}) version:? attrs:? (arg:* {% id %})
	{% (d, _, reject) => {
	    if (["mx"].includes(d[1]))
	        return reject;
	    return getItem(d[1], d[3], d[4], d[2]);
	} %}
	# {% d => (console.log(d), getItem(d[1], d[2], d[3])) %}
math_macro -> "\\math" _:? version:? attrs:? (arg:* {% id %}) "{% " .:* " %}" {% (d, _, reject) => {
	const string = d[6].join('').trim();
	if (string && string.includes("%\}")) { 
		return reject;
	}
	return getItem("math", d[3],[[string]],d[2]);
} %}

# Data macros
mx_macro -> "\\mx{" _:? rows _:? "}" {% d => getData("mx", d[2]) %}

# matrix
row -> value (_:+ value {% d => d[1] %}):* {% d => [d[0], ...d[1]] %}
rows -> row ( _:? ";" _:? row {% d => d[3] %}):*
    {% d => {
        if (d[1].length === 0) {
            return d[0];
        }
        return [d[0], ...d[1]];
    } %}

version -> "(" float ")" {% d => d[1] %}
attrs -> "[" key_vals:? "]" {% d => d[1] %}
arg ->
	"{"
	(_:? sentence {% d => d[1] %}):?
	(
		(
			(_:? macros {% d => d[1] %}) (_ sentence {% d => d[1] %}):?
			{% d => collapse(d) %}
		):* {% d => flatten(d[0]) %}
	)
	_:?
	"}"
	{% d => collapse([d[1], ...d[2]]) %}

key_vals -> key_val ("," key_val {% d => d[1] %}):* {% d => Object.fromEntries([d[0], ...d[1]]) %}
key_val -> _:? name_token ("=" value {% d => d[1] %}):?  _:? {% d => [d[1], d[2]] %}
name_token -> [_A-Za-z] [_A-Za-z0-9]:* {% d => d[0] + d[1].join('') %}
sentence -> string_token ((_ string_token) {% d => d[0].join('') %}):* {% d => d[0] + d[1].join('') %}

# English and Persian alphabets
value -> (float | string_only | quoted_string | boolean | array) {% d => d[0][0] %}

# array
array -> "[" _:? (rows _:? {% d => d[0] %}):? "]" {% d => d[2] ?? [] %}

# I use `float` to basically mean a number with a decimal point in it
string_token -> [0-9\w\u0600-\u06FF=％÷×+/\:<>.\u200C,;()?!-]:+ {% d => d[0].join('') %}
quoted_string -> "\""
    ([^"]:+ {% d => d[0].join('') %})
    ("\\\"":+ [^"]:+ {% d => d[0].join('') + d[1].join('') %}):*
    "\""
    {% d => d[1] + d[2].join('') %}

# I use `float` to basically mean a number with a decimal point in it
string_only -> [0-9\w\u0600-\u06FF]:+ {%
	(d, l, reject) => {
		const cat = d[0].join('');
		if (cat.match(/^[0-9]+(\.[0-9]+)?$/))
			return reject;
		return cat;
	}
%}

# \true or \false
boolean -> "\\" (("true" | "false") {% d => d[0][0] === "true" ? true : false %}) {% d => d[1] %}

# parsing numbers
float ->
    ("-"|"+"):? numb "." numb		{% d => parseFloat(d.join("")) %}
	| "." numb 		{% d => parseFloat(d.join("")) %}
    | int           {% id %}

int -> ("-"|"+"):? numb        {% d => parseInt(d.join("")) %}
numb -> [0-9]:+        {% d => d[0].join("") %}

# whitespace
_ -> [\s\r\n]:+ {% d => d[0].join('') %}
