import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FoodieService } from '../foodie.service';
import { Foodie } from '../foodie';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  foodies: Foodie[] = [];

  constructor(
    public foodieService: FoodieService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.foodieService.getAll().subscribe((data: Foodie[])=> {
      this.foodies = data;
      console.log(this.foodies);
    });
  }

  deleteFoodie(id: any) {
    this.foodieService.delete(id).subscribe(res => {
      this.foodies = this.foodies.filter(item => item.id !== id);
      console.log('Foodie deleted successfully!');
    });
  }

  showDetails(id: any) {
    this.router.navigate(['/details', id]);
  }

}
