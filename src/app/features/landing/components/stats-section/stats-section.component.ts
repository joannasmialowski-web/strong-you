import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import { StatMetric } from '../../../../core/models/content.model';

@Component({
    selector: 'app-stats-section',
    imports: [NgFor],
    templateUrl: './stats-section.component.html',
    styleUrl: './stats-section.component.scss'
})
export class StatsSectionComponent {
  @Input({ required: true }) stats: StatMetric[] = [];

  trackByIndex(index: number): number {
    return index;
  }
}

