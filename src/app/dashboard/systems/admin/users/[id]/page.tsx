// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { UserAPI } from "@/app/lib/admin/api"; 
// import { UserAccount } from "@/types/admin/types";

// export default function UserDetailPage() {
//   const params = useParams();
//   const id = Number(params.id);

//   const [user, setUser] = useState<UserAccount | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchUser = async () => {
//       try {
//         const data = await UserAPI.getOne(id);
//         setUser(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   if (loading) return <div>Loading user...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!user) return <div>User not found</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         {user.first_name} {user.last_name}
//       </h1>

//       <div className="space-y-2">
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>User Type:</strong> {user.user_type}</p>
//         <p><strong>Active:</strong> {user.is_active ? "Yes" : "No"}</p>
//         <p><strong>Staff:</strong> {user.is_staff ? "Yes" : "No"}</p>
//         <p><strong>Date Joined:</strong> {user.date_joined}</p>

//         <div className="mt-4 border-t pt-4">
//           <h2 className="font-semibold">App Info</h2>
//           <p><strong>Name:</strong> {user.react_app_detail?.name}</p>
//           <p><strong>Domain:</strong> {user.react_app_detail?.domain}</p>
//           <p><strong>Status:</strong> {user.react_app_detail?.is_active ? "Active" : "Inactive"}</p>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserAPI } from "@/app/lib/admin/api";
import { UserAccount } from "@/types/admin/types";
import { motion } from "framer-motion";

export default function UserDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [user, setUser] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const data = await UserAPI.getOne(id);
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="text-muted-foreground">Loading user...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">
          {user.first_name} {user.last_name}
        </h1>
        <p className="text-sm text-muted-foreground">
          User details & system information
        </p>
      </motion.div>

      {/* User Card */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Profile Info */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <h2 className="font-semibold mb-4">Profile Info</h2>

          <div className="space-y-3 text-sm">
            <p><span className="text-muted-foreground">Email:</span> {user.email}</p>
            <p><span className="text-muted-foreground">User Type:</span> {user.user_type}</p>
            <p><span className="text-muted-foreground">Active:</span> {user.is_active ? "Yes" : "No"}</p>
            <p><span className="text-muted-foreground">Staff:</span> {user.is_staff ? "Yes" : "No"}</p>
            <p><span className="text-muted-foreground">Joined:</span> {new Date(user.date_joined).toLocaleDateString()}</p>
          </div>
        </div>

        {/* App Info */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <h2 className="font-semibold mb-4">App Info</h2>

          <div className="space-y-3 text-sm">
            <p><span className="text-muted-foreground">Name:</span> {user.react_app_detail?.name || "N/A"}</p>
            <p><span className="text-muted-foreground">Domain:</span> {user.react_app_detail?.domain || "N/A"}</p>
            <p>
              <span className="text-muted-foreground">Status:</span>{" "}
              {user.react_app_detail?.is_active ? "Active" : "Inactive"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}