import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ColorChipComponent } from '@portfolio/color-chip';

import { SubSectionComponent } from '../sub-section/sub-section.component';

@Component({
  selector: 'lib-personal-information',
  imports: [MatIconModule, ColorChipComponent, SubSectionComponent],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInformationComponent {
  readonly currentAge: number = this.calculateAge();

  private calculateAge(): number {
    const today = new Date();
    const birthDate = new Date(1984, 10, 14); // Month is 0-indexed, so 10 = November
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
