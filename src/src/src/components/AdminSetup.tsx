import React, { useState } from 'react';
import { Database, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { addServicesToFirestore } from '../scripts/addServices';

export default function AdminSetup() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ successCount: number; errorCount: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddServices = async () => {
    if (!window.confirm('This will add 50+ services to Firestore. Continue?')) {
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const counts = await addServicesToFirestore();
      setResult(counts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Setup</h2>
            <p className="text-sm text-gray-600">One-time database initialization</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">What this does:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Adds 50+ verified NYC social services to Firestore</li>
              <li>• Includes housing, healthcare, legal, employment, education, food, language, mental health, and childcare services</li>
              <li>• Each service includes full contact info, hours, and multilingual support</li>
            </ul>
          </div>

          <button
            onClick={handleAddServices}
            disabled={loading || result !== null}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Adding services to Firestore...</span>
              </>
            ) : result ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Services Added Successfully!</span>
              </>
            ) : (
              <>
                <Database className="w-5 h-5" />
                <span>Initialize Database with 50+ Services</span>
              </>
            )}
          </button>

          {/* Success Message */}
          {result && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 mb-1">Success!</h4>
                  <p className="text-sm text-green-800">
                    Added {result.successCount} services to Firestore
                  </p>
                  {result.errorCount > 0 && (
                    <p className="text-sm text-orange-700 mt-1">
                      {result.errorCount} services failed to add
                    </p>
                  )}
                  <p className="text-xs text-green-700 mt-2">
                    You can now remove this component from your app.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start space-x-2">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 mb-1">Error</h4>
                  <p className="text-sm text-red-800">{error}</p>
                  <p className="text-xs text-red-700 mt-2">
                    Make sure Firebase is properly configured.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
