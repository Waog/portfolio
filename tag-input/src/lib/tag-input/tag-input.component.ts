import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-tag-input',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './tag-input.component.html',
  styleUrl: './tag-input.component.scss',
})
export class TagInputComponent {
  placeholder = input<string>('Add search term, e.g. "Angular"');
  tags = input<string[]>([]);
  tagsChange = output<string[]>();

  currentInput = '';

  addTag(): void {
    const trimmedInput = this.currentInput.trim();
    if (trimmedInput && !this.tags().includes(trimmedInput)) {
      const updatedTags = [...this.tags(), trimmedInput];
      this.tagsChange.emit(updatedTags);
      this.currentInput = '';
    }
  }

  removeTag(tagToRemove: string): void {
    const updatedTags = this.tags().filter(tag => tag !== tagToRemove);
    this.tagsChange.emit(updatedTags);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag();
    }
  }
}
