import type { Question } from '../types'

const overrides: Record<string, Partial<Question>> = {
  'source-t2-004': {
    type: 'multiple',
    prompt:
      'Which Dynamic Rule Types are available in the Create Reconciliation Rule wizard? (Choose two.)',
    choices: [
      { id: 'A', text: 'Last Updated' },
      { id: 'B', text: 'Smallest Value' },
      { id: 'C', text: 'Last Created' },
      { id: 'D', text: 'Most Reported' },
    ],
    correctAnswers: ['B', 'D'],
  },
  'source-t2-015': {
    type: 'single',
    prompt:
      'A CMDB Administrator customized a Service Graph Connector script transform. What happens during a later upgrade if the default script transform is updated?',
    choices: [
      {
        id: 'A',
        text: 'A skipped change is created and the customized script transform is not changed',
      },
      { id: 'B', text: 'The Service Graph Connector upgrade refuses to start' },
      { id: 'C', text: 'The upgrade stops and reports an error' },
    ],
    correctAnswers: ['A'],
  },
  'source-t2-025': {
    type: 'single',
    prompt:
      'The Windows Server class uses a most-reported dynamic reconciliation rule for Disk Space. Tivoli reports 75 GB, ServiceNow 75 GB, LANDesk 50 GB, and Altiris 80 GB. Which value is stored?',
    choices: [
      { id: 'A', text: '80 GB' },
      { id: 'B', text: '75 GB' },
      { id: 'C', text: '50 GB' },
    ],
    correctAnswers: ['B'],
  },
  'source-t3-041': {
    type: 'single',
    prompt:
      'Which ServiceNow modules can configure recommended Support Group and Managed By Group fields and generate tasks when those fields are missing from Linux servers?',
    choices: [
      { id: 'A', text: 'CMDB Workspace and Scheduled Jobs' },
      { id: 'B', text: 'Technical Service Offerings and Dynamic CI Groups' },
      { id: 'C', text: 'Dynamic CI Groups and CMDB Groups' },
      { id: 'D', text: 'CI Class Manager and Health Preferences' },
    ],
    correctAnswers: ['D'],
  },
  'source-t3-043': {
    type: 'single',
    prompt:
      'What is the default duration used by the Staleness metric on the CMDB Health Dashboard Correctness Scorecard?',
    choices: [
      { id: 'A', text: '30 days' },
      { id: 'B', text: '24 hours' },
      { id: 'C', text: '7 days' },
      { id: 'D', text: '60 days' },
    ],
    correctAnswers: ['D'],
  },
}

const matchingPrompts: Record<string, string> = {
  'source-t2-012':
    'Match each CMDB ingestion architecture to the appropriate management tool.',
  'source-t2-017':
    'Match each ServiceNow product to the capability it provides.',
  'source-t3-002':
    'Match each CMDB Health Dashboard metric to its description.',
  'source-t3-018':
    'Match each Configuration Management role to its job description.',
  'source-t3-019':
    'Match each duplicate-CI management feature to its outcome.',
  'source-t3-032':
    'Match each CMDB Health metric to its definition.',
  'source-t3-033':
    'Match each CMDB Health KPI to the metric associated with it.',
  'source-t4-001':
    'A manufacturing organization has implemented Incident Management in ServiceNow and wants to integrate additional products to enhance its functionality.\nDrag each ServiceNow product to the value it brings to supporting Incident Management.',
  'source-t5-005':
    'Some steps need to be taken to transition from using different status attributes in the CMDB to life cycle objects.\nDrag and drop the objectives/attributes to the description.',
  'source-t5-016':
    'A CMDB Owner starts on the CSDM journey and needs to become familiar with the CSDM domains.\nDrag the CMDB objects to the correct CSDM domains.',
  'source-t5-022':
    'Given a list of Service types in the platform. Drag the appropriate service to its definition.',
  'source-t5-023':
    'Match each CSDM domain to the roles that make up its governance team.',
  'source-t5-024':
    'An Enterprise Architect needs to help the CMDB owner understand the benefits of CSDM.\nDrag the CSDM domains to the respective benefits.',
}

export function applyQuestionOverrides(question: Question): Question {
  const override = overrides[question.id]
  const matchingPrompt = matchingPrompts[question.id]
  return {
    ...question,
    ...(matchingPrompt ? { prompt: matchingPrompt } : {}),
    ...override,
  }
}
