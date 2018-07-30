import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login-loading',
  templateUrl: './login-loading.page.html',
  styleUrls: ['./login-loading.page.scss'],
})
export class LoginLoadingPage implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.startAuthentication();
  }
}
