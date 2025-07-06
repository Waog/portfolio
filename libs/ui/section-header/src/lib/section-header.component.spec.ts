import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { SectionHeaderComponent } from './section-header.component';

describe('SectionHeaderComponent', () => {
  let component: SectionHeaderComponent;
  let fixture: ComponentFixture<SectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatIconModule, SectionHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'Test Header');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the text', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Test Header');
  });

  it('should not show star icon by default', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.star-icon')).toBeFalsy();
  });

  it('should show star icon when highlighted', () => {
    fixture.componentRef.setInput('highlight', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const icon = compiled.querySelector('.star-icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe('star');
  });

  it('should apply highlighted class when highlight is true', () => {
    fixture.componentRef.setInput('highlight', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.container').classList.contains('highlighted')
    ).toBeTruthy();
  });

  it('should not apply highlighted class when highlight is false', () => {
    fixture.componentRef.setInput('highlight', false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.container').classList.contains('highlighted')
    ).toBeFalsy();
  });
});
