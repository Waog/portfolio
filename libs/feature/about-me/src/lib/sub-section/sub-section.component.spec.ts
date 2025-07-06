import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSectionComponent } from './sub-section.component';

describe('SubSectionComponent', () => {
  let component: SubSectionComponent;
  let fixture: ComponentFixture<SubSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render projected content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy();
    expect(compiled.querySelector('mat-card-header')).toBeTruthy();
    expect(compiled.querySelector('mat-card-content')).toBeTruthy();
  });
});
