import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext'; // Auth context'i içe aktar

export default function Home({ allPostsData }) {
  const { isAuthenticated } = useAuth(); // Giriş durumunu al

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Kendini Tanıt]</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {isAuthenticated ? (
                <Link href={`/posts/${id}`}>
                  {title}
                </Link>
              ) : (
                <span>{title} (Giriş yapmadan erişemezsiniz)</span> // Mesaj göster
              )}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      {/* Giriş Butonu Eklendi */}
      <section>
        <Link href="/login">
          <button className={utilStyles.button}>Giriş Yap</button>
        </Link>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
