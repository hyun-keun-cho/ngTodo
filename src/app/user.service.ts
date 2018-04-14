import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TodoVo} from './domain/todo.vo';
import {environment} from '../environments/environment';

@Injectable()
export class UserService {

  private SERVER: string;
  private headers;

  constructor(private http: HttpClient) {
    this.SERVER = `${environment.HOST}`
    this.headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
  }

  getTodoList(): Observable<TodoVo[]> {
    return this.http.get<TodoVo[]>('http://www.javabrain.kr:8080/api/todo');
  }

  insertTodoList(todo): Observable<TodoVo[]> {
    const url = `${this.SERVER}/api/todo`;
    const todoData = new TodoVo();
    todoData.todo = todo;

    return this.http.post<TodoVo[]>(url, todoData, {headers: this.headers});
  }

  deleteTodo(todoId): Observable<Object> {
    const url = `${this.SERVER}/api/todo?todo_id=${todoId}`;
    return this.http.delete<Object>(url);
  }
}
