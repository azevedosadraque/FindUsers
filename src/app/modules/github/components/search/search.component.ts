import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']  // Alterado para SCSS
})
export class SearchComponent {
  username: string = '';
  
  constructor(private router: Router) {}

  searchUser() {
    if (this.username) {
      this.router.navigate(['/user', this.username]);
    }
  }
}
