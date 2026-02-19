import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ContactContent } from '@core/models/content.model';

@Component({
    selector: 'app-contact-section',
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
],
    templateUrl: './contact-section.component.html',
    styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {
  @Input({ required: true }) contact!: ContactContent;

  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  readonly form = this.fb.nonNullable.group({
    name: [
      '',
      [Validators.required.bind(Validators), Validators.maxLength(60)]
    ],
    email: [
      '',
      [Validators.required.bind(Validators), Validators.email.bind(Validators)]
    ],
    message: [
      '',
      [Validators.required.bind(Validators), Validators.minLength(10)]
    ]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.getRawValue();
    console.log('Kontakt', payload);
    this.snackBar.open('Dzięki! Odezwę się wkrótce.', undefined, {
      duration: 3000
    });
    this.form.reset();
  }

  hasError(field: 'name' | 'email' | 'message', error: string): boolean {
    const control = this.form.get(field);
    return !!control && control.touched && control.hasError(error);
  }

  phoneHref(): string {
    return `tel:${this.contact.phone.replace(/\s+/g, '')}`;
  }

  mailHref(): string {
    return `mailto:${this.contact.email}`;
  }
}
