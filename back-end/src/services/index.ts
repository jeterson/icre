import bancoRoutes from './resources/banco.router';
import estadoRoutes from './resources/estado.router';
import parametroRoutes from './resources/parametro.router';
import clienteRoutes from './resources/cliente.router';
import variaveisRoutes from './resources/variaveis.router';
import backupRoutes from './resources/backup.router';

export default [...bancoRoutes, ...estadoRoutes, ...parametroRoutes, ...clienteRoutes, ...variaveisRoutes, ...backupRoutes];