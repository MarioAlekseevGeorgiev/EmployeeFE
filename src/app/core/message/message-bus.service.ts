import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

export enum MessageType {
  Success,
  Error
}

export interface Message {
  text: string;
  type: MessageType;
}

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {

  private message$ = new Subject<Message>();

  onNewMessage$ = this.message$.asObservable();

  constructor() { }

  notifyMessage(message: Message) {
    this.message$.next(message);
  }

  clear() {
    setTimeout( () => {
      // @ts-ignore
      this.message$.next(undefined);
    }, 3000);
  }
}
