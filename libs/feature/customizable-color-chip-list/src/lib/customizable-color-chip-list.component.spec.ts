import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
