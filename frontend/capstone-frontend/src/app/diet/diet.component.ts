import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { WellbeingService } from '../wellbeing.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-diet',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.css'
})
export class DietComponent {

  constructor(private dietService: WellbeingService) {}
  diet: any = {
    breakfast: '',
    lunch: '',
    dinner: '',
    drink: '',
    snack: '',
    totalCalories: 0,
    totalCarbs: 0,
    totalSugar: 0,
    totalProtein: 0,
    totalFiber: 0,
    totalFat: 0
  };
  specificDate: string='';
  dietData: any;
  totalCalories: string = '0.00';
  totalCarbsForDate: string = '0.00';

 

  ngOnInit(): void {
    // Initialize userId from local storage
    this.diet.userId = Number(localStorage.getItem('userId'));
  }

  saveDiet() {
    const userId = this.diet.userId;
    this.dietService.saveDiet(this.diet, userId).subscribe(response => {
      
      console.log('Diet saved:', response);
      // Update local diet with the saved response
      this.diet = response;
    });
  }

  getTotalCaloriesForDate() {
    const userId = this.diet.userId;
    this.dietService.getDietByDate(this.specificDate, userId).subscribe((diets: any[]) => {
      this.totalCalories = diets.reduce((sum, diet) => sum + diet.totalCalories, 0);
      console.log('Total calories for date:', this.totalCalories);
    });
  }

  getDietByDate() {
    const userId = this.diet.userId;
    this.dietService.getDietByDate(this.specificDate, userId).subscribe((diets: any[]) => {
      if (diets.length > 0) {
        this.dietData = diets[0]; // Assuming you get a single diet entry per date
      }
      console.log(diets);
    });
    localStorage.setItem('dietDate', this.specificDate.toString());
  }
       
}
