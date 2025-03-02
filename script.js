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

