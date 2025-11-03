import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | All That Magazine',
  description: 'All That Magazine 서비스 이용약관을 확인하세요.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <h1 className="font-serif text-4xl lg:text-6xl font-black mb-4">
        이용약관
      </h1>
      <p className="text-gray-600 mb-12">
        최종 업데이트: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제1조 (목적)</h2>
          <p className="text-gray-700 leading-relaxed">
            이 약관은 All That Magazine("회사")가 제공하는 온라인 매거진 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제2조 (정의)</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li><strong>1. "서비스"</strong>란 회사가 제공하는 All That Magazine 웹사이트 및 관련 서비스 일체를 말합니다.</li>
            <li><strong>2. "이용자"</strong>란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
            <li><strong>3. "회원"</strong>이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
            <li><strong>4. "비회원"</strong>이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
            <li><strong>5. "콘텐츠"</strong>란 회사가 서비스에서 제공하는 기사, 이미지, 동영상 등 일체의 정보를 말합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제3조 (약관의 게시와 개정)</h2>
          <p className="text-gray-700 leading-relaxed">
            ① 회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.<br/>
            ② 회사는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.<br/>
            ③ 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 제1항의 방식에 따라 그 개정약관의 적용일자 7일 전부터 적용일자 전일까지 공지합니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제4조 (서비스의 제공)</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ① 회사는 다음과 같은 서비스를 제공합니다:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• 웰니스, 라이프스타일, 테크 분야의 온라인 매거진 콘텐츠</li>
            <li>• 뉴스레터 서비스</li>
            <li>• 프리미엄 구독 서비스</li>
            <li>• 기타 회사가 정하는 서비스</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            ② 회사는 서비스를 일정범위로 분할하여 각 범위별로 이용가능시간을 별도로 지정할 수 있습니다. 다만, 이러한 경우에는 그 내용을 사전에 공지합니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제5조 (서비스의 중단)</h2>
          <p className="text-gray-700 leading-relaxed">
            ① 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다.<br/>
            ② 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여는 배상하지 아니합니다. 단, 회사에 고의 또는 중대한 과실이 있는 경우에는 그러하지 아니합니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제6조 (회원가입)</h2>
          <p className="text-gray-700 leading-relaxed">
            ① 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.<br/>
            ② 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
            <li>• 등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
            <li>• 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제7조 (회원탈퇴 및 자격 상실)</h2>
          <p className="text-gray-700 leading-relaxed">
            ① 회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를 처리합니다.<br/>
            ② 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• 가입 신청 시에 허위 내용을 등록한 경우</li>
            <li>• 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
            <li>• 서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제8조 (저작권)</h2>
          <p className="text-gray-700 leading-relaxed">
            ① 회사가 작성한 콘텐츠에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.<br/>
            ② 이용자는 서비스를 이용하면서 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제9조 (구독 서비스)</h2>
          <p className="text-gray-700 leading-relaxed">
            ① 회사는 프리미엄 콘텐츠 접근을 위한 유료 구독 서비스를 제공합니다.<br/>
            ② 구독 서비스의 이용요금, 결제 방법 등은 서비스 화면에 별도로 게시합니다.<br/>
            ③ 구독 서비스는 월 단위 또는 연 단위로 자동 갱신되며, 이용자가 구독을 취소하지 않는 한 자동으로 결제됩니다.<br/>
            ④ 구독 취소는 다음 결제일 최소 24시간 전에 신청해야 합니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제10조 (환불)</h2>
          <p className="text-gray-700 leading-relaxed">
            ① 이용자가 구독 서비스에 대한 환불을 요청하는 경우, 회사는 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관련 법령이 정하는 바에 따라 환불을 처리합니다.<br/>
            ② 단, 이미 제공받은 서비스에 대해서는 환불이 제한될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제11조 (면책조항)</h2>
          <p className="text-gray-700 leading-relaxed">
            ① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.<br/>
            ② 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.<br/>
            ③ 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖에 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제12조 (분쟁해결)</h2>
          <p className="text-gray-700 leading-relaxed">
            ① 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.<br/>
            ② 회사와 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-4">제13조 (재판권 및 준거법)</h2>
          <p className="text-gray-700 leading-relaxed">
            ① 이 약관에 명시되지 않은 사항은 전기통신사업법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령과 상관습에 따릅니다.<br/>
            ② 서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 대한민국 법원을 관할 법원으로 합니다.
          </p>
        </section>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-700">
            <strong>부칙</strong><br/>
            이 약관은 {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}부터 적용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
