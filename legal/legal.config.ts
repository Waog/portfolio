// ============================================================================
// LEGAL MASTER FORM
// Canonical project metadata for legal texts and compliance checks.
// Fill this file once per website/project and keep it updated when:
// - you add/remove third-party services
// - you change hosting/infrastructure
// - you add forms, login, payments, newsletter, uploads, analytics, embeds
// - you start targeting new countries/languages
// ============================================================================

/**
 * ============================================================================
 * CONCRETE CONFIG OBJECT
 * ============================================================================
 */

export const legalConfig: LegalConfig = {
  project: {
    name: 'Oliver Stadie Portfolio',
    websiteType: 'informational',
    primaryDomain: 'oliverstadie.com',
    contractsConcludedOnWebsite: false,
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
    professionalBody: {
      name: 'IHK Berlin (Industrie- und Handelskammer Berlin)',
      address: {
        street: 'Fasanenstraße 85',
        postalCode: '10623',
        city: 'Berlin',
        country: 'Deutschland',
      },
    },
    managingPerson: {
      name: 'Oliver Stadie',
      role: 'managing_director',
    },
    regulatedProfession: null,
    pressResponsiblePerson: null,
  },

  languages: {
    defaultLanguage: 'en',
    availableLanguages: ['en', 'de'],
  },

  audience: {
    primaryAudience: 'businesses',
    targetsMinors: false,
    targeting: {
      germanyOnly: false,
      euTargeted: false,
      worldwideTargeted: true,
    },
  },

  features: {
    contactForm: null,
    otherForms: [],
    userAccounts: null,
    newsletter: null,
    uploads: null,
    payments: null,
    booking: null,
    liveChat: null,
    communityFeatures: false,
  },

  infrastructure: {
    hosting: {
      provider: 'GitHub Pages',
      region: 'USA',
      dnsProvider: 'Cloudflare',
      cdnProvider: 'Cloudflare',
      proxyOrWafProvider: 'Cloudflare',
    },
    email: {
      ordinaryMailboxProviders: [
        'Cloudflare (Email Routing)',
        'Google (Gmail)',
      ],
      transactionalProvider: null,
    },
    dataStores: {
      fileStorageProvider: null,
      databaseProvider: null,
    },
    observability: {
      errorMonitoringProvider: null,
      serverLogsEnabled: true,
      serverLogRetention:
        'no fixed period; depends on hosting and infrastructure providers',
    },
  },

  frontendAssets: {
    remoteFonts: [],
    thirdPartyScripts: ['Cloudflare Web Analytics'],
    iframes: [],
    mapEmbeds: [],
    socialEmbeds: [],
    captcha: null,
  },

  tracking: {
    analytics: ['Cloudflare Web Analytics'],
    tagManager: null,
    ads: [],
    sessionReplay: null,
    heatmaps: null,
    abTesting: null,
    conversionTracking: false,
    affiliateTracking: false,
    trackingBeforeConsent: false,
  },

  storage: {
    cookies: [
      {
        name: 'Cloudflare security cookies',
        purpose:
          'ensure website security and protect against bots, abuse, and malicious traffic',
        technicallyNecessary: true,
        provider: 'Cloudflare',
        retention: 'a few minutes up to 24 hours',
      },
    ],
    localStorage: [],
    sessionStorage: [],
    indexedDb: [],
    serviceWorkerStorage: [],
    other: [],
  },

  // TODO legal: this seems like a big lump which should be split per some kind of item. Server logs are mixed up with phone calls and location data here. purposes and other aspects can't be clearly associated to one another. -> ah, we partially did this splitup already in "recipients", which seems partially redundant.
  dataProcessing: {
    // TODO legal: do we need to add "contact_data" here, because we have an email-address when receiving a mail and a phone number when receiving a call?
    personalDataCategories: ['server_log_data', 'usage_data', 'location_data'],
    specialCategoriesProcessed: false,
    locationDataProcessed: true,
    healthDataProcessed: false,
    applicantDataProcessed: false,
    financialDataProcessed: false,
    // TODO legal: do we need to add "communication" here, because we receive emails and phone calls?
    processingPurposes: [
      'website_delivery',
      'security',
      'service_provision',
      'analytics',
    ],
    legalBases: ['art_6_1_b', 'art_6_1_f'],
    retentionPolicySummary:
      'Server logs are processed by infrastructure providers and retained for a short period depending on the provider; contact inquiries and related notes are kept until the inquiry is resolved unless longer retention is required; no own long-term storage of logs',
    recipients: [
      {
        name: 'Cloudflare',
        recipientType: 'processor',
        purposes: [
          'content_delivery',
          'dns',
          'email_delivery',
          'analytics',
          'spam_protection',
        ],
        region: 'USA',
        transferSafeguard: ['DPF', 'SCC'],
        hasDpa: true,
      },
      {
        name: 'GitHub Pages',
        recipientType: 'independent_controller',
        purposes: ['hosting'],
        region: 'USA',
        transferSafeguard: ['DPF', 'SCC'],
        hasDpa: false,
      },
      {
        name: 'Google (gMail)',
        recipientType: 'independent_controller',
        purposes: ['email_delivery'],
        region: 'USA',
        transferSafeguard: ['DPF', 'SCC'],
        hasDpa: false,
      },
    ],
  },

  // TODO legal: Seems to be completely redundant with other parts.
  international: {
    thirdCountryTransfers: true,
    transferCountries: ['USA'],
    transferMechanisms: ['DPF', 'SCC'],
  },

  urls: {
    imprintUrl: '/legal/imprint',
    privacyPolicyUrl: '/legal/privacy-policy',
    cookiePolicyUrl: null,
    termsUrl: null,
  },
};

/**
 * ============================================================================
 * TYPE DEFINITIONS
 * ============================================================================
 */

/**
 * Root legal config.
 */
export type LegalConfig = {
  project: ProjectConfig;
  operator: OperatorConfig;
  languages: LanguagesConfig;
  audience: AudienceConfig;

  features: FeaturesConfig;

  infrastructure: InfrastructureConfig;
  frontendAssets: FrontendAssetsConfig;
  tracking: TrackingConfig;
  storage: StorageConfig;
  dataProcessing: DataProcessingConfig;
  international: InternationalConfig;
  urls: UrlsConfig;
};

export type ProjectConfig = {
  /**
   * Human-readable project or website name.
   * Examples:
   * - "Oliver Stadie Portfolio"
   * - "Language Learning Stories"
   */
  name: string;

  /**
   * Main website type, because this affects which legal texts are needed.
   * Options:
   * - `informational` - pure informational website, company site, brochure site, landing page, portfolio, marketing
   * - `content_publication` - blog, magazine, editorial site, news site, knowledge site with publicly published articles/content
   * - `community_platform` - users interact publicly, e.g. comments, forum, ratings, profiles, user-generated public content
   * - `account_based_service` - users can register/login and use a service or protected area, but no direct paid checkout on the website
   * - `ecommerce` - products/services are sold directly on the website, including checkout/order/payment/subscription flows
   * - `booking_service` - appointments/reservations are booked directly on the website
   */
  websiteType:
    | 'informational'
    | 'content_publication'
    | 'community_platform'
    | 'account_based_service'
    | 'ecommerce'
    | 'booking_service';

  /**
   * Primary public domain.
   * Examples:
   * - "oliverstadie.com"
   * - "app.example.com"
   */
  primaryDomain: string;

  /**
   * Whether contracts are concluded directly on this website.
   */
  contractsConcludedOnWebsite: boolean;
};

/**
 * The legal operator or responsible entity of the website.
 * This is the person or legal entity that actually runs the website in the legal sense:
 * the one appearing in the Impressum, deciding why the website exists, what it does,
 * which services are used, and how personal data is processed.
 * In simple cases this is usually:
 * - a natural person running the site privately or professionally in their own name
 * - or a company / association / public body running the site
 * Do NOT put a mere developer, freelancer, agency, or hosting provider here unless
 * that person/entity is also the real legal operator of the site.
 * Usually this is the same entity that signs contracts, receives inquiries, and is
 * named as "Verantwortlicher" in the privacy policy.
 */
export type OperatorConfig = {
  /**
   * Examples:
   * - "Oliver Stadie IT GmbH"
   * - "Max Mustermann"
   */
  legalName: string;

  /**
   * Options:
   * - `natural_person` - private individual acting in own name
   * - `sole_proprietorship` - Einzelunternehmen / e.K. style business under one person
   * - `freelancer` - freiberufliche Tätigkeit without company entity
   * - `civil_law_partnership` - GbR / similar partnership
   * - `registered_merchant` - e.K. / Kaufmann
   * - `ug` - Unternehmergesellschaft (haftungsbeschränkt)
   * - `gmbh` - Gesellschaft mit beschränkter Haftung
   * - `ag` - Aktiengesellschaft
   * - `se` - Societas Europaea
   * - `association` - Verein / e.V.
   * - `foundation` - Stiftung
   * - `public_body` - Behörde / öffentliche Stelle / Körperschaft des öffentlichen Rechts
   * - `other` - another legal form not covered above
   */
  legalForm:
    | 'natural_person'
    | 'sole_proprietorship'
    | 'freelancer'
    | 'civil_law_partnership'
    | 'registered_merchant'
    | 'ug'
    | 'gmbh'
    | 'ag'
    | 'se'
    | 'association'
    | 'foundation'
    | 'public_body'
    | 'other';

  /**
   * Brand/trade name if different from legal name.
   * Examples:
   * - "RimRats"
   * - "Acme Apps"
   */
  tradeName: string | null;

  /**
   * Postal address of the operator.
   */
  address: PostalAddress;

  /**
   * Public contact email of the operator.
   * Examples:
   * - "hello@example.com"
   * - "kontakt@firma.de"
   */
  contactEmail: string;

  /**
   * Public phone number of the operator if published.
   * Examples:
   * - "+49 30 12345678"
   */
  contactPhone: string | null;

  /**
   * Company registration details if applicable.
   */
  registration: CompanyRegistration | null;

  /**
   * VAT ID if applicable.
   * Examples:
   * - "DE123456789"
   */
  vatId: string | null;

  /**
   * Chamber, professional association, or supervisory/professional body if legally relevant.
   * Only fill this if your legal form or profession requires naming such a body in the legal texts.
   * Typical examples: bar association, tax advisor chamber, medical chamber, IHK in some regulated contexts.
   * Leave empty if there is no such body that needs to be named.
   * E.g. IHK, Rechtsanwaltskammer, etc.
   */
  professionalBody: ProfessionalBody | null;

  /**
   * Regulated professional title if relevant.
   * E.g. "Rechtsanwalt", "Steuerberater"
   */
  regulatedProfession: RegulatedProfession | null;

  /**
   * The person who legally represents the operator, if that person is actually named in the final text.
   * "if named" means:
   * - for many companies, associations, etc., the legal texts explicitly name a representative
   *   such as Geschäftsführer, Vorstand, Inhaber, or another authorized representative
   * - for some setups, this may be unnecessary or already covered elsewhere
   * Typical cases where it IS named:
   * - GmbH -> Geschäftsführer
   * - association -> Vorstand
   * - sole proprietorship -> owner / Inhaber
   */
  managingPerson: ManagingPersonConfig | null;

  /**
   * The editorially responsible person, but only if such a role is actually used in the final legal text.
   * "if used" means:
   * - only relevant where you publish editorial/journalistic content and the text names a
   *   person responsible for that content
   * - not every website needs this
   * Typical examples where it may be used:
   * - blog, magazine, editorial/news site, commentary site
   * Typical examples where it is often NOT used:
   * - simple brochure site, simple portfolio, plain landing page without editorial publication
   * Leave empty if no such person is named in the final legal text.
   */
  pressResponsiblePerson: PressResponsiblePersonConfig | null;
};

export type LanguagesConfig = {
  /**
   * Main language of the website and legal texts.
   */
  defaultLanguage: LanguageCode;

  /**
   * All languages offered on the website.
   */
  availableLanguages: LanguageCode[];
};

export type AudienceConfig = {
  /**
   * Primary audience category.
   * Options:
   * - "general" - no narrow legal audience distinction intended
   * - "consumers" - private end users / B2C focus
   * - "businesses" - business customers / B2B focus
   * - "mixed" - both consumers and businesses are targeted
   */
  primaryAudience: 'general' | 'consumers' | 'businesses' | 'mixed';

  /**
   * Whether children or teenagers are specifically targeted by the website, product, or communication.
   * E.g. content for school pupils, toys for children, teen fashion, etc.
   */
  targetsMinors: boolean;

  targeting: AudienceTargeting;
};

export type FeaturesConfig = {
  contactForm: ContactFormConfig | null;

  /**
   * Whether there are relevant forms besides the main contact form.
   * "Form" here means a UI where users actively enter data and submit it for a purpose
   * other than a simple general contact message.
   *
   * Define stuff like this as OtherForms:
   * - newsletter signup
   * - waiting list signup
   * - quote/request form
   * - support request form
   * - booking form
   * - application form
   * - survey / questionnaire
   * - contest entry form
   *
   * Usually do NOT define stuff like this as OtherForms:
   * - a pure search field that only filters local content and does not submit user data to you
   * - a login form, because that is covered under auth/account fields
   * - a payment checkout, because that is covered under payments
   * - a simple cookie banner choice UI
   *
   * This section is only about user input flows that collect submitted data for a distinct purpose
   * other than the normal contact form.
   * A "form" in this section means:
   * - one or more input fields
   * - plus a submit action
   * - plus a purpose such as support, application, booking, signup, survey, etc.
   * Not every input field automatically counts.
   * Usually NOT included here:
   * - local search boxes that do not create a stored or transmitted request
   * - login/password fields (handled in [auth])
   * - payment checkout fields (handled in [payments])
   * - purely technical UI controls like language switchers or dark mode toggles
   */
  otherForms: OtherFormsConfig[];

  userAccounts: UserAccountsConfig | null;

  newsletter: NewsletterConfig | null;

  /**
   * Define if users can upload files.
   */
  uploads: UploadsConfig | null;

  /**
   * Define if payments happen on the website.
   * Whether paid services/products are offered.
   * This entire section is only about cases where the website itself is part of the payment/ordering/subscription flow.
   * In other words: fill this section because the website directly offers or handles a commercial transaction flow.
   * Typical examples where this section IS relevant:
   * - the website has a checkout
   * - users can subscribe on the site
   * - users can buy digital products on the site
   * - users enter payment details on the site or are led through an integrated payment flow
   *
   * Typical examples where this section is NOT triggered:
   * - portfolio site shows your email address
   * - someone contacts you manually
   * - you later negotiate and sign a paper/PDF contract outside the website
   * - the website is only marketing / lead generation, but not the transaction flow itself
   */
  payments: PaymentsConfig | null;

  /**
   * Define if booking or scheduling exists.
   */
  booking: BookingConfig | null;

  /**
   * Define if live chat exists.
   */
  liveChat: LiveChatConfig | null;

  /**
   * Whether user comments/reviews/community features exist.
   */
  communityFeatures: boolean;
};

export type ContactFormConfig = {
  /**
   * Fields collected by the form.
   */
  collectedFields: Array<
    | 'name'
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'phone'
    | 'company'
    | 'subject'
    | 'message'
    | 'address'
    | 'budget'
    | 'project_details'
    | 'attachment'
    | 'other'
  >;

  /**
   * Where submissions are sent or stored.
   * Options:
   * - `email` - sent to a mailbox
   * - `crm` - stored in CRM or lead system
   * - `ticket_system` - stored in support/helpdesk system
   * - `database` - stored in your own backend/database
   * - `other` - other storage method
   */
  submissionTarget: 'email' | 'crm' | 'ticket_system' | 'database' | 'other';

  /**
   * Spam protection details.
   * Options:
   * - `[any Provider]` - if third party provider is used for spam protection
   * - `Custom` - if you have your own custom anti-spam solution
   * - `Other` - if you use another method that does not fit the above categories
   * - `null` - if no spam protection is used
   */
  spamProtection:
    | 'Cloudflare Turnstile'
    | 'Google reCAPTCHA'
    | 'hCaptcha'
    | 'Friendly Captcha'
    | 'Custom'
    | 'Other'
    | null;

  /**
   * Purpose of the form.
   * Examples:
   * - "General inquiries"
   * - "Project requests"
   */
  purpose: string;

  /**
   * Retention period for submitted form data.
   * Examples:
   * - "6 months"
   * - "until request resolved"
   */
  retentionPeriod: string;
};

export type OtherFormsConfig = {
  /**
   * Name/category of this form.
   */
  formName:
    | 'callback_request'
    | 'survey'
    | 'waitlist_signup'
    | 'support_request'
    | 'quote_request'
    | 'application_form'
    | 'contest_entry'
    | 'other';

  /**
   * Fields collected by this form.
   */
  collectedFields:
    | 'name'
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'phone'
    | 'company'
    | 'subject'
    | 'message'
    | 'address'
    | 'budget'
    | 'project_details'
    | 'attachment'
    | 'cv'
    | 'cover_letter'
    | 'other';

  /**
   * Processing target of this form.
   */
  submissionTarget:
    | 'email'
    | 'crm'
    | 'ticket_system'
    | 'database'
    | 'applicant_tracking_system'
    | 'other';

  /**
   * Purpose of this form.
   * Examples:
   * - "collect waiting list registrations"
   * - "collect survey responses"
   */
  purpose: string;

  /**
   * Retention period for this form's submissions.
   * Examples:
   * - "until campaign ends"
   * - "12 months"
   */
  retentionPeriod: string;
};

export type UserAccountsConfig = {
  /**
   * Whether registration is possible.
   */
  registrationEnabled: boolean;

  /**
   * Whether login is possible.
   */
  loginEnabled: boolean;

  /**
   * Authentication methods used.
   */
  methods: Array<
    | 'password'
    | 'magic_link'
    | 'google_oauth'
    | 'apple_oauth'
    | 'github_oauth'
    | 'facebook_oauth'
    | 'microsoft_oauth'
    | 'custom_sso'
    | 'other'
  >;

  /**
   * Auth provider or backend.
   */
  provider:
    | 'Firebase Auth'
    | 'Auth0'
    | 'Supabase Auth'
    | 'AWS Cognito'
    | 'Clerk'
    | 'Custom backend'
    | 'Other';

  /**
   * Whether password reset exists.
   */
  passwordReset: boolean;

  /**
   * Whether users can delete their accounts.
   */
  selfServiceAccountDeletion: boolean;

  /**
   * Retention period for inactive/deleted account data.
   * Examples:
   * - "24 months"
   * - "until deletion request"
   */
  inactiveAccountRetention: string;
};

export type NewsletterConfig = {
  /**
   * Newsletter provider.
   */
  provider:
    | 'MailerLite'
    | 'Brevo'
    | 'Mailchimp'
    | 'ConvertKit'
    | 'Klaviyo'
    | 'HubSpot'
    | 'Custom'
    | 'Other';

  /**
   * Signup mode.
   * Options:
   * - "double_opt_in" - confirmation email required before subscription becomes active
   * - "single_opt_in" - direct signup without confirmation email
   */
  signupMode: 'double_opt_in' | 'single_opt_in';

  /**
   * Fields collected for newsletter signup.
   */
  collectedFields: Array<
    | 'email'
    | 'first_name'
    | 'last_name'
    | 'name'
    | 'company'
    | 'interests'
    | 'language'
    | 'other'
  >;

  /**
   * Whether email open/click tracking is used.
   */
  emailTracking: boolean;

  /**
   * Retention period for newsletter subscriber data.
   * Examples:
   * - "until unsubscribe"
   * - "24 months after inactivity"
   */
  retentionPeriod: string;
};

export type UploadsConfig = {
  /**
   * Types of uploaded files/content.
   */
  uploadTypes: Array<
    | 'avatar'
    | 'image'
    | 'video'
    | 'audio'
    | 'pdf'
    | 'document'
    | 'cv'
    | 'invoice'
    | 'other'
  >;

  /**
   * Storage provider for uploads.
   */
  storageProvider:
    | 'AWS S3'
    | 'Cloudflare R2'
    | 'Google Cloud Storage'
    | 'Azure Blob Storage'
    | 'Supabase Storage'
    | 'Local server'
    | 'Other';

  /**
   * Whether uploaded content can become public.
   */
  publiclyVisible: boolean;

  /**
   * Retention period for uploaded data.
   * Examples:
   * - "until user deletes"
   * - "90 days"
   */
  retentionPeriod: string;
};

export type PaymentsConfig = {
  /**
   * Commercial model used.
   * Options:
   * - `one_time_purchase` - single payment per order
   * - `subscription`      - recurring billing
   * - `usage_based`       - billing based on consumption/usage
   * - `donation`          - voluntary payments/donations
   * - `mixed`             - combination of different models
   */
  businessModel:
    | 'one_time_purchase'
    | 'subscription'
    | 'usage_based'
    | 'donation'
    | 'mixed';

  /**
   * What is sold.
   * Options:
   * - `digital_services` - SaaS, app access, memberships, digital service access
   * - `digital_content`  - ebooks, downloads, courses, templates, media
   * - `physical_goods`   - shipped products
   * - `offline_services` - consulting, workshops, local services
   * - `mixed`            - combination of different types
   */
  productType:
    | 'digital_services'
    | 'digital_content'
    | 'physical_goods'
    | 'offline_services'
    | 'mixed';

  /**
   * Whether the offer is B2C.
   */
  b2c: boolean;

  /**
   * Whether the offer is B2B.
   */
  b2b: boolean;

  /**
   * Payment providers.
   */
  paymentProviders: Array<
    | 'Stripe'
    | 'PayPal'
    | 'Mollie'
    | 'Paddle'
    | 'Adyen'
    | 'Braintree'
    | 'Apple In-App Purchase'
    | 'Google Play Billing'
    | 'Bank transfer'
    | 'Other'
  >;

  /**
   * Whether automatic renewal exists.
   */
  automaticRenewal: boolean;

  /**
   * How cancellation works.
   * Options:
   * - `customer_portal` - user can cancel in account/settings
   * - `email_support`   - cancellation via support/email
   * - `app_store`       - cancellation handled via Apple/Google store
   * - `manual`          - manual/internal cancellation handling
   * - `null`  - cancellation not applicable (e.g. one-time purchases without cancellation)
   */
  cancellationProcess:
    | 'customer_portal'
    | 'email_support'
    | 'app_store'
    | 'manual'
    | null;
};

export type BookingConfig = {
  /**
   * Booking provider.
   */
  provider:
    | 'Calendly'
    | 'Microsoft Bookings'
    | 'Cal.com'
    | 'Google Appointment Scheduler'
    | 'Custom'
    | 'Other';

  // TODO legal: the collected fields type often looks very similar. Generalize and reuse.
  /**
   * Fields collected during booking.
   */
  collectedFields: Array<
    | 'name'
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'phone'
    | 'company'
    | 'notes'
    | 'address'
    | 'other'
  >;
};

export type LiveChatConfig = {
  /**
   * Chat provider.
   */
  provider:
    | 'Crisp'
    | 'Intercom'
    | 'Zendesk Chat'
    | 'Tidio'
    | 'LiveChat'
    | 'HubSpot Chat'
    | 'Custom'
    | 'Other';

  /**
   * Whether chat transcripts are stored.
   */
  storesTranscripts: boolean;

  /**
   * Retention period for chat data.
   * Examples:
   * - "12 months"
   * - "until ticket resolved"
   */
  retentionPeriod: string;
};

export type InfrastructureConfig = {
  hosting: HostingConfig;
  email: InfrastructureEmailConfig;
  dataStores: InfrastructureDataStoresConfig;
  observability: InfrastructureObservabilityConfig;
};

export type FrontendAssetsConfig = {
  /**
   * Which remote third-party fonts are loaded.
   */
  remoteFonts: Array<'Google Fonts' | 'Adobe Fonts' | 'Bunny Fonts' | 'Other'>;

  /**
   * Which third-party scripts are loaded in the browser.
   */
  thirdPartyScripts: Array<
    | 'Cloudflare Web Analytics'
    | 'Google Tag Manager'
    | 'Stripe.js'
    | 'Calendly Widget'
    | 'PayPal SDK'
    | 'YouTube'
    | 'Vimeo'
    | 'Intercom'
    | 'Crisp'
    | 'Meta Pixel'
    | 'LinkedIn Insight Tag'
    | 'Custom'
    | 'Other'
  >;

  /**
   * Which iframes are used.
   */
  iframes: Array<
    | 'YouTube'
    | 'Vimeo'
    | 'Google Maps'
    | 'Calendly'
    | 'Typeform'
    | 'Spotify'
    | 'SoundCloud'
    | 'Other'
  >;

  /**
   * Which map embeds are used.
   */
  mapEmbeds: Array<
    'Google Maps' | 'OpenStreetMap' | 'Mapbox' | 'Leaflet' | 'Other'
  >;

  /**
   * Which social embeds/plugins are used.
   */
  socialEmbeds: Array<
    | 'Instagram'
    | 'LinkedIn'
    | 'X'
    | 'Facebook'
    | 'TikTok'
    | 'YouTube'
    | 'Pinterest'
    | 'Reddit'
    | 'Other'
  >;

  /**
   * Which captcha/anti-bot widgets are used.
   */
  captcha:
    | 'Cloudflare Turnstile'
    | 'Google reCAPTCHA'
    | 'hCaptcha'
    | 'Friendly Captcha'
    | 'Custom'
    | 'Other'
    | null;
};

export type TrackingConfig = {
  /**
   * Which analytics providers are used.
   * Set true if the website measures visitor/page usage beyond pure delivery of the website.
   * Typical examples:
   * - page views
   * - visits/sessions
   * - referrers
   * - device/browser breakdown
   * - traffic sources
   */
  analytics: Array<
    | 'Plausible'
    | 'Matomo'
    | 'Google Analytics'
    | 'Simple Analytics'
    | 'Fathom'
    | 'Umami'
    | 'Ackee'
    | 'Cloudflare Web Analytics'
    | 'Other'
  >;

  /**
   * Which a tag manager is used.
   */
  tagManager: 'Google Tag Manager' | 'Segment' | 'Tealium' | 'Other' | null;

  /**
   * Which advertising/remarketing tools are used.
   */
  ads: Array<
    | 'Meta Pixel'
    | 'Google Ads'
    | 'LinkedIn Insight Tag'
    | 'TikTok Pixel'
    | 'Pinterest Tag'
    | 'X Pixel'
    | 'Other'
  >;

  /**
   * Which session replay provider is used.
   */
  sessionReplay:
    | 'Hotjar'
    | 'Microsoft Clarity'
    | 'FullStory'
    | 'Smartlook'
    | 'Other'
    | null;

  /**
   * Which heatmaps provider is used.
   */
  heatmaps: 'Hotjar' | 'Microsoft Clarity' | 'Crazy Egg' | 'Other' | null;

  /**
   * Which A/B testing provider is used.
   */
  abTesting:
    | 'Optimizely'
    | 'VWO'
    | 'Google Optimize alternative'
    | 'Custom'
    | 'Other'
    | null;

  /**
   * Whether conversion tracking is used.
   */
  conversionTracking: boolean;

  /**
   * Whether affiliate tracking is used.
   */
  affiliateTracking: boolean;

  /**
   * Whether any tracking starts before consent.
   */
  trackingBeforeConsent: boolean;
};

export type StorageConfig = {
  cookies: StorageItemConfig[];

  localStorage: StorageItemConfig[];

  sessionStorage: StorageItemConfig[];

  indexedDb: StorageItemConfig[];

  /**
   * Whether service worker / browser-side caching stores user-related data.
   * This is NOT about ordinary static asset caching alone.
   * The mere fact that a browser caches your logo, CSS, JS, or images does normally NOT mean this should be true.
   * Focus on data that relates to a user, session, state, or behavior, such as:
   * - offline app data
   * - cached account/profile data
   * - cached API responses containing personal data
   * - push subscription data
   * - user-specific settings or drafts stored via service worker/app cache
   * For a normal static website where only public assets like logos/images are browser-cached, this is usually false.
   */
  serviceWorkerStorage: StorageItemConfig[];

  other: StorageItemConfig[];
};

export type DataProcessingConfig = {
  /**
   * Categories of personal data processed.
   * "Personal data" means information relating to an identified or identifiable natural person.
   * In practice, this often includes more than obvious things like names and emails.
   * For a website context, relevant examples can include:
   * - IP-related/server log data
   * - contact form content
   * - account/login data
   * - analytics/usage data linked to a user or device
   * - booking/payment/chat/upload/application data
   */
  personalDataCategories: Array<
    | 'server_log_data'
    | 'contact_data'
    | 'account_data'
    | 'newsletter_data'
    | 'upload_data'
    | 'payment_data'
    | 'booking_data'
    | 'chat_data'
    | 'usage_data'
    | 'device_data'
    | 'location_data'
    | 'application_data'
    | 'special_category_data'
    | 'other'
  >;

  /**
   * Whether special categories of personal data are processed.
   */
  specialCategoriesProcessed: boolean;

  /**
   * Whether location data is processed.
   * Set true if the website or its services process location in a meaningful way, for example:
   * - exact GPS or device location
   * - address/location submitted by users
   * - geo-based service behavior
   * - analytics/reports that include country/region/city derived from visitor traffic
   *
   * For a simple static site without such features, this is often false.
   * If your analytics/reporting stack provides country/region level traffic data, review carefully whether
   * you want to treat that as location-related processing in your legal inventory.
   * TODO legal: what? i shall decide how to interpret this!?
   */
  locationDataProcessed: boolean;

  healthDataProcessed: boolean;

  /**
   * Whether applicant/job application data is processed.
   */
  applicantDataProcessed: boolean;

  /**
   * Whether financial/payment data is processed.
   */
  financialDataProcessed: boolean;

  /**
   * Main processing purposes.
   */
  processingPurposes: Array<
    | 'website_delivery'
    | 'security'
    | 'communication'
    | 'support'
    | 'account_management'
    | 'service_provision'
    | 'booking_management'
    | 'newsletter_delivery'
    | 'marketing'
    | 'analytics'
    | 'payment_processing'
    | 'fraud_prevention'
    | 'community_operation'
    | 'application_processing'
    | 'legal_compliance'
    | 'other'
  >;

  /**
   * Main legal bases relied upon.
   * These are the GDPR reasons you rely on to process personal data.
   * Use only the ones that actually apply to your website's real processing.
   * For a minimal normal website, art_6_1_f is often the starting point for delivery/security/logging.
   * Do NOT randomly pick multiple bases "just in case".
   *
   *  Options:
   * - `art_6_1_a` - consent; user must first agree (e.g. optional tracking, newsletter where consent is the basis)
   * - `art_6_1_b` - contract / pre-contractual steps; needed to provide a requested service, account, booking, or order
   * - `art_6_1_c` - legal obligation; needed because a law requires it (e.g. statutory retention of invoices)
   * - `art_6_1_f` - legitimate interests; common for basic website operation, security, server logs, fraud prevention, some low-intrusion analytics depending on setup
   * - `art_9_2_a` - explicit consent for special-category data
   * - `art_9_2_b` - employment/social security context for special-category data
   * - `art_9_2_h` - healthcare/medical-care context for special-category data
   * - `other`     - only if you knowingly rely on another basis not covered here
   */
  legalBases: Array<
    | 'art_6_1_a'
    | 'art_6_1_b'
    | 'art_6_1_c'
    | 'art_6_1_f'
    | 'art_9_2_a'
    | 'art_9_2_b'
    | 'art_9_2_h'
    | 'other'
  >;

  /**
   * General retention policy summary.
   * Describe, in plain language, how long different data is kept and what the general deletion logic is.
   * This is not a strict enum field because retention often differs by data type.
   *
   * Good summaries usually answer:
   * - what is deleted quickly
   * - what is kept until purpose ends
   * - what is kept because the law requires it
   * - whether backups/logs have separate periods
   *
   * Typical patterns:
   * - "Server logs are kept for 7 days; contact inquiries until resolved; no account data stored."
   * - "Newsletter data until unsubscribe; invoices according to statutory retention duties."
   *
   * If you do not know this yet, that means you still need to investigate your providers and own processes.
   *
   * Examples:
   * - "Data is deleted when no longer necessary."
   * - "Invoices kept per tax law; support data deleted after resolution."
   * - "Server logs are processed by infrastructure providers and retained for a short period depending on the provider; no own long-term storage of logs"
   */
  retentionPolicySummary: string;

  recipients: RecipientConfig[];
};

export type InternationalConfig = {
  /**
   * Whether any personal data is transferred outside the EU/EEA.
   * "Personal data" here means any data about an identified or identifiable person.
   * For website operators this can include, depending on setup:
   * - IP-related log/request data
   * - analytics/usage data
   * - contact/account/payment/support data
   *
   * This question is not limited to obvious profile data.
   * If providers outside the EU/EEA receive such data, or if providers in the stack transfer it onward outside the EU/EEA,
   * this may be true.
   * For a stack using providers like GitHub, Cloudflare, US analytics, US email tools, etc., this usually requires explicit review,
   * not guesswork.
   */
  thirdCountryTransfers: boolean;

  /**
   * Countries involved in such transfers.
   */
  transferCountries: Array<
    'USA' | 'UK' | 'Canada' | 'India' | 'Australia' | 'Switzerland' | 'Other'
  >;

  /**
   * Transfer safeguards/mechanisms used.
   */
  transferMechanisms: Array<
    'adequacy_decision' | 'DPF' | 'SCC' | 'BCR' | 'consent' | 'other'
  >;
};

export type UrlsConfig = {
  /**
   * Path or URL of the Imprint page.
   * Examples:
   * - "/impressum"
   * - "https://example.com/legal/imprint"
   * - "" for root path
   * - null if no such page exists.
   */
  imprintUrl: string | null;

  /**
   * Path or URL of the privacy policy page.
   * Examples:
   * - "/datenschutz"
   * - "https://example.com/legal/privacy"
   * - "" for root path
   * - null if no such page exists.
   */
  privacyPolicyUrl: string | null;

  /**
   * Path or URL of the cookie policy page.
   * Examples:
   * - "/cookies"
   * - "" for root path
   * - null if no such page exists.
   */
  cookiePolicyUrl: string | null;

  /**
   * Path or URL of the terms page.
   * Examples:
   * - "/agb"
   * - "" for root path
   * - null if no such page exists.
   */
  termsUrl: string | null;
};

export type PostalAddress = {
  /**
   * Street and house number.
   * Examples:
   * - "Musterstraße 1"
   * - "Beispielweg 12"
   */
  street: string;

  /**
   * Examples:
   * - "10115"
   * - "80331"
   */
  postalCode: string;

  /**
   * Examples:
   * - "Berlin"
   * - "München"
   */
  city: string;

  /**
   * Examples:
   * - "Deutschland"
   * - "Austria"
   */
  country: string;
};

export type CompanyRegistration = {
  /**
   * Register court if applicable.
   * Examples:
   * - "Amtsgericht Berlin (Charlottenburg)"
   */
  registerCourt: string | null;

  /**
   * Register number if applicable.
   * Examples:
   * - "HRB 123456 B"
   */
  registerNumber: string | null;
};

export type ProfessionalBody = {
  /**
   * Chamber, professional association, or supervisory/professional body if legally relevant.
   * Examples:
   * - "IHK Berlin (Industrie- und Handelskammer Berlin)"
   * - "Rechtsanwaltskammer Berlin"
   */
  name: string;
  address: PostalAddress;
};

export type RegulatedProfession = {
  /**
   * Regulated professional title.
   * Examples:
   * - "Rechtsanwalt"
   * - "Steuerberater"
   */
  title: string;

  /**
   * Country where the regulated title was granted.
   * Examples:
   * - "Deutschland"
   */
  country: string;

  /**
   * Professional rules if relevant.
   * Examples:
   * - "BRAO, BORA, FAO"
   * - "StBerG, BOStB"
   */
  rules: string | null;
};

export type ManagingPersonConfig = {
  /**
   * Examples:
   * - "Oliver Stadie"
   * - "Max Mustermann"
   */
  name: string;

  role:
    | 'owner'
    | 'managing_director'
    | 'board_member'
    | 'chairperson'
    | 'authorized_representative'
    | 'other';
};

export type PressResponsiblePersonConfig = {
  /**
   * Examples:
   * - "Max Mustermann"
   */
  name: string;

  /**
   * Address if different from operator address.
   * Examples:
   * - "Musterstraße 1, 10115 Berlin"
   */
  address: string | null;
};

export type AudienceTargeting = {
  /**
   * Whether the website targets Germany specifically.
   */
  germanyOnly: boolean;
  /**
   * Whether the website targets the EU more broadly.
   */
  euTargeted: boolean;
  /**
   * Whether the website targets users worldwide.
   */
  worldwideTargeted: boolean;
};

export type HostingConfig = {
  /**
   * Main hosting provider.
   */
  provider:
    | 'GitHub Pages'
    | 'Cloudflare Pages'
    | 'Vercel'
    | 'Netlify'
    | 'AWS'
    | 'Azure'
    | 'Google Cloud'
    | 'Hetzner'
    | 'Strato'
    | 'IONOS'
    | 'Render'
    | 'Custom server'
    | 'Other';

  /**
   * Hosting region/country.
   * Examples:
   * - "EU"
   * - "USA"
   */
  region: string;

  dnsProvider:
    | 'Cloudflare'
    | 'Route 53'
    | 'Namecheap'
    | 'GoDaddy'
    | 'IONOS'
    | 'Strato'
    | 'Hetzner'
    | 'Other';

  cdnProvider:
    | 'Cloudflare'
    | 'CloudFront'
    | 'Fastly'
    | 'Bunny CDN'
    | 'jsDelivr'
    | 'Akamai'
    | 'None'
    | 'Other';

  /**
   * Reverse proxy / WAF provider.
   */
  proxyOrWafProvider:
    | 'Cloudflare'
    | 'Fastly'
    | 'AWS WAF'
    | 'Imperva'
    | 'Sucuri'
    | 'None'
    | 'Other';
};

export type InfrastructureEmailConfig = {
  /**
   * Email provider for ordinary contact mailboxes.
   * This means the provider(s) involved in normal human email communication for addresses published on the website,
   * such as hello@domain.tld or kontakt@domain.tld.
   * Think from the visitor's perspective:
   * - when someone writes to your published address, which provider(s) receive, forward, store, or deliver that mailbox traffic?
   * If your setup is split, document the mailbox side here:
   * - inbound routing/forwarding provider
   * - mailbox provider actually receiving/storing the message
   * This field is about ordinary mailbox communication, not bulk transactional app emails.
   * In a split setup you may need a combined value or a later normalized model with multiple providers.
   *
   * Examples:
   * - "Strato"
   * - "Google Workspace"
   * - "Microsoft 365"
   * - "Proton Mail"
   * - "IONOS"
   * - "Zoho Mail"
   * - "Fastmail"
   * - "Other"
   */
  ordinaryMailboxProviders: string[];

  /**
   * Transactional email provider.
   * This means a provider used by a system/app/site to send operational emails automatically.
   * Think machine-sent emails, not manual human emails from your inbox.
   * Typical examples:
   * - password reset email
   * - verification email
   * - invoice email
   * - booking confirmation
   * - system notification
   * - contact-form autoresponder
   * If you manually write emails in Gmail, that alone is NOT transactional email.
   * If your site/app/backend sends emails through SMTP2GO, SES, Mailgun, etc., that IS transactional email.
   * Cloudflare Email Routing is not usually the classic transactional sender; SMTP2GO typically is.
   */
  transactionalProvider:
    | 'Postmark'
    | 'AWS SES'
    | 'Mailgun'
    | 'SendGrid'
    | 'Brevo'
    | 'Resend'
    | 'Other'
    | null;
};

export type InfrastructureDataStoresConfig = {
  /**
   * File storage provider if any.
   */
  fileStorageProvider:
    | 'AWS S3'
    | 'Cloudflare R2'
    | 'Google Cloud Storage'
    | 'Azure Blob Storage'
    | 'Supabase Storage'
    | 'Local server'
    | 'Other'
    | null;

  /**
   * Database provider if any.
   */
  databaseProvider:
    | 'PostgreSQL'
    | 'MySQL'
    | 'MariaDB'
    | 'MongoDB'
    | 'Supabase'
    | 'Firebase'
    | 'AWS DynamoDB'
    | 'SQLite'
    | 'Other'
    | null;
};

export type InfrastructureObservabilityConfig = {
  // TODO legal: 'Other' is probably not an option proper legal documents can be generated from. search all `Other` Options and simply delete or replace. the lists/types don't need to be complete, as they can be extended on the fly.
  /**
   * Error monitoring/logging provider if any.
   */
  errorMonitoringProvider:
    | 'Sentry'
    | 'Rollbar'
    | 'Bugsnag'
    | 'Datadog'
    | 'CloudWatch'
    | 'Other'
    | null;

  /**
   * Whether server logs are stored.
   */
  serverLogsEnabled: boolean;

  /**
   * Retention period for server logs.
   * Examples:
   * - "7 days"
   * - "30 days"
   * - "no fixed period; depends on hosting and infrastructure providers"
   */
  serverLogRetention: string;
};

export type StorageItemConfig = {
  /**
   * Name of the storage item/mechanism.
   * Doesn't need to be the exact technical key of the item.
   * A descriptive name is sufficient.
   * Examples:
   * - "theme"
   * - "_ga"
   * - "Cloudflare security cookies"
   */
  name: string;

  /**
   * Purpose of this storage item.
   * Examples:
   * - "store dark mode preference"
   * - "measure analytics sessions"
   * - "ensure website security and protect against bots, abuse, and malicious traffic"
   */
  purpose: string;

  /**
   * Whether it is technically necessary in your assessment.
   */
  technicallyNecessary: boolean;

  /**
   * Provider setting/reading the item.
   */
  provider:
    | 'self'
    | 'Google'
    | 'Cloudflare'
    | 'Meta'
    | 'Stripe'
    | 'Plausible'
    | 'Other';

  /**
   * Lifetime/retention.
   * Examples:
   * - "session"
   * - "13 months"
   */
  retention: string;
};

export type RecipientConfig = {
  /**
   * Name of recipient/service provider.
   * Specify company and/or service.
   * Examples:
   * - "GitHub Pages"
   * - "Cloudflare"
   * - "Google (Gmail)"
   */
  name: string;

  /**
   * Type of recipient.
   * This describes the legal role of the outside party receiving/handling data.
   * As a rough practical starting point for many normal website setups:
   * - hosting/CDN providers are often treated as processors in website privacy texts
   * - but this must be reviewed case by case, as it often depends on the specific service and payment plan used, e.g. free vs. paid version.
   *
   * Options:
   * - `processor`              - service provider acting on your behalf
   * - `independent_controller` - separate controller deciding on own purposes
   * - `joint_controller`       - jointly responsible with you
   */
  recipientType: 'processor' | 'independent_controller' | 'joint_controller';

  /**
   * Why data is transferred to this recipient.
   * Choose the purposes that best describe the service you use.
   */
  purposes: Array<
    | 'hosting'
    | 'content_delivery'
    | 'dns'
    | 'email_delivery'
    | 'transactional_email'
    | 'storage'
    | 'database_hosting'
    | 'error_monitoring'
    | 'analytics'
    | 'marketing'
    | 'payment_processing'
    | 'booking'
    | 'chat'
    | 'spam_protection'
    | 'authentication'
    | 'newsletter_delivery'
    | 'other'
  >;

  /**
   * Where the recipient is located or primarily operates.
   * Examples:
   * - "EU"
   * - "USA"
   */
  region: string;

  /**
   * Transfer safeguard if outside EU/EEA.
   * Legal mechanism used for transfers outside the EU/EEA.
   * Multiple values can be used if more than one mechanism applies.
   * This matters only if personal data is transferred to a recipient outside the EU/EEA.
   * Use:
   * - `none` if no such safeguard is identified
   * - `adequacy_decision` if the destination country is officially recognized as adequate
   * - `DPF` for EU-US Data Privacy Framework where applicable
   * - `SCC` for Standard Contractual Clauses
   * - `BCR` for Binding Corporate Rules
   * - `consent` only in the narrow case where explicit consent is the relied-on transfer mechanism
   * - `other` for another specific safeguard
   *
   * Do not guess here. Check the provider's legal/privacy/data-processing documentation.
   */
  transferSafeguard: Array<
    'none' | 'adequacy_decision' | 'DPF' | 'SCC' | 'BCR' | 'consent' | 'other'
  >;

  /**
   * Whether you have a DPA / AVV with this provider.
   * Only set to true if the provider acts as a processor (see other field) and you have such an agreement in place.
   */
  hasDpa: boolean;
};

/**
 * ============================================================================
 * OPTION ARRAYS + DERIVED UNION TYPES
 * ============================================================================
 */

export const WEBSITE_TYPE_OPTIONS = [] as const;

export type LanguageCode =
  | 'de'
  | 'en'
  | 'fr'
  | 'es'
  | 'it'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'tr'
  | 'zh'
  | 'ja'
  | 'ko';
