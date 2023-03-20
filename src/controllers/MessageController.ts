import WSTransport, { WSTransportEvents } from '../utils/WSTransport';
import Store from '../utils/Store';
import IMessage from '../interfaces/IMessage';
import ChatsController from './ChatsController';
import IState from '../interfaces/IState';

class MessageController {
    private sockets: Map<number, WSTransport> = new Map();

    async connect(id: number, getToken: () => Promise<string>) {
        if (this.sockets.has(id)) {
            return;
        }

        const token: string = await getToken();
        const state: IState = Store.getState();
        const userId = state?.user?.data?.id as number;
        const wsTransport: WSTransport = new WSTransport(userId, id, token);

        this.sockets.set(id, wsTransport);

        await wsTransport.connect();

        this.subscribe(wsTransport, id);
        this.getOldMessages(id);
    }

    send(id: number, message: string): never | void {
        const socket = this.sockets.get(id);

        if (!socket) {
            throw new Error(`Chat ${id} is not connected`);
        }

        socket.send({
            type: 'message',
            content: message,
        });
    }

    close(id: number): void {
        const wsTransport : WSTransport | undefined = this.sockets.get(id);
        wsTransport?.close();
    }

    closeAll(): void {
        Array.from(this.sockets.values()).forEach(socket => {
            socket.close();
        });
    }

    getOldMessages(id: number): never | void {
        const socket: WSTransport | undefined = this.sockets.get(id);

        if (!socket) {
            throw new Error(`Chat ${id} is not connected`);
        }

        socket.send({ type: 'get old', content: '0' });
    }

    onMessage(id: number, messages: IMessage | IMessage[]): void {
        const state: IState = Store.getState();
        let messagesToAdd: IMessage[] = [];

        if (Array.isArray(messages)) {
            messagesToAdd = messages.reverse();
        } else {
            messagesToAdd.push(messages);
        }

        ChatsController.get({}, false);

        const currentMessages: IMessage[] = state.messages && state.messages[id] ? state.messages[id].data : [];

        messagesToAdd = [ ...currentMessages, ...messagesToAdd ];

        Store.set(`messages.${id}`, { data: messagesToAdd });
    }

    onClose(id: number): void {
        this.sockets.delete(id);
    }

    subscribe(transport: WSTransport, id: number): void {
        transport.on(WSTransportEvents.Message, (message) => this.onMessage(id, message));
        transport.on(WSTransportEvents.Close, () => this.onClose(id));
    }
}

export default new MessageController();
