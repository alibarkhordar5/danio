// General imports
import React, { useRef, useCallback, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Card } from '@mui/material';
// Custom components
import QuestionEngine from 'src/components/question-engine';
import { useSettingsContext } from 'src/components/settings';
import { alpha, useTheme } from '@mui/material/styles';
import { QuestionProvider } from 'src/student-sections/question/view';

const Index = () => {
    const [content, setContent] = useState(``);
    const [stagedContent, setStagedContent] = useState(content);

    const timeout = useRef(null);
    const onChange = useCallback((ev) => {
        setContent(ev.target.value);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            setStagedContent(ev.target.value);
        }, 1000);
    }, []);

    const formRef = useRef();

    const onSubmit_ = (event) => {
        event.preventDefault();
    };

    const onSubmit = (event) => formRef.current.handleSubmit(onSubmit_)(event);

    const settings = useSettingsContext();

    return (
        <Box component={'form'} onSubmit={onSubmit}>
            <Box sx={{ direction: 'ltr' }}>
                <TextField
                    label={'ورودی'}
                    value={content}
                    onChange={onChange}
                    multiline
                    rows={10}
                    sx={{ width: '100%', '& textarea': { direction: 'rtl' } }}
                />
            </Box>

            <Box maxWidth={settings.themeStretch ? false : 'xl'} sx={{ mt: '20px' }}>
                <Card
                    component="div"
                    sx={{
                        bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                        backdropFilter: `blur(2px)`,
                        padding: '15px 20px',
                    }}
                >
                    <QuestionProvider>
                        <QuestionEngine content={stagedContent} setUser_answer={() => {}} answerToPut={{}} />
                    </QuestionProvider>
                </Card>
            </Box>
        </Box>
    );
};

export default Index;
