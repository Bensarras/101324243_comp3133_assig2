// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Apollo, gql } from 'apollo-angular';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';

// const CREATE_EMPLOYEE_MUTATION = gql`
//   mutation CreateEmployee($name: String!, $lastname: String!, $email: String!, $salary: Float!, $gender: String!) {
//     createEmployee(name: $name, lastname: $lastname, email: $email, salary: $salary, gender: $gender) {
//       id
//     }
//   }
// `;

// @Component({
//   selector: 'app-create-employee',
//   templateUrl: './create-employee.component.html',
//   styleUrls: ['./create-employee.component.css']
// })
// export class CreateEmployeeComponent {
//   name: string = '';
//   lastname: string = '';
//   email: string = '';
//   salary: number | null = null;
//   gender: string = '';

//   constructor(private apollo: Apollo, private router: Router) {}

//   onSubmit() {
//     this.apollo.mutate({
//       mutation: CREATE_EMPLOYEE_MUTATION,
//       variables: {
//         name: this.name,
//         lastname: this.lastname,
//         email: this.email,
//         salary: this.salary,
//         gender: this.gender
//       }
//     }).pipe(
//       catchError((error) => {
//         console.error('Error creating employee:', error.message);
//         return throwError(error);
//       })
//     ).subscribe(() => {
//       this.router.navigate(['/main']);
//     });
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CreateEmployee($name: String!, $lastname: String!, $email: String!, $salary: Float!, $gender: String!) {
    createEmployee(name: $name, lastname: $lastname, email: $email, salary: $salary, gender: $gender) {
      id
    }
  }
`;

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  name: string = '';
  lastname: string = '';
  email: string = '';
  salary: number | null = null;
  gender: string = '';

  constructor(private apollo: Apollo, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.apollo.mutate({
      mutation: CREATE_EMPLOYEE_MUTATION,
      variables: {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        salary: this.salary,
        gender: this.gender
      } 
    }).pipe(
      catchError((error) => {
        console.error('Error creating employee:', error.message);
        return throwError(error);
      })
    ).subscribe(() => {
      this.router.navigate(['/main']);
    });
  }

  goBack() {
    this.router.navigate(['/main']);
  }
}
