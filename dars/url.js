const URl = require ('url');

const newUrl = new URL (
  'http://eldor.uz:5000/user.user.js?name=eldor&status=active&age=25'
);

// Urlni tuliq chiqarib beradi
console.log (newUrl.href);

//  domen va port haqida malumot beradi
console.log (newUrl.host);

// domen haqida malumot beradi
console.log (newUrl.hostname);

//path
console.log (newUrl.pathname);

// query params
console.log (newUrl.search);

// query object
console.log (newUrl.searchParams);

// param qushish uchun append
newUrl.searchParams.append ('firstname', 'odilov');
console.log (newUrl.searchParams);

// for each
console.log (
  newUrl.searchParams.forEach ((name, value) => {
    console.log (`${value}: ${name}`);
  })
);
