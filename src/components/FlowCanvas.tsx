import { useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import type { FlowNode, ViewMode, NodeStatus, FlowNodeData, AnyFlowNode } from '../types';
import { CustomNode } from './CustomNode';
import { StageNode } from './StageNode';
import { GroupNode } from './GroupNode';
import { vanillaSoftNodes, vanillaSoftEdges, stageNodes, groupNodes as vanillaSoftGroups } from '../data/vanillaSoftFlow';
import { hubspotNodes, hubspotEdges } from '../data/hubspotFlow';

interface FlowCanvasProps {
  viewMode: ViewMode;
  nodeNotes: Record<string, { length: number }>;
  nodeStatuses: Record<string, NodeStatus>;
  onNodeClick: (node: FlowNode) => void;
}

const nodeTypes = {
  custom: CustomNode,
  stage: StageNode,
  group: GroupNode,
} as const;

export function FlowCanvas({
  viewMode,
  nodeNotes,
  nodeStatuses,
  onNodeClick,
}: FlowCanvasProps) {
  const baseChildNodes = viewMode === 'vanillasoft' ? vanillaSoftNodes : hubspotNodes;
  const baseStageNodes = viewMode === 'vanillasoft' ? stageNodes : [];
  const baseGroupNodes = viewMode === 'vanillasoft' ? vanillaSoftGroups : [];
  const baseEdges = viewMode === 'vanillasoft' ? vanillaSoftEdges : hubspotEdges;

  // Merge persisted state into child nodes (stage nodes don't have notes/status)
  const initialNodes = useMemo(() => {
    const childNodes = baseChildNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        notes: nodeNotes[node.id] ? Array(nodeNotes[node.id].length).fill({}) : [],
        status: nodeStatuses[node.id] || node.data.status,
      } as FlowNodeData,
    }));
    // Groups render first (background), then stages, then child nodes on top
    return [...baseGroupNodes, ...baseStageNodes, ...childNodes] as AnyFlowNode[];
  }, [baseChildNodes, baseStageNodes, baseGroupNodes, nodeNotes, nodeStatuses]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(baseEdges);

  // Update nodes when persisted state changes (only for custom nodes, not stage nodes)
  useEffect(() => {
    setNodes(currentNodes =>
      currentNodes.map(node => {
        // Stage nodes don't have notes/status - leave them as-is
        if (node.type === 'stage') {
          return node;
        }
        return {
          ...node,
          data: {
            ...node.data,
            notes: nodeNotes[node.id] ? Array(nodeNotes[node.id].length).fill({}) : [],
            status: nodeStatuses[node.id] || (node.data as FlowNodeData).status,
          } as FlowNodeData,
        };
      })
    );
  }, [nodeNotes, nodeStatuses, setNodes]);

  // Reset nodes when view mode changes
  useEffect(() => {
    setNodes(initialNodes);
  }, [viewMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: FlowNode) => {
      onNodeClick(node);
    },
    [onNodeClick]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick as never}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{
          style: { stroke: '#64748b', strokeWidth: 1.5 },
          type: 'smoothstep',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#64748b',
            width: 16,
            height: 16,
          },
        }}
      >
        <Controls position="bottom-right" className="!bg-white !shadow-lg !rounded-lg !border !border-gray-200" />
        <Background variant={BackgroundVariant.Dots} gap={30} size={1} color="#cbd5e1" />
      </ReactFlow>
    </div>
  );
}

export function useFlowData(viewMode: ViewMode) {
  // Return only content nodes (FlowNode[]) for export - stage nodes are just visual headers
  const nodes = viewMode === 'vanillasoft' ? vanillaSoftNodes : hubspotNodes;
  const edges = viewMode === 'vanillasoft' ? vanillaSoftEdges : hubspotEdges;
  return { nodes, edges };
}
