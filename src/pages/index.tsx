import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function Hero(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <img
          src="/img/raven_actual.png"
          alt="RavenBreach Logo"
          className={styles.heroLogo}
        />
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/writeups">
            Writeups
          </Link>
          <Link className="button button--secondary button--lg" to="/articles">
            Articles
          </Link>
        </div>
      </div>
    </header>
  );
}

type SectionCard = {
  title: string;
  description: string;
  to: string;
  emoji: string;
};

const SECTIONS: SectionCard[] = [
  {
    title: 'Writeups',
    description:
      'Mes walkthroughs HackTheBox Starting Point, CTFs et machines. Méthodologie pas à pas, avec commandes et explications.',
    to: '/writeups',
    emoji: '🎯',
  },
  {
    title: 'Articles',
    description:
      'Concepts cybersécurité, tutoriels outils et notes techniques. En cours de rédaction — bientôt disponible.',
    to: '/articles',
    emoji: '📝',
  },
  {
    title: 'Cheatsheet',
    description:
      'Commandes essentielles, one-liners et références rapides pour les outils du quotidien en pentest.',
    to: '/docs/cheatsheet',
    emoji: '📋',
  },
  {
    title: 'Méthodologie',
    description:
      'Phases de reconnaissance, exploitation et post-exploitation. Framework structuré pour aborder les machines.',
    to: '/docs/methodologie',
    emoji: '🗺️',
  },
];

function SectionCards(): ReactNode {
  return (
    <section className={styles.sections}>
      <div className="container">
        <div className={styles.sectionGrid}>
          {SECTIONS.map(({title, description, to, emoji}) => (
            <Link key={title} to={to} className={styles.sectionCard}>
              <span className={styles.sectionEmoji}>{emoji}</span>
              <Heading as="h3" className={styles.sectionCardTitle}>
                {title}
              </Heading>
              <p className={styles.sectionCardDesc}>{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main>
        <SectionCards />
      </main>
    </Layout>
  );
}
