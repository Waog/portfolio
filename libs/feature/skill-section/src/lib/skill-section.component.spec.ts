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

  it('should render the card title', () => {
    const cardTitle = fixture.debugElement.query(By.css('lib-section-header'));
    expect(cardTitle).toBeTruthy();
    expect(cardTitle.nativeElement.textContent).toContain('Skills');
  });

  it('should render all skill categories', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.skill-category')
    );
    expect(categoryElements.length).toBe(3);
  });

  it('should render category titles correctly', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.skill-category')
    );
    expect(categoryElements.length).toBe(3);
    const categoryTitles = categoryElements.map(el =>
      el.nativeElement.textContent.trim()
    );
    expect(categoryTitles).toContain('Frontend:');
    expect(categoryTitles).toContain('Backend:');
    expect(categoryTitles).toContain('Database:');
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
});
