import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

interface Employee {
  id: string;
  name: string;
  lastname: string;
  email: string;
  salary: number;
  gender: string;
}
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
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  employee: Employee | null = null;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apollo.watchQuery<{ getEmployee: Employee }>({
        query: GET_EMPLOYEE_QUERY,
        variables: {
          id: id,
        },
      }).valueChanges.subscribe((result) => {
        this.employee = result.data.getEmployee;
      });
    }
  }
  goBack() {
    window.history.back();
  }
}
