Como usar?

Inclua SimpleNotificationsModule

No HTML inclua:
<simple-notifications [options]="options" ></simple-notifications>

No código TypeScript  
  crie a variável para configurar:
    public optionsToNotification: Options = new Options();
      
   Injete o NotificationsService
     constructor(private notificationService: NotificationsService) {}
   
   no ngOnInit() configure o objeto options
     ngOnInit(): void {
      this.optionsToNotification.animate = 'scale';
     }
     
  Quando precisar emitir a notificação, chame:
    this.notificationService.error('Título...', 'menssagem de erro');
    this.notificationService.alert('Título...', 'menssagem de alert');
    this.notificationService.success('Título...', 'menssagem de success');
    this.notificationService.info('Título...', 'menssagem de info');