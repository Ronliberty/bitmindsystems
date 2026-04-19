"use client";

import { useEffect, useState } from "react";
import { SettingsAPI } from "@/app/lib/admin/api";
import { SystemSettings } from "@/types/admin/types"; 

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const appId = "YOUR_APP_ID"; // replace with auth context later

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await SettingsAPI.getSettings(appId);
        setSettings(data);

      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ⏳ Skeleton loading
  if (loading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-700 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-gray-800 rounded-xl" />
          <div className="h-32 bg-gray-800 rounded-xl" />
        </div>
      </div>
    );
  }

  // ⚠️ Better error UI
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md">

          <div className="text-5xl">⚠️</div>

          <h2 className="text-xl font-semibold">
            Could not load system settings
          </h2>

          <p className="text-sm text-muted-foreground">
            We are having trouble connecting to the server.
          </p>

          <div className="text-xs text-red-400 bg-red-500/10 p-2 rounded">
            {error}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-cyan-500 text-black rounded-lg font-semibold"
          >
            Retry
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">
          Control system behavior
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-5 border rounded-xl bg-card">
          <h2 className="font-semibold">Maintenance Mode</h2>
          <p className="text-sm text-muted-foreground">
            {settings?.maintenance_mode ? "ON" : "OFF"}
          </p>
        </div>

        <div className="p-5 border rounded-xl bg-card">
          <h2 className="font-semibold">Registrations</h2>
          <p className="text-sm text-muted-foreground">
            {settings?.allow_registrations ? "Enabled" : "Disabled"}
          </p>
        </div>

        <div className="p-5 border rounded-xl bg-card">
          <h2 className="font-semibold">Max Users</h2>
          <p className="text-sm text-muted-foreground">
            {settings?.max_users}
          </p>
        </div>

      </div>
    </div>
  );
}