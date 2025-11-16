'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { uploadImage } from '@/lib/wordpress-api';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  label?: string;
}

export default function ImageUploader({ onImageUploaded, currentImageUrl, label = 'Featured Image' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || '');
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('이미지 파일은 5MB 이하여야 합니다.');
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to WordPress
      const imageUrl = await uploadImage(file);

      clearInterval(progressInterval);
      setProgress(100);

      onImageUploaded(imageUrl);

      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 500);

    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.');
      setUploading(false);
      setProgress(0);
    }
  }, [onImageUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled: uploading,
  });

  const removeImage = () => {
    setPreviewUrl('');
    onImageUploaded('');
    setError(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {!previewUrl ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />

          <div className="space-y-2">
            <div className="text-4xl">📷</div>

            {uploading ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">업로드 중...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{progress}%</p>
              </div>
            ) : (
              <>
                {isDragActive ? (
                  <p className="text-sm text-blue-600 font-medium">
                    이미지를 여기에 놓으세요
                  </p>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      이미지를 드래그하거나 클릭하여 업로드
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF, WebP (최대 5MB)
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-lg"
          >
            ✕ 제거
          </button>

          <div className="mt-2 text-xs text-gray-500 truncate">
            {currentImageUrl && previewUrl === currentImageUrl && (
              <span>현재 이미지</span>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}
