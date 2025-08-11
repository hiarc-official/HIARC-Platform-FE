import React from 'react';
import { useDialogStore, DialogConfig } from '../store/dialog-store';

export class DialogUtil {
  private static getStore(): ReturnType<typeof useDialogStore.getState> {
    return useDialogStore.getState();
  }

  /**
   * 기본 다이얼로그를 표시합니다
   */
  static showDialog(config: Omit<DialogConfig, 'id'>): string {
    return this.getStore().showDialog(config);
  }

  /**
   * 정보 다이얼로그를 표시합니다
   */
  static showInfo(content: React.ReactNode, title?: string, onConfirm?: () => void): string {
    return this.showDialog({
      type: 'info',
      title: title || '정보',
      content,
      onConfirm,
    });
  }

  /**
   * 성공 다이얼로그를 표시합니다
   */
  static showSuccess(content: React.ReactNode, title?: string, onConfirm?: () => void): string {
    return this.showDialog({
      type: 'success',
      title: title || '성공',
      content,
      onConfirm,
    });
  }

  /**
   * 경고 다이얼로그를 표시합니다
   */
  static showWarning(content: React.ReactNode, title?: string, onConfirm?: () => void): string {
    return this.showDialog({
      type: 'warning',
      title: title || '경고',
      content,
      onConfirm,
    });
  }

  /**
   * 에러 다이얼로그를 표시합니다
   */
  static showError(content: React.ReactNode, title?: string, onConfirm?: () => void): string {
    return this.showDialog({
      type: 'error',
      title: title || '오류',
      content,
      onConfirm,
    });
  }

  /**
   * 확인 다이얼로그를 표시합니다
   */
  static showConfirm(
    content: React.ReactNode,
    onConfirm?: () => void,
    onCancel?: () => void,
    options?: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
    }
  ): string {
    return this.showDialog({
      type: 'confirm',
      title: options?.title || '확인',
      content,
      onConfirm,
      onCancel,
      confirmText: options?.confirmText || '확인',
      cancelText: options?.cancelText || '취소',
    });
  }

  /**
   * 특정 다이얼로그를 닫습니다
   */
  static hideDialog(id: string): void {
    this.getStore().hideDialog(id);
  }

  /**
   * 모든 다이얼로그를 닫습니다
   */
  static hideAllDialogs(): void {
    this.getStore().hideAllDialogs();
  }

  /**
   * Promise 기반의 확인 다이얼로그
   */
  static confirm(
    content: React.ReactNode,
    options?: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
    }
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.showConfirm(
        content,
        () => resolve(true),
        () => resolve(false),
        options
      );
    });
  }

  /**
   * Promise 기반의 정보 다이얼로그
   */
  static info(content: React.ReactNode, title?: string): Promise<void> {
    return new Promise((resolve) => {
      this.showInfo(content, title, () => resolve());
    });
  }

  /**
   * 커스텀 다이얼로그를 표시합니다
   */
  static showCustom(
    content: React.ReactNode,
    options?: {
      title?: string;
      size?: 'sm' | 'md' | 'lg' | 'xl';
      hideButtons?: boolean;
      closeOnBackdropClick?: boolean;
      onConfirm?(): void;
      onCancel?(): void;
      confirmText?: string;
      cancelText?: string;
    }
  ): string {
    return this.showDialog({
      type: 'custom',
      title: options?.title,
      content,
      size: options?.size || 'md',
      hideButtons: options?.hideButtons,
      closeOnBackdropClick: options?.closeOnBackdropClick,
      onConfirm: options?.onConfirm,
      onCancel: options?.onCancel,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
    });
  }

  /**
   * Promise 기반의 커스텀 다이얼로그
   */
  static custom(
    content: React.ReactNode,
    options?: {
      title?: string;
      size?: 'sm' | 'md' | 'lg' | 'xl';
      hideButtons?: boolean;
      closeOnBackdropClick?: boolean;
      confirmText?: string;
      cancelText?: string;
    }
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.showCustom(content, {
        ...options,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  }

  /**
   * 완전 커스터마이징된 다이얼로그를 표시합니다 (모든 옵션을 직접 제어)
   */
  static showFullCustom(config: Omit<DialogConfig, 'id'>): string {
    return this.showDialog(config);
  }

  /**
   * 컴포넌트를 다이얼로그로 표시합니다
   */
  static showComponent(component: React.ReactNode): string {
    return this.showDialog({
      type: 'custom',
      content: component,
      hideButtons: true,
      closeOnBackdropClick: true,
    });
  }
}