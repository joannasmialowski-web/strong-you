import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  DEFAULT_CONTENT,
  SiteContent,
  AboutContent,
  ContactContent,
  HeroContent,
  ServiceTile,
  StatMetric,
} from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly storageKey = 'strongyou.content';
  private readonly subject = new BehaviorSubject<SiteContent>(
    this.readFromStorage() ?? this.cloneContent(DEFAULT_CONTENT),
  );

  readonly content$ = this.subject.asObservable();

  get snapshot(): SiteContent {
    return this.cloneContent(this.subject.getValue());
  }

  updateContent(partial: Partial<SiteContent>): void {
    const current = this.snapshot;
    const next: SiteContent = {
      hero: this.mergeHero(current.hero, partial.hero),
      about: this.mergeAbout(current.about, partial.about),
      tiles: this.cloneTiles(partial.tiles ?? current.tiles),
      stats: this.cloneStats(partial.stats ?? current.stats),
      contact: this.mergeContact(current.contact, partial.contact),
    };
    const cloned = this.cloneContent(next);
    this.persist(cloned);
    this.subject.next(cloned);
  }

  resetContent(): void {
    const reset = this.cloneContent(DEFAULT_CONTENT);
    this.persist(reset);
    this.subject.next(reset);
  }

  private mergeHero(current: HeroContent, incoming?: HeroContent): HeroContent {
    if (!incoming) {
      return current;
    }
    return { ...current, ...incoming };
  }

  private mergeAbout(current: AboutContent, incoming?: AboutContent): AboutContent {
    if (!incoming) {
      return current;
    }
    return { ...current, ...incoming };
  }

  private mergeContact(current: ContactContent, incoming?: ContactContent): ContactContent {
    if (!incoming) {
      return current;
    }
    return { ...current, ...incoming };
  }

  private readFromStorage(): SiteContent | null {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const stored = window.localStorage.getItem(this.storageKey);
      return stored ? this.cloneContent(JSON.parse(stored) as SiteContent) : null;
    } catch {
      return null;
    }
  }

  private persist(content: SiteContent): void {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify(content));
    } catch {
      // no-op
    }
  }

  private cloneContent(content: SiteContent): SiteContent {
    return {
      hero: { ...content.hero },
      about: { ...content.about },
      tiles: this.cloneTiles(content.tiles),
      stats: this.cloneStats(content.stats),
      contact: { ...content.contact },
    };
  }

  private cloneTiles(tiles: ServiceTile[]): ServiceTile[] {
    return tiles.map((tile) => ({ ...tile }));
  }

  private cloneStats(stats: StatMetric[]): StatMetric[] {
    return stats.map((stat) => ({ ...stat }));
  }
}
