export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      // Kullanıcı doğrulama işlemleri (örneğin, sabit bir kullanıcı ile)
      if (email === 'emre@example.com' && password === 'emre') {
        // Başarılı giriş
        return res.status(200).json({ message: 'Giriş başarılı!' });
      } else {
        // Hatalı giriş
        return res.status(401).json({ message: 'Geçersiz email veya şifre' });
      }
    } else {
      // Sadece POST isteğine izin veriyoruz
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  