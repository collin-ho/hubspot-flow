import { BaseEdge, type EdgeProps } from '@xyflow/react';

/**
 * TreeEdge - Custom edge that routes through a vertical spine
 *
 * Path: source → horizontal to spine X → vertical along spine → horizontal to target
 * This creates clean converging/diverging tree patterns.
 */
export function TreeEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
}: EdgeProps) {
  // The spine X position is between source and target
  // Place it closer to the source for converging patterns
  const spineX = sourceX + (targetX - sourceX) * 0.3;

  // Build the path:
  // 1. Start at source
  // 2. Go horizontal to spine X
  // 3. Go vertical to target Y level
  // 4. Go horizontal to target
  const path = `M ${sourceX} ${sourceY} L ${spineX} ${sourceY} L ${spineX} ${targetY} L ${targetX} ${targetY}`;

  return (
    <BaseEdge
      path={path}
      style={style}
      markerEnd={markerEnd}
    />
  );
}
