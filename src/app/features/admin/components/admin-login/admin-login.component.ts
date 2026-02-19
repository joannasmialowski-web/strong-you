import { Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  readonly errorMessage = signal('');

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required.bind(Validators), Validators.email.bind(Validators)]],
    password: ['', Validators.required.bind(Validators)],
  });

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    const success = this.authService.login(email, password);
    if (success) {
      this.errorMessage.set('');
      this.snackBar.open('Witaj w panelu!', undefined, { duration: 2500 });
      await this.router.navigate(['/admin']);
      return;
    }
    this.errorMessage.set('Niepoprawny e-mail lub hasło.');
  }
}
