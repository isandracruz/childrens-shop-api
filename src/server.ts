import app from './app';

app.listen(app.get('port'), () => {
    console.log(`Server is listening on port ${app.get('port')}`);
})