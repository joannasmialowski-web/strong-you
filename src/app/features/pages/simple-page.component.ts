import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface PageData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-simple-page',
  standalone: true,
  template: `
    <section class="info-page">
      <div class="section__inner">
        <h1>{{ data.title }}</h1>
        <p class="info-page__text">{{ data.description }}</p>
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
        margin-bottom: 1rem;
      }

      .info-page__text {
        color: var(--color-text-subtle);
        line-height: 1.7;
        max-width: 720px;
      }
    `
  ]
})
export class SimplePageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly data = this.route.snapshot.data as PageData;
}

