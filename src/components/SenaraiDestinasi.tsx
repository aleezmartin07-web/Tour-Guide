import { ChevronRight, Search, X } from 'lucide-react';
import { Destinasi, TEKS_TIADA_MAKLUMAT } from '../data/destinasi';
import { RuangGambar } from './RuangGambar';

export type PenapisStatus = 'semua' | 'ada_bahan' | 'belum_ada';

interface SenaraiDestinasiProps {
  senarai: Destinasi[];
  carian: string;
  onUbahCarian: (nilai: string) => void;
  penapis: PenapisStatus;
  onUbahPenapis: (nilai: PenapisStatus) => void;
  onPilihDestinasi: (destinasi: Destinasi) => void;
}

function adaBahan(d: Destinasi): boolean {
  return (
    d.faktaDisahkan.length > 0 ||
    d.catatanPerluDisemak.length > 0 ||
    d.cerita60Saat !== null ||
    d.kataKunci.length > 0 ||
    d.kuiz.length > 0 ||
    d.sumberUtama.length > 0
  );
}

export function SenaraiDestinasi({
  senarai,
  carian,
  onUbahCarian,
  penapis,
  onUbahPenapis,
  onPilihDestinasi,
}: SenaraiDestinasiProps) {
  const kataKunci = carian.trim().toLowerCase();

  const senaraiTapis = senarai.filter((item) => {
    const padanCarian =
      kataKunci.length === 0 ||
      item.nama.toLowerCase().includes(kataKunci) ||
      item.namaPenuh.toLowerCase().includes(kataKunci) ||
      item.kawasan.toLowerCase().includes(kataKunci);

    if (!padanCarian) return false;

    const berbahan = adaBahan(item);
    if (penapis === 'ada_bahan') return berbahan;
    if (penapis === 'belum_ada') return !berbahan;
    return true;
  });

  return (
    <section aria-labelledby="tajuk-rujukan" className="space-y-6">
      <div className="space-y-2">
        <h1
          id="tajuk-rujukan"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-sky-950 text-balance"
        >
          Destinasi Pelancongan Labuan
        </h1>
        <p className="text-base sm:text-[17px] leading-relaxed text-slate-700 max-w-2xl">
          Pilih kad lokasi di bawah untuk baca fakta penting, cerita 60 saat, lima kata kunci, kuiz ringkas dan sumber rujukan.
        </p>
      </div>

      {/* Kotak carian & penapis mudah tekan */}
      <div className="bg-white border border-sky-200/80 shadow-xs rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="relative">
          <label htmlFor="cari-destinasi" className="sr-only">
            Cari nama destinasi
          </label>
          <Search
            className="w-5 h-5 text-sky-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="cari-destinasi"
            type="search"
            value={carian}
            onChange={(e) => onUbahCarian(e.target.value)}
            placeholder="Cari nama lokasi di Labuan..."
            className="w-full min-h-[48px] pl-11 pr-11 py-2.5 text-base sm:text-[17px] bg-sky-50/50 border border-sky-200 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
          />
          {carian.length > 0 && (
            <button
              type="button"
              onClick={() => onUbahCarian('')}
              aria-label="Kosongkan carian"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 hover:text-sky-900 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="Tapis status bahan destinasi"
          className="grid grid-cols-3 gap-1.5 p-1.5 bg-sky-100/70 rounded-xl"
        >
          {(
            [
              { id: 'semua', label: 'Semua' },
              { id: 'ada_bahan', label: 'Ada Bahan' },
              { id: 'belum_ada', label: 'Belum Diisi' },
            ] as const
          ).map((tab) => {
            const aktif = penapis === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onUbahPenapis(tab.id)}
                className={`min-h-[44px] px-3 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all whitespace-nowrap truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
                  aktif
                    ? 'bg-gradient-to-r from-sky-700 to-teal-700 text-white shadow-xs'
                    : 'text-sky-900 hover:bg-white/70'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid 4 kad bergambar destinasi */}
      {senaraiTapis.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-3">
          <p className="text-lg font-semibold text-slate-900">
            Tiada destinasi ditemui
          </p>
          <p className="text-base text-slate-700">
            {penapis !== 'semua' || carian.length > 0
              ? 'Cuba tukar kata kunci carian atau pilih penapis Semua.'
              : TEKS_TIADA_MAKLUMAT}
          </p>
          {(penapis !== 'semua' || carian.length > 0) && (
            <button
              type="button"
              onClick={() => {
                onUbahCarian('');
                onUbahPenapis('semua');
              }}
              className="inline-flex items-center justify-center min-h-[48px] px-5 py-2.5 bg-teal-700 text-white text-base font-semibold rounded-xl hover:bg-teal-800 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-700"
            >
              Papar Semua Destinasi
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {senaraiTapis.map((destinasi) => {
            const jumlahDisahkan = destinasi.faktaDisahkan.length;
            const berbahan = adaBahan(destinasi);

            return (
              <button
                key={destinasi.id}
                type="button"
                onClick={() => onPilihDestinasi(destinasi)}
                className={`group w-full text-left bg-white border rounded-2xl overflow-hidden transition-all flex flex-col hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
                  berbahan
                    ? 'border-teal-300 hover:border-teal-600'
                    : 'border-sky-200 hover:border-sky-500'
                }`}
              >
                <RuangGambar
                  gambarUrl={destinasi.gambarUrl}
                  labelGambar={destinasi.labelGambar}
                  namaLokasi={destinasi.namaPenuh}
                  tinggiKelas="h-44 sm:h-48"
                />

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-sky-950 leading-snug">
                      {destinasi.nama}
                    </h2>

                    <p className="text-base text-slate-700 leading-relaxed">
                      {berbahan
                        ? destinasi.faktaDisahkan[0]?.teks
                        : TEKS_TIADA_MAKLUMAT}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-sky-100 flex items-center justify-between gap-3">
                    <span
                      className={`text-sm font-semibold tabular-nums ${
                        berbahan ? 'text-teal-700' : 'text-amber-700'
                      }`}
                    >
                      {berbahan
                        ? `Disemak · ${jumlahDisahkan} fakta`
                        : 'Belum diisi · 0 fakta'}
                    </span>

                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 group-hover:bg-sky-700 group-hover:text-white text-base font-bold transition-colors whitespace-nowrap">
                      <span>Buka</span>
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
