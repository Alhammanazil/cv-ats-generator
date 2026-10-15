import type { Bilingual } from '../i18n'

export const cvIntro: Bilingual = {
  id: 'CV (curriculum vitae) adalah dokumen ringkas, idealnya 1 sampai 2 halaman, yang menjual dirimu kepada pemberi kerja: siapa kamu, apa yang sudah kamu kerjakan, dan apa yang kamu kuasai. Tujuannya satu: membuat orang yang membacanya ingin mengundangmu wawancara. CV bukan riwayat hidup lengkap, melainkan pilihan bukti yang paling relevan dengan posisi yang kamu lamar.',
  en: 'A CV (curriculum vitae) is a short document, ideally 1 to 2 pages, that sells you to an employer: who you are, what you have done, and what you are good at. It has one goal: make the reader want to invite you to an interview. It is not your whole life story, but a selection of the evidence most relevant to the role you are applying for.',
}

export const atsIntro: Bilingual = {
  id: 'ATS (Applicant Tracking System) adalah software yang dipakai perusahaan untuk menerima, menyimpan, dan mencari lamaran. Saat kamu mengunggah CV, ATS mengubahnya menjadi data terstruktur seperti nama, jabatan, tanggal, dan skill. Recruiter lalu mencari di database itu, mirip menekan Ctrl+F. Kalau CV-mu sulit diurai, datamu bisa masuk kolom yang salah atau tidak muncul saat dicari.',
  en: 'An ATS (Applicant Tracking System) is software companies use to receive, store, and search applications. When you upload a CV, the ATS converts it into structured data such as name, job titles, dates, and skills. Recruiters then search that database, much like pressing Ctrl+F. If your CV is hard to parse, your data may land in the wrong field or not show up in searches.',
}

export const atsSteps: Bilingual[] = [
  { id: 'Kamu mengunggah file CV (PDF berbasis teks atau .docx).', en: 'You upload a CV file (text-based PDF or .docx).' },
  { id: 'Parser mengekstrak teks dan menebak bagian: kontak, pengalaman, pendidikan, skill.', en: 'A parser extracts the text and guesses the sections: contact, experience, education, skills.' },
  { id: 'Hasilnya disimpan sebagai profil di database perusahaan.', en: 'The result is stored as a profile in the company database.' },
  { id: 'Recruiter mencari atau menyaring berdasarkan kata kunci, lalu membuka CV yang cocok.', en: 'Recruiters search or filter by keywords, then open the CVs that match.' },
]

export const dos: Bilingual[] = [
  { id: 'Satu kolom, urutan bagian standar.', en: 'One column, standard section order.' },
  { id: 'Judul bagian yang umum: Pengalaman Kerja, Pendidikan, Keahlian.', en: 'Common headings: Work Experience, Education, Skills.' },
  { id: 'Font umum seperti Arial atau Calibri, ukuran 10 sampai 12 pt.', en: 'Common fonts like Arial or Calibri, 10 to 12 pt.' },
  { id: 'PDF berbasis teks atau .docx, ikuti format yang diminta lowongan.', en: 'Text-based PDF or .docx, following whatever format the posting asks for.' },
  { id: 'Istilah skill dan jabatan yang selaras dengan lowongan, secara natural.', en: 'Skill and title wording that matches the posting, used naturally.' },
]

export const donts: Bilingual[] = [
  { id: 'Tabel, dua kolom, text box, ikon, dan bilah skill bergambar.', en: 'Tables, two columns, text boxes, icons, and graphical skill bars.' },
  { id: 'Kontak di header atau footer.', en: 'Contact details in a header or footer.' },
  { id: 'PDF hasil gambar atau pindaian (tidak ada teks yang bisa dibaca).', en: 'Image or scanned PDFs (no readable text).' },
  { id: 'Menjejalkan kata kunci tak relevan atau teks putih tersembunyi.', en: 'Stuffing irrelevant keywords or hiding white text.' },
  { id: 'Foto, tanggal lahir, dan data pribadi yang tidak diminta.', en: 'Photos, birth date, and personal details nobody asked for.' },
]

export interface Myth {
  myth: Bilingual
  fact: Bilingual
}

export const myths: Myth[] = [
  {
    myth: { id: '75% CV otomatis ditolak oleh ATS sebelum dibaca manusia.', en: '75% of CVs are automatically rejected by ATS before a human reads them.' },
    fact: {
      id: 'Angka ini tidak punya dasar kuat. Dalam studi kecil terhadap 25 recruiter, 92% mengatakan sistem mereka tidak menolak otomatis karena format atau kata kunci. Penolakan otomatis lebih sering lewat pertanyaan penyaring (misalnya izin kerja atau lokasi). Hambatan terbesar sebenarnya volume pelamar.',
      en: 'This figure has no solid basis. In a small study of 25 recruiters, 92% said their systems do not auto-reject over formatting or keywords. Automatic rejection mostly happens through knockout questions (such as work authorization or location). The biggest obstacle is simply applicant volume.',
    },
  },
  {
    myth: { id: 'Semakin banyak kata kunci, semakin baik.', en: 'The more keywords, the better.' },
    fact: {
      id: 'Kata kunci dipakai untuk pencarian dan pengurutan, bukan ujian lulus-gagal. Menjejalkannya membuat CV sulit dibaca manusia. Pakai istilah yang memang kamu kuasai dan muncul di lowongan, secara natural.',
      en: 'Keywords are used for search and ranking, not a pass/fail test. Stuffing them makes the CV hard for humans to read. Use terms you genuinely have that appear in the posting, naturally.',
    },
  },
  {
    myth: { id: 'CV dua kolom yang berdesain menarik pasti membuatku menonjol.', en: 'A stylish two-column CV will make me stand out.' },
    fact: {
      id: 'Dua kolom dan tabel sering membuat parser membaca teks tercampur. Desain kreatif cocok untuk portofolio atau dikirim langsung ke manusia, tapi untuk portal lamaran pakai versi satu kolom yang polos.',
      en: 'Two columns and tables often make parsers read text out of order. Creative design suits a portfolio or a CV sent straight to a person, but for application portals use a plain one-column version.',
    },
  },
  {
    myth: { id: 'PDF selalu buruk untuk ATS.', en: 'PDF is always bad for ATS.' },
    fact: {
      id: 'PDF berbasis teks umumnya terbaca dengan baik. Yang bermasalah adalah PDF hasil gambar atau pindaian. Jika lowongan meminta .docx atau PDF, ikuti permintaannya.',
      en: 'Text-based PDFs are generally read fine. Image or scanned PDFs are the problem. If the posting asks for .docx or PDF, follow the request.',
    },
  },
  {
    myth: { id: 'CV harus tepat satu halaman.', en: 'A CV must be exactly one page.' },
    fact: {
      id: 'Ini aturan praktis, bukan hukum. Satu halaman cocok untuk fresh graduate. Dengan pengalaman lebih banyak, dua halaman yang padat isi masih wajar. Yang penting setiap baris punya alasan untuk ada.',
      en: 'This is a rule of thumb, not a law. One page suits fresh graduates. With more experience, two dense pages are fine. What matters is that every line earns its place.',
    },
  },
]

export interface BeforeAfter {
  before: Bilingual
  after: Bilingual
  why: Bilingual
}

export const beforeAfter: BeforeAfter[] = [
  {
    before: { id: 'Bertanggung jawab atas pembuatan laporan.', en: 'Responsible for creating reports.' },
    after: { id: 'Menyusun laporan mingguan untuk 5 divisi dan memangkas waktu penyusunan dari 4 jam menjadi 30 menit.', en: 'Compiled weekly reports for 5 divisions and cut preparation time from 4 hours to 30 minutes.' },
    why: { id: 'Diawali kata kerja, menyebut skala (5 divisi) dan hasil terukur.', en: 'Starts with a verb and states scale (5 divisions) and a measurable result.' },
  },
  {
    before: { id: 'Membuat website untuk perusahaan.', en: 'Made a website for the company.' },
    after: { id: 'Membangun sistem pemesanan online dengan Laravel dan MySQL yang dipakai 300+ pelanggan per bulan.', en: 'Built an online ordering system with Laravel and MySQL used by 300+ customers per month.' },
    why: { id: 'Menyebut teknologi (kata kunci alami), jenis sistem, dan jumlah pengguna.', en: 'Names the technology (natural keywords), the kind of system, and the user count.' },
  },
  {
    before: { id: 'Pekerja keras dan bisa bekerja dalam tim.', en: 'Hard worker and team player.' },
    after: { id: 'Berkolaborasi dengan tim desain dan operasional untuk merilis 12 fitur dalam 1 tahun.', en: 'Collaborated with design and operations teams to ship 12 features in 1 year.' },
    why: { id: 'Bukti menggantikan klaim: siapa yang diajak bekerja dan apa yang dihasilkan.', en: 'Evidence replaces a claim: who you worked with and what came out of it.' },
  },
  {
    before: { id: 'Membantu IT support di kantor.', en: 'Helped with IT support at the office.' },
    after: { id: 'Menangani 20+ tiket IT per minggu (perangkat, jaringan, Microsoft Office) dengan waktu respons rata-rata di bawah 1 jam.', en: 'Handled 20+ IT tickets per week (hardware, network, Microsoft Office) with an average response time under 1 hour.' },
    why: { id: 'Menunjukkan volume kerja dan kualitas layanan, bukan hanya keterlibatan.', en: 'Shows workload and service quality, not just involvement.' },
  },
]

export const checklist: Bilingual[] = [
  { id: 'Nama, email, dan nomor telepon ada di badan dokumen dan benar.', en: 'Name, email, and phone are in the body and correct.' },
  { id: 'Satu kolom, tanpa tabel, ikon, atau text box.', en: 'One column, no tables, icons, or text boxes.' },
  { id: 'Judul bagian standar dan urutan pengalaman dari yang terbaru.', en: 'Standard section headings and experience ordered newest first.' },
  { id: 'Setiap poin diawali kata kerja dan, bila bisa, memuat angka.', en: 'Every bullet starts with a verb and, where possible, contains a number.' },
  { id: 'Istilah penting dari lowongan muncul secara natural di CV.', en: 'Key terms from the posting appear naturally in the CV.' },
  { id: 'Tanggal konsisten dan tidak ada salah ketik (baca sekali lagi, atau minta orang lain).', en: 'Dates are consistent and there are no typos (re-read, or ask someone else).' },
  { id: 'File berupa PDF berbasis teks (coba pilih dan salin teksnya) atau .docx sesuai permintaan.', en: 'The file is a text-based PDF (try selecting and copying the text) or .docx as requested.' },
  { id: 'Nama file jelas, misalnya Nama-Lengkap-CV.pdf.', en: 'The file name is clear, for example Full-Name-CV.pdf.' },
]

export const sources: { label: string; url: string }[] = [
  { label: 'Glints: Contoh CV ATS-friendly', url: 'https://glints.com/id/lowongan/cv-ats-friendly/' },
  { label: 'Dealls: Contoh CV ATS friendly', url: 'https://dealls.com/pengembangan-karir/contoh-cv-ats-friendly' },
  { label: 'Astra: CV ATS, cara bikin dan contohnya', url: 'https://sera.astra.co.id/news/2025/01/cv-ats-cara-bikin-dan-contohnya' },
  { label: 'Metaintro: Formatting mistakes that break ATS parsing', url: 'https://www.metaintro.com/blog/formatting-mistakes-that-break-ats-parsing' },
  { label: 'Enhancv study on ATS auto-rejection (via WBOC)', url: 'https://www.wboc.com/online_features/press_releases/the-75-ats-rejection-myth-shattered-92-of-recruiters-confirm-applicant-tracking-systems-do-not/article_f141f112-dc9e-5082-9be5-1ea7b6444456.html' },
]
