import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, NgZone, OnDestroy, OnInit, TemplateRef, ViewEncapsulation, ChangeDetectorRef, ViewRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NotificationAnimationType } from '../../enums/notification-animation-type.enum';
import { Notification } from '../../interfaces/notification.type';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'simple-notification',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('enterLeave', [

      // Fade
      state('fade', style({opacity: 1, bottom: '-20px'})),
      transition('* => fade', [
        style({opacity: 0}),
        animate('1000ms ease-in-out')
      ]),
      state('fadeOut', style({opacity: 0, bottom: '-400px'})),
      transition('fade => fadeOut', [
        style({opacity: 1}),
        animate('1000ms ease-in-out')
      ]),

      // Enter from top
      state('fromTop', style({opacity: 1, transform: 'translateY(0)'})),
      transition('* => fromTop', [
        style({opacity: 0, transform: 'translateY(-5%)'}),
        animate('400ms ease-in-out')
      ]),
      state('fromTopOut', style({opacity: 0, transform: 'translateY(5%)'})),
      transition('fromTop => fromTopOut', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('300ms ease-in-out')
      ]),

      // Enter from right
      state('fromRight', style({opacity: 1, transform: 'translateX(0)'})),
      transition('* => fromRight', [
        style({opacity: 0, transform: 'translateX(5%)'}),
        animate('400ms ease-in-out')
      ]),
      state('fromRightOut', style({opacity: 0, transform: 'translateX(-5%)'})),
      transition('fromRight => fromRightOut', [
        style({opacity: 1, transform: 'translateX(0)'}),
        animate('300ms ease-in-out')
      ]),

      // Enter from bottom
      state('fromBottom', style({opacity: 1, transform: 'translateY(0)'})),
      transition('* => fromBottom', [
        style({opacity: 0, transform: 'translateY(5%)'}),
        animate('400ms ease-in-out')
      ]),
      state('fromBottomOut', style({opacity: 0, transform: 'translateY(-5%)'})),
      transition('fromBottom => fromBottomOut', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('300ms ease-in-out')
      ]),

      // Enter from left
      state('fromLeft', style({opacity: 1, transform: 'translateX(0)'})),
      transition('* => fromLeft', [
        style({opacity: 0, transform: 'translateX(-5%)'}),
        animate('400ms ease-in-out')
      ]),
      state('fromLeftOut', style({opacity: 0, transform: 'translateX(5%)'})),
      transition('fromLeft => fromLeftOut', [
        style({opacity: 1, transform: 'translateX(0)'}),
        animate('300ms ease-in-out')
      ]),

      // Rotate
      state('scale', style({opacity: 1, transform: 'scale(1)'})),
      transition('* => scale', [
        style({opacity: 0, transform: 'scale(0)'}),
        animate('400ms ease-in-out')
      ]),
      state('scaleOut', style({opacity: 0, transform: 'scale(0)'})),
      transition('scale => scaleOut', [
        style({opacity: 1, transform: 'scale(1)'}),
        animate('400ms ease-in-out')
      ]),

      // Scale
      state('rotate', style({opacity: 1, transform: 'rotate(0deg)'})),
      transition('* => rotate', [
        style({opacity: 0, transform: 'rotate(5deg)'}),
        animate('400ms ease-in-out')
      ]),
      state('rotateOut', style({opacity: 0, transform: 'rotate(-5deg)'})),
      transition('rotate => rotateOut', [
        style({opacity: 1, transform: 'rotate(0deg)'}),
        animate('400ms ease-in-out')
      ])
    ])
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationComponent implements OnInit, OnDestroy {

  @Input() timeOut: number;
  @Input() showProgressBar: boolean;
  @Input() pauseOnHover: boolean;
  @Input() clickToClose: boolean;
  @Input() clickIconToClose: boolean;
  @Input() maxLength: number;
  @Input() theClass: string;
  @Input() rtl: boolean;
  @Input() animate: NotificationAnimationType;
  @Input() position: number;
  @Input() item: Notification;


  // Progress bar variables
  title: any;
  content: any;

  titleIsTemplate = false;
  contentIsTemplate = false;
  htmlIsTemplate = false;

  progressWidth = 0;
  safeSvg: SafeHtml;
  safeInputHtml: SafeHtml;

  private stopTime = false;
  private timer: any;
  private framesPerSecond = 40;
  private sleepTime: number;
  private startTime: number;
  private endTime: number;
  private pauseStart: number;

  private icon: string;

  constructor(
    private notificationService: NotificationsService,
    private domSanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    if (this.item.override) {
      this.attachOverrides();
    }

    if (this.animate) {
      this.item.state = this.animate;
    }

    if (this.timeOut !== 0) {
      this.startTimeOut();
    }

    this.contentType(this.item.title, 'title');
    this.contentType(this.item.content, 'content');
    this.contentType(this.item.html, 'html');

    this.safeSvg = this.domSanitizer.bypassSecurityTrustHtml(this.icon || this.item.icon);
    this.safeInputHtml = this.domSanitizer.bypassSecurityTrustHtml(this.item.html);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    this.cd.detach();
  }

  startTimeOut(): void {
    this.sleepTime = 1000 / this.framesPerSecond /* ms */;
    this.startTime = new Date().getTime();
    this.endTime = this.startTime + this.timeOut;
    this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.sleepTime));
  }

  onEnter() {
    if (this.pauseOnHover) {
      this.stopTime = true;
      this.pauseStart = new Date().getTime();
    }
  }

  onLeave() {
    if (this.pauseOnHover) {
      this.stopTime = false;
      this.startTime += (new Date().getTime() - this.pauseStart);
      this.endTime += (new Date().getTime() - this.pauseStart);
      this.zone.runOutsideAngular(() => setTimeout(this.instance, this.sleepTime));
    }
  }

  onClick(event: MouseEvent) {
    this.item.click!.emit(event);

    if (this.clickToClose) {
      this.remove();
    }
  }

  onClickIcon(event: MouseEvent) {
    this.item.clickIcon!.emit(event);

    if (this.clickIconToClose) {
      this.remove();
    }
  }

  // Attach all the overrides
  attachOverrides() {
    Object.keys(this.item.override).forEach(a => {
      if (this.hasOwnProperty(a)) {
        (this as any)[a] = this.item.override[a];
      }
    });
  }

  private instance = () => {
    const now = new Date().getTime();

    if (this.endTime < now) {
      this.remove();
      this.item.timeoutEnd!.emit();
    } else if (!this.stopTime) {
      if (this.showProgressBar) {
        // We add this.sleepTime just to have 100% before close
        this.progressWidth = Math.min((now - this.startTime + this.sleepTime) * 100 / this.timeOut, 100);
      }

      this.timer = setTimeout(this.instance, this.sleepTime);
    }
    this.zone.run(() => {
      if (!(this.cd as ViewRef).destroyed) {
        this.cd.detectChanges();
      }
    });
  }

  private remove() {
    if (this.animate) {
      this.item.state = this.animate + 'Out';
      setTimeout(() => {
        this.notificationService.set(this.item, false);
      }, 310);
    } else {
      setTimeout(() => {
        this.notificationService.set(this.item, false);
      }, 5310);
    }
  }

  private contentType(item: any, key: string) {
    if (item instanceof TemplateRef) {
      this[key] = item;
    } else {
      this[key] = this.domSanitizer.bypassSecurityTrustHtml(item);
    }

    this[key + 'IsTemplate'] = item instanceof TemplateRef;
  }
}
