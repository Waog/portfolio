import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TagInputComponent } from './tag-input.component';

describe('TagInputComponent', () => {
  let component: TagInputComponent;
  let fixture: ComponentFixture<TagInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagInputComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TagInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a tag when addTag is called', () => {
    component.currentInput = 'test-tag';
    const emitSpy = jest.spyOn(component.tagsChange, 'emit');

    component.addTag();

    expect(emitSpy).toHaveBeenCalledWith(['test-tag']);
    expect(component.currentInput).toBe('');
  });

  it('should not add duplicate tags', () => {
    fixture.componentRef.setInput('tags', ['existing-tag']);
    component.currentInput = 'existing-tag';
    const emitSpy = jest.spyOn(component.tagsChange, 'emit');

    component.addTag();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should remove a tag when removeTag is called', () => {
    fixture.componentRef.setInput('tags', ['tag1', 'tag2']);
    const emitSpy = jest.spyOn(component.tagsChange, 'emit');

    component.removeTag('tag1');

    expect(emitSpy).toHaveBeenCalledWith(['tag2']);
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
});
