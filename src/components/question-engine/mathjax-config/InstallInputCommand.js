export const inputConfig = {
    tex: { packages: { '[+]': ['input'] } },
};

/**
 * Installs \input command.
 *  * \input[id=unique_id, width=2]
 *  * \input[id=unique_id]
 *
 * @param mathJax: MathJaxObject (v3)
 */
export const InstallInputCommand = (mathJax) => {
    // const [value, setValue] = useState('');
    // console.log('value math input', value);
    const Configuration = mathJax._.input.tex.Configuration.Configuration;
    const CommandMap = mathJax._.input.tex.SymbolMap.CommandMap;
    const TEXCLASS = mathJax._.core.MmlTree.MmlNode.TEXCLASS;

    new CommandMap(
        'input',
        { input: 'Input' },
        {
            Input(parser, name) {
                const attributes = parser.GetBrackets(name, '');
                let parsedAttributes = attributes.split(',');
                parsedAttributes = parsedAttributes.map((attr) => {
                    let kv = attr.trim().split('=');
                    if (kv.length === 1) {
                        kv = kv.concat(undefined);
                    }
                    return kv.map((token) => (token ? token.trim() : token));
                });
                parsedAttributes = Object.fromEntries(parsedAttributes);
                const { id, w = 40, type = 'str', h = 10 } = parsedAttributes;

                const xml = parser.create('node', 'XML');
                xml.setXML(
                    mathJax.startup.adaptor.node('input', {
                        // xmlns: 'http://www.w3.org/1999/xhtml',
                        style: `width: ${w}px; min-height: ${h}px;`,
                        id,
                        class: 'input_mathjax',
                        autocomplete: 'off',
                        // readonly: window.innerWidth < 768 ? 'readonly' : null,
                    }),
                    mathJax.startup.adaptor
                );
                parser.Push(
                    parser.create(
                        'node',
                        'TeXAtom',
                        [
                            parser.create('node', 'semantics', [
                                parser.create('node', 'annotation-xml', [xml], { encoding: 'application/xhtml+xml' }),
                            ]),
                        ],
                        { texClass: TEXCLASS.ORD }
                    )
                );
            },
        }
    );
    Configuration.create('input', { handler: { macro: ['input'] } });
};
