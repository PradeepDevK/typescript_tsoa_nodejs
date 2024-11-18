import { Controller, Get, Post, Route, Body, Path, Tags } from "tsoa";
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";

@Route("tasks")
@Tags("tasks")
export class TaskController extends Controller {
    private taskService: TaskService = new TaskService();

    @Get("/")
    @Tags("tasks")
    public async getAllTasks(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }

    @Get("{id}")
    @Tags("tasks")
    public async getTaskById(@Path("id") id: number): Promise<Task | null> {
        return this.taskService.getTaskById(id);
    }

    @Post("/")
    @Tags("tasks")
    public  async createTask(@Body() task: Omit<Task, "id">): Promise<Task> {
        return this.taskService.createTask(task);
    }
}