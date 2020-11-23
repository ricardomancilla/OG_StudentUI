import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent, ConfirmationModalComponent, ErrorInterceptor, IntegerOnlyInput, NgbdSortableHeader } from './_helpers';
import { StudentsComponent } from './students/students.component';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StudentsCuComponent } from './students/students-cud/students-cu.component';
import { SidebarComponent } from './_helpers/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationModalComponent,
    AlertComponent,
    StudentsComponent,
    StudentsCuComponent,
    SidebarComponent,
    NgbdSortableHeader,
    IntegerOnlyInput,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000,
      preventDuplicates: false,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [
    DecimalPipe,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
