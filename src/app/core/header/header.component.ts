import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {MessageBusService, MessageType} from "../message/message-bus.service";
import {Subscription} from "rxjs";
import {IUser} from "../interfaces/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  message: string = '';
  isMessageError: boolean = false;

  private subscription = new Subscription();

  isLoggedIn?: boolean;
  currentUser?: IUser;

  constructor(private authService: AuthService, private messageBus: MessageBusService) { }

  ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
          this.isLoggedIn = isLoggedIn;
        }
      )
    this.authService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;
    });

    this.subscription.add(
      this.messageBus.onNewMessage$.subscribe(newMessage => {
           this.message = newMessage?.text || '';
           this.isMessageError = newMessage?.type === MessageType.Error;

          if (this.message) {
            this.messageBus.clear();
          }
        }
      )
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

  logOut() {
    this.authService.logout$();
  }

}
