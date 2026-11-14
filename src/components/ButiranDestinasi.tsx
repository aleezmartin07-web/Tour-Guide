import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BookMarked,
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
  KeyRound,
  MessageSquareQuote,
  Zap,
  FileText,
} from 'lucide-react';
import { Destinasi, TEKS_TIADA_MAKLUMAT } from '../data/destinasi';
import { RuangGambar } from './RuangGambar';

interface ButiranDestinasiProps {
  destinasi: Destinasi;
  onKembali: () => void;
  onMulaLatihanLokasi: (destinasiId: string) => void;
}

type ModPaparan = 'penuh' | 'cepat';

export function ButiranDestinasi({
  destinasi,
  onKembali,
  onMulaLatihanLokasi,
}: ButiranDestinasiProps) {
  const [modPaparan, setModPaparan] = useState<ModPaparan>('penuh');
  const [jawapanTerbuka, setJawapanTerbuka] = useState<Record<string, boolean>>({});

  const adaSebarangBahan =
    destinasi.faktaDisahkan.length > 0 ||
    destinasi.catatanPerluDisemak.length > 0 ||
    destinasi.cerita60Saat !== null ||
    destinasi.kataKunci.length > 0 ||
    destinasi.kuiz.length > 0 ||
    destinasi.sumberUtama.length > 0;

  function togolJawapan(soalanId: string) {
    setJawapanTerbuka((sebelum) => ({
      ...sebelum,
      [soalanId]: !sebelum[soalanId],
    }));
  }

  return (
    <article aria-labelledby="tajuk-destinasi" className="space-y-6">
      {/* Bar butang kembali di bahagian atas */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onKembali}
          className="inline-flex items-center gap-2.5 min-h-[54px] px-5 py-3 bg-white border border-sky-300 text-sky-950 text-lg font-semibold rounded-xl hover:bg-sky-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span>Kembali</span>
        </button>

        <button
          type="button"
          onClick={() => onMulaLatihanLokasi(destinasi.id)}
          className="inline-flex items-center justify-center min-h-[54px] px-6 py-3 bg-gradient-to-r from-sky-700 to-teal-700 text-white text-lg font-bold rounded-xl hover:from-sky-800 hover:to-teal-800 shadow-xs transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-700"
        >
          Uji Ingatan
        </button>
      </div>

      {/* Penukar mod: Paparan Penuh vs Rujukan Cepat */}
      <div
        role="group"
        aria-label="Mod paparan halaman lokasi"
        className="grid grid-cols-2 gap-2 p-1.5 bg-sky-100/80 border border-sky-200 rounded-2xl"
      >
        <button
          type="button"
          onClick={() => setModPaparan('penuh')}
          aria-pressed={modPaparan === 'penuh'}
          className={`min-h-[52px] px-3 py-2.5 rounded-xl text-base sm:text-lg font-bold inline-flex items-center justify-center gap-2 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
            modPaparan === 'penuh'
              ? 'bg-gradient-to-r from-sky-700 to-cyan-700 text-white shadow-xs'
              : 'text-sky-900 hover:bg-white/70'
          }`}
        >
          <FileText className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Paparan penuh</span>
        </button>

        <button
          type="button"
          onClick={() => setModPaparan('cepat')}
          aria-pressed={modPaparan === 'cepat'}
          className={`min-h-[52px] px-3 py-2.5 rounded-xl text-base sm:text-lg font-bold inline-flex items-center justify-center gap-2 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
            modPaparan === 'cepat'
              ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-xs'
              : 'text-sky-900 hover:bg-white/70'
          }`}
        >
          <Zap className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Rujukan cepat</span>
        </button>
      </div>

      {modPaparan === 'cepat' ? (
        /* Mod Rujukan Cepat: muat dalam satu skrin telefon yang mudah dibaca */
        <div className="bg-white border border-sky-200 rounded-2xl overflow-hidden shadow-xs">
          <header className="bg-gradient-to-r from-sky-900 via-teal-800 to-cyan-800 text-white p-5 sm:p-6 space-y-1">
            <p className="text-sm font-semibold text-amber-300">
              Mod Rujukan Cepat · {destinasi.kawasan}
            </p>
            <h1
              id="tajuk-destinasi"
              className="text-2xl sm:text-3xl font-bold text-white leading-tight text-balance"
            >
              {destinasi.namaPenuh}
            </h1>
          </header>

          <div className="p-5 sm:p-6 space-y-5">

          {/* Fakta Utama */}
          <section aria-labelledby="tajuk-cepat-fakta" className="space-y-2.5">
            <h2
              id="tajuk-cepat-fakta"
              className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-emerald-800"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Fakta Utama</span>
            </h2>

            {destinasi.faktaDisahkan.length === 0 ? (
              <p className="text-lg sm:text-[19px] text-slate-700">
                {TEKS_TIADA_MAKLUMAT}
              </p>
            ) : (
              <ul className="list-disc pl-5 space-y-2 text-lg sm:text-[19px] leading-snug text-slate-900">
                {destinasi.faktaDisahkan.map((item) => (
                  <li key={item.id}>{item.teks}</li>
                ))}
              </ul>
            )}

            {destinasi.catatanPerluDisemak.length > 0 && (
              <div className="pt-2 space-y-1.5">
                <p className="inline-flex items-center gap-1.5 text-base font-bold text-amber-800">
                  <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Catatan Perlu Disemak</span>
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-base sm:text-lg text-slate-800">
                  {destinasi.catatanPerluDisemak.map((item) => (
                    <li key={item.id}>{item.teks}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Lima Kata Kunci */}
          <section
            aria-labelledby="tajuk-cepat-kata"
            className="space-y-2.5 pt-4 border-t border-slate-200"
          >
            <h2
              id="tajuk-cepat-kata"
              className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-teal-800"
            >
              <KeyRound className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Lima Kata Kunci</span>
            </h2>

            {destinasi.kataKunci.length === 0 ? (
              <p className="text-lg sm:text-[19px] text-slate-700">
                {TEKS_TIADA_MAKLUMAT}
              </p>
            ) : (
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 tabular-nums">
                {destinasi.kataKunci.map((kata, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 bg-sky-50/80 border border-sky-200 rounded-xl px-3.5 py-2.5 text-lg font-bold text-sky-950"
                  >
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-700 to-teal-700 text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{kata}</span>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {/* Sumber Rujukan */}
          <section
            aria-labelledby="tajuk-cepat-sumber"
            className="space-y-1.5 pt-4 border-t border-sky-100"
          >
            <h2
              id="tajuk-cepat-sumber"
              className="text-base font-bold text-sky-950"
            >
              Sumber Rujukan
            </h2>
            {destinasi.sumberUtama.length === 0 ? (
              <p className="text-base sm:text-lg text-slate-700">
                {TEKS_TIADA_MAKLUMAT}
              </p>
            ) : (
              <ul className="space-y-1 text-base text-slate-800 break-words">
                {destinasi.sumberUtama.map((sumber, idx) => (
                  <li key={idx}>
                    {sumber.startsWith('http://') || sumber.startsWith('https://') ? (
                      <a
                        href={sumber}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-800 underline underline-offset-4 hover:text-sky-950 font-medium"
                      >
                        {sumber}
                      </a>
                    ) : (
                      <span>{sumber}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="pt-1">
            <button
              type="button"
              onClick={onKembali}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[54px] px-6 py-3 bg-sky-950 text-white text-lg font-bold rounded-xl hover:bg-sky-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-950"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              <span>Kembali ke Halaman Utama</span>
            </button>
          </div>
          </div>
        </div>
      ) : (
        <>

      {/* Kad kepala lokasi bersama ruang gambar */}
      <header className="bg-white border border-sky-200 rounded-2xl overflow-hidden shadow-xs">
        <RuangGambar
          gambarUrl={destinasi.gambarUrl}
          labelGambar={destinasi.labelGambar}
          namaLokasi={destinasi.namaPenuh}
          tinggiKelas="h-52 sm:h-64"
        />
        <div className="p-5 sm:p-6 space-y-1.5">
          <p className="text-sm font-bold text-sky-800">{destinasi.kawasan}</p>
          <h1
            id="tajuk-destinasi"
            className="text-2xl sm:text-3xl font-bold text-sky-950 leading-tight text-balance"
          >
            {destinasi.namaPenuh}
          </h1>
          <p className="text-sm font-medium text-teal-800">
            {adaSebarangBahan
              ? 'Bahan telah disemak dan sedia untuk rujukan pemandu pelancong.'
              : TEKS_TIADA_MAKLUMAT}
          </p>
        </div>
      </header>

      {/* Galeri gambar lokasi (hanya jika gambar dibekalkan) */}
      {destinasi.galeriGambar && destinasi.galeriGambar.length > 0 && (
        <section
          aria-labelledby="tajuk-galeri"
          className="bg-white border border-sky-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs"
        >
          <h2 id="tajuk-galeri" className="text-xl sm:text-2xl font-bold text-sky-950">
            Gambar Lokasi ({destinasi.galeriGambar.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinasi.galeriGambar.map((gambar, idx) => (
              <figure
                key={idx}
                className="bg-sky-50/50 border border-sky-200 rounded-xl overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={gambar.url}
                    alt={gambar.kapsyen}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="p-3 text-base font-semibold text-sky-950">
                  {gambar.kapsyen}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 1. Fakta penting dalam poin pendek */}
      <section
        aria-labelledby="tajuk-fakta-penting"
        className="bg-white border border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs"
      >
        <div className="flex items-center gap-3 border-b border-emerald-100 pb-3.5">
          <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </span>
          <div>
            <h2 id="tajuk-fakta-penting" className="text-xl sm:text-2xl font-bold text-slate-900">
              1. Fakta Penting
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Poin pendek yang dibezakan antara fakta disahkan dan catatan perlu disemak.
            </p>
          </div>
        </div>

        {/* Fakta Disahkan */}
        <div className="space-y-2.5">
          <h3 className="text-lg font-bold text-emerald-800">
            Fakta Disahkan
          </h3>
          {destinasi.faktaDisahkan.length === 0 ? (
            <p className="text-lg sm:text-[19px] text-slate-700">
              {TEKS_TIADA_MAKLUMAT}
            </p>
          ) : (
            <ul className="list-disc pl-5 space-y-3 text-lg sm:text-[19px] leading-relaxed text-slate-800">
              {destinasi.faktaDisahkan.map((item) => (
                <li key={item.id}>{item.teks}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Catatan Perlu Disemak */}
        <div className="space-y-2.5 pt-4 border-t border-slate-100">
          <h3 className="inline-flex items-center gap-2 text-lg font-bold text-amber-800">
            <AlertTriangle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Catatan Perlu Disemak</span>
          </h3>
          {destinasi.catatanPerluDisemak.length > 0 ? (
            <ul className="list-disc pl-5 space-y-3 text-lg sm:text-[19px] leading-relaxed text-slate-800">
              {destinasi.catatanPerluDisemak.map((item) => (
                <li key={item.id}>{item.teks}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg sm:text-[19px] text-slate-700">
              {adaSebarangBahan
                ? 'Tiada catatan tambahan yang perlu disemak.'
                : TEKS_TIADA_MAKLUMAT}
            </p>
          )}
        </div>
      </section>

      {/* 2. Cerita 60 saat mengikut lima langkah Sesi 2 */}
      <section
        aria-labelledby="tajuk-cerita-60"
        className="bg-white border border-sky-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs"
      >
        <div className="flex items-center gap-3 border-b border-sky-100 pb-3.5">
          <span className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
            <MessageSquareQuote className="w-6 h-6" aria-hidden="true" />
          </span>
          <div>
            <h2 id="tajuk-cerita-60" className="text-xl sm:text-2xl font-bold text-slate-900">
              2. Cerita 60 Saat (5 Langkah Sesi 2)
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Panduan penyampaian ringkas di hadapan pelawat.
            </p>
          </div>
        </div>

        {!destinasi.cerita60Saat ? (
          <p className="text-lg sm:text-[19px] text-slate-700">
            {TEKS_TIADA_MAKLUMAT}
          </p>
        ) : (
          <ol className="divide-y divide-sky-100">
            {[
              {
                langkah: 'Langkah 1 · Tarikan pembuka',
                isi: destinasi.cerita60Saat.tarikanPembuka,
              },
              {
                langkah: 'Langkah 2 · Fakta disahkan',
                isi: destinasi.cerita60Saat.faktaDisahkan,
              },
              {
                langkah: 'Langkah 3 · Makna tempat',
                isi: destinasi.cerita60Saat.maknaTempat,
              },
              {
                langkah: 'Langkah 4 · Hubungan dengan pelawat',
                isi: destinasi.cerita60Saat.hubunganPelawat,
              },
              {
                langkah: 'Langkah 5 · Soalan atau ajakan',
                isi: destinasi.cerita60Saat.soalanAtauAjakan,
              },
            ].map((bahagian, idx) => (
              <li key={idx} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5">
                <h3 className="text-lg font-bold text-sky-800">
                  {bahagian.langkah}
                </h3>
                <p className="text-lg sm:text-[19px] leading-relaxed text-slate-800">
                  {bahagian.isi}
                </p>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* 3. Lima kata kunci untuk membantu ingatan */}
      <section
        aria-labelledby="tajuk-kata-kunci"
        className="bg-white border border-amber-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs"
      >
        <div className="flex items-center gap-3 border-b border-amber-100 pb-3.5">
          <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <KeyRound className="w-6 h-6" aria-hidden="true" />
          </span>
          <div>
            <h2 id="tajuk-kata-kunci" className="text-xl sm:text-2xl font-bold text-slate-900">
              3. Lima Kata Kunci Ingatan
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Kata kunci utama untuk diingat sebelum mula bercakap.
            </p>
          </div>
        </div>

        {destinasi.kataKunci.length === 0 ? (
          <p className="text-lg sm:text-[19px] text-slate-700">
            {TEKS_TIADA_MAKLUMAT}
          </p>
        ) : (
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 tabular-nums">
            {destinasi.kataKunci.map((kata, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 bg-amber-50/60 border border-amber-200 rounded-xl px-4 py-3.5 text-lg font-bold text-slate-900"
              >
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white text-base font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{kata}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* 4. Kuiz ringkas (jawapan hanya muncul selepas butang ditekan) */}
      <section
        aria-labelledby="tajuk-kuiz"
        className="bg-white border border-indigo-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs"
      >
        <div className="flex items-center gap-3 border-b border-indigo-100 pb-3.5">
          <span className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6" aria-hidden="true" />
          </span>
          <div>
            <h2 id="tajuk-kuiz" className="text-xl sm:text-2xl font-bold text-slate-900">
              4. Kuiz Ringkas
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Cuba jawab dahulu, kemudian tekan butang untuk semak jawapan.
            </p>
          </div>
        </div>

        {destinasi.kuiz.length === 0 ? (
          <p className="text-lg sm:text-[19px] text-slate-700">
            {TEKS_TIADA_MAKLUMAT}
          </p>
        ) : (
          <div className="space-y-4">
            {destinasi.kuiz.map((item, idx) => {
              const dibuka = Boolean(jawapanTerbuka[item.id]);
              return (
                <div
                  key={item.id}
                  className="bg-indigo-50/40 border border-indigo-200/80 rounded-xl p-4 sm:p-5 space-y-3.5"
                >
                  <p className="text-lg sm:text-[19px] font-semibold text-slate-900 leading-relaxed">
                    Soalan {idx + 1}: {item.soalan}
                  </p>

                  <button
                    type="button"
                    onClick={() => togolJawapan(item.id)}
                    aria-expanded={dibuka}
                    className="inline-flex items-center justify-center gap-2.5 min-h-[54px] px-6 py-3 bg-gradient-to-r from-sky-700 to-indigo-700 text-white text-lg font-bold rounded-xl hover:from-sky-800 hover:to-indigo-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-700"
                  >
                    {dibuka ? (
                      <>
                        <EyeOff className="w-5 h-5" aria-hidden="true" />
                        <span>Sembunyi jawapan</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-5 h-5" aria-hidden="true" />
                        <span>Lihat jawapan</span>
                      </>
                    )}
                  </button>

                  {dibuka && (
                    <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-1">
                      <p className="text-sm font-bold text-emerald-800">
                        Jawapan Disahkan
                      </p>
                      <p className="text-lg sm:text-[19px] leading-relaxed text-slate-900">
                        {item.jawapan}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Sumber rujukan dan butang kembali */}
      <section
        aria-labelledby="tajuk-sumber"
        className="bg-white border border-teal-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs"
      >
        <div className="flex items-center gap-3 border-b border-teal-100 pb-3.5">
          <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <BookMarked className="w-6 h-6" aria-hidden="true" />
          </span>
          <div>
            <h2 id="tajuk-sumber" className="text-xl sm:text-2xl font-bold text-slate-900">
              5. Sumber Rujukan
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Rujukan rasmi bagi maklumat lokasi ini.
            </p>
          </div>
        </div>

        {destinasi.sumberUtama.length === 0 ? (
          <p className="text-lg sm:text-[19px] text-slate-700">
            {TEKS_TIADA_MAKLUMAT}
          </p>
        ) : (
          <ul className="space-y-2.5 text-lg text-slate-800">
            {destinasi.sumberUtama.map((sumber, idx) => (
              <li key={idx} className="break-words">
                {sumber.startsWith('http://') || sumber.startsWith('https://') ? (
                  <a
                    href={sumber}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-800 underline underline-offset-4 hover:text-sky-950 font-medium"
                  >
                    {sumber}
                  </a>
                ) : (
                  <span>{sumber}</span>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={onKembali}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[56px] px-6 py-3.5 bg-sky-950 text-white text-lg font-bold rounded-xl hover:bg-sky-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-950"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            <span>Kembali ke Halaman Utama</span>
          </button>
        </div>
      </section>
        </>
      )}
    </article>
  );
}
