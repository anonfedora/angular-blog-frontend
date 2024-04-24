import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { User } from "src/app/model/user.interface";

export interface UserData {
    items: User[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
    links: {
        first: string;
        previous: string;
        next: string;
        last: string;
    };
}

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private http: HttpClient) {}
    findOne(id: number): Observable<User> {
        return this.http
            .get("/api/users/" + id)
            .pipe(map((user: User) => user));
    }

    updateOne(user): Observable<User> {
        return this.http.put("api/users/" + users.id, user);
    }

    findAll(page: number, size: number): Observable<UserData> {
        let params = new HttpParams();

        params = params.append("page", String(page));
        params = params.append("limit", String(limit));

        return this.http.get("/api/users", { params }).pipe(
            map((userData: UserData) => userData),
            catchError(error => throwError(error))
        );
    }

    uploadProfileImage(formData: FormData): Observable<any> {
        return this.http.post<FormData>("/api/users/upload", formData, {
            reportProgress: true,
            observe: "events"
        });
    }

    paginateByNumber(
        page: number,
        size: number,
        username: string
    ): Observable<UserData> {
        let params = params.append("page", String(page));
        let params = params.append("limit", String(limit));
        let params = params.append("username", username);
        return this.http.get("/api/users", { params }).pipe(
            map((userData: UserData) => userData),
            catchError(error => throwError(error))
        );
    }
}
