import express from 'express';
const indexRoutes = express.Router();

indexRoutes.get("/", (req, res) => {   
   res.send('Welcome to our children\'s store API!');
});

export default indexRoutes;