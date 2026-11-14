import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  KeyRound,
  RotateCcw,
} from 'lucide-react';
import { Destinasi, TEKS_TIADA_MAKLUMAT } from '../data/destinasi';

interface LatihanMengingatProps {
  senarai: Destinasi[];
  destinasiAwalId: string | null;
  onKeRujukan: () => void;
}

export function LatihanMengingat({
  senarai,
  destinasiAwalId,
  onKeRujukan,
}: LatihanMengingatProps) {
  const [pilihanDestinasiId, setPilihanDestinasiId] = useState<string>(
    destinasiAwalId ?? 'semua'
  );
  const [indeksSemasa, setIndeksSemasa] = useState<number>(0);
  const [jawapanDibuka, setJawapanDibuka] = useState<boolean>(false);
  const [statusIngat, setStatusIngat] = useState<Record<string, 'ingat' | 'ulang'>>({});

  const senaraiKad = useMemo(() => {
    if (pilihanDestinasiId === 'semua') return senarai;
    return senarai.filter((d) => d.id === pilihanDestinasiId);
  }, [senarai, pilihanDestinasiId]);

  const indeksSelamat =
    senaraiKad.length > 0 ? Math.min(indeksSemasa, senaraiKad.length - 1) : 0;
  const kadSemasa = senaraiKad[indeksSelamat];

  const jumlahIngat = senaraiKad.filter((d) => statusIngat[d.id] === 'ingat').length;

  function tukarPilihanDestinasi(idBaru: string) {
    setPilihanDestinasiId(idBaru);
    setIndeksSemasa(0);
    setJawapanDibuka(false);
  }

  function rekodJawapan(keputusan: 'ingat' | 'ulang') {
    if (!kadSemasa) return;
    setStatusIngat((sebelum) => ({
      ...sebelum,
      [kadSemasa.id]: keputusan,
    }));
    setJawapanDibuka(false);
    if (indeksSelamat < senaraiKad.length - 1) {
      setIndeksSemasa(indeksSelamat + 1);
    } else {
      setIndeksSemasa(0);
    }
  }

  function mulaSemula() {
    setStatusIngat({});
    setIndeksSemasa(0);
    setJawapanDibuka(false);
  }

  return (
    <section aria-labelledby="tajuk-latihan" className="space-y-6">
      <div className="space-y-2">
        <h1
          id="tajuk-latihan"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-sky-950 text-balance"
        >
          Latihan Mengingat
        </h1>
        <p className="text-base sm:text-[17px] leading-relaxed text-slate-700 max-w-2xl">
          Baca nama lokasi, cuba ingat fakta disahkan, kata kunci dan sumbernya, kemudian tekan butang untuk semak jawapan.
        </p>
      </div>

      {/* Pilihan lokasi latihan & kiraan ringkas */}
      <div className="bg-white border border-sky-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs">
        <div className="space-y-1.5 flex-1">
          <label
            htmlFor="pilih-lokasi-latihan"
            className="block text-sm font-semibold text-sky-900"
          >
            Pilih Skop Latihan
          </label>
          <select
            id="pilih-lokasi-latihan"
            value={pilihanDestinasiId}
            onChange={(e) => tukarPilihanDestinasi(e.target.value)}
            className="w-full min-h-[48px] px-3.5 py-2 text-base sm:text-[17px] bg-sky-50/50 border border-sky-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
          >
            <option value="semua">Semua Destinasi ({senarai.length})</option>
            {senarai.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 pt-1 sm:pt-5">
          <div className="text-left sm:text-right tabular-nums">
            <p className="text-sm font-medium text-sky-800">Sudah Ingat</p>
            <p className="text-xl font-bold text-emerald-700">
              {jumlahIngat} / {senaraiKad.length}
            </p>
          </div>
          <button
            type="button"
            onClick={mulaSemula}
            className="inline-flex items-center gap-2 min-h-[48px] px-4 py-2.5 bg-sky-100 text-sky-950 text-base font-semibold rounded-xl hover:bg-sky-200 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
          >
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
            <span>Ulang Semula</span>
          </button>
        </div>
      </div>

      {/* Kad Imbas */}
      {!kadSemasa ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-4">
          <p className="text-lg font-semibold text-slate-900">
            {TEKS_TIADA_MAKLUMAT}
          </p>
          <button
            type="button"
            onClick={onKeRujukan}
            className="inline-flex items-center justify-center min-h-[48px] px-5 py-2.5 bg-teal-700 text-white text-base font-semibold rounded-xl hover:bg-teal-800 transition-colors whitespace-nowrap"
          >
            Pergi ke Rujukan Destinasi
          </button>
        </div>
      ) : (
        <div className="bg-white border border-sky-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="bg-gradient-to-r from-sky-800 to-teal-700 px-5 sm:px-6 py-3 flex items-center justify-between gap-2 text-sm text-white tabular-nums">
            <span className="font-semibold">
              Kad {indeksSelamat + 1} daripada {senaraiKad.length}
            </span>
            {statusIngat[kadSemasa.id] === 'ingat' && (
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-200">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Sudah Ingat
              </span>
            )}
            {statusIngat[kadSemasa.id] === 'ulang' && (
              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                Perlu Ulang
              </span>
            )}
          </div>

          <div className="p-5 sm:p-6 space-y-6">
          <div className="space-y-2 py-1">
            <p className="text-sm font-semibold text-sky-800">
              {kadSemasa.kawasan}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-950 leading-snug text-balance">
              {kadSemasa.namaPenuh}
            </h2>
            <p className="text-base sm:text-[17px] text-slate-700">
              Cuba sebutkan fakta yang telah disahkan, kata kunci serta sumber rujukan bagi destinasi ini.
            </p>
          </div>

          {!jawapanDibuka ? (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setJawapanDibuka(true)}
                className="w-full min-h-[54px] px-5 py-3 bg-gradient-to-r from-sky-700 to-teal-700 text-white text-lg font-bold rounded-xl hover:from-sky-800 hover:to-teal-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-700"
              >
                <Eye className="w-5 h-5" aria-hidden="true" />
                <span>Tunjuk Jawapan</span>
              </button>
            </div>
          ) : (
            <div className="space-y-5 pt-2 border-t border-slate-200">
              {/* Fakta Disahkan */}
              <div className="space-y-2">
                <h3 className="inline-flex items-center gap-2 text-lg font-bold text-emerald-800">
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  Fakta Disahkan
                </h3>
                {kadSemasa.faktaDisahkan.length === 0 ? (
                  <p className="text-base sm:text-[17px] text-slate-700">
                    {TEKS_TIADA_MAKLUMAT}
                  </p>
                ) : (
                  <ul className="list-disc pl-5 space-y-2 text-base sm:text-[17px] text-slate-800">
                    {kadSemasa.faktaDisahkan.map((item) => (
                      <li key={item.id}>{item.teks}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Lima Kata Kunci */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <h3 className="inline-flex items-center gap-2 text-lg font-bold text-teal-800">
                  <KeyRound className="w-5 h-5" aria-hidden="true" />
                  Kata Kunci Ingatan
                </h3>
                {kadSemasa.kataKunci.length === 0 ? (
                  <p className="text-base sm:text-[17px] text-slate-700">
                    {TEKS_TIADA_MAKLUMAT}
                  </p>
                ) : (
                  <p className="text-base sm:text-[17px] font-medium text-slate-800">
                    {kadSemasa.kataKunci.join(' · ')}
                  </p>
                )}
              </div>

              {/* Sumber */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  Sumber Rujukan
                </h3>
                {kadSemasa.sumberUtama.length === 0 ? (
                  <p className="text-base sm:text-[17px] text-slate-700">
                    {TEKS_TIADA_MAKLUMAT}
                  </p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 break-words">
                    {kadSemasa.sumberUtama.map((sumber, idx) => (
                      <li key={idx}>{sumber}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Butang semak diri */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => rekodJawapan('ulang')}
                  className="min-h-[52px] px-4 py-3 bg-amber-100 border border-amber-300 text-amber-950 text-base font-bold rounded-xl hover:bg-amber-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
                >
                  Perlu Ulang
                </button>
                <button
                  type="button"
                  onClick={() => rekodJawapan('ingat')}
                  className="min-h-[52px] px-4 py-3 bg-emerald-600 text-white text-base font-bold rounded-xl hover:bg-emerald-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600"
                >
                  Sudah Ingat
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      )}
    </section>
  );
}
