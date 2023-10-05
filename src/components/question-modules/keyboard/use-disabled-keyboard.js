import { useContext, useEffect, useState } from 'react';
import { QuestionContext } from 'src/student-sections/question/view';
import { isMobile } from 'react-device-detect';

const useDisabledKeyboard = (data) => {
    const { textFieldRef, type } = data;
    // const { showKeyboard, setShowKeyboard } = useContext(QuestionContext);
    // const [showKeyboard, setShowKeyboard] = useState(false);

    // console.log('showKeyboard', showKeyboard);
    const [value, setValue] = useState('');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [id, setId] = useState('');

    const handleFocus = (event) => {
        if (isMobile) {
            // Prevent the default behavior of showing the keyboard on focus
            event.preventDefault();

            // Optionally, you can add your custom interaction logic here
            setShowKeyboard(true);

            // Manually blur the input to prevent the keyboard from showing
            event.target.blur();

            setTimeout(() => {
                event.target.scrollIntoView({ block: 'center' });
            }, 100);
        }
    };

    useEffect(() => {
        if (id) {
            setShowKeyboard(true);
        }
    }, [id]);

    // Add your logic for when the focus is out of the TextField here
    const handleBlur = () => {
        if (isMobile) {
            setShowKeyboard(false);
        }
    };

    // Prevent the click event from bubbling up to the parent elements
    const handleBoxClick = (event) => {
        event.stopPropagation();
    };

    const idSetter = (id) => {
        setId(id);
    };

    useEffect(() => {
        const close = document.getElementById('closeKeyboard');
        if (isMobile) {
            if (close) {
                close.addEventListener('click', () => {
                    handleBlur();
                });
            }
            // Add event listener to the window object to detect clicks outside the TextField
            const handleWindowClick = (event) => {
                if (textFieldRef && textFieldRef.current && !textFieldRef.current.contains(event.target)) {
                    handleBlur();
                } else if (document.getElementById(id) && !document.getElementById(id).contains(event.target)) {
                    handleBlur();
                }
            };

            window.addEventListener('click', handleWindowClick);

            // Clean up the event listener when the component unmounts
            return () => {
                window.removeEventListener('click', handleWindowClick);
            };
        }
    }, [isMobile, id]);

    useEffect(() => {
        if (isMobile) {
            // // When the showKeyboard state changes, adjust the height of the root container
            // const updateHeight = () => {
            //     const appContainer = document.getElementById('root');
            //     if (appContainer) {
            //         appContainer.style.height = showKeyboard ? 'calc(100vh + 480px)' : '100vh';
            //     }
            //     if (showKeyboard) {
            //         // Scroll to the bottom of the page when the keyboard is shown
            //         window.scrollTo({
            //             top: document.body.scrollHeight,
            //             behavior: 'smooth',
            //         });
            //     }
            // };

            // updateHeight();

            // // Cleanup function to reset the height when the component unmounts
            // return () => {
            //     const appContainer = document.getElementById('app');
            //     if (appContainer) {
            //         appContainer.style.height = '100vh';
            //     }
            // };
        }
    }, [showKeyboard, isMobile]);

    return { handleFocus, value, setValue, showKeyboard, handleBoxClick, idSetter, id, setId, setShowKeyboard };
};

export default useDisabledKeyboard;
