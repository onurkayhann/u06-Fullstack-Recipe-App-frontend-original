import { Component, OnInit } from '@angular/core';
import { Foodie } from '../foodie/foodie';
import { FoodieService } from '../foodie/foodie.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(
    public foodieService: FoodieService,
    private authService: AuthService
  ) {}

  foodies: Foodie[] = [];

  ngOnInit(): void {
    this.foodieService
      .getByUserId(this.authService.getUserId())
      .subscribe((data: Foodie[]) => {
        this.foodies = data;
      });
  }

  deleteFoodie(id: number): void {
    this.foodieService.delete(id).subscribe((res) => {
      this.foodies = this.foodies.filter((item) => item.id !== id);
    });
  }
}
