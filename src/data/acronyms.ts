import type { Acronym } from '../types';

export const acronyms: Acronym[] = [
  // Roles
  {
    term: 'DM',
    definition: 'Decision Maker - The person with authority to approve/purchase. Primary contact for sales.',
    category: 'role',
  },
  {
    term: 'NDM',
    definition: 'Non-Decision Maker - Contact who is not the decision maker but may influence the sale.',
    category: 'role',
  },
  {
    term: 'BDC',
    definition: 'Business Development Coordinator - Handles initial outreach, appointment setting, and lead qualification.',
    category: 'role',
  },
  {
    term: 'RVP',
    definition: 'Regional Vice President - Sales rep who conducts meetings and closes deals.',
    category: 'role',
  },
  {
    term: 'Admin',
    definition: 'Administrative staff handling post-sale paperwork and support.',
    category: 'role',
  },

  // Meeting Types
  {
    term: 'BHYB',
    definition: 'Permission to stop by with no specific time. Acronym meaning unknown.',
    category: 'meeting-type',
  },
  {
    term: 'Lite',
    definition: 'Lite Appointment - Meeting with NDM or vague time. Client may not expect visit.',
    category: 'meeting-type',
  },
  {
    term: 'Solid',
    definition: 'Solid Appointment - Meeting with Decision Maker at a specific time. Client expects visit.',
    category: 'meeting-type',
  },
  {
    term: 'Hybrid',
    definition: '? - Meeting type (details unknown).',
    category: 'meeting-type',
  },
  {
    term: 'Reverse Hybrid',
    definition: '? - Meeting type (details unknown).',
    category: 'meeting-type',
  },

  // RVP Activity Types
  {
    term: 'Self-gen',
    definition: 'Self-generated - RVP sources and sets their own appointment.',
    category: 'lead-type',
  },
  {
    term: 'Unilateral',
    definition: 'Unilateral - RVP shows up without client knowledge. Cold call/drop-in.',
    category: 'lead-type',
  },
  {
    term: 'Bilateral',
    definition: 'Bilateral - Both parties know the RVP is coming. Scheduled follow-up.',
    category: 'lead-type',
  },

  // Result Codes - Cancelled
  {
    term: 'Cancelled',
    definition: 'Appointment was cancelled before RVP went.',
    category: 'result-code',
    group: 'Cancelled',
  },

  // Result Codes - No Sits (RVP showed up but meeting didn't happen)
  {
    term: 'DNR',
    definition: 'Did Not Respond - Prospect did not respond when RVP arrived.',
    category: 'result-code',
    group: 'No Sit',
  },
  {
    term: 'Contact',
    definition: 'Made contact with prospect but they refused to sit for the meeting.',
    category: 'result-code',
    group: 'No Sit',
  },
  {
    term: 'No Contact',
    definition: 'Prospect was a no-show, RVP could not make contact.',
    category: 'result-code',
    group: 'No Sit',
  },
  {
    term: 'Rescheduled',
    definition: 'Appointment was pushed to a new date.',
    category: 'result-code',
    group: 'No Sit',
  },

  // Result Codes - Sits (meeting happened)
  {
    term: 'Sit DM',
    definition: 'Sat with Decision Maker - Meeting completed with the decision maker present.',
    category: 'result-code',
    group: 'Sit',
  },
  {
    term: 'Sit NDM',
    definition: 'Sat with Non-Decision Maker - Meeting completed but DM was not present.',
    category: 'result-code',
    group: 'Sit',
  },
  {
    term: 'NFCO',
    definition: 'Not Fit for Cogent Other - Disqualified for non-revenue reasons (e.g., not private, international HQ, etc.).',
    category: 'result-code',
    group: 'Sit',
  },
  {
    term: 'NFCB',
    definition: 'Not Fit for Cogent Below - Disqualified for being below thresholds (not enough revenue or employees).',
    category: 'result-code',
    group: 'Sit',
  },

  // Result Codes - No Sale (sat, fit, but didn't close)
  {
    term: 'No Traction DM',
    definition: 'No Sale - Met with Decision Maker but no momentum toward closing.',
    category: 'result-code',
    group: 'No Sale',
  },
  {
    term: 'No Traction NDM',
    definition: 'No Sale - Met with Non-Decision Maker, no momentum toward closing.',
    category: 'result-code',
    group: 'No Sale',
  },

  // Result Codes - Sales (closed, by product type)
  {
    term: 'Sale - Traditional',
    definition: 'Successful sale of Traditional product.',
    category: 'result-code',
    group: 'Sale',
  },
  {
    term: 'Sale - Innovative',
    definition: 'Successful sale of Innovative product.',
    category: 'result-code',
    group: 'Sale',
  },
  {
    term: 'Sale - Coaching',
    definition: 'Successful sale of Coaching product.',
    category: 'result-code',
    group: 'Sale',
  },

  // Other Terms
  {
    term: 'Queue',
    definition: 'List of leads/contacts waiting to be worked by BDC or RVP.',
    category: 'other',
  },
  {
    term: 'Appointment',
    definition: 'Scheduled meeting between RVP and prospect.',
    category: 'other',
  },
  {
    term: 'Lead',
    definition: 'Potential customer contact in the system.',
    category: 'other',
  },
  {
    term: 'Deal',
    definition: 'HubSpot record tracking a sales opportunity through the pipeline.',
    category: 'other',
  },
  {
    term: 'Task',
    definition: 'To-do item assigned to a user in HubSpot.',
    category: 'other',
  },
  {
    term: 'Meeting',
    definition: 'Calendar event in HubSpot associated with contacts/deals.',
    category: 'other',
  },
  {
    term: 'VanillaSoft',
    definition: 'Current CRM/dialer system being migrated from.',
    category: 'other',
  },
  {
    term: 'HubSpot',
    definition: 'Target CRM platform being migrated to.',
    category: 'other',
  },
];

export const categoryLabels: Record<Acronym['category'], string> = {
  role: 'Roles',
  'meeting-type': 'Meeting Types',
  'result-code': 'Result Codes',
  'lead-type': 'Lead Types',
  other: 'Other Terms',
};
