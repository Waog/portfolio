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
      component.greenItems = ['React', 'Angular'];
      component.yellowItems = ['TypeScript'];
      component.grayItems = ['CSS'];

      const allItems = component.allItems;

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

  describe('visibleItems', () => {
    beforeEach(() => {
      component.greenItems = ['React', 'Angular'];
      component.yellowItems = ['TypeScript', 'JavaScript', 'Node.js'];
      component.grayItems = ['CSS', 'HTML', 'SCSS', 'Bootstrap', 'Tailwind'];
    });

    it('should show all green items first', () => {
      const visibleItems = component.visibleItems;
      const greenItems = visibleItems.filter(item => item.color === 'green');
      expect(greenItems).toHaveLength(2);
      expect(greenItems[0].text).toBe('React');
      expect(greenItems[1].text).toBe('Angular');
    });

    it('should limit to 10 items when collapsed', () => {
      component.showAllItems = false;
      const visibleItems = component.visibleItems;
      expect(visibleItems.length).toBeLessThanOrEqual(10);
    });

    it('should show minimum 6 items when possible', () => {
      component.greenItems = ['React'];
      component.yellowItems = ['TypeScript'];
      component.grayItems = ['CSS', 'HTML', 'SCSS', 'Bootstrap'];

      component.showAllItems = false;
      const visibleItems = component.visibleItems;
      expect(visibleItems.length).toBeGreaterThanOrEqual(6);
    });

    it('should show all items when expanded', () => {
      component.showAllItems = true;
      const visibleItems = component.visibleItems;
      expect(visibleItems).toHaveLength(component.allItems.length);
    });
  });

  describe('hiddenItemsCount', () => {
    it('should calculate correct hidden items count', () => {
      component.greenItems = ['React', 'Angular'];
      component.yellowItems = ['TypeScript', 'JavaScript', 'Node.js'];
      component.grayItems = ['CSS', 'HTML', 'SCSS', 'Bootstrap', 'Tailwind'];
      component.showAllItems = false;

      const hiddenCount = component.hiddenItemsCount;
      expect(hiddenCount).toBe(
        component.allItems.length - component.visibleItems.length
      );
    });
  });

  describe('toggleItems', () => {
    it('should toggle showAllItems', () => {
      expect(component.showAllItems).toBe(false);
      component.toggleItems();
      expect(component.showAllItems).toBe(true);
      component.toggleItems();
      expect(component.showAllItems).toBe(false);
    });
  });
});
