import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foodie } from '../foodie/foodie';
import { FoodieService } from '../foodie/foodie.service';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../shared/auth.service';
import { RecipeDetail, ResultModel } from './result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  constructor(
    public RecipeService: RecipeService,
    public FoodieService: FoodieService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  searchRecipe: any = '';
  resultModel: ResultModel = {
    number: 0,
    offset: 0,
    results: [],
    totalResults: 0,
  };
  resultModelToSave: RecipeDetail | undefined = undefined;
  category: string = '';
  intolerance: string = '';

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('query') !== null) {
      this.searchRecipe = this.route.snapshot.paramMap.get('query');
      this.category = this.route.snapshot.paramMap.get('category') || '';
      this.intolerance = this.route.snapshot.paramMap.get('intolerance') || '';
      this.RecipeService.getSearchResults(
        this.searchRecipe,
        this.category,
        this.intolerance
      ).subscribe((data: ResultModel) => {
        this.resultModel = data;
      });
    }
  }

  showDetails(id: any) {
    this.router.navigate(['/details', id]);
  }

  addToWatchList(recipe: RecipeDetail): void {
    this.RecipeService.getRecipeInformation(recipe.id).subscribe(
      (data: RecipeDetail) => {
        console.log(data);
        this.resultModelToSave = data;
        const foodie: Foodie = {
          id: data.id,
          recipeId: data.id,
          name: data.title,
          description: data.summary.substring(0, 30),
          cuisine: data.cuisines?.length ? data.cuisines[0] : '',
          userId: parseInt(this.authService.getUserId() || '0'),
        };
        this.FoodieService.create(foodie).subscribe((data: Foodie) => {
          if (foodie.id) {
            this.router.navigate(['/user-list']);
          }
        });
      }
    );
  }
}
