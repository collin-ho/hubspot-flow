import { useState, useCallback, useMemo } from 'react';
import type { ViewMode, FlowNode, NodeNote, NodeStatus } from './types';
import { FlowCanvas, useFlowData } from './components/FlowCanvas';
import { Glossary, GlossaryToggle } from './components/Glossary';
import { NodeEditor } from './components/NodeEditor';
import { Toolbar } from './components/Toolbar';
import { usePersistedState } from './hooks/usePersistedState';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('vanillasoft');
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);

  const {
    state: persistedState,
    getNotesForNode,
    addNoteToNode,
    updateNote,
    deleteNote,
    getStatusForNode,
    setStatusForNode,
    setPositionForNode,
  } = usePersistedState();

  const { nodes, edges } = useFlowData(viewMode);

  // Get current notes and status for selected node
  const selectedNodeNotes = useMemo(() => {
    if (!selectedNode) return [];
    return getNotesForNode(selectedNode.id);
  }, [selectedNode, getNotesForNode]);

  const selectedNodeStatus = useMemo(() => {
    if (!selectedNode) return 'pending' as NodeStatus;
    return getStatusForNode(selectedNode.id) || selectedNode.data.status;
  }, [selectedNode, getStatusForNode]);

  // Create nodeNotes map for FlowCanvas
  const nodeNotesMap = useMemo(() => {
    const map: Record<string, { length: number }> = {};
    for (const nodeId of Object.keys(persistedState.nodeNotes)) {
      map[nodeId] = { length: persistedState.nodeNotes[nodeId].length };
    }
    return map;
  }, [persistedState.nodeNotes]);

  const handleNodeClick = useCallback((node: FlowNode) => {
    setSelectedNode(node);
  }, []);

  const handleCloseEditor = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleAddNote = useCallback(
    (content: string, tags: string[]) => {
      if (selectedNode) {
        addNoteToNode(selectedNode.id, { content, tags });
      }
    },
    [selectedNode, addNoteToNode]
  );

  const handleUpdateNote = useCallback(
    (noteId: string, updates: Partial<NodeNote>) => {
      if (selectedNode) {
        updateNote(selectedNode.id, noteId, updates);
      }
    },
    [selectedNode, updateNote]
  );

  const handleDeleteNote = useCallback(
    (noteId: string) => {
      if (selectedNode) {
        deleteNote(selectedNode.id, noteId);
      }
    },
    [selectedNode, deleteNote]
  );

  const handleStatusChange = useCallback(
    (status: NodeStatus) => {
      if (selectedNode) {
        setStatusForNode(selectedNode.id, status);
      }
    },
    [selectedNode, setStatusForNode]
  );

  return (
    <div className="w-screen h-screen bg-gray-100 overflow-hidden">
      {/* Main Canvas */}
      <FlowCanvas
        viewMode={viewMode}
        nodeNotes={nodeNotesMap}
        nodeStatuses={persistedState.nodeStatuses}
        nodePositions={persistedState.nodePositions}
        onNodeClick={handleNodeClick}
        onNodePositionChange={setPositionForNode}
      />

      {/* Glossary Toggle Button */}
      <GlossaryToggle onClick={() => setGlossaryOpen(true)} />

      {/* Glossary Sidebar */}
      <Glossary isOpen={glossaryOpen} onToggle={() => setGlossaryOpen(false)} />

      {/* Toolbar */}
      <Toolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        nodes={nodes}
        edges={edges}
        persistedState={persistedState}
      />

      {/* Node Editor Modal */}
      {selectedNode && (
        <NodeEditor
          node={selectedNode}
          notes={selectedNodeNotes}
          onClose={handleCloseEditor}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          onStatusChange={handleStatusChange}
          currentStatus={selectedNodeStatus}
        />
      )}

      {/* View Mode Indicator */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className={`px-4 py-2 rounded-lg shadow-md text-sm font-medium ${
          viewMode === 'vanillasoft'
            ? 'bg-purple-100 text-purple-800 border border-purple-200'
            : 'bg-orange-100 text-orange-800 border border-orange-200'
        }`}>
          {viewMode === 'vanillasoft' ? 'Current State: VanillaSoft' : 'Target State: HubSpot'}
        </div>
      </div>
    </div>
  );
}

export default App;
