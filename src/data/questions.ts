import type { Question } from '../types'

const choices = (values: Record<string, string>) =>
  Object.entries(values).map(([id, text]) => ({ id, text }))

export const questions: Question[] = [
  {
    id: 'cmdb-001',
    number: 1,
    category: 'Dynamic CI Groups',
    type: 'multiple',
    prompt:
      'A CMDB Administrator has built Technology Management Service Offerings based on Dynamic CI Groups. Which groups are synced to member CIs from the related offering? (Choose two.)',
    choices: choices({
      A: 'Approval Group',
      B: 'Managed by Group',
      C: 'Support Group',
      D: 'Owned by Group',
    }),
    correctAnswers: ['B', 'C'],
    explanation:
      'Technical Service Offering synchronization with Dynamic CI Groups synchronizes relevant manually maintained group values, including Managed by group and Support group.',
  },
  {
    id: 'cmdb-002',
    number: 2,
    category: 'Service Mapping',
    type: 'matching',
    prompt:
      'Match each application service type to its best description. Select all four service types represented by the descriptions.',
    choices: choices({
      A: 'Service Mapping (Top-down): pattern-based and precise for mission-critical services',
      B: 'Tag-Based: suited to cloud, container, and virtual machine environments',
      C: 'Service Mapping (Connection Suggestion): uses fingerprinting for custom applications',
      D: 'Dynamic CI Group: uses filters and CMDB queries for simple groupings',
    }),
    correctAnswers: ['A', 'B', 'C', 'D'],
    explanation:
      'The source order is Top-down, Tag-Based, Connection Suggestion, then Dynamic CI Group.',
  },
  {
    id: 'cmdb-003',
    number: 3,
    category: 'CI Class Manager',
    type: 'single',
    prompt:
      'Which roles are minimally needed to add a custom CI class?',
    choices: choices({
      A: 'cmdb_inst_admin and personalize_form',
      B: 'itil_admin and personalize_form',
      C: 'data_classification_admin and personalize_dictionary',
      D: 'sn_cmdb_admin and personalize_dictionary',
    }),
    correctAnswers: ['D'],
    explanation:
      'Creating or extending a CI class requires CMDB administration access and dictionary metadata privileges.',
  },
  {
    id: 'cmdb-004',
    number: 4,
    category: 'Relationships',
    type: 'single',
    prompt: 'What is the relationship between an application and a server?',
    choices: choices({
      A: 'Application > Used by::Uses > Server',
      B: 'Application > Uses::Used by > Server',
      C: 'Application > Runs::Runs On > Server',
      D: 'Application > Runs on::Runs > Server',
    }),
    correctAnswers: ['D'],
    explanation:
      'From parent to child, the relationship reads Application runs on Server.',
  },
  {
    id: 'cmdb-005',
    number: 5,
    category: 'Asset and CI',
    type: 'single',
    prompt:
      'How should a Configuration Analyst automatically synchronize the Assigned to value from a Computer CI to its related Asset?',
    choices: choices({
      A: 'Use the Asset-CI Field Mapping module',
      B: 'Hide the Asset field and create a dot-walked replacement field',
      C: 'Create a scripted business rule on the Computer table',
    }),
    correctAnswers: ['A'],
    explanation:
      'Asset-CI Field Mapping is the built-in mechanism for synchronizing values between related CI and Asset records.',
  },
  {
    id: 'cmdb-006',
    number: 6,
    category: 'CI Class Manager',
    type: 'multiple',
    prompt:
      'What are recommended practices when creating an IoT Sensor CI class? (Choose two.)',
    choices: choices({
      A: 'Add the class under an appropriate parent class',
      B: 'Modify an existing class',
      C: 'Install or update CMDB CI Class Models and verify the class does not already exist',
      D: 'Delete an unused class and replace it',
    }),
    correctAnswers: ['A', 'C'],
    explanation:
      'Check whether a suitable class already exists, then create a child under the correct parent only when needed.',
  },
  {
    id: 'cmdb-007',
    number: 7,
    category: 'Task Integration',
    type: 'single',
    prompt:
      'Which base system field is populated when a CI with a Change Group is selected on a Change form?',
    choices: choices({
      A: 'Managed by group',
      B: 'Approval group',
      C: 'Assignment group',
      D: 'Change group',
    }),
    correctAnswers: ['C'],
    explanation:
      'The CI Change group is used to populate Assignment group on the Change form. The source wording mentions Incident, but its surrounding context describes Change behavior.',
    needsReview: true,
  },
  {
    id: 'cmdb-008',
    number: 8,
    category: 'Relationships',
    type: 'single',
    prompt:
      'What relationship exists between the Application Server table and Application table when servers host multiple applications and applications can span servers?',
    choices: choices({
      A: 'Many-to-one',
      B: 'One-to-one',
      C: 'One-to-many',
      D: 'Many-to-many',
    }),
    correctAnswers: ['D'],
    explanation:
      'Each server can host several applications, while an application can run across several servers.',
  },
  {
    id: 'cmdb-009',
    number: 9,
    category: 'CI Class Manager',
    type: 'single',
    prompt:
      'Which Attributes tab identifies attributes created specifically for the selected Windows Server class?',
    choices: choices({ A: 'All', B: 'Derived', C: 'Added', D: 'Child' }),
    correctAnswers: ['C'],
    explanation:
      'Added shows attributes created directly on the selected class rather than inherited attributes.',
  },
  {
    id: 'cmdb-010',
    number: 10,
    category: 'Asset and CI',
    type: 'multiple',
    prompt:
      'How does an Asset Manager ensure Asset and CI records synchronize automatically? (Choose two.)',
    choices: choices({
      A: 'Ensure one-to-one physical mapping between every Asset and CI',
      B: 'Run scheduled jobs only outside business hours',
      C: 'Ensure the business rule updating Asset fields from CI changes is active',
      D: 'Ensure the business rule updating CI fields from Asset changes is active',
    }),
    correctAnswers: ['C', 'D'],
    explanation:
      'Both directional synchronization business rules must be active.',
  },
  {
    id: 'cmdb-011',
    number: 11,
    category: 'Task Integration',
    type: 'single',
    prompt:
      'Which Incident field is populated after selecting a CI that references an appropriate Support group?',
    choices: choices({
      A: 'Support Group',
      B: 'Approval Group',
      C: 'Change Group',
      D: 'Assignment Group',
      E: 'Managed by Group',
    }),
    correctAnswers: ['D'],
    explanation:
      'A CI Support group can populate the Incident Assignment group.',
  },
  {
    id: 'cmdb-012',
    number: 12,
    category: 'CI Class Manager',
    type: 'multiple',
    prompt:
      'Which approaches align with best practice for ingesting custom CIs while minimizing technical debt? (Choose two.)',
    choices: choices({
      A: 'Repurpose a base CI class and rename its attributes',
      B: 'Extend an existing CI class for the custom attributes',
      C: 'Install or upgrade CMDB CI Class Models to find a suitable existing class',
      D: 'Extend an existing Asset class for the custom CI attributes',
    }),
    correctAnswers: ['B', 'C'],
    explanation:
      'Find a suitable standard class first; otherwise extend an appropriate CI class rather than repurposing base or Asset classes.',
  },
  {
    id: 'cmdb-013',
    number: 13,
    category: 'Principal Classes',
    type: 'single',
    prompt: 'Where does an administrator designate Principal Classes?',
    choices: choices({
      A: 'CI Class Manager',
      B: 'CMDB Workspace',
      C: 'CMDB Data Manager',
      D: 'System Properties',
    }),
    correctAnswers: ['A'],
    explanation:
      'Principal Class designation is configured in CI Class Manager.',
  },
  {
    id: 'cmdb-014',
    number: 14,
    category: 'IRE',
    type: 'multiple',
    prompt:
      'Where can a Configuration Manager view and configure identification rules for a class? (Choose two.)',
    choices: choices({
      A: 'CI Identifiers module',
      B: 'API Integrations',
      C: 'IRE Application',
      D: 'CI Class Manager',
    }),
    correctAnswers: ['A', 'D'],
    explanation:
      'Rules are available through CI Identifiers and from the class context in CI Class Manager.',
  },
  {
    id: 'cmdb-015',
    number: 15,
    category: 'Principal Classes',
    type: 'single',
    prompt:
      'Which CI Class Manager checkbox limits task CI references to relevant managed classes?',
    choices: choices({
      A: 'Principal Class',
      B: 'Independent',
      C: 'Main Record',
      D: 'Extensible',
    }),
    correctAnswers: ['A'],
    explanation:
      'Principal Class marks a class as relevant for CI references on Incident, Problem, and Change.',
  },
  {
    id: 'cmdb-016',
    number: 16,
    category: 'CMDB 360',
    type: 'single',
    prompt: 'Which property enables CMDB 360 / Multisource CMDB?',
    choices: choices({
      A: 'glide.identification_engine.multisource_enabled',
      B: 'glide.identification_engine.multisource_query.max.limit',
      C: 'glide.identification_engine.multisource_non_cmdb_ci_enabled',
      D: 'glide.identification_engine.multisource_cmdb_ci_enabled',
    }),
    correctAnswers: ['A'],
    explanation:
      'The multisource_enabled property is the primary switch for this functionality.',
  },
  {
    id: 'cmdb-017',
    number: 17,
    category: 'CI Class Manager',
    type: 'single',
    prompt:
      'Which central location collects class attributes, IRE rules, and suggested relationships?',
    choices: choices({
      A: 'CI Class Manager',
      B: 'CI Identifiers',
      C: 'CMDB Workspace',
      D: 'CMDB Data Manager',
    }),
    correctAnswers: ['A'],
    explanation:
      'CI Class Manager is the central class-level location for this metadata.',
  },
  {
    id: 'cmdb-018',
    number: 18,
    category: 'IRE',
    type: 'single',
    prompt:
      'How are Health Inclusion Rules shown under a CI class utilized by IRE?',
    choices: choices({
      A: 'To narrow the scope of CIs included in the identification process',
      B: 'To reduce data ingested into the CMDB',
      C: 'To reconcile specific attributes based on data sources',
    }),
    correctAnswers: ['A'],
    explanation:
      'The source marks A as the best available answer, while noting that Health Inclusion Rules primarily scope CMDB Health calculations.',
    needsReview: true,
  },
  {
    id: 'cmdb-019',
    number: 19,
    category: 'CMDB Groups',
    type: 'multiple',
    prompt: 'Which methods can define CI membership in CMDB groups? (Choose two.)',
    choices: choices({
      A: 'Tag-based queries',
      B: 'Scripted queries',
      C: 'Saved queries',
      D: 'Encoded queries',
    }),
    correctAnswers: ['C', 'D'],
    explanation:
      'CMDB groups support query-based membership using saved and encoded queries.',
  },
  {
    id: 'cmdb-020',
    number: 20,
    category: 'Dynamic CI Groups',
    type: 'single',
    prompt:
      'CI Class Manager sets Managed by Group to Enterprise IT Services, while a Technical Service Offering sets it to Windows Support. What value is synchronized to the CIs?',
    choices: choices({
      A: 'Windows Support',
      B: 'Enterprise IT Services',
      C: 'Change Management Team',
    }),
    correctAnswers: ['A'],
    explanation:
      'The Technical Service Offering value takes precedence for the synchronized group value.',
  },
  {
    id: 'cmdb-021',
    number: 21,
    category: 'Dynamic CI Groups',
    type: 'multiple',
    prompt:
      'Which group values are automatically synchronized using Technical Service Offerings and Dynamic CI Groups? (Choose two.)',
    choices: choices({
      A: 'Change group',
      B: 'Approval group',
      C: 'Support group',
      D: 'CMDB group',
    }),
    correctAnswers: ['A', 'C'],
    explanation:
      'Change group and Support group are synchronized; Managed by group also can be, but is not an offered choice.',
  },
  {
    id: 'cmdb-022',
    number: 22,
    category: 'CI Class Manager',
    type: 'single',
    prompt:
      'Which action adds a new CI class and integrates it properly with the existing CMDB structure?',
    choices: choices({
      A: 'Define it through Service Catalog without CI Class Manager',
      B: 'Edit an existing class and add equipment-specific fields',
      C: 'Create it in CI Class Manager and inherit from a relevant parent class',
      D: 'Create it without inheritance so classes remain independent',
    }),
    correctAnswers: ['C'],
    explanation:
      'New classes should be modeled in CI Class Manager under the correct parent to inherit the appropriate structure and behavior.',
  },
]
