import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

export default function RHFAutocomplete({ name, options, optionKey, helperText, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          options={options}
          getOptionLabel={(option) => option[optionKey]}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, newValue) => {
            field.onChange(newValue);
          }}
          {...other}
          renderInput={(params) => (
            <TextField {...params} label={label} error={!!error} helperText={error ? error?.message : helperText} />
          )}
        />
      )}
    />
  );
}

RHFAutocomplete.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  key: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
};
