import React, { useMemo } from 'react'
import Head from 'next/head'
import Layout from 'components/Layout'
import BreadCrumbs from 'components/Breadcrumbs'
import Button from 'components/Button'
import AdBanner from 'components/AdBanner'
import {
    List,
    fetchProducts,
    Filter,
    useFetchProducts,
} from 'features/products'

function ViewAll({ initialProducts }) {
    const { data, error, size, setSize } = useFetchProducts({
        initialData: [
            {
                data: initialProducts,
                cursor: initialProducts[initialProducts.length - 1].id,
            },
        ],
        category: 'women',
    })

    const isLoading = size > 0 && data && typeof data[size - 1] === 'undefined'

    const products = useMemo(() => {
        return data
            ? data.reduce((allPages, page) => {
                  return allPages.concat(page.data)
              }, [])
            : []
    }, [data])

    return (
        <Layout>
            <Head>
                <title>View All - Shop Women's Clothing online</title>
            </Head>

            <BreadCrumbs
                path={[
                    {
                        url: '/',
                        text: 'Home',
                    },
                    {
                        url: '/products',
                        text: 'Products',
                    },
                    {
                        url: '/products/women',
                        text: 'Women',
                    },
                    {
                        text: 'View All',
                    },
                ]}
            />
            <h1>View All</h1>
            <div>
                <AdBanner />
            </div>
            <div>
                <Filter />
                <List products={products} loading={isLoading} />
                <Button
                    css={{
                        display: 'block',
                        width: '300px',
                        height: '47px',
                        margin: '0 auto',
                    }}
                    disabled={isLoading}
                    onClick={() => setSize(size + 1)}
                >
                    Load More Products
                </Button>
            </div>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const products = await fetchProducts({
        sex: 'female',
        age: 'adult',
    })

    return {
        props: {
            initialProducts: products,
        },
    }
}

export default ViewAll
