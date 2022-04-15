import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator, passwordMatch} from "../util";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {IRegister} from "../../core/interfaces/register";
import {MessageBusService, MessageType} from "../../core/message/message-bus.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private messageBus: MessageBusService) {
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
      'username': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'email': new FormControl('', [Validators.required, emailValidator]),
      'passwords': new FormGroup({
        'password': this.passwordControl,
        'rePassword': new FormControl('', [Validators.required, passwordMatch(this.passwordControl)])
        //'rePassword': new FormControl('', [passwordMatch2])
      }),

    }
  );

  ngOnInit(): void {}

  handleRegister(){
    const { username, email, passwords} = this.registerFormGroup.value;

    const body: IRegister = {
      username: username,
      email: email,
      password: passwords.password,
      repassword: this.passwordsGroup.value['rePassword']
    }

    this.authService.register$(body).subscribe( () => {
        this.messageBus.notifyMessage({
          text: 'Registered and logged in successfully!',
          type: MessageType.Success
        });
        this.router.navigate(['/home']);
    });
  }

  shouldShowErrorControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }
}
