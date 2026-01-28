import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';

export interface GroupNodeData extends Record<string, unknown> {
  label: string;
  width: number;
  height: number;
  color?: 'slate' | 'orange' | 'green' | 'purple' | 'teal' | 'red';
}

type GroupNodeProps = NodeProps<Node<GroupNodeData, 'group'>>;

const colorMap: Record<string, { bg: string; border: string; label: string }> = {
  slate: { bg: 'bg-slate-300/50', border: 'border-slate-500', label: 'text-slate-700 bg-slate-300' },
};

function GroupNodeComponent({ data }: GroupNodeProps) {
  const nodeData = data as GroupNodeData;
  const colors = colorMap[nodeData.color || 'slate'] || colorMap.slate;

  return (
    <div
      className={`
        relative rounded-xl
        ${colors.bg}
      `}
      style={{
        width: nodeData.width,
        height: nodeData.height,
      }}
    >
      <Handle type="target" position={Position.Left} className="!opacity-0" />
      <Handle type="source" position={Position.Right} className="!opacity-0" />

      {/* Simple label at top-left */}
      <div
        className={`
          absolute -top-2.5 left-3 px-2 py-0.5 rounded
          text-xs font-medium tracking-wide uppercase
          ${colors.label}
        `}
      >
        {nodeData.label}
      </div>
    </div>
  );
}

export const GroupNode = memo(GroupNodeComponent);
