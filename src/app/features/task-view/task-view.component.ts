import { OnInit, Component, AfterViewInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatSnackBarType, SnakbarService } from 'src/app/shared/services/snackbar/snakbar.service';
import { TasksService, filterTasks } from 'src/app/shared/services/tasks-api/tasks/tasks.service';

export interface TaskData {
  _id: string,
  description: string;
  createdAt: string;
  completed: boolean;
  updatedAt: string;
}

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})

export class TaskViewComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['description', 'createdAt', 'completed', 'updatedAt'];
  dataSource: MatTableDataSource<AbstractControl> = new MatTableDataSource();
  originalTask: TaskData[] = [];
  columnName: string = '';
  index: number = -1;
  pageSize = 5;
  pageIndex = 0;
  newTaskName: string = '';
  taskForms: FormGroup;
  userid: string = '';

  subscriptions: Subscription[] = [];

  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private getTasks: TasksService,
    private formBuilder: FormBuilder,
    private snakbar: SnakbarService) {
    this.taskForms = this.formBuilder.group({
      tasksArray: this.formBuilder.array([])
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {

  }

  get valusChangesOfTaskArray(): AbstractControl[] {
    const getControlArray = this.taskForms.controls['tasksArray'] as FormArray
    return getControlArray.controls
  }

  createFormControl(tasks: Array<TaskData>) {
    this.taskForms.controls['tasksArray'] = this.formBuilder.array([]);
    (this.taskForms.controls['tasksArray'] as FormArray).clear();

    tasks.forEach((elementRow, index) => {
      (this.taskForms.controls['tasksArray'] as FormArray).push(this.createDynamicForm(elementRow))
    });
  }

  createDynamicForm(elementRow: any) {
    let creatformObject: { [index: string | number]: any } = {};

    for (let i = 0; i < this.displayedColumns.length; i++) {
      creatformObject[this.displayedColumns[i]] = elementRow[this.displayedColumns[i]];
      creatformObject[this.displayedColumns[i] + "_edit"] = false;
    }
    if (elementRow['_id']) {
      creatformObject['Id'] = elementRow['_id'];
    }
    return this.formBuilder.group(creatformObject)
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  /*   clearValueInput(columnName: string, index: any, row: any) {
      index = (this.pageSize * this.pageIndex) + index
      this.valusChangesOfTaskArray[index].get(columnName)?.setValue('');
    } */

  changerowElementToedit(columnName: string, index: any, row: any) {
    index = (this.pageSize * this.pageIndex) + index
    let editable = this.valusChangesOfTaskArray[this.index]?.get(this.columnName + '_edit')?.value
    if (this.columnName !== '' && this.index !== -1 && editable) {
      this.valusChangesOfTaskArray[this.index].get(this.columnName + '_edit')?.setValue(false);
    }
    this.valusChangesOfTaskArray[index].get(columnName + '_edit')?.setValue(true);
    this.columnName = columnName;
    this.index = index;
  }

  saverowInput(columnName: string, index: any, row: any) {
    index = (this.pageSize * this.pageIndex) + index
    this.valusChangesOfTaskArray[index].get(columnName + '_edit')?.setValue(false);
    let id = this.valusChangesOfTaskArray[index].get('Id')?.value
    let property = {
      [columnName]: this.valusChangesOfTaskArray[index].get(columnName)?.value
    }
    if (columnName === 'completed') {
      property[columnName] = !this.valusChangesOfTaskArray[index].get(columnName)?.value
    }
    this.subscriptions.push(this.getTasks.updateTask(property, id).subscribe((response: any) => {
      if (!response.success) {
        let failedValue: any = this.originalTask.filter((row) => row._id === id)
        this.valusChangesOfTaskArray[index].get(columnName)?.setValue(failedValue[0][columnName]);
        this.snakbar.showSnakBar('error updating value', MatSnackBarType.error)
      } else {
        this.snakbar.showSnakBar('Task Updated', MatSnackBarType.success)
      }
    }))
  }

  filterTasks(value?: string) {
    this.dataSource = new MatTableDataSource();
    this.originalTask = [];
    let filterTasks: filterTasks = {};
    if (value) {
      filterTasks.completed = value === 'true' ? true : false
    }
    console.log(value, filterTasks)
    this.subscriptions.push(this.getTasks.getTasks(filterTasks).subscribe((response: any) => {
      try {
        if (response.success) {
          this.originalTask = response.tasks;
          this.createFormControl(response.tasks)
          this.dataSource = new MatTableDataSource((this.taskForms.controls['tasksArray'] as FormArray)?.controls);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.snakbar.showSnakBar('All Task featched', MatSnackBarType.success)
        } else {
          this.snakbar.showSnakBar('error' + response.error.message, MatSnackBarType.error)
        }
      } catch (e) {
        this.snakbar.showSnakBar('error getting Tasks', MatSnackBarType.error)
      }
    }))
  }

  createNewTask() {
    this.subscriptions.push(this.getTasks.createTask(this.newTaskName).subscribe((response: any) => {
      if (response.success) {
        this.newTaskName = '';
        this.snakbar.showSnakBar('Task created successfully', MatSnackBarType.success)
        this.filterTasks('false')
      } else {
        this.snakbar.showSnakBar('error creating task', MatSnackBarType.error)
      }
    }))
  }
}