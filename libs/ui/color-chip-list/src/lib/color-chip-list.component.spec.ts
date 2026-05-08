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

  describe('allItems', () => {
    it('should combine all items with correct colors and icons', () => {
      fixture.componentRef.setInput('greenItems', ['React', 'Angular']);
      fixture.componentRef.setInput('yellowItems', ['TypeScript']);
      fixture.componentRef.setInput('grayItems', ['CSS']);
      fixture.detectChanges();

      const allItems = component.allItems();

      expect(allItems).toHaveLength(4);
      expect(allItems[0]).toEqual({
        text: 'React',
        color: 'green',
        icon: 'star',
      });
      expect(allItems[1]).toEqual({
        text: 'Angular',
        color: 'green',
        icon: 'star',
      });
      expect(allItems[2]).toEqual({
        text: 'TypeScript',
        color: 'yellow',
        icon: 'star_border',
      });
      expect(allItems[3]).toEqual({ text: 'CSS', color: 'gray' });
    });
  });

  describe('rows input', () => {
    it('should default to 1', () => {
      expect(component.rows()).toBe(1);
    });

    it('should accept a custom row count', () => {
      fixture.componentRef.setInput('rows', 2);
      fixture.detectChanges();
      expect(component.rows()).toBe(2);
    });
  });

  describe('hiddenItemsCount', () => {
    it('should return 0 when no bounding-box overflows have been detected', () => {
      fixture.componentRef.setInput('greenItems', ['React', 'Angular']);
      fixture.detectChanges();

      // In JSDOM all getBoundingClientRect values are 0, so no chip appears
      // outside the container and hiddenItemsCount stays at 0.
      expect(component.hiddenItemsCount()).toBe(0);
    });
  });

  describe('toggleCollapsed', () => {
    it('should toggle expanded state', () => {
      expect(component.expanded()).toBe(false);
      component.toggleCollapsed();
      expect(component.expanded()).toBe(true);
      component.toggleCollapsed();
      expect(component.expanded()).toBe(false);
    });
  });

  describe('isItemHidden', () => {
    it('should always return false when expanded is true', () => {
      component.expanded.set(true);
      expect(component.isItemHidden(0)).toBe(false);
      expect(component.isItemHidden(99)).toBe(false);
    });

    it('should return false for all indices when no overflow is detected', () => {
      fixture.componentRef.setInput('greenItems', ['React', 'Angular']);
      fixture.detectChanges();
      component.expanded.set(false);

      expect(component.isItemHidden(0)).toBe(false);
      expect(component.isItemHidden(1)).toBe(false);
    });
  });
});
