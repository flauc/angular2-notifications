export declare class SimpleNotificationsComponent {}

export declare class NotificationsService {
    success(title: string, content: string, override?: any)
    error(title: string, content: string, override?: any)
    alert(title: string, content: string, override?: any)
    info(title: string, content: string, override?: any)
    bare(title: string, content: string, override?: any)
    create(title: string, content: string, type: string, override?: any)
    html(html: any, type: string, override?: any)
    remove(id?: string)
}

export declare class PushNotificationsService {
    create(data: {title: string, body: string})
}




