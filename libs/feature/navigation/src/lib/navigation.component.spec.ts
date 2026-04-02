import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import { of } from 'rxjs';

jest.mock('@portfolio/search-engine-angular', () => ({
  SearchEngineService: class {
    searchResult$ = of({
      loading: false,
      ngService: { loading: false, progressPercent: 0 },
    });
  },
}));

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [provideRouter([]), SearchEngineService],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
