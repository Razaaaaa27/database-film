const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataFile = 'films.json';

// Load data from JSON file
const loadFilms = () => {
    try {
        const data = fs.readFileSync(dataFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Save data to JSON file
const saveFilms = (films) => {
    fs.writeFileSync(dataFile, JSON.stringify(films, null, 2));
};

// Show all films
const showFilms = () => {
    const films = loadFilms();
    if (films.length === 0) {
        console.log('Belum ada film yang terdaftar.');
    } else {
        console.log('\nDaftar Film:');
        films.forEach((film, index) => {
            console.log(`${index + 1}. ${film.title} - ${film.genre} - ${film.year}`);
        });
    }
    mainMenu();
};

// Add new film
const addFilm = () => {
    rl.question('Masukkan judul film: ', (title) => {
        rl.question('Masukkan genre film: ', (genre) => {
            rl.question('Masukkan tahun rilis: ', (year) => {
                const films = loadFilms();
                films.push({ title, genre, year });
                saveFilms(films);
                console.log(`Film "${title}" berhasil ditambahkan!`);
                mainMenu();
            });
        });
    });
};

// Show one film
const showOneFilm = () => {
    rl.question('Masukkan judul film yang ingin dilihat: ', (title) => {
        const films = loadFilms();
        const film = films.find(f => f.title.toLowerCase() === title.toLowerCase());
        if (film) {
            console.log(`\nJudul: ${film.title}\nGenre: ${film.genre}\nTahun: ${film.year}`);
        } else {
            console.log('Film tidak ditemukan.');
        }
        mainMenu();
    });
};

// Update film
const updateFilm = () => {
    rl.question('Masukkan judul film yang ingin diperbarui: ', (title) => {
        const films = loadFilms();
        const index = films.findIndex(f => f.title.toLowerCase() === title.toLowerCase());
        if (index !== -1) {
            rl.question('Masukkan genre baru: ', (genre) => {
                rl.question('Masukkan tahun rilis baru: ', (year) => {
                    films[index] = { title, genre, year };
                    saveFilms(films);
                    console.log(`Film "${title}" berhasil diperbarui!`);
                    mainMenu();
                });
            });
        } else {
            console.log('Film tidak ditemukan.');
            mainMenu();
        }
    });
};

// Delete film
const deleteFilm = () => {
    rl.question('Masukkan judul film yang ingin dihapus: ', (title) => {
        let films = loadFilms();
        const newFilms = films.filter(f => f.title.toLowerCase() !== title.toLowerCase());
        if (newFilms.length < films.length) {
            saveFilms(newFilms);
            console.log(`Film "${title}" berhasil dihapus!`);
        } else {
            console.log('Film tidak ditemukan.');
        }
        mainMenu();
    });
};

// Search films by genre
const searchByGenre = () => {
    rl.question('Masukkan genre yang ingin dicari: ', (genre) => {
        const films = loadFilms();
        const filteredFilms = films.filter(film => film.genre.toLowerCase() === genre.toLowerCase());
        if (filteredFilms.length > 0) {
            filteredFilms.forEach(film => {
                console.log(${film.title} - ${film.year});
            });
        } else {
            console.log('Tidak ada film dengan genre tersebut.');
        }
        mainMenu();
    });
};

// Sort films by year
const sortFilms = () => {
    const films = loadFilms();
    const sortedFilms = films.sort((a, b) => a.year - b.year); // Sort by year
    console.log('Film yang diurutkan berdasarkan tahun rilis:');
    sortedFilms.forEach(film => {
        console.log(${film.title} - ${film.year});
    });
    mainMenu();
};

// Add rating to a film
const addRating = () => {
    rl.question('Masukkan judul film untuk diberi rating: ', (title) => {
        const films = loadFilms();
        const film = films.find(f => f.title.toLowerCase() === title.toLowerCase());
        if (film) {
            rl.question('Masukkan rating (1-5): ', (rating) => {
                film.rating = rating;
                saveFilms(films);
                console.log(Rating untuk film "${title}" berhasil ditambahkan!);
                mainMenu();
            });
        } else {
            console.log('Film tidak ditemukan.');
            mainMenu();
        }
    });
};

// Show latest film
const showLatestFilm = () => {
    const films = loadFilms();
    const latestFilm = films.sort((a, b) => new Date(b.year) - new Date(a.year))[0];
    if (latestFilm) {
        console.log(Film terbaru: ${latestFilm.title} - ${latestFilm.year});
    } else {
        console.log('Tidak ada film di database.');
    }
    mainMenu();
};

// Backup data
const backupData = () => {
    const films = loadFilms();
    fs.writeFileSync('films_backup.json', JSON.stringify(films, null, 2));
    console.log('Data berhasil dicadangkan!');
    mainMenu();
};

// Main menu
const mainMenu = () => {
    console.log('\nPilih aksi:');
    console.log('1. Lihat daftar film');
    console.log('2. Tambah film');
    console.log('3. Lihat satu film');
    console.log('4. Update film');
    console.log('5. Hapus film');
    console.log('6. Cari film berdasarkan genre');
    console.log('7. Urutkan film berdasarkan tahun');
    console.log('8. Tambah rating film');
    console.log('9. Lihat film terbaru');
    console.log('10. Backup data');
    console.log('11. Keluar');
    rl.question('Masukkan nomor: ', (answer) => {
        switch (answer) {
            case '1': showFilms(); break;
            case '2': addFilm(); break;
            case '3': showOneFilm(); break;
            case '4': updateFilm(); break;
            case '5': deleteFilm(); break;
            case '6': searchByGenre(); break;
            case '7': sortFilms(); break;
            case '8': addRating(); break;
            case '9': showLatestFilm(); break;
            case '10': backupData(); break;
            case '11': rl.close(); break;
            default:
                console.log('Pilihan tidak valid, coba lagi.');
                mainMenu();
        }
    });
};

// Start program
console.log('Selamat datang di Database Film!');
mainMenu();
