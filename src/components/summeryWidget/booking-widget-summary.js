import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// utils
import { fShortenNumber } from 'src/utils/format-number';
import { getPersianNumber } from 'src/utils/get-persian-number';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function BookingWidgetSummary({ title, total, icon, sx, ...other }) {
    const theme = useTheme();
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                pl: 3,
                ...sx,
            }}
            {...other}
        >
            <Box>
                <Box sx={{ mb: 1, typography: 'h3' }}>{getPersianNumber(total)}</Box>
                <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>{title}</Box>
            </Box>

            <Box
                sx={{
                    width: 120,
                    height: 120,
                    lineHeight: 0,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.light, 0.2),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {icon}
            </Box>
        </Card>
    );
}

BookingWidgetSummary.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sx: PropTypes.object,
    title: PropTypes.string,
    total: PropTypes.number,
};
