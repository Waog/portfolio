import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all main sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check hero content
    expect(compiled.querySelector('lib-hero-content')).toBeTruthy();

    // Check extracted components
    expect(compiled.querySelector('lib-personal-information')).toBeTruthy();
    expect(compiled.querySelector('lib-community-writing')).toBeTruthy();

    // Check remaining sections
    expect(compiled.textContent).toContain('Education');
    expect(compiled.textContent).toContain('Professional Focus');
  });

  it('should have proper grid layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content-grid')).toBeTruthy();
    expect(compiled.querySelector('.left-column')).toBeTruthy();
    expect(compiled.querySelector('.right-column')).toBeTruthy();
  });
});
