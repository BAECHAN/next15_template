import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from '@/lib/api/client';

/**
 * Users API 엔드포인트
 */
export const USERS_ENDPOINT = '/users';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
}

export interface UpdateUserDto {
  name?: string;
  username?: string;
  email?: string;
}

/**
 * Users API 서비스
 */
export const USERS_API = {
  /**
   * 모든 사용자 조회
   */
  getAll: (): Promise<User[]> => {
    return apiGet<User[]>(USERS_ENDPOINT);
  },

  /**
   * 특정 사용자 조회
   */
  getById: (id: number | string): Promise<User> => {
    return apiGet<User>(`${USERS_ENDPOINT}/${id}`);
  },

  /**
   * 사용자 생성
   */
  create: (data: CreateUserDto): Promise<User> => {
    return apiPost<User>(USERS_ENDPOINT, data);
  },

  /**
   * 사용자 수정 (전체)
   */
  update: (id: number | string, data: UpdateUserDto): Promise<User> => {
    return apiPut<User>(`${USERS_ENDPOINT}/${id}`, data);
  },

  /**
   * 사용자 수정 (부분)
   */
  patch: (id: number | string, data: UpdateUserDto): Promise<User> => {
    return apiPatch<User>(`${USERS_ENDPOINT}/${id}`, data);
  },

  /**
   * 사용자 삭제
   */
  delete: (id: number | string): Promise<void> => {
    return apiDelete<void>(`${USERS_ENDPOINT}/${id}`);
  },
};
