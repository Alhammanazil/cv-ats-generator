import type { Bilingual } from '../i18n'

export type StepId = 'contact' | 'summary' | 'experience' | 'education' | 'projects' | 'skills' | 'certs' | 'review'

/** Short tips shown beside each builder step. Also reused on the Learn page. */
export const stepTips: Record<Exclude<StepId, 'review'>, { id: string[]; en: string[] }> = {
  contact: {
    id: [
      'Taruh kontak di badan dokumen, bukan di header atau footer. Sebagian parser melewati header dan footer.',
      'Pakai email yang terdengar profesional, idealnya berisi namamu.',
      'Tulis URL LinkedIn dan GitHub secara utuh agar tetap terbaca di PDF maupun hasil cetak.',
    ],
    en: [
      'Put contact details in the body, not in a header or footer. Some parsers skip headers and footers.',
      'Use a professional-sounding email, ideally containing your name.',
      'Write LinkedIn and GitHub URLs in full so they stay readable in the PDF and on paper.',
    ],
  },
  summary: {
    id: [
      'Cukup 3 sampai 4 kalimat. Mulai dari jabatan atau profilmu, lalu pengalaman terkuat, lalu peran yang dituju.',
      'Pakai istilah yang juga muncul di lowongan, secara natural. Jangan menjejalkan kata kunci.',
      'Hindari klise seperti "pekerja keras". Tunjukkan buktinya di bagian pengalaman.',
    ],
    en: [
      'Keep it to 3 or 4 sentences. Start with your title or profile, then your strongest experience, then the role you want.',
      'Use terms that also appear in the job posting, naturally. Do not stuff keywords.',
      'Avoid clichés like "hard worker". Show the proof in the experience section.',
    ],
  },
  experience: {
    id: [
      'Urutkan dari yang terbaru. Satu entri: jabatan, perusahaan, lokasi, dan bulan mulai-selesai.',
      'Awali tiap poin dengan kata kerja aksi dan akhiri dengan hasil: apa yang kamu lakukan, seberapa besar, apa dampaknya.',
      '3 sampai 5 poin per pekerjaan sudah cukup. Prioritaskan yang paling relevan dengan lowongan.',
      'Pakai angka yang benar-benar kamu ketahui. Perkiraan jujur lebih baik daripada angka rekaan.',
    ],
    en: [
      'List newest first. One entry: job title, company, location, and start-end months.',
      'Start each bullet with an action verb and end with a result: what you did, how big, what impact.',
      '3 to 5 bullets per job is enough. Prioritize what is most relevant to the posting.',
      'Use numbers you genuinely know. An honest estimate beats an invented figure.',
    ],
  },
  education: {
    id: [
      'Cantumkan gelar, jurusan, institusi, dan tahun. IPK hanya jika kuat (umumnya di atas 3,00) atau diminta.',
      'Untuk fresh graduate, tambahkan skripsi atau proyek akhir singkat dan teknologi yang dipakai.',
      'Pendidikan SMA tidak perlu jika sudah punya gelar sarjana.',
    ],
    en: [
      'Include degree, major, institution, and years. Add GPA only if strong (usually above 3.0) or requested.',
      'As a fresh graduate, add a short thesis or final project and the technology used.',
      'Skip high school once you have a bachelor\'s degree.',
    ],
  },
  projects: {
    id: [
      'Langkah ini opsional, tapi sangat membantu fresh graduate atau yang pindah bidang.',
      'Pilih 2 sampai 3 proyek terbaik. Sebut masalahnya, teknologinya, dan hasilnya.',
      'Sertakan tautan (GitHub atau demo) sebagai teks URL yang terlihat.',
    ],
    en: [
      'This step is optional, but very helpful for fresh graduates or career switchers.',
      'Pick your best 2 or 3 projects. State the problem, the tech, and the outcome.',
      'Include a link (GitHub or demo) as a visible URL.',
    ],
  },
  skills: {
    id: [
      'Kelompokkan per kategori agar mudah dipindai, misalnya Pemrograman, Basis Data, Alat, Bahasa.',
      'Cocokkan ejaan dengan lowongan: tulis "JavaScript" bukan "JS" jika lowongannya memakai "JavaScript".',
      'Hanya cantumkan yang benar-benar kamu kuasai dan siap ditanyakan saat wawancara.',
    ],
    en: [
      'Group by category so it is easy to scan, for example Programming, Databases, Tools, Languages.',
      'Match the posting\'s spelling: write "JavaScript", not "JS", if the posting says "JavaScript".',
      'List only what you truly know and are ready to be asked about in an interview.',
    ],
  },
  certs: {
    id: [
      'Pilih sertifikasi yang relevan dengan posisi target dan cantumkan penerbit serta tanggalnya.',
      'Sertifikat lama yang tidak relevan boleh dibuang agar CV tetap ringkas.',
    ],
    en: [
      'Choose certifications relevant to the target role and include the issuer and date.',
      'Old, irrelevant certificates can go to keep the CV tight.',
    ],
  },
}

export const summaryExample: Bilingual = {
  id: 'Lulusan Teknik Informatika dengan pengalaman 1 tahun membangun aplikasi web memakai Laravel dan MySQL. Terbiasa mengubah kebutuhan operasional menjadi aplikasi yang dipakai harian oleh tim. Mencari posisi web developer untuk membangun produk yang berdampak.',
  en: 'Informatics Engineering graduate with 1 year of experience building web applications with Laravel and MySQL. Skilled at turning operational needs into tools that teams use every day. Looking for a web developer role to build products with real impact.',
}

export const bulletExample: Bilingual = {
  id: 'Mengotomatisasi laporan mingguan sehingga waktu penyusunan turun dari 4 jam menjadi 30 menit.',
  en: 'Automated weekly reporting, cutting preparation time from 4 hours to 30 minutes.',
}
