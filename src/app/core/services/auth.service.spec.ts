import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] ?? null;
    });
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        store[key] = value;
      }
    );

    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should authenticate with correct credentials', () => {
    const result = service.login('admin@strongyou.pl', 'Admin123!');

    expect(result).toBeTrue();
    expect(service.isAuthenticated()).toBeTrue();
    expect(store['strongyou.admin.auth']).toBe('true');
  });

  it('should reject invalid credentials', () => {
    const result = service.login('user@example.com', 'wrong');

    expect(result).toBeFalse();
    expect(service.isAuthenticated()).toBeFalse();
    expect(store['strongyou.admin.auth']).toBe('false');
  });

  it('should clear state on logout', () => {
    service.login('admin@strongyou.pl', 'Admin123!');
    service.logout();

    expect(service.isAuthenticated()).toBeFalse();
    expect(store['strongyou.admin.auth']).toBe('false');
  });
});

