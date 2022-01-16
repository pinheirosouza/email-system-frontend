import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { InboxComponent } from './pages/main/inbox/inbox.component';
import { OutboxComponent } from './pages/main/outbox/outbox.component';
import { TrashComponent } from './pages/main/trash/trash.component';
import { MailComponent } from './pages/main/mail/mail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateMailComponent } from './pages/main/create-mail/create-mail.component';
import { TokenInterceptorService } from './shared/interceptors/token/token.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    InboxComponent,
    OutboxComponent,
    TrashComponent,
    MailComponent,
    CreateMailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
