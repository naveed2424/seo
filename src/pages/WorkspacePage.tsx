import React, { useState, useEffect } from 'react';
import { Bookmark, Download, Trash2, Copy, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { workspaceStorage, SavedItem } from '../utils/workspaceStorage';

interface WorkspacePageProps {
  navigate: (route: string) => void;
}

export const WorkspacePage: React.FC<WorkspacePageProps> = ({ navigate }) => {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setItems(workspaceStorage.getItems());
  }, []);

  const handleRemove = (id: string) => {
    workspaceStorage.removeItem(id);
    setItems(workspaceStorage.getItems());
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Header with Export Options */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-indigo-600" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              My Saved Workspace
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Persisted locally in your browser. Save keywords, generated drafts, prompts, and tool outputs with zero account setup.
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => workspaceStorage.exportToCSV(items)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => workspaceStorage.exportToJSON(items)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-neutral-800 shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        )}
      </div>

      {/* Items List */}
      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs hover:border-neutral-300 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-neutral-100 text-neutral-800 text-[10px] font-bold px-2 py-0.5 uppercase">
                      {item.type}
                    </span>
                    <span className="text-neutral-400 text-xs">•</span>
                    <span className="text-xs text-neutral-400">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mt-1">{item.title}</h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(item.id, item.content)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
                    title="Copy content"
                  >
                    {copiedId === item.id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-neutral-100"
                    title="Remove from workspace"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content Preview */}
              <div className="rounded-xl bg-neutral-50 p-3 text-xs text-neutral-600 font-mono line-clamp-3 overflow-hidden">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-white py-16 text-center space-y-3">
          <Bookmark className="h-10 w-10 text-neutral-300 mx-auto" />
          <h3 className="text-base font-bold text-neutral-800">Your workspace is currently empty</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Run the Keyword Explorer, AI Article Writer, or browse Prompts and click "Save" to collect assets here.
          </p>
          <button
            onClick={() => navigate('/tools')}
            className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-xs"
          >
            Explore Free Tools →
          </button>
        </div>
      )}
    </div>
  );
};
