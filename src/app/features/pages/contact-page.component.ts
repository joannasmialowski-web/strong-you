import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ContentService } from '../../core/services/content.service';
import {
  ContactSectionComponent
} from '../landing/components/contact-section/contact-section.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [NgIf, AsyncPipe, ContactSectionComponent],
  template: `
    <section class="info-page">
      <div class="section__inner" *ngIf="content$ | async as content">
        <p class="eyebrow">Kontakt</p>
        <h1>Porozmawiajmy o Twoim celu</h1>
        <app-contact-section [contact]="content.contact" />
      </div>
    </section>
  `,
  styles: [
    `
      .info-page {
        padding: 6rem 0;
      }

      h1 {
        font-size: clamp(2.6rem, 4vw, 3.6rem);
        letter-spacing: 0.08em;
        margin-bottom: 2rem;
      }
    `
  ]
})
export class ContactPageComponent {
  private readonly contentService = inject(ContentService);
  readonly content$ = this.contentService.content$;
}

