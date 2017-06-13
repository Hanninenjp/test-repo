import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";

@Injectable()
export class SocketService {

  private serverUrl: string;
  private websocket: any;

  constructor() {
    //this.serverUrl = 'ws://echo.websocket.org/'; //Echo server
    this.serverUrl = 'ws://localhost:8080'; //Local server
    this.websocket = null;
  }

  public getSocket(): Observable<any>{
    this.websocket = new WebSocket(this.serverUrl);

    this.websocket.onopen = () => {
      console.log('Socket opened');
      //this.sendMessage('Socket works');
    };

    return Observable.fromEvent(this.websocket, 'message')
      .map( (messageEvent:MessageEvent) => {
        console.log('Message received: ' + messageEvent.data);
        return messageEvent.data;
      });
  }

  public sendMessage(message:string){
    console.log('Message sent: ' + message);
    this.websocket.send(message);
  }

  public closeSocket(){
    if(this.websocket){
      this.websocket.close();
      this.websocket = null;
    }
  }

}
