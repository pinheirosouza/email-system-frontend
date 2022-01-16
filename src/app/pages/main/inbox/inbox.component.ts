import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { ICommonResponse } from 'src/app/shared/interfaces/commom-response';
import { IMail } from 'src/app/shared/interfaces/mail';
import { MailService } from 'src/app/shared/services/mail/mail.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  displayedColumns: string[] = ['name', 'subject'];

  public mails: Array<IMail>;
  public socket = io(environment.BACKED_URL);
  constructor(
    private mailService: MailService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMails();
    this.mailService.getNewMailsJoin().subscribe(
      (message) => {
        if (message) {
          this.getMails();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMails() {
    this.mailService
      .getMails('?receivedBy=me&deleted=false')
      .subscribe((res: ICommonResponse<Array<IMail>>) => {
        if (!res.success) {
          this._snackBar.open(res.message, 'Fechar');
          return;
        }
        this.mails = res.data;
      });
  }

  openMail(id) {
    this.router.navigate(['/mail/' + id]);
  }
}
