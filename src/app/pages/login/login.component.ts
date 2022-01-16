import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICommonResponse } from 'src/app/shared/interfaces/commom-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLoading = false;
  public isSignUp = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', []),
    });
  }

  public submit() {
    console.log(this.isSignUp, this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    if (this.isSignUp) {
      this.userService.create(this.form.value).subscribe(
        (res: any) => {
          if (!res.success) {
            this._snackBar.open(res.message, 'Fechar');
            return;
          }
          localStorage.setItem('user_token', res.data.token);
          this._snackBar.open('Usuário criado com sucesso', 'Fechar');
          this.router.navigate(['/inbox']);
        },
        (err) => {
          this._snackBar.open(err.message, 'Fechar');
        },
        () => {
          this.isLoading = false;
        }
      );
    }

    this.authService.signIn(this.form.value).subscribe(
      (res: ICommonResponse) => {
        if (!res.success) {
          this._snackBar.open(res.message, 'Fechar');
          return;
        }
        localStorage.setItem('user_token', res.data.token);
        this.router.navigate(['/inbox']);
      },
      (err) => {
        this._snackBar.open(err.message, 'Fechar');
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  signUp() {
    this.form.markAsUntouched();
    this.form.reset();
    this.isSignUp = !this.isSignUp;
    if (this.isSignUp) {
      this.form.get('name').setValidators(Validators.required);
    } else {
      this.form.get('name').clearValidators();
    }
  }
}
