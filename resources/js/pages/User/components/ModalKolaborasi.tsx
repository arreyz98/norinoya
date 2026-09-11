import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageCircle, Mail } from 'lucide-react';

export interface ModalKolaborasiProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalKolaborasi({ isOpen, onClose }: ModalKolaborasiProps) {
  const [briefSlide, setBriefSlide] = useState<number>(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-neutral-900 border border-neutral-800 text-white w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col font-sans"
          >
            {/* Modal Header */}
            <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 border border-neutral-700 bg-neutral-800 text-neutral-200 font-sans text-[10px] font-black tracking-wider uppercase rounded-md select-none">
                  Media Kit
                </span>
                <h3 className="font-sans font-black text-sm uppercase tracking-tight text-white flex items-center gap-1.5">
                  <span>Norinoya</span>
                  <span className="text-[11px] text-neutral-500 font-mono font-medium tracking-normal lowercase">
                    (halaman {briefSlide + 1}/2)
                  </span>
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-all active:scale-90"
              >
                ✕
              </button>
            </div>

            {/* Modal Body with Carousel Content */}
            <div className="p-6 flex flex-col justify-between">
              <div className="h-[460px] sm:h-[230px] relative overflow-visible">
                <AnimatePresence mode="wait">
                  {briefSlide === 0 && (
                    <motion.div
                      key="slide-0"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3.5"
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">
                          Layanan Kolaborasi
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                          Pilihan program publikasi &amp; promosi yang dapat kami hadirkan untuk produk atau event Anda.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                        <div className="bg-neutral-950/40 border border-neutral-850 p-2.5 rounded-xl flex gap-2.5 hover:border-neutral-800 transition-colors">
                          <div className="text-base shrink-0 select-none">📢</div>
                          <div className="space-y-0.5">
                            <h6 className="text-[11px] font-bold text-white">Press Release &amp; Broadcast</h6>
                            <p className="text-[10px] text-neutral-400 leading-normal">
                              Publikasi info rilis komik baru, cetak ulang, lisensi baru, dan berita event di website Norinoya &amp; Instagram.
                            </p>
                          </div>
                        </div>

                        <div className="bg-neutral-950/40 border border-neutral-850 p-2.5 rounded-xl flex gap-2.5 hover:border-neutral-800 transition-colors">
                          <div className="text-base shrink-0 select-none">📸</div>
                          <div className="space-y-0.5">
                            <h6 className="text-[11px] font-bold text-white">Event Coverage / Media Partner</h6>
                            <p className="text-[10px] text-neutral-400 leading-normal">
                              Liputan langsung jalannya event komunitas, pameran buku, book signing, serta kolaborasi publikasi poster.
                            </p>
                          </div>
                        </div>

                        <div className="bg-neutral-950/40 border border-neutral-850 p-2.5 rounded-xl flex gap-2.5 hover:border-neutral-800 transition-colors">
                          <div className="text-base shrink-0 select-none">📖</div>
                          <div className="space-y-0.5">
                            <h6 className="text-[11px] font-bold text-white">Premium Review &amp; Spotlight</h6>
                            <p className="text-[10px] text-neutral-400 leading-normal">
                              Ulasan detail fisik buku (kertas, cetakan, translasi) serta ulasan konten secara obyektif &amp; menarik.
                            </p>
                          </div>
                        </div>

                        <div className="bg-neutral-950/40 border border-neutral-850 p-2.5 rounded-xl flex gap-2.5 hover:border-neutral-800 transition-colors">
                          <div className="text-base shrink-0 select-none">🎨</div>
                          <div className="space-y-0.5">
                            <h6 className="text-[11px] font-bold text-white">Banner &amp; Native Advertising</h6>
                            <p className="text-[10px] text-neutral-400 leading-normal">
                              Pemasangan banner sponsor pada slot display Adsense di platform Norinoya untuk visibilitas maksimal.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {briefSlide === 1 && (
                    <motion.div
                      key="slide-1"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3.5"
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">
                          Prosedur Kolaborasi
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                          Alur kerja sama yang transparan untuk menjaga kualitas publikasi bagi pembaca.
                        </p>
                      </div>

                      <div className="bg-neutral-950/80 border border-neutral-800 p-3 rounded-xl space-y-1 pt-2">
                        <ul className="space-y-1.5 text-[10.5px] text-neutral-300 pl-4 list-decimal leading-relaxed">
                          <li>Hubungi kami melalui tombol <strong className="text-white">Kontak</strong> atau kirim email langsung ke <code className="text-neutral-200 font-mono">norinoya.official@gmail.com</code> dengan subjek <code className="text-neutral-400">[Partnership] Nama Brand/Event</code>.</li>
                          <li>Kirimkan detail brief, materi press release, aset gambar pendukung, atau jadwal peluncuran produk/event Anda.</li>
                          <li>Tim kami akan meninjau kelayakan konten agar selaras dengan ketertarikan komunitas pembaca Norinoya.</li>
                          <li>Penayangan artikel berita atau review akan dijadwalkan dan dikonfirmasikan kembali kepada pihak partner.</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Carousel Page Indicators & Arrow Controls */}
              <div className="flex items-center justify-between border-t border-neutral-800/60 pt-3 mt-4">
                <button
                  type="button"
                  disabled={briefSlide === 0}
                  onClick={() => setBriefSlide(prev => Math.max(0, prev - 1))}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-800 text-[11px] font-mono font-bold transition-all select-none ${
                    briefSlide === 0
                      ? 'opacity-30 cursor-not-allowed text-neutral-600 border-neutral-850 bg-transparent'
                      : 'cursor-pointer hover:bg-neutral-800 hover:text-white text-neutral-400 active:scale-95 bg-neutral-950/40'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
                  <span>Prev</span>
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-2">
                  {[0, 1].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBriefSlide(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        briefSlide === idx
                          ? 'bg-white scale-125'
                          : 'bg-neutral-700 hover:bg-neutral-500'
                      }`}
                      title={`Halaman ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={briefSlide === 1}
                  onClick={() => setBriefSlide(prev => Math.min(1, prev + 1))}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-800 text-[11px] font-mono font-bold transition-all select-none ${
                    briefSlide === 1
                      ? 'opacity-30 cursor-not-allowed text-neutral-600 border-neutral-850 bg-transparent'
                      : 'cursor-pointer hover:bg-neutral-800 hover:text-white text-neutral-400 active:scale-95 bg-neutral-950/40'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-4 flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-mono">©norinoya</span>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/628123456789?text=Halo%20Norinoya,%20saya%20tertarik%20untuk%20berkolaborasi%20mengenai%20partnership/press%20release."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white/10" />
                  <span>whatsapp</span>
                </a>
                <a
                  href="mailto:norinoya.official@gmail.com"
                  className="px-4 py-1.5 bg-white hover:bg-neutral-100 text-neutral-950 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>email</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}