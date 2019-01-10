const express = require('express');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

//Declaraciones
const app = express();

//Config.
app.set('port', 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MiddleWares
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/img'),
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimetype && extname){
            return cb(null, true);
        }

        cb('Error: Archivo debe de ser una imagen valida');

    }
}).single('image'));

//Routes, aqui es qué pasará a la hora que la cuando mi app este conectada a la ruta principal
app.use(require('./routes/indexRoutes'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Empezar servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`);
});