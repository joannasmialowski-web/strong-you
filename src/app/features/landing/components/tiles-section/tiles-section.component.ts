
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ServiceTile } from '../../../../core/models/content.model';

@Component({
    selector: 'app-tiles-section',
    imports: [MatCardModule],
    templateUrl: './tiles-section.component.html',
    styleUrl: './tiles-section.component.scss'
})
export class TilesSectionComponent {
  @Input({ required: true }) tiles: ServiceTile[] = [];

  trackByIndex(index: number): number {
    return index;
  }
}

