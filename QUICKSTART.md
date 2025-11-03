# All That Magazine - Quick Start Guide

실제 프로젝트를 진행하기 위한 단계별 가이드입니다.

## 📋 준비물 체크리스트

시작하기 전에 다음 정보가 필요합니다:

- [ ] Hostinger 계정 로그인 정보
- [ ] WordPress 설치 완료 (또는 설치 예정)
- [ ] Hostinger FTP 접속 정보
- [ ] 도메인 이름 (예: allthatmagazine.com)

## 🚀 Step-by-Step 설정

### Step 1: Hostinger WordPress 설치 확인

#### 1-1. Hostinger hPanel 로그인
```
https://hpanel.hostinger.com
```

#### 1-2. WordPress 설치 확인
- **WordPress 이미 설치됨?** → Step 2로
- **WordPress 미설치?** → 아래 진행

**WordPress 자동 설치:**
1. hPanel → Website → Auto Installer
2. WordPress 선택
3. 설치 정보 입력:
   - Website URL: `wp.allthatmagazine.com` (또는 서브도메인)
   - Admin Username: (관리자 이름)
   - Admin Password: (강력한 비밀번호)
   - Admin Email: (이메일)
4. Install 클릭
5. 5-10분 대기

**설치 완료 후 확인:**
```
https://wp.allthatmagazine.com/wp-admin
```

### Step 2: Hostinger FTP 정보 확인

#### 2-1. FTP 계정 확인
1. hPanel → Files → FTP Accounts
2. 정보 확인 또는 새 계정 생성:
   - **FTP Host**: `ftp.your-domain.com`
   - **FTP Username**: `u123456789` (또는 생성한 계정)
   - **FTP Password**: (비밀번호)
   - **FTP Port**: `21`

#### 2-2. WordPress 경로 확인
일반적인 경로:
```
/public_html/                    # 메인 도메인
/public_html/wp-content/plugins/ # 플러그인 폴더
```

서브도메인 사용시:
```
/public_html/wp/                 # 서브도메인
/public_html/wp/wp-content/plugins/
```

### Step 3: 로컬 환경 설정

#### 3-1. .env.hostinger 파일 생성

```bash
cd ~/all-that-magazine
cp .env.hostinger.example .env.hostinger
```

#### 3-2. .env.hostinger 편집

```bash
nano .env.hostinger
```

다음 정보 입력:
```bash
# Hostinger FTP (Step 2에서 확인한 정보)
HOSTINGER_FTP_SERVER=ftp.your-domain.com
HOSTINGER_FTP_USERNAME=u123456789
HOSTINGER_FTP_PASSWORD=your-ftp-password
HOSTINGER_FTP_PATH=/public_html/wp-content/plugins/

# WordPress URL (Step 1에서 설치한 URL)
HOSTINGER_WP_URL=https://wp.allthatmagazine.com

# SSH (선택사항 - WP-CLI 사용시)
HOSTINGER_SSH_HOST=your-domain.com
HOSTINGER_SSH_USER=u123456789
HOSTINGER_SSH_PORT=21098
HOSTINGER_WP_PATH=/home/u123456789/public_html
```

저장: `Ctrl + X` → `Y` → `Enter`

### Step 4: WordPress 플러그인 빌드 및 업로드

#### 4-1. 플러그인 빌드
```bash
cd ~/all-that-magazine
npm run build:plugin
```

**결과:**
```
✓ wordpress-plugin/all-that-magazine-setup.zip 생성됨
```

#### 4-2. WordPress에 플러그인 업로드

**방법 A: WordPress 관리자 (추천)**
1. WordPress 관리자 로그인: `https://wp.allthatmagazine.com/wp-admin`
2. 플러그인 → 새로 추가 → 플러그인 업로드
3. `wordpress-plugin/all-that-magazine-setup.zip` 선택
4. 지금 설치 클릭
5. 플러그인 활성화

**방법 B: FTP 자동 배포 (고급)**
```bash
npm run deploy:wordpress
```

### Step 5: 필수 플러그인 설치

WordPress 관리자에서 다음 플러그인 설치:

#### 5-1. Advanced Custom Fields (ACF)
1. 플러그인 → 새로 추가
2. 검색: "Advanced Custom Fields"
3. 지금 설치 → 활성화

#### 5-2. WPGraphQL
1. 플러그인 → 새로 추가
2. 검색: "WPGraphQL"
3. 지금 설치 → 활성화

#### 5-3. WPGraphQL for Advanced Custom Fields
1. 플러그인 → 새로 추가
2. 검색: "WPGraphQL for Advanced Custom Fields"
3. 지금 설치 → 활성화

또는 GitHub에서:
```
https://github.com/wp-graphql/wp-graphql-acf/releases
```

### Step 6: All That Magazine Setup 실행

#### 6-1. Setup 페이지 이동
WordPress 관리자 → 설정 → All That Setup

#### 6-2. 체크리스트 확인
모든 항목이 ✅ 인지 확인:
- ✅ Custom Post Type: Article
- ✅ Taxonomy: Vertical
- ✅ ACF Plugin
- ✅ WPGraphQL Plugin
- ✅ WPGraphQL for ACF Plugin
- ✅ Permalinks: Post Name
- ✅ Timezone: Asia/Seoul

#### 6-3. 설정 실행
"Run Complete Setup" 버튼 클릭

**완료 메시지:**
```
✓ Setup Complete! All That Magazine is ready to use.
```

### Step 7: GraphQL 엔드포인트 테스트

#### 7-1. GraphQL IDE 접속
```
https://wp.allthatmagazine.com/wp-admin/admin.php?page=graphiql-ide
```

#### 7-2. 테스트 쿼리 실행
```graphql
query TestSetup {
  verticals {
    nodes {
      name
      slug
    }
  }
}
```

**예상 결과:**
```json
{
  "data": {
    "verticals": {
      "nodes": [
        {
          "name": "Wellness",
          "slug": "wellness"
        },
        {
          "name": "Lifestyle",
          "slug": "lifestyle"
        },
        {
          "name": "Tech",
          "slug": "tech"
        }
      ]
    }
  }
}
```

### Step 8: 샘플 Article 생성

#### 8-1. 새 Article 생성
WordPress 관리자 → Articles → Add New

#### 8-2. 필수 정보 입력
- **Title**: "Welcome to All That Magazine"
- **Content**: 본문 내용 작성
- **Featured Image**: 이미지 업로드 (필수!)
- **Custom Excerpt**: 요약 내용 (200자 이내)
- **Vertical**: Wellness 선택
- **Read Time**: 5
- **Premium Content**: 체크 해제 (무료 article)

#### 8-3. 발행
"Publish" 버튼 클릭

#### 8-4. GraphQL에서 확인
```graphql
query GetArticles {
  articles(first: 1) {
    edges {
      node {
        id
        title
        slug
        verticals {
          nodes {
            name
          }
        }
        articleFields {
          featuredImage {
            sourceUrl
          }
          customExcerpt
          readTime
        }
      }
    }
  }
}
```

### Step 9: 프론트엔드 설정

#### 9-1. .env.local 생성
```bash
cd ~/all-that-magazine/frontend
cp .env.local.example .env.local
```

#### 9-2. .env.local 편집
```bash
nano .env.local
```

WordPress URL 입력:
```bash
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=your-random-secret-key
```

#### 9-3. 개발 서버 실행
```bash
cd ~/all-that-magazine
npm run dev
```

#### 9-4. 브라우저에서 확인
```
http://localhost:3000
```

**보여야 할 것:**
- Wellness, Lifestyle, Tech 섹션
- 방금 만든 샘플 article 표시

### Step 10: Vercel 배포

#### 10-1. Vercel 환경 변수 설정
Vercel Dashboard → Project → Settings → Environment Variables

추가:
```
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql
NEXT_PUBLIC_SITE_URL=https://allthatmagazine.vercel.app
REVALIDATE_SECRET=your-random-secret-key
```

#### 10-2. 배포
```bash
git add .
git commit -m "Configure WordPress connection"
git push origin main
```

Vercel이 자동으로 배포합니다!

## ✅ 완료 체크리스트

최종 확인:

- [ ] WordPress 설치 완료
- [ ] FTP 정보 확인 및 .env.hostinger 설정
- [ ] All That Magazine Setup 플러그인 설치 및 활성화
- [ ] 필수 플러그인 설치 (ACF, WPGraphQL)
- [ ] Setup 실행 완료
- [ ] GraphQL 엔드포인트 작동 확인
- [ ] 샘플 article 생성
- [ ] 로컬 개발 서버 정상 작동
- [ ] Vercel 환경 변수 설정
- [ ] Vercel 배포 완료

## 🆘 문제 해결

### WordPress 로그인 안됨
- URL 확인: `https://wp.allthatmagazine.com/wp-admin`
- 비밀번호 재설정: "비밀번호를 잊으셨나요?" 클릭

### FTP 연결 안됨
- Hostinger hPanel → FTP Accounts에서 정보 재확인
- Passive Mode 확인
- 방화벽 설정 확인

### GraphQL 404 에러
- WPGraphQL 플러그인 활성화 확인
- WordPress 관리자 → 설정 → Permalinks → 변경사항 저장

### 프론트엔드에 데이터 안뜸
- `.env.local`의 WORDPRESS_GRAPHQL_ENDPOINT 확인
- GraphQL IDE에서 쿼리 테스트
- WordPress에 article이 있는지 확인
- Featured Image가 설정되었는지 확인

### 플러그인 업로드 실패
- 파일 크기 제한 확인 (보통 2MB-10MB)
- FTP로 직접 업로드 시도
- ZIP 파일이 올바르게 생성되었는지 확인

## 📞 추가 지원

- **Hostinger 지원**: https://www.hostinger.com/support
- **프로젝트 이슈**: https://github.com/big-teddy/all-that-magazine/issues
- **문서**: README.md, VERCEL.md, HOSTINGER_SETUP.md

---

이 가이드를 따라하면 All That Magazine 프로젝트가 완전히 작동합니다! 🚀
