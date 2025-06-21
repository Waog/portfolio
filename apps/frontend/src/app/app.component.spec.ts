import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@portfolio/footer';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FooterComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });
  it('should render main content structure', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-container')).toBeTruthy();
    expect(compiled.querySelector('.main-content')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });
});
