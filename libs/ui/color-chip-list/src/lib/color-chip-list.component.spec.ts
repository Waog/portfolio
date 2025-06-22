import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorChipListComponent } from './color-chip-list.component';

describe('ColorChipListComponent', () => {
  let component: ColorChipListComponent;
  let fixture: ComponentFixture<ColorChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorChipListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
