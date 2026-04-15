// app/dashboard/tasks/page.tsx
import { format } from "date-fns";
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Hourglass, 
  XCircle,
  Flame,
  Calendar,
  FileText
} from "lucide-react";
import { TaskMode } from "@/app/lib/api"; // ← your interface
import ManagerOverviewAI from "@/components/ai/ManagerOverviewAI";



export default async function TasksOverview() {
 
  return (
   <div className="h-full flex flex-col">
         <ManagerOverviewAI />
       </div>
  );
}