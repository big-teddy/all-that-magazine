# Vercel Environment Variables Setup

Vercel Dashboard에서 이 환경변수들을 설정하세요:
https://vercel.com → Project → Settings → Environment Variables

---

## 1. WORDPRESS_GRAPHQL_ENDPOINT
```
Key: WORDPRESS_GRAPHQL_ENDPOINT
Value: https://gold-pheasant-847202.hostingersite.com/graphql
Environments: ✓ Production  ✓ Preview  ✓ Development
```

## 2. NEXT_PUBLIC_SITE_URL (Production)
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://allthatmagazine.com
Environments: ✓ Production
```

## 3. NEXT_PUBLIC_SITE_URL (Preview)
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://preview-allthatmagazine.vercel.app
Environments: ✓ Preview
```
*(Vercel이 제공한 preview URL로 교체하세요)*

## 4. REVALIDATE_SECRET
```
Key: REVALIDATE_SECRET
Value: gqt6xvk_tcy6hmr_allthatmagazine_2024
Environments: ✓ Production  ✓ Preview
```

## 5. NEXT_PUBLIC_WP_API_URL
```
Key: NEXT_PUBLIC_WP_API_URL
Value: https://gold-pheasant-847202.hostingersite.com/wp-json
Environments: ✓ Production  ✓ Preview  ✓ Development
```

## 6. NEXT_PUBLIC_WP_USERNAME
```
Key: NEXT_PUBLIC_WP_USERNAME
Value: admin
Environments: ✓ Production  ✓ Preview
```

## 7. NEXT_PUBLIC_WP_APP_PASSWORD
```
Key: NEXT_PUBLIC_WP_APP_PASSWORD
Value: (WordPress에서 Application Password 생성 후 입력)
Environments: ✓ Production  ✓ Preview
```

---

## 설정 후 재배포 필수!

1. Vercel → Deployments
2. 최신 deployment → ⋯ 메뉴 → Redeploy
3. ✅ "Use existing Build Cache" 체크 해제
4. Redeploy 클릭

---

## Application Password 생성 방법

1. WordPress 관리자 로그인: https://wp.allthatmagazine.com/wp-admin
2. Users → Profile
3. "Application Passwords" 섹션 찾기
4. New Application Password Name: "Vercel Frontend"
5. "Add New Application Password" 클릭
6. 생성된 비밀번호 복사 (공백 제거)
7. Vercel Environment Variables에 추가

---

작성일: 2025-11-04
업데이트: 2025-11-03 - WordPress 엔드포인트를 실제 Hostinger 사이트로 변경
