import { WS_URL } from '../config';
import EventBus from './EventBus';

export enum WSTransportEvents {
    Connected = 'connected',
    Error = 'error',
    Message = 'message',
    Close = 'close',
}

export default class WSTransport extends EventBus {
    private socket: WebSocket | null = null;
    private pingInterval = 0;
    private endpoint: string | null;

    constructor(userId: number, chatId: number, token: string) {
        super();

        this.endpoint = `/${userId}/${chatId}/${token}`;
    }

    send(data: unknown) {
        if (!this.socket) {
            throw new Error('No socket');
        }

        this.socket.send(JSON.stringify(data));
    }

    connect() {
        this.socket = new WebSocket(`${WS_URL}${this.endpoint}`);

        this.subscribe(this.socket);

        this.setupPing();

        return new Promise<void>((resolve) => {
            this.on(WSTransportEvents.Connected, () => {
                resolve();
            });
        });
    }

    close() {
        this.socket?.close();
    }

    setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({ type: 'ping' });
        }, 10000)

        this.on(WSTransportEvents.Close, () => {
            clearInterval(this.pingInterval);

            this.pingInterval = 0;
        })
    }

    subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit(WSTransportEvents.Connected);
        });

        socket.addEventListener('close', () => {
            this.emit(WSTransportEvents.Close);
        });

        socket.addEventListener('error', e => {
            this.emit(WSTransportEvents.Error, e);
        });

        socket.addEventListener('message', message => {
            const data = JSON.parse(message.data);

            if (data.type && data.type !== 'message') {
                return;
            }

            this.emit(WSTransportEvents.Message, data);
        });
    }
}
