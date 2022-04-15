import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {IUser} from "../../../core/interfaces/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn?: boolean;
  currentUser?: IUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    )

    this.authService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }



}
