export interface ScopeItem {
    id: string;
    type: string;
    target: string;
    description: string;
  }
  
  export interface Program {
    id: string;
    name: string;
    description: string;
    bountyRanges: {
      low: string;
      medium: string;
      high: string;
      critical: string;
    };
    markdown: string;
    status: 'Active' | 'Closed';
    scope: ScopeItem[];
    reports: number;
    bounties: string;
    createdAt: string;
    lastUpdated: string | null;
  }