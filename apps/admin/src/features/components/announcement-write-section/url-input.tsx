import { IconButton, LabeledInput } from '@hiarc-platform/ui';

interface UrlInputProps {
  value: string;
  onChange(value: string): void;
  onRemove(): void;
}

export function UrlInput({ value, onChange, onRemove }: UrlInputProps): React.ReactElement {
  return (
    <div className="flex items-center justify-center gap-2">
      <LabeledInput
        label=""
        showLabel={false}
        placeholder="URL을 입력해주세요"
        value={value}
        onChange={(value) => onChange(value)}
      />
      <IconButton iconSrc="/shared-assets/DeleteButton.svg" size="lg" onClick={onRemove} />
    </div>
  );
}
