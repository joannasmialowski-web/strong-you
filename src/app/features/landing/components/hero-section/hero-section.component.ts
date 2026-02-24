import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { HeroContent } from '@core/models/content.model';

@Component({
  selector: 'app-hero-section',
  imports: [MatButtonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  @Input({ required: true }) content!: HeroContent;
  @Output() primaryCta = new EventEmitter<void>();
  @Output() secondaryCta = new EventEmitter<void>();
}
