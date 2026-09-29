import React from 'react';
import { ShieldCheck, Scale, FileText, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl max-w-4xl mx-auto space-y-6 transition-colors duration-200"
      id="about-container"
    >
      {/* Banner info */}
      <div className="text-center space-y-3">
        <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-250 text-xs font-mono tracking-wider uppercase rounded-md leading-[16px]">
          Tentang Kami
        </span>
        <h1 className="text-2xl md:text-3xl font-sans font-extrabold text-neutral-950 dark:text-neutral-50 tracking-tight leading-tight">
          Kebijakan &amp; Transparansi Norinoya
        </h1>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-350 max-w-2xl mx-auto leading-[24px]">
          Norinoya adalah platform kurasi dan informasi seputar komik, novel dan light novel yang terbit resmi original di Indonesia.
        </p>
      </div>


      {/* Key Declarations */}
      <div className="grid md:grid-cols-2 gap-4 pt-2">
        {/* Kebijakan Affiliate */}
        <div className="space-y-2.5 p-5 border border-neutral-250 dark:border-neutral-850 rounded-xl bg-neutral-50/20 dark:bg-neutral-950/20">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-neutral-100 font-bold">
            <ShieldCheck className="w-5 h-5 text-neutral-855 dark:text-neutral-300 shrink-0" />
            <h3 className="font-sans text-base leading-[24px]">Transparansi Affiliate</h3>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-[20px]">
            Beberapa tautan pembelian di Norinoya merupakan tautan afiliasi (affiliate link). Jika pengguna melakukan pembelian melalui tautan tersebut, Norinoya dapat menerima komisi dari program afiliasi terkait, tanpa biaya tambahan yang dibebankan kepada pengguna.
          </p>
        </div>

        {/* Perlindungan Hak Cipta */}
        <div className="space-y-2.5 p-5 border border-neutral-250 dark:border-neutral-850 rounded-xl bg-neutral-50/20 dark:bg-neutral-950/20">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-neutral-100 font-bold">
            <Scale className="w-5 h-5 text-neutral-855 dark:text-neutral-300 shrink-0" />
            <h3 className="font-sans text-base leading-[24px]">Kebijakan Hak Cipta</h3>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-[20px]">
            Norinoya tidak menyediakan atau mengarahkan pengguna ke salinan, scan, atau situs distribusi manga yang tidak sah. Kami berupaya menggunakan sumber dan tautan resmi dalam penyajian informasi serta rekomendasi kami.
          </p>
        </div>

        {/* Kebijakan Privasi (Privacy Policy) */}
        <div id="privacy-policy" className="md:col-span-2 space-y-2.5 p-5 border border-neutral-255 dark:border-neutral-850 rounded-xl bg-neutral-50/20 dark:bg-neutral-950/20 scroll-mt-20">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-neutral-100 font-bold">
            <Lock className="w-5 h-5 text-neutral-855 dark:text-neutral-300 shrink-0" />
            <h3 className="font-sans text-base leading-[24px]">Kebijakan Privasi &amp; Penggunaan Cookie (Privacy Policy)</h3>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-450 leading-[20px]">
            Privasi pengunjung merupakan salah satu prioritas utama Norinoya. Layanan Norinoya dirancang sebagai platform informatif, dengan pengelolaan data yang terbatas dan transparan.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-450 leading-[20px]">
            Norinoya tidak menyediakan registrasi akun dan tidak secara sengaja mengumpulkan atau menyimpan informasi pribadi sensitif pengguna di server Norinoya.
          </p>
          <ul className="text-xs text-neutral-500 dark:text-neutral-400 pt-1 space-y-1.5 pl-4 list-disc font-sans leading-relaxed">
            <li><strong>Penyimpanan Data Lokal:</strong> Norinoya dapat menggunakan localStorage dan cookie pada browser untuk menyimpan preferensi navigasi pengguna, seperti status pembukaan konten berdasarkan rating usia serta status persetujuan Cookie Consent Banner. Data tersebut disimpan secara lokal pada perangkat pengguna.</li>
            <li><strong>Tautan Pihak Ketiga:</strong> Norinoya memuat tautan referral atau affiliate, seperti Gramedia, Shopee, dan Tokopedia. Ketika pengguna mengakses platform pihak ketiga tersebut, pengelolaan cookie, tracker, dan data pengguna mengikuti kebijakan privasi masing-masing platform. Norinoya tidak mengendalikan kebijakan privasi pihak ketiga tersebut.</li>
            <li><strong>Statistik Non-Identitas:</strong> Norinoya dapat menggunakan data kunjungan umum, seperti jumlah pengunjung dan sumber rujukan klik, untuk memahami penggunaan situs serta membantu mengoptimalkan performa dan pengalaman pengguna. Data statistik tersebut digunakan dalam bentuk yang tidak ditujukan untuk mengidentifikasi pengguna secara langsung.</li>
          </ul>
        </div>
      </div>

      {/* Detailed Legal Disclaimer */}
      <div className="space-y-4 pt-5 border-t border-neutral-200 dark:border-neutral-800">
        <h2 className="text-base font-bold font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
          <FileText className="w-5 h-5 text-neutral-700 dark:text-neutral-400 shrink-0" />
          Keterangan Hukum Tambahan (Disclaimer)
        </h2>
        <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-4 leading-relaxed">
          <div className="space-y-1.5">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
              1. Merek Dagang &amp; Hak Cipta Visual
            </h3>
            <p>
              Nama, logo, karakter, cover artwork, ilustrasi, dan materi visual lainnya yang ditampilkan di Norinoya dapat merupakan milik atau berada di bawah hak cipta masing-masing pencipta, ilustrator, penerbit, produsen, atau pemegang hak terkait.
            </p>
            <p>
              Norinoya tidak mengklaim kepemilikan atas materi tersebut dan menggunakannya secara terbatas untuk keperluan identifikasi karya, informasi, ulasan, edukasi, atau pemberitaan.
            </p>
            <p>
              Penggunaan materi visual tidak dimaksudkan untuk menggantikan karya asli maupun mengesankan adanya kepemilikan atau afiliasi resmi dengan pemegang hak, kecuali dinyatakan secara jelas.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
              2. Informasi Produk &amp; Affiliate
            </h3>
            <p>
              Norinoya dapat menampilkan informasi mengenai buku, manga, light novel, dan produk terkait beserta tautan menuju platform penjual atau distributor pihak ketiga.
            </p>
            <p>
              Beberapa tautan tersebut dapat merupakan tautan affiliate/referral. Apabila pengguna melakukan pembelian melalui tautan tersebut, Norinoya dapat menerima komisi sesuai dengan ketentuan program affiliate yang berlaku, tanpa biaya tambahan bagi pengguna.
            </p>
            <p>
              Harga, ketersediaan, stok, promosi, dan informasi produk pada platform pihak ketiga dapat berubah sewaktu-waktu. Norinoya menyarankan pengguna untuk memeriksa informasi terbaru pada halaman penjual sebelum melakukan pembelian.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
              3. Informasi Editorial
            </h3>
            <p>
              Informasi, ulasan, rekomendasi, rating usia, dan pandangan yang dipublikasikan di Norinoya merupakan bagian dari konten editorial Norinoya, kecuali dinyatakan sebagai informasi resmi dari penerbit, distributor, produsen, atau pemegang hak terkait.
            </p>
            <p>
              Rating atau rekomendasi yang diberikan Norinoya merupakan penilaian editorial dan tidak selalu mewakili rating atau klasifikasi resmi dari lembaga, penerbit, platform, atau pemegang hak terkait.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
              4. Sumber &amp; Referensi
            </h3>
            <p>
              Norinoya berupaya menggunakan sumber yang relevan dan dapat dipertanggungjawabkan dalam penyusunan informasi.
            </p>
            <p>
              Informasi mengenai karya dapat bersumber dari penerbit, distributor, platform resmi, katalog, database publik, maupun sumber lain yang relevan. Norinoya berupaya membedakan antara informasi faktual, sumber resmi, dan pendapat editorial.
            </p>
            <p>
              Apabila terdapat informasi yang tidak akurat atau materi yang dianggap melanggar hak pihak tertentu, pemilik hak dapat menghubungi Norinoya untuk menyampaikan koreksi atau permintaan peninjauan.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
              5. Perubahan Kebijakan
            </h3>
            <p>
              Norinoya dapat memperbarui Kebijakan Privasi, Penggunaan Cookie, dan Disclaimer ini apabila terdapat perubahan pada fitur, layanan, teknologi, atau ketentuan yang berlaku.
            </p>
            <p>
              Setiap perubahan akan diperbarui pada halaman ini.
            </p>
          </div>

          <div className="pt-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/80">
            Terakhir diperbarui: 9 September 2026
          </div>
        </div>
      </div>
    </motion.div>
  );
}
