import React from 'react';
import DropDown from 'components/DropDown';

function Filter({ filters, onChange, total }) {
    const handleSortChange = (value) => {
        onChange({
            ...filters,
            sort: value
        });
    };

    return (
        <div
            css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                margin: '2rem 0.5rem'
            }}
        >
            <Sort onChange={handleSortChange} />
            <div
                css={{
                    flex: '1 0 auto',
                    textAlign: 'right',
                    fontWeight: 700
                }}
            >
                {total} items
            </div>
        </div>
    );
}

const Sort = ({ onChange }) => {
    const options = [
        { value: 'recommended', label: 'Recommended' },
        { value: 'newest', label: 'Newest' },
        { value: 'lowest-price', label: 'Lowest Price' },
        { value: 'highest-price', label: 'Highest Price' }
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
