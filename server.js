const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Assistant de notes de frais en écoute sur http://127.0.0.1:${port}`);
});