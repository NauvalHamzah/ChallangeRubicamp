--Create table for Jurusan
CREATE TABLE IF NOT EXISTS Jurusan (
	KodeJurusan INTEGER PRIMARY KEY,
	NamaJurusan VARCHAR (100) NOT NULL
);

--Create table for Mahasiswa
CREATE TABLE IF NOT EXISTS Mahasiswa (
	NIM INTEGER PRIMARY KEY,
	NamaLengkap VARCHAR(255) NOT NULL,
	Alamat TEXT NOT NULL,
	KodeJurusan INTEGER,
	FOREIGN KEY (KodeJurusan) REFERENCES Jurusan (KodeJurusan)
);

--Create table for Dosen
CREATE TABLE IF NOT EXISTS Dosen(
	NIP INTEGER PRIMARY KEY,
	NamaLengkap VARCHAR (255) NOT NULL,
	KodeJurusan INTEGER,
	FOREIGN KEY (KodeJurusan) REFERENCES Jurusan(KodeJurusan)
);

--Create table for Mata Kuliah
CREATE TABLE IF NOT EXISTS MataKuliah(
	KodeMataKuliah CHAR(6) PRIMARY KEY,
	NamaMataKuliah VARCHAR(100) NOT NULL,
	JumlahSKS SMALLINT NOT NULL,
	KodeJurusan INTEGER,
	NIPDosen INTEGER,
	FOREIGN KEY (KodeJurusan) REFERENCES Jurusan(KodeJurusan),
	FOREIGN KEY (NIPDosen) REFERENCES Dosen(NIP)
);

--Create table for Penilaian
CREATE TABLE IF NOT EXISTS Penilaian(
NIM INTEGER,
KodeMataKuliah CHAR(6),
Nilai VARCHAR(2),
FOREIGN KEY (NIM) REFERENCES Mahasiswa(NIM),
FOREIGN KEY (KodeMataKuliah) REFERENCES MataKuliah (KodeMataKuliah),
PRIMARY KEY (NIM, KodeMataKuliah)
);

---------------START INSERTING DATA-----------------
-- Input data Jurusan
INSERT OR REPLACE INTO Jurusan (KodeJurusan, NamaJurusan) VALUES
(131, 'Teknik Mesin'),
(136, 'Teknik Dirgantara');



--Input data Mahasiswa
INSERT OR REPLACE INTO Mahasiswa (NIM, NamaLengkap, Alamat, KodeJurusan) VALUES
(13116001, 'Wawan Adi', 'Klaten', 131),
(13116002, 'Ricky Indra', 'Kebumen', 131),
(13616001, 'Nauval Hamzah', 'Bandung',136),
(13616002, 'Ali Aziz', 'Tulungagung', 136),
(13616003, 'Rizki Zuhri', 'Lampung', 136);

--Input data Dosen
INSERT OR REPLACE INTO Dosen (NIP, NamaLengkap, KodeJurusan) VALUES
(1001, 'M Agus Karim', 131),
(1002, 'Satrio Wicaksono', 131),
(2001, 'M Agoes Moelyadi', 136),
(2002, 'Ema Amalia', 136),
(2003, 'Lavi R Zuhal', 136),
(2004, 'Rianto Adhy', 136),
(2005, 'Tatacipta Dirgantara', 136);

--Input data Mata Kuliah
INSERT OR REPLACE INTO MataKuliah (KodeMataKuliah, NamaMataKuliah, JumlahSKS, KodeJurusan, NIPDosen) VALUES
('MS3001', 'Gambar Teknik', 2, 131, 1001),
('MS3002', 'Mekanika Kekuatan Material', 3, 131, 1002),
('AE3001', 'Aerodinamika 1', 3, 136, 2001),
('AE3001', 'Aerodinamika 1', 3, 136, 2002),
('AE3002', 'Mekanika Fluida', 3, 136, 2003),
('AE3003', 'Teori Kendali', 2, 136, 2004),
('AE3004', 'Finite Element Analysis', 3, 136, 2005);

--Input data Penilaian
INSERT OR REPLACE INTO Penilaian (NIM, KodeMataKuliah, Nilai) VALUES
(13116001, 'MS3001', 'AB'),
(13116001, 'MS3002', 'A'),
(13116002, 'MS3001', 'A'),
(13116002, 'MS3002', 'B'),
(13116002, 'AE3004', 'AB'),
(13616001, 'MS3001', 'A'),
(13616001, 'MS3002', 'AB'),
(13616001, 'AE3001', 'A'),
(13616001, 'AE3002', 'B'),
(13616001, 'AE3003', 'B'),
(13616001, 'AE3004', 'AB'),
(13616002, 'MS3001', 'B'),
(13616002, 'MS3002', 'A'),
(13616002, 'AE3001', 'B'),
(13616002, 'AE3002', 'B'),
(13616002, 'AE3003', 'B'),
(13616002, 'AE3004', 'A'),
(13616003, 'MS3001', 'A'),
(13616003, 'MS3002', 'A'),
(13616003, 'AE3001', 'AB'),
(13616003, 'AE3002', 'B'),
(13616003, 'AE3003', 'A');
