import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../models/login';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <main class="flex-grow flex flex-col justify-center px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-2">Administracion</h2>
        </div>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="">
            <label class="sr-only" for="username">Correo Electronico</label>
            <input
              class="w-full h-14 px-4 border border-[var(--olive-color)] text-[var(--olive-color)] rounded-lg focus:outline-none"
              formControlName="user"
              id="username"
              placeholder="Correo Eletronico"
              type="email" />
            @if (loginForm.controls.user.touched) {
              @if (loginForm.controls.user.hasError('required')) {
                <span class="error">El usuario es requerido</span>
              }
              @if (loginForm.controls.user.hasError('email')) {
                <span class="error">El usuario debe de ser un correo electronico valido</span>
              }
            }
          </div>
          <div class="">
            <label class="sr-only" for="password">Contraseña</label>
            <input
              class="w-full border border-[var(--olive-color)] text-[var(--olive-color)] rounded-lg h-14 px-4 focus:outline-none"
              formControlName="password"
              id="password"
              placeholder="Contraseña"
              type="password" />
            @if (loginForm.controls.password.touched) {
              @if (loginForm.controls.password.hasError('required')) {
                <span class="error">La Contraseña es requerida</span>
              }
            }
          </div>
          <button class="button full-width primary" [disabled]="loginForm.invalid" [ngClass]="{ 'disabled': loginForm.invalid }" type="submit">
            Iniciar sesion
          </button>
        </form>
      </main>
    </div>

  `,
  styles: ``
})
export default class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  formBuilder: FormBuilder = inject(FormBuilder);
  loginForm: FormGroup<LoginForm> = this.createForm();


  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    const { user, password } = this.loginForm.value;
    const { data, error } = await this.authService.loginWithPassword(user || '', password || '');
    if(error) {
      console.error('error en login', error);
    } else {
      await this.router.navigate(['/admin']);
    }

  }

  private createForm(): FormGroup<LoginForm> {
    return this.formBuilder.nonNullable.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
