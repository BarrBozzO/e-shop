import React from 'react';
import Select from 'react-select';

function DropDown({
    options,
    styles,
    label,
    onChange,
    isSearchable = false,
    placeholder = '',
    defaultValue
}) {
    const handleChange = (value) => {
        onChange(value);
    };

    return (
        <div>
            <Select
                onChange={handleChange}
                styles={styles}
                options={options}
                label={label}
                isSearchable={isSearchable}
                placeholder={placeholder}
                defaultValue={defaultValue}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: '#f4eddd',
                        primary: '#f4eddd'
                    }
                })}
            />
        </div>
    );
}

export default DropDown;
