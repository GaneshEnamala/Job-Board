import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Job } from 'src/app/model/Job.model';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css'],
})
export class ViewJobComponent implements OnInit {
  job!: Job;
  description: string = `<p><em>Disclaimer: This job description is for demonstration purposes only and does not represent an actual job opening.<\/em><\/p><p><br \/><\/p><p>We are seeking a talented and highly motivated Full Stack Engineer Intern to join our dynamic team. In this role, you will have the opportunity to gain hands-on experience in full-stack development, working on real-world projects and collaborating with cross-functional teams to deliver cutting-edge solutions and improve our products and services.<\/p><p><br \/><\/p><p><strong>Responsibilities:<\/strong><\/p><ul><li>Collaborate with cross-functional teams, including product managers, designers, and engineers, to develop and implement front-end and back-end solutions for our web and mobile applications.<\/li><li>Write clean, efficient, and maintainable code, adhering to best practices and coding standards.<\/li><li>Assist in the design, development, testing, and deployment of software features and enhancements, ensuring high-quality and timely delivery.<\/li><li>Participate in code and design reviews, providing constructive feedback to peers and continuously improving the quality of the codebase.<\/li><li>Troubleshoot and resolve software defects and issues, working closely with team members to identify and address problems.<\/li><li>Stay current with industry trends, emerging technologies, and best practices in full-stack development, and actively contribute to the team's knowledge sharing and continuous improvement efforts.<\/li><\/ul><p><br \/><\/p><p><strong>Requirements:<\/strong><\/p><ul><li>Currently pursuing a Bachelor's or Master's degree in Computer Science, Engineering, or a related field, or equivalent practical experience.<\/li><li>Proficiency in one or more programming languages, such as JavaScript, Python, Java, or Ruby.<\/li><li>Familiarity with front-end web development technologies, such as HTML, CSS, and JavaScript, and experience with popular web frameworks, such as React, Angular, or Vue.js.<\/li><li>Basic understanding of back-end development concepts and technologies, such as RESTful APIs, databases, and server-side programming languages.<\/li><li>Strong problem-solving skills and the ability to learn quickly and adapt to new technologies and methodologies.<\/li><li>Excellent communication and collaboration skills, with the ability to work effectively with diverse stakeholders.<\/li><\/ul><p><br \/><\/p><p>The DemoApple is an equal opportunity employer that is committed to diversity and inclusion. We welcome applications from all qualified candidates, regardless of race, color, religion, sex, national origin, age, disability, or any other legally protected status.<\/p><p><br \/><\/p><p><strong>Disclaimer: This job description is for demonstration purposes only and does not represent an actual job opening.<\/strong><\/p>`;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const title = params['title'];
      console.log(title);
      this.job = {
        title: 'Full Stack Engineer',
        location: 'New York, NY',
        companyLogo:
          'https://jboardio.s3-us-west-1.amazonaws.com/default/employers/apple.png',
        companyName: 'Apple',
        departments: ['Engineering', 'IT'],
      };
    });
  }
}
