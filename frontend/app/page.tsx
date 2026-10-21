
export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5faff]">
      <header className="border-b border-blue-100 bg-white px-8 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">
            부산살림
          </h1>
          <nav className="text-sm font-medium text-gray-600">
            생활비 계산기 · 청년 혜택 · 동네 탐색
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-8 py-24 text-center">
        <p className="mb-4 font-semibold text-blue-500">
          서울에서 부산으로, 새로운 시작
        </p>

        <h2 className="mb-6 text-4xl font-bold text-gray-900">
          부산에서 살면 얼마나 달라질까요?
        </h2>

        <p className="mb-10 text-lg text-gray-600">
          서울과 부산의 생활비를 비교하고
          나에게 맞는 청년 혜택을 찾아보세요.
        </p>

        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            나의 부산살림 계산기
          </h3>

          <p className="mb-8 text-gray-500">
            서울과 부산의 월급, 주거비, 생활비를 비교해 보세요.
          </p>

          <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white">
            생활비 비교 시작하기
          </button>
        </div>
      </section>
    </main>
  );
}
