import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CountdownModule, CountdownComponent } from 'ngx-countdown';
import { MailService } from './mail.service';
import { Isession } from './Isession';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CountdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  @ViewChild('cd') private countdownComponent!: CountdownComponent;
  tempoTotal = 15; // tempo total em segundos
  mainTitle = ""
  mainMessage = ""

  session: Isession | undefined
  tempMail: string = ''
  messages: Array<{
    toAddr: string;
    text: string;
    rawSize: number;
    headerSubject: string;
    fromAddr: string;
    downloadUrl: string;
  }> = [];

  constructor(private mailService: MailService) { }

  generateMail() {
    this.mailService.generateMail()
      .subscribe(mail => this.tempMail = mail?.data?.introduceAddress?.address)
  }

  generateMessages() {
    this.mailService.generateMessages()
      .subscribe(mail => this.messages = mail?.data?.session?.mails)

    this.countdownComponent.restart();
  }

  intervalId: ReturnType<typeof setInterval> = setInterval(() => {
    this.mailService.generateMessages()
      .subscribe(mail => this.messages = mail?.data?.session?.mails)
  }, 15000);

  onCountdownEvent(event: any): void {
    if (event.action === 'done') {

      // A contagem regressiva chegou a zero, reinicie-a
      this.countdownComponent.restart();
    }
  }

  ClipBoardCopy(input: any) {
    input.select();
    document.execCommand('copy');
    input.selectRange(0, 0)
  }

  showText(title: string, message: string) {
    this.mainTitle = title;
    this.mainMessage = message;
  }

  ngOnInit(): void {
    this.mailService.generateSession()
      .subscribe(session => { this.session = session; localStorage.setItem('session', session?.data?.introduceSession?.id); this.tempMail = session?.data?.introduceSession?.addresses?.[0]?.address })
  }
}
