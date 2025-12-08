import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ContactSectionComponent } from './contact-section.component';

describe('ContactSectionComponent', () => {
  let component: ContactSectionComponent;
  let fixture: ComponentFixture<ContactSectionComponent>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent, NoopAnimationsModule]
    })
      .overrideProvider(MatSnackBar, { useValue: snackBarSpy })
      .compileComponents();

    fixture = TestBed.createComponent(ContactSectionComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    component.contact = {
      email: 'kontakt@strongyou.pl',
      phone: '+48 600 700 800',
      location: 'Studio Mokotów'
    };
    fixture.detectChanges();
  });

  it('should keep form invalid when required fields are empty', () => {
    expect(component.form.invalid).toBeTrue();

    component.submit();

    expect(component.form.invalid).toBeTrue();
    expect(snackBar.open).not.toHaveBeenCalled();
    expect(component.hasError('name', 'required')).toBeTrue();
    expect(component.hasError('email', 'required')).toBeTrue();
    expect(component.hasError('message', 'required')).toBeTrue();
  });

  it('should submit valid form, reset and show snackbar', () => {
    component.form.setValue({
      name: 'Asia',
      email: 'asia@example.com',
      message: 'To jest przykładowa wiadomość.'
    });

    component.submit();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Dzięki! Odezwę się wkrótce.',
      undefined,
      { duration: 3000 }
    );
    expect(component.form.value).toEqual({
      name: '',
      email: '',
      message: ''
    });
  });
});

