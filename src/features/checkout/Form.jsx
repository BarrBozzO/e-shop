import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { css } from '@emotion/core';
import { useUser } from 'features/user';
import Button from 'components/Button';
import Preloader from 'components/Preloader';
import { Cart } from 'features/cart';
import * as Yup from 'yup';

function Form({ products, loading, onComplete }) {
    const { user } = useUser();

    const formik = useFormik({
        initialValues: {
            email: '',
            first: '',
            last: '',
            city: '',
            address: '',
            state: '',
            zip: ''
        },
        onSubmit: async (values, actions) => {
            try {
                const res = await fetch('/api/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        details: {
                            ...values,
                            email: user ? user.email : values.email
                        },
                        products: products.map((product) => ({
                            id: product.id,
                            count: product.__total,
                            size: product.__size
                        }))
                    })
                });
                const { success, error } = await res.json();

                if (error) {
                    throw new Error(error);
                }
                Cart.reset();
                onComplete();
            } catch (error) {
                console.error(error);
            }
        },
        validationSchema: Yup.object().shape({
            first: Yup.string().required('Please enter your first name.'),
            last: Yup.string().required('Please enter your last name.'),
            city: Yup.string().required('Please enter city.'),
            address: Yup.string().required('Please enter address.'),
            state: Yup.string().required('Please select state.'),
            zip: Yup.string().required('Please enter zip code.'),
            email: !user
                ? Yup.string()
                      .email('Invalid email')
                      .required('Enter an email address.')
                : undefined
        })
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
                css={{
                    marginTop: '1rem'
                }}
            >
                <div>
                    <h1
                        css={{
                            marginBottom: '2rem'
                        }}
                    >
                        My Information
                    </h1>
                    {user ? (
                        <div>
                            <span>Email</span>
                            <br />
                            <b>{user.email}</b>
                        </div>
                    ) : (
                        <fieldset css={fieldsetCSS}>
                            <div
                                css={[
                                    fieldCSS,
                                    formik.errors.email ? invalidFieldCSS : null
                                ]}
                            >
                                <label css={labelCSS} htmlFor="email">
                                    Email
                                    <Asterisk />
                                </label>
                                <input
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    name="email"
                                    css={inputCSS}
                                />
                                {formik.errors.email && (
                                    <span>{formik.errors.email}</span>
                                )}
                            </div>
                        </fieldset>
                    )}
                </div>
                <h2>Shipping Address</h2>
                <fieldset css={fieldsetCSS}>
                    <div
                        css={[
                            fieldCSS,
                            formik.errors.first ? invalidFieldCSS : null
                        ]}
                    >
                        <label css={labelCSS} htmlFor="first">
                            First Name
                            <Asterisk />
                        </label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.first}
                            name="first"
                            css={inputCSS}
                        />
                        {formik.errors.first && (
                            <span>{formik.errors.first}</span>
                        )}
                    </div>
                    <div
                        css={[
                            fieldCSS,
                            formik.errors.last ? invalidFieldCSS : null
                        ]}
                    >
                        <label css={labelCSS} htmlFor="last">
                            Last Name
                            <Asterisk />
                        </label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.last}
                            name="last"
                            css={inputCSS}
                        />
                        {formik.errors.first && (
                            <span>{formik.errors.first}</span>
                        )}
                    </div>
                </fieldset>
                <fieldset css={fieldsetCSS}>
                    <div
                        css={[
                            fieldCSS,
                            formik.errors.address ? invalidFieldCSS : null
                        ]}
                    >
                        <label css={labelCSS} htmlFor="address">
                            Address
                            <Asterisk />
                        </label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            name="address"
                            css={inputCSS}
                        />
                        {formik.errors.address && (
                            <span>{formik.errors.address}</span>
                        )}
                    </div>
                    <div
                        css={[
                            fieldCSS,
                            formik.errors.city ? invalidFieldCSS : null
                        ]}
                    >
                        <label css={labelCSS} htmlFor="city">
                            City
                            <Asterisk />
                        </label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            name="city"
                            css={inputCSS}
                        />
                        {formik.errors.city && (
                            <span>{formik.errors.city}</span>
                        )}
                    </div>
                </fieldset>
                <fieldset css={fieldsetCSS}>
                    <div
                        css={[
                            fieldCSS,
                            formik.errors.state ? invalidFieldCSS : null
                        ]}
                    >
                        <label css={labelCSS} htmlFor="state">
                            State
                            <Asterisk />
                        </label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.state}
                            name="state"
                            css={inputCSS}
                        />
                        {formik.errors.state && (
                            <span>{formik.errors.state}</span>
                        )}
                    </div>
                    <div
                        css={[
                            fieldCSS,
                            formik.errors.zip ? invalidFieldCSS : null
                        ]}
                    >
                        <label css={labelCSS} htmlFor="zip">
                            ZIP
                            <Asterisk />
                        </label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.zip}
                            name="zip"
                            css={inputCSS}
                        />
                        {formik.errors.zip && <span>{formik.errors.zip}</span>}
                    </div>
                </fieldset>
                <div
                    css={css`
                        width: 600px;
                    `}
                >
                    <p>
                        With 'Complete Purchase' you accept H&M's{' '}
                        <Link href={'/terms'}>
                            <a
                                css={{
                                    textDecoration: 'underline'
                                }}
                            >
                                Terms of Use
                            </a>
                        </Link>
                    </p>
                    <p>
                        We will process your personal data in accordance with
                        H&M's{' '}
                        <Link href={'/privacy'}>
                            <a
                                css={{
                                    textDecoration: 'underline'
                                }}
                            >
                                Privacy Notice
                            </a>
                        </Link>
                        .
                    </p>
                    <Button
                        css={{
                            display: 'block',
                            width: '200px',
                            marginTop: '1rem'
                        }}
                        type="submit"
                        disabled={formik.isSubmitting || loading}
                    >
                        {(formik.isSubmitting || loading) && <Preloader />}{' '}
                        Complete Purchase
                    </Button>
                </div>
            </form>
        </div>
    );
}

const Asterisk = () => (
    <span css={{ color: 'red', marginLeft: '0.2rem' }}>*</span>
);

const fieldsetCSS = css`
    display: flex;
    flex-direction: flex-start;
    align-items: center;
    border: 0;
    margin-bottom: 1rem;
`;

const inputCSS = css`
    width: 100%;
    padding: 0.8rem 0.6rem;
    border: none;
    background-color: #eaeaea;
    border-radius: 4px;
`;

const labelCSS = css`
    display: block;
    width: 100%;
    font-size: 0.8rem;
    color: #222;
    margin-bottom: 0.4rem;
    font-weight: 700;
`;

const fieldCSS = css`
    flex: 0 0 50%;

    &:first-child {
        margin-right: 0.8rem;
    }
`;

const invalidFieldCSS = css`
    span {
        color: #ef2727;
        font-size: 0.8rem;
    }

    input {
        border: 1px solid #ef2727;
        background-color: rgba(239, 39, 39, 0.1);
        margin-bottom: 0.4rem;
    }
`;

export default Form;
