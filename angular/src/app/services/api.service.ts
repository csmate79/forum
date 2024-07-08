import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { IApiResponse } from '../interfaces/api-response.interface';
import { IRole } from '../interfaces/role.interface';
import { ITopic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8888/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IApiResponse<IUser[]>> {
    return this.http.get<IApiResponse<IUser[]>>(`${this.baseUrl}/users`);
  }

  getUser(id: string): Observable<IApiResponse<IUser>> {
    return this.http.get<IApiResponse<IUser>>(`${this.baseUrl}/user/${id}`);
  }

  updateUser(
    id: string,
    user: Partial<IUser>
  ): Observable<IApiResponse<IUser>> {
    return this.http.put<IApiResponse<IUser>>(
      `${this.baseUrl}/user/${id}`,
      user
    );
  }

  updatePassword(
    id: string,
    passwords: { password1: string; password2: string }
  ): Observable<IApiResponse<IUser>> {
    return this.http.put<IApiResponse<IUser>>(
      `${this.baseUrl}/user/${id}/password`,
      passwords
    );
  }

  getRoles(): Observable<IApiResponse<IRole[]>> {
    return this.http.get<IApiResponse<IRole[]>>(`${this.baseUrl}/roles`);
  }

  getRole(id: string): Observable<IApiResponse<IRole>> {
    return this.http.get<IApiResponse<IRole>>(`${this.baseUrl}/role/${id}`);
  }

  updateRole(
    id: string,
    role: Partial<IRole>
  ): Observable<IApiResponse<IRole>> {
    return this.http.put<IApiResponse<IRole>>(
      `${this.baseUrl}/role/${id}`,
      role
    );
  }

  getUsersOfRole(id: string): Observable<IApiResponse<IUser[]>> {
    return this.http.get<IApiResponse<IUser[]>>(
      `${this.baseUrl}/role/${id}/users`
    );
  }

  getTopics(): Observable<IApiResponse<ITopic[]>> {
    return this.http.get<IApiResponse<ITopic[]>>(`${this.baseUrl}/topics`);
  }

  addTopic(topic: Partial<ITopic>): Observable<IApiResponse<ITopic>> {
    return this.http.post<IApiResponse<ITopic>>(
      `${this.baseUrl}/topic/add`,
      topic
    );
  }

  getTopic(id: string): Observable<IApiResponse<ITopic>> {
    return this.http.get<IApiResponse<ITopic>>(`${this.baseUrl}/topic/${id}`);
  }

  updateTopic(
    id: string,
    topic: Partial<ITopic>
  ): Observable<IApiResponse<ITopic>> {
    return this.http.put<IApiResponse<ITopic>>(
      `${this.baseUrl}/topic/${id}`,
      topic
    );
  }

  deleteTopic(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/topic/${id}`);
  }

  addCommentToTopic(
    topicId: string,
    comment: Partial<Comment>
  ): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.baseUrl}/topic/${topicId}/comment/add`,
      comment
    );
  }

  addCommentToComment(
    topicId: string,
    commentId: string,
    comment: Partial<Comment>
  ): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.baseUrl}/topic/${topicId}/comment/${commentId}/add`,
      comment
    );
  }

  updateComment(
    topicId: string,
    commentId: string,
    comment: Partial<Comment>
  ): Observable<Comment> {
    return this.http.put<Comment>(
      `${this.baseUrl}/topic/${topicId}/comment/${commentId}`,
      comment
    );
  }

  deleteComment(topicId: string, commentId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/topic/${topicId}/comment/${commentId}`
    );
  }
}
