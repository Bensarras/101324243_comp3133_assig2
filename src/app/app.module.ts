import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApolloClientOptions, InMemoryCache, ApolloClient } from '@apollo/client';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Apollo } from 'apollo-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'main', component: MainComponent },
  { path: 'create-employee', component: CreateEmployeeComponent },
  { path: 'employee/:id', component: EmployeeViewComponent },
  // Add other routes here as needed
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    CreateEmployeeComponent,
    EmployeeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://assingment01-101324243.vercel.app/'
          })
        };
      },
      deps: [HttpLink]
    },
    Apollo
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
