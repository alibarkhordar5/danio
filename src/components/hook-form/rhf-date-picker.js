import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

{
  /* <DatePicker
          {...field}
          // format="dd/MM/yyyy"
          onChange={(newValue) => {
            field.onChange(newValue);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message,
            },
          }}
          {...other}
        /> */
}

export default function RHFDatePicker({ name, helperText, type, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          componentsProps={{
            actionBar: {
              actions: ['cancel', 'clear'],
            },
          }}
          label={label}
          cancelLabel="لغو"
          clearLabel="پاک کردن"
          disableMaskedInput
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error?.message}
                size="medium"
                inputProps={{
                  ...params.inputProps,
                  placeholder: 'روز/ ماه/ سال',
                }}
              />
            );
          }}
          value={field.value}
          onChange={(newValue) => {
            field.onChange(newValue);
          }}
          slotProps={{
            toolbar: { toolbarFormat: 'ddd DD MMMM', hidden: false },
          }}
        />
      )}
    />
  );
}

RHFDatePicker.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
};
