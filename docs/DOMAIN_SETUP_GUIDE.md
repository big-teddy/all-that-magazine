# Domain Setup Guide - allthatmagazine.com

## 목표 구조

```
allthatmagazine.com          → Vercel (Next.js Frontend - 사용자용)
wp.allthatmagazine.com       → Hostinger (WordPress Backend - 관리자용)
```

---

## 📋 사전 확인

현재 상태:
- ✅ Hostinger IP: `45.130.228.131`
- ✅ 도메인: `allthatmagazine.com`
- ✅ WordPress 설치됨: `https://allthatmagazine.com`
- ✅ Next.js 배포됨: Vercel (임시 URL)

---

## 🚀 Step 1: Hostinger에서 WordPress 서브도메인 설정

### 1-1. hPanel 로그인
1. https://hpanel.hostinger.com 접속
2. 로그인

### 1-2. DNS Zone Editor 접근
1. 좌측 메뉴 → **Websites**
2. `allthatmagazine.com` 선택
3. 좌측 메뉴 → **Advanced** → **DNS / Name Servers**
4. **DNS Zone Editor** 선택

### 1-3. WordPress 서브도메인 A 레코드 추가

**새 A 레코드 추가:**
```
Type: A
Name: wp
Points to: 45.130.228.131
TTL: 14400 (4 hours)
```

**설정 방법:**
1. **Add Record** 버튼 클릭
2. Type: `A` 선택
3. Name: `wp` 입력
4. Points to: `45.130.228.131` 입력
5. TTL: `14400` (기본값)
6. **Add Record** 버튼 클릭하여 저장

### 1-4. 서브도메인 생성 (Subdomain Manager)
1. hPanel → **Websites** → `allthatmagazine.com`
2. 좌측 메뉴 → **Advanced** → **Subdomains**
3. **Create Subdomain** 클릭
4. Subdomain: `wp` 입력
5. Document Root: 기존 WordPress와 동일한 경로 선택
   - `/domains/allthatmagazine.com/public_html` (기본값)
6. **Create** 클릭

### 1-5. WordPress URL 업데이트
1. WordPress 관리자 로그인: https://allthatmagazine.com/wp-admin
2. **Settings** → **General**
3. 두 항목 모두 업데이트:
   - **WordPress Address (URL)**: `https://wp.allthatmagazine.com`
   - **Site Address (URL)**: `https://wp.allthatmagazine.com`
4. **Save Changes** 클릭
5. ⚠️ 로그아웃되면 `https://wp.allthatmagazine.com/wp-admin`으로 다시 로그인

---

## 🌐 Step 2: Vercel에 메인 도메인 연결

### 2-1. Vercel 프로젝트 접근
1. https://vercel.com 로그인
2. 프로젝트 선택: `all-that-magazine` (또는 실제 프로젝트명)

### 2-2. 도메인 추가
1. 프로젝트 → **Settings** 탭
2. 좌측 메뉴 → **Domains**
3. **Add** 버튼 클릭
4. Domain 입력: `allthatmagazine.com`
5. **Add** 버튼 클릭

### 2-3. DNS 설정 옵션 선택

Vercel이 제공하는 3가지 옵션 중 하나:

#### 옵션 A: Vercel Nameservers 사용 (추천)
Vercel이 DNS를 완전히 관리합니다.

**Vercel에서:**
- Nameserver 정보 복사 (예: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)

**Hostinger hPanel에서:**
1. **DNS / Name Servers** → **Change Nameservers**
2. **Use Custom Nameservers** 선택
3. Vercel nameservers 입력:
   - Nameserver 1: `ns1.vercel-dns.com`
   - Nameserver 2: `ns2.vercel-dns.com`
4. **Change** 클릭

**그 다음 Vercel에서 wp 서브도메인 추가:**
1. Vercel Domains 설정에서 **DNS Records** 클릭
2. A 레코드 추가:
   - Name: `wp`
   - Value: `45.130.228.131`
   - TTL: 14400

#### 옵션 B: A 레코드 사용 (수동 설정)

**Vercel이 제공하는 IP 주소 확인:**
- 보통 `76.76.21.21` (Vercel Anycast IP)

**Hostinger DNS Zone Editor에서:**

1. **기존 @ 레코드 수정/삭제:**
   - Type: `A`
   - Name: `@` (또는 비워두기)
   - Points to: `45.130.228.131` → **삭제 또는 수정**

2. **새 A 레코드 추가:**
   ```
   Type: A
   Name: @ (또는 비워두기)
   Points to: 76.76.21.21
   TTL: 14400
   ```

3. **CNAME 레코드 추가 (www):**
   ```
   Type: CNAME
   Name: www
   Points to: cname.vercel-dns.com
   TTL: 14400
   ```

### 2-4. www 서브도메인도 추가 (선택사항)
1. Vercel → Domains → **Add**
2. `www.allthatmagazine.com` 입력
3. **Redirect to allthatmagazine.com** 선택 (권장)

---

## 🔧 Step 3: 환경변수 업데이트

### 3-1. Local 환경변수 (.env.local)

```bash
# WordPress GraphQL Endpoint
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql

# Site URL
NEXT_PUBLIC_SITE_URL=https://allthatmagazine.com

# Revalidation Secret
REVALIDATE_SECRET=gqt6xvk_tcy6hmr_allthatmagazine_2024

# WordPress REST API Configuration
NEXT_PUBLIC_WP_API_URL=https://wp.allthatmagazine.com/wp-json
NEXT_PUBLIC_WP_USERNAME=admin
NEXT_PUBLIC_WP_APP_PASSWORD=your-app-password-here
```

### 3-2. Vercel 환경변수

1. Vercel → 프로젝트 → **Settings** → **Environment Variables**

2. 다음 변수들 추가:

| Key | Value | Environment |
|-----|-------|-------------|
| `WORDPRESS_GRAPHQL_ENDPOINT` | `https://wp.allthatmagazine.com/graphql` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://allthatmagazine.com` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://your-preview.vercel.app` | Preview |
| `REVALIDATE_SECRET` | `gqt6xvk_tcy6hmr_allthatmagazine_2024` | Production, Preview |
| `NEXT_PUBLIC_WP_API_URL` | `https://wp.allthatmagazine.com/wp-json` | Production, Preview, Development |
| `NEXT_PUBLIC_WP_USERNAME` | `admin` | Production, Preview |
| `NEXT_PUBLIC_WP_APP_PASSWORD` | `your-app-password` | Production, Preview |

3. **Save** 클릭

### 3-3. 로컬 환경변수 업데이트

```bash
cd /Users/sunghyunkim/all-that-magazine/frontend
# .env.local 파일 수정
```

---

## ✅ Step 4: 재배포 및 테스트

### 4-1. 코드 업데이트 및 커밋

로컬에서 환경변수 업데이트 후:

```bash
git add .env.local
git commit -m "chore: Update environment variables for wp subdomain"
git push origin main
```

### 4-2. Vercel 재배포

환경변수 변경 후 반드시 재배포:
1. Vercel → 프로젝트 → **Deployments**
2. 최신 deployment → **⋯** (메뉴) → **Redeploy**
3. ✅ **Use existing Build Cache** 체크 해제
4. **Redeploy** 클릭

### 4-3. DNS 전파 확인 (10분~48시간 소요)

터미널에서 확인:

```bash
# 메인 도메인이 Vercel을 가리키는지 확인
dig +short allthatmagazine.com

# wp 서브도메인이 Hostinger를 가리키는지 확인
dig +short wp.allthatmagazine.com
```

예상 결과:
- `allthatmagazine.com` → Vercel IP (76.76.21.21 또는 Vercel CDN IP)
- `wp.allthatmagazine.com` → `45.130.228.131`

온라인 도구로도 확인:
- https://dnschecker.org

---

## 🧪 Step 5: 테스트

### 5-1. WordPress 관리자 접속
```
https://wp.allthatmagazine.com/wp-admin
```
- ✅ 로그인 가능
- ✅ GraphQL 엔드포인트: `https://wp.allthatmagazine.com/graphql`

### 5-2. 프론트엔드 사이트 접속
```
https://allthatmagazine.com
```
- ✅ Next.js 사이트 로딩
- ✅ Article 데이터 표시

### 5-3. 기능 테스트
- ✅ 홈페이지 렌더링
- ✅ Vertical 페이지 (wellness, lifestyle, tech)
- ✅ Article 상세 페이지
- ✅ 이미지 로딩

---

## 🔧 Troubleshooting

### 문제: DNS가 전파되지 않음
**해결책:**
- DNS 전파는 최대 48시간 소요
- `https://dnschecker.org`에서 전파 상태 확인
- 브라우저 캐시 삭제: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)

### 문제: WordPress 로그인 안됨
**해결책:**
- WordPress URL 설정 다시 확인
- 직접 DB 수정이 필요할 수 있음 (phpMyAdmin 사용)

### 문제: Vercel 도메인이 작동하지 않음
**해결책:**
- Vercel → Domains에서 상태 확인
- "Invalid Configuration" 표시 시 DNS 레코드 재확인
- A 레코드와 CNAME이 충돌하지 않는지 확인

### 문제: CORS 에러
**해결책:**
- WordPress에서 CORS 설정 확인
- `functions.php` 또는 플러그인으로 헤더 추가

---

## 📞 Support

문제가 발생하면:
1. Vercel 로그 확인: Deployments → 최신 배포 → View Function Logs
2. WordPress 에러 로그: hPanel → Files → Error Log
3. 브라우저 Console 확인: F12 → Console 탭

---

## 🎉 완료 체크리스트

- [ ] Hostinger에서 wp 서브도메인 A 레코드 추가
- [ ] Hostinger에서 wp 서브도메인 생성
- [ ] WordPress URL을 wp.allthatmagazine.com으로 변경
- [ ] Vercel에 allthatmagazine.com 도메인 추가
- [ ] Hostinger DNS에 Vercel 레코드 추가 (A 또는 Nameserver)
- [ ] Vercel 환경변수 업데이트
- [ ] 로컬 .env.local 업데이트
- [ ] Vercel 재배포
- [ ] DNS 전파 확인
- [ ] WordPress 관리자 로그인 테스트
- [ ] 프론트엔드 사이트 테스트

---

**마지막 업데이트:** 2025-11-03
**작성자:** Claude Code
