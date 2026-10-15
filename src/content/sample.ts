import type { CvData, CvLang } from '../types'

/** Fictional example data so people can see a finished CV before typing their own. */
export function sampleCv(lang: CvLang): Omit<CvData, 'settings'> {
  if (lang === 'id') {
    return {
      name: 'Rina Kusuma',
      headline: 'Web Developer',
      location: 'Semarang, Jawa Tengah',
      phone: '+62 812 3456 7890',
      email: 'rina.kusuma@example.com',
      links: ['linkedin.com/in/rina-kusuma', 'github.com/rinakusuma'],
      summary:
        'Lulusan Teknik Informatika dengan pengalaman 1 tahun membangun aplikasi web memakai Laravel dan MySQL. Terbiasa mengubah kebutuhan operasional menjadi aplikasi yang dipakai harian oleh tim. Mencari posisi web developer untuk membangun produk yang berdampak.',
      experience: [
        {
          id: 'e1', title: 'Web Developer', org: 'CV Maju Digital', place: 'Semarang', start: '2024-03', end: '', current: true,
          bullets: [
            'Membangun sistem pemesanan online dengan Laravel dan MySQL yang dipakai 300+ pelanggan setiap bulan.',
            'Mengotomatisasi laporan mingguan sehingga waktu penyusunan turun dari 4 jam menjadi 30 menit.',
            'Berkolaborasi dengan tim desain dan operasional untuk merilis 12 fitur baru dalam 1 tahun.',
          ],
        },
        {
          id: 'e2', title: 'Magang Pengembang Web', org: 'Dinas Komunikasi dan Informatika', place: 'Semarang', start: '2023-07', end: '2023-12', current: false,
          bullets: [
            'Memperbaiki 25+ bug pada portal layanan publik berbasis PHP.',
            'Menyusun dokumentasi API untuk 8 endpoint yang dipakai aplikasi seluler.',
          ],
        },
      ],
      education: [
        {
          id: 'd1', title: 'Sarjana Teknik Informatika', org: 'Universitas Contoh Nusantara', place: 'Semarang', start: '2019-09', end: '2023-08', current: false,
          bullets: ['IPK 3,70 / 4,00.', 'Skripsi: sistem informasi inventaris berbasis web untuk toko bangunan.'],
        },
      ],
      projects: [],
      skills: [
        { id: 's1', label: 'Pemrograman', items: 'PHP, JavaScript, Laravel, Vue.js' },
        { id: 's2', label: 'Basis Data dan Alat', items: 'MySQL, Git, REST API, Docker' },
        { id: 's3', label: 'Bahasa', items: 'Indonesia (Native), Inggris (B2)' },
      ],
      certs: [{ id: 'c1', name: 'Belajar Dasar Pemrograman Web', issuer: 'Dicoding', date: '2023-05' }],
    }
  }
  return {
    name: 'Rina Kusuma',
    headline: 'Web Developer',
    location: 'Semarang, Central Java',
    phone: '+62 812 3456 7890',
    email: 'rina.kusuma@example.com',
    links: ['linkedin.com/in/rina-kusuma', 'github.com/rinakusuma'],
    summary:
      'Informatics Engineering graduate with 1 year of experience building web applications with Laravel and MySQL. Skilled at turning operational needs into tools that teams use every day. Looking for a web developer role to build products with real impact.',
    experience: [
      {
        id: 'e1', title: 'Web Developer', org: 'Maju Digital', place: 'Semarang, Indonesia', start: '2024-03', end: '', current: true,
        bullets: [
          'Built an online ordering system with Laravel and MySQL used by 300+ customers every month.',
          'Automated weekly reporting, cutting preparation time from 4 hours to 30 minutes.',
          'Collaborated with design and operations teams to ship 12 new features in 1 year.',
        ],
      },
      {
        id: 'e2', title: 'Web Development Intern', org: 'Department of Communication and Informatics', place: 'Semarang, Indonesia', start: '2023-07', end: '2023-12', current: false,
        bullets: [
          'Fixed 25+ bugs in a PHP-based public service portal.',
          'Wrote API documentation for 8 endpoints used by a mobile app.',
        ],
      },
    ],
    education: [
      {
        id: 'd1', title: "Bachelor's degree, Informatics Engineering", org: 'Contoh Nusantara University', place: 'Semarang, Indonesia', start: '2019-09', end: '2023-08', current: false,
        bullets: ['GPA: 3.70 / 4.00.', 'Thesis: web-based inventory system for a building supply store.'],
      },
    ],
    projects: [],
    skills: [
      { id: 's1', label: 'Programming', items: 'PHP, JavaScript, Laravel, Vue.js' },
      { id: 's2', label: 'Databases and Tools', items: 'MySQL, Git, REST API, Docker' },
      { id: 's3', label: 'Languages', items: 'Indonesian (Native), English (B2)' },
    ],
    certs: [{ id: 'c1', name: 'Web Programming Fundamentals', issuer: 'Dicoding', date: '2023-05' }],
  }
}
