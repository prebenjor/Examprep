import { describe, expect, it } from 'vitest'
import { questions } from './questions'
import { getMatchPairs } from '../lib/quiz'

describe('question presentation data', () => {
  it('contains 192 text-first questions', () => {
    expect(questions).toHaveLength(192)
    expect(questions.every((question) => question.prompt.trim().length > 0)).toBe(true)
  })

  it('does not leave OCR fallback reveal buttons as answer choices', () => {
    const invalid = questions.filter(
      (question) =>
        getMatchPairs(question).length === 0 &&
        question.choices.some((choice) => choice.id === 'REVEAL'),
    )
    expect(invalid).toEqual([])
  })

  it('provides actual pairs for every matching question', () => {
    const invalid = questions.filter(
      (question) => question.type === 'matching' && getMatchPairs(question).length < 2,
    )
    expect(invalid).toEqual([])
  })

  it('keeps SCCM Service Graph Connector and Usage Metering Spoke as separate choices', () => {
    const question = questions.find((item) => item.id === 'source-t2-029')
    expect(question?.choices).toEqual(expect.arrayContaining([
      { id: 'C', text: 'SCCM Service Graph Connector' },
      { id: 'D', text: 'SCCM Usage Metering Spoke' },
    ]))
    expect(question?.correctAnswers).toEqual(['C'])
  })

  it('uses corrected Service Graph Connector Central wording and CMDB Workspace choice', () => {
    const question = questions.find((item) => item.id === 'source-t2-031')
    expect(question?.prompt).toContain('A CMDB Data Owner has requested better insights')
    expect(question?.prompt).toContain('tab available?')
    expect(question?.choices).toEqual(expect.arrayContaining([
      { id: 'B', text: 'CMDB Workspace' },
    ]))
    expect(question?.correctAnswers).toEqual(['B'])
  })

  it('keeps Question 70 Correctness and Compliance as separate choices', () => {
    const question = questions.find((item) => item.id === 'source-t3-001')
    expect(question?.choices).toEqual(expect.arrayContaining([
      { id: 'A', text: 'Correctness' },
      { id: 'B', text: 'Compliance' },
      { id: 'C', text: 'Completeness' },
    ]))
    expect(question?.correctAnswers).toEqual(['A'])
  })

  it('preserves Question 71 drag/drop source wording', () => {
    const question = questions.find((item) => item.id === 'source-t3-002')
    expect(question?.matchPairs).toEqual([
      {
        id: 'M1',
        item: 'Audits',
        target: 'Use these to compare actual values with expected values',
      },
      {
        id: 'M2',
        item: 'Duplicate CIs',
        target: 'Use of these should be minimized',
      },
      {
        id: 'M3',
        item: 'Required fields',
        target: 'Certain attribute values are not set, or relationships are missing',
      },
      {
        id: 'M4',
        item: 'Recommended fields',
        target: 'Preferable for them to be populated, as they could be useful in troubleshooting issues',
      },
      {
        id: 'M5',
        item: 'Stale CIs',
        target: 'Have not been updated and may be outdated',
      },
      {
        id: 'M6',
        item: 'Orphan CIs',
        target: 'Detected during identification and reconciliation and have associated base system remediation tools',
      },
    ])
  })

  it('uses corrected Question 72 duplicate cleanup wording', () => {
    const question = questions.find((item) => item.id === 'source-t3-003')
    expect(question?.prompt).toContain('A CMDB Administrator is asked to clean up')
    expect(question?.prompt).not.toContain('asked 10 clean up')
  })

  it('uses corrected Question 73 latest IP address wording', () => {
    const question = questions.find((item) => item.id === 'source-t3-004')
    expect(question?.prompt).toContain('latest IP address')
    expect(question?.prompt).not.toContain('l210$1 IP address')
  })

  it('uses corrected Question 74 Data Manager wording', () => {
    const question = questions.find((item) => item.id === 'source-t3-005')
    expect(question?.prompt).toContain('take in Data Manager?')
    expect(question?.prompt).not.toContain('Data Manages')
    expect(question?.prompt).not.toMatch(/\nR$/)
  })

  it('uses corrected Question 78 playbook wording', () => {
    const question = questions.find((item) => item.id === 'source-t3-009')
    expect(question?.prompt).toContain('serial numbers')
    expect(question?.choices).toEqual(expect.arrayContaining([
      { id: 'C', text: 'CMDB Data Foundations Dashboard Playbooks' },
    ]))
    expect(question?.choices.some((choice) => choice.text.includes('CSDB'))).toBe(false)
    expect(question?.correctAnswers).toEqual(['C'])
  })

  it('uses corrected Question 79 data quality choices', () => {
    const question = questions.find((item) => item.id === 'source-t3-010')
    expect(question?.choices).toEqual(expect.arrayContaining([
      { id: 'B', text: 'Stale CIs' },
      { id: 'E', text: 'Upgraded CIs' },
    ]))
    expect(question?.correctAnswers).toEqual(['B', 'C'])
  })

  it('keeps Question 80 Orphan metric choices separate', () => {
    const question = questions.find((item) => item.id === 'source-t3-011')
    expect(question?.choices).toEqual(expect.arrayContaining([
      {
        id: 'C',
        text: 'The Orphan metric has a Health Inclusion rule configured for the Server class.',
      },
      {
        id: 'D',
        text: 'The Orphan metric has a CMDB Group configured for the Server class.',
      },
    ]))
    expect(question?.correctAnswers).toEqual(['C'])
  })

  it('uses the provided Question 87 role matching answers', () => {
    const question = questions.find((item) => item.id === 'source-t3-018')
    expect(question?.matchPairs).toEqual([
      {
        id: 'M1',
        item: 'CMDB Process Owner',
        target: 'read-only CMDB access',
      },
      {
        id: 'M2',
        item: 'Service or Product Owner',
        target: 'accountable for portfolio lifecycle',
      },
      {
        id: 'M3',
        item: 'CI Analyst',
        target: 'manages assigned CI tables and tasks',
      },
      {
        id: 'M4',
        item: 'Configuration Manager/CMDB Admin',
        target: 'highest CMDB privileges',
      },
    ])
  })

  it('keeps Question 96 CMDB Data Manager and De-duplication Templates separate', () => {
    const question = questions.find((item) => item.id === 'source-t3-027')
    expect(question?.choices).toEqual(expect.arrayContaining([
      { id: 'C', text: 'CMDB Data Manager' },
      { id: 'D', text: 'De-duplication Templates' },
    ]))
    expect(question?.correctAnswers).toEqual(['C'])
  })

  it('preserves Question 128 Incident Management matching source wording', () => {
    const question = questions.find((item) => item.id === 'source-t4-001')
    expect(question?.prompt).toContain('integrate additional products to enhance its functionality')
    expect(question?.matchPairs).toEqual([
      {
        id: 'M1',
        item: 'Hardware Asset Management',
        target: 'Delivers asset actions and events for the management and maintenance of assets during incidents',
      },
      {
        id: 'M2',
        item: 'Risk Management',
        target: 'Supplies critical IT and financial risk data, enabling the team to assess the broader impact of incidents on business operations',
      },
      {
        id: 'M3',
        item: 'Discovery',
        target: 'Offers detailed operational-level data on hardware and application infrastructure to improve incident resolution',
      },
      {
        id: 'M4',
        item: 'Service Portfolio Management',
        target: 'Provides life cycle information about services, helping to align incidents with the status and history of services',
      },
    ])
  })

  it('uses corrected Question 130 Change Management wording', () => {
    const question = questions.find((item) => item.id === 'source-t4-003')
    expect(question?.prompt).toContain('Change Management')
    expect(question?.prompt).not.toContain('Chinge Management')
  })

  it('uses corrected Question 135 relationship option wording', () => {
    const question = questions.find((item) => item.id === 'source-t4-008')
    expect(question?.choices).toEqual(expect.arrayContaining([
      { id: 'C', text: "Set the relationship to 'Up to 2nd level relationships.'" },
    ]))
    expect(question?.choices.some((choice) => choice.text.includes('Up to@nd'))).toBe(false)
    expect(question?.correctAnswers).toEqual(['A', 'B'])
  })

  it('labels Question 148 as choose two', () => {
    const question = questions.find((item) => item.id === 'source-t4-021')
    expect(question?.prompt).toContain('(Choose two.)')
    expect(question?.type).toBe('multiple')
    expect(question?.correctAnswers).toEqual(['A', 'C'])
  })

  it('uses corrected Question 151 Unified Map option wording', () => {
    const question = questions.find((item) => item.id === 'source-t4-024')
    expect(question?.choices).toEqual(expect.arrayContaining([
      { id: 'C', text: 'Unified Map' },
    ]))
    expect(question?.correctAnswers).toEqual(['C'])
  })

  it('preserves Question 157 life-cycle matching source wording', () => {
    const question = questions.find((item) => item.id === 'source-t5-005')
    expect(question?.prompt).toContain('transition from using different status attributes')
    expect(question?.matchPairs).toEqual([
      {
        id: 'M1',
        item: 'life_cycle_mapping',
        target: 'This table is pre-populated with mappings for legacy status value based on its table, to the best-fit CSDM life-cycle value pair.',
      },
      {
        id: 'M2',
        item: 'life_cycle_stage',
        target: 'This is a record attribute that reflects a meta-level state of the record life cycle.',
      },
      {
        id: 'M3',
        item: 'life_cycle_stage_status',
        target: 'This is a record attribute that reflects a sub-level state of the record life cycle.',
      },
      {
        id: 'M4',
        item: 'life_cycle_object',
        target: 'This table uses the type of CI (hardware, document, logical, etc.) to determine which sub-level life cycle state values are available.',
      },
    ])
  })
})
