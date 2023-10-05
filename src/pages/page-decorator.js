import Box from '@mui/material/Box';

export default function PageDecorator({ children }) {
    return <Box sx={{ pb: 4 }}>{children}</Box>;
}
