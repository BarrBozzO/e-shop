import Head from 'next/head';
import Layout from 'components/Layout';
import { useFormik } from 'formik';
import { css } from '@emotion/core';
import { Button, Preloader } from 'components';
import { toast } from 'react-toastify';
import { useUser } from 'features/user';
import * as Yup from 'yup';

function Login() {
    const { signInWithCreds } = useUser();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async ({ email, password }, actions) => {
            actions.setSubmitting(true);

            try {
                await signInWithCreds(email, password);
                onClose();
            } catch (error) {
                toast.error('Erro: wrong email + password pair!');
                actions.setErrors({
                    email: true,
                    password: true
                });
                console.error(error);
            }
            actions.setSubmitting(false);
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email')
                .required('Enter an email address.'),
            password: Yup.string()
                .min(8, 'Min length is 8')
                .max(20, 'Max length is 20')
                .required('Please enter a password.')
        })
    });

    return (
        <Layout>
            <Head>
                <title>Sign In</title>
            </Head>

            <h1
                css={{
                    width: '100%',
                    textAlign: 'center',
                    margin: '2rem 0'
                }}
            >
                Sign In
            </h1>
            <div
                css={{
                    maxWidth: '750px',
                    margin: '2rem auto'
                }}
            >
                <form
                    css={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        height: '100%'
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                >
                    <div
                        css={[
                            fieldCSS,
                            formik.errors.email ? invalidFieldCSS : null
                        ]}
                    >
                        <label css={labelCSS} htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            css={inputCSS}
                        />
                        {formik.errors.email && (
                            <span>{formik.errors.email}</span>
                        )}
                    </div>
                    <div
                        css={[
                            fieldCSS,
                            formik.errors.password ? invalidFieldCSS : null
                        ]}
                    >
                        <label css={labelCSS} htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            css={inputCSS}
                        />
                        {formik.errors.password && (
                            <span>{formik.errors.password}</span>
                        )}
                    </div>
                    <div css={{ textAlign: 'center' }}>
                        <Button
                            css={{
                                display: 'block',
                                width: '100%',
                                marginTop: '1rem'
                            }}
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting && <Preloader />} sign in
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

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
    display: block;
    margin-bottom: 0.8rem;
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

export default Login;
