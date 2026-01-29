import type { Node, Edge } from '@xyflow/react';

export type NodeStatus = 'confirmed' | 'pending' | 'open-question';

export interface Acronym {
  term: string;
  definition: string;
  category: 'role' | 'meeting-type' | 'result-code' | 'lead-type' | 'other';
  group?: string; // Sub-grouping within a category (e.g., 'No Sit', 'Sit', 'No Sale', 'Sale' for result codes)
}

export interface NodeNote {
  id: string;
  content: string;
  createdAt: string;
  tags: string[]; // People tags like 'Chuck', 'Chase', etc.
}

export interface FlowNodeData extends Record<string, unknown> {
  label: string;
  owner?: string;
  status: NodeStatus;
  notes: NodeNote[];
  description?: string;
}

export interface StageNodeData extends Record<string, unknown> {
  label: string;
  subtitle?: string;
  color?: string;
}

export type FlowNode = Node<FlowNodeData, 'custom'>;
export type StageNode = Node<StageNodeData, 'stage'>;
export type AnyFlowNode = FlowNode | StageNode;
export type FlowEdge = Edge;

export type ViewMode = 'vanillasoft' | 'hubspot';

export interface PersistedState {
  nodeNotes: Record<string, NodeNote[]>;
  nodeStatuses: Record<string, NodeStatus>;
  nodePositions: Record<string, { x: number; y: number }>;
  layoutVersion?: number;
  lastUpdated: string;
}

export interface ExportData {
  version: string;
  exportedAt: string;
  viewMode: ViewMode;
  nodes: FlowNode[];
  edges: FlowEdge[];
  notes: Record<string, NodeNote[]>;
  statuses: Record<string, NodeStatus>;
}
