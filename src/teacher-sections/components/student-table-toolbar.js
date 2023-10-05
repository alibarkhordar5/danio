import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useSnackbar } from 'src/components/snackbar';
import Select from '@mui/material/Select';
import axios, { endpoints } from 'src/utils/axios';
// components
import Iconify from 'src/components/iconify';
// util
import { fGrade } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function StudentTableToolbar({
    filters,
    onFilters,
    gradeOptions,
    studentPage,
    setStudents,
    classId = '',
}) {
    const [debouncedValue, setDebouncedValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const { enqueueSnackbar } = useSnackbar();
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

    // Debounce function
    const debounce = (fn, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    // Handler for input change
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        // Debounce the value update
        debounce(setDebouncedValue, 500)(value);
    };

    useEffect(() => {
        // Here, you can perform any action using the debounced value
        if (debouncedValue || debouncedValue === '') {
            const timer = setTimeout(() => {
                // Replace this with your API call or desired action
                axios
                    .get(endpoints.teacher.get_students_by_class(classId, '', '', debouncedValue))
                    .then((response) => {
                        const data = response.data;
                        const students_data = data.data.map((student) => {
                            return {
                                id: student.id,
                                name: student.nickname,
                                avatar_url: '/assets/images/avatar/avatar_4.jpg',
                                done_homeworks: student.number_of_homeworks_done,
                                total_homeworks: student.number_of_homeworks,
                                avg_score: student.avg_score,
                                grade: student.grade,
                            };
                        });

                        setStudents(() => {
                            const array = [];
                            array.push(...students_data);
                            return array;
                        });
                    })
                    .catch((error) => {
                        enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                            variant: 'error',
                        });
                    });
                // console.log('Sending API request with value:', debouncedValue);
            }, 500);

            return () => clearTimeout(timer);
        }

        // For example, you can make an API call with the debounced value
        // fetchResults(debouncedValue);
    }, [debouncedValue]);

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
                // onChange={handleFilterName}
                onChange={handleInputChange}
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
