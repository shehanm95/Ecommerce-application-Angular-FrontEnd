import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from '../../service/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }

  userList!: Observable<IUser[]>


  ngOnInit(): void {
    this.userList = this.userService.getAllUsers()


  }

}
