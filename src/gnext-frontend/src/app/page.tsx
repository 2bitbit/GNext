'use client'; // 标记为客户端组件

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {  // 前端调用后端 API
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/message`; // 从 process.env 对象中读取环境变量
    console.log("Fetching from URL:", apiUrl); // 方便调试
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setMessage(data.text))
      .catch(error => console.error("Error fetching message:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-white shadow py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-gray-800">我的精美博客</a>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">首页</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">关于</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">联系</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Image src="/images/hero.jpg" alt="精美主页图片" width={1200} height={600} className="w-full object-cover" />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">欢迎来到我的精美世界</h1>
            <p className="text-gray-700 leading-relaxed mb-6">
              这里会分享我的各种奇思妙想、技术心得和生活感悟。敬请期待！
            </p>
            <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
              了解更多
            </a>
            {message && <p className="mt-4 text-green-500">{message}</p>}
          </div>
        </div>
      </main>
      <footer className="bg-gray-200 py-4 text-center text-gray-600">
        <p>© 2025 我的精美博客</p>
      </footer>
    </div>
  );
}