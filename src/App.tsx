import { useState } from 'react';
import { BookOpen, Layers } from 'lucide-react';
import { ButiranDestinasi } from './components/ButiranDestinasi';
import { LatihanMengingat } from './components/LatihanMengingat';
import { PenapisStatus, SenaraiDestinasi } from './components/SenaraiDestinasi';
import { Destinasi, SENARAI_DESTINASI } from './data/destinasi';

type TabUtama = 'rujukan' | 'latihan';

export default function App() {
  const [tabAktif, setTabAktif] = useState<TabUtama>('rujukan');
  const [destinasiDipilih, setDestinasiDipilih] = useState<Destinasi | null>(null);
  const [carian, setCarian] = useState<string>('');
  const [penapis, setPenapis] = useState<PenapisStatus>('semua');
  const [destinasiLatihanId, setDestinasiLatihanId] = useState<string | null>(null);

  function bukaTabRujukan() {
    setTabAktif('rujukan');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function bukaTabLatihan(lokasiId: string | null = null) {
    setDestinasiLatihanId(lokasiId);
    setTabAktif('latihan');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function pilihDestinasi(d: Destinasi | null) {
    setDestinasiDipilih(d);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return (
    <div className="min-h-screen flex flex-col bg-sky-50/60 text-slate-900">
      {/* Bar atas: 3 zon bersih dengan warna lautan Labuan yang bertenaga */}
      <header className="bg-gradient-to-r from-sky-900 via-teal-800 to-cyan-800 text-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => {
              setDestinasiDipilih(null);
              bukaTabRujukan();
            }}
            className="text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded-md"
          >
            Poket Pemandu Labuan
          </button>

          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-6 text-base font-medium"
          >
            <button
              type="button"
              onClick={bukaTabRujukan}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                tabAktif === 'rujukan'
                  ? 'border-amber-300 text-amber-300 font-semibold'
                  : 'border-transparent text-sky-100 hover:text-white'
              }`}
            >
              Rujukan Destinasi
            </button>
            <button
              type="button"
              onClick={() => bukaTabLatihan(null)}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                tabAktif === 'latihan'
                  ? 'border-amber-300 text-amber-300 font-semibold'
                  : 'border-transparent text-sky-100 hover:text-white'
              }`}
            >
              Latihan Mengingat
            </button>
          </nav>

          <div className="shrink-0">
            {tabAktif === 'rujukan' ? (
              <button
                type="button"
                onClick={() =>
                  bukaTabLatihan(destinasiDipilih ? destinasiDipilih.id : null)
                }
                className="min-h-[40px] px-4 py-2 bg-amber-400 text-slate-950 text-sm font-bold rounded-xl hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-900 focus-visible:ring-amber-300"
              >
                Mula Latihan
              </button>
            ) : (
              <button
                type="button"
                onClick={bukaTabRujukan}
                className="min-h-[40px] px-4 py-2 bg-white text-sky-950 text-sm font-bold rounded-xl hover:bg-sky-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-900 focus-visible:ring-amber-300"
              >
                Lihat Rujukan
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Kandungan utama dengan ruang bawah cukup untuk bar ibu jari telefon */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
        {tabAktif === 'rujukan' ? (
          destinasiDipilih ? (
            <ButiranDestinasi
              destinasi={destinasiDipilih}
              onKembali={() => pilihDestinasi(null)}
              onMulaLatihanLokasi={(id) => bukaTabLatihan(id)}
            />
          ) : (
            <SenaraiDestinasi
              senarai={SENARAI_DESTINASI}
              carian={carian}
              onUbahCarian={setCarian}
              penapis={penapis}
              onUbahPenapis={setPenapis}
              onPilihDestinasi={(d) => pilihDestinasi(d)}
            />
          )
        ) : (
          <LatihanMengingat
            key={destinasiLatihanId ?? 'semua'}
            senarai={SENARAI_DESTINASI}
            destinasiAwalId={destinasiLatihanId}
            onKeRujukan={bukaTabRujukan}
          />
        )}
      </main>

      {/* Bar navigasi bawah mesra ibu jari untuk telefon (64px < 15% tinggi skrin) */}
      <nav
        aria-label="Navigasi telefon"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sky-200 pb-safe shadow-[0_-4px_16px_-4px_rgba(14,116,144,0.08)]"
      >
        <div className="grid grid-cols-2 h-16">
          <button
            type="button"
            onClick={bukaTabRujukan}
            className={`relative flex flex-col items-center justify-center gap-1 min-h-[48px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-700 ${
              tabAktif === 'rujukan'
                ? 'text-sky-800 bg-sky-50/80 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tabAktif === 'rujukan' && (
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r from-sky-600 to-teal-600"
              />
            )}
            <BookOpen className="w-6 h-6" aria-hidden="true" />
            <span className="text-xs whitespace-nowrap">Rujukan</span>
          </button>

          <button
            type="button"
            onClick={() => bukaTabLatihan(null)}
            className={`relative flex flex-col items-center justify-center gap-1 min-h-[48px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-700 ${
              tabAktif === 'latihan'
                ? 'text-sky-800 bg-sky-50/80 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tabAktif === 'latihan' && (
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r from-sky-600 to-teal-600"
              />
            )}
            <Layers className="w-6 h-6" aria-hidden="true" />
            <span className="text-xs whitespace-nowrap">Latihan</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
