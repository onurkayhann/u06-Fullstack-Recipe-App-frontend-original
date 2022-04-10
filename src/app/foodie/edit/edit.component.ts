import { Component, OnInit } from '@angular/core';

import { FoodieService } from '../foodie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Foodie } from '../foodie';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: any;
  foodie!: Foodie;
  form!: FormGroup;

  constructor(
    private foodieService: FoodieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idFoodie'];
    this.foodieService.find(this.id).subscribe((data: Foodie) => {
      this.foodie = data;
    });

    this.form = new FormGroup({
      name: new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      description: new FormControl('', [ Validators.required, Validators.nullValidator ]),
      cuisine: new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ])
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.foodieService.update(this.id, this.form.value).subscribe(res => {
      console.log('Foodie updated successfully!');
      this.router.navigateByUrl('foodie/index');
    });
  }

}
