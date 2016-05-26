import {Injectable, EventEmitter} from "@angular/core"

@Injectable()
export class NotificationsService {
    
    public emiter: EventEmitter<any> = new EventEmitter();

    set(notification: any, to: boolean) { this.emiter.emit({command: "set", notification: notification, add: to}) };
    getChangeEmitter() { return this.emiter }

    //// Access methods
    success(title: string, content: string, override?: any) { this.set({title: title, content: content, type: "success", override: override}, true) }
    error(title: string, content: string, override?: any) { this.set({title: title, content: content, type: "error", override: override}, true) }
    alert(title: string, content: string, override?: any) { this.set({title: title, content: content, type: "alert", override: override}, true) }
    info(title: string, content: string, override?: any) { this.set({title: title, content: content, type: "info", override: override}, true) }
    bare(title: string, content: string, override?: any) { this.set({title: title, content: content, type: "bare", override: override}, true) }

    // With type method
    create(title: string, content: string, type: string, override?: any) { this.set({title: title, content: content, type: type, override: override}, true) }

    // HTML Notification method
    html(html: any, type: string, override?: any) { this.set({html: html, type: type, override: override, title: null, content: null}, true) }

    // Remove all notifications method
    remove(id?: string) {
        if (id) this.emiter.emit({command: "clean", id: id});
        else this.emiter.emit({command: "cleanAll"});
    }

}