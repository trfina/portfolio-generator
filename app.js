const fs = require('fs');
const generatePage = require('./src/page-template.js');

const pageHTML = generatePage(name, github);

fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw new err;

    console.log('Portfolio complete! Check out index.html to see the output!');
});









// console.log(profileDataArgs);
// const printProfileData = profileDataArr => {
//     for (let i=0; i < profileDataArr.length; i += 1) {
//         console.log(profileDataArr[i]);
//     }
//     console.log('==================');
//     profileDataArr.forEach((profileItem) => 
//     console.log(profileItem));
//     };
// printProfileData(profileDataArgs);


