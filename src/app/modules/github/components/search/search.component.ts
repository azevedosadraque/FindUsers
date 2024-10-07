import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field'

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class SearchComponent {
  username: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}
  searchUserExample() {
    this.username = 'angular';  // Exemplo de nome de usuário GitHub
    this.searchUser();
  }
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
