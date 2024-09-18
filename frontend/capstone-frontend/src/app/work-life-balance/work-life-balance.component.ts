import { Component } from '@angular/core';
import { WellbeingService } from '../wellbeing.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-work-life-balance',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './work-life-balance.component.html',
  styleUrl: './work-life-balance.component.css',
})
export class WorkLifeBalanceComponent {
  suggestion: string[] = [];

  workLifeFamilySuggestions = {
    Excellent: [
      'You have an excellent work-life balance! Continue maintaining this balance and enjoy quality time with your family.',
      'Your score indicates you are effectively balancing work and family. Keep up the great work and continue with your positive routines.',
      'Maintain your current habits, as they are clearly working well. Continue to prioritize family time and ensure your work does not overwhelm you.',
      'Your balance is outstanding. Keep integrating family activities and personal time into your schedule.',
    ],
    Good: [
      'You have a good work-life balance. Consider making minor adjustments to further improve your family time.',
      'Your score shows a solid balance, but there’s room for improvement. Try to allocate more time to family activities.',
      'You’re doing well. Focus on enhancing the quality of your family time and managing work responsibilities efficiently.',
      'Continue to maintain a structured schedule. Small changes could further improve your work-life balance and family time.',
    ],
    Moderate: [
      'Your score suggests a moderate balance. Consider making more significant changes to improve your work-life balance.',
      'You may be experiencing some imbalance. Look into strategies to better allocate time between work and family.',
      'Evaluate your current routines and identify areas where you can increase family time and reduce work stress.',
      'Consider implementing strategies to better manage your time and enhance the quality of both work and family life.',
    ],
    Poor: [
      'Your score indicates significant imbalance between work and family life. It’s important to make major adjustments to improve your balance.',
      'You may be struggling with balancing work and family. Consider seeking professional advice to help you manage this better.',
      'Significant changes are needed to improve your work-life balance. Focus on finding ways to reduce work stress and increase family time.',
      'Consider creating a comprehensive plan to address the imbalance and seek support from family, friends, or professionals.',
      'Your current balance is unsatisfactory.',
    ],
  };

  // workLifeBalance: any = {
  //   date: '',
  //   workingHours: 0,
  //   familyHours: 0,
  //   tasksCompleted: [],
  //   tasksPending: [],
  //   familyReminders: [],
  //   alerts: [],
  //   workLifeBalanceScore: 0
  // };

  // pendingTasks: { name: string, completed: boolean }[] = [];
  // specificDate: string = '';
  // workLifeBalanceData: any;

  constructor(private workLifeBalanceService: WellbeingService) {}

  // ngOnInit(): void {
  //   this.loadWorkLifeBalanceForDate(new Date().toISOString().split('T')[0]); // Load for today
  // }

  workLifeBalance: any = {
    date: '',
    workingHours: 0,
    familyHours: 0,
    tasksCompleted: [],
    tasksPending: [],
    familyReminders: [],
    alerts: [],
  };

  score: number = 0;
  pendingTasks: { name: string; completed: boolean }[] = [
    { name: '', completed: false },
  ];

  addPendingTask() {
    this.pendingTasks.push({ name: '', completed: false });
  }

  removePendingTask(index: number) {
    this.pendingTasks.splice(index, 1);
  }

  moveTaskToCompleted(task: any) {
    if (task.completed) {
      this.workLifeBalance.tasksCompleted.push(task.name);
      this.pendingTasks = this.pendingTasks.filter((t) => t !== task);
    }
  }

  addFamilyReminder() {
    this.workLifeBalance.familyReminders.push('');
  }

  removeFamilyReminder(index: number) {
    this.workLifeBalance.familyReminders.splice(index, 1);
  }

  addAlert() {
    this.workLifeBalance.alerts.push('');
  }

  removeAlert(index: number) {
    this.workLifeBalance.alerts.splice(index, 1);
  }

  onSubmit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.workLifeBalance.userId = Number(userId);
      this.workLifeBalance.tasksPending = this.pendingTasks.map(
        (task) => task.name
      );
      this.workLifeBalanceService
        .addWorkLifeBalance(this.workLifeBalance, Number(userId))
        .subscribe({
          next: (data) => {
            console.log('Work-Life Balance record saved successfully!', data);
          },
          error: (error) => {
            console.error('Error saving Work-Life Balance record:', error);
          },
        });
    } else {
      alert('User ID not found.');
    }

    this.score = this.calculateWorkLifeBalanceScore(
      this.workLifeBalance.workingHours,
      this.workLifeBalance.familyHours
    );
  }

  loadWorkLifeBalanceForDate(date: string): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.workLifeBalanceService
        .getWorkLifeBalanceByDate(date, Number(userId))
        .subscribe({
          next: (record) => {
            this.workLifeBalance = record;
            this.pendingTasks = this.workLifeBalance.tasksPending.map(
              (task: any) => ({ name: task, completed: false })
            );
          },
          error: (error) => {
            console.error('Error loading Work-Life Balance record:', error);
          },
        });
    } else {
      alert('User ID not found.');
    }
  }

  calculateWorkLifeBalanceScore(
    workingHours: number,
    familyHours: number
  ): number {
    // Basic formula to calculate Work-Life Balance Score
    const totalHours = workingHours + familyHours;

    // Score out of 100: more family hours increase the score
    const familyTimeScore = (familyHours / totalHours) * 100;
    this.score = parseInt((Math.round(familyTimeScore * 100) / 100).toFixed(2));
    localStorage.setItem('workLifeBalanceScore', this.score.toString());
    this.suggestion = this.getSuggestions(this.score);

    return this.score;
  }

  getSuggestions(score: number): string[] {
    if (score >= 80) {
      return this.workLifeFamilySuggestions.Excellent;
    } else if (score >= 60) {
      return this.workLifeFamilySuggestions.Good;
    } else if (score >= 40) {
      return this.workLifeFamilySuggestions.Moderate;
    } else {
      return this.workLifeFamilySuggestions.Poor;
    }
  }
}
