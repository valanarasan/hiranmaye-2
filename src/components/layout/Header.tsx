import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button, Container } from '@/components/primitives';
import { cx } from '@/lib/cx';
import { useScrolled } from '@/hooks';
import { headerCta, primaryNav } from '@/content/site';
import { Logo } from './Logo';
import styles from './Header.module.css';

export function Header() {
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={cx(styles.header, (scrolled || open) && styles.scrolled)}>
        <Container className={styles.inner}>
          <Logo />

          <nav className={styles.nav} aria-label="Primary">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => cx(styles.link, isActive && styles.active)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <Button
              as={Link}
              to={headerCta.to}
              variant="solid"
              size="sm"
              className={styles.headerCta}
            >
              {headerCta.label}
            </Button>
            <button
              type="button"
              className={cx(styles.burger, open && styles.open)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </Container>
      </header>

      {open ? (
        <div className={styles.drawer} id="mobile-nav">
          {primaryNav.map((item) => (
            <Link key={item.to} to={item.to} className={styles.drawerLink}>
              {item.label}
            </Link>
          ))}
          <Button as={Link} to={headerCta.to} size="lg" className={styles.drawerCta} withArrow>
            {headerCta.label}
          </Button>
        </div>
      ) : null}
    </>
  );
}
