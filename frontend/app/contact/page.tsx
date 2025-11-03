import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문의 | All That Magazine',
  description: 'All That Magazine에 문의사항이 있으시면 연락주세요. 파트너십, 광고, 기사 제보 등 모든 문의를 환영합니다.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <h1 className="font-serif text-4xl lg:text-6xl font-black mb-8">
        문의
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-12">
          All That Magazine에 관심을 가져주셔서 감사합니다.
          파트너십, 광고, 기사 제보, 기타 문의사항이 있으시면 아래 정보를 통해 연락주시기 바랍니다.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="font-serif text-2xl font-bold mb-4">일반 문의</h2>
            <p className="text-gray-700 mb-4">
              일반적인 문의사항이나 제안사항이 있으시면 이메일로 연락주세요.
            </p>
            <a
              href="mailto:info@allthatmagazine.com"
              className="text-blue-600 hover:underline font-medium text-lg"
            >
              info@allthatmagazine.com
            </a>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="font-serif text-2xl font-bold mb-4">광고 및 파트너십</h2>
            <p className="text-gray-700 mb-4">
              광고 게재 및 브랜드 파트너십에 관심이 있으시면 연락주세요.
            </p>
            <a
              href="mailto:partnerships@allthatmagazine.com"
              className="text-blue-600 hover:underline font-medium text-lg"
            >
              partnerships@allthatmagazine.com
            </a>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="font-serif text-2xl font-bold mb-4">기사 제보</h2>
            <p className="text-gray-700 mb-4">
              흥미로운 스토리나 뉴스 팁이 있으시면 공유해주세요.
            </p>
            <a
              href="mailto:editorial@allthatmagazine.com"
              className="text-blue-600 hover:underline font-medium text-lg"
            >
              editorial@allthatmagazine.com
            </a>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="font-serif text-2xl font-bold mb-4">기술 지원</h2>
            <p className="text-gray-700 mb-4">
              웹사이트 이용 중 문제가 발생하셨나요? 기술 지원팀에 문의하세요.
            </p>
            <a
              href="mailto:support@allthatmagazine.com"
              className="text-blue-600 hover:underline font-medium text-lg"
            >
              support@allthatmagazine.com
            </a>
          </div>
        </div>

        <section className="mt-12 p-8 bg-blue-50 rounded-xl">
          <h2 className="font-serif text-2xl font-bold mb-4">응답 시간</h2>
          <p className="text-gray-700 leading-relaxed">
            영업일 기준 2-3일 이내에 답변드리도록 노력하고 있습니다.
            긴급한 문의사항의 경우 이메일 제목에 [긴급]을 표시해주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
