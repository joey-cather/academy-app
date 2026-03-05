const CircularProgressBar = ({
  progress,
  strokeColor,
}: {
  progress: number;
  strokeColor: 'green' | 'blue' | 'gray';
}) => {
  const radius = 50; // 원의 반지름
  const circumference = 2 * Math.PI * radius; // 원의 둘레

  // 진행률에 따른 offset 계산
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      {/* 원형 배경 */}
      <svg
        width="120"
        height="120"
        className="transform rotate-270"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e7eb" // 배경 원 색 (회색)
          strokeWidth="10"
          fill="transparent"
        />
        {/* 진행률 원 */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={strokeColor} // 진행률 색
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference} // 원의 둘레
          strokeDashoffset={offset} // 진행 상태에 따라 자름
          className="transition-all duration-500"
        />
      </svg>
      {/* 퍼센트 텍스트 */}
      <div className="absolute text-xl font-semibold text-gray-800 dark:text-gray-100">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
