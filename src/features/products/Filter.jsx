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

    const handleChange = ({ value }) => {
        onChange(value);
    };

    return (
        <DropDown
            cssParams={{
                button: {
                    border: 'none',
                    backgroundColor: 'transparent',
                    width: '240px',
                    '& > span': {
                        paddingLeft: 0
                    }
                },
                option: (isActive) => ({
                    backgroundColor: isActive ? '#f4eddd' : 'transparent'
                }),
                title: {
                    border: 'none'
                }
            }}
            options={options}
            onChange={handleChange}
            label={'Sort By'}
            defaultValue={{ value: 'recommended', label: 'Recommended' }}
        />
    );
};

export default Filter;
