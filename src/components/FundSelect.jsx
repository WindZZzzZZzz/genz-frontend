import React, { useState, useRef } from 'react';
import { Select, Option, Chip, Box, FormLabel, Stack } from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/joy/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';

const FundSelect = ({ name, label, placeholder, options, multiple, value, onChange }) => {
  const action = useRef();

  const handleChange = (event, newValue) => {
    onChange?.({
      target: {
        name,
        value: newValue,
      },
    });
  };

  const handleClear = () => {
    const clearedValue = multiple ? [] : null;
    onChange?.({ target: { name, value: clearedValue } });
    action.current?.focusVisible();
  };

  const hasValue = multiple ? value.length > 0 : !!value;

  return (
    <Stack
      sx={{ display: 'flex', alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between' }}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        multiple={multiple}
        placeholder={placeholder}
        name={name}
        action={action}
        renderValue={(selected) =>
          multiple ? (
            <Box sx={{ display: 'flex', gap: '0.25rem' }}>
              {selected.map((selectedOption) => (
                <Chip
                  key={selectedOption.value}
                  variant="soft"
                  color="primary"
                  sx={{
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {selectedOption.label}
                </Chip>
              ))}
            </Box>
          ) : selected?.label ?? ''
        }
        sx={{ width: { xs: '100%', sm: '15rem' } }}
        slotProps={{
          listbox: {
            sx: {
              width: '100%',
            },
          },
        }}
        indicator={<KeyboardArrowDown />}
        value={value}
        onChange={handleChange}
        endDecorator={
          hasValue && (
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onMouseDown={(event) => event.stopPropagation()}
              onClick={handleClear}
            >
              <CloseRounded />
            </IconButton>
          )
        }
      >
        {options?.map((op) => (
          <Option key={op} value={op}>
            {op}
          </Option>
        ))}
      </Select>
    </Stack>
  );
};

export default FundSelect;
