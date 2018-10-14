import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiResponse } from '../api-response';

import { UtilService } from '../util.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  redirectTo: string;
  errorResponse: ApiResponse;
  theForm: FormGroup; 
  error = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private authService: AuthService,
  ) { 

    this.theForm = formBuilder.group({  
      username:["", Validators.required],
      password:["", Validators.required],
    });

    this.redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
  }

  ngOnInit() {
  }

  get f() { return this.theForm.controls; }

  onSubmit() { 
        // stop here if form is invalid
    if (this.theForm.invalid) {
        return;
    }

    this.authService.login(this.f.username.value, this.f.password.value)
    .then(data =>{
      this.router.navigate([this.redirectTo?this.redirectTo:'/']);
    })
    .catch((error) =>{
      this.error = error;
    });
  }
}
