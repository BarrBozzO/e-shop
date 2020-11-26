import React from 'react';
import DropDown from 'components/DropDown';

function Filter({ filters, onChange }) {
    const handleSortChange = (value) => {
        onChange({
            ...filters,
            sort: value
        });
    };

    return (
        <div
            css={{
                margin: '2rem 0'
            }}
        >
            <Sort onChange={handleSortChange} />
        </div>
    );
}

const Sort = ({ onChange }) => {
    const options = [
        { value: 'recommended', label: 'Recommended' },
        { value: 'newest', label: 'Newest' },
        { value: 'lowest', label: 'Lowest Price' },
        { value: 'highest', label: 'Highest Price' }
    ];

    const styles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? '#e50010' : '#222',
            padding: '1rem'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#ffffff',
            border: 'none',
            color: '#222'
        }),
        container: (provided) => ({
            ...provided,
            width: '200px',
            border: 'none',
            zIndex: 100
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            border: 'none'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            color: state.hasValue || state.isFocused ? '#e50010' : '#222'
        }),
        indicatorContainer: (provided, state) => ({
            ...provided,
            color: '#e50010'
        }),
        singleValue: (provided, state) => {
            // debugger;
            return {
                ...provided,
                color: state.hasValue ? '#e50010' : '#222',
                fontWeight: '700',
                fontSize: '1.2rem'
            };
        }
    };

    const handleChange = ({ value }) => {
        onChange(value);
    };

    return (
        <DropDown
            styles={styles}
            options={options}
            onChange={handleChange}
            placeholder={'Sort By'}
            defaultValue={{ value: 'recommended', label: 'Recommended' }}
        />
    );
};

export default Filter;
