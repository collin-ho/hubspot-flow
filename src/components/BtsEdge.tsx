import { BaseEdge, type EdgeProps } from '@xyflow/react';

/**
 * BtsEdge - Custom edge that routes below everything
 *
 * Path: source → right → down → left → up → target
 * Used for the BTS "restart" path back to Queue
 */
export function BtsEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
}: EdgeProps) {
  // Calculate the bottom Y (below everything)
  const bottomY = sourceY + 150; // Go below the BHYB track

  // Small offset to the right before going down
  const rightOffset = sourceX + 50;

  // Build the path:
  // 1. Start at source (BTS)
  // 2. Go right a bit
  // 3. Go down to bottom
  // 4. Go left to below target
  // 5. Go up to target (Queue)
  const path = `
    M ${sourceX} ${sourceY}
    L ${rightOffset} ${sourceY}
    L ${rightOffset} ${bottomY}
    L ${targetX} ${bottomY}
    L ${targetX} ${targetY}
  `;

  return (
    <BaseEdge
      path={path}
      style={style}
      markerEnd={markerEnd}
    />
  );
}
