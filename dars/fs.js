const fs = require ('fs');
const path = require ('path');

// let a = 'mdwfkgnw';
//  PAPKA yaratish uchun ishlatiladi!   ===> fs.mkdir
// fs.mkdir (path.join (__dirname, '/papka'), {}, err => {
//   if (err) throw err;
//   console.log ('Papka yaraldi!');
// });

// fayl yaratish
// fs.writeFile (
//   path.join (__dirname, '/papka', 'writeText.txt'),
//   'Node js dagi fs package bilan yaratildi!',
//   err => {
//     if (err) throw err;
//     console.log ('writeText.txt yaratildi nodejs orqali ! ');
//   }
// );

// Faylga malumot qushish uchun ishlatiladi.
// fs.appendFile (
//   path.join (__dirname, '/papka', 'writeText.txt'),
//   'Hello world',
//   err => {
//     if (err) throw err;
//     console.log ('maliummot yangilandi ! ');
//   }
// );

fs.readFile (
  path.join (__dirname, '/papka', 'writeText.txt'),
  'utf8',
  (err, data) => {
    if (err) throw err;
    else console.log (data);
  }
);

fs.rename (
  path.join (__dirname, '/papka', 'writeText.txt'),
  path.join (__dirname, '/papka', 'salom.txt'),
  err => {
    if (err) throw err;
  }
);
