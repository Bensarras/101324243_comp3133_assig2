import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

interface Employee {
  id: string;
  name: string;
  lastname: string;
  email: string;
  salary: number;
  gender: string;
}

interface GetEmployeesData {
  getEmployees: Employee[];

}



const GET_EMPLOYEES_QUERY = gql`
  query GetEmployees {
    getEmployees {
      id
      name
      lastname
      email
      salary
      gender
    }
  }
`;
const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;
const GET_EMPLOYEE_QUERY = gql`
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      name
      lastname
      email
      salary
      gender
    }
  }
`;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  employees: Employee[] = [];
  user = localStorage.getItem('user');


  constructor(private apollo: Apollo,private router: Router) {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = userData.username;
    console.log('User data:', userData);
    
  }

  ngOnInit() {
    this.apollo
      .watchQuery<GetEmployeesData>({
        query: GET_EMPLOYEES_QUERY,
      })
      .valueChanges.subscribe((result) => {
        this.employees = result.data.getEmployees;
      });
  }
  goToCreateEmployee() {
    this.router.navigate(['/create-employee']);
  }
  deleteEmployee(id: string) {
    this.apollo.mutate({
      mutation: DELETE_EMPLOYEE_MUTATION,
      variables: {
        id: id,
      },
    }).subscribe(() => {
      // Update the local list of employees after deleting an employee
      this.employees = this.employees.filter(employee => employee.id !== id);
    }, (error) => {
      console.log('Error deleting employee:', error);
    });
  }
  signOut() {
    // Clear any stored data, such as tokens or user information
    localStorage.removeItem('user');
    
    // Navigate to the sign-up page
    this.router.navigate(['/login']);
  }
}
