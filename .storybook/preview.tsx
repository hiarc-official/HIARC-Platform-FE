import type { Preview } from '@storybook/react';
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // 사이드바 정렬: 디자인 시스템을 먼저, 그 다음 도메인.
      storySort: {
        order: ['Design System', 'Domain'],
      },
    },
  },
};

export default preview;
