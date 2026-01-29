import type { FlowNode, FlowEdge, StageNode, MiniNode, SpineNode } from '../types';
import type { GroupNodeData } from '../components/GroupNode';
import type { Node } from '@xyflow/react';

// ============================================
// LAYOUT CONFIGURATION
// ============================================
const STAGE_WIDTH = 480;          // Horizontal spacing between stages
const STAGE_Y = 0;                // Y position for stage headers
const CHILD_START_Y = 120;        // Where content starts below stage headers
const NODE_HEIGHT = 95;           // Approximate height of a node
const NODE_GAP = 15;              // Gap between nodes inside a group
const GROUP_PADDING = 20;         // Padding inside group boxes
const GROUP_GAP = 40;             // Gap between group boxes
const NODE_WIDTH = 280;           // Width of content nodes
const GROUP_WIDTH = 360;          // Group box width

// Calculate stage X positions - extra gaps for clarity
const stageX = (index: number) => {
  if (index <= 3) return index * STAGE_WIDTH;
  if (index <= 5) return index * STAGE_WIDTH + 200; // Gap after outcomes for decision node
  if (index === 6) return index * STAGE_WIDTH + 1300; // Extra gap before Results for BHYB routing
  // Extra gap before routing (stage 7+) for junction
  return index * STAGE_WIDTH + 1900;
};

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
const MEETINGS_HEIGHT = groupHeight(3); // Light, Solid, Hybrid (BHYB is separate track)

const RVP_OWNERSHIP_Y = CHILD_START_Y;
const RVP_INIT_Y = RVP_OWNERSHIP_Y + NODE_HEIGHT + GROUP_GAP;
const RVP_INIT_HEIGHT = groupHeight(4); // Self-Gen, Unilateral, Bilateral, Next Step
const RVP_BDC_Y = RVP_INIT_Y + RVP_INIT_HEIGHT + GROUP_GAP;
const RVP_BDC_HEIGHT = groupHeight(1); // Runs Appointment

const RESULTS_SIT_Y = CHILD_START_Y;
const RESULTS_SIT_HEIGHT = groupHeight(7); // Sale, NFCO, NFCB, Sit DM, Sit NDM, No Traction DM, No Traction NDM
const RESULTS_NOSIT_Y = RESULTS_SIT_Y + RESULTS_SIT_HEIGHT + GROUP_GAP;
const RESULTS_NOSIT_HEIGHT = groupHeight(5); // Canceled, DNR, Contact, No Contact, Rescheduled
const RESULTS_GROUP_WIDTH = 420; // Wider than standard GROUP_WIDTH for results

// BHYB TRACK - Separate horizontal flow below main content
const BHYB_TRACK_Y = RESULTS_NOSIT_Y + RESULTS_NOSIT_HEIGHT + 40; // Below all main content, raised up
const BHYB_TRACK_HEIGHT = groupHeight(3); // A, F, NT results

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
  // Results groups - wider for clarity
  {
    id: 'group-sit',
    type: 'group',
    position: { x: stageX(6) + 10, y: RESULTS_SIT_Y },
    data: { label: 'Sit Results', width: RESULTS_GROUP_WIDTH, height: RESULTS_SIT_HEIGHT, color: 'slate' },
    style: { zIndex: -1 },
  },
  {
    id: 'group-nosit',
    type: 'group',
    position: { x: stageX(6) + 10, y: RESULTS_NOSIT_Y },
    data: { label: 'No-Sit Results', width: RESULTS_GROUP_WIDTH, height: RESULTS_NOSIT_HEIGHT, color: 'slate' },
    style: { zIndex: -1 },
  },
  // BHYB TRACK - compact, just BHYB through RVP Decision
  {
    id: 'group-bhyb-track',
    type: 'group',
    position: { x: stageX(4) - 10, y: BHYB_TRACK_Y },
    data: { label: 'BHYB Track', width: stageX(5) + NODE_WIDTH + 200 - stageX(4), height: BHYB_TRACK_HEIGHT, color: 'blue' },
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
export const vanillaSoftNodes: (FlowNode | MiniNode | SpineNode)[] = [
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
  // DECISION: Appointment Type Split (between stages 3 and 4)
  // ============================================
  {
    id: 'vs-meeting-split',
    type: 'custom',
    position: { x: stageX(3) + STAGE_WIDTH + 60, y: OUTCOMES_PROGRESS_Y + 50 },
    data: {
      label: 'Appointment Type?',
      owner: 'BDC',
      status: 'confirmed',
      notes: [],
      description: 'What kind of meeting was set? Scheduled time → regular appointments. Permission to stop by → BHYB track.',
    },
  },

  // ============================================
  // STAGE: MEETING TYPES (scheduled appointments)
  // ============================================
  {
    id: 'vs-meeting-light',
    type: 'custom',
    position: inGroup(4, MEETINGS_Y, 0),
    data: {
      label: 'Lite Appointment',
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
    id: 'vs-meeting-hybrid',
    type: 'custom',
    position: inGroup(4, MEETINGS_Y, 2),
    data: {
      label: 'Hybrid',
      owner: 'RVP + BDC',
      status: 'confirmed',
      notes: [],
      description: 'RVP touches first, requests BDC follow-up.',
    },
  },
  // BHYB - entry point to BHYB track (positioned at start of track)
  {
    id: 'vs-bhyb',
    type: 'custom',
    position: { x: stageX(4) + 30, y: BHYB_TRACK_Y + 45 },
    data: {
      label: 'BHYB',
      owner: 'BDC -> RVP',
      status: 'confirmed',
      notes: [],
      description: 'Be Here Your Best. Permission to stop by, no specific time. Has separate result path.',
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
  // Spine junction for RVP-Initiated edges to converge on vertical line
  {
    id: 'vs-rvp-init-spine',
    type: 'spine',
    position: { x: stageX(6) - 350, y: RVP_INIT_Y + groupHeight(4) / 2 },
    data: { color: 'slate' },
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
  // BHYB TRACK NODES - Horizontal flow below main content
  // ============================================
  // BHYB Results (in track, stage 5 area)
  {
    id: 'vs-bhyb-a',
    type: 'custom',
    position: { x: stageX(5) + 30, y: BHYB_TRACK_Y + 45 },
    data: {
      label: 'BHYB-A',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'BHYB Appointment - Got a real appointment. Goes to normal sit flow.',
    },
  },
  {
    id: 'vs-bhyb-f',
    type: 'custom',
    position: { x: stageX(5) + 30, y: BHYB_TRACK_Y + 45 + NODE_HEIGHT + NODE_GAP },
    data: {
      label: 'BHYB-F',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'BHYB Follow up - Needs follow up. RVP decides routing.',
    },
  },
  {
    id: 'vs-bhyb-nt',
    type: 'custom',
    position: { x: stageX(5) + 30, y: BHYB_TRACK_Y + 45 + (NODE_HEIGHT + NODE_GAP) * 2 },
    data: {
      label: 'BHYB-NT',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'BHYB No Touch - No contact made. RVP decides routing.',
    },
  },
  // BHYB ROUTING - Positioned near the junction (between Sit/No-Sit Results)
  // RVP Decision point for F/NT - pushed way back for spacing
  {
    id: 'vs-bhyb-decision',
    type: 'custom',
    position: { x: stageX(6) - 1150, y: RESULTS_SIT_Y + RESULTS_SIT_HEIGHT + GROUP_GAP / 2 - NODE_HEIGHT / 2 },
    data: {
      label: 'RVP Decision',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'RVP decides: route to BDC (Next Step/Light) or keep (Uni/Bi/Call/Email/BTS). All paths lead back to Sit Results except BTS.',
    },
  },

  // Route nodes - spaced out from RVP Decision
  {
    id: 'vs-bhyb-route-bdc',
    type: 'mini',
    position: { x: stageX(6) - 850, y: RESULTS_SIT_Y + RESULTS_SIT_HEIGHT - 30 },
    data: { label: 'BDC Route', owner: 'BDC', color: 'slate' },
  },
  {
    id: 'vs-bhyb-route-rvp',
    type: 'mini',
    position: { x: stageX(6) - 850, y: RESULTS_SIT_Y + RESULTS_SIT_HEIGHT + GROUP_GAP + 10 },
    data: { label: 'RVP Route', owner: 'RVP', color: 'blue' },
  },

  // BDC Route mini nodes - spaced from route nodes
  {
    id: 'vs-bhyb-mini-nextstep',
    type: 'mini',
    position: { x: stageX(6) - 600, y: RESULTS_SIT_Y + RESULTS_SIT_HEIGHT - 45 },
    data: { label: 'Next Step', owner: 'BDC', color: 'slate' },
  },
  {
    id: 'vs-bhyb-mini-nextstep-light',
    type: 'mini',
    position: { x: stageX(6) - 600, y: RESULTS_SIT_Y + RESULTS_SIT_HEIGHT - 10 },
    data: { label: 'Next Step Lite', owner: 'BDC', color: 'slate' },
  },

  // RVP Route mini nodes - Unilateral/Bilateral/Call/Email grouped, BTS separate at bottom
  {
    id: 'vs-bhyb-mini-unilateral',
    type: 'mini',
    position: { x: stageX(6) - 600, y: RESULTS_SIT_Y + RESULTS_SIT_HEIGHT + GROUP_GAP - 5 },
    data: { label: 'Unilateral', owner: 'RVP', color: 'blue' },
  },
  {
    id: 'vs-bhyb-mini-bilateral',
    type: 'mini',
    position: { x: stageX(6) - 600, y: RESULTS_SIT_Y + RESULTS_SIT_HEIGHT + GROUP_GAP + 30 },
    data: { label: 'Bilateral', owner: 'RVP', color: 'blue' },
  },
  {
    id: 'vs-bhyb-mini-callemail',
    type: 'mini',
    position: { x: stageX(6) - 600, y: RESULTS_SIT_Y + RESULTS_SIT_HEIGHT + GROUP_GAP + 65 },
    data: { label: 'Call/Email', owner: 'RVP', color: 'blue' },
  },

  // BTS stays with other RVP mini nodes
  {
    id: 'vs-bhyb-mini-bts',
    type: 'mini',
    position: { x: stageX(6) - 600, y: RESULTS_SIT_Y + RESULTS_SIT_HEIGHT + GROUP_GAP + 100 },
    data: { label: 'BTS', owner: 'RVP', color: 'amber' },
  },
  // Main Junction for BHYB routes → Results (both sit and no-sit)
  {
    id: 'vs-bhyb-results-junction',
    type: 'spine',
    position: { x: stageX(6) - 350, y: RESULTS_SIT_Y + RESULTS_SIT_HEIGHT + GROUP_GAP / 2 - 4 },
    data: { color: 'blue' },
  },
  // Unknown outcome node for Call/Email - positioned below No-Sit Results
  {
    id: 'vs-callemail-unknown',
    type: 'custom',
    position: { x: stageX(6) + 30, y: RESULTS_NOSIT_Y + RESULTS_NOSIT_HEIGHT + 20 },
    data: {
      label: '?',
      owner: 'RVP',
      status: 'open-question',
      notes: [],
      description: 'Call/Email outcome unknown - could lead to sit or no-sit depending on response.',
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
      label: 'No Traction DM',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Met with Decision Maker, no momentum toward closing.',
    },
  },
  {
    id: 'vs-result-nosale-ndm',
    type: 'custom',
    position: inGroup(6, RESULTS_SIT_Y, 4),
    data: {
      label: 'No Traction NDM',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Met with Non-Decision Maker, no momentum toward closing.',
    },
  },
  {
    id: 'vs-result-nfco',
    type: 'custom',
    position: inGroup(6, RESULTS_SIT_Y, 5),
    data: {
      label: 'NFCO',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Not Fit for Cogent Other - Disqualified for non-revenue reasons (not private, international HQ, etc).',
    },
  },
  {
    id: 'vs-result-nfcb',
    type: 'custom',
    position: inGroup(6, RESULTS_SIT_Y, 6),
    data: {
      label: 'NFCB',
      owner: 'RVP',
      status: 'confirmed',
      notes: [],
      description: 'Not Fit for Cogent Below - Disqualified for being below thresholds (revenue/employees).',
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
  // STAGE: ROUTING - Stacked vertically
  // ============================================
  {
    id: 'vs-end-pipeline',
    type: 'custom',
    position: { x: stageX(7) + 30, y: CHILD_START_Y },
    data: {
      label: '⬤ END PIPELINE',
      owner: 'Admin',
      status: 'confirmed',
      notes: [],
      description: 'Terminal state. Lead exits pipeline here - either closed (Sale) or disqualified (NFCO/NFCB/No Traction).',
    },
  },
  {
    id: 'vs-route-bdc',
    type: 'custom',
    position: { x: stageX(7) + 30, y: CHILD_START_Y + NODE_HEIGHT + NODE_GAP + 30 },
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
    position: { x: stageX(7) + 30, y: CHILD_START_Y + (NODE_HEIGHT + NODE_GAP + 30) * 2 },
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
    position: { x: stageX(7) + 30, y: CHILD_START_Y + (NODE_HEIGHT + NODE_GAP + 30) * 3 },
    data: {
      label: 'Loop Continue',
      owner: 'System',
      status: 'confirmed',
      notes: [],
      description: 'Records loop until SALE or NO SALE.',
    },
  },
  // Junction node - between Results and Routing, aligned with middle of Sit Results
  {
    id: 'vs-terminal-junction',
    type: 'custom',
    position: { x: stageX(6) + STAGE_WIDTH + 50, y: RESULTS_SIT_Y + 280 },
    data: {
      label: '●',
      owner: '',
      status: 'confirmed',
      notes: [],
      description: 'Junction - terminal outcomes converge here before End Pipeline.',
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
  bhyb: { strokeWidth: 2, stroke: '#3b82f6' },       // blue-500 - BHYB track
  bts: { strokeWidth: 2, stroke: '#ef4444' },        // red-500 - BTS back to queue
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
  // Progress → Decision split
  { id: 'e-progress-split', source: 'group-progress', target: 'vs-meeting-split', style: EDGE_STYLES.success, label: 'ADVANCE', labelStyle: { fontWeight: 700, fontSize: 11 } },
  // Decision split → Scheduled appointments OR BHYB
  { id: 'e-split-meetings', source: 'vs-meeting-split', target: 'group-meetings', style: EDGE_STYLES.success, label: 'SCHEDULED', labelStyle: { fontWeight: 700, fontSize: 10 } },

  // RVP TO RESULTS - Runs Appointment leads to all Sit results
  { id: 'e-runappt-sit', source: 'vs-rvp-runs-appt', target: 'group-sit', style: EDGE_STYLES.success },

  // RVP-INITIATED → Spine (converge on vertical line) → Main junction
  { id: 'e-selfgen-spine', source: 'vs-rvp-selfgen', target: 'vs-rvp-init-spine', type: 'tree', style: EDGE_STYLES.mainSpine },
  { id: 'e-unilateral-spine', source: 'vs-rvp-unilateral', target: 'vs-rvp-init-spine', type: 'tree', style: EDGE_STYLES.mainSpine },
  { id: 'e-bilateral-spine', source: 'vs-rvp-bilateral', target: 'vs-rvp-init-spine', type: 'tree', style: EDGE_STYLES.mainSpine },
  { id: 'e-nextstep-spine', source: 'vs-rvp-nextstep', target: 'vs-rvp-init-spine', type: 'tree', style: EDGE_STYLES.mainSpine },
  // Spine → Main BHYB junction (vertical line down)
  { id: 'e-rvp-spine-junction', source: 'vs-rvp-init-spine', target: 'vs-bhyb-results-junction', style: EDGE_STYLES.mainSpine },

  // BHYB TRACK - separate flow path
  // Entry: Split decision leads to BHYB track
  { id: 'e-split-bhyb', source: 'vs-meeting-split', target: 'vs-bhyb', style: EDGE_STYLES.bhyb, label: 'STOP BY OK', labelStyle: { fontWeight: 700, fontSize: 10 } },
  // BHYB → Results
  { id: 'e-bhyb-a', source: 'vs-bhyb', target: 'vs-bhyb-a', style: EDGE_STYLES.bhyb },
  { id: 'e-bhyb-f', source: 'vs-bhyb', target: 'vs-bhyb-f', style: EDGE_STYLES.bhyb },
  { id: 'e-bhyb-nt', source: 'vs-bhyb', target: 'vs-bhyb-nt', style: EDGE_STYLES.bhyb },
  // BHYB-A → Sit Results (got an appointment, normal flow)
  { id: 'e-bhyb-a-sit', source: 'vs-bhyb-a', target: 'group-sit', style: EDGE_STYLES.success },
  // BHYB F/NT → RVP Decision
  { id: 'e-bhyb-f-decision', source: 'vs-bhyb-f', target: 'vs-bhyb-decision', style: EDGE_STYLES.bhyb },
  { id: 'e-bhyb-nt-decision', source: 'vs-bhyb-nt', target: 'vs-bhyb-decision', style: EDGE_STYLES.bhyb },

  // RVP Decision → Route nodes (cleaner flow with intermediate grouping)
  { id: 'e-decision-bdc-route', source: 'vs-bhyb-decision', target: 'vs-bhyb-route-bdc', style: EDGE_STYLES.bhyb },
  { id: 'e-decision-rvp-route', source: 'vs-bhyb-decision', target: 'vs-bhyb-route-rvp', style: EDGE_STYLES.bhyb },

  // BDC Route → BDC mini nodes
  { id: 'e-bdc-route-nextstep', source: 'vs-bhyb-route-bdc', target: 'vs-bhyb-mini-nextstep', style: EDGE_STYLES.bhyb },
  { id: 'e-bdc-route-nextstep-light', source: 'vs-bhyb-route-bdc', target: 'vs-bhyb-mini-nextstep-light', style: EDGE_STYLES.bhyb },

  // RVP Route → RVP mini nodes
  { id: 'e-rvp-route-unilateral', source: 'vs-bhyb-route-rvp', target: 'vs-bhyb-mini-unilateral', style: EDGE_STYLES.bhyb },
  { id: 'e-rvp-route-bilateral', source: 'vs-bhyb-route-rvp', target: 'vs-bhyb-mini-bilateral', style: EDGE_STYLES.bhyb },
  { id: 'e-rvp-route-callemail', source: 'vs-bhyb-route-rvp', target: 'vs-bhyb-mini-callemail', style: EDGE_STYLES.bhyb },
  { id: 'e-rvp-route-bts', source: 'vs-bhyb-route-rvp', target: 'vs-bhyb-mini-bts', style: EDGE_STYLES.bhyb },

  // Mini nodes → Junction using tree edges (creates shared vertical spine)
  { id: 'e-mini-nextstep-junction', source: 'vs-bhyb-mini-nextstep', target: 'vs-bhyb-results-junction', type: 'tree', style: EDGE_STYLES.bhyb },
  { id: 'e-mini-nextstep-light-junction', source: 'vs-bhyb-mini-nextstep-light', target: 'vs-bhyb-results-junction', type: 'tree', style: EDGE_STYLES.bhyb },
  { id: 'e-mini-unilateral-junction', source: 'vs-bhyb-mini-unilateral', target: 'vs-bhyb-results-junction', type: 'tree', style: EDGE_STYLES.bhyb },
  { id: 'e-mini-bilateral-junction', source: 'vs-bhyb-mini-bilateral', target: 'vs-bhyb-results-junction', type: 'tree', style: EDGE_STYLES.bhyb },

  // Call/Email → Unknown outcome (separate from the main junction)
  { id: 'e-mini-callemail-unknown', source: 'vs-bhyb-mini-callemail', target: 'vs-callemail-unknown', style: EDGE_STYLES.bhyb },

  // BHYB Junction → Both Sit Results and No-Sit Results
  { id: 'e-bhyb-junction-sit', source: 'vs-bhyb-results-junction', target: 'group-sit', style: EDGE_STYLES.bhyb },
  { id: 'e-bhyb-junction-nosit', source: 'vs-bhyb-results-junction', target: 'group-nosit', style: EDGE_STYLES.bhyb },

  // BTS → Queue (red path routes below everything using custom edge)
  { id: 'e-bts-queue', source: 'vs-bhyb-mini-bts', target: 'vs-queue', type: 'bts', style: EDGE_STYLES.bts, label: 'RESTART', labelStyle: { fontWeight: 700, fontSize: 10, fill: '#ef4444' } },

  // END PIPELINE - Terminal outcomes converge at junction, then to End Pipeline
  { id: 'e-sale-junction', source: 'vs-result-sale', target: 'vs-terminal-junction', style: EDGE_STYLES.success },
  { id: 'e-nosale-dm-junction', source: 'vs-result-nosale-dm', target: 'vs-terminal-junction', style: EDGE_STYLES.success },
  { id: 'e-nosale-ndm-junction', source: 'vs-result-nosale-ndm', target: 'vs-terminal-junction', style: EDGE_STYLES.success },
  { id: 'e-nfco-junction', source: 'vs-result-nfco', target: 'vs-terminal-junction', style: EDGE_STYLES.success },
  { id: 'e-nfcb-junction', source: 'vs-result-nfcb', target: 'vs-terminal-junction', style: EDGE_STYLES.success },
  { id: 'e-junction-end', source: 'vs-terminal-junction', target: 'vs-end-pipeline', style: EDGE_STYLES.success },
];
