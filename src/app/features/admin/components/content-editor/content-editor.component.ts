import { NgFor } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import {
  ContactContent,
  HeroContent,
  ServiceTile,
  SiteContent,
  StatMetric
} from '../../../../core/models/content.model';
import { ContentService } from '../../../../core/services/content.service';

type TileGroup = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
}>;

type StatGroup = FormGroup<{
  value: FormControl<string>;
  label: FormControl<string>;
}>;

@Component({
    selector: 'app-content-editor',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        NgFor
    ],
    templateUrl: './content-editor.component.html',
    styleUrl: './content-editor.component.scss'
})
export class ContentEditorComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly contentService = inject(ContentService);
  private readonly snackBar = inject(MatSnackBar);

  readonly form = this.fb.nonNullable.group({
    hero: this.fb.nonNullable.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      primaryCtaLabel: ['', Validators.required],
      secondaryCtaLabel: ['', Validators.required],
      imageUrl: ['', Validators.required]
    }),
    about: this.fb.nonNullable.group({
      title: ['', Validators.required],
      intro: ['', Validators.required]
    }),
    tiles: this.fb.array<TileGroup>([]),
    stats: this.fb.array<StatGroup>([]),
    contact: this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      location: ['', Validators.required]
    })
  });

  private readonly subscription: Subscription =
    this.contentService.content$.subscribe(content =>
      this.patchForm(content)
    );

  get tiles(): FormArray<TileGroup> {
    return this.form.controls.tiles;
  }

  get stats(): FormArray<StatGroup> {
    return this.form.controls.stats;
  }

  addTile(): void {
    this.tiles.push(this.buildTileGroup());
  }

  removeTile(index: number): void {
    this.tiles.removeAt(index);
  }

  addStat(): void {
    this.stats.push(this.buildStatGroup());
  }

  removeStat(index: number): void {
    this.stats.removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.contentService.updateContent({
      hero: value.hero as HeroContent,
      about: value.about,
      tiles: value.tiles as ServiceTile[],
      stats: value.stats as StatMetric[],
      contact: value.contact as ContactContent
    });
    this.snackBar.open('Zapisano', undefined, { duration: 2500 });
  }

  reset(): void {
    this.contentService.resetContent();
    this.snackBar.open('Przywrócono domyślne treści', undefined, {
      duration: 2500
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private patchForm(content: SiteContent): void {
    this.form.patchValue({
      hero: content.hero,
      about: content.about,
      contact: content.contact
    });
    this.setArray(this.tiles, content.tiles, tile =>
      this.buildTileGroup(tile)
    );
    this.setArray(this.stats, content.stats, stat =>
      this.buildStatGroup(stat)
    );
  }

  private setArray<T>(
    array: FormArray<FormGroup>,
    values: T[],
    builder: (value: T) => FormGroup
  ): void {
    array.clear();
    values.forEach(value => array.push(builder(value)));
  }

  private buildTileGroup(tile?: ServiceTile): TileGroup {
    return this.fb.nonNullable.group({
      title: [tile?.title ?? '', Validators.required],
      description: [tile?.description ?? '', Validators.required]
    });
  }

  private buildStatGroup(stat?: StatMetric): StatGroup {
    return this.fb.nonNullable.group({
      value: [stat?.value ?? '', Validators.required],
      label: [stat?.label ?? '', Validators.required]
    });
  }
}

