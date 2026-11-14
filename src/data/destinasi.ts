export interface FaktaItem {
  id: string;
  teks: string;
}

export interface Cerita60Saat {
  tarikanPembuka: string;
  faktaDisahkan: string;
  maknaTempat: string;
  hubunganPelawat: string;
  soalanAtauAjakan: string;
}

export interface SoalanKuiz {
  id: string;
  soalan: string;
  jawapan: string;
}

export interface GambarLokasi {
  url: string;
  kapsyen: string;
}

export interface Destinasi {
  id: string;
  nama: string;
  namaPenuh: string;
  kawasan: string;
  gambarUrl?: string;
  galeriGambar?: GambarLokasi[];
  labelGambar: string;
  faktaDisahkan: FaktaItem[];
  catatanPerluDisemak: FaktaItem[];
  cerita60Saat: Cerita60Saat | null;
  kataKunci: string[];
  kuiz: SoalanKuiz[];
  sumberUtama: string[];
}

export const TEKS_TIADA_MAKLUMAT = 'Maklumat belum dimasukkan';

/**
 * Data lokasi disimpan terus dalam aplikasi untuk rujukan segera tanpa panggilan AI.
 * Hanya fakta daripada bahan yang disemak dimasukkan. Tiada sejarah direka.
 */
export const SENARAI_DESTINASI: Destinasi[] = [
  {
    id: 'dataran-labuan',
    nama: 'Dataran Labuan',
    namaPenuh: 'Dataran Labuan',
    kawasan: 'Wilayah Persekutuan Labuan',
    gambarUrl: '',
    labelGambar: 'Ruang Gambar: Dataran Labuan',
    faktaDisahkan: [],
    catatanPerluDisemak: [],
    cerita60Saat: null,
    kataKunci: [],
    kuiz: [],
    sumberUtama: [],
  },
  {
    id: 'muzium-marin',
    nama: 'Muzium Marin',
    namaPenuh: 'Muzium Marin Labuan',
    kawasan: 'Wilayah Persekutuan Labuan',
    gambarUrl: '/assets/aistudio/b38a3a13-21ab-4f3b-8aed-3165affd0518_2d32071f.jpg',
    galeriGambar: [
      {
        url: '/assets/aistudio/b38a3a13-21ab-4f3b-8aed-3165affd0518_2d32071f.jpg',
        kapsyen: 'Pintu masuk Muzium Marin Labuan',
      },
      {
        url: '/assets/aistudio/a28ec663-d62c-4e68-a961-9d32104ec9c7_194eed85.jpg',
        kapsyen: 'Pameran rangka kepala paus',
      },
      {
        url: '/assets/aistudio/6bef9623-473a-4925-8a6c-08b66c525e0d_b752bc3e.jpg',
        kapsyen: 'Pameran cangkerang dan hidupan marin',
      },
      {
        url: '/assets/aistudio/7a14bd0c-09e2-4092-9b98-e65732d00b6f_7cd704b2.jpg',
        kapsyen: 'Papan maklumat Haiwan Krustasia',
      },
      {
        url: '/assets/aistudio/c52961a0-fe75-40f7-a12c-7b7c2e10d1f4_62fc5d92.jpg',
        kapsyen: 'Pameran peralatan menyelam',
      },
    ],
    labelGambar: 'Ruang Gambar: Muzium Marin Labuan',
    faktaDisahkan: [
      {
        id: 'mm-baru-1',
        teks: 'Muzium hidupan marin pertama di Malaysia.',
      },
      {
        id: 'mm-baru-2',
        teks: 'Dibuka secara rasmi pada 26 Januari 2003.',
      },
      {
        id: 'mm-baru-3',
        teks: 'Reka bentuk muzium seperti bentuk kapal tentera (military ship).',
      },
      {
        id: 'mm-baru-4',
        teks: 'Muzium Marin Labuan mempunyai 572 spesimen marin.',
      },
      {
        id: 'mm-1',
        teks: 'Muzium memfokuskan pameran hidupan marin.',
      },
      {
        id: 'mm-2',
        teks: 'Antara objektifnya ialah memberi pengetahuan tentang hidupan marin perairan Borneo, khususnya Labuan.',
      },
      {
        id: 'mm-3',
        teks: 'Muzium memupuk kesedaran menjaga warisan semula jadi.',
      },
      {
        id: 'mm-4',
        teks: 'Menurut JMM, rangka paus yang dipamerkan ditemui di Pantai Sebatu, Melaka.',
      },
    ],
    catatanPerluDisemak: [
      {
        id: 'mm-semak-1',
        teks: 'Pautan sumber bagi bahan baharu (muzium pertama di Malaysia, tarikh pembukaan 26 Januari 2003, reka bentuk seperti military ship, dan 572 spesimen marin) belum dimasukkan.',
      },
      {
        id: 'mm-semak-2',
        teks: 'Maklumat tidak mencukupi: tokoh yang merasmikan pembukaan pada 26 Januari 2003, nama pereka bentuk bangunan, dan pecahan kategori 572 spesimen belum dibekalkan.',
      },
    ],
    cerita60Saat: {
      tarikanPembuka:
        'Selamat datang ke Muzium Marin Labuan — muzium hidupan marin pertama di Malaysia yang mempunyai reka bentuk bangunan seperti bentuk military ship.',
      faktaDisahkan:
        'Muzium ini dibuka secara rasmi pada 26 Januari 2003 dan mempunyai 572 spesimen marin. Pamerannya memfokuskan hidupan marin untuk memberi pengetahuan tentang hidupan marin perairan Borneo, khususnya Labuan, termasuk rangka paus yang menurut JMM ditemui di Pantai Sebatu, Melaka.',
      maknaTempat:
        'Muzium ini bermakna kerana peranannya memupuk kesedaran menjaga warisan semula jadi marin. (Maklumat tidak mencukupi: sebab khusus pemilihan reka bentuk military ship dan pihak perasmi pembukaan 26 Januari 2003 belum dimasukkan.)',
      hubunganPelawat:
        'Di dalam muzium ini, pelawat berpeluang melihat himpunan 572 spesimen marin dan mengenali kepelbagaian hidupan marin di perairan sekitar Borneo dan Labuan.',
      soalanAtauAjakan:
        'Sebelum kita melangkah masuk, cuba bayangkan berada di atas kapal — antara 572 spesimen marin di dalam nanti, hidupan laut manakah yang paling anda teruja untuk lihat dahulu?',
    },
    kataKunci: [
      'Muzium marin pertama Malaysia',
      'Dibuka 26 Januari 2003',
      'Bentuk military ship',
      '572 spesimen marin',
      'Perairan Borneo & rangka paus',
    ],
    kuiz: [
      {
        id: 'mm-k1',
        soalan: 'Bilakah Muzium Marin Labuan dibuka secara rasmi?',
        jawapan: '26 Januari 2003.',
      },
      {
        id: 'mm-k2',
        soalan:
          'Apakah bentuk reka bentuk bangunan Muzium Marin Labuan dan berapakah bilangan spesimen marinnya?',
        jawapan:
          'Reka bentuk seperti bentuk military ship dan mempunyai 572 spesimen marin.',
      },
      {
        id: 'mm-k3',
        soalan:
          'Apakah kedudukan Muzium Marin Labuan berbanding muzium hidupan marin lain di Malaysia?',
        jawapan: 'Muzium hidupan marin pertama di Malaysia.',
      },
    ],
    sumberUtama: [
      'https://www.jmm.gov.my/en/content/labuan-marine-museum (Sumber bahan JMM terdahulu)',
      'Sumber bagi bahan baharu (26 Januari 2003, reka bentuk military ship, 572 spesimen marin, muzium pertama di Malaysia): Maklumat belum dimasukkan.',
      'Gambar lokasi: 5 foto yang dibekalkan oleh pengguna.',
    ],
  },
  {
    id: 'tanjung-batu',
    nama: 'Tanjung Batu',
    namaPenuh: 'Tanjung Batu',
    kawasan: 'Wilayah Persekutuan Labuan',
    gambarUrl: '',
    labelGambar: 'Ruang Gambar: Tanjung Batu',
    faktaDisahkan: [],
    catatanPerluDisemak: [],
    cerita60Saat: null,
    kataKunci: [],
    kuiz: [],
    sumberUtama: [],
  },
  {
    id: 'tugu-peringatan-perang',
    nama: 'Tugu Peringatan Perang',
    namaPenuh: 'Tugu Peringatan Perang',
    kawasan: 'Wilayah Persekutuan Labuan',
    gambarUrl: '',
    labelGambar: 'Ruang Gambar: Tugu Peringatan Perang',
    faktaDisahkan: [],
    catatanPerluDisemak: [],
    cerita60Saat: null,
    kataKunci: [],
    kuiz: [],
    sumberUtama: [],
  },
];
