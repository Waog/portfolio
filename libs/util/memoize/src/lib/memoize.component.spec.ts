import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizeComponent } from './memoize.component';

describe('MemoizeComponent', () => {
  let component: MemoizeComponent;
  let fixture: ComponentFixture<MemoizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
