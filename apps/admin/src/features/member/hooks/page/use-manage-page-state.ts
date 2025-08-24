import { useState } from 'react';

export function useManagePageState() {
  const [selectedTab, setSelectedTab] = useState('member_list_section');

  const tabs = [
    { label: '학회원 명단', value: 'member_list_section' },
    { label: '모집관리', value: 'recruit_manage_section' },
  ];

  return {
    tabs,
    selectedTab,
    setSelectedTab,
  };
}