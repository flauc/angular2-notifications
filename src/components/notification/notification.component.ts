import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Notification} from '../../interfaces/notification.type';
import {NotificationsService} from '../../services/notifications.service';

@Component({
  selector: 'simple-notification',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('enterLeave', [

      // Fade
      state('fade', style({opacity: 1})),
      transition('* => fade', [
        style({opacity: 0}),
        animate('400ms ease-in-out')
      ]),
      state('fadeOut', style({opacity: 0})),
      transition('fade => fadeOut', [
        style({opacity: 1}),
        animate('300ms ease-in-out')
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

  @Input() public timeOut: number;
  @Input() public showProgressBar: boolean;
  @Input() public pauseOnHover: boolean;
  @Input() public clickToClose: boolean;
  @Input() public clickIconToClose: boolean;
  @Input() public maxLength: number;
  @Input() public theClass: string;
  @Input() public rtl: boolean;
  @Input() public animate: string;
  @Input() public position: number;
  @Input() public item: Notification;


  // Progress bar variables
  public title: any;
  public content: any;

  public titleIsTemplate = false;
  public contentIsTemplate = false;
  public htmlIsTemplate = false;

  public progressWidth = 0;
  public safeSvg: SafeHtml;

  private stopTime = false;
  private timer: any;
  private steps: number;
  private speed: number;
  private count = 0;
  private start: any;

  private diff: any;
  private icon: string;

  constructor(
    private notificationService: NotificationsService,
    private domSanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
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
  }

  startTimeOut(): void {
    this.steps = this.timeOut / 10;
    this.speed = this.timeOut / this.steps;
    this.start = new Date().getTime();
    this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.speed));
  }

  onEnter(): void {
    if (this.pauseOnHover) {
      this.stopTime = true;
    }
  }

  onLeave(): void {
    if (this.pauseOnHover) {
      this.stopTime = false;
      this.zone.runOutsideAngular(() => setTimeout(this.instance, (this.speed - this.diff)));
    }
  }

  onClick($e: MouseEvent): void {
    this.item.click!.emit($e);

    if (this.clickToClose) {
      this.remove();
    }
  }

  onClickIcon($e: MouseEvent): void {
    this.item.clickIcon!.emit($e);

    if (this.clickIconToClose) {
      this.remove();
    }
  }

  // Attach all the overrides
  attachOverrides(): void {
    Object.keys(this.item.override).forEach(a => {
      if (this.hasOwnProperty(a)) {
        (<any>this)[a] = this.item.override[a];
      }
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  private instance = () => {
    this.diff = (new Date().getTime() - this.start) - (this.count * this.speed);

    if (this.count++ === this.steps) {
      this.remove();
      this.item.timeoutEnd!.emit();
    } else if (!this.stopTime) {
      if (this.showProgressBar) {
        this.progressWidth += 100 / this.steps;
      }

      this.timer = setTimeout(this.instance, (this.speed - this.diff));
    }
    this.zone.run(() => this.cdr.detectChanges());
  }

  private remove() {
    if (this.animate) {
      this.item.state = this.animate + 'Out';
      setTimeout(() => {
        this.notificationService.set(this.item, false);
      }, 310);
    } else {
      this.notificationService.set(this.item, false);
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
