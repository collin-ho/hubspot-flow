import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';

export interface StageNodeData extends Record<string, unknown> {
  label: string;
  subtitle?: string;
  color?: string;
}

type StageNodeProps = NodeProps<Node<StageNodeData, 'stage'>>;

function highlightAcronyms(text: string) {
  const parts = text.split(/(\b[A-Z]{2,}\b)/g);
  return parts.map((part, i) =>
    /^[A-Z]{2,}$/.test(part) ? (
      <span key={i} className="text-blue-600">{part}</span>
    ) : (
      part
    )
  );
}

const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  slate: { bg: 'bg-slate-100', border: 'border-slate-400', text: 'text-slate-800', accent: 'bg-slate-500' },
  green: { bg: 'bg-emerald-100', border: 'border-emerald-500', text: 'text-emerald-900', accent: 'bg-emerald-500' },
  gray: { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-900', accent: 'bg-gray-500' },
};

function StageNodeComponent({ data }: StageNodeProps) {
  const nodeData = data as StageNodeData;
  const colors = colorMap[nodeData.color || 'slate'] || colorMap.slate;

  return (
    <div
      className={`
        relative px-6 py-4 rounded-xl shadow-md border-2 min-w-[200px]
        ${colors.bg} ${colors.border}
      `}
    >
      <Handle type="target" position={Position.Left} className="!bg-slate-500 !w-3 !h-3 !border-2 !border-white" />

      <div className="text-center">
        <div className={`font-bold text-lg tracking-tight ${colors.text}`}>
          {highlightAcronyms(nodeData.label)}
        </div>
        {nodeData.subtitle && (
          <div className="text-xs text-slate-500 mt-0.5">{highlightAcronyms(nodeData.subtitle)}</div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!bg-slate-500 !w-3 !h-3 !border-2 !border-white" />
    </div>
  );
}

export const StageNode = memo(StageNodeComponent);
