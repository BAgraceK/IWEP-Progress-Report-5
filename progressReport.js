import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const trainingModules = [
  { name: "Entrepreneurial Skills Training", total: 10, completed: 0 },
  { name: "Networking", total: 1, completed: 0 },
  { name: "Workshops", total: 5, completed: 0 },
  { name: "One-on-One with BA", total: 1, completed: 0 },
  { name: "Online Business Case Study / Mentorship", total: 1, completed: 0 },
];

export default function ProgressReport() {
  const [modules, setModules] = useState(trainingModules);
  const [clientName, setClientName] = useState("");

  const updateProgress = (index) => {
    const newModules = [...modules];
    if (newModules[index].completed < newModules[index].total) {
      newModules[index].completed += 1;
    }
    setModules(newModules);
  };

  const totalSessions = modules.reduce((acc, module) => acc + module.total, 0);
  const completedSessions = modules.reduce((acc, module) => acc + module.completed, 0);
  const overallProgress = Math.round((completedSessions / totalSessions) * 100);

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center text-red-600">Your IWEP Progress Report</h1>
      <input 
        type="text" 
        placeholder="Enter Client's Name" 
        className="w-full p-2 border rounded-md" 
        value={clientName} 
        onChange={(e) => setClientName(e.target.value)}
      />
      <h2 className="text-center font-semibold mt-2">Client: {clientName}</h2>
      <Progress value={overallProgress} className="h-4 bg-white border-2 border-red-500" style={{ backgroundColor: "white", color: "red" }} />
      <p className="text-center text-red-600">{overallProgress}% Completed</p>
      
      {modules.map((module, index) => (
        <Card key={index} className="p-4">
          <CardContent className="flex items-center gap-4">
            <div className="flex-1">
              <h2 className="font-semibold">{module.name}</h2>
              <Progress value={(module.completed / module.total) * 100} className="h-3 mt-2 bg-white border-2 border-red-500" style={{ backgroundColor: "white", color: "red" }} />
              <p className="text-sm mt-1">{module.completed} / {module.total} Sessions Completed</p>
            </div>
            {module.completed === module.total && <CheckCircle className="text-green-600" size={24} />}
          </CardContent>
          <Button 
            onClick={() => updateProgress(index)}
            className="mt-2 bg-red-500 text-white" 
            disabled={module.completed === module.total}
          >
            Mark as Completed
          </Button>
        </Card>
      ))}

      <div className="p-4 border rounded-md mt-4 text-center bg-gray-100">
        <h3 className="font-semibold">Client Progress Survey</h3>
        <p className="text-gray-500">(Pending Completion)</p>
        <a href="https://success.jotform.com/250055640494051" target="_blank" className="text-blue-500 underline">Complete the Survey</a>
      </div>

      <div className="p-4 border rounded-md mt-4 text-center bg-yellow-100">
        <h3 className="font-semibold text-yellow-700">Sign Up for the Upcoming Bootcamp!</h3>
        <p>Complete the Bootcamp to achieve 100% progress and earn a final reward!</p>
        <a href="https://success.jotform.com/250136174207045" target="_blank">
          <Button className="mt-2 bg-red-500 text-white">Register Now</Button>
        </a>
      </div>
    </div>
  );
}
