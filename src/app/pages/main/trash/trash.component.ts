import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICommonResponse } from 'src/app/shared/interfaces/commom-response';
import { IMail } from 'src/app/shared/interfaces/mail';
import { MailService } from 'src/app/shared/services/mail/mail.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
})
export class TrashComponent implements OnInit {
  displayedColumns: string[] = ['name', 'subject'];

  public mails: Array<IMail>;

  constructor(
    private mailService: MailService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMails();
  }

  getMails() {
    this.mailService
      .getMails('?receivedBy=me&deleted=true')
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
