const express = require('express');
const multer = require('multer');
const path = require('path');
const port = 3000;

// создаем приложение
const app = express();

// настроим загрузку файлов
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);


        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        // cb(null, file.originalname);
        const n = Date.now();
        cb(null, n + path.extname(file.originalname));
    }
});

const storageFilter = (req, file, cb) => {
    const fileSize = parseInt(req.headers[
        'content-length'
    ]);
    console.log(fileSize);
    const ext = ["image/jpeg", "image/png", "image/jpg"];
    const t = file.mimetype;
    if (ext.includes(t) && fileSize <= 50000) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storageConfig, fileFilter: storageFilter });

app.get('/', (req, res) => {
    res.json({ "work": true })
});

app.get('/upload', (req, res) => {
    res.send('<form method="POST" action="/upload" enctype="multipart/form-data"><input type="file"/id="file" name="file"><input type="submit" value="go"/></form>');
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.json('файл загружен')
});

app.listen(port, () => {
    console.log('server  work');

});