import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationComponent } from './education.component';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render education content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('lib-sub-section')).toBeTruthy();
    expect(compiled.textContent).toContain('Education');
    expect(compiled.textContent).toContain('Diplom Degree in Computer Science');
    expect(compiled.textContent).toContain('Humboldt Universität zu Berlin');
    expect(compiled.textContent).toContain('2006 - 2015');
  });

  it('should render grade information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Grade: Very Good');
    expect(compiled.textContent).toContain(
      'Subsidiary Field: Engineering Science'
    );
    expect(compiled.querySelector('.grade-highlight')).toBeTruthy();
    expect(compiled.querySelector('.grade-icon')).toBeTruthy();
  });

  it('should render external link to certificate', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a.external-link') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.href).toContain('/assets/oliver-stadie-diplom-certificate.pdf');
    expect(link.target).toBe('_blank');
    expect(link.rel).toBe('noopener');
  });

  it('should render link icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const linkIcon = compiled.querySelector('mat-icon.link-icon');
    expect(linkIcon).toBeTruthy();
    expect(linkIcon?.textContent?.trim()).toBe('open_in_new');
  });

  it('should have education-card class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subSection = compiled.querySelector('lib-sub-section');
    expect(subSection).toBeTruthy();
    expect(subSection?.classList.contains('education-card')).toBeTruthy();
  });
});
