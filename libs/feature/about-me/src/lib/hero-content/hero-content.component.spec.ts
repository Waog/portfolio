import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HeroContentComponent } from './hero-content.component';

describe('HeroContentComponent', () => {
  let component: HeroContentComponent;
  let fixture: ComponentFixture<HeroContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroContentComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
