import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | All That Magazine',
  description: 'All That Magazine의 개인정보처리방침을 확인하세요. 우리는 독자의 개인정보를 보호하고 안전하게 관리합니다.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <h1 className="font-serif text-4xl lg:text-6xl font-black mb-4">
        개인정보처리방침
      </h1>
      <p className="text-gray-600 mb-12">
        최종 업데이트: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">1. 개인정보의 수집 및 이용목적</h2>
          <p className="text-gray-700 leading-relaxed">
            All That Magazine("회사")는 다음의 목적을 위하여 개인정보를 처리합니다.
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
            이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• 뉴스레터 발송 및 마케팅 정보 제공</li>
            <li>• 회원 가입 및 관리</li>
            <li>• 구독 서비스 제공</li>
            <li>• 고객 문의 응대 및 상담</li>
            <li>• 서비스 개선 및 통계 분석</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">2. 수집하는 개인정보 항목</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            회사는 다음과 같은 개인정보를 수집하고 있습니다:
          </p>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-xl mb-3">필수 항목</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 이메일 주소</li>
              <li>• 이름 (선택적)</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <h3 className="font-bold text-xl mb-3">자동 수집 항목</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• IP 주소</li>
              <li>• 쿠키</li>
              <li>• 방문 일시</li>
              <li>• 서비스 이용 기록</li>
              <li>• 접속 로그</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">3. 개인정보의 보유 및 이용기간</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• 뉴스레터 구독 정보: 구독 해지 시까지</li>
            <li>• 회원 정보: 회원 탈퇴 시까지</li>
            <li>• 구독 결제 정보: 법령에 따라 5년간 보관</li>
            <li>• 고객 문의 내역: 3년</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">4. 개인정보의 제3자 제공</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 원칙적으로 정보주체의 개인정보를 수집·이용 목적으로 명시한 범위 내에서 처리하며,
            다음의 경우를 제외하고는 정보주체의 사전 동의 없이는 본래의 목적 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• 정보주체로부터 별도의 동의를 받은 경우</li>
            <li>• 법률에 특별한 규정이 있는 경우</li>
            <li>• 정보주체 또는 법정대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">5. 정보주체의 권리·의무 및 행사방법</h2>
          <p className="text-gray-700 leading-relaxed">
            정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• 개인정보 열람 요구</li>
            <li>• 오류 등이 있을 경우 정정 요구</li>
            <li>• 삭제 요구</li>
            <li>• 처리정지 요구</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며,
            회사는 이에 대해 지체없이 조치하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">6. 개인정보의 파기</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </p>
          <div className="mt-4 bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">
              <strong>파기 절차:</strong> 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>파기 방법:</strong> 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">7. 개인정보 보호책임자</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700"><strong>이메일:</strong> privacy@allthatmagazine.com</p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">8. 개인정보처리방침 변경</h2>
          <p className="text-gray-700 leading-relaxed">
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>
        </section>
      </div>
    </div>
  );
}
