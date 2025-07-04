import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologyMatchingService } from '@portfolio/projects';

import { KeywordListComponent } from './keyword-list.component';

describe('KeywordListComponent', () => {
  let component: KeywordListComponent;
  let fixture: ComponentFixture<KeywordListComponent>;
  let mockTechnologyMatchingService: jest.Mocked<TechnologyMatchingService>;

  const mockKeywords = ['Angular', 'TypeScript'];

  beforeEach(async () => {
    const mockTechnologyMatchingServiceObj = {
      getBestMatchType: jest.fn(),
      getMatchType: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [KeywordListComponent],
      providers: [
        {
          provide: TechnologyMatchingService,
          useValue: mockTechnologyMatchingServiceObj,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KeywordListComponent);
    component = fixture.componentInstance;
    mockTechnologyMatchingService = TestBed.inject(
      TechnologyMatchingService
    ) as jest.Mocked<TechnologyMatchingService>;

    // Set the required input before detectChanges
    fixture.componentRef.setInput('keywords', mockKeywords);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('technologies getter', () => {
    it('should return keywords with match types', () => {
      // Mock the getBestMatchType method
      mockTechnologyMatchingService.getBestMatchType.mockImplementation(
        (keyword: string) => {
          switch (keyword) {
            case 'Angular':
              return 'full';
            case 'TypeScript':
              return 'indirect';
            default:
              return 'none';
          }
        }
      );

      const technologies = component.technologies;

      expect(technologies).toEqual([
        { name: 'Angular', matchType: 'full' },
        { name: 'TypeScript', matchType: 'indirect' },
      ]);
      expect(
        mockTechnologyMatchingService.getBestMatchType
      ).toHaveBeenCalledWith('Angular');
      expect(
        mockTechnologyMatchingService.getBestMatchType
      ).toHaveBeenCalledWith('TypeScript');
    });
  });

  describe('keyword categorization', () => {
    beforeEach(() => {
      // Mock the getBestMatchType method for each keyword
      mockTechnologyMatchingService.getBestMatchType.mockImplementation(
        (keyword: string) => {
          switch (keyword) {
            case 'Angular':
              return 'full';
            case 'TypeScript':
              return 'indirect';
            default:
              return 'none';
          }
        }
      );
    });

    describe('greenTechnologies', () => {
      it('should return keywords with full match', () => {
        const greenKeywords = component.greenTechnologies;
        expect(greenKeywords).toEqual(['Angular']);
      });
    });

    describe('yellowTechnologies', () => {
      it('should return keywords with indirect match', () => {
        const yellowKeywords = component.yellowTechnologies;
        expect(yellowKeywords).toEqual(['TypeScript']);
      });
    });

    describe('grayTechnologies', () => {
      it('should return keywords with no match', () => {
        // Update the mock to return 'none' for both keywords
        mockTechnologyMatchingService.getBestMatchType.mockReturnValue('none');

        const grayKeywords = component.grayTechnologies;
        expect(grayKeywords).toEqual(['Angular', 'TypeScript']);
      });
    });
  });
});
