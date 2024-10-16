import Head from 'next/head';
import Layout from '../components/layout';
import { useAuth } from '../context/AuthContext'; // Auth context'i içe aktar
import { useRouter } from 'next/router';

export default function Login() {
  const { login } = useAuth(); // Giriş fonksiyonunu al
  const router = useRouter();

  const handleLogin = () => {
    login(); // Giriş yap
    router.push('/'); // Ana sayfaya yönlendir
  };

  return (
    <Layout>
      <Head>
        <title>Giriş Yap</title>
      </Head>
      <h1>Giriş Yap</h1>
      <button onClick={handleLogin}>Giriş Yap</button>
    </Layout>
  );
}
