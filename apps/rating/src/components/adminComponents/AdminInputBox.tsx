'use client';

import { Button, Card, Input } from '@hiarc-platform/design-system';
import { useState } from 'react';
import { getAdminHandleStats } from '../../api/AdminApi';
import { blockNameToCode } from '../../util/CheckAdminName';
import { Modal } from '../Modal';

export const AdminInputBox = ({ blockName }: { blockName: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [handle, setHandle] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHandle(e.target.value);
  };
  const onClick = async () => {
    try {
      console.log(handle);
      const response = await getAdminHandleStats(
        blockNameToCode[blockName] as 'solved-level' | 'hiting',
        handle
      );
      if (response) {
        // 핸들별 유저 정보 확인하기인 경우 response.data를 직접 전달
        const data = blockName === '핸들별 유저 정보 확인하기'
          ? response.data
          : response.data || response;
        setModalContent(data);
        setIsModalOpen(true);
      } else {
        setModalContent('핸들 다시 입력하셈 ㅇㅇ');
        setIsModalOpen(true);
      }
    } catch (err) {
      setModalContent('error 개발팀 문의');
      setIsModalOpen(true);
      console.log(err);
    }
  };
  return (
    <div className="overflow-visible">
      <Card className="flex w-full max-w-[454px] flex-row items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-none">
        <Input
          placeholder="핸들을 입력하세요"
          value={handle}
          onChange={handleInputChange}
        />
        <Button size="sm" onClick={onClick}>
          입력하기
        </Button>
      </Card>
      {isModalOpen ? <Modal content={modalContent} onClose={() => setIsModalOpen(false)} /> : ''}
    </div>
  );
};
