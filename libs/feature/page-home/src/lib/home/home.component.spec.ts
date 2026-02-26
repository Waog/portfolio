import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the web worker result via ProofOfConceptWorkerService', () => {
    const el: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="worker-result"]'
    );
    // In Jest, Worker is unavailable so the sync fallback runs:
    // transform('hello') === { result: 'hello' }
    expect(el.textContent?.replace(/\s+/g, '')).toBe('{"result":"hello"}');
  });
});
