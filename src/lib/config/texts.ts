/**
 * UI 텍스트 상수
 *
 * 애플리케이션 전역에서 사용되는 UI 텍스트들을 중앙에서 관리합니다.
 * 다국어 지원을 위한 기반이 될 수 있습니다.
 */

export const TEXTS = {
  labels: {
    email: '이메일',
    password: '비밀번호',
    message: '메시지',
    title: '제목',
    body: '내용',
    userId: '사용자 ID',
    emailWithColon: '이메일:',
    usernameWithColon: '사용자명:',
    phoneWithColon: '전화번호:',
    websiteWithColon: '웹사이트:',
    idWithColon: 'ID:',
  },
  placeholders: {
    email: 'example@email.com',
    password: '비밀번호를 입력하세요',
    message: '메시지를 입력하세요',
    postTitle: '게시글 제목',
    postBody: '게시글 내용',
    userId: '1',
  },
  buttons: {
    delete: '삭제',
    deleteLoading: '삭제 중...',
    create: '작성',
    createLoading: '작성 중...',
    reset: 'Reset',
    retry: '다시 시도',
    home: '홈',
    postList: '게시글 목록',
    userList: '사용자 목록',
  },
  formValidation: {
    titleRequired: '제목을 입력해주세요',
    titleMaxLength: (max: number) => `제목은 ${max}자 이하로 입력해주세요`,
    bodyRequired: '내용을 입력해주세요',
    bodyMaxLength: (max: number) => `내용은 ${max}자 이하로 입력해주세요`,
    userIdMin: '사용자 ID는 1 이상이어야 합니다',
  },
  ui: {
    postManagement: '게시글 관리',
    postManagementDescription: '게시글을 조회하고 생성, 삭제할 수 있습니다.',
    userManagement: '사용자 관리',
    userManagementDescription: '사용자를 조회하고 관리할 수 있습니다.',
    defaultError: '오류가 발생했습니다.',
    demoDataNotice: '실제로 삭제되거나 등록되지 않습니다. (데이터는 예시용)',
  },
  errors: {
    idRequired: 'id is required',
    noAccessToken: 'No access token available',
    unauthorizedRefreshToken: 'Unauthorized refresh token',
    loginFailed: 'Login failed',
    accountNotFound: 'Account is not found',
  },
} as const;
