import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export default function ImageUpload({
  className,
  onChange
}: {
  className?: string;
  onChange: (file: File | null) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      onChange(null);
      return;
    }

    onChange(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <input
        type="file"
        onChange={onSelectFile}
        accept="image/*"
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      />
      {selectedFile && preview && (
        <img className="mt-4 h-32 rounded-lg" src={preview} />
      )}
    </div>
  );
}
