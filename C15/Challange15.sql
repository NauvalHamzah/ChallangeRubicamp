--Create table for Jurusan
CREATE TABLE IF NOT EXISTS Jurusan (
	KodeJurusan INTEGER PRIMARY KEY,
	NamaJurusan VARCHAR (100) NOT NULL
);

--Create table for Mahasiswa
CREATE TABLE IF NOT EXISTS Mahasiswa (
	NIM INTEGER PRIMARY KEY,
	NamaLengkap VARCHAR(255) NOT NULL,
	Alamat VARCHAR(100) NOT NULL,
    Umur SMALLINT NOT NULL,
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
(136, 'Teknik Dirgantara'),
(999, 'Informatika');



--Input data Mahasiswa
INSERT OR REPLACE INTO Mahasiswa (NIM, NamaLengkap, Alamat, Umur, KodeJurusan) VALUES
(13116001, 'Wawan Adi', 'Klaten', 19, 131),
(13116002, 'Ricky Indra', 'Kebumen', 18, 131),
(13616001, 'Nauval Hamzah', 'Bandung', 20, 136),
(13616002, 'Ali Aziz', 'Tulungagung', 20, 136),
(13616003, 'Rizki Zuhri', 'Lampung', 21, 136);

--Input data Dosen
INSERT OR REPLACE INTO Dosen (NIP, NamaLengkap, KodeJurusan) VALUES
(1001, 'M Agus Karim', 131),
(1002, 'Satrio Wicaksono', 131),
(2001, 'M Agoes Moelyadi', 136),
(2002, 'Ema Amalia', 136),
(2003, 'Lavi R Zuhal', 136),
(2004, 'Rianto Adhy', 136),
(2005, 'Tatacipta Dirgantara', 136),
(3001, 'Rubi Henjaya', 999);

--Input data Mata Kuliah
INSERT OR REPLACE INTO MataKuliah (KodeMataKuliah, NamaMataKuliah, JumlahSKS, KodeJurusan, NIPDosen) VALUES
('MS3001', 'Gambar Teknik', 2, 131, 1001),
('MS3002', 'Mekanika Kekuatan Material', 3, 131, 1002),
('AE3001', 'Aerodinamika 1', 3, 136, 2001),
('AE3001', 'Aerodinamika 1', 3, 136, 2002),
('AE3002', 'Mekanika Fluida', 3, 136, 2003),
('AE3003', 'Teori Kendali', 2, 136, 2004),
('AE3004', 'Finite Element Analysis', 3, 136, 2005),
('RB3001', 'Data Mining', 3, 999,3001);

--Input data Penilaian
INSERT OR REPLACE INTO Penilaian (NIM, KodeMataKuliah, Nilai) VALUES
(13116001, 'MS3001', 'A'),
(13116001, 'MS3002', 'AB'),
(13116001, 'RB3001', 'C'),
(13116002, 'MS3001', 'C'),
(13116002, 'MS3002', 'C'),
(13116002, 'AE3004', 'C'),
(13116002, 'RB3001', 'E'),
(13616001, 'MS3001', 'B'),
(13616001, 'MS3002', 'AB'),
(13616001, 'AE3001', 'A'),
(13616001, 'AE3002', 'B'),
(13616001, 'AE3003', 'B'),
(13616001, 'AE3004', 'AB'),
(13616001, 'RB3001', 'D'),
(13616002, 'MS3001', 'B'),
(13616002, 'MS3002', 'A'),
(13616002, 'AE3001', 'B'),
(13616002, 'AE3002', 'B'),
(13616002, 'AE3003', 'E'),
(13616002, 'AE3004', 'A'),
(13616003, 'MS3001', 'A'),
(13616003, 'MS3002', 'A'),
(13616003, 'AE3001', 'AB'),
(13616003, 'AE3002', 'B'),
(13616003, 'AE3003', 'A');

--1
SELECT Mahasiswa.NIM, Mahasiswa.NamaLengkap, Jurusan.NamaJurusan 
FROM Mahasiswa
LEFT JOIN Jurusan on Mahasiswa.KodeJurusan = Jurusan.KodeJurusan;

--2
SELECT * FROM Mahasiswa WHERE Mahasiswa.Umur < 20;

--3
SELECT DISTINCT Mahasiswa.NIM, Mahasiswa.NamaLengkap 
FROM Mahasiswa
INNER JOIN Penilaian ON Mahasiswa.NIM = Penilaian.NIM 
WHERE Penilaian.Nilai = 'A' 
    OR Penilaian.Nilai = 'AB' 
    OR Penilaian.Nilai = 'B';

--4
SELECT Penilaian.NIM, Mahasiswa.NamaLengkap, SUM (MataKuliah.JumlahSKS) as Total_SKS
FROM Penilaian
LEFT JOIN MataKuliah ON Penilaian.KodeMataKuliah = MataKuliah.KodeMataKuliah
LEFT JOIN Mahasiswa ON Penilaian.NIM = Mahasiswa.NIM
GROUP BY Penilaian.NIM
HAVING Total_SKS > 10;

--5
SELECT Penilaian.NIM, Mahasiswa.NamaLengkap
FROM Penilaian
LEFT JOIN MataKuliah ON Penilaian.KodeMataKuliah = MataKuliah.KodeMataKuliah
LEFT JOIN Mahasiswa ON Penilaian.NIM = Mahasiswa.NIM
WHERE MataKuliah.NamaMataKuliah = 'Data Mining';

--6
SELECT DISTINCT Dosen.NamaLengkap, MataKuliah.NamaMataKuliah, COUNT(*) as JML_Mahasiswa
FROM Dosen
INNER JOIN MataKuliah ON Dosen.NIP = MataKuliah.NIPDosen
INNER JOIN Penilaian ON MataKuliah.KodeMataKuliah = Penilaian.KodeMataKuliah
GROUP BY Dosen.NIP;

--7
SELECT * FROM Mahasiswa ORDER BY Umur ASC;

--8
SELECT Penilaian.KodeMataKuliah, MataKuliah.NamaMataKuliah, Dosen.NamaLengkap as 'Dosen Pengampu', Mahasiswa.NamaLengkap as 'Nama Mahasiswa', Jurusan.NamaJurusan as 'Jurusan',Penilaian.Nilai
FROM Penilaian
INNER JOIN Mahasiswa ON Penilaian.NIM = Mahasiswa.NIM
INNER JOIN Jurusan ON Mahasiswa.KodeJurusan = Jurusan.KodeJurusan
INNER JOIN MataKuliah on Penilaian.KodeMataKuliah = MataKuliah.KodeMataKuliah
INNER JOIN Dosen on MataKuliah.NIPDosen = Dosen.NIP
WHERE Penilaian.Nilai = 'D' OR Penilaian.Nilai = 'E';