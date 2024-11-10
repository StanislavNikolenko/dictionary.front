import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  authForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    wordTranslation: new FormControl(""),
    username: new FormControl(""),
  });
  isLogin: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    const { email, password, username } = this.authForm.value;
    if (this.isLogin) {
      this.authService.login(email!, password!).subscribe({
        next: (response) => {
          console.log("login is successfull");
          this.router.navigate(["/"]);
        },
        error: (error) => {
          console.error("Login failed");
        },
      });
    } else {
      this.authService.signup(email!, password!, username!).subscribe({
        next: (response) => {
          console.log("signup is successfull");
          this.router.navigate(["/"]);
        },
        error: (error) => {
          console.error("Sign Up failed");
        },
      });
    }
  }

  toggleAuthMode(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
  }
}
