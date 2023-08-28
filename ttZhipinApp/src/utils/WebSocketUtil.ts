import { Buffer } from 'buffer';


class WebSocketUtils {
    private socketUrl: string = "ws://server.natappfree.cc:35996/ws";
    private socket: WebSocket | null = null;
    private listeners: { eventType: string; callback: Function }[] = [];

    connect(url?: string) {
        if(!url) {
            url = this.socketUrl;
        }
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('WebSocket connected');
            this.notifyListeners('open');
        };

        this.socket.onmessage = (event) => {
            const message = event.data;
            this.notifyListeners('message', message);
        };

        this.socket.onclose = () => {
            console.log('WebSocket disconnected');
            this.notifyListeners('close');
        };
    }

    send(userImei: string,
        userToken: string, 
        userCommand: number, 
        userClientType: number, 
        jsonData: string) {
    
        const data = this.build(userImei, userToken, userCommand, userClientType, jsonData);
        console.log(data);
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            console.log("调用 send");
            this.socket.send(data);
        }
        
    }

    addListener(eventType: string, callback: Function) {
        this.listeners.push({ eventType, callback });
    }

    removeListener(callback: Function) {
        this.listeners = this.listeners.filter(listener => listener.callback !== callback);
    }

    notifyListeners(eventType: string, data?: any) {
        this.listeners.forEach(listener => {
            if (listener.eventType === eventType) {
                listener.callback(data);
            }
        });
    }

    close() {
        if (this.socket) {
            this.socket.close();
        }
    }


    build(
        userImei: string,
        userToken: string, 
        userCommand: number, 
        userClientType: number,
        jsonData: string): any {
        const imei = Buffer.from(userImei);
        const imeiLength = imei.length;
        const imeiLengthBytes = Buffer.alloc(4);
        imeiLengthBytes.writeInt32BE(imeiLength, 0);

        const token = Buffer.from(userToken);
        const tokenLength = token.length;
        const tokenLengthBytes = Buffer.alloc(4);
        tokenLengthBytes.writeInt32BE(tokenLength, 0);

        const command = Buffer.alloc(4);
        command.writeInt32BE(userCommand, 0);

        const clientType = Buffer.from([userClientType]);

        const body = Buffer.from(jsonData, 'utf-8');
        const bodyLength = body.length;
        const bodyLengthBytes = Buffer.alloc(4);
        bodyLengthBytes.writeInt32BE(bodyLength, 0);

        const concatenatedBuffer = Buffer.concat([
            command,
            clientType,
            tokenLengthBytes,
            imeiLengthBytes,
            bodyLengthBytes,
            token,
            imei,
            body
        ]);

        return concatenatedBuffer;
    }

}

export default new WebSocketUtils();
