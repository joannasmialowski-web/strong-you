import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['/admin/login']);
  }
}
