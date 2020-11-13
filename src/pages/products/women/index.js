import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import BreadCrumbs from "components/Breadcrumbs";

function WomenProducts() {
  return (
    <Layout>
      <Head>
        <title>Women's Clothing</title>
      </Head>
      <BreadCrumbs
        path={[
          {
            url: "/",
            text: "Home",
          },
          {
            url: "/products",
            text: "Products",
          },
          {
            text: "Women",
          },
        ]}
      />
      <h1>Women's Clothing</h1>
      <div>
        <Link href="/products/women/clothes">
          <a>Go Shopping</a>
        </Link>
      </div>
      <div>
        Shop the latest fashion online at H&M and discover new favorites in
        women’s clothing. Find everything from casual day dresses to sharp
        office wear. We have jeans in every fit, premium quality items and the
        latest fashion essentials. Check out our Conscious collection made out
        of more sustainable materials, we bring you women’s fashion in a more
        sustainable way Once you’ve found that perfect outfit complete your look
        with stylish shoes, bags and accessories. Don’t miss out on our wide
        range of on-point beauty products, not to mention beautiful and
        flattering lingerie, shapewear and loungewear. Update your gym bag with
        stylish, functional sportswear for the gym or the yoga class. Find
        flattering and on-trend bikinis and swimsuits. Start building your new
        wardrobe today. Browse our collections to find the latest in women’s
        fashion trends and update your wardrobe with stylish women’s clothes.
        Your new season style starts here at H&M.
      </div>
    </Layout>
  );
}

export default WomenProducts;
