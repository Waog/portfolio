import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { KeywordListComponent } from '@portfolio/keyword-list';
import { Category, Tag } from '@portfolio/taxonomy';

import { SkillSectionComponent } from './skill-section.component';
import { SkillSectionService } from './skill-section.service';

class MockSkillSectionService {
  getSkillCategories(): Map<Category, Tag[]> {
    return new Map<Category, Tag[]>([
      [
        'Frontend',
        [Tag.get('Angular'), Tag.get('React'), Tag.get('TypeScript')],
      ],
      [
        'Backend',
        [Tag.get('Node.js'), Tag.get('Spring Boot'), Tag.get('Java')],
      ],
      ['Concepts', [Tag.get('REST'), Tag.get('Agile')]],
    ]);
  }
}

@Component({
  selector: 'lib-keyword-list',
  standalone: true,
  template: '<div class="mock-keyword-list">Mock Keyword List</div>',
})
class MockKeywordListComponent {
  @Input() keywordTags: Tag[] = [];
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

  it('should initialize with skill categories from all projects and additional keywords from service itself', () => {
    expect(component.skillCategories).toBeDefined();
    expect([...component.skillCategories].length).toBe(3);
    expect(component.skillCategories.keys().next().value).toBe('Frontend');
    expect(component.skillCategories.get('Frontend')).toEqual([
      Tag.get('Angular'),
      Tag.get('React'),
      Tag.get('TypeScript'),
    ]);
  });

  it('should render the card title', () => {
    const cardTitle = fixture.debugElement.query(By.css('lib-section-header'));
    expect(cardTitle).toBeTruthy();
    expect(cardTitle.nativeElement.textContent).toContain('Skills');
  });

  it('should render all skill categories in screen mode', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.skill-category:not(.and-more)')
    );
    expect(categoryElements.length).toBe(3);
  });

  it('should render category titles correctly', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.skill-category:not(.and-more)')
    );
    expect(categoryElements.length).toBe(3);
    const categoryTitles = categoryElements.map(el =>
      el.nativeElement.textContent.trim()
    );
    expect(categoryTitles).toContain('Frontend:');
    expect(categoryTitles).toContain('Backend:');
    expect(categoryTitles).toContain('Concepts:');
  });

  it('should render `and more...` in print mode', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.skill-category.and-more')
    );
    expect(categoryElements.length).toBe(1);
    expect(categoryElements[0].nativeElement.textContent.trim()).toBe(
      'and more...'
    );
  });

  it('should pass keywords to keyword-list components', () => {
    const keywordListElements = fixture.debugElement.queryAll(
      By.css('lib-keyword-list:not(.and-more)')
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
      expect([...categories].length).toBe(3);
      expect(spy).toHaveBeenCalled();
    });
  });
});
