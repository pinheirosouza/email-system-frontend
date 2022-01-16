import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateMailComponent } from './pages/main/create-mail/create-mail.component';
import { InboxComponent } from './pages/main/inbox/inbox.component';
import { MailComponent } from './pages/main/mail/mail.component';
import { MainComponent } from './pages/main/main.component';
import { OutboxComponent } from './pages/main/outbox/outbox.component';
import { TrashComponent } from './pages/main/trash/trash.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { HomeGuard } from './shared/guards/home/home.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'inbox',
        component: InboxComponent,
      },
      {
        path: 'outbox',
        component: OutboxComponent,
      },
      {
        path: 'trash',
        component: TrashComponent,
      },
      {
        path: 'mail/:id',
        component: MailComponent,
      },
      {
        path: 'create-mail',
        component: CreateMailComponent,
      },
      {
        path: '',
        redirectTo: 'inbox',
        pathMatch: 'full',
      },
    ],
    canActivate: [HomeGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
