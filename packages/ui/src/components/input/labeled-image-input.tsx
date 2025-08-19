'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Label } from '../label/label';
import { cn } from '../../lib/utils';

export function LabeledImageInput({
  label,
  showLabel = true,
  required = false,
}: {
  label: string;
  showLabel?: boolean;
  required?: boolean;
}): React.ReactElement {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) {
      return;
    }
    const selectedFiles = Array.from(event.target.files);
    if (images.length > 4) {
      alert('최대 5장까지 업로드할 수 있습니다.');
      return;
    }
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemove = (index: number): void => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      {showLabel && (
        <div className=" flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'flex aspect-square h-[72px] w-[72px] rounded-lg',
            'cursor-pointer flex-col items-center justify-center',
            'border border-dashed border-gray-200 bg-white',
            'transition-colors duration-200 hover:bg-gray-100'
          )}
        >
          <Image src="/shared-assets/Camera.svg" alt="카메라 아이콘" width={24} height={24} />
          <Label className="text-gray-500" size="sm">{`${images.length} / 5`}</Label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="flex gap-2">
          {previews.map((src, index) => (
            <div key={index} className="relative aspect-square h-[72px] w-[72px]">
              <Image
                src={src}
                alt={`preview-${index}`}
                width={72}
                height={72}
                unoptimized
                className="h-full w-full rounded-md object-cover"
              />
              <button
                onClick={() => handleRemove(index)}
                className="hover:bg-red-600 absolute z-10 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white shadow-md"
                style={{ top: '4px', right: '4px' }}
                type="button"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
