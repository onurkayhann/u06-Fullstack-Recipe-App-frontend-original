import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeDetail, ResultModel } from '../results/result.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    public recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  id: any;
  details: RecipeDetail | undefined = undefined;
  steps: any;
  ing: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.recipeService
      .getRecipeInformation(this.id)
      .subscribe((res: RecipeDetail) => {
        console.log(res);
        this.details = res;
      });

    this.recipeService
      .getInstructions(this.id)
      .then((res: any) => {
        this.steps = res[0].steps;
        console.log(this.steps);
      })
      .catch(console.error);
  }
}
