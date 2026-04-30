import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorChipComponent } from './color-chip.component';

describe('ColorChipComponent', () => {
  let component: ColorChipComponent;
  let fixture: ComponentFixture<ColorChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display text', () => {
    fixture.componentRef.setInput('text', 'Test chip');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test chip');
  });

  it('should apply correct color class', () => {
    fixture.componentRef.setInput('color', 'yellow');
    fixture.detectChanges();

    const chipElement = fixture.nativeElement.querySelector('.color-chip');
    expect(chipElement.classList).toContain('color-chip-yellow');
  });

  it('should apply gray color class', () => {
    fixture.componentRef.setInput('color', 'gray');
    fixture.detectChanges();

    const chipElement = fixture.nativeElement.querySelector('.color-chip');
    expect(chipElement.classList).toContain('color-chip-gray');
  });

  it('should apply correct spacing class', () => {
    fixture.componentRef.setInput('spacing', 'large');
    fixture.detectChanges();

    const chipElement = fixture.nativeElement.querySelector('.color-chip');
    expect(chipElement.classList).toContain('color-chip-spacing-large');
  });

  it('should display icon when provided', () => {
    fixture.componentRef.setInput('icon', 'star');
    fixture.detectChanges();

    const iconElement =
      fixture.nativeElement.querySelector('mat-icon.chip-icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent.trim()).toBe('star');
  });

  it('should not display icon when not provided', () => {
    fixture.componentRef.setInput('icon', undefined);
    fixture.detectChanges();

    const iconElement =
      fixture.nativeElement.querySelector('mat-icon.chip-icon');
    expect(iconElement).toBeFalsy();
  });

  it('should display close button when showCloseButton is true', () => {
    fixture.componentRef.setInput('showCloseButton', true);
    fixture.detectChanges();

    const closeButton =
      fixture.nativeElement.querySelector('.chip-close-button');
    expect(closeButton).toBeTruthy();
  });

  it('should not display close button when showCloseButton is false', () => {
    fixture.componentRef.setInput('showCloseButton', false);
    fixture.detectChanges();

    const closeButton =
      fixture.nativeElement.querySelector('.chip-close-button');
    expect(closeButton).toBeFalsy();
  });

  it('should emit closeClick when close button is clicked', () => {
    jest.spyOn(component.closeClick, 'emit');
    fixture.componentRef.setInput('showCloseButton', true);
    fixture.detectChanges();

    const closeButton =
      fixture.nativeElement.querySelector('.chip-close-button');
    closeButton.click();

    expect(component.closeClick.emit).toHaveBeenCalled();
  });
});
