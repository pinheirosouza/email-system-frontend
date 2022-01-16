import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommonResponse } from 'src/app/shared/interfaces/commom-response';
import { IMail } from 'src/app/shared/interfaces/mail';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MailService } from 'src/app/shared/services/mail/mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss'],
})
export class MailComponent implements OnInit {
  public mail: IMail;
  public isLoading = false;
  constructor(
    private mailService: MailService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getMail();
  }

  getMail() {
    this.mailService
      .getMail(`?_id=${this.route.snapshot.paramMap.get('id')}`)
      .subscribe((res: ICommonResponse<Array<IMail>>) => {
        this.mail = res.data[0];
        if (
          this.mail.read === false &&
          this.authService.getLoggedUserId() == this.mail.receivedBy._id
        ) {
          this.mailService.update(this.mail._id, { read: true }).subscribe(
            (res: ICommonResponse) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
  }

  deleteMail() {
    this.mailService
      .deleteMail(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (res: ICommonResponse) => {
          if (!res.success) {
            this._snackBar.open(res.message, 'Fechar');
            return;
          }
          this._snackBar.open('Email apagado com sucesso', 'Fechar');
          this.router.navigate(['/trash']);
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
