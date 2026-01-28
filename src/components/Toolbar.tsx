import type { ViewMode, ExportData, FlowNode, FlowEdge, PersistedState } from '../types';

interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  nodes: FlowNode[];
  edges: FlowEdge[];
  persistedState: PersistedState;
}

export function Toolbar({
  viewMode,
  onViewModeChange,
  nodes,
  edges,
  persistedState,
}: ToolbarProps) {
  const handleExportJSON = () => {
    const exportData: ExportData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      viewMode,
      nodes,
      edges,
      notes: persistedState.nodeNotes,
      statuses: persistedState.nodeStatuses,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hubspot-flow-${viewMode}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    const lines: string[] = [
      `# HubSpot Migration Flow - ${viewMode === 'vanillasoft' ? 'VanillaSoft (Current State)' : 'HubSpot (Target State)'}`,
      '',
      `*Exported: ${new Date().toLocaleString()}*`,
      '',
      '## Nodes',
      '',
    ];

    for (const node of nodes) {
      const notes = persistedState.nodeNotes[node.id] || [];
      const status = persistedState.nodeStatuses[node.id] || node.data.status;
      const statusEmoji = status === 'confirmed' ? '✅' : status === 'pending' ? '🟡' : '❓';

      lines.push(`### ${statusEmoji} ${node.data.label}`);
      lines.push('');
      if (node.data.owner) {
        lines.push(`**Owner:** ${node.data.owner}`);
      }
      lines.push(`**Status:** ${status}`);
      if (node.data.description) {
        lines.push('');
        lines.push(`> ${node.data.description}`);
      }
      lines.push('');

      if (notes.length > 0) {
        lines.push('**Notes:**');
        for (const note of notes) {
          lines.push(`- ${note.content}`);
          if (note.tags.length > 0) {
            lines.push(`  - *Tags: ${note.tags.join(', ')}*`);
          }
        }
        lines.push('');
      }
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hubspot-flow-${viewMode}-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      {/* View Mode Toggle */}
      <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <button
          onClick={() => onViewModeChange('vanillasoft')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            viewMode === 'vanillasoft'
              ? 'bg-orange-500 text-white'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          VanillaSoft
        </button>
        <button
          onClick={() => onViewModeChange('hubspot')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            viewMode === 'hubspot'
              ? 'bg-orange-500 text-white'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          HubSpot
        </button>
      </div>

      {/* Export Buttons */}
      <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <button
          onClick={handleExportJSON}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1"
          title="Export as JSON"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          JSON
        </button>
        <button
          onClick={handleExportMarkdown}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-l border-gray-200 flex items-center gap-1"
          title="Export as Markdown"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          MD
        </button>
      </div>
    </div>
  );
}
