import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';

export interface SpineNodeData extends Record<string, unknown> {
  color?: 'slate' | 'blue';
}

type SpineNodeProps = NodeProps<Node<SpineNodeData, 'spine'>>;

/**
 * SpineNode - A minimal junction point for converging edges
 *
 * Handles are positioned to create clean vertical spine convergence:
 * - Target handle on LEFT: edges from multiple sources approach horizontally,
 *   then turn to form a vertical line before entering
 * - Source handle on RIGHT: single edge exits to continue the flow
 */
function SpineNodeComponent({ data }: SpineNodeProps) {
  const color = data.color === 'blue' ? '#3b82f6' : '#64748b';

  return (
    <div className="relative w-2 h-2">
      {/* Target handle - edges converge here from the left */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !border-0"
        style={{ background: color }}
      />

      {/* Minimal visual dot */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: color }}
      />

      {/* Source handle - single edge exits to the right */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 !border-0"
        style={{ background: color }}
      />
    </div>
  );
}

export const SpineNode = memo(SpineNodeComponent);
