import { Box } from '@mui/material';
import React, { useState, createContext } from 'react';
import { useEffect } from 'react';

export const SelectContext = createContext();

export const SelectProvider = ({ multi, answerToPut, setUser_answer, id, children, fullWidth }) => {
    const [selected, setSelected] = useState(multi ? [] : '');

    useEffect(() => {
        console.log(selected);
        if (!(answerToPut && answerToPut[id]) && setUser_answer) {
            setUser_answer(id, selected);
        }
    }, [selected]);

    useEffect(() => {
        if (answerToPut && answerToPut[id]) {
            setSelected(answerToPut[id]);
        }
    }, [answerToPut]);

    return (
        <SelectContext.Provider value={{ selected: selected, setSelected: setSelected, multi: multi, id: id, fullWidth: fullWidth }}>
            {children}
        </SelectContext.Provider>
    );
};

const Index = (props) => {
    const { showingAttrs, answerToPut, setUser_answer, children } = props;
    const { multi, id, fullWidth } = showingAttrs;

    return (
        <SelectProvider {...props} multi={multi} id={id} fullWidth={fullWidth}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'stretch', flexWrap: 'wrap' }}>
                {children}
            </Box>
        </SelectProvider>
    );
};

export default Index;
