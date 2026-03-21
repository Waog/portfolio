import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebMetadataComponent } from './web-metadata.component';

describe('WebMetadataComponent', () => {
  let component: WebMetadataComponent;
  let fixture: ComponentFixture<WebMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebMetadataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
