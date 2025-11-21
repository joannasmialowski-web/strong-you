import { TestBed } from '@angular/core/testing';

import { ContentService } from './content.service';
import { DEFAULT_CONTENT } from '../models/content.model';

describe('ContentService', () => {
  let service: ContentService;
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] ?? null;
    });
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        store[key] = value;
      }
    );

    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentService);
  });

  it('should expose default content when storage is empty', () => {
    const snapshot = service.snapshot;

    expect(snapshot.hero.title).toEqual(DEFAULT_CONTENT.hero.title);
    expect(snapshot.tiles).not.toBe(DEFAULT_CONTENT.tiles);
    expect(snapshot.contact.email).toEqual(DEFAULT_CONTENT.contact.email);
  });

  it('should merge hero updates without losing other fields', () => {
    service.updateContent({
      hero: { ...DEFAULT_CONTENT.hero, title: 'Nowy tytuł' }
    });

    expect(service.snapshot.hero.title).toBe('Nowy tytuł');
    expect(service.snapshot.hero.subtitle).toBe(
      DEFAULT_CONTENT.hero.subtitle
    );
  });

  it('should persist updates to localStorage', () => {
    service.updateContent({
      contact: {
        email: 'nowy@kontakt.pl',
        phone: DEFAULT_CONTENT.contact.phone,
        location: DEFAULT_CONTENT.contact.location
      }
    });

    expect(store['strongyou.content']).toContain('nowy@kontakt.pl');
  });

  it('should reset content to defaults', () => {
    service.updateContent({
      hero: { ...DEFAULT_CONTENT.hero, title: 'Zmiana' }
    });

    service.resetContent();

    expect(service.snapshot.hero.title).toBe(DEFAULT_CONTENT.hero.title);
  });
});

