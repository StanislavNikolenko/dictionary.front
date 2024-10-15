// import { Component } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// //import { AuthService } from './auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-auth',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './signup.component.html',
//   //styleUrls: ['./auth.component.css']
// })

// export class SignUpComponent {
//   signupForm = new FormGroup({
//     email: new FormControl(""),
//     password: new FormControl(""),
//   });
//   isLogin: boolean = false;

//   //constructor(private authService: AuthService, private router: Router) {}

// //   onSubmit(event: Event) {
// //     event.preventDefault();
// //     const { email, password } = this.signupForm.value;
// //     if (this.isLogin) {
// //       this.authService.login(email!, password!).subscribe({
// //         next: response => {
// //           console.log('login is successfull');
// //           this.router.navigate(['/']);
// //         },
// //        error: error => {
// //           console.error('Login failed');
// //         }
// //     })
// //     } else {
// //       console.log('Sign Up', email, password);
// //     }
// //   }

//   toggleAuthMode() {
//     this.isLogin = !this.isLogin;
//   }
// }
