
const express = require ('express');
const {config} = require ('dotenv');

const {connect} = require ('mongoose')
const indexRoutes = require ('./routes/index.routes')
// const morgan = require ('morgan')
const path = require ('path')
const methodOverride = require('method-override');

const app = express();

// Parametros de conexion
config()
const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI);
const PORT = process.env.PORT || 3000;
console.log(PORT);



// Preparando cadena de conexion
// const CONECTOR = `mongodb+srv://${USER}:${PASSWORD}@Cluster0.jwnnw.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`;
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// module.exports = {USER, PASSWORD, DATA_BASE,CONECTOR, OPTIONS}

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(morgan('dev'));
app.use(methodOverride('_method'));


// settings
app.use(indexRoutes);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static files
app.use(express.static(path.join(__dirname, "public")));






connect(MONGODB_URI, OPTIONS)
    // si algo sale mal mostramos el error
    .then(() => {
        console.log("MONGO CONECTION OPEN!!!")
    })
    .catch (err => {
        console.log("OH NO, MONGO CONECTION ERROR!!!")
        console.log (err)
    });



app.listen(PORT, () => {
    console.log('Connected to PORT', PORT);
});


