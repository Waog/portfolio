import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationComponent } from './personal-information.component';

describe('PersonalInformationComponent', () => {
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate current age correctly', () => {
    const age = component.currentAge;
    expect(age).toBeGreaterThan(0);
    expect(age).toBeLessThan(150); // reasonable age range
  });

  it('should render personal information content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('lib-sub-section')).toBeTruthy();
    expect(compiled.textContent).toContain('Personal Information');
    expect(compiled.textContent).toContain('Born');
    expect(compiled.textContent).toContain('1984');
    expect(compiled.textContent).toContain('Languages');
  });

  it('should render language chips', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const languageChips = compiled.querySelectorAll('lib-color-chip');
    expect(languageChips.length).toBe(3);
  });
});
