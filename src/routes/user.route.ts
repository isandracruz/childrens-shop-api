import express from 'express';

const userRoutes = express.Router();

userRoutes.get('/users', (req, res) => {
    res.send('Show info of all users');
});

userRoutes.get('/users/:id', (req, res) => {
    res.send(`Show info of user ${req.params.id}`);
});

userRoutes.post('/users/create', (req, res) => { 
    const name = req.body?.name || 'default'
    res.send(`Create user with name ${name}`);
});

userRoutes.put('/users/update/:id', (req, res) => {    
    res.send(`Update user with id ${req.params.id}`);
});

userRoutes.delete('/users/delete/:id', (req, res) => {    
    res.send(`Delete user with id ${req.params.id}`);
});

export default userRoutes;