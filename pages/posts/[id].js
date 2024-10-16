import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import { useAuth } from '../../context/AuthContext'; // Auth context'i içe aktar
import { useRouter } from 'next/router';

export default function Post({ postData }) {
  const { isAuthenticated } = useAuth(); // Giriş durumunu al
  const router = useRouter();

  // Kullanıcı giriş yapmamışsa yönlendir
  if (!isAuthenticated) {
    router.push('/login'); // Kullanıcıyı giriş sayfasına yönlendir
    return null; // Yükleme durumunu önlemek için null döner
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <date>{postData.date}</date>
        </div>
        <div>{postData.content}</div>
      </article>
    </Layout>
  );
}

// Bu fonksiyon, sayfanın hangi yollarla oluşturulacağını belirler
export async function getStaticPaths() {
  const paths = getAllPostIds(); // Tüm gönderi kimliklerini al

  return {
    paths,
    fallback: false, // Eğer olmayan bir yol için erişim sağlanırsa 404 döner
  };
}

// Bu fonksiyon, her gönderi için gerekli verileri alır
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id); // ID'ye göre gönderi verisini al
  return {
    props: {
      postData,
    },
  };
}
