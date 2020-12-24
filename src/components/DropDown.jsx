import React, { useState, useLayoutEffect, useRef } from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/core';
import { ActionButton } from 'components';
import { mobileDevice } from 'styles/utils';

const getElemPos = (element) => {
    let result = null;

    if (element) result = element.getBoundingClientRect();
    return result;
};

function DropDown({ options, label, onChange, defaultValue, cssParams = {} }) {
    const [value, setValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({});
    const scrollPos = useRef(null);
    const target = useRef(null);

    useLayoutEffect(() => {
        // prevent scrolling
        if (isOpen) scrollPos.current = window.scrollY;

        let scrollbarWidth = document.body.offsetWidth;
        document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
        scrollbarWidth -= document.body.offsetWidth;
        document.body.style.paddingRight = isOpen
            ? `${Math.abs(scrollbarWidth)}px`
            : 0;

        if (!isOpen) window.scroll(0, scrollPos.current || 0);

        // set dropdown position on the screen
        const pos = getElemPos(target.current);
        setCoords({ width: pos.width, top: pos.top, left: pos.left });
    }, [isOpen]);

    const handleChange = (value) => {
        setIsOpen(false);
        setValue(value);
        onChange(value);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <div>
            <ActionButton
                ref={target}
                css={[buttonCSS, cssParams.button]}
                label={value ? value.label : label}
                onClick={handleOpen}
            />
            <Modal
                style={{
                    overlay: {
                        zIndex: 1000,
                        backgroundColor: 'rgba(10,10,10,.5)'
                    }
                }}
                css={modalCSS(coords)}
                isOpen={isOpen}
            >
                <div css={[titleCSS, cssParams.title]}>
                    <span>{label}</span>
                </div>
                <div>
                    <ul>
                        {options.map((o) => {
                            const isActive = o.value === value.value;
                            return (
                                <li
                                    onClick={() => handleChange(o)}
                                    css={[
                                        optionCSS(isActive),
                                        cssParams.option(isActive)
                                    ]}
                                >
                                    <span>{o.label}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Modal>
        </div>
    );
}

const buttonCSS = css`
    display: block;
    height: 40px;
    background-color: #ffffff;
    border: 1px solid #222;
    padding: 0;

    & > span {
        white-space: nowrap;
        font-size: 1rem;
        line-height: 40px;
        padding-left: 1rem;
        text-transform: uppercase;
        text-overflow: ellipsis;
        max-width: 100%;
        overflow: hidden;
    }
`;

const optionCSS = (isActive) => css`
    display: block;
    height: 40px;
    background-color: #ffffff;
    border-top: 1px solid #ddd;
    padding: 0 0.2rem;
    cursor: pointer;

    text-overflow: ellipsis;
    overflow: hidden;

    &:hover {
        background-color: #efefef;
    }

    & > span {
        white-space: nowrap;
        color: ${isActive ? '#e50010' : '#222'};
        font-size: 0.9rem;
        line-height: 40px;
        margin-left: 1rem;
        text-transform: uppercase;
    }
`;

const modalCSS = (coords) => css`
    top: ${coords.top}px;
    left: ${coords.left}px;
    width: ${coords.width}px;
    right: auto;
    bottom: auto;
    position: fixed;
    background-color: #faf9f8;
    border: none;
    border-radius: 0;

    ${mobileDevice(css`
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `)}
`;

const titleCSS = [
    buttonCSS,
    mobileDevice(css`
        display: none;
    `)
];

export default DropDown;
