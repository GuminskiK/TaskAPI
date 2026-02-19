import { query } from '../db';
import { Task } from '../types';


export const getAllTasks = async (): Promise<Task[]> => {
  const result = await query('SELECT * FROM tasks ORDER BY created_at DESC');
  return result.rows;
};

export const getTaskById = async (id: number): Promise<Task | null> => {
  const result = await query('SELECT * FROM tasks WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const createTask = async (title: string, description: string): Promise<Task> => {
  const result = await query(
    'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
    [title, description]
  );
  return result.rows[0];
};

export const updateTask = async (
  id: number,
  title: string,
  description: string,
  is_completed: boolean | undefined
): Promise<Task | null> => {
  const result = await query(
    'UPDATE tasks SET title = $1, description = $2, is_completed = COALESCE($3, is_completed) WHERE id = $4 RETURNING *',
    [title, description, is_completed, id]
  );
  return result.rows[0] || null;
};

export const deleteTask = async (id: number): Promise<Task | null> => {
  const result = await query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
};
