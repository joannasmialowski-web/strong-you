import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

type NavItem = {
  label: string;
  path: string;
  isCta?: boolean;
};

@Component({
    selector: 'app-main-nav',
    imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgOptimizedImage
],
    templateUrl: './main-nav.component.html',
    styleUrl: './main-nav.component.scss'
})
export class MainNavComponent {
  readonly navItems: NavItem[] = [
    { label: 'Osiągnięcia', path: '/osiagniecia' },
    { label: 'Przemiany', path: '/przemiany' },
    { label: 'Galeria', path: '/galeria' },
    { label: 'O mnie', path: '/o-mnie' },
    { label: 'Kontakt', path: '/kontakt' },
    { label: 'Umów trening', path: '/umow-trening', isCta: true }
  ];
}

