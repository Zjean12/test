export interface Program {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Closed';
  reports: number;
  bounties: string;
  createdAt: string;
  lastUpdated: string | null;
  bountyRanges: {
    low: string;
    medium: string;
    high: string;
    critical: string;
  };
  scope: ScopeItem[];
  markdown: string;
}

export interface ScopeItem {
  id: string;
  type: string;
  target: string;
  description: string;
}