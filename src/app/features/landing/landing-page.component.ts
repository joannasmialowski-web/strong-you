import { AsyncPipe, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ContentService } from '../../core/services/content.service';
import {
  HeroSectionComponent
} from './components/hero-section/hero-section.component';
import {
  AboutSectionComponent
} from './components/about-section/about-section.component';
import {
  TilesSectionComponent
} from './components/tiles-section/tiles-section.component';
import {
  StatsSectionComponent
} from './components/stats-section/stats-section.component';
import {
  ContactSectionComponent
} from './components/contact-section/contact-section.component';

@Component({
    selector: 'app-landing-page',
    imports: [
        NgIf,
        AsyncPipe,
        HeroSectionComponent,
        AboutSectionComponent,
        TilesSectionComponent,
        StatsSectionComponent,
        ContactSectionComponent
    ],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  @ViewChild('contactSection') contactSection?: ElementRef<HTMLElement>;

  private readonly contentService = inject(ContentService);
  private readonly router = inject(Router);

  readonly content$ = this.contentService.content$;

  handlePrimaryCta(): void {
    this.scrollToContact();
  }

  handleSecondaryCta(): void {
    this.router.navigate(['/przemiany']);
  }

  private scrollToContact(): void {
    const element = this.contactSection?.nativeElement;
    if (!element) {
      return;
    }
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

