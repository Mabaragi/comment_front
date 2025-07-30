# Comment Analyzer

웹툰 댓글 데이터를 수집하고 AI 기반 감정 분석을 제공하는 React 기반 웹 애플리케이션

## 📋 목차

- [개요](#개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [환경 변수](#환경-변수)
- [API 명세](#api-명세)
- [개발](#개발)
- [배포](#배포)

## 개요

Comment Analyzer는 웹툰 시리즈의 댓글을 크롤링하고, AI를 통해 감정 분석을 수행하여 독자들의 반응을 시각적으로 보여주는 서비스입니다. Django 백엔드와 React 프론트엔드로 구성되어 있으며, 실시간 데이터 분석과 직관적인 UI를 제공합니다.

## 주요 기능

### 🎯 핵심 기능

- **시리즈 관리**: 웹툰 시리즈 추가 및 조회
- **에피소드 관리**: 시리즈별 에피소드 목록 조회 및 탐색
- **댓글 수집**: 에피소드별 댓글 자동 크롤링
- **감정 분석**: AI 기반 댓글 감정 점수 산출 (0-100점)
- **댓글 정렬**: 최신순, 등록순, 인기순 정렬
- **무한 스크롤**: 대량의 댓글 데이터 효율적 로딩

### 🔐 인증 및 보안

- JWT 기반 사용자 인증
- 자동 토큰 갱신 메커니즘
- 세션 기반 스크롤 위치 저장

## 기술 스택

### Frontend

- **Framework**: React 19.1.0 + TypeScript
- **Build Tool**: Vite 6.3.5
- **상태 관리**: Zustand 5.0.5
- **API 통신**: Axios + React Query 5.80.7
- **UI 라이브러리**: Shadcn/ui + Tailwind CSS
- **라우팅**: React Router DOM 7.6.2
- **가상화**: React Virtuoso 4.13.0

### Backend Integration

- **API 문서**: OpenAPI/Swagger
- **코드 생성**: Orval 7.10.0

### 개발 도구

- **Linting**: ESLint 9.29.0
- **Testing**: Vitest 3.2.3
- **Type Checking**: TypeScript 5.8.3

## 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn
- Django 백엔드 서버 (http://localhost:8000)

### 설치

1. 저장소 클론

```bash
git clone https://github.com/your-username/comment-analyzer.git
cd comment-analyzer
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정

```bash
cp .env.example .env.development
```

4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

## 프로젝트 구조

```
src/
├── api/                    # API 관련 코드
│   ├── endpoints.ts       # 자동 생성된 API 엔드포인트
│   ├── axiosInstance.ts   # Axios 인터셉터 설정
│   ├── custom.ts          # 커스텀 API 함수
│   └── schemas/           # TypeScript 타입 정의
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # Shadcn UI 컴포넌트
│   └── ...               # 비즈니스 컴포넌트
├── hooks/                 # 커스텀 React 훅
│   ├── useAuth.ts        # 인증 관련 훅
│   ├── useComment.ts     # 댓글 데이터 훅
│   └── ...
├── pages/                 # 페이지 컴포넌트
│   ├── series/           # 시리즈 관련 페이지
│   └── main/             # 메인 페이지
├── stores/               # Zustand 스토어
│   └── authStore.ts      # 인증 상태 관리
├── types/                # TypeScript 타입 정의
└── utils/                # 유틸리티 함수
```

## 환경 변수

`.env.development` 파일 설정:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_TEST_TOKEN=Bearer your_test_token_here
```

## API 명세

### 주요 엔드포인트

#### 시리즈 관리

- `GET /crawler/series/` - 시리즈 목록 조회
- `POST /crawler/series/crawl/` - 새 시리즈 추가
- `GET /crawler/series/{seriesId}/` - 시리즈 상세 조회

#### 에피소드 관리

- `GET /crawler/series/{seriesId}/episode/` - 에피소드 목록 조회
- `POST /crawler/series/{seriesId}/episode/crawl` - 에피소드 크롤링

#### 댓글 관리

- `GET /crawler/episode/{productId}/comment` - 댓글 목록 조회
- `POST /crawler/episode/{productId}/comment/crawl` - 댓글 크롤링

#### AI 분석

- `PATCH /llm/api/emotion-analysis/{episodeId}/` - 감정 분석 실행
- `GET /llm/api/summary-analysis/{episodeId}/` - 요약 조회

### 쿼리 파라미터

댓글 목록 조회 시:

- `page`: 페이지 번호 (기본값: 1)
- `page_size`: 페이지당 항목 수 (기본값: 20, 최대: 10000)
- `fields`: 조회할 필드 지정 (예: `id,content,created_at`)
- `ordering`: 정렬 기준 (`-created_at`, `created_at`, `-like_count`)
- `include_count`: 전체 개수 포함 여부 (기본값: false)

## 개발

### 주요 커맨드

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 타입 체크
npm run lint

# API 타입 생성
npm run generate-api

# 테스트 실행
npm run test
```

### API 타입 자동 생성

백엔드 API가 변경되면 다음 명령어로 타입을 재생성:

```bash
npm run generate-api
```

이 명령어는 `openapi.json` 파일을 기반으로 TypeScript 타입과 API 함수를 자동 생성합니다.

### 코드 컨벤션

- **컴포넌트**: PascalCase 사용 (예: `CommentListItem.tsx`)
- **훅**: `use` 접두사 사용 (예: `useCommentData.ts`)
- **타입**: 별도 `types/` 폴더에서 관리
- **상태 관리**: Zustand 스토어는 `stores/` 폴더에 위치

## 배포

### 프로덕션 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

### 환경별 설정

- 개발: `.env.development`
- 프로덕션: `.env.production`
- 테스트: `.env.test`

### 배포 체크리스트

1. 환경 변수 확인
2. 백엔드 API URL 설정
3. 프로덕션 빌드 실행
4. 빌드 결과물 배포

## 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다.
