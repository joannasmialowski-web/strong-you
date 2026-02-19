import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ContactSectionComponent } from './contact-section.component';

const DEFAULT_CONTACT = {
  email: 'kontakt@strongyou.pl',
  phone: '+48 600 700 800',
  location: 'Studio Mokotów',
} as const;

const VALID_FORM_VALUE = {
  name: 'Asia',
  email: 'asia@example.com',
  message: 'To jest przykładowa wiadomość.',
} as const;

const EMPTY_FORM_VALUE = {
  name: '',
  email: '',
  message: '',
} as const;

const setup = async (): Promise<{
  component: ContactSectionComponent;
  snackBar: jasmine.SpyObj<MatSnackBar>;
}> => {
  const snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
  await TestBed.configureTestingModule({
    imports: [ContactSectionComponent, NoopAnimationsModule],
  })
    .overrideProvider(MatSnackBar, { useValue: snackBar })
    .compileComponents();

  const fixture: ComponentFixture<ContactSectionComponent> =
    TestBed.createComponent(ContactSectionComponent);
  const component = fixture.componentInstance;
  component.contact = DEFAULT_CONTACT;
  fixture.detectChanges();

  return { component, snackBar };
};

describe('ContactSectionComponent', () => {
  let component: ContactSectionComponent;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    ({ component, snackBar } = await setup());
  });

  it('should keep form invalid when required fields are empty', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const openSpy = snackBar.open as jasmine.Spy;

    expect(component.form.invalid).toBeTrue();

    component.submit();

    expect(component.form.invalid).toBeTrue();
    expect(openSpy).not.toHaveBeenCalled();
    expect(component.hasError('name', 'required')).toBeTrue();
    expect(component.hasError('email', 'required')).toBeTrue();
    expect(component.hasError('message', 'required')).toBeTrue();
  });

  it('should submit valid form, reset and show snackbar', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const openSpy = snackBar.open as jasmine.Spy;

    component.form.setValue(VALID_FORM_VALUE);
    component.submit();

    expect(openSpy).toHaveBeenCalledWith(
      'Dzięki! Odezwę się wkrótce.',
      undefined,
      { duration: 3000 },
    );
    expect(component.form.value).toEqual(EMPTY_FORM_VALUE);
  });
});
