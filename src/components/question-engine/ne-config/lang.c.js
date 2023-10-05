// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function Lang() {
    function id(x) {
        return x[0];
    }

    const getItem = (tag, attrs, args, v) => ({ type: 'elem', tag, attrs, args, v });
    const getData = (tag, val) => ({ type: 'data', tag, val });
    const collapse = (array) => (array ? array.filter((d) => d) : array);
    const flatten = (arrayOfArrays) => [].concat.apply([], arrayOfArrays);
    var grammar = {
        Lexer: undefined,
        ParserRules: [
            { name: 'main$ebnf$1', symbols: [] },
            { name: 'main$ebnf$1$subexpression$1$ebnf$1', symbols: ['_'], postprocess: id },
            {
                name: 'main$ebnf$1$subexpression$1$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'main$ebnf$1$subexpression$1',
                symbols: ['main$ebnf$1$subexpression$1$ebnf$1', 'macros'],
                postprocess: (d) => d[1],
            },
            {
                name: 'main$ebnf$1',
                symbols: ['main$ebnf$1', 'main$ebnf$1$subexpression$1'],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            { name: 'main$ebnf$2', symbols: ['_'], postprocess: id },
            {
                name: 'main$ebnf$2',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'main', symbols: ['main$ebnf$1', 'main$ebnf$2'], postprocess: (d) => d[0] },
            { name: 'macros$subexpression$1', symbols: ['macro'] },
            { name: 'macros$subexpression$1', symbols: ['math_macro'] },
            { name: 'macros$subexpression$1', symbols: ['mx_macro'] },
            { name: 'macros', symbols: ['macros$subexpression$1'], postprocess: (d) => d[0][0] },
            { name: 'macro$subexpression$1', symbols: ['name_token'], postprocess: (d) => d[0] },
            { name: 'macro$ebnf$1', symbols: ['version'], postprocess: id },
            {
                name: 'macro$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'macro$ebnf$2', symbols: ['attrs'], postprocess: id },
            {
                name: 'macro$ebnf$2',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'macro$subexpression$2$ebnf$1', symbols: [] },
            {
                name: 'macro$subexpression$2$ebnf$1',
                symbols: ['macro$subexpression$2$ebnf$1', 'arg'],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            { name: 'macro$subexpression$2', symbols: ['macro$subexpression$2$ebnf$1'], postprocess: id },
            {
                name: 'macro',
                symbols: [
                    { literal: '\\' },
                    'macro$subexpression$1',
                    'macro$ebnf$1',
                    'macro$ebnf$2',
                    'macro$subexpression$2',
                ],
                postprocess: (d, _, reject) => {
                    if (['mx'].includes(d[1])) return reject;
                    return getItem(d[1], d[3], d[4], d[2]);
                },
            },
            {
                name: 'math_macro$string$1',
                symbols: [{ literal: '\\' }, { literal: 'm' }, { literal: 'a' }, { literal: 't' }, { literal: 'h' }],
                postprocess: function joiner(d) {
                    return d.join('');
                },
            },
            { name: 'math_macro$ebnf$1', symbols: ['_'], postprocess: id },
            {
                name: 'math_macro$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'math_macro$ebnf$2', symbols: ['version'], postprocess: id },
            {
                name: 'math_macro$ebnf$2',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'math_macro$ebnf$3', symbols: ['attrs'], postprocess: id },
            {
                name: 'math_macro$ebnf$3',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'math_macro$subexpression$1$ebnf$1', symbols: [] },
            {
                name: 'math_macro$subexpression$1$ebnf$1',
                symbols: ['math_macro$subexpression$1$ebnf$1', 'arg'],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            { name: 'math_macro$subexpression$1', symbols: ['math_macro$subexpression$1$ebnf$1'], postprocess: id },
            {
                name: 'math_macro$string$2',
                symbols: [{ literal: '{' }, { literal: '%' }, { literal: ' ' }],
                postprocess: function joiner(d) {
                    return d.join('');
                },
            },
            { name: 'math_macro$ebnf$4', symbols: [] },
            {
                name: 'math_macro$ebnf$4',
                symbols: ['math_macro$ebnf$4', /./],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            {
                name: 'math_macro$string$3',
                symbols: [{ literal: ' ' }, { literal: '%' }, { literal: '}' }],
                postprocess: function joiner(d) {
                    return d.join('');
                },
            },
            {
                name: 'math_macro',
                symbols: [
                    'math_macro$string$1',
                    'math_macro$ebnf$1',
                    'math_macro$ebnf$2',
                    'math_macro$ebnf$3',
                    'math_macro$subexpression$1',
                    'math_macro$string$2',
                    'math_macro$ebnf$4',
                    'math_macro$string$3',
                ],
                postprocess: (d, _, reject) => {
                    const string = d[6].join('').trim();
                    if (string && string.includes('%}')) {
                        return reject;
                    }
                    return getItem('math', d[3], [[string]], d[2]);
                },
            },
            {
                name: 'mx_macro$string$1',
                symbols: [{ literal: '\\' }, { literal: 'm' }, { literal: 'x' }, { literal: '{' }],
                postprocess: function joiner(d) {
                    return d.join('');
                },
            },
            { name: 'mx_macro$ebnf$1', symbols: ['_'], postprocess: id },
            {
                name: 'mx_macro$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'mx_macro$ebnf$2', symbols: ['_'], postprocess: id },
            {
                name: 'mx_macro$ebnf$2',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'mx_macro',
                symbols: ['mx_macro$string$1', 'mx_macro$ebnf$1', 'rows', 'mx_macro$ebnf$2', { literal: '}' }],
                postprocess: (d) => getData('mx', d[2]),
            },
            { name: 'row$ebnf$1', symbols: [] },
            { name: 'row$ebnf$1$subexpression$1$ebnf$1', symbols: ['_'] },
            {
                name: 'row$ebnf$1$subexpression$1$ebnf$1',
                symbols: ['row$ebnf$1$subexpression$1$ebnf$1', '_'],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            {
                name: 'row$ebnf$1$subexpression$1',
                symbols: ['row$ebnf$1$subexpression$1$ebnf$1', 'value'],
                postprocess: (d) => d[1],
            },
            {
                name: 'row$ebnf$1',
                symbols: ['row$ebnf$1', 'row$ebnf$1$subexpression$1'],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            { name: 'row', symbols: ['value', 'row$ebnf$1'], postprocess: (d) => [d[0], ...d[1]] },
            { name: 'rows$ebnf$1', symbols: [] },
            { name: 'rows$ebnf$1$subexpression$1$ebnf$1', symbols: ['_'], postprocess: id },
            {
                name: 'rows$ebnf$1$subexpression$1$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'rows$ebnf$1$subexpression$1$ebnf$2', symbols: ['_'], postprocess: id },
            {
                name: 'rows$ebnf$1$subexpression$1$ebnf$2',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'rows$ebnf$1$subexpression$1',
                symbols: [
                    'rows$ebnf$1$subexpression$1$ebnf$1',
                    { literal: ';' },
                    'rows$ebnf$1$subexpression$1$ebnf$2',
                    'row',
                ],
                postprocess: (d) => d[3],
            },
            {
                name: 'rows$ebnf$1',
                symbols: ['rows$ebnf$1', 'rows$ebnf$1$subexpression$1'],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            {
                name: 'rows',
                symbols: ['row', 'rows$ebnf$1'],
                postprocess: (d) => {
                    if (d[1].length === 0) {
                        return d[0];
                    }
                    return [d[0], ...d[1]];
                },
            },
            { name: 'version', symbols: [{ literal: '(' }, 'float', { literal: ')' }], postprocess: (d) => d[1] },
            { name: 'attrs$ebnf$1', symbols: ['key_vals'], postprocess: id },
            {
                name: 'attrs$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'attrs', symbols: [{ literal: '[' }, 'attrs$ebnf$1', { literal: ']' }], postprocess: (d) => d[1] },
            { name: 'arg$ebnf$1$subexpression$1$ebnf$1', symbols: ['_'], postprocess: id },
            {
                name: 'arg$ebnf$1$subexpression$1$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'arg$ebnf$1$subexpression$1',
                symbols: ['arg$ebnf$1$subexpression$1$ebnf$1', 'sentence'],
                postprocess: (d) => d[1],
            },
            { name: 'arg$ebnf$1', symbols: ['arg$ebnf$1$subexpression$1'], postprocess: id },
            {
                name: 'arg$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'arg$subexpression$1$ebnf$1', symbols: [] },
            {
                name: 'arg$subexpression$1$ebnf$1$subexpression$1$subexpression$1$ebnf$1',
                symbols: ['_'],
                postprocess: id,
            },
            {
                name: 'arg$subexpression$1$ebnf$1$subexpression$1$subexpression$1$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'arg$subexpression$1$ebnf$1$subexpression$1$subexpression$1',
                symbols: ['arg$subexpression$1$ebnf$1$subexpression$1$subexpression$1$ebnf$1', 'macros'],
                postprocess: (d) => d[1],
            },
            {
                name: 'arg$subexpression$1$ebnf$1$subexpression$1$ebnf$1$subexpression$1',
                symbols: ['_', 'sentence'],
                postprocess: (d) => d[1],
            },
            {
                name: 'arg$subexpression$1$ebnf$1$subexpression$1$ebnf$1',
                symbols: ['arg$subexpression$1$ebnf$1$subexpression$1$ebnf$1$subexpression$1'],
                postprocess: id,
            },
            {
                name: 'arg$subexpression$1$ebnf$1$subexpression$1$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'arg$subexpression$1$ebnf$1$subexpression$1',
                symbols: [
                    'arg$subexpression$1$ebnf$1$subexpression$1$subexpression$1',
                    'arg$subexpression$1$ebnf$1$subexpression$1$ebnf$1',
                ],
                postprocess: (d) => collapse(d),
            },
            {
                name: 'arg$subexpression$1$ebnf$1',
                symbols: ['arg$subexpression$1$ebnf$1', 'arg$subexpression$1$ebnf$1$subexpression$1'],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            { name: 'arg$subexpression$1', symbols: ['arg$subexpression$1$ebnf$1'], postprocess: (d) => flatten(d[0]) },
            { name: 'arg$ebnf$2', symbols: ['_'], postprocess: id },
            {
                name: 'arg$ebnf$2',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'arg',
                symbols: [{ literal: '{' }, 'arg$ebnf$1', 'arg$subexpression$1', 'arg$ebnf$2', { literal: '}' }],
                postprocess: (d) => collapse([d[1], ...d[2]]),
            },
            { name: 'key_vals$ebnf$1', symbols: [] },
            {
                name: 'key_vals$ebnf$1$subexpression$1',
                symbols: [{ literal: ',' }, 'key_val'],
                postprocess: (d) => d[1],
            },
            {
                name: 'key_vals$ebnf$1',
                symbols: ['key_vals$ebnf$1', 'key_vals$ebnf$1$subexpression$1'],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            {
                name: 'key_vals',
                symbols: ['key_val', 'key_vals$ebnf$1'],
                postprocess: (d) => Object.fromEntries([d[0], ...d[1]]),
            },
            { name: 'key_val$ebnf$1', symbols: ['_'], postprocess: id },
            {
                name: 'key_val$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'key_val$ebnf$2$subexpression$1', symbols: [{ literal: '=' }, 'value'], postprocess: (d) => d[1] },
            { name: 'key_val$ebnf$2', symbols: ['key_val$ebnf$2$subexpression$1'], postprocess: id },
            {
                name: 'key_val$ebnf$2',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'key_val$ebnf$3', symbols: ['_'], postprocess: id },
            {
                name: 'key_val$ebnf$3',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'key_val',
                symbols: ['key_val$ebnf$1', 'name_token', 'key_val$ebnf$2', 'key_val$ebnf$3'],
                postprocess: (d) => [d[1], d[2]],
            },
            { name: 'name_token$ebnf$1', symbols: [] },
            {
                name: 'name_token$ebnf$1',
                symbols: ['name_token$ebnf$1', /[_A-Za-z0-9]/],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            {
                name: 'name_token',
                symbols: [/[_A-Za-z]/, 'name_token$ebnf$1'],
                postprocess: (d) => d[0] + d[1].join(''),
            },
            { name: 'sentence$ebnf$1', symbols: [] },
            { name: 'sentence$ebnf$1$subexpression$1$subexpression$1', symbols: ['_', 'string_token'] },
            {
                name: 'sentence$ebnf$1$subexpression$1',
                symbols: ['sentence$ebnf$1$subexpression$1$subexpression$1'],
                postprocess: (d) => d[0].join(''),
            },
            {
                name: 'sentence$ebnf$1',
                symbols: ['sentence$ebnf$1', 'sentence$ebnf$1$subexpression$1'],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            {
                name: 'sentence',
                symbols: ['string_token', 'sentence$ebnf$1'],
                postprocess: (d) => d[0] + d[1].join(''),
            },
            { name: 'value$subexpression$1', symbols: ['float'] },
            { name: 'value$subexpression$1', symbols: ['string_only'] },
            { name: 'value$subexpression$1', symbols: ['quoted_string'] },
            { name: 'value$subexpression$1', symbols: ['boolean'] },
            { name: 'value$subexpression$1', symbols: ['array'] },
            { name: 'value', symbols: ['value$subexpression$1'], postprocess: (d) => d[0][0] },
            { name: 'array$ebnf$1', symbols: ['_'], postprocess: id },
            {
                name: 'array$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'array$ebnf$2$subexpression$1$ebnf$1', symbols: ['_'], postprocess: id },
            {
                name: 'array$ebnf$2$subexpression$1$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'array$ebnf$2$subexpression$1',
                symbols: ['rows', 'array$ebnf$2$subexpression$1$ebnf$1'],
                postprocess: (d) => d[0],
            },
            { name: 'array$ebnf$2', symbols: ['array$ebnf$2$subexpression$1'], postprocess: id },
            {
                name: 'array$ebnf$2',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'array',
                symbols: [{ literal: '[' }, 'array$ebnf$1', 'array$ebnf$2', { literal: ']' }],
                postprocess: (d) => d[2] ?? [],
            },
            { name: 'string_token$ebnf$1', symbols: [/[0-9\w\u0600-\u06FF=％÷×+/\:<>.\u200C,;()?!-]/] },
            {
                name: 'string_token$ebnf$1',
                symbols: ['string_token$ebnf$1', /[0-9\w\u0600-\u06FF=％÷×+/\:<>.\u200C,;()?!-]/],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            { name: 'string_token', symbols: ['string_token$ebnf$1'], postprocess: (d) => d[0].join('') },
            { name: 'quoted_string$subexpression$1$ebnf$1', symbols: [/[^"]/] },
            {
                name: 'quoted_string$subexpression$1$ebnf$1',
                symbols: ['quoted_string$subexpression$1$ebnf$1', /[^"]/],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            {
                name: 'quoted_string$subexpression$1',
                symbols: ['quoted_string$subexpression$1$ebnf$1'],
                postprocess: (d) => d[0].join(''),
            },
            { name: 'quoted_string$ebnf$1', symbols: [] },
            {
                name: 'quoted_string$ebnf$1$subexpression$1$ebnf$1$string$1',
                symbols: [{ literal: '\\' }, { literal: '"' }],
                postprocess: function joiner(d) {
                    return d.join('');
                },
            },
            {
                name: 'quoted_string$ebnf$1$subexpression$1$ebnf$1',
                symbols: ['quoted_string$ebnf$1$subexpression$1$ebnf$1$string$1'],
            },
            {
                name: 'quoted_string$ebnf$1$subexpression$1$ebnf$1$string$2',
                symbols: [{ literal: '\\' }, { literal: '"' }],
                postprocess: function joiner(d) {
                    return d.join('');
                },
            },
            {
                name: 'quoted_string$ebnf$1$subexpression$1$ebnf$1',
                symbols: [
                    'quoted_string$ebnf$1$subexpression$1$ebnf$1',
                    'quoted_string$ebnf$1$subexpression$1$ebnf$1$string$2',
                ],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            { name: 'quoted_string$ebnf$1$subexpression$1$ebnf$2', symbols: [/[^"]/] },
            {
                name: 'quoted_string$ebnf$1$subexpression$1$ebnf$2',
                symbols: ['quoted_string$ebnf$1$subexpression$1$ebnf$2', /[^"]/],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            {
                name: 'quoted_string$ebnf$1$subexpression$1',
                symbols: ['quoted_string$ebnf$1$subexpression$1$ebnf$1', 'quoted_string$ebnf$1$subexpression$1$ebnf$2'],
                postprocess: (d) => d[0].join('') + d[1].join(''),
            },
            {
                name: 'quoted_string$ebnf$1',
                symbols: ['quoted_string$ebnf$1', 'quoted_string$ebnf$1$subexpression$1'],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            {
                name: 'quoted_string',
                symbols: [{ literal: '"' }, 'quoted_string$subexpression$1', 'quoted_string$ebnf$1', { literal: '"' }],
                postprocess: (d) => d[1] + d[2].join(''),
            },
            { name: 'string_only$ebnf$1', symbols: [/[0-9\w\u0600-\u06FF]/] },
            {
                name: 'string_only$ebnf$1',
                symbols: ['string_only$ebnf$1', /[0-9\w\u0600-\u06FF]/],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            {
                name: 'string_only',
                symbols: ['string_only$ebnf$1'],
                postprocess: (d, l, reject) => {
                    const cat = d[0].join('');
                    if (cat.match(/^[0-9]+(\.[0-9]+)?$/)) return reject;
                    return cat;
                },
            },
            {
                name: 'boolean$subexpression$1$subexpression$1$string$1',
                symbols: [{ literal: 't' }, { literal: 'r' }, { literal: 'u' }, { literal: 'e' }],
                postprocess: function joiner(d) {
                    return d.join('');
                },
            },
            {
                name: 'boolean$subexpression$1$subexpression$1',
                symbols: ['boolean$subexpression$1$subexpression$1$string$1'],
            },
            {
                name: 'boolean$subexpression$1$subexpression$1$string$2',
                symbols: [{ literal: 'f' }, { literal: 'a' }, { literal: 'l' }, { literal: 's' }, { literal: 'e' }],
                postprocess: function joiner(d) {
                    return d.join('');
                },
            },
            {
                name: 'boolean$subexpression$1$subexpression$1',
                symbols: ['boolean$subexpression$1$subexpression$1$string$2'],
            },
            {
                name: 'boolean$subexpression$1',
                symbols: ['boolean$subexpression$1$subexpression$1'],
                postprocess: (d) => (d[0][0] === 'true' ? true : false),
            },
            { name: 'boolean', symbols: [{ literal: '\\' }, 'boolean$subexpression$1'], postprocess: (d) => d[1] },
            { name: 'float$ebnf$1$subexpression$1', symbols: [{ literal: '-' }] },
            { name: 'float$ebnf$1$subexpression$1', symbols: [{ literal: '+' }] },
            { name: 'float$ebnf$1', symbols: ['float$ebnf$1$subexpression$1'], postprocess: id },
            {
                name: 'float$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            {
                name: 'float',
                symbols: ['float$ebnf$1', 'numb', { literal: '.' }, 'numb'],
                postprocess: (d) => parseFloat(d.join('')),
            },
            { name: 'float', symbols: [{ literal: '.' }, 'numb'], postprocess: (d) => parseFloat(d.join('')) },
            { name: 'float', symbols: ['int'], postprocess: id },
            { name: 'int$ebnf$1$subexpression$1', symbols: [{ literal: '-' }] },
            { name: 'int$ebnf$1$subexpression$1', symbols: [{ literal: '+' }] },
            { name: 'int$ebnf$1', symbols: ['int$ebnf$1$subexpression$1'], postprocess: id },
            {
                name: 'int$ebnf$1',
                symbols: [],
                postprocess: function (d) {
                    return null;
                },
            },
            { name: 'int', symbols: ['int$ebnf$1', 'numb'], postprocess: (d) => parseInt(d.join('')) },
            { name: 'numb$ebnf$1', symbols: [/[0-9]/] },
            {
                name: 'numb$ebnf$1',
                symbols: ['numb$ebnf$1', /[0-9]/],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            { name: 'numb', symbols: ['numb$ebnf$1'], postprocess: (d) => d[0].join('') },
            { name: '_$ebnf$1', symbols: [/[\s\r\n]/] },
            {
                name: '_$ebnf$1',
                symbols: ['_$ebnf$1', /[\s\r\n]/],
                postprocess: function arrpush(d) {
                    return d[0].concat([d[1]]);
                },
            },
            { name: '_', symbols: ['_$ebnf$1'], postprocess: (d) => d[0].join('') },
        ],
        ParserStart: 'main',
    };
    return { grammar };
    // if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    //     module.exports = grammar;
    // } else {
    //     window.grammar = grammar;
    // }
}

export default Lang;
