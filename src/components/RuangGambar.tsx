import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface RuangGambarProps {
  gambarUrl?: string;
  labelGambar: string;
  namaLokasi: string;
  tinggiKelas?: string;
}

export function RuangGambar({
  gambarUrl,
  labelGambar,
  namaLokasi,
  tinggiKelas = 'h-48 sm:h-52',
}: RuangGambarProps) {
  const [gagalMuat, setGagalMuat] = useState(false);
  const adaGambarSah = Boolean(gambarUrl && gambarUrl.trim().length > 0 && !gagalMuat);

  if (adaGambarSah) {
    return (
      <div className={`w-full ${tinggiKelas} bg-slate-100 overflow-hidden`}>
        <img
          src={gambarUrl}
          alt={namaLokasi}
          referrerPolicy="no-referrer"
          onError={() => setGagalMuat(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={labelGambar}
      className={`w-full ${tinggiKelas} bg-gradient-to-br from-sky-100 via-cyan-50 to-amber-50 border-b border-sky-200 flex flex-col items-center justify-center text-center px-4 py-4 gap-2.5`}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-700 to-teal-600 text-white shadow-xs flex items-center justify-center">
        <ImageIcon className="w-6 h-6" aria-hidden="true" />
      </div>
      <div className="space-y-0.5 max-w-xs">
        <p className="text-base font-bold text-sky-950 leading-snug">
          {labelGambar}
        </p>
        <p className="text-sm font-medium text-sky-800/80">
          Gambar belum dibekalkan · Ruang ini boleh diganti
        </p>
      </div>
    </div>
  );
}
