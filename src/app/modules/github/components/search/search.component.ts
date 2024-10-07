import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class SearchComponent {
  username: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  searchUser() {
    console.log("searchUser")
    if (this.username.trim() === '') {
      this.errorMessage = 'Please enter a valid GitHub username.';
    } else {
      this.errorMessage = null;
      this.router.navigate(['/user', this.username]);
    }
  }
}
