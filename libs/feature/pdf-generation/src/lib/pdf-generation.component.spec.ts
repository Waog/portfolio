import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfGenerationComponent } from './pdf-generation.component';

describe('PdfGenerationComponent', () => {
  let component: PdfGenerationComponent;
  let fixture: ComponentFixture<PdfGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfGenerationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PdfGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
