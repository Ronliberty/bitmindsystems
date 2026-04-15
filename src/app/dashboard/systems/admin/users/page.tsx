"use client";

import { useEffect, useState } from "react";
import { UserAPI } from "@/app/lib/admin/api";
import { UserAccount } from "@/types/admin/types";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserAPI.getAll();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="space-y-4">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.id}`}
            className="block border p-4 rounded hover:bg-gray-100"
          >
            <p className="font-semibold">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-xs text-gray-500">
              App: {user.react_app_detail?.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}