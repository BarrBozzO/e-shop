import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/core';
import Image from 'next/image';
import { mobileDevice } from 'styles/utils';

function Popup({ onClose, isOpen, data = {} }) {
    useEffect(() => {
        if (isOpen) {
            const timeout = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    return (
        <Modal
            style={{
                overlay: {
                    zIndex: 1000,
                    inset: '0 0 auto auto',
                    position: 'absolute'
                }
            }}
            css={modalCSS}
            isOpen={isOpen}
        >
            <div css={titleCSS}>New Item Added To Cart</div>
            <div css={nameCSS}>{data.name}</div>
            <div css={containerCSS}>
                <div css={imageWrapperCSS}>
                    <div css={imageCSS}>
                        <Image src={data.images[0].url} layout="fill" />
                    </div>
                </div>
                <div css={detailsCSS}>
                    <div css={mobileNameCSS}>{data.name}</div>
                    <div>Price: ${data.price.value}</div>
                    <div>Size: {data.__size}</div>
                </div>
            </div>
        </Modal>
    );
}

const modalCSS = css`
    position: static;
    width: 300px;
    height: 200px;
    border: none;
    border-radius: 0;
    padding: 0.8rem 1.5rem 1.5rem;
    margin: 10px 10px 0 0;
    background-color: #fff;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.05);

    ${mobileDevice(css`
        width: 100vw;
        height: auto;
        margin: 0;
        padding: 0.6rem 1rem;
    `)};
`;

const titleCSS = css`
    color: #e50010;
    margin-bottom: 0.6rem;
    font-size: 0.9rem;
    text-transform: uppercase;

    ${mobileDevice(css`
        font-size: 0.8rem;
    `)}
`;

const nameCSS = css`
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${mobileDevice(css`
        display: none;
    `)}
`;

const mobileNameCSS = css`
    ${mobileDevice(css`
        margin-bottom: 0.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.2rem;
        font-weight: 700;
    `)}
`;

const imageWrapperCSS = css`
    flex: 0 0 80px;
    position: relative;
    width: 80px;
`;

const imageCSS = css`
    width: 100%;
    padding-bottom: 148%;
`;

const containerCSS = css`
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    color: #222;
`;

const detailsCSS = css`
    padding-left: 1rem;
    font-size: 1.2rem;
`;

export default Popup;
