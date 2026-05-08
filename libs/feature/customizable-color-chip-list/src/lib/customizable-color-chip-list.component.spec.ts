import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorChipListComponent } from '@portfolio/color-chip-list';

import { CustomizableColorChipListComponent } from './customizable-color-chip-list.component';

describe('CustomizableColorChipListComponent', () => {
  let component: CustomizableColorChipListComponent;
  let fixture: ComponentFixture<CustomizableColorChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizableColorChipListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizableColorChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass default values 1:1 to wrapped color-chip-list', () => {
    const wrapped = fixture.debugElement.query(
      By.directive(ColorChipListComponent)
    ).componentInstance as ColorChipListComponent;

    expect(wrapped.greenItems()).toEqual([]);
    expect(wrapped.yellowItems()).toEqual([]);
    expect(wrapped.grayItems()).toEqual([]);
    expect(wrapped.spacing()).toBe('large');
    expect(wrapped.printMode()).toBe(false);
    expect(wrapped.rows()).toBe(1);
  });

  it('should pass all custom values 1:1 to wrapped color-chip-list', () => {
    fixture.componentRef.setInput('greenItems', ['Angular', 'Nx']);
    fixture.componentRef.setInput('yellowItems', ['TypeScript']);
    fixture.componentRef.setInput('grayItems', ['Legacy']);
    fixture.componentRef.setInput('spacing', 'small');
    fixture.componentRef.setInput('printMode', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    const wrapped = fixture.debugElement.query(
      By.directive(ColorChipListComponent)
    ).componentInstance as ColorChipListComponent;

    expect(wrapped.greenItems()).toEqual(['Angular', 'Nx']);
    expect(wrapped.yellowItems()).toEqual(['TypeScript']);
    expect(wrapped.grayItems()).toEqual(['Legacy']);
    expect(wrapped.spacing()).toBe('small');
    expect(wrapped.printMode()).toBe(true);
    expect(wrapped.rows()).toBe(2);
  });
});
