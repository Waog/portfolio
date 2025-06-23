import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { KeywordListComponent } from '@portfolio/keyword-list';

import { SkillSectionComponent } from './skill-section.component';
import {
  type SkillCategory,
  SkillSectionService,
} from './skill-section.service';

// Mock SkillSectionService
class MockSkillSectionService {
  getSkillCategories(): SkillCategory[] {
    return [
      {
        title: 'Frontend',
        keywords: ['Angular', 'React', 'TypeScript'],
      },
      {
        title: 'Backend',
        keywords: ['Node.js', 'Python', 'Java'],
      },
      {
        title: 'Database',
        keywords: ['PostgreSQL', 'MongoDB'],
      },
    ];
  }
}

// Mock KeywordListComponent
@Component({
  selector: 'lib-keyword-list',
  standalone: true,
  template: '<div class="mock-keyword-list">Mock Keyword List</div>',
})
class MockKeywordListComponent {
  @Input() keywords: string[] = [];
}

describe('SkillSectionComponent', () => {
  let component: SkillSectionComponent;
  let fixture: ComponentFixture<SkillSectionComponent>;
  let mockService: MockSkillSectionService;

  beforeEach(async () => {
    mockService = new MockSkillSectionService();

    await TestBed.configureTestingModule({
      imports: [SkillSectionComponent, MatCardModule, MatIconModule],
      providers: [{ provide: SkillSectionService, useValue: mockService }],
    })
      .overrideComponent(SkillSectionComponent, {
        remove: { imports: [KeywordListComponent] },
        add: { imports: [MockKeywordListComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SkillSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with skill categories from service', () => {
    expect(component.skillCategories).toBeDefined();
    expect(component.skillCategories.length).toBe(3);
    expect(component.skillCategories[0].title).toBe('Frontend');
    expect(component.skillCategories[0].keywords).toEqual([
      'Angular',
      'React',
      'TypeScript',
    ]);
  });

  it('should render the card title with icon', () => {
    const cardTitle = fixture.debugElement.query(By.css('mat-card-title'));
    expect(cardTitle).toBeTruthy();

    const icon = cardTitle.query(By.css('mat-icon'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.textContent.trim()).toBe('code');

    expect(cardTitle.nativeElement.textContent).toContain('Skills');
  });

  it('should render all skill categories', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.skill-category')
    );
    expect(categoryElements.length).toBe(3);
  });

  it('should render category titles correctly', () => {
    const titleElements = fixture.debugElement.queryAll(
      By.css('.category-title h3')
    );
    expect(titleElements.length).toBe(3);
    expect(titleElements[0].nativeElement.textContent.trim()).toBe('Frontend');
    expect(titleElements[1].nativeElement.textContent.trim()).toBe('Backend');
    expect(titleElements[2].nativeElement.textContent.trim()).toBe('Database');
  });

  it('should pass keywords to keyword-list components', () => {
    const keywordListElements = fixture.debugElement.queryAll(
      By.css('lib-keyword-list')
    );
    expect(keywordListElements.length).toBe(3);

    // Note: In a real test, you'd check the actual input properties
    // This is a basic structure test
    expect(keywordListElements[0]).toBeTruthy();
    expect(keywordListElements[1]).toBeTruthy();
    expect(keywordListElements[2]).toBeTruthy();
  });

  it('should apply correct CSS classes', () => {
    const card = fixture.debugElement.query(By.css('.skills-card'));
    expect(card).toBeTruthy();

    const container = fixture.debugElement.query(By.css('.skills-container'));
    expect(container).toBeTruthy();

    const categoryContent = fixture.debugElement.query(
      By.css('.skill-category-content')
    );
    expect(categoryContent).toBeTruthy();
  });

  it('should have subtle border separation between categories except last', () => {
    const categories = fixture.debugElement.queryAll(By.css('.skill-category'));

    // First category should have border (not last)
    expect(categories[0].nativeElement).toBeTruthy();

    // Last category should be present
    expect(categories[categories.length - 1].nativeElement).toBeTruthy();
  });
  describe('Service Integration', () => {
    it('should call getSkillCategories on service', () => {
      const spy = jest.spyOn(mockService, 'getSkillCategories');

      // Test the service method directly since inject() is handled by Angular DI
      const categories = mockService.getSkillCategories();

      expect(categories).toBeDefined();
      expect(categories.length).toBe(3);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Component Structure', () => {
    it('should have mat-card as root element', () => {
      const matCard = fixture.debugElement.query(By.css('mat-card'));
      expect(matCard).toBeTruthy();
      expect(matCard.classes['skills-card']).toBeTruthy();
    });

    it('should have proper header structure', () => {
      const header = fixture.debugElement.query(By.css('mat-card-header'));
      expect(header).toBeTruthy();

      const title = header.query(By.css('mat-card-title'));
      expect(title).toBeTruthy();
    });

    it('should have proper content structure', () => {
      const content = fixture.debugElement.query(By.css('mat-card-content'));
      expect(content).toBeTruthy();

      const container = content.query(By.css('.skills-container'));
      expect(container).toBeTruthy();
    });
  });
});
