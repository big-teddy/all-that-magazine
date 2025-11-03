import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개 | All That Magazine',
  description: 'All That Magazine은 웰니스, 라이프스타일, 테크 분야의 프리미엄 콘텐츠를 제공하는 한국의 디지털 매거진입니다.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <h1 className="font-serif text-4xl lg:text-6xl font-black mb-8">
        소개
      </h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-bold mb-4">All That Magazine은</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            웰니스, 라이프스타일, 테크 분야의 프리미엄 콘텐츠를 제공하는 한국의 디지털 매거진입니다.
            우리는 깊이 있는 인사이트와 큐레이션된 스토리로 독자 여러분의 삶을 더욱 풍요롭게 만들고자 합니다.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl font-bold mb-4">우리의 미션</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            All That Magazine은 단순한 정보 전달을 넘어서, 독자들이 더 나은 삶을 살 수 있도록 영감을 주고 실질적인 가이드를 제공합니다.
            우리는 검증된 전문가와 협력하여 신뢰할 수 있는 콘텐츠를 만들어냅니다.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl font-bold mb-4">우리의 카테고리</h2>

          <div className="grid md:grid-cols-3 gap-8 my-8">
            <div className="border-l-4 border-wellness pl-6">
              <h3 className="font-serif text-2xl font-bold mb-3 text-wellness">웰니스</h3>
              <p className="text-gray-700">
                균형 잡힌 삶을 위한 마음챙김, 영양, 피트니스, 전인적 건강 실천법
              </p>
            </div>

            <div className="border-l-4 border-lifestyle pl-6">
              <h3 className="font-serif text-2xl font-bold mb-3 text-lifestyle">라이프스타일</h3>
              <p className="text-gray-700">
                영감을 주는 디자인, 문화, 여행, 자기계발 스토리
              </p>
            </div>

            <div className="border-l-4 border-tech pl-6">
              <h3 className="font-serif text-2xl font-bold mb-3 text-tech">테크</h3>
              <p className="text-gray-700">
                혁신, AI, 생산성, 디지털 전환에 대한 인사이트
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl font-bold mb-4">팀</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            All That Magazine은 저널리스트, 디자이너, 개발자, 그리고 각 분야 전문가들로 구성된 열정적인 팀이 만들어갑니다.
            우리는 콘텐츠의 질과 독자 경험을 최우선으로 생각합니다.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl font-bold mb-4">문의하기</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            파트너십, 광고, 기사 제보, 기타 문의사항이 있으시다면{' '}
            <a href="/contact" className="text-blue-600 hover:underline font-medium">
              문의 페이지
            </a>
            를 통해 연락주시기 바랍니다.
          </p>
        </section>
      </div>
    </div>
  );
}
