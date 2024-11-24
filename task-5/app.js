const express = require('express');
const multer = require('multer');
const port = 3000;
const path = require('path');
const CONFIG = require('./db/config');
const mysql = require('mysql2/promise');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/')
    },
    filename: (req, file, cb) => {
        const n = Date.now();
        cb(null, n + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const fileLength = parseInt(req.headers['content-length'])
    const fileTypes = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if (fileTypes.includes(file.mimetype) && fileLength < 1000000) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.get('/', (req, res) => {
    res.json({ "work": true })
});


app.use(async (req, res, next) => {
    global.conn = await mysql.createPool(CONFIG);
    next()
})

app.get('/task-5', (req, res) => {
    res.send('<form method="POST" action="/task-5" enctype="multipart/form-data"><input type="file"/id="file" name="file"><input type="submit" value="go"/></form>')
})

app.post('/task-5', upload.single('file'), async (req, res) => {
    // console.log(req.file);
    
    // const query = 'INSERT INTO files (id, file_name, file_ext, created_at, path) VALUES(?, ?, ?, ?)'
    // const file = await connection.execute(query, )
    res.json('file uploaded successfully')
})

app.listen(port, () => {
    console.log('server  work');
});