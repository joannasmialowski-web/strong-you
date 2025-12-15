import { Component, Input } from '@angular/core';

import { AboutContent } from '@core/models/content.model';

@Component({
  selector: 'app-about-section',
  standalone: true,
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss'
})
export class AboutSectionComponent {
  @Input({ required: true }) content!: AboutContent;
}

