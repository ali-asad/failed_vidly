const bcrypt = require('bcrypt');

async function run() {
    const salt = await bcrypt.genSalt(15 );
    const hashed = await bcrypt.hash('asad12345' , salt);
    console.log(salt);
       console.log(hashed);
}

run(); 