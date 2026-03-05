'use client';

import { useEffect, useRef, useState } from 'react';

interface SelectBoxProps {
  value: string;
  setValue: (value: string) => void;
  options: { label: string; value: string }[];
  width?: string;
}

const SelectBox = ({
  value,
  setValue,
  options,
  width = 'w-30',
}: SelectBoxProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);

  // 버튼 너비에 맞춰 드롭다운 너비 설정
  useEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth);
    }
  }, [buttonRef.current?.offsetWidth]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className={`${width} border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-zinc-900 flex items-center justify-between gap-2`}
      >
        {options.find((item) => item.value === value)?.label}
        <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>

      <div
        ref={dropdownRef}
        style={{ width: dropdownWidth }}
        className={`absolute top-full left-0 mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 overflow-hidden
        transform transition-all duration-200 ease-out
        ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
      `}
      >
        {options.map((item) => (
          <button
            key={item.value}
            onClick={() => {
              setValue(item.value);
              setOpen(false);
            }}
            className="block w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-sm"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectBox;
