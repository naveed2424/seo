import React, { useState, useEffect } from 'react';
import { Shield, Check } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('rankpulse_cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'rankpulse_cookie_consent',
      JSON.stringify({ necessary: true, analytics: true, marketing: true })
    );
    setVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem(
      'rankpulse_cookie_consent',
      JSON.stringify({ necessary: true, analytics: false, marketing: false })
    );
    setVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('rankpulse_cookie_consent', JSON.stringify(preferences));
    setVisible(false);
    setShowPreferences(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
          <Shield className="h-4 w-4" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-neutral-900">Privacy &amp; Cookie Consent (GDPR Compliant)</h4>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            We use strictly necessary cookies to power core tools and remember your saved workspace items. You can choose whether to enable anonymous analytics.
          </p>
        </div>
      </div>

      {showPreferences && (
        <div className="mt-4 pt-3 border-t border-neutral-100 space-y-2 text-xs">
          <label className="flex items-center justify-between p-2 rounded-lg bg-neutral-50">
            <span className="font-semibold text-neutral-700">Essential &amp; Workspace Storage</span>
            <span className="text-[10px] text-neutral-400 font-bold">Always Active</span>
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 cursor-pointer">
            <span className="font-semibold text-neutral-700">Anonymous Aggregate Analytics</span>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
              className="rounded text-blue-600"
            />
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-end gap-2 text-xs font-semibold">
        <button
          onClick={() => setShowPreferences(!showPreferences)}
          className="text-neutral-500 hover:text-neutral-900 px-3 py-1.5"
        >
          {showPreferences ? 'Hide Options' : 'Manage Preferences'}
        </button>
        <button
          onClick={handleRejectAll}
          className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-neutral-700 hover:bg-neutral-100"
        >
          Reject Non-Essential
        </button>
        {showPreferences ? (
          <button
            onClick={handleSavePreferences}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
          >
            Save Choices
          </button>
        ) : (
          <button
            onClick={handleAcceptAll}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-white hover:bg-blue-700"
          >
            Accept All
          </button>
        )}
      </div>
    </div>
  );
};
