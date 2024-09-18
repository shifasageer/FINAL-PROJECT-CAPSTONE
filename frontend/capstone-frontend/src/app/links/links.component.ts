import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NgFor],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent {

  safetyTips = [
    {
      title: 'Dial 100 to reach SHE Team',
      description:
        'In case of emergency, dial 100 to contact the SHE Team for immediate assistance.',
      videoLink: 'https://www.youtube.com/watch?v=ozMlQ2oqcrU&pp=ygUaZGlhbCAxMDAgdG8gcmVhY2ggU0hFIHRlYW0%3D',
    },
    {
      title: 'Stay safe during late hours',
      description: 'Tips and precautions to take when going out late at night.',
      videoLink: 'https://www.youtube.com/watch?v=RT5dF9BK440&pp=ygUSc3RheSBzYWZlIG1pZG5pZ2h0',
    },
    {
      title: 'Using Self-Defense Techniques',
      description:
        'Learn basic self-defense techniques to protect yourself in dangerous situations.',
      videoLink: 'https://www.youtube.com/watch?v=B725c7vi1xk&pp=ygUdVXNpbmcgU2VsZi1EZWZlbnNlIFRlY2huaXF1ZXM%3D',
    },
    {
      title: 'Be aware of your surroundings',
      description:
        'Stay alert and be mindful of your environment to avoid potential dangers.',
      videoLink: 'https://www.youtube.com/watch?v=pswfU40NZ08&pp=ygUdQmUgYXdhcmUgb2YgeW91ciBzdXJyb3VuZGluZ3M%3D',
    },
    {
      title: 'Safe commuting tips',
      description:
        'Ensure your commute is safe by following these essential tips.',
      videoLink: 'https://www.youtube.com/watch?v=2Cmly6O8peY&pp=ygUTU2FmZSBjb21tdXRpbmcgdGlwcw%3D%3D',
    },
    {
      title: 'Girls’ safety is everyone’s responsibility',
      description:
        'Learn how to contribute to the safety of girls and women in your community.',
      videoLink: 'https://www.youtube.com/watch?v=kiRriWD8ZQk&pp=ygUVaGVscGxpbmUgd29tZW4gc2FmZXR5',
    },
    {
      title: 'Emergency contacts to have on speed dial',
      description:
        'Keep these contacts on speed dial for quick access during emergencies.',
      videoLink: 'https://www.youtube.com/watch?v=2q4YAmGjkgw&pp=ygUbaW1wb3J0YW50IGVtZXJnZW5jeSBudW1iZXJz',
    },
    {
      title: 'Cyber safety for women',
      description:
        'Learn how to protect yourself from online threats and cyber harassment.',
      videoLink: 'https://www.youtube.com/watch?v=kg6PHg5nCXM&pp=ygUWQ3liZXIgc2FmZXR5IGZvciB3b21lbg%3D%3D',
    },
    {
      title: 'How to use a personal safety app',
      description:
        'Guide on using personal safety apps to enhance your security.',
      videoLink: 'https://www.youtube.com/watch?v=NBBTnzwc2Ag&pp=ygUgSG93IHRvIHVzZSBhIHBlcnNvbmFsIHNhZmV0eSBhcHA%3D',
    },
    {
      title: 'Recognizing signs of danger',
      description:
        'Understand the warning signs of potential threats and how to avoid them.',
      videoLink: 'https://www.youtube.com/watch?v=lHIqBqBt4iE&pp=ygUgd2hlbiBzb21lb25lIGZvbGxvd3MgeW91IG9uIHJvYWQ%3D',
    },
  ];
 
  constructor() {}
 
  ngOnInit(): void {}
 
  getThumbnailUrl(videoLink: string): string {
    const videoId = videoLink.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://img.youtube.com/vi/${videoId.substring(
        0,
        ampersandPosition
      )}/0.jpg`;
    }
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }

}
