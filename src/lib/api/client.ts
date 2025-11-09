/**
 * API 클라이언트
 *
 * Next.js App Router에서 사용하는 fetch 기반 API 클라이언트
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

export interface ApiError {
  message: string;
  status: number;
  statusText: string;
}

export class ApiClientError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.statusText = statusText;
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * API 요청을 수행하는 클라이언트 함수
 */
export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  // URL 구성
  let url = `${API_BASE_URL}${endpoint}`;

  // Query parameters 추가
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // 기본 헤더 설정
  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorData = (await response.json()) as { message?: string };
        errorMessage = errorData.message || errorMessage;
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }

      throw new ApiClientError(
        errorMessage || `API Error: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    // 빈 응답 처리
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    // 네트워크 에러 등 기타 에러
    throw new ApiClientError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      0,
      'Network Error'
    );
  }
}

/**
 * GET 요청
 */
export function apiGet<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * POST 요청
 */
export function apiPost<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT 요청
 */
export function apiPut<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH 요청
 */
export function apiPatch<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE 요청
 */
export function apiDelete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}
