import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WellbeingService } from '../wellbeing.service';

@Component({
  selector: 'app-day-planner',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './day-planner.component.html',
  styleUrl: './day-planner.component.css',
})
export class DayPlannerComponent {
  constructor(private wellbeingService: WellbeingService) {}
  sug: string = '';
  questions = [
    {
      text: 'Today, how often did you feel down, depressed, or hopeless?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
    {
      text: 'Today, how often did you have little interest or pleasure in doing things?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
    {
      text: 'Today, how often did you feel nervous, anxious, or on edge?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
    {
      text: 'Today, how often did you have trouble relaxing?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
    {
      text: 'Today, how often did you feel restless or find it hard to sit still?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
    {
      text: 'Today, how often did you feel afraid as if something awful might happen?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
    {
      text: 'Today, how often did you experience difficulty concentrating?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
    {
      text: 'Today, how often did you feel irritable or easily annoyed?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
    {
      text: 'Today, how often did you feel fatigued or had low energy?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
    {
      text: 'Today, how often did you have feelings of worthlessness or excessive guilt?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
    {
      text: 'Today, how often did you feel overwhelmed by your daily tasks?',
      options: [
        { label: 'Not at all', value: 0, color: '#28a745' },
        { label: 'A little', value: 1, color: '#ffc107' },
        { label: 'Moderately', value: 2, color: '#fd7e14' },
        { label: 'Very often', value: 3, color: '#dc3545' },
      ],
      selectedOption: null,
    },
  ];

  result: any = null;

  // calculateScore() {
  //   let totalScore = this.questions.reduce((sum, question) => {
  //     // If selectedOption is null, treat it as 0
  //     const optionValue =
  //       question.selectedOption !== null ? question.selectedOption : 0;
  //     return sum + optionValue;
  //   }, 0);

  //   this.result = {
  //     depression: this.getDepressionLevel(totalScore),
  //     anxiety: this.getAnxietyLevel(totalScore),
  //     stress: this.getStressLevel(totalScore),
  //   };
  // }

  calculateScore() {
    let totalScore = this.questions.reduce((sum, question) => {
      const optionValue =
        question.selectedOption !== null ? question.selectedOption : 0;
      return sum + optionValue;
    }, 0);

    this.result = {
      depression: this.getDepressionLevel(totalScore),
      anxiety: this.getAnxietyLevel(totalScore),
      stress: this.getStressLevel(totalScore),
    };

    // this.wellbeingService.setResult(this.result); // Store result in the service
    // console.log(this.result);
    let date = new Date();
    localStorage.setItem('LastUpdated', date.toDateString());
    localStorage.setItem('wellbeingResult', JSON.stringify(this.result));

    this.sug = this.getSuggestions(totalScore);
  }

  getDepressionLevel(score: number): string {
    if (score <= 8) return 'Minimal';
    else if (score <= 16) return 'Mild';
    else if (score <= 24) return 'Moderate';
    else if (score <= 32) return 'Severe';
    return 'Severe';
  }

  getAnxietyLevel(score: number): string {
    if (score <= 10) return 'Minimal';
    if (score <= 20) return 'Mild';
    if (score <= 30) return 'Moderate';
    return 'Severe';
  }

  getStressLevel(score: number): string {
    if (score <= 10) return 'Minimal';
    if (score <= 20) return 'Mild';
    if (score <= 30) return 'Moderate';
    return 'Severe';
  }

  getSuggestions(score: number): string {
    if (score <= 10) {
      return 'Great job! Keep up the good work and continue engaging in positive activities.';
    } else if (score <= 20) {
      return 'You might be experiencing some stress or discomfort. Consider finding time for relaxation and self-care.';
    } else if (score <= 30) {
      return 'You are experiencing moderate levels of stress. It might be helpful to seek support from friends, family, or a mental health professional.';
    } else {
      return 'You are experiencing high levels of stress. Please reach out to a mental health professional for support and explore ways to manage stress effectively.';
    }
  }
}
