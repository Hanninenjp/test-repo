import { Component, OnInit, OnDestroy } from '@angular/core';
import {SocketService} from "./Services/socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  private title: string;
  private message: string;
  private messages: string[];

  constructor(private socket: SocketService){
    this.title = 'Websocket test';
    this.message = '';
    this.messages = [];
  }

  sendMessage(){
    this.socket.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit(){
    this.socket.getSocket()
      .subscribe(message => {
        let timeStamp = new Date().toISOString();
        let displayMessage = 'Message: ' + message + ', Time: ' + timeStamp;
        this.messages.unshift(displayMessage);
        if(this.messages.length > 10){
          this.messages.pop();
        }
      });
  }

  ngOnDestroy(){
    this.socket.closeSocket();
  }

}
