import React from 'react';
import { Controller } from 'react-hook-form';
import { IconButton } from '@material-ui/core';
import { TextField } from '@mui/material';
import {
  styles,
  DarkVisibilityIcon,
  DarkVisibilityOffIcon,
  ErorMessage,
} from './Input.styles';

const Input = ({
  onClick,
  showPassword,
  showAdornment,
  style,
  name,
  control,
  label,
  placeholder,
  autoFocus = false,
  type = 'text',
  rules,
  errors,
  ...rest
}) => {
  const inputType =
    type !== 'text' ? (showPassword ? 'text' : 'password') : 'text';

  const IconAdornment = showAdornment && (
    <IconButton
      aria-label="toggle password visibility"
      onClick={onClick}
      edge="end"
    >
      {showPassword && <DarkVisibilityIcon />}
      {!showPassword && <DarkVisibilityOffIcon />}
    </IconButton>
  );
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
            error={!!errors}
            fullWidth
            label={label}
            variant="outlined"
            type={inputType}
            placeholder={placeholder}
            style={{ ...styles.input, ...style }}
            autoComplete="off"
            autoFocus={autoFocus}
            InputProps={{
              endAdornment: IconAdornment,
            }}
            {...rest}
          />
        )}
        rules={rules}
      />
      {errors && <ErorMessage>{errors.message}</ErorMessage>}
    </>
  );
};

export default Input;
