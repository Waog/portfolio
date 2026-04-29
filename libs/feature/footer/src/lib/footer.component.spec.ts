import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { CustomizationStateService } from '@portfolio/customization-state';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let customizationStateService: CustomizationStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    customizationStateService = TestBed.inject(CustomizationStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a show customization label when the panel is hidden', () => {
    expect(getPanelToggleButton().nativeElement.textContent.trim()).toBe(
      'show customization'
    );
  });

  it('shows a hide customization label when the panel is visible', () => {
    customizationStateService.setPanelShown(true);
    fixture.detectChanges();

    expect(getPanelToggleButton().nativeElement.textContent.trim()).toBe(
      'hide customization'
    );
  });

  it('toggles the customization panel state when clicked', () => {
    getPanelToggleButton().nativeElement.click();
    fixture.detectChanges();

    expect(customizationStateService.isPanelShown()).toBe(true);
    expect(getPanelToggleButton().nativeElement.textContent.trim()).toBe(
      'hide customization'
    );
  });

  function getPanelToggleButton() {
    return fixture.debugElement.query(By.css('.footer-link-subtle'));
  }
});
