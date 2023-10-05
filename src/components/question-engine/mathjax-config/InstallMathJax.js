import { inputConfig, InstallInputCommand } from './InstallInputCommand';
import { installArabicFont } from './InstallArabicFont';

// basic overview about better-react-mathjax's configuration
// https://www.npmjs.com/package/better-react-mathjax

// used cancel package according to this
// https://github.com/mathjax/MathJax-docs/blob/master/input/tex/extensions/cancel.rst
export const mathJaxConfig = {
    ...inputConfig,
    // loader: {load: ['[tex]/cancel']},
    // tex: {packages: {'[+]': [...inputConfig.tex.packages["[+]"], 'cancel']}},
};

export const MathJaxOnStartup = (mathJax) => {
    installArabicFont(mathJax);
    InstallInputCommand(mathJax);
    mathJax.startup.defaultReady();
};
