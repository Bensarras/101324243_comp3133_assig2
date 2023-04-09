// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Apollo, gql } from 'apollo-angular';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';


// interface LoginResultData {
//   login: {
//     username: string;
//     password: string;
//   }
// }
// const LOGIN_QUERY = gql`
//   query Login($username: String!, $password: String!) {
//     login(username: $username, password: $password) {
//       username
//       password
      
//     }
//   }
// `;

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   error: string = '';

//   constructor(private apollo: Apollo, private router: Router) {}

//   onSubmit() {
//     this.apollo.watchQuery<LoginResultData>({
//       query: LOGIN_QUERY,
//       variables: {
//         username: this.username,
//         password: this.password
//       }
//     }).valueChanges.pipe(
//       catchError((error) => {
//         this.error = error.message;
//         return throwError(error);
//       })
//     ).subscribe((result) => {
//       // Remove the line related to the token and handle the result as needed
//       this.router.navigate(['/main']);
//     });
//   }
//   goToSignup() {
//     this.router.navigate(['/signup']);
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface LoginResultData {
  login: {
    username: string;
    password: string;
  }
}

const LOGIN_QUERY = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      password
      id
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private apollo: Apollo, private router: Router) {}

  onSubmit() {
    this.apollo.watchQuery<LoginResultData>({
      query: LOGIN_QUERY,
      variables: {
        username: this.username,
        password: this.password
      }
    }).valueChanges.pipe(
      catchError((error) => {
        this.error = error.message;
        return throwError(error);
      })
    ).subscribe((result) => {
      if (result.data.login) {
        localStorage.setItem('user', JSON.stringify(result.data.login)); // Store user information in local storage
        this.router.navigate(['/main']);
      } else {
        this.error = 'Wrong username or password. Please try again.';
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

}

