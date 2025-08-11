import { DialogUtil } from '@hiarc-platform/ui';
import React from 'react';

/**
 * Helper functions for showing component-based dialogs
 */
export class DialogHelpers {
  /**
   * Shows a competition form dialog
   */
  static showCompetitionDialog(options?: {
    onSave?: (data: any) => void;
    onCancel?: () => void;
    initialData?: any;
  }): string {
    const CompetitionDialog = React.lazy(() => 
      import('../features/auth/components/competition-section/competition-dialog').then(mod => ({
        default: mod.CompetitionDialog
      }))
    );

    return DialogUtil.showComponent(
      React.createElement(CompetitionDialog, {
        onSave: options?.onSave,
        onCancel: options?.onCancel,
        initialData: options?.initialData,
      })
    );
  }

  /**
   * Shows a generic form dialog
   */
  static showFormDialog(
    component: React.ComponentType<any>,
    props?: any
  ): string {
    return DialogUtil.showComponent(
      React.createElement(component, props)
    );
  }

  /**
   * Shows a confirmation dialog with custom component
   */
  static showCustomConfirm(
    message: React.ReactNode,
    options?: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
      onConfirm?: () => void;
      onCancel?: () => void;
    }
  ): string {
    const ConfirmComponent = ({ onConfirm, onCancel }: any) => (
      <div className="w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">{options?.title || '확인'}</h3>
        <div className="mb-6 text-gray-700">{message}</div>
        <div className="flex gap-2">
          <button 
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            onClick={() => {
              onCancel?.();
              options?.onCancel?.();
              DialogUtil.hideAllDialogs();
            }}
          >
            {options?.cancelText || '취소'}
          </button>
          <button 
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={() => {
              onConfirm?.();
              options?.onConfirm?.();
              DialogUtil.hideAllDialogs();
            }}
          >
            {options?.confirmText || '확인'}
          </button>
        </div>
      </div>
    );

    return DialogUtil.showComponent(<ConfirmComponent />);
  }
}