// ============================================================================
// LEGAL PROJECT FACTS DATA
// Canonical project metadata: the single point of truth to capture the legal aspects of this project.
// Project specific base facts, which are fundamental to derive the remaining data.
// Known and intuitively knowable facts, without the need for further research or legal expertise.
// This includes any information that cannot be inferred from public sources on the internet.
// The data is consumed to generate legal project conclusions, produce legal HTML texts,
// and perform compliance checks (typically by feeding it to LLM prompts).
// Only add verified facts here, not assumptions or guesses. When in doubt, leave it out or mark it as `ToBeResearched`. Fact's in here are not second-guessed by AI.
// Fill this file for each website/project and keep it updated whenever you:
// - add or remove third-party services
// - change hosting or infrastructure
// - add forms, authentication, payments, newsletters, uploads, analytics, or embeds
// - start targeting additional countries or languages
//
// The generation happens in multiple stages:
// 1. Derivation and research of additional facts based on the Legal Project Facts (`legal/legal-project-conclusions.data.ts`)
// 2. Generation of legal text HTML files based on the Legal Project Facts and the Legal Project Conclusions
// ============================================================================

import { LegalProjectFacts } from './legal-project-facts.type';

/**
 * Project specific base facts, which are fundamental to derive the remaining facts.
 * These are the "what" statements that must be reflected in the final legal documents.
 * They are the basis for all further derivations and research.
 * Every 3rd party or service not mentioned here can be assumed to not be used.
 * Every feature not mentioned here can be assumed to be in default usage, as set up by the service or third party.
 */
export const legalProjectFactsData: LegalProjectFacts = {
  project: {
    name: 'Oliver Stadie Portfolio',
    primaryDomain: 'oliverstadie.com',
    description: `Portfolio website of Oliver Stadie - IT consultant, developer, and trainer - used like an online CV and reference of Oliver Stadie's work and projects. Usually, sent to recruiters or potential clients as part of their application process instead of a CV. Random occasional website visitors are possible but not the main audience.`,
    languages: {
      defaultLanguage: 'en',
      availableLanguages: ['en', 'de'],
    },
  },

  operator: {
    legalName: 'Oliver Stadie IT GmbH',
    legalForm: 'gmbh',
    tradeName: null,
    address: {
      street: 'Memhardstr. 7',
      postalCode: '10178',
      city: 'Berlin',
      country: 'Deutschland',
    },
    contactEmail: 'info@oliverstadie.com',
    contactPhone: '+4915202825986',
    registration: {
      registerCourt: 'Amtsgericht Berlin (Charlottenburg)',
      registerNumber: 'HRB 236714 B',
    },
    vatId: 'DE351854266',
    // Non-regulated IT consulting and development: no professional body is required
    professionalBody: null,
    managingPerson: {
      name: 'Oliver Stadie',
      role: 'managing_director',
    },
    regulatedProfession: null,
    pressResponsiblePerson: null,
    consumerDisputeResolution: {
      willingToParticipateInConsumerArbitration: false,
      employeeCountOnPreviousYearEnd: 'ten_or_less',
      preferredMentioning: 'omit_if_feasible',
    },
  },

  audience: {
    primaryAudience: 'businesses',
    targetsMinors: false,
    targeting: {
      scope: 'worldwide',
      primaryMarkets: ['Germany', 'Europe'],
    },
    notes: [
      `The website doesn't target a specific geographic audience.`,
      'Still, most customers and visitors are from Germany or nearby countries, due to my location and network.',
      // Clarifies VSBG relevance and reduces legal-text assumptions
      'No contracts are concluded directly on this website (no checkout, no bookings, no subscriptions).',
      // Clarifies dispute-resolution info generation stance (can be adjusted if business model changes)
      'The business is not targeted at consumers (B2C) via this website.',
    ],
  },

  userRelatedFeatures: {
    publicContactEmail: 'info@oliverstadie.com',
    publicContactPhone: '+4915202825986',
    // make explicit to reduce ambiguity in downstream generation
    communityFeatures: false,
    contractsConcludedOnWebsite: false,
  },

  customImplementations: {
    serverLogs: false,
  },

  thirdParties: {
    github: {
      subServicesOrFeatures: {
        githubPages: { name: 'GitHub Pages', planOrSubscription: 'free' },
      },
    },
    cloudflare: {
      subServicesOrFeatures: {
        cloudflare: {
          name: 'Cloudflare',
          planOrSubscription: 'free',
          subServicesOrFeatures: {
            proxiedDns: { name: 'proxied DNS Records Management' },
            dnsAnalytics: { name: 'DNS > Analytics' },
            cdn: { name: 'CDN' },
            httpTraffic: { name: 'Analytic & Logs > HTTP Traffic' },
            webAnalytics: {
              name: 'Analytic & Logs > Web Analytics',
              subServicesOrFeatures: {
                realUserMeasurements: {
                  name: 'Real User Measurements',
                  notes: [
                    'aka RUM',
                    'Enable, excluding visitor data in the EU',
                    'The JS Snippet will be automatically injected. The JS Snippet will not be injected for visitors from the EU.',
                    `If injected, the JS Snippet doesn't wait for consent.`,
                  ],
                },
              },
            },
            performance: { name: 'Analytic & Logs > Performance' },
            emailRouting: {
              name: 'Email > Email Routing',
              notes: [
                'used to forward incoming emails from custom domain to Gmail',
                'see gmail for more details',
              ],
            },
            dmarcManagement: { name: 'Email > DMARC Management' },
          },
          notes: [
            'Cloudflare emailRouting is used to forward user emails to a gmail address',
            // DPA source: Manage Account > Configurations > Preferences > Data processing addendum
            'DPA - automatically accepted on 03/22/2026, as always included',
            'Quote from Cloudflare Settings: Data processing addendum - Cloudflare’s Data Processing Addendum is incorporated into both our Self-Serve Subscription Agreement and our standard Enterprise Subscription Terms of Service. For customers with negotiated Enterprise Agreements, you can obtain a copy of your Data Processing Addendum by contacting your Account representative.',
            'DPA url: https://www.cloudflare.com/cloudflare-customer-dpa/',
          ],
        },
      },
    },
    smtp2go: {
      subServicesOrFeatures: {
        smtp2go: {
          name: 'SMTP2GO',
          planOrSubscription: 'free',
          notes: [
            'used to send emails from gmail UI via custom domain to users.',
            'DPA - Accepted on 03/30/2026 10:45 AM UTC',
            'Hosted in the EU',
          ],
        },
      },
    },
    google: {
      subServicesOrFeatures: {
        gmail: {
          name: 'Gmail',
          planOrSubscription: 'free',
          notes: [
            'Used as admin UI and storage to receive and send emails to users.',
            'We use free consumer Gmail, not business Google Workspace.',
            'used for general communication and for contract / pre-contractual steps',
            'We delete spam, misdirected, and clearly irrelevant emails promptly or after a short operational buffer period.',
            'We classify emails based on their actual content and business relevance.',
            'We keep ordinary business correspondence that does not create statutory retention duties until the matter is concluded and thereafter generally for 3 years from the end of the calendar year of the last relevant contact for documentation purposes and the establishment, exercise, or defence of legal claims.',
            'We keep emails subject to German statutory commercial, tax, or accounting retention duties for the legally required retention period (generally 6 or 8 years from the end of the relevant calendar year).',
            'Where multiple categories apply or an email remains relevant for ongoing claims, audits, or disputes, we retain it for the longer necessary period.',
          ],
        },
      },
    },
    blau: {
      subServicesOrFeatures: {
        simCardAndMobilePhoneNumber: {
          name: 'SIM card and mobile phone number',
          planOrSubscription: 'Blau 9 Cent - Basistarif null',
          notes: [
            'Used to receive normal calls from users or call them back',
            'used for general communication and for pre-contractual steps',
          ],
        },
      },
    },
  },

  documentUrls: {
    imprintUrl: '/legal/imprint',
    privacyPolicyUrl: '/legal/privacy-policy',
  },
};
