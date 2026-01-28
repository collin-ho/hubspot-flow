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
    definition: 'Business Development Center - Team that handles initial outreach, appointment setting, and lead qualification.',
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
    definition: 'Be Here Your Best - A specific meeting type in the sales process.',
    category: 'meeting-type',
  },
  {
    term: 'Light',
    definition: 'Light Meeting - Lower intensity meeting type, typically informational.',
    category: 'meeting-type',
  },
  {
    term: 'Solid',
    definition: 'Solid Meeting - Standard sales meeting with full presentation.',
    category: 'meeting-type',
  },
  {
    term: 'Hybrid',
    definition: 'Hybrid Meeting - Combination meeting type with mixed format.',
    category: 'meeting-type',
  },

  // Lead Types
  {
    term: 'Self-gen',
    definition: 'Self-generated lead - Lead sourced by the sales rep themselves.',
    category: 'lead-type',
  },
  {
    term: 'Unilateral',
    definition: 'Unilateral lead - Lead from a single source/referral.',
    category: 'lead-type',
  },
  {
    term: 'Bilateral',
    definition: 'Bilateral lead - Lead from multiple sources or mutual referral.',
    category: 'lead-type',
  },

  // Result Codes
  {
    term: 'Sale',
    definition: 'Successful sale completed.',
    category: 'result-code',
  },
  {
    term: 'Sit DM',
    definition: 'Sat with Decision Maker - Meeting completed with the decision maker present.',
    category: 'result-code',
  },
  {
    term: 'Sit NDM',
    definition: 'Sat with Non-Decision Maker - Meeting completed but DM was not present.',
    category: 'result-code',
  },
  {
    term: 'No Sale - MDM',
    definition: 'No Sale - Met Decision Maker. Meeting happened with DM but no sale closed.',
    category: 'result-code',
  },
  {
    term: 'No Sale - MNDM',
    definition: 'No Sale - Met Non-Decision Maker. Meeting happened but DM was not present.',
    category: 'result-code',
  },
  {
    term: 'No Sit',
    definition: 'No Sit - Appointment was scheduled but meeting did not happen (no-show, cancelled, etc.).',
    category: 'result-code',
  },
  {
    term: 'Callback',
    definition: 'Lead requested a callback at a later time.',
    category: 'result-code',
  },
  {
    term: 'Reschedule',
    definition: 'Appointment needs to be rescheduled.',
    category: 'result-code',
  },
  {
    term: 'DQ',
    definition: 'Disqualified - Lead does not meet qualification criteria.',
    category: 'result-code',
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
