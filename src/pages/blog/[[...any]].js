import Head from 'next/head';
import Layout from 'components/Layout';

function Blog() {
    return (
        <Layout>
            <Head>
                <title>Blog</title>
            </Head>
            <h1>Blog</h1>
            <div
                css={{
                    color: '#e50010',
                    fontWeight: '700',
                    fontSize: '2rem'
                }}
            >
                COMING SOON
            </div>
        </Layout>
    );
}

export default Blog;
