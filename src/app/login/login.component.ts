
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})  
export class LoginComponent {
  password: string = '';

  constructor(public authService: AuthService) {}

  login() {
    // Call the authenticate method from AuthService
    this.authService.authenticate(this.password);
  }
}
