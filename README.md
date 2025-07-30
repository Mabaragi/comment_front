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
- **jwt 기반 인증**: 인터셉터 활용 자동 토큰 주입

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
