--Ceate table for Jurusan
CREATE TABLE IF NOT EXISTS Jurusan (
	kode_jurusan INTEGER PRIMARY KEY,
	nama_jurusan VARCHAR (100) NOT NULL
);

--Create table for Mahasiswa
CREATE TABLE IF NOT EXISTS Mahasiswa (
	nim INTEGER PRIMARY KEY,
	nama_lengkap VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
	alamat VARCHAR(255) NOT NULL,
	kode_jurusan INTEGER,
	FOREIGN KEY (kode_jurusan) REFERENCES Jurusan (kode_jurusan)
);

--Create table for Dosen
CREATE TABLE IF NOT EXISTS Dosen(
	nip INTEGER PRIMARY KEY,
	nama_lengkap VARCHAR (255) NOT NULL,
	kode_jurusan INTEGER,
	FOREIGN KEY (kode_jurusan) REFERENCES Jurusan(kode_jurusan)
);

--Create table for Mata Kuliah
CREATE TABLE IF NOT EXISTS MataKuliah(
	kode_mata_kuliah CHAR(6) PRIMARY KEY,
	nama_mata_kuliah VARCHAR(100) NOT NULL,
	jumlah_sks SMALLINT NOT NULL,
	kode_jurusan INTEGER,
	FOREIGN KEY (kode_jurusan) REFERENCES Jurusan(kode_jurusan)
);

--Create table for Kontrak
CREATE TABLE IF NOT EXISTS Kontrak(
	id INTEGER PRIMARY KEY AUTOINCREMENT, 
	nim INTEGER, 
	kode_mata_kuliah CHAR(6),
	nip INTEGER,
	nilai VARCHAR(2),
	FOREIGN KEY (nim) REFERENCES Mahasiswa(nim), 
	FOREIGN KEY (kode_mata_kuliah) REFERENCES MataKuliah(kode_mata_kuliah),
	FOREIGN KEY (nip) REFERENCES Dosen(nip)
);

--Create table for User
CREATE TABLE IF NOT EXISTS User(
	user_name VARCHAR(100) PRIMARY KEY, 
	password VARCHAR(20) NOT NULL, 
	role VARCHAR(100) NOT NULL
);

---------------START INSERTING DATA-----------------
-- Input data Jurusan
INSERT OR REPLACE INTO Jurusan (kode_jurusan, nama_jurusan) VALUES
(101, 'Matematika'),
(102, 'Fisika'),
(105, 'Kimia'),
(131, 'Teknik Mesin'),
(132, 'Teknik Elektro'),
(133, 'Teknik Fisika'),
(134, 'Teknik Industri'),
(136, 'Teknik Dirgantara'),
(137, 'Teknik Material');

--Input data Mahasiswa
INSERT OR REPLACE INTO Mahasiswa (nim, nama_lengkap, dob, alamat, kode_jurusan) VALUES
(10116001, 'Bagoes Suryo', '1999-09-11', 'Jakarta', 101),
(10216001, 'Giri Wardhana', '1998-04-10', 'Blitar', 102),
(10516001, 'M Ridwan', '1998-12-27', 'Solo', 105),
(13116001, 'Wawan Adi', '1999-05-23', 'Klaten', 131),
(13116002, 'Ricky Indra', '1999-08-19', 'Kebumen', 131),
(13216001, 'Qori Aziz', '1998-04-01', 'Bogor', 132),
(13316001, 'Al Muharik', '1998-03-04', 'Jambi', 133),
(13416001, 'Vicky Wahyu', '1998-07-02', 'Klaten', 134),
(13616001, 'Nauval Hamzah', '1998-07-31', 'Bandung', 136),
(13616002, 'Ali Aziz', '1998-02-21', 'Tulungagung', 136),
(13616003, 'Rizki Zuhri', '1998-01-10', 'Lampung', 136),
(13615001, 'Arviansyah Hermawan', '1997-08-19', 'Bandung', 137);

--Input data Dosen
INSERT OR REPLACE INTO Dosen (nip, nama_lengkap, kode_jurusan) VALUES
(1001, 'M Agus Karim', 131),
(1002, 'Satrio Wicaksono', 131),
(2001, 'M Agoes Moelyadi', 136),
(2002, 'Ema Amalia', 136),
(2003, 'Lavi R Zuhal', 136),
(2004, 'Rianto Adhy', 136),
(2005, 'Tatacipta Dirgantara', 136),
(3001, 'Ahmad Muchlis', 101),
(3002, 'Maman Budiman', 102),
(3005, 'Nizar Happyana', 105),
(3032, 'Umar Khayam', 132),
(3033, 'Hermawan Kresno', 133),
(3034, 'Iwan Inrawan', 134),
(3037, 'Mardiyati', 137);

--Input data Mata Kuliah
INSERT OR REPLACE INTO MataKuliah (kode_mata_kuliah, nama_mata_kuliah, jumlah_sks, kode_jurusan) VALUES
('MS3001', 'Gambar Teknik', 2, 131),
('MS3002', 'Mekanika Kekuatan Material', 3, 131),
('AE3001', 'Aerodinamika 1', 3, 136),
('AE3002', 'Mekanika Fluida', 3, 136),
('AE3003', 'Teori Kendali', 2, 136),
('AE3004', 'Finite Element Analysis', 3, 136),
('MA1001', 'Kalkulus', 3, 101),
('FI1001', 'Fisika Dasar', 3, 102),
('KI1001', 'Kimia Dasar', 3, 105),
('EL1001', 'Analisis Rangkaian', 2, 132),
('TF1001', 'Nanomaterial', 2, 133),
('TI1001', 'Statistika Industri', 2, 134),
('MT1001', 'Material Organik', 2, 137); 

--Input data Kontrak
INSERT OR REPLACE INTO Kontrak (nim, kode_mata_kuliah, nip, nilai) VALUES
(13116001, 'MS3001', 1001, 'A'),
(13116001, 'MS3002', 1002, 'AB'),
(13116002, 'MS3001', 1001, 'C'),
(13116002, 'MS3002', 1002, 'C'),
(13116002, 'AE3004', 2005, 'C'),
(13616001, 'MS3001', 1001, 'B'),
(13616001, 'MS3002', 1002, 'AB'),
(13616001, 'AE3001', 2001, 'A'),
(13616001, 'AE3002', 2003, 'B'),
(13616001, 'AE3003', 2004, 'B'),
(13616001, 'AE3004', 2005, 'AB'),
(13616002, 'MS3001', 1001, 'B'),
(13616002, 'MS3002', 1002, 'A'),
(13616002, 'AE3001', 2001, 'B'),
(13616002, 'AE3002', 2003, 'B'),
(13616002, 'AE3003', 2004, 'E'),
(13616002, 'AE3004', 2005, 'A'),
(13616003, 'MS3001', 1001, 'A'),
(13616003, 'MS3002', 1002, 'A'),
(13616003, 'AE3001', 2001, 'AB'),
(13616003, 'AE3002', 2003, 'B'),
(13616003, 'AE3003', 2004, 'A'),
(13616001, 'MA1001', 3001, 'A'),
(13616001, 'FI1001', 3002, 'B'),
(13616001, 'KI1001', 3005, 'B');

INSERT OR REPLACE INTO User (user_name, password, role) VALUES
('Nauval', '1234', 'ADMIN'),
('Zuhri', '4321', 'GUEST');

