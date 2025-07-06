import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityWritingComponent } from './community-writing.component';

describe('CommunityWritingComponent', () => {
  let component: CommunityWritingComponent;
  let fixture: ComponentFixture<CommunityWritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityWritingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render community and writing content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('lib-sub-section')).toBeTruthy();
    expect(compiled.textContent).toContain('Community & Writing');
    expect(compiled.textContent).toContain('Meetup Organizer');
    expect(compiled.textContent).toContain('Tech Blogger');
  });

  it('should render external links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a.external-link');
    expect(links.length).toBe(2);

    const meetupLink = links[0] as HTMLAnchorElement;
    expect(meetupLink.href).toContain('meetup.com');
    expect(meetupLink.target).toBe('_blank');
    expect(meetupLink.rel).toBe('noopener');

    const blogLink = links[1] as HTMLAnchorElement;
    expect(blogLink.href).toContain('waog.wordpress.com');
    expect(blogLink.target).toBe('_blank');
    expect(blogLink.rel).toBe('noopener');
  });

  it('should render link icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const linkIcons = compiled.querySelectorAll('mat-icon.link-icon');
    expect(linkIcons.length).toBe(2);

    linkIcons.forEach(icon => {
      expect(icon.textContent?.trim()).toBe('open_in_new');
    });
  });
});
