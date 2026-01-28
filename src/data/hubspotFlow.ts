import type { FlowNode, FlowEdge } from '../types';

export const hubspotNodes: FlowNode[] = [
  // Lead Sources
  {
    id: 'hs-lead-source',
    type: 'custom',
    position: { x: 0, y: 350 },
    data: {
      label: 'Lead Sources',
      owner: 'System',
      status: 'confirmed',
      notes: [],
      description: 'Leads from forms, imports, integrations',
    },
  },

  // Contact Creation
  {
    id: 'hs-contact',
    type: 'custom',
    position: { x: 300, y: 350 },
    data: {
      label: 'Contact Record',
      owner: 'System',
      status: 'confirmed',
      notes: [],
      description: 'Contact created/updated in HubSpot',
    },
  },

  // BDC Tasks
  {
    id: 'hs-bdc-task',
    type: 'custom',
    position: { x: 600, y: 150 },
    data: {
      label: 'BDC Task Queue',
      owner: 'BDC',
      status: 'pending',
      notes: [],
      description: 'Tasks assigned to BDC for outreach',
    },
  },
  {
    id: 'hs-bdc-call',
    type: 'custom',
    position: { x: 600, y: 450 },
    data: {
      label: 'BDC Call Activity',
      owner: 'BDC',
      status: 'pending',
      notes: [],
      description: 'Logged call activities',
    },
  },

  // Qualification Outcome
  {
    id: 'hs-qualified',
    type: 'custom',
    position: { x: 950, y: 250 },
    data: {
      label: 'Qualified Lead',
      owner: 'BDC',
      status: 'open-question',
      notes: [],
      description: 'Lead meets qualification criteria',
    },
  },
  {
    id: 'hs-dq',
    type: 'custom',
    position: { x: 950, y: 550 },
    data: {
      label: 'Disqualified',
      owner: 'BDC',
      status: 'pending',
      notes: [],
      description: 'Lead does not meet criteria',
    },
  },

  // Meeting Scheduled
  {
    id: 'hs-meeting-scheduled',
    type: 'custom',
    position: { x: 1300, y: 100 },
    data: {
      label: 'Meeting Scheduled',
      owner: 'BDC',
      status: 'open-question',
      notes: [],
      description: 'HubSpot Meeting object created',
    },
  },

  // Deal Creation
  {
    id: 'hs-deal-create',
    type: 'custom',
    position: { x: 1300, y: 350 },
    data: {
      label: 'Deal Created',
      owner: 'System/BDC',
      status: 'open-question',
      notes: [],
      description: 'When to create deal? At meeting scheduled or qualification?',
    },
  },

  // RVP Pipeline
  {
    id: 'hs-rvp-assigned',
    type: 'custom',
    position: { x: 1650, y: 100 },
    data: {
      label: 'RVP Assigned',
      owner: 'RVP',
      status: 'pending',
      notes: [],
      description: 'Deal assigned to RVP for follow-up',
    },
  },
  {
    id: 'hs-meeting-completed',
    type: 'custom',
    position: { x: 1650, y: 350 },
    data: {
      label: 'Meeting Completed',
      owner: 'RVP',
      status: 'pending',
      notes: [],
      description: 'Meeting outcome logged',
    },
  },

  // Deal Outcomes
  {
    id: 'hs-deal-won',
    type: 'custom',
    position: { x: 2000, y: 0 },
    data: {
      label: 'Deal Won',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Closed Won stage',
    },
  },
  {
    id: 'hs-deal-lost',
    type: 'custom',
    position: { x: 2000, y: 220 },
    data: {
      label: 'Deal Lost',
      owner: 'RVP',
      status: 'pending',
      notes: [],
      description: 'Closed Lost stage - capture reason',
    },
  },
  {
    id: 'hs-deal-nurture',
    type: 'custom',
    position: { x: 2000, y: 440 },
    data: {
      label: 'Nurture/Follow-up',
      owner: 'System',
      status: 'open-question',
      notes: [],
      description: 'Re-engagement workflow',
    },
  },

  // Post-Sale
  {
    id: 'hs-admin-workflow',
    type: 'custom',
    position: { x: 2350, y: 0 },
    data: {
      label: 'Admin Workflow',
      owner: 'Admin',
      status: 'pending',
      notes: [],
      description: 'Automated tasks for paperwork',
    },
  },
];

export const hubspotEdges: FlowEdge[] = [
  // Source to Contact
  { id: 'e-hs-source-contact', source: 'hs-lead-source', target: 'hs-contact', animated: true },

  // Contact to BDC
  { id: 'e-hs-contact-task', source: 'hs-contact', target: 'hs-bdc-task' },
  { id: 'e-hs-task-call', source: 'hs-bdc-task', target: 'hs-bdc-call' },

  // BDC to Qualification
  { id: 'e-hs-call-qualified', source: 'hs-bdc-call', target: 'hs-qualified' },
  { id: 'e-hs-call-dq', source: 'hs-bdc-call', target: 'hs-dq' },

  // Qualified to Meeting/Deal
  { id: 'e-hs-qual-meeting', source: 'hs-qualified', target: 'hs-meeting-scheduled' },
  { id: 'e-hs-qual-deal', source: 'hs-qualified', target: 'hs-deal-create' },
  { id: 'e-hs-meeting-deal', source: 'hs-meeting-scheduled', target: 'hs-deal-create', style: { strokeDasharray: '5,5' } },

  // Deal to RVP
  { id: 'e-hs-deal-rvp', source: 'hs-deal-create', target: 'hs-rvp-assigned', animated: true },
  { id: 'e-hs-meeting-rvp', source: 'hs-meeting-scheduled', target: 'hs-rvp-assigned' },

  // RVP Flow
  { id: 'e-hs-rvp-complete', source: 'hs-rvp-assigned', target: 'hs-meeting-completed' },

  // Meeting Outcomes
  { id: 'e-hs-complete-won', source: 'hs-meeting-completed', target: 'hs-deal-won' },
  { id: 'e-hs-complete-lost', source: 'hs-meeting-completed', target: 'hs-deal-lost' },
  { id: 'e-hs-complete-nurture', source: 'hs-meeting-completed', target: 'hs-deal-nurture' },

  // Post-sale
  { id: 'e-hs-won-admin', source: 'hs-deal-won', target: 'hs-admin-workflow', animated: true },

  // Nurture loop
  { id: 'e-hs-nurture-task', source: 'hs-deal-nurture', target: 'hs-bdc-task', style: { strokeDasharray: '5,5' } },
  { id: 'e-hs-lost-nurture', source: 'hs-deal-lost', target: 'hs-deal-nurture', style: { strokeDasharray: '5,5' } },
];
