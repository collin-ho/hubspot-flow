import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';

export interface MiniNodeData extends Record<string, unknown> {
  label: string;
  owner?: string;
  color?: 'slate' | 'blue' | 'green' | 'amber';
}

type MiniNodeProps = NodeProps<Node<MiniNodeData, 'mini'>>;

const colorMap = {
  slate: 'bg-slate-100 border-slate-300 text-slate-700',
  blue: 'bg-blue-100 border-blue-300 text-blue-700',
  green: 'bg-green-100 border-green-300 text-green-700',
  amber: 'bg-amber-100 border-amber-300 text-amber-700',
};

function MiniNodeComponent({ data, selected }: MiniNodeProps) {
  const nodeData = data as MiniNodeData;
  const colors = colorMap[nodeData.color || 'slate'];

  return (
    <div
      className={`
        relative px-3 py-1.5 rounded-md border text-xs font-medium
        transition-all duration-150 cursor-pointer
        ${colors}
        ${selected ? 'ring-2 ring-slate-400' : ''}
        hover:shadow-sm
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-slate-400 !w-1.5 !h-1.5 !border !border-white"
      />

      <div className="whitespace-nowrap">
        {nodeData.label}
        {nodeData.owner && (
          <span className="ml-1 opacity-60">({nodeData.owner})</span>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-slate-400 !w-1.5 !h-1.5 !border !border-white"
      />
    </div>
  );
}

export const MiniNode = memo(MiniNodeComponent);
