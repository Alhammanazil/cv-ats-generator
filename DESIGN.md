# CV ATS Generator: rancangan

Status: draft untuk disetujui. Belum ada kode.

## Tujuan
Membantu pencari kerja (terutama fresh graduate di Indonesia) membuat CV yang terbaca baik oleh ATS dan oleh manusia, sambil belajar kenapa aturannya begitu. Gratis, tanpa login, data tidak keluar dari browser.

## Prinsip
1. **Privasi:** semua diproses di browser. Data disimpan di localStorage (opsional, bisa dihapus dengan satu klik).
2. **Jujur:** tidak ada "skor ATS" palsu. Yang ditampilkan adalah cek kualitas (struktur, panjang, kata kerja, angka) dan kecocokan kata kunci terhadap lowongan yang ditempel.
3. **Output ATS-safe:** satu kolom, heading standar, font Arial, tanpa tabel, grafik, atau header/footer. PDF berbasis teks dan .docx.
4. **Belajar sambil membuat:** tips muncul di konteks (di sebelah field yang sedang diisi), bukan hanya di halaman terpisah.
5. **Dwibahasa:** UI dan contoh dalam ID dan EN. Isi CV bebas bahasa apa pun.

## Peta halaman (Vue Router, semua statis)
| Rute | Isi |
|---|---|
| `/` | Landing: apa itu CV ATS dalam 30 detik, tombol "Mulai buat CV", tiga fitur unggulan, jaminan privasi |
| `/builder` | Inti produk: form bertahap + preview langsung + checker |
| `/xray` | ATS X-ray: tempel atau unggah CV, lihat teks seperti dibaca parser |
| `/match` | Pencocok kata kunci: CV vs deskripsi lowongan |
| `/belajar` | Panduan: apa itu CV, ATS, mitos vs fakta, tips per section |
| `/contoh` | Bullet lemah vs kuat (before/after), contoh CV per profil (fresh grad, IT, dll.) |
| `/tentang` | Cara kerja, sumber riset, batasan, kontak |

## Fitur

### 1. Builder (MVP)
- Langkah: Kontak, Ringkasan, Pengalaman, Pendidikan, Skill, Sertifikasi, Proyek (opsional), Tinjau.
- Tiap langkah punya panel tips singkat dan contoh yang bisa diklik untuk mengisi otomatis.
- Section bisa ditambah, dihapus, dan diurutkan. Entri pengalaman bisa digeser urutannya.
- Template: 2 sampai 3 varian satu kolom (Klasik, Ringkas, Modern-polos), semuanya lolos aturan ATS. Beda hanya spasi, ukuran heading, dan garis.
- Preview kertas A4 langsung di samping form.
- Ekspor: PDF (teks asli, dihasilkan dari HTML cetak), .docx, .txt, dan JSON (cadangan data).
- Impor: dari JSON ekspor sebelumnya. Impor dari PDF/teks CV lama menyusul (fase 2).

### 2. Live checker (di dalam builder)
Aturan berbasis kode, bisa dijelaskan, tanpa AI:
- Struktur: heading standar ada, kontak lengkap, tanggal konsisten.
- Panjang: ringkasan 3 sampai 5 kalimat, bullet 1 sampai 2 baris, total 1 sampai 2 halaman.
- Isi: bullet diawali kata kerja aksi, ada angka atau hasil, tidak ada klise ("hard worker", "team player" tanpa bukti).
- Jeda karier lebih dari 6 bulan diberi catatan lembut (bukan kesalahan).
- Setiap temuan punya "kenapa ini penting" dan satu contoh perbaikan.

### 3. ATS X-ray
- Tampilan dua sisi: CV asli dan hasil ekstraksi teks mentah.
- Menandai bagian yang rawan hilang atau tercampur (kolom, tabel, header/footer, ikon).
- Unggah PDF diproses lokal dengan pdf.js. Tidak ada file yang diunggah ke server.

### 4. Pencocok kata kunci
- Tempel deskripsi lowongan, ekstrak istilah penting (skill, alat, jabatan), lalu tampilkan yang sudah ada di CV dan yang belum.
- Saran dibatasi: hanya menyarankan istilah yang memang kamu punya. Ada peringatan anti keyword stuffing.

### 5. Panduan dan interaktif
- Kuis mitos vs fakta (misalnya "75% CV ditolak ATS", dengan penjelasan sumber).
- Slider before/after bullet: gambar CV berantakan vs rapi, dan apa yang dilihat parser.
- Checklist "siap kirim" dengan progres yang tersimpan.
- Tips per profil: fresh graduate, career switcher, ada jeda karier, IT/developer.
- Badge kecil dan konfeti saat checklist selesai agar terasa seru, tetap ringan.

## Teknis
- **Stack:** Vue 3 + Vite + TypeScript, Vue Router, Pinia (state builder), tanpa backend. Styling dengan CSS biasa (variabel tema, mode gelap).
- **Pustaka:** `pdfjs-dist` (X-ray), `docx` (ekspor Word). PDF dihasilkan lewat print CSS (`window.print` dengan stylesheet cetak khusus), jadi teksnya asli dan ukurannya kecil.
- **Data:** satu objek JSON `CvData` (skema tunggal) di Pinia, disimpan ke localStorage dengan debounce. Template adalah komponen yang menerima `CvData`.
- **Konten edukasi:** file Markdown/JSON di repo (tips, mitos, contoh), dimuat statis. Mudah diedit tanpa menyentuh logika.
- **Aksesibilitas dan performa:** navigasi keyboard, kontras cukup, `prefers-reduced-motion`, lazy-load rute berat (X-ray, docx).
- **Deploy:** Vercel, push ke `main` otomatis. Tanpa analitik pihak ketiga di awal.

## Struktur folder (usulan)
```
cv-ats-generator/
  src/
    views/        Landing, Builder, Xray, Match, Learn, Examples, About
    components/   forms/, templates/, checker/, ui/
    stores/       cv.ts
    lib/          checker rules, keyword extract, export (pdf/docx/txt)
    content/      tips.id.json, tips.en.json, myths, examples
  public/
  DESIGN.md
```

## Fase
- **Fase 1 (MVP):** Landing, Builder + 2 template, live checker dasar, ekspor PDF/.txt/JSON, halaman Belajar (tips + mitos).
- **Fase 2:** ATS X-ray, pencocok kata kunci, ekspor .docx, template ketiga, impor PDF.
- **Fase 3:** kuis dan elemen gamifikasi, contoh per profil, i18n penuh, polesan dan SEO.

## Risiko dan keputusan terbuka
- **Kualitas parsing PDF** di X-ray berbeda antar ATS, jadi hasilnya perlu diberi label "perkiraan".
- **Ekstraksi kata kunci tanpa AI** terbatas. Cukup untuk MVP, bisa ditingkatkan dengan daftar istilah per bidang.
- **Nama dan domain** belum ditentukan.
- **Bahasa utama UI** (ID dulu atau dwibahasa sejak awal).
- **Template:** perlu kamu pilih gaya visual (hangat dan ramah, atau bersih dan profesional).
