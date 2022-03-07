const mongoose = require ("mongoose");

const dbConfig = 'mongodb+srv://usuario:usuario@cluster0.qs9ii.mongodb.net/annotations?retryWrites=true&w=majority';

//fazendo a conexão 
const connection =  mongoose.connect (dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//exportar pra que seja usado em todo o sistema
module.exports = connection;
