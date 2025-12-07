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
      component.ngOnChanges({
        greenItems: {} as any,
        yellowItems: {} as any,
        grayItems: {} as any,
      });

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
      component.ngOnChanges({
        greenItems: {} as any,
        yellowItems: {} as any,
        grayItems: {} as any,
      });
    });

    it('should show green items first', () => {
      const visibleItems = component.visibleItems;
      expect(visibleItems[0].text).toBe('React');
      expect(visibleItems[1].text).toBe('Angular');
    });

    it('should show all items when expanded', () => {
      component.toggleItems(); // This will set showAllItems to true and update cached properties
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
      component.ngOnChanges({
        greenItems: {} as any,
        yellowItems: {} as any,
        grayItems: {} as any,
      });

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
