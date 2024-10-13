import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  authForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    wordTranslation: new FormControl(""),
  });
  isLogin: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    const { email, password } = this.authForm.value;
    if (this.isLogin) {
      this.authService.login(email!, password!).subscribe({
        next: response => {
          console.log('login is successfull');
          this.router.navigate(['/']);
        },
       error: error => {
          console.error('Login failed');
        }
    })
    } else {
      console.log('Sign Up', email, password);
    }
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
