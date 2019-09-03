const server = require('./server.js');
const dbFunc = require('./data/db');


const port = 8002;
server.listen(port, () => console.log(`/n API on port ${port}`));