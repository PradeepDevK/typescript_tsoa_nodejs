import * as fs from "fs";
import { Task } from "../models/task.model";

export class TaskService {
    private tasks: Task[] = [];

    constructor() {
        // Load tasks from file on startup
        this.loadTasks();
    }

    private loadTasks() {
        if (fs.existsSync("tasks.json")) {
            const data = fs.readFileSync("tasks.json", "utf-8");
            this.tasks = JSON.parse(data);
        }
    }

    private saveTasks() {
        fs.writeFileSync("tasks.json", JSON.stringify(this.tasks, null, 2));
    }

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    public getTaskById(id: number): Task | null {
        return this.tasks.find((task) => task.id === id) || null;
    }

    public createTask(task: Omit<Task, "id">): Task {
        const newTask: Task = { id: this.tasks.length + 1, ...task };
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }
}