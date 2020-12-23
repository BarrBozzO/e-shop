import NProgress from 'nprogress';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import { UserProvider } from 'features/user';
import '../styles/globals.css';

NProgress.configure({
    minimum: 0.15,
    showSpinner: false,
    template:
        '<div class="progress-bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default MyApp;
