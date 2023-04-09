import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

interface CreateUserResultData {
  createUser: {
    username: string;
    email: string;
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      username
      email
    }
  }
`;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  error: string = '';

  constructor(private apollo: Apollo, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.apollo.mutate<CreateUserResultData>({
      mutation: CREATE_USER_MUTATION,
      variables: {
        username: this.username,
        password: this.password,
        email: this.email
      }
    }).pipe(
      catchError((error) => {
        this.error = error.message;
        return throwError(error);
      })
    ).subscribe(() => {
      // Navigate to another page, e.g., login page, after successful signup
      this.router.navigate(['/login']);
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
