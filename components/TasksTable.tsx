import React from 'react';

export type Task = {
  id: string;
  task_description: string;
  assigned_agent?: string;
  due_date?: string;
  priority?: string;
  status?: string;
};

export default function TasksTable({ tasks }: { tasks: Task[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">Task</th>
            <th className="px-3 py-2 border">Agent</th>
            <th className="px-3 py-2 border">Due Date</th>
            <th className="px-3 py-2 border">Priority</th>
            <th className="px-3 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-400">No tasks found.</td>
            </tr>
          ) : (
            tasks.map(task => (
              <tr key={task.id} className="border-b">
                <td className="px-3 py-2 border max-w-xs truncate">{task.task_description}</td>
                <td className="px-3 py-2 border">{task.assigned_agent}</td>
                <td className="px-3 py-2 border">{task.due_date ? new Date(task.due_date).toLocaleDateString() : ''}</td>
                <td className="px-3 py-2 border">{task.priority}</td>
                <td className="px-3 py-2 border">{task.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 