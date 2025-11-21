import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'strongyou.admin.auth';
  private readonly allowedEmail = 'admin@strongyou.pl';
  private readonly allowedPassword = 'Admin123!';
  private readonly authenticated = signal(this.readPersisted());

  readonly isAuthenticated = computed(() => this.authenticated());

  login(email: string, password: string): boolean {
    const success =
      email.trim().toLowerCase() === this.allowedEmail &&
      password === this.allowedPassword;
    this.authenticated.set(success);
    this.persist(success);
    return success;
  }

  logout(): void {
    this.authenticated.set(false);
    this.persist(false);
  }

  private readPersisted(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    try {
      const stored = window.localStorage.getItem(this.storageKey);
      return stored === 'true';
    } catch {
      return false;
    }
  }

  private persist(value: boolean): void {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(this.storageKey, String(value));
    } catch {
    }
  }
}

