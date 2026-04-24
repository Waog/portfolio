/**
 * Schema for Legal Project Conclusions Data (see `./legal-project-conclusions.data.ts`).
 */
export type LegalProjectConclusions = {
  legalDocumentMetadata: LegalDocumentMetadataConclusions;
  project: ProjectConclusions;
  operator: OperatorConclusions;
  audience: AudienceConclusions;
  userRelatedFeatures: UserRelatedFeaturesConclusions;
  customImplementations: CustomImplementationsConclusions;
  thirdParties: ThirdPartiesConclusions;
  requiredDocuments: RequiredDocumentsConclusions;
};

export type LegalDocumentMetadataConclusions = {
  /** When was this document changes/re-generated the last time? Format: YYYY-MM-DD */
  lastUpdated: string;
};

/**
 * Derived facts about the project that require legal analysis.
 */
export type ProjectConclusions = {
  /**
   * Website type, which affects which legal texts are needed.
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
};

/**
 * Derived facts about the operator that come from research/verification.
 */
export type OperatorConclusions = {
  /**
   * Data protection supervisory authority that is primarily competent for this operator.
   * Must be included in the legal documents if any personal data is processed (so, practically always).
   *
   * Use official data here.
   */
  competentDataProtectionAuthority:
    | SupervisoryAuthorityConclusion
    | ToBeResearched;

  /**
   * Consumer dispute-resolution stance for imprint generation.
   * This is relevant for German VSBG notices where consumer contracts are in scope,
   * and can also be used for a conservative voluntary imprint notice.
   */
  consumerDisputeResolution: ConsumerDisputeResolutionConclusions;
};

export type SupervisoryAuthorityConclusion = {
  /**
   * E.g. `Berliner Beauftragte für Datenschutz und Informationsfreiheit`
   */
  name: string;

  /**
   * E.g. `Alt-Moabit 59-61, 10555 Berlin, Germany`
   */
  address: string;

  /**
   * E.g. `mailbox@datenschutz-berlin.de`
   */
  email?: string;

  /**
   * E.g. `+49 30 13889-0`
   */
  phone?: string;

  /**
   * E.g. `https://www.datenschutz-berlin.de/`
   */
  website?: string;
};

export type ConsumerDisputeResolutionConclusions = {
  /**
   * Whether the operator is legally obliged to participate in consumer arbitration.
   *
   * Purpose:
   * - Separates voluntary participation from a legal or contractual obligation.
   * - If the operator is obliged to participate, the generated documents usually need
   *   stronger and more specific wording than "we are not willing to participate".
   *
   * When to set true:
   * - Set to true if a statute, industry-specific rule, membership rule, contractual
   *   commitment, mediation/arbitration clause, or other binding rule requires the
   *   operator to participate in consumer arbitration.
   * - In that case, the legal documents should normally name the competent
   *   Verbraucherstreitbeilegungsstelle, including address and website.
   *
   * When to set false:
   * - Set to false if the operator has checked the issue and is not legally,
   *   contractually, or otherwise bound to participate.
   *
   * When to use TO_BE_RESEARCHED:
   * - Use TO_BE_RESEARCHED if the operator's sector, contracts, memberships, AGB,
   *   marketplace rules, platform terms, or statutory obligations have not yet been
   *   checked.
   *
   * Avoid:
   * - Do not assume "not obliged" merely because the operator is small.
   *   The small-business exemption mainly affects the general website/AGB notice
   *   under § 36 VSBG; it does not prove that no other participation obligation exists.
   */
  obligatedToParticipate: boolean | ToBeResearched;

  /**
   * This complements the `preferredMentioning` field in LegalProjectFacts.
   * Together these two fields determine whether a consumer dispute resolution notice is included in the imprint.
   */
  mentioningRequired: boolean | ToBeResearched;

  notes?: string[];
};

/**
 * Derived facts about the audience.
 */
export type AudienceConclusions = Record<string, never>;

/**
 * Comprehensive derived facts about user-related features and their legal implications.
 */
export type UserRelatedFeaturesConclusions = {
  publicContactEmail: LegalTriple | ToBeResearched;
  publicContactPhone: LegalTriple | ToBeResearched;

  /**
   * Contact form configuration if present on the website.
   */
  contactForm:
    | (ContactFormConclusionConfig & LegalTriple)
    | ToBeResearched
    | null;

  /**
   * Other forms besides the main contact form.
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
  otherForms:
    | Array<(OtherFormConclusionConfig & LegalTriple) | ToBeResearched>
    | ToBeResearched
    | null;

  /**
   * User account system configuration if present.
   */
  userAccounts:
    | (UserAccountsConfigConclusion & LegalTriple)
    | ToBeResearched
    | null;

  /**
   * Newsletter configuration if present.
   */
  newsletter:
    | (NewsletterConfigConclusion & LegalTriple)
    | ToBeResearched
    | null;

  /**
   * Define if users can upload files.
   */
  uploads: (UploadsConfigConclusion & LegalTriple) | ToBeResearched | null;

  payments: LegalTriple | ToBeResearched | null;

  /**
   * Define if booking or scheduling exists.
   */
  booking: LegalTriple | ToBeResearched | null;

  /**
   * Live chat/messaging if present.
   */
  liveChat: LegalTriple | ToBeResearched | null;

  /**
   * Whether community features exist (comments, reviews, user-generated public content).
   */
  communityFeatures: LegalTriple | ToBeResearched | null;

  /**
   * Whether contracts are concluded directly on this website.
   * This includes purchases, bookings, service orders, subscriptions initiated and completed on the website.
   */
  contractsConcludedOnWebsite: LegalTriple | ToBeResearched | null;
};

export type ContactFormConclusionConfig = {
  /**
   * Where submissions are sent or stored.
   * Exact reference to another property.
   * Derived from the free texts property `submissionTarget` in legal project facts.
   */
  submissionTarget: string;

  /**
   * Retention period for submitted form data.
   * Examples:
   * - "6 months"
   * - "until request resolved"
   * - "[Provider Name] states that data is kept for 30 days"
   */
  retentionPeriod: string;
};

export type OtherFormConclusionConfig = {
  /**
   * Category of this form.
   */
  formCategory:
    | 'callback_request'
    | 'survey'
    | 'waitlist_signup'
    | 'support_request'
    | 'quote_request'
    | 'application_form'
    | 'contest_entry';

  /**
   * Retention period for this form's submissions.
   * Examples:
   * - "until campaign ends"
   * - "12 months"
   * - "[Provider Name] states that data is kept for 30 days"
   */
  retentionPeriod: string;
};

export type UserAccountsConfigConclusion = {
  /**
   * Auth provider or backend.
   * Exact reference to the used provider or implementation.
   */
  provider: string;
};

export type NewsletterConfigConclusion = {
  /**
   * Newsletter provider.
   * Exact reference to another property.
   */
  provider: string;

  /**
   * Exact retention period for newsletter subscriber data.
   * As researched for the public provider.
   * Examples:
   * - "[Provider Name] states that data is kept until unsubscribe"
   * - "[Provider Name] states that data is kept for 30 days"
   */
  retentionPeriod: string;
};

export type UploadsConfigConclusion = {
  /**
   * Exact reference to property of storage provider for uploads.
   */
  storageProvider: string[];

  /**
   * Retention period for uploaded data.
   * As concluded from legal project facts and/or research on the storage provider's policies.
   * Examples:
   * - "until user deletes"
   * - "90 days"
   * - "[Provider Name] states that data is kept for 30 days"
   */
  retentionPeriod: string;
};

export type LiveChatConfigConclusion = {
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

export type CustomImplementationsConclusions = {
  /**
   * Whether server logs are stored.
   */
  serverLogs: (ServerLogsConclusionFacts & LegalTriple) | null;
};

type ServerLogsConclusionFacts = {
  /**
   * Retention period for server logs.
   * Examples:
   * - "7 days"
   * - "30 days"
   * - "no fixed period; depends on hosting and infrastructure providers"
   */
  serverLogRetention?: string;
};

/**
 * Comprehensive third-party provider information with legal/compliance data.
 */
export type ThirdPartiesConclusions = {
  [providerKey: string]: ThirdPartyProviderConclusion;
};

export type ThirdPartyProviderConclusion = {
  /**
   * Official company name.
   */
  officialCompanyName: string;

  /**
   * Official company address.
   */
  officialCompanyAddress: string;

  /**
   * Legally relevant URLs (privacy policy, terms, etc.) to display in the relevant legal documents.
   * E.g. these links should appear in the privacy policy section about this provider.
   */
  legallyRelevantUrls: {
    [urlLabel: string]: string;
  };

  /**
   * Sub-services or features used from this provider.
   * `null` for disabled disabled or unused services/features.
   * Lower (more specific) settings always override higher (more general) settings.
   */
  subServicesOrFeatures: {
    [featureKey: string]: ThirdPartyFeatureConclusion | null;
  };
};

export type ThirdPartyFeatureConclusion = {
  /**
   * Name if not defined in base legal project facts, or distinct for some reason,
   * else leave undefined.
   */
  name?: string;

  /**
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
  recipientType:
    | 'processor'
    | 'independent_controller'
    | 'joint_controller'
    | DefinedPerChild
    | DefinedByParent
    | ToBeResearched;

  /**
   * Examples:
   * - "EU"
   * - "USA"
   */
  dataRecipientCountry: string | DefinedPerChild | DefinedByParent;

  /**
   * Transfer safeguards if outside EU/EEA.
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
   *
   * Do not guess here. Check the provider's legal/privacy/data-processing documentation.
   */
  transferSafeguard:
    | Array<
        | 'none'
        | 'adequacy_decision'
        | 'DPF'
        | 'SCC'
        | 'BCR'
        | 'consent'
        | DefinedPerChild
        | DefinedByParent
      >
    | DefinedPerChild
    | DefinedByParent
    | ToBeResearched;

  /**
   * Whether you have a DPA / AVV with this provider.
   * Only set to true if the provider acts as a processor (see field `recipientType`) and you have such an agreement in place.
   */
  hasDpa: boolean | DefinedPerChild | DefinedByParent | ToBeResearched;

  /**
   * Main legal bases relied upon for this activity.
   * These are the GDPR reasons you rely on to process personal data.
   * Use only the ones that actually apply to your website's real processing.
   * For a minimal normal website setup, `article_6_1_f` is often the starting point for delivery/security/logging.
   * Do NOT randomly pick multiple bases "just in case".
   *
   * Options:
   * - `art_6_1_a` - consent; user must first agree (e.g. optional tracking, newsletter where consent is the basis)
   * - `art_6_1_b` - contract / pre-contractual steps; needed to provide a requested service, account, booking, or order
   * - `art_6_1_c` - legal obligation; needed because a law requires it (e.g. statutory retention of invoices)
   * - `art_6_1_f` - legitimate interests; common for basic website operation, security, server logs, fraud prevention, some low-intrusion analytics depending on setup
   * - `art_9_2_a` - explicit consent for special-category data
   * - `art_9_2_b` - employment/social security context for special-category data
   * - `art_9_2_h` - healthcare/medical-care context for special-category data
   */
  legalBases:
    | Array<
        | 'article_6_1_a'
        | 'article_6_1_b'
        | 'article_6_1_c'
        | 'article_6_1_f'
        | 'article_9_2_a'
        | 'article_9_2_b'
        | 'article_9_2_h'
        | DefinedPerChild
        | DefinedByParent
        | ToBeResearched
      >
    | DefinedPerChild
    | DefinedByParent
    | ToBeResearched;

  activityType:
    | Array<
        | ProcessingActivityType
        | DefinedPerChild
        | DefinedByParent
        | ToBeResearched
      >
    | DefinedPerChild
    | DefinedByParent
    | ToBeResearched;

  /**
   * Main legal processing purposes for this activity.
   * These are the "why" statements that must be reflected in the final legal documents.
   */
  purposes:
    | Array<Purpose | DefinedPerChild | DefinedByParent | ToBeResearched>
    | DefinedPerChild
    | DefinedByParent
    | ToBeResearched;

  /**
   * Categories of personal data processed in this activity.
   * "Personal data" means information relating to an identified or identifiable natural person.
   * In practice, this often includes more than obvious things like names and emails.
   * For a website context, relevant examples can include:
   * - IP-related/server log data
   * - contact form content
   * - account/login data
   * - analytics/usage data linked to a user or device
   * - booking/payment/chat/upload/application data
   * - applicant/job application data
   * - financial/payment-related data
   * - health data or other special categories where relevant
   */
  personalDataCategories:
    | Array<
        | PersonalDataCategory
        | DefinedPerChild
        | DefinedByParent
        | ToBeResearched
      >
    | DefinedPerChild
    | DefinedByParent
    | ToBeResearched;

  dataProcessing?:
    | {
        [processingType: string]:
          | ConclusionDataProcessingFacts
          | null
          | DefinedPerChild
          | DefinedByParent
          | ToBeResearched;
      }
    | DefinedPerChild
    | DefinedByParent
    | ToBeResearched;

  /**
   * Nested (sub-)services or (sub-)features grouped into this service/feature.
   * `null` for disabled disabled or unused services/features.
   * Lower (more specific) settings always override higher (more general) settings.
   */
  subServicesOrFeatures?: {
    [featureKey: string]: ThirdPartyFeatureConclusion | null | ToBeResearched;
  };
};

export type ConclusionDataProcessingFacts = {
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
   * Whether it is technically necessary in your assessment.
   */
  technicallyNecessary: boolean;

  /**
   * Retention period or deletion logic for this concrete activity.
   * Describe, in plain language, how long the data is kept and what the deletion logic is.
   * This is not a strict enum field because retention often differs by data type.
   *
   * Good summaries usually answer:
   * - what is deleted quickly
   * - what is kept until purpose ends
   * - what is kept because the law requires it
   * - whether backups/logs have separate periods
   *
   * Examples:
   * - "Data is deleted when no longer necessary."
   * - "Invoices kept per tax law; support data deleted after resolution."
   * - "Server logs are processed by infrastructure providers and retained for a short period depending on the provider; no own long-term storage of logs"
   * - "Server logs are kept for 7 days"
   * - "contact inquiries until resolved"
   * - "no account data stored"
   * - "Newsletter data until unsubscribe"
   * - "Invoices according to statutory retention duties"
   */
  retention: string;

  // TODO legal: the structure might be inappropriate. not sure if all of this belongs into a features "dataProcessing" field.
  serverLogs?: boolean;
  remoteFonts?: string[];
  thirdPartyScripts?: string[];
  iframes?: string[];
  mapEmbeddings?: string[];
  socialEmbeddings?: string[];
  tagManager?: string;
  captcha?: string;
  ads?: string[];
  sessionReplay?: string[];
  heatMaps?: string[];
  abTesting?: string[];
  conversionTracking?: string[];
  affiliateTracking?: string[];
  trackingBeforeConsent?: boolean;
  cookies: string[];
  localStorage: string[];
  sessionStorage: string[];
  indexedDb: string[];

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
  serviceWorkerStorage: string[];
  otherStorage: string[];
};

/**
 * Which legal documents are required for this project.
 */
export type RequiredDocumentsConclusions = {
  /**
   * Whether an imprint/Impressum is required.
   */
  imprint: boolean;

  /**
   * Whether a privacy policy is required.
   */
  privacyPolicy: boolean;

  /**
   * Whether terms and conditions are required.
   */
  termsAndConditions: boolean;

  /**
   * Whether a data processing agreement (DPA/AVV) is required.
   */
  dataProcessingAgreement: boolean;

  /**
   * Whether a cookie policy is required.
   */
  cookiePolicy: boolean;

  /**
   * Whether an accessibility statement is required.
   */
  accessibilityStatement: boolean;

  /**
   * Optional additional documents based on specific use cases.
   */
  [documentKey: string]: boolean;
};

/**
 * Shared union type for all form-collected field identifiers.
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

export type LegalTriple = {
  activityType: ProcessingActivityType;
  purpose: Purpose;
  dataCategories: PersonalDataCategory[];
};

/**
 * High-level type of processing activity.
 *
 * Use this type to answer the question:
 * "In what processing context is the data being handled?"
 *
 * This is the section-structure dimension of your legal model.
 * A processing activity is the kind of thing that typically becomes its own
 * section or subsection in a privacy policy, because the purpose, data types,
 * recipients, legal bases, or retention logic differ enough to justify separate
 * explanation.
 *
 * Typical examples in a privacy policy are website delivery, contact requests,
 * newsletter handling, analytics, payments, or job applications.
 *
 * Legal background:
 * - GDPR Article 13 requires describing the purposes of processing and recipients
 *   of data, which in practice leads to structuring privacy policies by processing activities.
 * - GDPR transparency obligations (Articles 12-14) require clear and structured
 *   explanations of each processing operation.
 *
 * Options:
 * - `account_registration_and_login` - Creating user accounts, signing users in, maintaining login sessions, password reset flows, and related account-access management.
 * - `analytics`                      - Measuring, evaluating, or understanding user behavior, service usage, reach, or performance by means of analytics or statistics tools.
 * - `appointment_booking`            - Handling appointment, reservation, or booking workflows, including request intake, scheduling, confirmations, and booking administration.
 * - `community_operation`            - Operating community features such as forums, comment areas, groups, moderation workflows, or other multi-user interaction spaces.
 * - `contact_requests`               - Receiving and handling incoming contact initiated by the user, such as contact-form submissions or other first-contact requests.
 * - `content_delivery`               - Delivering website or app assets through infrastructure layers such as CDNs or comparable distribution services.
 * - `customer_communication`         - Ongoing communication with users, customers, or leads outside the initial contact-request step, such as support conversations, email exchanges, or chat-based communication.
 * - `dns_and_network_routing`        - Routing network traffic so requests reach the correct service, domain, or endpoint, including DNS-related request handling and comparable network-level delivery mechanics.
 * - `hosting_and_infrastructure`     - Running the technical infrastructure behind the service, including server hosting, database hosting, storage layers, and core backend operations.
 * - `job_applications`               - Receiving, reviewing, and handling applications from candidates in a recruiting or hiring process.
 * - `marketing`                      - Promoting services or offers, including campaign measurement where it belongs to marketing rather than neutral analytics.
 * - `newsletter`                     - Managing newsletter subscriptions and sending newsletter messages or related subscription-confirmation workflows.
 * - `payment_processing`             - Handling payments, invoicing, payment confirmation, charge handling, fraud checks closely tied to payments, and related financial transaction workflows.
 * - `service_provision`              - Delivering the actual contractual or requested service to the user, where the activity is neither purely technical infrastructure nor a narrower special case like payments or newsletters.
 * - `telephony`                      - Communicating or interacting with users by phone, including inbound or outbound calls and related call handling.
 * - `user_uploads_and_submissions`   - Receiving and processing materials actively submitted by users, such as documents, media files, forms, or other uploaded content.
 * - `website_delivery_and_security`  - Providing the website or app at a basic technical level and protecting it against abuse, attacks, or operational threats, such as logging, request handling, and security measures.
 */
export type ProcessingActivityType =
  | 'account_registration_and_login'
  | 'analytics'
  | 'appointment_booking'
  | 'community_operation'
  | 'contact_requests'
  | 'content_delivery'
  | 'customer_communication'
  | 'dns_and_network_routing'
  | 'hosting_and_infrastructure'
  | 'job_applications'
  | 'marketing'
  | 'newsletter'
  | 'payment_processing'
  | 'service_provision'
  | 'telephony'
  | 'user_uploads_and_submissions'
  | 'website_delivery_and_security';

/**
 * High-level category of personal data involved in a processing activity.
 *
 * Use this type to answer the question:
 * "What kind of personal data is being processed?"
 *
 * This is the data-type dimension of your legal model.
 * It is not the place to model product features, channels, or workflows.
 * For example, "chat", "newsletter", and "booking" are not data categories here.
 * They belong to processing activities or channels, while this type captures the
 * underlying kinds of data involved, such as contact details, payment details,
 * communication contents, or online identifiers.
 *
 * In privacy notices, these categories usually appear inside a section about a
 * concrete processing activity, together with the purpose, legal basis, recipients,
 * and storage period.
 *
 * Legal background:
 * - GDPR Article 13 and 14 require informing users about purposes of processing,
 *   recipients, and, where applicable, categories of personal data.
 * - GDPR Recital 30 explicitly mentions online identifiers (e.g. IP addresses,
 *   cookie identifiers) and location data as personal data.
 * - GDPR Article 9 defines special categories of personal data that require
 *   stricter handling (e.g. health data, biometric data).
 *
 * Options:
 * - `account_data`               - Data used to create, maintain, secure, or technically operate a user account or login, such as login identifiers, password hashes, account roles, or linked authentication-provider IDs.
 * - `applicant_employment_data`  - Data processed in a recruiting or hiring context, such as CVs, cover letters, references, certificates, qualifications, interview notes, or application status information.
 * - `communication_data`         - The content and communication-related metadata of messages exchanged with the user, such as emails, contact-form submissions, chat messages, support requests, and related timestamps or thread context.
 * - `contact_data`               - Contact details used to reach or identify a person in communications, such as email address, telephone number, postal address, or similar contact coordinates.
 * - `contract_transaction_data`  - Data about an order, booking, appointment, contract, or service transaction, such as booked services, appointment times, order status, contract status, or other performance-related information.
 * - `criminal_offence_data`      - Data relating to criminal convictions, offences, or related legal allegations. This category usually requires separate legal handling under GDPR Article 10.
 * - `device_technical_data`      - Technical information about the device or software environment, such as browser type, operating system, device model, app version, language settings, crash metadata, or similar telemetry.
 * - `identity_data`              - Core identifying data points about a person, such as name, customer number, username, or other identifiers that primarily describe who the person is.
 * - `location_data`              - Data about a person's location, whether approximate or precise, such as region derived from IP geolocation or more exact location information if the service processes it.
 * - `online_identifier_data`     - Online identifiers that can relate to a person or device, such as IP addresses, cookie IDs, session IDs, advertising IDs, or similar identifiers.
 * - `payment_billing_data`       - Data needed to process payments or billing, such as billing address, invoice details, payment status, tax-relevant billing fields, masked card information, payment tokens, or bank details where applicable.
 * - `special_category_data`      - Sensitive personal data under GDPR Article 9, such as health data, biometric data used for unique identification, genetic data, religious beliefs, political opinions, or sexual-orientation-related data.
 * - `usage_behavior_data`        - Data about how a user interacts with a website, app, or service, such as page views, clicks, feature usage, session behavior, event logs, or analytics interaction data.
 * - `user_content_data`          - Content provided or uploaded by the user, such as uploaded files, attachments, free-text entries, profile texts, comments, images, audio, or similar submitted material.
 */
export type PersonalDataCategory =
  | 'account_data'
  | 'applicant_employment_data'
  | 'communication_data'
  | 'contact_data'
  | 'contract_transaction_data'
  | 'criminal_offence_data'
  | 'device_technical_data'
  | 'identity_data'
  | 'location_data'
  | 'online_identifier_data'
  | 'payment_billing_data'
  | 'special_category_data'
  | 'usage_behavior_data'
  | 'user_content_data';

/**
 * Purpose of processing within a processing activity.
 *
 * Use this type to answer the question:
 * "Why is the data being processed?"
 *
 * This is the purpose dimension of your legal model.
 * It should capture the objective of the processing, not the technical tool,
 * not the UI channel, and not the broader activity label.
 *
 * Example:
 * - Activity: customer_communication
 * - Purpose: communication, support
 *
 * Example:
 * - Activity: website_delivery_and_security
 * - Purpose: website_delivery, security
 *
 * Legal background:
 * - GDPR Article 13(1)(c) requires specifying the purposes of processing.
 * - The purpose determines the legal basis (Article 6 GDPR) and limits how
 *   data may be used (purpose limitation principle, Article 5(1)(b)).
 *
 * Options:
 * - `account_management`         - Managing an existing user account after registration, such as profile maintenance, account settings, role administration, or account-related administration.
 * - `analytics`                  - Evaluating usage patterns, reach, service adoption, or behavior trends for statistical or product-understanding purposes.
 * - `application_management`     - Reviewing, organizing, evaluating, and progressing job applications and related recruiting workflows.
 * - `appointment_management`     - Scheduling, confirming, changing, organizing, or administrating appointments, reservations, or bookings.
 * - `authentication`             - Verifying that a person is the correct user or account holder, such as login checks, password verification, session validation, or comparable identity checks for access control.
 * - `billing`                    - Creating invoices, documenting charges, managing tax-relevant billing records, or otherwise handling the billing side of a transaction.
 * - `communication`              - Exchanging messages or information with the user, customer, applicant, or other data subject.
 * - `community_operation`        - Running community features and keeping them functional, usable, and governable as a shared user environment.
 * - `content_delivery`           - Delivering requested website or app content efficiently to the user's device.
 * - `contract_performance`       - Performing obligations arising from a contract or pre-contractual request.
 * - `error_monitoring`           - Detecting, diagnosing, and documenting technical errors, crashes, failures, or reliability issues.
 * - `fraud_prevention`           - Detecting, preventing, or investigating fraud, abuse, misuse, or suspicious behavior.
 * - `hosting`                    - Running or maintaining the technical hosting environment needed to make the service available.
 * - `legal_compliance`           - Complying with legal duties, such as tax, retention, or regulatory obligations.
 * - `marketing`                  - Advertising, promoting, or measuring promotional outreach for services or offers.
 * - `network_routing`            - Routing requests across DNS or network infrastructure.
 * - `newsletter_delivery`        - Sending newsletter emails or comparable subscription-based messages.
 * - `payment_processing`         - Executing and managing payments and related transactions.
 * - `performance_optimization`   - Improving speed, efficiency, or technical performance of the service.
 * - `security`                   - Protecting systems and data against unauthorized access or attacks.
 * - `service_provision`          - Providing the main requested service where no more specific purpose applies.
 * - `spam_prevention`            - Detecting and filtering spam or abusive submissions.
 * - `storage`                    - Persisting data so it remains available for lawful processing.
 * - `support`                    - Assisting users with issues, questions, or service problems.
 * - `telephony`                  - Handling voice-call-based communication.
 * - `website_delivery`           - Making the website or app technically accessible and usable.
 */
export type Purpose =
  | 'account_management'
  | 'analytics'
  | 'application_management'
  | 'appointment_management'
  | 'authentication'
  | 'billing'
  | 'communication'
  | 'community_operation'
  | 'content_delivery'
  | 'contract_performance'
  | 'error_monitoring'
  | 'fraud_prevention'
  | 'hosting'
  | 'legal_compliance'
  | 'marketing'
  | 'network_routing'
  | 'newsletter_delivery'
  | 'payment_processing'
  | 'performance_optimization'
  | 'security'
  | 'service_provision'
  | 'spam_prevention'
  | 'storage'
  | 'support'
  | 'telephony'
  | 'website_delivery';

export type ToBeResearched = 'TO_BE_RESEARCHED';
export type DefinedPerChild = 'DEFINED_PER_CHILD';
export type DefinedByParent = 'DEFINED_BY_PARENT';
export type AsInLegalProjectFacts = 'AS_IN_LEGAL_PROJECT_FACTS';

export const TO_BE_RESEARCHED: ToBeResearched = 'TO_BE_RESEARCHED';
export const DEFINED_PER_CHILD: DefinedPerChild = 'DEFINED_PER_CHILD';
export const DEFINED_BY_PARENT: DefinedByParent = 'DEFINED_BY_PARENT';
export const AS_IN_LEGAL_PROJECT_FACTS: AsInLegalProjectFacts =
  'AS_IN_LEGAL_PROJECT_FACTS';
