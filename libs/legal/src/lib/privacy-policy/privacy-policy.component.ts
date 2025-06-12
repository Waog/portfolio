import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'lib-privacy-policy',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Privacy Policy / Datenschutzerklärung</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <h3>1. Data Protection at a Glance</h3>
        <h4>General Information</h4>
        <p>
          The following information provides a simple overview of what happens
          to your personal data when you visit this website. Personal data is
          any data that can personally identify you.
        </p>

        <h4>Data Collection on This Website</h4>
        <p>
          <strong
            >Who is responsible for data collection on this website?</strong
          ><br />
          Data processing on this website is carried out by the website
          operator. Contact details can be found in the imprint of this website.
        </p>

        <h3>2. Hosting</h3>
        <p>
          This website is hosted externally. The personal data collected on this
          website is stored on the servers of the hosting provider. This may
          include IP addresses, contact requests, meta and communication data,
          contract data, contact details, names, website accesses, and other
          data generated via a website.
        </p>

        <h3>3. General Information and Mandatory Information</h3>
        <h4>Data Protection</h4>
        <p>
          The operators of these pages take the protection of your personal data
          very seriously. We treat your personal data confidentially and in
          accordance with the statutory data protection regulations and this
          privacy policy.
        </p>

        <h4>Information about the Responsible Party</h4>
        <p>
          The responsible party for data processing on this website is:<br /><br />
          Oliver Stadie IT GmbH<br />
          Memhardstr. 7<br />
          10178 Berlin<br />
          Germany<br /><br />
          Phone: +49 (0) 30 123456789<br />
          Email: info&#64;oliver-stadie.de
        </p>

        <h3>4. Data Collection on This Website</h3>
        <h4>Cookies</h4>
        <p>
          Our website uses cookies. Cookies are small text files that are stored
          on your device and do no harm. They are used either temporarily for
          the duration of a session (session cookies) or permanently (permanent
          cookies).
        </p>

        <h4>Server Log Files</h4>
        <p>
          The provider of the pages automatically collects and stores
          information in so-called server log files, which your browser
          automatically transmits to us. These are:
        </p>
        <ul>
          <li>Browser type and browser version</li>
          <li>Operating system used</li>
          <li>Referrer URL</li>
          <li>Host name of the accessing computer</li>
          <li>Time of the server request</li>
          <li>IP address</li>
        </ul>

        <h3>5. Your Rights</h3>
        <p>
          You have the right at any time to receive information free of charge
          about the origin, recipient and purpose of your stored personal data.
          You also have the right to request the correction or deletion of this
          data.
        </p>

        <h3>6. Contact</h3>
        <p>
          If you have questions about data protection, please contact us at:
          privacy&#64;oliver-stadie.de
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
        margin-top: 25px;
        margin-bottom: 15px;
        color: #1976d2;
      }

      h4 {
        margin-top: 20px;
        margin-bottom: 10px;
        color: #666;
      }

      p,
      li {
        margin-bottom: 10px;
        line-height: 1.6;
      }

      ul {
        margin-left: 20px;
      }
    `,
  ],
})
export class PrivacyPolicyComponent {}
