import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutSection from './components/AboutSection';

export default function PrivasiPage() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('norinoya-dark-mode') === 'true';
    }
    return false;
  });

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  React.useLayoutEffect(() => {
    sessionStorage.setItem('norinoya-dark-mode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const pageTitle = 'Kebijakan Privasi - Norinoya';
  const pageDesc = 'Kebijakan privasi Norinoya, termasuk penggunaan cookie iklan Google bila iklan ditayangkan.';
  const canonicalUrl = route('legal.privacy');

  return (
    <div className="bg-[#FEFFFE] dark:bg-[#202120] min-h-screen text-neutral-950 dark:text-neutral-50 flex flex-col font-sans">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Navbar
        activeTab="about"
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onNavigateHome={() => router.visit('/')}
        onNavigateNews={() => router.visit('/news')}
        onNavigateKios={() => router.visit('/kios')}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AboutSection />
      </main>
      <Footer onNavigateHome={() => router.visit('/')} darkMode={darkMode} />
    </div>
  );
}
