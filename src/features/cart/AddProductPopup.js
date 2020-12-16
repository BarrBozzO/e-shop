import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/core';
import Image from 'next/image';

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
                    width: '300px',
                    height: '200px',
                    inset: '10px 10px auto auto',
                    backgroundColor: '#fff',
                    position: 'absolute',
                    boxShadow: '0 0 4px 4px rgba(0,0,0,0.05)'
                },
                content: {
                    position: 'static',
                    width: '100%',
                    border: 'none',
                    borderRadius: 0,
                    padding: '0.8rem 1.5rem 1.5rem'
                }
            }}
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
                    <div>Price: ${data.price.value}</div>
                    <div>Size: {data.__size}</div>
                </div>
            </div>
        </Modal>
    );
}

const titleCSS = css`
    color: #e50010;
    margin-bottom: 0.6rem;
    font-size: 0.9rem;
    text-transform: uppercase;
`;

const nameCSS = css`
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
