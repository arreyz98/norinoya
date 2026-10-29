import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const CONTACT_EMAIL = 'norinoya.official@gmail.com';

export default function KontakPage() {
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

  const pageTitle = 'Kontak - Norinoya';
  const pageDesc = 'Hubungi Norinoya di norinoya.official@gmail.com untuk koreksi, hak cipta, dan urusan situs.';
  const canonicalUrl = route('legal.contact');

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
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <section className="p-6 md:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-4">
          <h1 className="text-2xl md:text-3xl font-sans font-extrabold tracking-tight">Kontak</h1>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Hubungi Norinoya untuk koreksi informasi, pertanyaan hak cipta, dan urusan situs.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 underline underline-offset-2"
          >
            <Mail className="w-4 h-4" />
            {CONTACT_EMAIL}
          </a>
        </section>
      </main>
      <Footer onNavigateHome={() => router.visit('/')} darkMode={darkMode} />
    </div>
  );
}
