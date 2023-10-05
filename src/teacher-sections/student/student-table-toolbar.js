import PropTypes from 'prop-types';
import { useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
// components
import Iconify from 'src/components/iconify';
// util
import { fGrade } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function StudentTableToolbar({ filters, onFilters, gradeOptions, studentPage }) {
    const handleFilterName = useCallback(
        (event) => {
            onFilters('name', event.target.value);
        },
        [onFilters]
    );

    const handleFilterGrade = useCallback(
        (event) => {
            onFilters('grade', event.target.value);
        },
        [onFilters]
    );

    return (
        <Stack
            spacing={2}
            alignItems={{ xs: 'flex-end', md: 'center' }}
            direction={{
                xs: 'column',
                md: 'row',
            }}
            sx={{
                p: 2.5,
            }}
        >
            {studentPage && (
                <FormControl
                    sx={{
                        flexShrink: 0,
                        width: { xs: 1, md: 200 },
                    }}
                >
                    <InputLabel>پایه</InputLabel>

                    <Select
                        multiple
                        value={filters.grade}
                        onChange={handleFilterGrade}
                        input={<OutlinedInput label="پایه" />}
                        renderValue={(selected) => {
                            return selected.map((value) => fGrade(value)).join('، ');
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: { maxHeight: 240 },
                            },
                        }}
                    >
                        {gradeOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                <Checkbox disableRipple size="small" checked={filters.grade.includes(option.id)} />
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <TextField
                fullWidth
                value={filters.nickname}
                onChange={handleFilterName}
                placeholder="جست‌و‌جو..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    ),
                }}
            />
        </Stack>
    );
}

StudentTableToolbar.propTypes = {
    filters: PropTypes.object,
    onFilters: PropTypes.func,
    gradeOptions: PropTypes.array,
};
