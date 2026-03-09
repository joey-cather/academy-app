/// <reference types="vitest" />

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Header from './Header';

const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockNotify = vi.fn();
const mockLogout = vi.fn();
const setAccessToken = vi.fn();

// Header가 기대하는 Next.js 컴포넌트/훅 의존성을 테스트용으로 고정한다.
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

vi.mock('../hooks/useAuthStore', () => ({
  useAuthStore: Object.assign(
    () => ({
      accessToken: null,
    }),
    {
      getState: () => ({
        setAccessToken,
      }),
    }
  ),
}));

vi.mock('@/src/features/auth/api/useLogoutMutation', () => ({
  useLogoutMutation: () => ({
    mutateAsync: mockLogout,
  }),
}));

vi.mock('../providers/NotificationProvider', () => ({
  useNotification: () => ({
    notify: mockNotify,
  }),
}));

vi.mock('@/src/shared/api/queryClient', () => ({
  queryClient: {
    invalidateQueries: vi.fn(),
  },
}));

// 시스템 테마 감지 결과를 테스트 케이스별로 바꿔 끼우기 위한 헬퍼다.
const createMatchMediaImplementation =
  (matches: boolean) => (query: string) => ({
    matches:
      query === '(prefers-color-scheme: dark)' ? matches : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });

// 렌더링과 토글 버튼 조회를 짧게 유지해 각 테스트가 의도만 드러내도록 한다.
const renderHeader = () => render(<Header />);

const getThemeToggle = (theme: 'light' | 'dark') =>
  screen.getByRole('button', {
    name:
      theme === 'dark'
        ? /switch to light mode/i
        : /switch to dark mode/i,
  });

describe('Header dark mode toggle', () => {
  beforeEach(() => {
    // 각 테스트가 이전 테마 상태에 영향받지 않도록 브라우저 상태를 초기화한다.
    localStorage.clear();
    document.documentElement.dataset.theme = 'light';
    mockPush.mockReset();
    mockReplace.mockReset();
    mockNotify.mockReset();
    mockLogout.mockReset();
    setAccessToken.mockReset();

    vi.mocked(window.matchMedia).mockImplementation(
      createMatchMediaImplementation(false)
    );
  });

  it('renders the toggle button in light mode by default', () => {
    renderHeader();
    const toggleButton = getThemeToggle('light');

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('toggles between dark and light mode when clicked', () => {
    renderHeader();
    const darkModeButton = getThemeToggle('light');

    // 첫 클릭으로 dark mode로 전환된다.
    fireEvent.click(darkModeButton);

    const lightModeButton = getThemeToggle('dark');

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(lightModeButton).toHaveAttribute('aria-pressed', 'true');

    // 다시 클릭하면 light mode로 복귀한다.
    fireEvent.click(lightModeButton);

    expect(getThemeToggle('light')).toHaveAttribute('aria-pressed', 'false');
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('initializes dark mode from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    renderHeader();

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(getThemeToggle('dark')).toHaveAttribute('aria-pressed', 'true');
  });

  it('falls back to the system dark preference when no stored theme exists', () => {
    // 저장된 테마가 없을 때는 OS 선호도 값을 초기 테마로 사용한다.
    vi.mocked(window.matchMedia).mockImplementation(
      createMatchMediaImplementation(true)
    );

    renderHeader();

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(getThemeToggle('dark')).toHaveAttribute('aria-pressed', 'true');
  });
});
