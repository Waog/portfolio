import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ContactSectionComponent } from './contact-section.component';

describe('ContactSectionComponent', () => {
  let component: ContactSectionComponent;
  let fixture: ComponentFixture<ContactSectionComponent>;
  let mockSnackBar: jest.Mocked<MatSnackBar>;

  beforeEach(async () => {
    const snackBarSpy = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatSnackBar>;

    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent, NoopAnimationsModule],
      providers: [{ provide: MatSnackBar, useValue: snackBarSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSectionComponent);
    component = fixture.componentInstance;
    mockSnackBar = TestBed.inject(MatSnackBar) as jest.Mocked<MatSnackBar>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render contact section with title', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('mat-card-title');
    expect(title?.textContent?.trim()).toContain('Contact Me');
  });

  it('should render email contact info', () => {
    const compiled = fixture.nativeElement;
    const emailLink = compiled.querySelector(
      'a[href="mailto:oliver.stadie+it@gmail.com"]'
    );
    expect(emailLink).toBeTruthy();
    expect(emailLink?.textContent?.trim()).toContain(
      'oliver.stadie+it@gmail.com'
    );
  });

  it('should render phone contact info', () => {
    const compiled = fixture.nativeElement;
    const phoneLink = compiled.querySelector('a[href="tel:+4915202825986"]');
    expect(phoneLink).toBeTruthy();
    expect(phoneLink?.textContent?.trim()).toContain('+49 (1520) 28 25 986');
  });

  it('should render copy buttons', () => {
    const compiled = fixture.nativeElement;
    const copyButtons = compiled.querySelectorAll('button[matTooltip*="Copy"]');
    expect(copyButtons.length).toBe(2);
  });

  describe('copyToClipboard', () => {
    beforeEach(() => {
      // Mock navigator.clipboard
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: jest.fn().mockResolvedValue(undefined),
        },
        writable: true,
      });
    });

    it('should copy text to clipboard and show success message', async () => {
      const testText = 'test@example.com';

      await component.copyToClipboard(testText);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Copied to clipboard!',
        '',
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    });

    it('should use fallback method when clipboard API fails', async () => {
      // Mock clipboard API to fail
      (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(
        new Error('API not supported')
      );

      // Mock document methods
      const mockTextArea = {
        value: '',
        select: jest.fn(),
        style: {},
      } as unknown as HTMLTextAreaElement;
      jest.spyOn(document, 'createElement').mockReturnValue(mockTextArea);
      jest.spyOn(document.body, 'appendChild').mockImplementation();
      jest.spyOn(document.body, 'removeChild').mockImplementation();

      // Mock execCommand on document prototype
      Object.defineProperty(document, 'execCommand', {
        value: jest.fn().mockReturnValue(true),
        writable: true,
      });

      const testText = 'fallback@example.com';
      await component.copyToClipboard(testText);

      expect(document.createElement).toHaveBeenCalledWith('textarea');
      expect(mockTextArea.value).toBe(testText);
      expect(mockTextArea.select).toHaveBeenCalled();
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Copied to clipboard!',
        '',
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    });
  });
});
