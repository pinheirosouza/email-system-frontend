import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public events: string[] = [];
  public opened: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
