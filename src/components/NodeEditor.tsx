import { useState, useEffect, useCallback } from 'react';
import type { FlowNode, NodeNote, NodeStatus } from '../types';
import { StatusLabel } from './StatusBadge';

interface NodeEditorProps {
  node: FlowNode | null;
  notes: NodeNote[];
  onClose: () => void;
  onAddNote: (content: string, tags: string[]) => void;
  onUpdateNote: (noteId: string, updates: Partial<NodeNote>) => void;
  onDeleteNote: (noteId: string) => void;
  onStatusChange: (status: NodeStatus) => void;
  currentStatus: NodeStatus;
}

const PEOPLE_TAGS = ['Chuck', 'Chase', 'Margie', 'BDC Team', 'RVP Team', 'Admin'];

export function NodeEditor({
  node,
  notes,
  onClose,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onStatusChange,
  currentStatus,
}: NodeEditorProps) {
  const [newNote, setNewNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (editingNoteId) {
          setEditingNoteId(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, editingNoteId]);

  const handleAddNote = useCallback(() => {
    if (newNote.trim()) {
      onAddNote(newNote.trim(), selectedTags);
      setNewNote('');
      setSelectedTags([]);
    }
  }, [newNote, selectedTags, onAddNote]);

  const handleStartEdit = (note: NodeNote) => {
    setEditingNoteId(note.id);
    setEditingContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editingNoteId && editingContent.trim()) {
      onUpdateNote(editingNoteId, { content: editingContent.trim() });
      setEditingNoteId(null);
      setEditingContent('');
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{node.data.label}</h2>
            {node.data.owner && (
              <span className="text-sm text-gray-500">Owner: {node.data.owner}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description */}
        {node.data.description && (
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">{node.data.description}</p>
          </div>
        )}

        {/* Status */}
        <div className="px-4 py-3 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="flex gap-2">
            {(['confirmed', 'pending', 'open-question'] as NodeStatus[]).map(status => (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  currentStatus === status
                    ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <StatusLabel status={status} />
              </button>
            ))}
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Notes ({notes.length})
          </h3>
          <div className="space-y-3">
            {notes.map(note => (
              <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                {editingNoteId === note.id ? (
                  <div>
                    <textarea
                      value={editingContent}
                      onChange={e => setEditingContent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-800">{note.content}</p>
                    {note.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {note.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            @{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleStartEdit(note)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteNote(note.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            {notes.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No notes yet</p>
            )}
          </div>
        </div>

        {/* Add Note */}
        <div className="p-4 border-t border-gray-200">
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
            onKeyDown={e => {
              if (e.key === 'Enter' && e.metaKey) {
                handleAddNote();
              }
            }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {PEOPLE_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2 py-0.5 text-xs rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                @{tag}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-400">Cmd+Enter to add</span>
            <button
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
