export default function Home() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-4">
      <div className="max-w-2xl space-y-4 text-center">
        <p className="text-xs font-medium text-zinc-500">온라인 러닝 플랫폼</p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          차분하게 배움을 이어가는 공간
        </h1>
        <p className="text-sm text-zinc-600">
          강좌를 탐색하고, 강사를 살펴보고, 대시보드에서 나의 학습 현황을 한눈에 확인해
          보세요.
        </p>
      </div>
    </section>
  );
}
