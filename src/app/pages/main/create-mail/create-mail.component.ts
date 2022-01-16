import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterEvent } from '@angular/router';
import { ICommonResponse } from 'src/app/shared/interfaces/commom-response';
import { MailService } from 'src/app/shared/services/mail/mail.service';

@Component({
  selector: 'app-create-mail',
  templateUrl: './create-mail.component.html',
  styleUrls: ['./create-mail.component.scss'],
})
export class CreateMailComponent implements OnInit {
  public form: FormGroup;
  public isLoading = false;
  constructor(
    public mailService: MailService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.form = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      receiverEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  public handleSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    console.log(this.form.value);

    this.mailService.sendMail(this.form.value).subscribe(
      (res: any) => {
        if (!res.success) {
          this._snackBar.open(res.message, 'Fechar');
          return;
        }
        this._snackBar.open('Email enviado com sucesso', 'Fechar');
        this.router.navigate(['/inbox']);
      },
      (err: ICommonResponse) => {
        this._snackBar.open(err.message, 'Fechar');
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
