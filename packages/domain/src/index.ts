// 서비스 특화 컴포넌트 (Domain) — HIARC 비즈니스 도메인(공지/스터디 등)에 종속된 조합형
// 컴포넌트. 디자인 시스템 프리미티브를 조합해 만든다. 도메인 지식(스터디 상태, 출석,
// 공지 카테고리 등)이 들어있으므로 design-system.ts 와는 별도로 관리한다.

// 공지 (Announcement)
export * from './components/announcement/announcement-content-section/announcement-content-section';
export * from './components/announcement/announcement-indicator-section/announcement-indicator-section';
export * from './components/announcement/announcement-info-section/announcement-info-section';
export * from './components/announcement/announcement-desktop-header/AnnouncementDesktopHeader';
export { default as AnnouncementWrite } from './components/announcement-write/announcement-write';
export type { AnnouncementWriteProps } from './components/announcement-write/announcement-write';
export { MobileAnnouncementWrite } from './components/announcement-write/mobile-announcement-write';

// 도메인 칩 (카테고리/레이팅/스터디 상태 — 비즈니스 의미를 가짐)
export * from './components/chip/category-chip';
export * from './components/chip/rating-chip';
export * from './components/chip/study-status-chip';

// 헤더 (앱 특화)
export * from './components/header/mobile-header';

// 스터디 (Study)
export * from './components/study';
export * from './components/study/study-info-section';
export * from './components/study/study-card';
export * from './components/study/student-list-item';
export * from './components/study/study-unassigned-group';
export * from './components/study/study-group-list';
export * from './components/study/study-group-list-item';
export * from './components/study/mobile-study-button';
export * from './components/study/study-form';
export * from './components/study/add-group-dialog/add-group-dialog';
export * from './components/study/edit-group-dialog/edit-group-dialog';
export * from './components/study/create-attendance-code-dialog';
export * from './components/study/show-attendance-code-dialog';
export * from './components/study/create-assignment-dialog';
export * from './components/study/show-assignment-dialog';
export * from './components/study/do-assignment-dialog';
export * from './components/study/attendance-check-dialog';
export * from './components/study/StudyAnnouncementTable/StudyAnnouncementTable';
export * from './components/study/LectureList/LectureList';
export * from './components/study/LectureListItem/LectureListItem';

// 출석 테이블 (도메인 특화 테이블)
export * from './components/table/attendance-table';
