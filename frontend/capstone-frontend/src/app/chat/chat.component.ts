import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, FormsModule, NgFor, NgIf],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  @ViewChild('chatBody', { static: false })
  chatBody!: ElementRef;
  userInput: string = '';
  messages: { text: string; fromUser: boolean }[] = [];
  prompts: string[] = [
    "I'm feeling anxious",
    'I need some motivation',
    'What can I do to relax?',
    'How can I stay positive?',
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.sendInitialMessage();
  }

  sendInitialMessage() {
    this.addMessage(
      '🌟 Welcome to Your Wellbeing Hub! 🌟 How can I brighten your day today?',
      false
    );
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.addMessage(this.userInput, true);
      this.http
        .post<{ message: string }>(
          'http://localhost:8094/api/menu/chat',
          this.userInput
        )
        .subscribe((response) => {
          this.addMessage(this.processText(response.message), false);
        });
      this.userInput = '';
    }
  }

  sendPrompt(prompt: string) {
    this.addMessage(prompt, true);
    this.http
      .post<{ message: string }>('http://localhost:8094/api/menu/chat', prompt)
      .subscribe((response) => {
        this.addMessage(this.processText(response.message), false);
      });
  }

  addMessage(text: string, fromUser: boolean) {
    this.messages.push({ text: this.processText(text), fromUser });
    setTimeout(() => {
      this.chatBody.nativeElement.scrollTop =
        this.chatBody.nativeElement.scrollHeight;
    }, 0);
  }

  // Process text to convert markdown-like markers to HTML
  processText(text: string): string {
    let htmlText = text;

    // Replace ** with <strong> for bold
    htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace * with <em> for italic
    htmlText = htmlText.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace new lines with <br>
    htmlText = htmlText.replace(/\n/g, '<br>');

    // Replace list items with <ul> and <li>
    htmlText = htmlText.replace(/^\* (.*)$/gm, '<li>$1</li>');
    htmlText = htmlText.replace(/(<li>.*<\/li>)(?!(<li>))/g, '<ul>$1</ul>');

    return htmlText;
  }
}
