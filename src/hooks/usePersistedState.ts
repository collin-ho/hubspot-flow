import { useState, useEffect, useCallback } from 'react';
import type { PersistedState, NodeNote, NodeStatus } from '../types';

const STORAGE_KEY = 'hubspot-flow-state';

const defaultState: PersistedState = {
  nodeNotes: {},
  nodeStatuses: {},
  lastUpdated: new Date().toISOString(),
};

function loadState(): PersistedState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load persisted state:', e);
  }
  return defaultState;
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
    exportState,
    importState,
    clearState,
  };
}
