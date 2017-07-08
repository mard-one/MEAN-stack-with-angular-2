import { Component, OnInit }                                from '@angular/core';
import { FormBuilder, FormGroup, Validators }               from '@angular/forms';
import { AuthService }                                      from '../../services/auth.service';
import { Router }                                           from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router)
  {
    this.createForm();
  }
  createForm (){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required
      ])]
    },{ validator: this.matchingPasswords('password','confirmPassword')})
  };


  disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirmPassword'].disable();
  };
  enableForm(){
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirmPassword'].enable();
  };

  validateEmail(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)){
      return null
    } else {
      return { 'validateEmail': true }
    }
  };
  validateUsername(controls){
    const regExp = new RegExp(/^[a-zA-Z\-]+$/);
    if (regExp.test(controls.value)){
      return null
    } else {
      return { 'validateUsername': true }
    }
  };
  validatePassword(controls){
      const regExp = new RegExp(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{0,}$/);
    if (regExp.test(controls.value)){
      return null
    } else {
      return { 'validatePassword': true }
    }
  };
  matchingPasswords(password, confirmPassword){
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirmPassword].value){
        return null;
      } else {
        return { 'matchingPasswords': true};
      }
    }
  }



  onRegistration(){
    this.disableForm();
    this.processing = true;
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };
    this.authService.registerUser(user).subscribe(data => {
      if (!data.success){
        this.processing = false;
        this.enableForm();
        this.messageClass = "alert alert-danger";
        this.message = data.message;
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(()=> {
          this.router.navigate(['/login']);
        }, 2000);
      }
    });
  };


  checkEmail(){
    const email = this.form.get('email').value;
    if(email){
      this.authService.checkEmail(email).subscribe(data => {
        if (!data.success){
          this.emailValid = false;
          this.emailMessage = data.message;
          console.log(this.usernameValid)
        } else {
          this.emailValid = true;
          this.emailMessage = null;
          console.log(this.usernameValid)
        }
      })
    }
  };
  checkUsername(){
    const username = this.form.get('username').value;
    if (username){
      this.authService.checkUsername(username).subscribe(data => {
        if (!data.success){
          this.usernameValid = false;
          this.usernameMessage = data.message;
        } else {
          this.usernameValid = true;
          this.usernameMessage = null;
        }
      })
    }

  };

  ngOnInit() {
  }

}
