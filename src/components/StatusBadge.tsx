import type { NodeStatus } from '../types';

interface StatusBadgeProps {
  status: NodeStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<NodeStatus, { color: string; label: string }> = {
  confirmed: {
    color: 'bg-green-500',
    label: 'Confirmed',
  },
  pending: {
    color: 'bg-yellow-500',
    label: 'Pending',
  },
  'open-question': {
    color: 'bg-red-500',
    label: 'Open Question',
  },
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClass = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';

  return (
    <span
      className={`inline-block rounded-full ${config.color} ${sizeClass}`}
      title={config.label}
    />
  );
}

export function StatusLabel({ status }: { status: NodeStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs`}>
      <span className={`w-2 h-2 rounded-full ${config.color}`} />
      {config.label}
    </span>
  );
}
