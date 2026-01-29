import { useState, useEffect, useCallback } from 'react';
import type { PersistedState, NodeNote, NodeStatus } from '../types';

const STORAGE_KEY = 'hubspot-flow-state';
const LAYOUT_VERSION = 28; // Bump this to reset positions on layout changes

const defaultState: PersistedState = {
  nodeNotes: {},
  nodeStatuses: {},
  nodePositions: {},
  lastUpdated: new Date().toISOString(),
};

function loadState(): PersistedState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Clear positions if layout version changed (keeps notes/statuses)
      const storedVersion = parsed.layoutVersion || 1;
      const shouldResetPositions = storedVersion < LAYOUT_VERSION;

      return {
        ...defaultState,
        ...parsed,
        nodePositions: shouldResetPositions ? {} : (parsed.nodePositions || {}),
        layoutVersion: LAYOUT_VERSION,
      };
    }
  } catch (e) {
    console.error('Failed to load persisted state:', e);
  }
  return { ...defaultState, layoutVersion: LAYOUT_VERSION };
}

function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      lastUpdated: new Date().toISOString(),
    }));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

export function usePersistedState() {
  const [state, setState] = useState<PersistedState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const getNotesForNode = useCallback((nodeId: string): NodeNote[] => {
    return state.nodeNotes[nodeId] || [];
  }, [state.nodeNotes]);

  const addNoteToNode = useCallback((nodeId: string, note: Omit<NodeNote, 'id' | 'createdAt'>) => {
    setState(prev => ({
      ...prev,
      nodeNotes: {
        ...prev.nodeNotes,
        [nodeId]: [
          ...(prev.nodeNotes[nodeId] || []),
          {
            ...note,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
        ],
      },
    }));
  }, []);

  const updateNote = useCallback((nodeId: string, noteId: string, updates: Partial<NodeNote>) => {
    setState(prev => ({
      ...prev,
      nodeNotes: {
        ...prev.nodeNotes,
        [nodeId]: (prev.nodeNotes[nodeId] || []).map(note =>
          note.id === noteId ? { ...note, ...updates } : note
        ),
      },
    }));
  }, []);

  const deleteNote = useCallback((nodeId: string, noteId: string) => {
    setState(prev => ({
      ...prev,
      nodeNotes: {
        ...prev.nodeNotes,
        [nodeId]: (prev.nodeNotes[nodeId] || []).filter(note => note.id !== noteId),
      },
    }));
  }, []);

  const getStatusForNode = useCallback((nodeId: string): NodeStatus | undefined => {
    return state.nodeStatuses[nodeId];
  }, [state.nodeStatuses]);

  const setStatusForNode = useCallback((nodeId: string, status: NodeStatus) => {
    setState(prev => ({
      ...prev,
      nodeStatuses: {
        ...prev.nodeStatuses,
        [nodeId]: status,
      },
    }));
  }, []);

  const getPositionForNode = useCallback((nodeId: string): { x: number; y: number } | undefined => {
    return state.nodePositions[nodeId];
  }, [state.nodePositions]);

  const setPositionForNode = useCallback((nodeId: string, position: { x: number; y: number }) => {
    setState(prev => ({
      ...prev,
      nodePositions: {
        ...prev.nodePositions,
        [nodeId]: position,
      },
    }));
  }, []);

  const exportState = useCallback(() => {
    return state;
  }, [state]);

  const importState = useCallback((newState: PersistedState) => {
    setState(newState);
  }, []);

  const clearState = useCallback(() => {
    setState(defaultState);
  }, []);

  return {
    state,
    getNotesForNode,
    addNoteToNode,
    updateNote,
    deleteNote,
    getStatusForNode,
    setStatusForNode,
    getPositionForNode,
    setPositionForNode,
    exportState,
    importState,
    clearState,
  };
}
