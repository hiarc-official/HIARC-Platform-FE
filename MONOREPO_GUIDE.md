# HIARC Platform 모노레포 가이드

## 개요

HIARC Platform은 **Turborepo**와 **pnpm**을 기반으로 한 모노레포 구조로 설계되어 있습니다. 이 구조를 통해 여러 애플리케이션과 공유 패키지를 효율적으로 관리하고 있습니다.

## 프로젝트 구조

```
HIARC-Platform-FE/
├── apps/                          # 애플리케이션들
│   ├── admin/                     # 관리자 애플리케이션
│   ├── intra/                     # 인트라넷 애플리케이션
│   ├── intro/                     # 소개 페이지
│   └── rating/                    # 평가 시스템
├── packages/                      # 공유 패키지들
│   ├── ui/                        # UI 컴포넌트 라이브러리
│   └── shared/                    # 공통 유틸리티/타입
├── package.json                   # 루트 패키지 설정
├── pnpm-workspace.yaml           # pnpm 워크스페이스 설정
├── turbo.json                     # Turborepo 설정
└── tailwind.config.js            # 공통 Tailwind 설정
```

## 패키지 관리 (pnpm)

### pnpm 워크스페이스 설정

`pnpm-workspace.yaml`:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 주요 특징

- **pnpm@8.15.6** 사용 (`package.json`의 `packageManager` 필드에서 강제)
- 모든 앱과 패키지가 워크스페이스로 관리됨
- 공유 의존성은 루트에서 관리하여 중복 설치 방지

### 워크스페이스 의존성 참조

각 앱에서 공유 패키지를 참조할 때 `workspace:*` 프로토콜 사용:

```json
{
  "dependencies": {
    "@hiarc-platform/shared": "workspace:*",
    "@hiarc-platform/ui": "workspace:*"
  }
}
```

## Turborepo 설정

### 빌드 파이프라인

`turbo.json`:
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
    // ... 기타 태스크들
  }
}
```

### 주요 특징

1. **의존성 기반 빌드**: `dependsOn: ["^build"]`로 의존성 먼저 빌드
2. **병렬 실행**: 독립적인 패키지들의 태스크를 병렬로 실행
3. **캐싱**: 빌드 결과를 캐시하여 불필요한 재빌드 방지
4. **개발 모드**: `dev` 태스크는 캐시 비활성화로 실시간 개발 지원

### 사용 가능한 스크립트

루트에서 실행 가능한 명령어들:

```bash
pnpm dev        # 모든 앱 개발 서버 실행
pnpm build      # 모든 패키지/앱 빌드
pnpm lint       # 전체 프로젝트 린팅
pnpm type-check # 타입 체크
```

## Tailwind CSS 공유 설정

### 중앙집중식 설정 구조

1. **루트 설정**: `tailwind.config.js` - 모든 공통 스타일 정의
2. **앱별 설정**: 각 앱의 `tailwind.config.ts` - 앱별 content 경로와 확장

### 루트 Tailwind 설정 (`tailwind.config.js`)

```js
module.exports = {
  content: [
    './apps/*/src/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00AAFF',
          100: '#01B5C9',
          200: '#276A91',
          300: '#000947',
        },
        // ... 프로젝트 공통 색상 팔레트
      },
      // 공통 폰트, 애니메이션, 유틸리티 등
    }
  },
  plugins: [
    // 커스텀 애니메이션 및 유틸리티 플러그인
  ]
}
```

### 앱별 Tailwind 설정

각 앱의 `tailwind.config.ts`:
```ts
const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}', // UI 패키지 포함
  ],
  presets: [require('../../tailwind.config.js')], // 루트 설정 상속
  theme: {
    extend: {} // 앱별 추가 설정
  },
}
```

### Tailwind 설정 공유의 장점

1. **일관성**: 모든 앱에서 동일한 디자인 시스템 사용
2. **중앙 관리**: 색상, 폰트 등 디자인 토큰을 한 곳에서 관리
3. **확장성**: 각 앱에서 필요한 경우 추가 설정 가능
4. **효율성**: UI 패키지의 컴포넌트도 Tailwind 클래스 스캔에 포함

## 패키지별 상세 정보

### Apps (애플리케이션들)

- **admin**: 관리자 대시보드 (Next.js)
- **intra**: 내부 인트라넷 시스템 (Next.js)
- **intro**: 서비스 소개 페이지 (Next.js)
- **rating**: 평가 시스템 (Next.js)

각 앱은 독립적으로 실행 가능하며, 공유 패키지를 참조합니다.

### Packages (공유 패키지들)

#### @hiarc-platform/ui
- **목적**: 재사용 가능한 UI 컴포넌트 라이브러리
- **기술스택**: React, Radix UI, TypeScript
- **특징**:
  - Radix UI 기반 headless 컴포넌트들
  - 공통 디자인 시스템 구현
  - 모든 앱에서 사용 가능

#### @hiarc-platform/shared
- **목적**: 공통 유틸리티, 타입, 상수 등
- **기술스택**: TypeScript
- **특징**:
  - 순수 TypeScript 패키지
  - 타입 정의 및 유틸리티 함수 제공

## 개발 워크플로우

### 새로운 앱 추가
1. `apps/` 디렉토리에 새 앱 생성
2. 해당 앱의 `package.json`에서 공유 패키지 참조
3. Tailwind 설정에서 루트 설정을 preset으로 사용

### 새로운 공유 컴포넌트 추가
1. `packages/ui/src/` 에 컴포넌트 추가
2. `packages/ui/src/index.ts`에서 export
3. 필요한 앱에서 import하여 사용

### 빌드 및 배포
```bash
# 전체 프로젝트 빌드
pnpm build

# 특정 앱만 빌드
pnpm --filter admin build

# 개발 서버 실행
pnpm dev
```

## 결론

HIARC Platform의 모노레포 구조는 다음과 같은 이점을 제공합니다:

- **효율적인 코드 공유**: UI 컴포넌트와 유틸리티의 재사용
- **일관된 개발 환경**: 공통 설정과 도구 사용
- **빠른 빌드**: Turborepo의 캐싱과 병렬 실행
- **통합된 의존성 관리**: pnpm 워크스페이스를 통한 효율적 패키지 관리
- **일관된 디자인 시스템**: 중앙집중식 Tailwind 설정을 통한 디자인 일관성

이러한 구조를 통해 여러 앱을 효율적으로 개발하고 유지보수할 수 있습니다.