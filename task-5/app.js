const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cd(null, 'files/')
    },
    filename: (req, file, cb) => {
        const n = Date.now();
        cb(null, n + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const fileLength = parseInt(req.headers['content-length'])
    const fileTypes = ['doc', 'docx']
    if(fileTypes.includes(file.mimetype) && fileLength < 1000){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter});

app.get('/task-5', (req, res)=>{
    res.send('<form method="POST" action="/task-5" enctype="multipart/form-data"><input type="file"/id="file" name="file"><input type="submit" value="go"/></form>')
})

app.post('/task-5', upload.single('file'), (req, res)=>{
    res.json('file uploaded successfully')
})

app.listen(port, () => {
    console.log('server  work');

});