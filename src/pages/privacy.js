import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';

function Home() {
    return (
        <Layout>
            <Head>
                <title>PRIVACY POLICY H&M MEMBERSHIP</title>
            </Head>

            <h1>PRIVACY POLICY H&M MEMBERSHIP</h1>
            <div>
                <h2>Why do we use your personal data?</h2>

                <p>
                    We use your personal data to create and manage your H&M
                    Membership account and to give you all the granted benefits
                    and rewards. The H&M Membership is as further described in
                    the{' '}
                    <Link href="/terms">
                        <a
                            css={{
                                textDecoration: 'underline'
                            }}
                        >
                            Terms & Conditions
                        </a>
                    </Link>{' '}
                    and on our official website.
                </p>
                <p>
                    We process your personal data to keep your membership
                    account up-to-date and always current. By doing so we will
                    be able to provide you with your shopping history, details
                    about your orders, H&MxKlarna credit and your status as a
                    member
                </p>
                <p>
                    Furthermore, we will use your personal data to serve you
                    with personalized information, ads, promotions,
                    recommendations, rating services etc. Any member will also
                    receive notifications for upcoming events and competitions
                    that you may be of interest to you.
                </p>
            </div>
        </Layout>
    );
}

export default Home;
