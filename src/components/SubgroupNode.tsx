import { memo } from 'react';
import type { NodeProps, Node } from '@xyflow/react';
import type { FlowNodeData } from '../types';

type SubgroupNodeProps = NodeProps<Node<FlowNodeData, 'subgroup'>>;

function SubgroupNodeComponent({ data }: SubgroupNodeProps) {
  const nodeData = data as FlowNodeData;

  return (
    <div className="px-3 py-1.5 rounded bg-slate-100 border-l-4 border-slate-400 shadow-sm">
      <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">
        {nodeData.label}
      </span>
    </div>
  );
}

export const SubgroupNode = memo(SubgroupNodeComponent);
