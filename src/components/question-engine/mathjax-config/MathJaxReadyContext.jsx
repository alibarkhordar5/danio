import React, { useState } from "react";

export const MathJaxReadyContext = React.createContext([false, () => { }]);

export const MathJaxProvider = (props) => {
    const [isMathJaxReady, setIsMathJaxReady] = useState(false);
    return (
        <MathJaxReadyContext.Provider value={[isMathJaxReady, setIsMathJaxReady]}>
            {props.children}
        </MathJaxReadyContext.Provider>
    )
};
