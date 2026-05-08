import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorChipListComponent } from '@portfolio/color-chip-list';
import { CustomizationStateService } from '@portfolio/customization-state';

import { CustomizableColorChipListComponent } from './customizable-color-chip-list.component';

describe('CustomizableColorChipListComponent', () => {
  let component: CustomizableColorChipListComponent;
  let fixture: ComponentFixture<CustomizableColorChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizableColorChipListComponent],
      providers: [
        {
          provide: CustomizationStateService,
          useValue: {
            isPanelShown: signal(true),
          },
        },
      ],
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

  it('should override initial spacing and rows values through panel actions', () => {
    fixture.componentRef.setInput('spacing', 'large');
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();

    clickSpacingButton('small');
    fixture.detectChanges();

    getRowsActionButton('increase').nativeElement.click();
    fixture.detectChanges();

    const wrapped = fixture.debugElement.query(
      By.directive(ColorChipListComponent)
    ).componentInstance as ColorChipListComponent;

    expect(wrapped.spacing()).toBe('small');
    expect(wrapped.rows()).toBe(3);
  });

  it('should not decrease rows below 1 through panel actions', () => {
    fixture.componentRef.setInput('rows', 1);
    fixture.detectChanges();

    getRowsActionButton('decrease').nativeElement.click();
    fixture.detectChanges();

    const wrapped = fixture.debugElement.query(
      By.directive(ColorChipListComponent)
    ).componentInstance as ColorChipListComponent;

    expect(wrapped.rows()).toBe(1);
  });

  it('should display the effective rows count between the rows buttons', () => {
    fixture.componentRef.setInput('rows', 4);
    fixture.detectChanges();

    expect(getRowsValue().nativeElement.textContent.trim()).toBe('4');

    getRowsActionButton('decrease').nativeElement.click();
    fixture.detectChanges();

    expect(getRowsValue().nativeElement.textContent.trim()).toBe('3');
  });

  function getSpacingButton(spacing: 'small' | 'medium' | 'large') {
    return fixture.debugElement.query(
      By.css(`mat-button-toggle[data-spacing="${spacing}"]`)
    );
  }

  function clickSpacingButton(spacing: 'small' | 'medium' | 'large') {
    const toggleButtonElement = getSpacingButton(
      spacing
    ).nativeElement.querySelector('button') as HTMLButtonElement;
    toggleButtonElement.click();
  }

  function getRowsActionButton(action: 'increase' | 'decrease') {
    return fixture.debugElement.query(
      By.css(`button[data-rows-action="${action}"]`)
    );
  }

  function getRowsValue() {
    return fixture.debugElement.query(By.css('.rows-value'));
  }
});
