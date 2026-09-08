import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { PageTransition } from './PageTransition';
import { ScrollToTop } from './ScrollToTop';
import { SmoothScroll } from './SmoothScroll';
import styles from './RootLayout.module.css';

export function RootLayout() {
  return (
    <SmoothScroll>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className={styles.main}>
        <Suspense fallback={null}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
