import * as React from 'react';

export function ErrorIcon(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="36" height="36" rx="18" fill="#FF0000" fillOpacity="0.1"/>
    <path d="M24.8574 11.1428L11.1433 24.857" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.8574 24.8572L11.1433 11.143" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
