import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalFocusComponent } from './professional-focus.component';

describe('ProfessionalFocusComponent', () => {
  let component: ProfessionalFocusComponent;
  let fixture: ComponentFixture<ProfessionalFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalFocusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render professional focus content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('lib-sub-section')).toBeTruthy();
    expect(compiled.textContent).toContain('Professional Focus');
    expect(compiled.textContent).toContain(
      'Experienced in planning, designing, implementing'
    );
    expect(compiled.textContent).toContain('web applications');
    expect(compiled.textContent).toContain('technology stacks');
  });

  it('should render professional text with proper styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const professionalText = compiled.querySelector('.professional-text');
    expect(professionalText).toBeTruthy();
    expect(professionalText?.tagName.toLowerCase()).toBe('p');
  });

  it('should reference portfolio', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('See portfolio above');
    expect(compiled.textContent).toContain('detailed project information');
    expect(compiled.textContent).toContain('technical expertise');
  });

  it('should have work icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const workIcon = compiled.querySelector('mat-icon[slot="icon"]');
    expect(workIcon).toBeTruthy();
    expect(workIcon?.textContent?.trim()).toBe('work');
  });
});
