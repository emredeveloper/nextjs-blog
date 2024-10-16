import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// Tüm gönderi kimliklerini al
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''), // ".md" uzantısını kaldır
      },
    };
  });
}

// Belirli bir gönderi için verileri al
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Gray-matter kullanarak meta verileri ayrıştır
  const matterResult = matter(fileContents);

  // İçeriği HTML olarak dönüştürme
  const contentHtml = matterResult.content; // Markdown içeriği düz metin olarak alıyoruz

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

// Tüm gönderi verilerini sıralı şekilde al
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });
  
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
