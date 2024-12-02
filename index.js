const express = require('express');
const dotenv = require('dotenv'); 
dotenv.config(); 

const app = express();


app.use(express.json()); 

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});

module.exports=  app;