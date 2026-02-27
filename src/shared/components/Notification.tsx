import { useEffect } from 'react';
import { NotificationOptions } from '../layouts/NotificationProvider';

interface Props extends NotificationOptions {
  onConfirm: () => void;
  onCancel: () => void;
}

const Notification = ({ type, message, onConfirm, onCancel }: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onConfirm();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        type === 'confirm' ? onCancel() : onConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [onConfirm, onCancel, type]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-md w-11/12 max-w-md p-6 text-center pointer-events-auto">
        <h3 className="text-lg font-semibold text-zinc-900 mb-3">{message}</h3>

        {type === 'confirm' ? (
          <div className="flex justify-center gap-3">
            <button
              onClick={onConfirm}
              className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition"
            >
              확인
            </button>
            <button
              onClick={onCancel}
              className="border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-100 transition"
            >
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={onConfirm}
            className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition"
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;
