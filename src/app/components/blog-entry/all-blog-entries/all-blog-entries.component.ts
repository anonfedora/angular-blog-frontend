import { Inject } from "@angular/core";
import {
    Component,
    Input,
    OnInit,
    Output,
    ViewChild,
    EventEmitter
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { BlogEntriesPageable } from "src/app/model/blog-entry.interface";
import { BlogService } from "src/app/services/blog-service/blog.service";
import { WINDOW } from "src/app/window-token";

@Component({
    selector: "app-all-blog-entries",
    templateUrl: "./all-blog-entries.component.html",
    styleUrls: ["./all-blog-entries.component.scss"]
})
export class AllBlogEntriesComponent {
    @Input() blogEntries: BlogEntriesPageable;
    @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    pageEvent: PageEvent;
    origin = this.window.location.origin;

    constructor(
        private router: Router,
        @Inject(WINDOW) private windoe: Window
    ) {}

    onPaginateChange(event: PageEvent) {
        event.pageIndex = event.pageIndex + 1;
        this.paginate.emit(event);
    }

    navigate(id) {
        this.router.navigateByUrl("blog-entries/" + id);
    }
}
