import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SearchTagService } from '@portfolio/search-tags';
import { of } from 'rxjs';

import { TagInputComponent } from './tag-input.component';

describe('TagInputComponent', () => {
  let component: TagInputComponent;
  let fixture: ComponentFixture<TagInputComponent>;
  let mockSearchTagService: Partial<SearchTagService> & {
    currentTags: string[];
  };
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockSearchTagService = {
      currentTags: [],
      addTag: jest.fn(),
      removeTag: jest.fn(),
      clearAllTags: jest.fn(),
      hasTag: jest.fn(),
      tags$: of([]),
    };

    mockRouter = {
      navigate: jest.fn(),
      parseUrl: jest.fn(),
      url: '/',
    };

    await TestBed.configureTestingModule({
      imports: [TagInputComponent],
      providers: [
        { provide: SearchTagService, useValue: mockSearchTagService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TagInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service addTag when addTag is called', () => {
    component.currentInput = 'test-tag';

    component.addTag();

    expect(mockSearchTagService.addTag).toHaveBeenCalledWith('test-tag');
    expect(component.currentInput).toBe('');
  });

  it('should not call service addTag when input is empty', () => {
    component.currentInput = '';

    component.addTag();

    expect(mockSearchTagService.addTag).not.toHaveBeenCalled();
  });

  it('should not call service addTag when input is only whitespace', () => {
    component.currentInput = '   ';

    component.addTag();

    expect(mockSearchTagService.addTag).not.toHaveBeenCalled();
  });

  it('should call service removeTag when removeTag is called', () => {
    component.removeTag('tag1');

    expect(mockSearchTagService.removeTag).toHaveBeenCalledWith('tag1');
  });

  it('should add tag on Enter key press', () => {
    component.currentInput = 'test-tag';
    const addTagSpy = jest.spyOn(component, 'addTag');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    jest.spyOn(event, 'preventDefault');

    component.onKeyDown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(addTagSpy).toHaveBeenCalled();
  });

  it('should not prevent default for non-Enter keys', () => {
    const event = new KeyboardEvent('keydown', { key: 'a' });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    component.onKeyDown(event);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should update tags when service emits new tags', async () => {
    const newTags = ['Angular', 'TypeScript'];

    // Create a new mock service with different tags
    const mockServiceWithTags = {
      currentTags: [],
      addTag: jest.fn(),
      removeTag: jest.fn(),
      clearAllTags: jest.fn(),
      hasTag: jest.fn(),
      tags$: of(newTags),
    };

    // Configure a new TestBed instance for this test
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [TagInputComponent],
      providers: [
        { provide: SearchTagService, useValue: mockServiceWithTags },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    // Create a new component instance with the new service
    const newFixture = TestBed.createComponent(TagInputComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.tags).toEqual(newTags);
  });
});
