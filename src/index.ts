import dotenv from 'dotenv'

dotenv.config()

import { app } from './app'
import { AddressInfo } from 'net'



const Port: number = process.env.PORT ? Number(process.env.PORT) : 5000;
const server = app.listen(Port, '0.0.0.0', () => {
    const { port, address } = server.address() as AddressInfo;
    console.log('Server listening on:', 'http://' + address + ':' + port);
});

export default app