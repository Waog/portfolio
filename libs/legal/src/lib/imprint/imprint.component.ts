import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'lib-imprint',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Imprint / Impressum</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <h3>Company Information</h3>
        <p>
          Oliver Stadie IT GmbH<br />
          Memhardstr. 7<br />
          10178 Berlin<br />
          Germany
        </p>

        <h3>Managing Director</h3>
        <p>Oliver Stadie</p>

        <h3>Contact</h3>
        <p>
          Email: info&#64;oliver-stadie.de<br />
          Phone: +49 (0) 30 123456789
        </p>

        <h3>VAT ID</h3>
        <p>DE123456789</p>

        <h3>Register Entry</h3>
        <p>
          Commercial Register: Amtsgericht Berlin-Charlottenburg<br />
          Register Number: HRB 123456 B
        </p>

        <h3>Responsible for Content</h3>
        <p>
          Oliver Stadie<br />
          Address as above
        </p>

        <h3>Disclaimer</h3>
        <p>
          Despite careful content control, we assume no liability for the
          content of external links. The operators of the linked pages are
          solely responsible for their content.
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        max-width: 800px;
        margin: 20px auto;
      }

      h3 {
        margin-top: 20px;
        margin-bottom: 10px;
        color: #1976d2;
      }

      p {
        margin-bottom: 10px;
        line-height: 1.5;
      }
    `,
  ],
})
export class ImprintComponent {}
