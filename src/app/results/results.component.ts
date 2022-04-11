import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(
    public RecipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  searchRecipe: any = '';
  results: any;

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('query') !== null) {
      this.searchRecipe = this.route.snapshot.paramMap.get('query');
      // this.RecipeService.getSearchResults(this.searchRecipe).then((res: any) => {
      //   this.results = res.results;
      //   console.log(this.results);
      // }).catch(console.error);
      this.RecipeService.getSearchResults(this.searchRecipe).subscribe(
        (data: any) => {
          debugger
          this.results = data;
          console.log(this.results);
        }
      );
    }
  }

  showDetails(id: any) {
    this.router.navigate(['/details', id]);
  }

}
