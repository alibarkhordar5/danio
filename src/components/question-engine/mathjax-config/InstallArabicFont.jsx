import { bold, boldItalic, italic, normal } from './chars';

// https://github.com/mathjax/MathJax/issues/2581#issuecomment-746655672

/**
 * Installs arabic/persian fonts.
 * @param mathJax: MathJaxObject (v3)
 */
export const installArabicFont = (mathJax) => {
    //
    //  If you make your own component, these would be obtained
    //  via require() or import commands
    //
    const TeXFont = mathJax._.output.chtml.fonts.tex_ts.TeXFont;
    const Package = mathJax._.components.package.Package;

    //
    //  Font data, by variant and Unicode position.  The array is
    //  height, depth, width, and additional information.  Here f gives
    //  the font specifier (which refers to the defaultStyles and
    //  defaultFonts given below).
    //
    const chars = {
        normal,
        bold,
        italic,
        'bold-italic': boldItalic,
    };

    class MyFont extends TeXFont {
        constructor(options) {
            super(options);
            //
            //  Add in the characters for the substitute font defined in chars
            //
            for (const variant of Object.keys(chars)) {
                this.defineChars(variant, chars[variant]);
            }
        }
    }

    //
    //  Add the font styles to select the proper fonts
    //
    Object.assign(MyFont.defaultStyles, {
        // arabic digit
        '.TEX-AD-R': {
            'font-family': 'Yas, MJXZERO',
        },
        '.TEX-AD-B': {
            'font-family': 'Yas-Bold, MJXZERO',
        },
        '.TEX-AD-I': {
            'font-family': 'Yas-Italic, MJXZERO',
        },
        '.TEX-AD-BI': {
            'font-family': 'Yas-BoldItalic, MJXZERO',
        },

        // arabic character
        '.TEX-AC-R, .TEX-AC-R::before': {
            'font-family': 'Estedad-VF, MJXZERO',
            display: 'inline',
        },
        '.TEX-AC-B, .TEX-AC-B::before': {
            'font-family': 'Estedad-VF, MJXZERO',
            'font-weight': 700,
            display: 'inline',
        },
        '.TEX-AC-I, .TEX-AC-I::before': {
            'font-family': 'Estedad-VF, MJXZERO',
            'font-style': 'italic',
            display: 'inline',
        },
        '.TEX-AC-BI, .TEX-AC-BI::before': {
            'font-family': 'Estedad-VF, MJXZERO',
            'font-style': 'italic',
            'font-weight': 700,
            display: 'inline',
        },

        // arabic character
        '.TEX-AC-R, .TEX-AC-R::before': {
            'font-family': 'Estedad-VF, MJXZERO',
            display: 'inline',
        },
        '.TEX-AC-B, .TEX-AC-B::before': {
            'font-family': 'Estedad-VF, MJXZERO',
            'font-weight': 700,
            display: 'inline',
        },
        '.TEX-AC-I, .TEX-AC-I::before': {
            'font-family': 'Estedad-VF, MJXZERO',
            'font-style': 'italic',
            display: 'inline',
        },
        '.TEX-AC-BI, .TEX-AC-BI::before': {
            'font-family': 'Estedad-VF, MJXZERO',
            'font-style': 'italic',
            'font-weight': 700,
            display: 'inline',
        },
    });

    // //
    // //  Add the font definitions (using local fonts, but could be web fonts)
    // //
    // Object.assign(MyFont.defaultFonts, {
    //     '@font-face /* AD-R */': {
    //         'font-family': 'Yas',
    //         src: 'url("/fonts/yas/yas.ttf")'
    //     },
    //     '@font-face /* AD-B */': {
    //         'font-family': 'Yas-Bold',
    //         src: 'url("/fonts/yas/yas-bd.ttf")'
    //     },
    //     '@font-face /* AD-I */': {
    //         'font-family': 'Yas-Italic',
    //         src: 'url("/fonts/yas/yas-it.ttf")'
    //     },
    //     '@font-face /* AD-BI */': {
    //         'font-family': 'Yas-BoldItalic',
    //         src: 'url("/fonts/yas/yas-bdit.ttf")'
    //     }
    // });

    //
    //  Configure CommonHTML to use the new font
    //
    mathJax.config.chtml = { font: new MyFont({ fontURL: Package.resolvePath('output/chtml/fonts/woff-v2', false) }) };
};
