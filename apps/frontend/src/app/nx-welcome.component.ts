import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-nx-welcome',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDividerModule,
    MatChipsModule,
  ],
  template: `
    <div class="welcome-container">
      <!-- Welcome Header -->
      <mat-card class="welcome-header">
        <mat-card-content>
          <h1>
            <span class="greeting">Hello there,</span>
            <br />
            Welcome frontend 👋
          </h1>
        </mat-card-content>
      </mat-card>

      <!-- Hero Section -->
      <mat-card class="hero-card">
        <mat-card-content>
          <div class="hero-content">
            <div class="hero-text">
              <h2>
                <mat-icon class="hero-icon">check_circle</mat-icon>
                You're up and running
              </h2>
              <a mat-raised-button color="primary" href="#commands">
                What's next?
              </a>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Content Grid -->
      <div class="content-grid">
        <!-- Learning Materials -->
        <mat-card class="content-card">
          <mat-card-header>
            <mat-card-title>Learning materials</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-nav-list>
              <a
                mat-list-item
                href="https://nx.dev/getting-started/intro?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
              >
                <mat-icon matListItemIcon>menu_book</mat-icon>
                <div matListItemTitle>Documentation</div>
                <div matListItemLine>Everything is in there</div>
                <mat-icon matListItemMeta>arrow_forward</mat-icon>
              </a>

              <a
                mat-list-item
                href="https://nx.dev/blog?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
              >
                <mat-icon matListItemIcon>article</mat-icon>
                <div matListItemTitle>Blog</div>
                <div matListItemLine>Changelog, features & events</div>
                <mat-icon matListItemMeta>arrow_forward</mat-icon>
              </a>

              <a
                mat-list-item
                href="https://www.youtube.com/@NxDevtools/videos?utm_source=nx-project&sub_confirmation=1"
                target="_blank"
                rel="noreferrer"
              >
                <mat-icon matListItemIcon>play_circle</mat-icon>
                <div matListItemTitle>YouTube channel</div>
                <div matListItemLine>Nx Show, talks & tutorials</div>
                <mat-icon matListItemMeta>arrow_forward</mat-icon>
              </a>

              <a
                mat-list-item
                href="https://nx.dev/getting-started/tutorials/angular-standalone-tutorial?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
              >
                <mat-icon matListItemIcon>send</mat-icon>
                <div matListItemTitle>Interactive tutorials</div>
                <div matListItemLine>Create an app, step-by-step</div>
                <mat-icon matListItemMeta>arrow_forward</mat-icon>
              </a>
            </mat-nav-list>
          </mat-card-content>
        </mat-card>

        <!-- Additional Resources -->
        <div class="additional-resources">
          <!-- Nx Console -->
          <a
            mat-raised-button
            href="https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console&utm_source=nx-project"
            target="_blank"
            rel="noreferrer"
            class="resource-button"
          >
            <mat-icon>code</mat-icon>
            <div>
              <div>Install Nx Console for VSCode</div>
              <small>The official VSCode extension for Nx.</small>
            </div>
          </a>

          <a
            mat-raised-button
            href="https://plugins.jetbrains.com/plugin/21060-nx-console"
            target="_blank"
            rel="noreferrer"
            class="resource-button"
          >
            <mat-icon>integration_instructions</mat-icon>
            <div>
              <div>Install Nx Console for JetBrains</div>
              <small
                >Available for WebStorm, Intellij IDEA Ultimate and more!</small
              >
            </div>
          </a>

          <!-- Nx Cloud -->
          <mat-card class="nx-cloud-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>cloud</mat-icon>
              <mat-card-title>Nx Cloud</mat-card-title>
              <mat-card-subtitle
                >Enable faster CI & better DX</mat-card-subtitle
              >
            </mat-card-header>
            <mat-card-content>
              <p>Your Nx Cloud remote cache setup is almost complete.</p>
            </mat-card-content>
            <mat-card-actions>
              <a
                mat-button
                color="primary"
                href="https://cloud.nx.app/connect/fovU3gVpGD"
                target="_blank"
                rel="noreferrer"
              >
                Click here to finish
              </a>
            </mat-card-actions>
          </mat-card>

          <!-- GitHub -->
          <a
            mat-raised-button
            href="https://github.com/nrwl/nx?utm_source=nx-project"
            target="_blank"
            rel="noreferrer"
            class="resource-button"
          >
            <mat-icon>favorite</mat-icon>
            <div>
              <div>Nx is open source</div>
              <small>Love Nx? Give us a star!</small>
            </div>
          </a>
        </div>
      </div>

      <!-- Commands Section -->
      <mat-card id="commands" class="commands-card">
        <mat-card-header>
          <mat-card-title>Next steps</mat-card-title>
          <mat-card-subtitle
            >Here are some things you can do with Nx:</mat-card-subtitle
          >
        </mat-card-header>
        <mat-card-content>
          <mat-accordion>
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>build</mat-icon>
                  Build, test and lint your app
                </mat-panel-title>
              </mat-expansion-panel-header>
              <pre><span class="comment"># Build</span>
nx build
<span class="comment"># Test</span>
nx test
<span class="comment"># Lint</span>
nx lint
<span class="comment"># Run them together!</span>
nx run-many -t build test lint</pre>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>info</mat-icon>
                  View project details
                </mat-panel-title>
              </mat-expansion-panel-header>
              <pre>nx show project frontend</pre>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>account_tree</mat-icon>
                  View interactive project graph
                </mat-panel-title>
              </mat-expansion-panel-header>
              <pre>nx graph</pre>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon>library_add</mat-icon>
                  Add UI library
                </mat-panel-title>
              </mat-expansion-panel-header>
              <pre><span class="comment"># Generate UI lib</span>
nx g &#64;nx/angular:lib ui
<span class="comment"># Add a component</span>
nx g &#64;nx/angular:component ui/src/lib/button</pre>
            </mat-expansion-panel>
          </mat-accordion>
        </mat-card-content>
      </mat-card>

      <!-- Footer -->
      <div class="footer">
        <p>
          Carefully crafted with
          <mat-icon class="heart-icon">favorite</mat-icon>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .welcome-container {
        max-width: 768px;
        margin: 0 auto;
        padding: 1rem;
        gap: 2rem;
        display: flex;
        flex-direction: column;
      }

      .welcome-header {
        margin-top: 2.5rem;
      }

      .welcome-header h1 {
        font-size: 3rem;
        font-weight: 500;
        letter-spacing: -0.025em;
        line-height: 1;
        margin: 0;
      }

      .greeting {
        display: block;
        font-size: 1.875rem;
        font-weight: 300;
        line-height: 2.25rem;
        margin-bottom: 0.5rem;
      }

      .hero-card {
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        color: white;
      }

      .hero-content {
        display: flex;
        align-items: center;
        padding: 2rem;
      }

      .hero-text h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 1.5rem;
      }

      .hero-icon {
        color: #10b981;
      }

      .content-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      @media (min-width: 768px) {
        .content-grid {
          grid-template-columns: 1fr 1fr;
        }
      }

      .content-card {
        height: fit-content;
      }

      .additional-resources {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .resource-button {
        display: flex !important;
        align-items: center;
        gap: 1rem;
        padding: 1rem !important;
        text-align: left;
        height: auto !important;
        white-space: normal !important;
      }

      .resource-button mat-icon {
        flex-shrink: 0;
      }

      .resource-button > div {
        flex: 1;
      }

      .resource-button small {
        display: block;
        opacity: 0.7;
        font-size: 0.875rem;
      }

      .nx-cloud-card {
        margin: 1rem 0;
      }

      .commands-card {
        margin-top: 3.5rem;
      }

      pre {
        background-color: #374151;
        border-radius: 0.25rem;
        color: #e5e7eb;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        overflow: auto;
        padding: 0.5rem 0.75rem;
        margin: 1rem 0;
      }

      .comment {
        color: #b5b5b5;
      }

      .footer {
        text-align: center;
        margin-top: 3.5rem;
        opacity: 0.6;
      }

      .footer p {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }

      .heart-icon {
        color: #fca5a5;
        width: 1.25rem !important;
        height: 1.25rem !important;
        font-size: 1.25rem !important;
      }

      mat-nav-list a {
        text-decoration: none;
        color: inherit;
      }

      mat-expansion-panel-header mat-panel-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `,
  ],
})
export class NxWelcomeComponent {}
