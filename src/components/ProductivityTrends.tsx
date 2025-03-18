
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card.tsx"
import { useTodoStore } from "../store/todoStore";
import { format, subWeeks, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

const ProductivityTrends: React.FC = () => {
    const todos = useTodoStore((state) => state.todos);

    // Filter tasks that are completed and have a completedAt date.
    const completedTasks = todos.filter(
        (todo) => todo.completed && todo.completedAt
    );

    // Prepare data for the last eight weeks.
    const weeks = [];
    const now = new Date();
    for (let i = 7; i >= 0; i--) {
        const weekStart = startOfWeek(subWeeks(now, i), { weekStartsOn: 1 });
        const weekEnd = endOfWeek(subWeeks(now, i), { weekStartsOn: 1 });
        // Use the week start date as a label.
        const weekLabel = format(weekStart, "MMM d");
        // Count tasks completed in the week.
        const count = completedTasks.filter((task) => {
            const date = new Date(task.completedAt);
            return isWithinInterval(date, { start: weekStart, end: weekEnd });
        }).length;
        weeks.push({ week: weekLabel, count });
    }

    return (
        <Card>
        <div className="p-0 pr-1 bg-white dark:bg-gray-800 border border-white/20 dark:border-white/10 rounded-lg shadow-sm">
            <CardHeader>
                <CardTitle>Weekly Productivity Trends</CardTitle>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeks}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#4CAF50" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
        </div>
        </Card>
    );
};

export default ProductivityTrends;