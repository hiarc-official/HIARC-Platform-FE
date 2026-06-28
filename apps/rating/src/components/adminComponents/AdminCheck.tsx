'use client';

import { checkAdminName } from '../../util/CheckAdminName';
import { checkAdminApi, checkSemesterApi } from '../../api/AdminApi';
import { useState } from 'react';
import { Modal, ModalContent } from '../Modal';

export const AdminCheck = ({ name }: { name: 'season' | 'event' | 'semester' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>('');
  const buttonClick = async () => {
    try {
      const response = name === 'semester'
        ? await checkSemesterApi()
        : await checkAdminApi(name);

      console.log('Full response:', response);
      console.log('response.data:', response.data);
      console.log('response.data.data:', response.data.data);

      // 응답 구조에 따라 적절한 데이터 선택
      const data = response.data.data || response.data;
      setModalContent(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('오류...', error);
      setModalContent(`오류 개발팀 문의${String(error)}`);
      setIsModalOpen(true);
    }
  };
  return (
    <>
      <div className="flex flex-row gap-[15px] items-center mb-[29px]">
        {checkAdminName[name]}
        <button
          className="bg-[#ffa5a5] border-none rounded-[10px] text-[12px] font-bold p-3 cursor-pointer relative hover:bg-primary"
          onClick={buttonClick}
        >
          확인하기
        </button>
      </div>
      {isModalOpen && <Modal content={modalContent} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
