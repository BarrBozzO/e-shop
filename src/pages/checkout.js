import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import { useUser } from 'features/user';
import { Form } from 'features/checkout';

function Checkout() {
    const { user } = useUser();

    return (
        <Layout>
            <Head>
                <title>Checkout</title>
            </Head>

            <Form />
        </Layout>
    );
}

export default Checkout;
