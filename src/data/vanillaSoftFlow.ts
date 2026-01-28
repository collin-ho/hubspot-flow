import type { FlowNode, FlowEdge, StageNode } from '../types';
import type { GroupNodeData } from '../components/GroupNode';
import type { Node } from '@xyflow/react';

// ============================================
// LAYOUT CONFIGURATION
// ============================================
const STAGE_WIDTH = 420;          // Horizontal spacing between stages
const STAGE_Y = 0;                // Y position for stage headers
const CHILD_START_Y = 120;        // Where content starts below stage headers
const NODE_HEIGHT = 95;           // Approximate height of a node
const NODE_GAP = 15;              // Gap between nodes inside a group
const GROUP_PADDING = 20;         // Padding inside group boxes
const GROUP_GAP = 40;             // Gap between group boxes
const NODE_WIDTH = 280;           // Width of content nodes
const GROUP_WIDTH = 360;          // Group box width

// Calculate stage X positions
const stageX = (index: number) => index * STAGE_WIDTH;

// Calculate height for a group with N nodes
const groupHeight = (nodeCount: number) =>
  nodeCount * NODE_HEIGHT + (nodeCount - 1) * NODE_GAP + GROUP_PADDING * 2 + 30; // +30 for label

// ============================================
// STAGE DEFINITIONS (Header row)
// ============================================
export const stageNodes: StageNode[] = [
  {
    id: 'stage-sources',
    type: 'stage',
    position: { x: stageX(0), y: STAGE_Y },
    data: { label: 'Lead Sources', subtitle: 'Entry Point', color: 'slate' },
  },
  {
    id: 'stage-queue',
    type: 'stage',
    position: { x: stageX(1), y: STAGE_Y },
    data: { label: 'Queue', subtitle: 'Unworked', color: 'slate' },
  },
  {
    id: 'stage-bdc',
    type: 'stage',
    position: { x: stageX(2), y: STAGE_Y },
    data: { label: 'BDC Calling', subtitle: 'Outreach', color: 'slate' },
  },
  {
    id: 'stage-outcomes',
    type: 'stage',
    position: { x: stageX(3), y: STAGE_Y },
    data: { label: 'Call Outcomes', subtitle: 'What happened?', color: 'slate' },
  },
  {
    id: 'stage-meetings',
    type: 'stage',
    position: { x: stageX(4), y: STAGE_Y },
    data: { label: 'Meeting Types', subtitle: 'BDC scheduled', color: 'slate' },
  },
  {
    id: 'stage-rvp',
    type: 'stage',
    position: { x: stageX(5), y: STAGE_Y },
    data: { label: 'RVP Activity', subtitle: 'Field work', color: 'slate' },
  },
  {
    id: 'stage-results',
    type: 'stage',
    position: { x: stageX(6), y: STAGE_Y },
    data: { label: 'Results', subtitle: 'Meeting outcome', color: 'green' },
  },
  {
    id: 'stage-routing',
    type: 'stage',
    position: { x: stageX(7), y: STAGE_Y },
    data: { label: 'Routing', subtitle: 'Next steps', color: 'slate' },
  },
];

// ============================================
// GROUP CONTAINERS - Visual boxes that contain related nodes
// ============================================
type GroupNode = Node<GroupNodeData, 'group'>;

// Group positions and sizes
const OUTCOMES_RETRY_Y = CHILD_START_Y;
const OUTCOMES_RETRY_HEIGHT = groupHeight(4); // No Contact, Left Message, Gatekeeper, Callback
const OUTCOMES_PROGRESS_Y = OUTCOMES_RETRY_Y + OUTCOMES_RETRY_HEIGHT + GROUP_GAP;
const OUTCOMES_PROGRESS_HEIGHT = groupHeight(2); // NDM, DM

const MEETINGS_Y = CHILD_START_Y;
const MEETINGS_HEIGHT = groupHeight(4); // Light, Solid, BHYB, Hybrid

const RVP_OWNERSHIP_Y = CHILD_START_Y;
const RVP_INIT_Y = RVP_OWNERSHIP_Y + NODE_HEIGHT + GROUP_GAP;
const RVP_INIT_HEIGHT = groupHeight(4); // Self-Gen, Unilateral, Bilateral, Next Step
const RVP_BDC_Y = RVP_INIT_Y + RVP_INIT_HEIGHT + GROUP_GAP;
const RVP_BDC_HEIGHT = groupHeight(1); // Runs Appointment

const RESULTS_SALE_Y = CHILD_START_Y;
const RESULTS_SALE_HEIGHT = groupHeight(3); // Sale Traditional, Sale Innovative, Sale COA
const RESULTS_SIT_Y = RESULTS_SALE_Y + RESULTS_SALE_HEIGHT + GROUP_GAP;
const RESULTS_SIT_HEIGHT = groupHeight(6); // NFCO, NFCB, Sit DM, Sit NDM, No Sale No Traction DM, No Sale No Traction NDM
const RESULTS_NOSIT_Y = RESULTS_SIT_Y + RESULTS_SIT_HEIGHT + GROUP_GAP;
const RESULTS_NOSIT_HEIGHT = groupHeight(5); // Canceled, DNR, Contact, No Contact, Rescheduled

export const groupNodes: GroupNode[] = [
  // Call Outcomes groups
  {
    id: 'group-retry',
    type: 'group',
    position: { x: stageX(3) + 10, y: OUTCOMES_RETRY_Y },
    data: { label: 'Retry Outcomes', width: GROUP_WIDTH, height: OUTCOMES_RETRY_HEIGHT, color: 'slate' },
    style: { zIndex: -1 },
  },
  {
    id: 'group-progress',
    type: 'group',
    position: { x: stageX(3) + 10, y: OUTCOMES_PROGRESS_Y },
    data: { label: 'Progress Outcomes', width: GROUP_WIDTH, height: OUTCOMES_PROGRESS_HEIGHT, color: 'slate' },
    style: { zIndex: -1 },
  },
  // Meeting Types group
  {
    id: 'group-meetings',
    type: 'group',
    position: { x: stageX(4) + 10, y: MEETINGS_Y },
    data: { label: 'Meeting Types', width: GROUP_WIDTH, height: MEETINGS_HEIGHT, color: 'slate' },
    style: { zIndex: -1 },
  },
  // RVP Activity groups
  {
    id: 'group-rvp-init',
    type: 'group',
    position: { x: stageX(5) + 10, y: RVP_INIT_Y },
    data: { label: 'RVP-Initiated', width: GROUP_WIDTH, height: RVP_INIT_HEIGHT, color: 'slate' },
    style: { zIndex: -1 },
  },
  {
    id: 'group-bdc-sched',
    type: 'group',
    position: { x: stageX(5) + 10, y: RVP_BDC_Y },
    data: { label: 'BDC-Scheduled', width: GROUP_WIDTH, height: RVP_BDC_HEIGHT, color: 'slate' },
    style: { zIndex: -1 },
  },
  // Results groups
  {
    id: 'group-sit',
    type: 'group',
    position: { x: stageX(6) + 10, y: RESULTS_SIT_Y },
    data: { label: 'Sit Results', width: GROUP_WIDTH, height: RESULTS_SIT_HEIGHT, color: 'slate' },
    style: { zIndex: -1 },
  },
  {
    id: 'group-nosit',
    type: 'group',
    position: { x: stageX(6) + 10, y: RESULTS_NOSIT_Y },
    data: { label: 'No-Sit Results', width: GROUP_WIDTH, height: RESULTS_NOSIT_HEIGHT, color: 'slate' },
    style: { zIndex: -1 },
  },
];

// Helper to position nodes inside a group
const inGroup = (stageIndex: number, groupY: number, index: number) => ({
  x: stageX(stageIndex) + 30,  // Centered in group
  y: groupY + 45 + index * (NODE_HEIGHT + NODE_GAP), // +45 for label space
});

// ============================================
// CHILD NODES
// ============================================
export const vanillaSoftNodes: FlowNode[] = [
  // ============================================
  // STAGE: LEAD SOURCES (no groups needed - simple list)
  // ============================================
  {
    id: 'vs-data-purchase',
    type: 'custom',
    position: { x: stageX(0) + 30, y: CHILD_START_Y },
    data: {
      label: 'Data Purchases',
      owner: 'System',
      status: 'confirmed',
      notes: [],
      description: 'Purchased lead lists',
    },
  },
  {
    id: 'vs-unworked',
    type: 'custom',
    position: { x: stageX(0) + 30, y: CHILD_START_Y + NODE_HEIGHT + NODE_GAP },
    data: {
      label: 'Existing Unworked',
      owner: 'System',
      status: 'confirmed',
      notes: [],
      description: 'Old leads never contacted',
    },
  },
  {
    id: 'vs-marketing',
    type: 'custom',
    position: { x: stageX(0) + 30, y: CHILD_START_Y + (NODE_HEIGHT + NODE_GAP) * 2 },
    data: {
      label: 'Marketing Leads',
      owner: 'Marketing',
      status: 'confirmed',
      notes: [],
      description: 'Inbound from campaigns',
    },
  },

  // ============================================
  // STAGE: QUEUE (no groups - questions need space)
  // ============================================
  {
    id: 'vs-queue',
    type: 'custom',
    position: { x: stageX(1) + 30, y: CHILD_START_Y },
    data: {
      label: 'General Queue',
      owner: 'Nobody',
      status: 'open-question',
      notes: [],
      description: 'Unworked prospects. QUESTION: Is "queue" the right term? Any categorization when leads enter?',
    },
  },
  {
    id: 'vs-precall-filter',
    type: 'custom',
    position: { x: stageX(1) + 30, y: CHILD_START_Y + 160 }, // Extra space for question box above
    data: {
      label: 'Pre-Call Filter',
      owner: 'BDC',
      status: 'open-question',
      notes: [],
      description: 'Must have RVP coverage. QUESTION: What exact timeframe?',
    },
  },

  // ============================================
  // STAGE: BDC CALLING (no groups)
  // ============================================
  {
    id: 'vs-bdc-claims',
    type: 'custom',
    position: { x: stageX(2) + 30, y: CHILD_START_Y },
    data: {
      label: 'BDC Claims Lead',
      owner: 'BDC',
      status: 'open-question',
      notes: [],
      description: 'Any progress = BDC owns it. QUESTION: What counts as "progress"? First dial? Or reaching someone?',
    },
  },
  {
    id: 'vs-bdc-call',
    type: 'custom',
    position: { x: stageX(2) + 30, y: CHILD_START_Y + 160 },
    data: {
      label: 'Call Attempt',
      owner: 'BDC',
      status: 'confirmed',
      notes: [],
      description: 'Dual scoring: Dialpad + VanillaSoft. Max 5 calls/week.',
    },
  },

  // ============================================
  // STAGE: CALL OUTCOMES - Inside group containers
  // ============================================
  // RETRY GROUP
  {
    id: 'vs-outcome-no-contact',
    type: 'custom',
    position: inGroup(3, OUTCOMES_RETRY_Y, 0),
    data: {
      label: 'No Contact',
      owner: 'BDC',
      status: 'confirmed',
      notes: [],
      description: 'Nobody answered. Try again later.',
    },
  },
  {
    id: 'vs-outcome-left-msg',
    type: 'custom',
    position: inGroup(3, OUTCOMES_RETRY_Y, 1),
    data: {
      label: 'Left Message',
      owner: 'BDC',
      status: 'confirmed',
      notes: [],
      description: 'Voicemail. Wait for callback.',
    },
  },
  {
    id: 'vs-outcome-gatekeeper',
    type: 'custom',
    position: inGroup(3, OUTCOMES_RETRY_Y, 2),
    data: {
      label: 'Spoke to Gatekeeper',
      owner: 'BDC',
      status: 'confirmed',
      notes: [],
      description: 'Receptionist. No decision maker.',
    },
  },
  {
    id: 'vs-outcome-callback',
    type: 'custom',
    position: inGroup(3, OUTCOMES_RETRY_Y, 3),
    data: {
      label: 'Callback Scheduled',
      owner: 'BDC',
      status: 'confirmed',
      notes: [],
      description: 'They asked BDC to call back at specific time.',
    },
  },
  // PROGRESS GROUP
  {
    id: 'vs-outcome-ndm',
    type: 'custom',
    position: inGroup(3, OUTCOMES_PROGRESS_Y, 0),
    data: {
      label: 'Spoke to NDM',
      owner: 'BDC',
      status: 'confirmed',
      notes: [],
      description: 'Non-Decision Maker. No equity ownership.',
    },
  },
  {
    id: 'vs-outcome-dm',
    type: 'custom',
    position: inGroup(3, OUTCOMES_PROGRESS_Y, 1),
    data: {
      label: 'Spoke to DM',
      owner: 'BDC',
      status: 'confirmed',
      notes: [],
      description: 'Decision Maker. Has equity ownership. THE GOAL.',
    },
  },
  {
    id: 'vs-outcome-dead',
    type: 'custom',
    position: { x: stageX(3) + 30, y: OUTCOMES_PROGRESS_Y + OUTCOMES_PROGRESS_HEIGHT + GROUP_GAP },
    data: {
      label: 'Dead End',
      owner: 'BDC',
      status: 'open-question',
      notes: [],
      description: 'QUESTION: What kills a lead? DNC list? Wrong number? Out of business?',
    },
  },

  // ============================================
  // STAGE: MEETING TYPES (no groups - simple list)
  // ============================================
  {
    id: 'vs-meeting-light',
    type: 'custom',
    position: inGroup(4, MEETINGS_Y, 0),
    data: {
      label: 'Light Appointment',
      owner: 'BDC -> RVP',
      status: 'confirmed',
      notes: [],
      description: 'NDM or vague time. Client may not expect visit.',
    },
  },
  {
    id: 'vs-meeting-solid',
    type: 'custom',
    position: inGroup(4, MEETINGS_Y, 1),
    data: {
      label: 'Solid Appointment',
      owner: 'BDC -> RVP',
      status: 'confirmed',
      notes: [],
      description: 'DM + specific time. Client expects visit. GOLD STANDARD.',
    },
  },
  {
    id: 'vs-meeting-bhyb',
    type: 'custom',
    position: inGroup(4, MEETINGS_Y, 2),
    data: {
      label: 'BHYB',
      owner: 'BDC -> RVP',
      status: 'confirmed',
      notes: [],
      description: 'Reverse Hybrid. Permission to stop by, no specific time.',
    },
  },
  {
    id: 'vs-meeting-hybrid',
    type: 'custom',
    position: inGroup(4, MEETINGS_Y, 3),
    data: {
      label: 'Hybrid',
      owner: 'RVP + BDC',
      status: 'confirmed',
      notes: [],
      description: 'RVP touches first, requests BDC follow-up.',
    },
  },

  // ============================================
  // STAGE: RVP ACTIVITY - With groups
  // ============================================
  // Ownership node (outside groups)
  {
    id: 'vs-rvp-owns',
    type: 'custom',
    position: { x: stageX(5) + 30, y: RVP_OWNERSHIP_Y },
    data: {
      label: 'RVP Ownership',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Any meeting type transfers ownership to RVP.',
    },
  },
  // RVP-INITIATED GROUP
  {
    id: 'vs-rvp-selfgen',
    type: 'custom',
    position: inGroup(5, RVP_INIT_Y, 0),
    data: {
      label: 'Self-Gen',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'RVP sets own appointment. No BDC.',
    },
  },
  {
    id: 'vs-rvp-unilateral',
    type: 'custom',
    position: inGroup(5, RVP_INIT_Y, 1),
    data: {
      label: 'Unilateral',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'RVP shows up without client knowledge. Cold call.',
    },
  },
  {
    id: 'vs-rvp-bilateral',
    type: 'custom',
    position: inGroup(5, RVP_INIT_Y, 2),
    data: {
      label: 'Bilateral',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Scheduled follow-up. Both parties know the time.',
    },
  },
  {
    id: 'vs-rvp-nextstep',
    type: 'custom',
    position: inGroup(5, RVP_INIT_Y, 3),
    data: {
      label: 'Next Step',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Follow-up for prospects in pipeline.',
    },
  },
  // BDC-SCHEDULED GROUP
  {
    id: 'vs-rvp-runs-appt',
    type: 'custom',
    position: inGroup(5, RVP_BDC_Y, 0),
    data: {
      label: 'Runs Appointment',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'RVP goes to the BDC-scheduled appointment.',
    },
  },

  // ============================================
  // STAGE: RESULTS - With groups
  // ============================================
  // SIT GROUP
  {
    id: 'vs-result-sale',
    type: 'custom',
    position: inGroup(6, RESULTS_SIT_Y, 0),
    data: {
      label: 'SALE',
      owner: 'RVP -> Admin',
      status: 'confirmed',
      notes: [],
      description: 'Deal closed! Out of pipeline.',
    },
  },
  {
    id: 'vs-result-sit-dm',
    type: 'custom',
    position: inGroup(6, RESULTS_SIT_Y, 1),
    data: {
      label: 'Sit DM',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Met with Decision Maker. No sale yet.',
    },
  },
  {
    id: 'vs-result-sit-ndm',
    type: 'custom',
    position: inGroup(6, RESULTS_SIT_Y, 2),
    data: {
      label: 'Sit NDM',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Met with Non-Decision Maker.',
    },
  },
  {
    id: 'vs-result-nosale-dm',
    type: 'custom',
    position: inGroup(6, RESULTS_SIT_Y, 3),
    data: {
      label: 'No Sale - DM',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Proposed to DM, they said NO.',
    },
  },
  {
    id: 'vs-result-nosale-ndm',
    type: 'custom',
    position: inGroup(6, RESULTS_SIT_Y, 4),
    data: {
      label: 'No Sale - NDM',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Proposed to NDM, they said no.',
    },
  },
  // NO-SIT GROUP
  {
    id: 'vs-result-canceled',
    type: 'custom',
    position: inGroup(6, RESULTS_NOSIT_Y, 0),
    data: {
      label: 'Canceled',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Client canceled the meeting.',
    },
  },
  {
    id: 'vs-result-nosit',
    type: 'custom',
    position: inGroup(6, RESULTS_NOSIT_Y, 1),
    data: {
      label: 'No Sit',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'RVP showed up, client not there.',
    },
  },
  {
    id: 'vs-result-rescheduled',
    type: 'custom',
    position: inGroup(6, RESULTS_NOSIT_Y, 2),
    data: {
      label: 'Rescheduled',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Rescheduled for another time.',
    },
  },
  {
    id: 'vs-result-notsuitable',
    type: 'custom',
    position: inGroup(6, RESULTS_NOSIT_Y, 3),
    data: {
      label: 'Not Suitable',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Company not a fit (size, etc).',
    },
  },

  // ============================================
  // STAGE: ROUTING
  // ============================================
  {
    id: 'vs-admin',
    type: 'custom',
    position: { x: stageX(7) + 30, y: CHILD_START_Y },
    data: {
      label: 'Admin Processing',
      owner: 'Admin',
      status: 'confirmed',
      notes: [],
      description: 'Final sales/no-sales processed here.',
    },
  },
  {
    id: 'vs-route-bdc',
    type: 'custom',
    position: { x: stageX(7) + 30, y: CHILD_START_Y + NODE_HEIGHT + NODE_GAP + 40 },
    data: {
      label: 'Back to BDC',
      owner: 'BDC',
      status: 'open-question',
      notes: [],
      description: 'QUESTION: Which results go back to BDC?',
    },
  },
  {
    id: 'vs-route-rvp',
    type: 'custom',
    position: { x: stageX(7) + 30, y: CHILD_START_Y + (NODE_HEIGHT + NODE_GAP) * 2 + 100 },
    data: {
      label: 'Back to RVP',
      owner: 'RVP',
      status: 'open-question',
      notes: [],
      description: 'QUESTION: Which results stay with RVP?',
    },
  },
  {
    id: 'vs-loop',
    type: 'custom',
    position: { x: stageX(7) + 30, y: CHILD_START_Y + (NODE_HEIGHT + NODE_GAP) * 3 + 160 },
    data: {
      label: 'Loop Continue',
      owner: 'System',
      status: 'confirmed',
      notes: [],
      description: 'Records loop until SALE or NO SALE.',
    },
  },
];

// ============================================
// EDGE STYLES
// ============================================
const EDGE_STYLES = {
  mainSpine: { strokeWidth: 2, stroke: '#64748b' },  // slate-500 - stage connections
  forward: { strokeWidth: 1, stroke: '#cbd5e1' },    // slate-300 - very light
  success: { strokeWidth: 2, stroke: '#10b981' },    // emerald-500 - SALE path
};

// ============================================
// EDGES
// ============================================
export const vanillaSoftEdges: FlowEdge[] = [
  // MAIN SPINE - stage to stage connections only
  { id: 'e-stage-sources-queue', source: 'stage-sources', target: 'stage-queue', style: EDGE_STYLES.mainSpine },
  { id: 'e-stage-queue-bdc', source: 'stage-queue', target: 'stage-bdc', style: EDGE_STYLES.mainSpine },
  { id: 'e-stage-bdc-outcomes', source: 'stage-bdc', target: 'stage-outcomes', style: EDGE_STYLES.mainSpine },
  { id: 'e-stage-outcomes-meetings', source: 'stage-outcomes', target: 'stage-meetings', style: EDGE_STYLES.mainSpine },
  { id: 'e-stage-meetings-rvp', source: 'stage-meetings', target: 'stage-rvp', style: EDGE_STYLES.mainSpine },
  { id: 'e-stage-rvp-results', source: 'stage-rvp', target: 'stage-results', style: EDGE_STYLES.mainSpine },
  { id: 'e-stage-results-routing', source: 'stage-results', target: 'stage-routing', style: EDGE_STYLES.mainSpine },

  // GROUP CONNECTIONS - strong arrows showing where each group leads
  { id: 'e-retry-bdc', source: 'group-retry', target: 'vs-bdc-call', style: EDGE_STYLES.mainSpine, label: 'RETRY', labelStyle: { fontWeight: 700, fontSize: 11 } },
  { id: 'e-progress-meetings', source: 'group-progress', target: 'group-meetings', style: EDGE_STYLES.mainSpine, label: 'ADVANCE', labelStyle: { fontWeight: 700, fontSize: 11 } },

  // SUCCESS PATH
  { id: 'e-runappt-sale', source: 'vs-rvp-runs-appt', target: 'vs-result-sale', style: EDGE_STYLES.success },
  { id: 'e-sale-admin', source: 'vs-result-sale', target: 'vs-admin', style: EDGE_STYLES.success },
];
