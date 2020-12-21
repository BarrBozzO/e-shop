import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavLink = ({ href, linkCSS, activeCSS, children }) => {
    const router = useRouter();
    let css = Array.isArray(linkCSS) ? linkCSS : [linkCSS];

    if (router.asPath === href) {
        css.push(activeCSS);
    }

    return <Link href={href}>{<a css={css}>{children}</a>}</Link>;
};

export default NavLink;
