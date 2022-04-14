import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './CategoryModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  categories: Category[] = [
    { cuisine: 'African' },
    { cuisine: 'American' },
    { cuisine: 'British' },
    { cuisine: 'Cajun' },
    { cuisine: 'Caribbean' },
    { cuisine: 'Chinese' },
    { cuisine: 'Eastern European' },
    { cuisine: 'European' },
    { cuisine: 'French' },
    { cuisine: 'German' },
    { cuisine: 'Greek' },
    { cuisine: 'Indian' },
    { cuisine: 'Irish' },
    { cuisine: 'Italian' },
    { cuisine: 'Japanese' },
    { cuisine: 'Jewish' },
    { cuisine: 'Korean' },
    { cuisine: 'Latin American' },
    { cuisine: 'Mediterranean' },
    { cuisine: 'Mexican' },
    { cuisine: 'Middle Eastern' },
    { cuisine: 'Nordic' },
    { cuisine: 'Southern' },
    { cuisine: 'Spanish' },
    { cuisine: 'Thai' },
    { cuisine: 'Vietnamese' },
  ];

  intolerances: string[] = ['gluten', 'dairy', 'grain'];

  selectedCategory: string = this.categories[0].cuisine;
  selectedIntolerance: string = this.intolerances[0];

  ngOnInit(): void {}

  searchRecipe = '';

  search() {
    this.router.navigate([
      '/results',
      this.searchRecipe,
      this.selectedCategory,
      this.selectedIntolerance
    ]);
  }

  changeCategory(category: any): void {
    this.selectedCategory = category.target.value;
  }

  changeIntolerances(category: any): void {
    this.selectedCategory = category.target.value;
  }
}
