import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import BreadCrumbs from 'components/Breadcrumbs';

function MenProducts() {
    return (
        <Layout>
            <Head>
                <title>Kid’s clothes</title>
            </Head>

            <h1>Kid’s clothes</h1>
            <BreadCrumbs
                path={[
                    {
                        url: '/',
                        text: 'Home'
                    },
                    {
                        url: '/products',
                        text: 'Products'
                    }
                ]}
            />
            <div>
                <Link href="/products/kids/all">
                    <a>Go shopping</a>
                </Link>
            </div>
            <div>
                Adorable clothes for babies, toddlers and teens. Find new
                fashion favourites in our wide range of kid’s clothing. For the
                babies We have your baby’s wardrobe covered with our range of
                pieces for newborn from 0-9 months. Look out for multipacks of
                all-in-ones in super-soft organic cotton. As your baby grows,
                our clothes for baby girls 0-24 months and baby boys 0-24 months
                has you covered with dungarees, soft jersey pieces and fun
                animal print tees. For the girls Girls from 1½-10 years will
                love our floral and butterfly prints, colourful stripes and
                Disney motifs. Browse our kids clothing including playsuits,
                ballet pumps and vibrant hair clips and Alice bands. Older girls
                from ages 8-14 years can choose from flowing jersey dresses,
                slim-fit jeans and floaty vest tops. For the boys Boys from
                1½-10 years can explore our range of bold leafy graphics,
                dinosaur prints and nautical themed designs. Discover tapered
                jeans, cargo shorts and playful tees in this lively collection.
                Boys from 8-14 years can go for urban and surfwear-inspired
                looks featuring vivid slogan tees, sweatpants and snap-back
                caps.
            </div>
        </Layout>
    );
}

export default MenProducts;
