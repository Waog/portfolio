import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeywordListComponent } from './keyword-list.component';

describe('KeywordListComponent', () => {
  let component: KeywordListComponent;
  let fixture: ComponentFixture<KeywordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeywordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
