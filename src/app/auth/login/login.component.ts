import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {emailValidator} from "../util";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {ILogin} from "../../core/interfaces/login";
import {MessageBusService, MessageType} from "../../core/message/message-bus.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private messageBus: MessageBusService) { }

  loginFormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, emailValidator]),
    'password': new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  ngOnInit(): void {}

  handleLogin() {
    const { email, password } = this.loginFormGroup.value;

    const body: ILogin = {
      email: email,
      password: password
    }

    this.authService.login$(body).subscribe( () => {
      this.messageBus.notifyMessage({
        text: 'Logged in successfully!',
        type: MessageType.Success
      });
      this.router.navigate(['/home']);
    });

  }
}
