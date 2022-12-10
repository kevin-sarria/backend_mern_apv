import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import conectarDB from './config/db.js'
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitios = [process.env.FRONTEND_URL, '127.0.0.1'];

const corsOptions = {
    origin: function(origin, callback) {
        if( dominiosPermitios.indexOf(origin) !== -1 ) {
            // El origen del Request esta permitido
            callback(null, true);
        } else {
            callback(new Error('No Permitido Por CORS'));
        }
    }
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto: ${PORT}`);
})

app.use(cors(corsOptions));
// Si no le pongo opciones dentro de cors, no dara error pero admite todas las conexiones
// app.use(cors());

app.use( '/api/veterinarios', veterinarioRoutes );
app.use( '/api/pacientes', pacienteRoutes );