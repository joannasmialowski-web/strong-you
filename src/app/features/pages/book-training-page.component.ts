import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ContentService } from '../../core/services/content.service';
import {
  ContactSectionComponent
} from '../landing/components/contact-section/contact-section.component';

const STEPS = [
  {
    title: 'Konsultacja online',
    description: '30 minut rozmowy o celach, zdrowiu i czasie.'
  },
  {
    title: 'Plan startowy',
    description: 'Otrzymujesz plan na 2 tygodnie i listę szybkich zadań.'
  },
  {
    title: 'Regularny coaching',
    description: 'Trzymam rękę na pulsie i dopasowuję obciążenia.'
  }
];

@Component({
  selector: 'app-book-training-page',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, ContactSectionComponent],
  template: `
    <section class="info-page">
      <div class="section__inner" *ngIf="content$ | async as content">
        <p class="eyebrow">Umów trening</p>
        <h1>Prosty proces w trzech krokach</h1>
        <div class="steps">
          <div class="step" *ngFor="let step of steps">
            <span class="step__number">{{ stepNumber(step) }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
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

      .steps {
        display: grid;
        gap: 1rem;
        margin-bottom: 2.5rem;
      }

      .step {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-radius: 14px;
        border: 1px solid var(--color-border);
        background: rgba(5, 6, 8, 0.6);
      }

      .step__number {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        background: var(--color-accent);
        color: #050608;
        display: grid;
        place-items: center;
        font-weight: 700;
      }

      .step h3 {
        margin: 0 0 0.25rem;
      }

      .step p {
        margin: 0;
        color: var(--color-text-subtle);
      }
    `
  ]
})
export class BookTrainingPageComponent {
  private readonly contentService = inject(ContentService);
  readonly content$ = this.contentService.content$;
  readonly steps = STEPS;

  stepNumber(step: (typeof STEPS)[number]): string {
    const index = this.steps.indexOf(step);
    return `0${index + 1}`;
  }
}

