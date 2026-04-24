import { Purpose, ToBeResearched } from './legal-project-conclusions.type';

/**
 * Schema for Legal Project Facts Data (see `./legal-project-facts.data.ts`).
 */
export type LegalProjectFacts = {
  project: LegalProjectFactsCore;
  operator: OperatorFactsCore;
  audience: AudienceFactsCore;
  userRelatedFeatures: UserRelatedFeaturesCore;
  /**
   * Custom project-specific implementations which are not described `thirdParties` section.
   */
  customImplementations: CustomImplementationsCore;
  thirdParties: ThirdPartiesFactsCore;
  documentUrls: DocumentUrlsCore;
};

/**
 * Core project information about the website itself.
 */
export type LegalProjectFactsCore = {
  /**
   * Human-readable project or website name.
   * Examples:
   * - "Oliver Stadie Portfolio"
   * - "Language Learning Stories"
   */
  name: string;

  /**
   * Primary public domain.
   * Examples:
   * - "oliverstadie.com"
   * - "app.example.com"
   */
  primaryDomain: string;

  /**
   * Detailed description of the project.
   * Include key information about:
   * - Purpose and use case of the website
   * - Target use and main audience
   * - How it is typically discovered/accessed
   * - Any other context that helps understand the project
   */
  description: string;

  languages: LanguagesCore;
};

export type LanguagesCore = {
  /**
   * Main language of the website and legal texts.
   */
  defaultLanguage: LanguageCode;

  /**
   * All languages offered on the website.
   */
  availableLanguages: LanguageCode[];
};

/**
 * Known facts about the legal operator of the website.
 */
export type OperatorFactsCore = {
  /**
   * Legal name of the operating entity.
   * Examples:
   * - "Oliver Stadie IT GmbH"
   * - "Max Mustermann"
   */
  legalName: string;

  /**
   * Legal form of the operating entity.
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
    | 'public_body';

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
   *
   * `null` means not required to publish.
   */
  professionalBody: ProfessionalBody | null;

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
   * Regulated professional title if relevant.
   * E.g. "Rechtsanwalt", "Steuerberater"
   * Only fill this if a regulated profession license is relevant to the legal texts.
   */
  regulatedProfession: RegulatedProfession | null;

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

  /**
   * Consumer dispute-resolution stance for imprint generation.
   * This is relevant for German VSBG notices where consumer contracts are in scope,
   * and can also be used for a conservative voluntary imprint notice.
   */
  consumerDisputeResolution?: ConsumerDisputeResolutionCore;
};

export type PostalAddress = {
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

export type CompanyRegistration = {
  /**
   * Court where the company is registered.
   * Examples:
   * - "Amtsgericht Berlin (Charlottenburg)"
   */
  registerCourt: string;

  /**
   * Registration number/ID.
   * Examples:
   * - "HRB 236714 B"
   */
  registerNumber: string;
};

export type ProfessionalBody = {
  /**
   * Name of the professional body.
   * Examples:
   * - "IHK Berlin (Industrie- und Handelskammer Berlin)"
   * - "Rechtsanwaltskammer Berlin"
   */
  name: string;

  /**
   * Address of the professional body if relevant.
   */
  address?: PostalAddress;

  /**
   * Whether this body must be published in legal texts.
   * Options:
   * - `required` - must be named in legal texts
   * - `optional` - may be named but not required
   * - `omit` - should not be named (consider setting the parent property to `null`)
   */
  publishing?: 'required' | 'optional' | 'omit' | ToBeResearched;
};

export type ManagingPersonConfig = {
  /**
   * Full name of the person.
   * Examples:
   * - "Oliver Stadie"
   * - "Jane Smith"
   */
  name: string;

  /**
   * Role/title of the person.
   * Examples:
   * - "managing_director"
   * - "founder"
   * - "owner"
   * - "chairman"
   * - "board_member"
   */
  role:
    | 'managing_director'
    | 'founder'
    | 'owner'
    | 'chairman'
    | 'board_member'
    | 'other';
};

export type ConsumerDisputeResolutionCore = {
  /**
   * Whether the operator participates in consumer arbitration before a
   * Verbraucherstreitbeilegungsstelle.
   *
   * Purpose:
   * - Controls whether the generated legal documents say that the operator is willing
   *   to take part in consumer dispute resolution.
   * - This is about out-of-court dispute resolution between a business and a consumer.
   * - It is not about ordinary court proceedings, B2B disputes, tax disputes,
   *   data protection complaints, or customer support.
   *
   * Legal decision logic:
   * - Set to true only if the operator actually wants to participate in a consumer
   *   arbitration procedure, or has already committed to doing so.
   * - Set to false if the operator does not want to participate and is not legally
   *   required to participate.
   *
   * B2B vs. B2C:
   * - Pure B2B websites usually do not need this notice because the VSBG concerns
   *   disputes with consumers.
   * - A website is not "pure B2B" merely because businesses are the main audience.
   *   If consumers can conclude contracts with the operator, or if the operator uses
   *   consumer-facing terms, this can become relevant.
   * - A portfolio or company website without online contracting is usually lower risk,
   *   but the field can still be used to generate a short clarifying imprint notice.
   *
   * Avoid:
   * - Do not set to true just to sound cooperative. A willingness statement can create
   *   expectations and may require more precise information.
   * - Do not use this for privacy-policy complaint rights. Data protection complaints
   *   belong to the competent data protection authority, not to consumer arbitration.
   */
  willingToParticipateInConsumerArbitration: boolean;

  /**
   * Employee count category on 31 December of the previous year for VSBG § 36(3).
   */
  employeeCountOnPreviousYearEnd: 'ten_or_less' | 'more_than_ten';

  /**
   * Whether a short notice should be shown in the imprint even if the duty likely does not apply.
   *
   * This can be used to voluntarily include a consumer dispute resolution notice in the imprint for a conservative approach, even if the operator is not legally obligated to do so.
   *
   * Complemented by `mentioningRequired` in LegalProjectConclusions.
   *
   * `mention_if_feasible` means that the notice should be included if it can be done without making false claims or creating misleading impressions. It will still be omitted, if mentioning it would require unverifiable or false claims.
   * `omit_if_feasible` means that the notice should be omitted if it can be done without making false claims or creating misleading impressions. It will still be mentioned, if legally required.
   * `always_mention` means that the notice should always be included, regardless of feasibility.
   * `always_omit` means that the notice should always be omitted, regardless of feasibility.
   */
  preferredMentioning?:
    | 'mention_if_feasible'
    | 'omit_if_feasible'
    | 'always_mention'
    | 'always_omit';

  notes?: string[];
};

export type RegulatedProfession = {
  /**
   * Professional title.
   * Examples:
   * - "Rechtsanwalt" / "Lawyer"
   * - "Steuerberater" / "Tax Consultant"
   * - "Arzt" / "Medical Doctor"
   */
  title: string;

  /**
   * Country where the regulated title was granted.
   * Examples:
   * - "Deutschland"
   */
  country: string;

  /**
   * Regulatory body that oversees this profession.
   * Examples:
   * - "Rechtsanwaltskammer"
   * - "Finanzbehörde"
   */
  regulatoryBody: string;

  /**
   * Professional rules if relevant.
   * Examples:
   * - "BRAO, BORA, FAO"
   * - "StBerG, BOStB"
   */
  rules: string | null;
};

export type PressResponsiblePersonConfig = {
  /**
   * Full name of the person.
   */
  name: string;

  /**
   * Role or title.
   * Examples:
   * - "Editor-in-Chief"
   * - "Content Manager"
   */
  role: string;

  /**
   * Address if different from operator address.
   */
  address: PostalAddress | null;
};

/**
 * Known audience/targeting facts about the website.
 */
export type AudienceFactsCore = {
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

  /**
   * Geographic targeting details.
   */
  targeting: AudienceTargetingFacts;

  /**
   * Optional additional context notes about the audience.
   */
  notes?: string[];
};

export type AudienceTargetingFacts = {
  /**
   * The general geographic scope of the website's audience.
   * Options:
   * - `worldwide` - no specific geographic focus, audience is global
   * - `eu` - typical users are from the European Union
   * - `germany` - typical users are from Germany
   * - `custom` - specific other geographic focus (e.g. specific countries, regions)
   */
  scope: 'worldwide' | 'eu' | 'germany' | { customRegions: string[] };

  /**
   * Primary markets within the scope, if relevant.
   */
  primaryMarkets?: string[];
};

/**
 * User-related features known from legal project facts.
 */
export type UserRelatedFeaturesCore = {
  /**
   * Publicly published contact email address.
   */
  publicContactEmail?: string;

  /**
   * Publicly published contact phone number.
   */
  publicContactPhone?: string;

  contactForm?: ContactFormCore;
  otherForms?: Array<OtherFormCore>;
  userAccounts?: UserAccountsCore;
  newsletter?: NewsletterCore;
  uploads?: UploadsCore;
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
  payments?: PaymentsCore;

  booking?: BookingCore;
  liveChat?: LiveChatCore;

  /**
   * Whether community features exist (comments, reviews, user-generated public content).
   */
  communityFeatures?: boolean;

  /**
   * Whether contracts are concluded directly on this website.
   * This includes purchases, bookings, service orders, subscriptions initiated and completed on the website.
   */
  contractsConcludedOnWebsite?: boolean;
};

export type ContactFormCore = {
  /**
   * Fields collected by the form.
   */
  collectedFields: CollectedField[];

  /**
   * Where submissions are sent or stored.
   * Should reference some other item in the legal project facts.
   * Free form text. Exact reference will be in the derived property `submissionTarget`.
   */
  submissionTarget: string;

  /**
   * Spam protection details.
   * Options:
   * - `[any Provider]` - if third party provider is used for spam protection
   * - `Custom` - if you have your own custom anti-spam solution
   * - `null` - if no spam protection is used
   *
   * 3rd party providers should be specified in the `thirdParties` section.
   */
  spamProtection:
    | 'Cloudflare Turnstile'
    | 'Google reCAPTCHA'
    | 'hCaptcha'
    | 'Friendly Captcha'
    | 'Custom'
    | null;

  /**
   * Intuitively known purposes of the form.
   * More legally relevant purposes might be derived.
   */
  purposes: Purpose[];

  /**
   * Retention period for submitted form data.
   * Examples:
   * - "6 months"
   * - "until request resolved"
   * - "as defined by third party provider [Provider Name]"
   */
  retentionPeriod: string;

  notes?: string[];
};

export type OtherFormCore = {
  /**
   * Name/category of this form.
   */
  formName: string[];

  /**
   * Fields collected by this form.
   */
  collectedFields: CollectedField[];

  /**
   * Processing target of this form.
   */
  submissionTarget:
    | 'email'
    | 'crm'
    | 'ticket_system'
    | 'database'
    | 'applicant_tracking_system';

  /**
   * Intuitively known purposes of the form.
   * More legally relevant purposes might be derived.
   */
  purposes: Purpose[];

  /**
   * Retention period for this form's submissions.
   * Examples:
   * - "until campaign ends"
   * - "12 months"
   * - "as defined by third party provider [Provider Name]"
   */
  retentionPeriod: string;

  notes?: string[];
};

export type UserAccountsCore = {
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
   * Should be listed in the third-party section or custom project features.
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
  >;

  /**
   * Auth provider or backend.
   * Free text reference to the relevant provider or system.
   */
  provider: string;

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

export type NewsletterCore = {
  /**
   * Newsletter provider.
   * Should be listed in the third-party section or custom project features.
   */
  provider:
    | 'MailerLite'
    | 'Brevo'
    | 'Mailchimp'
    | 'ConvertKit'
    | 'Klaviyo'
    | 'HubSpot'
    | 'Custom';

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
  collectedFields: CollectedField[];

  /**
   * Whether email open/click tracking is used.
   */
  emailTracking: boolean;

  /**
   * Intuitive retention period for newsletter subscriber data.
   * Examples:
   * - "until unsubscribe"
   * - "24 months after inactivity"
   */
  retentionPeriod: string;
};

export type UploadsCore = {
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
  >;

  /**
   * Storage provider for uploads.
   * Should be listed in the third-party section or custom project features.
   */
  storageProvider:
    | 'AWS S3'
    | 'Cloudflare R2'
    | 'Google Cloud Storage'
    | 'Azure Blob Storage'
    | 'Supabase Storage'
    | 'Local server';

  /**
   * Whether uploaded content can become public.
   */
  publiclyVisible: boolean;

  /**
   * Intuitive retention period for uploaded data.
   * Examples:
   * - "until user deletes"
   * - "90 days"
   * - "as stated by storage provider"
   */
  retentionPeriod: string;
};

export type PaymentsCore = {
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
   * undefined means same audience as in audience section.
   */
  b2c?: boolean;

  /**
   * Whether the offer is B2B.
   * undefined means same audience as in audience section.
   */
  b2b?: boolean;

  /**
   * Payment providers.
   * Should be listed in the third party section.
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
   * - `null`            - cancellation not applicable (e.g. one-time purchases without cancellation)
   */
  cancellationProcess:
    | 'customer_portal'
    | 'email_support'
    | 'app_store'
    | 'manual'
    | null;
};

export type BookingCore = {
  /**
   * Booking provider.
   * Should be listed in the third party section or custom project features.
   */
  provider:
    | 'Calendly'
    | 'Microsoft Bookings'
    | 'Cal.com'
    | 'Google Appointment Scheduler'
    | 'Custom';

  /**
   * Fields collected during booking.
   */
  collectedFields: CollectedField[];
};

export type LiveChatCore = {
  /**
   * Chat provider.
   * Should be listed in the third party section or custom project features.
   */
  provider:
    | 'Crisp'
    | 'Intercom'
    | 'Zendesk Chat'
    | 'Tidio'
    | 'LiveChat'
    | 'HubSpot Chat'
    | 'Custom';

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

/**
 * Custom project-specific features that don't fit standard categories.
 */
export type CustomImplementationsCore = {
  /**
   * Whether our own server logs are collected/available.
   * Third party serverLogs are described in the `thirdParties` section.
   */
  serverLogs?: boolean;
};

/**
 * Third-party services and providers used in the project.
 * This captures which services/features are used and under what plan/subscription.
 */
export type ThirdPartiesFactsCore = {
  [providerKey: string]: ThirdPartyProviderFacts;
};

export type ThirdPartyProviderFacts = {
  /**
   * Services, Sub-services or features used from this provider.
   * Map of feature/service keys to their configuration.
   * Lower (more specific) settings always override higher (more general) settings.
   */
  subServicesOrFeatures: {
    [featureKey: string]: ThirdPartyFeatureFacts;
  };
};

export type ThirdPartyFeatureFacts = {
  /**
   * Human-readable name of the feature/service.
   * Examples:
   * - "GitHub Pages"
   * - "Web Analytics"
   */
  name: string;

  /**
   * Subscription plan or tier.
   * Examples:
   * - "free"
   * - "pro"
   * - "Plan A"
   */
  planOrSubscription?: string;

  /**
   * Additional notes, not fitting into other fields.
   */
  notes?: string[];

  /**
   * Nested sub-services, features or sub-features if this is a container with multiple sub-services.
   * Lower (more specific) settings always override higher (more general) settings.
   */
  subServicesOrFeatures?: {
    [featureKey: string]: ThirdPartyFeatureFacts;
  };
};

/**
 * URLs for legal/compliance pages.
 */
export type DocumentUrlsCore = {
  /**
   * URL path to the imprint/Impressum page.
   * Examples:
   * - "/legal/imprint"
   * - "/impressum"
   */
  imprintUrl?: string;

  /**
   * URL path to the privacy policy page.
   * Examples:
   * - "/legal/privacy-policy"
   * - "/datenschutz"
   */
  privacyPolicyUrl?: string;

  termsAndConditionsUrl?: string;
  dataProcessingAgreementUrl?: string;
  cookiePolicyUrl?: string;
  accessibilityStatementUrl?: string;
};

/**
 * Shared union type for all form-collected field identifiers.
 * Use this single source to keep collected field sets consistent across configs.
 */
export type CollectedField =
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
  | 'notes';

export type LanguageCode =
  | 'en'
  | 'de'
  | 'fr'
  | 'es'
  | 'it'
  | 'pt'
  | 'nl'
  | 'pl'
  | 'ru'
  | 'ja'
  | 'zh';
