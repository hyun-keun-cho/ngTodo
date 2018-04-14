import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TodoVo} from '../domain/todo.vo';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnInit {

  todoList: TodoVo[] = null;
  todoData: TodoVo = null;
  autoSeq: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // setInterval(this.setTimeInsertTodo, 1000);
  }

  setTimeInsertTodo(todo) {
    console.log(todo);

    setInterval(function (arg1, arg2) {
      if (this.autoSeq % 2 === 0 || this.autoSeq === 0) {
        this.userService.insertTodoList('쿵').subscribe(result => {
          console.log(result);
        });
      } else {
        this.userService.insertTodoList('짝').subscribe(result => {
          console.log(result);
        });
      }
      this.autoSeq++;
    }, 1000);
  }

  testGetList() {
    this.userService.getTodoList().subscribe(data => {
      this.todoList = data;
    });
  }

  dataClear() {
    this.todoList = null;
  }

  deleteTodo(todoData: TodoVo) {
    this.userService.deleteTodo(todoData.todo_id).subscribe(result => {
      if (result.result === 0) {
        alert('삭제 성공');
        this.testGetList();
      }
    });
  }

  insertTodo(todoStr: string) {
    const todo = todoStr || 'ㅋㅋㅋㅋ';

    this.userService.insertTodoList(todo).subscribe(result => {
      console.log(result);
      if (result) {
        this.testGetList();
      }
    });
  }

}
