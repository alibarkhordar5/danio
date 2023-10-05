import React, { useCallback, useContext } from 'react';
import { MathJaxReadyContext } from '../mathjax-config/MathJaxReadyContext';
import { MathJaxContext } from 'better-react-mathjax';
import { mathJaxConfig, MathJaxOnStartup } from '../mathjax-config/InstallMathJax';

export const MathJaxWrapper = (props) => {
    const [, setIsMathJaxReady] = useContext(MathJaxReadyContext);
    const startupPageReady = useCallback(() => {
        setIsMathJaxReady(true);
    }, [setIsMathJaxReady]);

    return (
        <MathJaxContext
            config={{
                ...mathJaxConfig,
                startup: {
                    pageReady: startupPageReady,
                },
            }}
            onStartup={MathJaxOnStartup}
        >
            {props.children}
        </MathJaxContext>
    );
};
