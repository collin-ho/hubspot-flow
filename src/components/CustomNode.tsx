import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import type { FlowNodeData } from '../types';

type CustomNodeProps = NodeProps<Node<FlowNodeData, 'custom'>>;

// Highlight acronyms (2+ uppercase letters) in a distinct color
function highlightAcronyms(text: string) {
  const parts = text.split(/(\b[A-Z]{2,}\b)/g);
  return parts.map((part, i) =>
    /^[A-Z]{2,}$/.test(part) ? (
      <span key={i} className="text-blue-600 font-semibold">{part}</span>
    ) : (
      part
    )
  );
}

function CustomNodeComponent({ data, selected }: CustomNodeProps) {
  const nodeData = data as FlowNodeData;
  const noteCount = nodeData.notes?.length || 0;
  const isQuestion = nodeData.status === 'open-question';

  return (
    <div
      className={`
        relative px-4 py-3 rounded-lg shadow-sm border-2 min-w-[200px] max-w-[280px]
        transition-all duration-150 cursor-pointer
        ${isQuestion
          ? 'bg-amber-50 border-amber-400 shadow-md'
          : 'bg-white border-slate-300'
        }
        ${selected ? 'ring-2 ring-slate-400 border-slate-400' : ''}
        hover:shadow-md
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-slate-400 !w-2 !h-2 !border-2 !border-white"
      />

      {/* Question indicator - only accent color in the whole flow */}
      {isQuestion && (
        <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-amber-500 text-white rounded-full shadow-md text-xs font-bold">
          ?
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-sm leading-tight">
            {highlightAcronyms(nodeData.label)}
          </div>
          {nodeData.owner && (
            <div className="text-xs text-gray-500 mt-0.5 font-medium">{highlightAcronyms(nodeData.owner)}</div>
          )}
        </div>

        {noteCount > 0 && (
          <div className="flex-shrink-0 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
            {noteCount}
          </div>
        )}
      </div>

      {nodeData.description && (
        <div className={`text-xs mt-2 leading-relaxed ${isQuestion ? 'text-amber-800' : 'text-gray-500'}`}>
          {/* If it's a question, extract and highlight the question part */}
          {isQuestion && nodeData.description.includes('QUESTION:') ? (
            <>
              <span className="text-gray-500">
                {highlightAcronyms(nodeData.description.split('QUESTION:')[0])}
              </span>
              <span className="block mt-1.5 p-2 bg-amber-100 rounded border border-amber-300 text-amber-900 font-medium">
                {highlightAcronyms(nodeData.description.split('QUESTION:')[1]?.trim() || '')}
              </span>
            </>
          ) : (
            <span className="line-clamp-2">{highlightAcronyms(nodeData.description)}</span>
          )}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-slate-400 !w-2 !h-2 !border-2 !border-white"
      />
    </div>
  );
}

export const CustomNode = memo(CustomNodeComponent);
