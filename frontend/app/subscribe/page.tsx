import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';

export const metadata: Metadata = {
  title: '구독하기 | All That Magazine',
  description: '프리미엄 콘텐츠를 무제한으로 즐기세요. 웰니스, 라이프스타일, 테크 분야의 독점 기사와 인사이트.',
};

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-warm-white to-brand-beige py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl lg:text-6xl font-black mb-6">
            프리미엄 멤버십
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            웰니스, 라이프스타일, 테크 분야의 프리미엄 콘텐츠를 무제한으로 즐기세요
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Monthly Plan */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-brand-navy transition-all hover:shadow-xl">
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl font-bold mb-2">월간 구독</h3>
              <div className="mb-4">
                <span className="text-5xl font-black">₩9,900</span>
                <span className="text-gray-600">/월</span>
              </div>
              <p className="text-gray-600">언제든지 취소 가능</p>
            </div>
            <button className="w-full bg-brand-navy text-white py-4 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-all transform hover:scale-105">
              시작하기
            </button>
          </div>

          {/* Annual Plan (Recommended) */}
          <div className="bg-gradient-to-br from-brand-navy to-gray-900 text-white rounded-2xl p-8 border-2 border-brand-navy relative transform md:scale-110 shadow-2xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
              추천
            </div>
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl font-bold mb-2">연간 구독</h3>
              <div className="mb-2">
                <span className="text-5xl font-black">₩99,000</span>
                <span className="text-gray-300">/년</span>
              </div>
              <p className="text-green-400 font-bold mb-2">2개월 무료</p>
              <p className="text-gray-300 text-sm">월 ₩8,250</p>
            </div>
            <button className="w-full bg-white text-brand-navy py-4 px-6 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
              시작하기
            </button>
          </div>

          {/* Team Plan */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-brand-navy transition-all hover:shadow-xl">
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl font-bold mb-2">팀 구독</h3>
              <div className="mb-4">
                <span className="text-5xl font-black">₩49,000</span>
                <span className="text-gray-600">/월</span>
              </div>
              <p className="text-gray-600">최대 5명</p>
            </div>
            <button className="w-full bg-brand-navy text-white py-4 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-all transform hover:scale-105">
              시작하기
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            멤버십 혜택
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">무제한 프리미엄 콘텐츠</h3>
                <p className="text-gray-600">모든 프리미엄 기사와 독점 콘텐츠 무제한 액세스</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">매주 새로운 콘텐츠</h3>
                <p className="text-gray-600">전문가가 큐레이션한 최신 트렌드와 인사이트</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">독점 뉴스레터</h3>
                <p className="text-gray-600">멤버 전용 뉴스레터와 비하인드 스토리</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">광고 없는 경험</h3>
                <p className="text-gray-600">방해받지 않는 순수한 읽기 경험</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">모든 기기에서 액세스</h3>
                <p className="text-gray-600">웹, 모바일, 태블릿 어디서나 즐기세요</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">저장 & 북마크</h3>
                <p className="text-gray-600">나중에 읽을 기사를 저장하고 관리하세요</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            자주 묻는 질문
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">언제든지 취소할 수 있나요?</h3>
              <p className="text-gray-600">
                네, 언제든지 구독을 취소할 수 있습니다. 위약금이나 추가 비용은 없습니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">무료 체험 기간이 있나요?</h3>
              <p className="text-gray-600">
                첫 7일간 무료로 체험하실 수 있습니다. 체험 기간 중 언제든지 취소 가능합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">결제 방법은 무엇인가요?</h3>
              <p className="text-gray-600">
                신용카드, 체크카드, PayPal, 네이버페이, 카카오페이 등 다양한 결제 수단을 지원합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">환불 정책은 어떻게 되나요?</h3>
              <p className="text-gray-600">
                구독 후 14일 이내 전액 환불이 가능합니다. 단, 콘텐츠를 이용하지 않은 경우에 한합니다.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            아직 결정하지 못하셨나요?
          </p>
          <Link
            href="/"
            className="inline-block text-brand-navy font-bold hover:underline"
          >
            무료 기사 먼저 읽어보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
