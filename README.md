# 📘 Forest of Study API

이 프로젝트는 **스터디 생성 / 습관 관리 / 포인트 시스템 / 집중 시간 기록 / 이모지 카운팅** 기능을 제공하는 백엔드입니다.  

---

# 🚀 Base URL

- 모든 요청 및 응답은 JSON 형식입니다.
- 모든 시간은 ISO 8601 문자열(`2025-12-01T10:00:00.000Z`)로 반환됩니다.

---

# 🧱 API 구조

API는 다음 도메인으로 구성됩니다:

| 영역 | 기능 |
|------|------|
| **Study** | 스터디 생성·조회·수정·삭제, 비밀번호 검증 |
| **Habit** | 오늘의 습관 생성·조회·수정·삭제, 오늘 체크/해제 |
| **Focus** | 오늘의 집중 성공 기록, 포인트 자동 지급 |
| **Point** | 포인트 지급/차감, 포인트 이력 조회 |
| **Emoji** | 이모지 클릭 시 카운트 증가, 스터디 인기 이모지 조회 |

Swagger 문서로 전체 API 확인 가능:



http://localhost:3000/api-docs


---

# ⚠️ 공통 에러 응답 형식

모든 에러는 다음 형태로 내려갑니다.

```json
{
  "message": "에러 설명"
}
```

공통 상태 코드 규칙

400: 잘못된 요청 (필수 값 누락 / 숫자 아님)

401: 비밀번호 불일치

403: 다른 스터디 자원 접근

404: 존재하지 않는 스터디·습관 등

500: 서버 내부 에러

# 📚 도메인 규칙 설명

Swagger만 보면 “왜 이렇게 동작하는지”는 이해하기 어려우므로
프론트 개발자가 꼭 알아야 하는 핵심 규칙을 정리했습니다.

# 🟦 1. Study 도메인
✔ 비밀번호 생성 방식

스터디 생성 시 password는 bcrypt 해싱되어 저장됨.

검증은 다음 API로 진행:

POST /api/studies/{studyId}/verify-password

✔ 응답에서 PASSWORD는 항상 제외됩니다.

# 🟩 2. Habit (오늘의 습관)

습관은 주차(WEEK_NUM) 기준으로 분리됩니다.

✔ 주차 계산 규칙

월요일 기준 몇 번째 주인지 계산해 WEEK_NUM으로 저장.

새로운 주가 시작되면 자동으로 빈 목록이 되는 이유.

✔ 요일 체크

요일은 다음 boolean 컬럼을 사용:

SUN, MON, TUE, WED, THU, FRI, SAT

✔ 오늘의 습관 조회
GET /api/studies/{studyId}/habits/today


응답 예:
```
{
  "serverTime": "2025-12-02T11:00:00.000Z",
  "weekNum": 48,
  "day": "TUE",
  "habits": [
    { "HABIT_ID": 1, "NAME": "물 2L 마시기", "isDone": false }
  ]
}
```
✔ 오늘 체크/해제
PATCH /habits/{habitId}/today
```
{
  "isDone": true
}
```

# 🟨 3. Focus (오늘의 집중)

집중 성공 시:

집중 시간(sec) 저장

포인트 자동 계산 + 적립

포인트 이력(history) 반환

✔ 포인트 계산 규칙
기본 3점 + (10분 당 1점)
extra = floor(timeSec / 600)

✔ API
POST /api/studies/{studyId}/focus
```
{
  "timeSec": 1800
}
```

응답:
```
{
  "message": "집중 성공!",
  "time": 30,
  "second": 1800,
  "point": 6,
  "totalPoint": 120,
  "history": { ... }
}
```
# 🟥 4. Point (포인트 시스템)

포인트는 두 테이블로 구성됩니다:

✔ POINT_HISTORY

매번 지급·차감할 때 기록

✔ POINT_MASTER

스터디의 누적 포인트(total)

✔ API 목록

POST /points/history → 이력 생성 + total 증가

GET /points → total + history 조회

# 🟪 5. Emoji (이모지 카운트)

스터디 게시판에서 이모지를 클릭하면:

같은 unicode는 카운트만 증가

새로운 unicode면 row 생성

✔ API
POST /api/studies/{studyId}/emoji
```
{
  "unicode": "🔥"
}
```
GET /api/studies/{studyId}/emoji


정렬: COUNTING desc

# 📁 폴더 구조
```
src/
 ├─ routes/
 ├─ controllers/
 ├─ services/
 ├─ repositories/
 ├─ config/
 └─ prisma/
```
# 🧪 테스트 방법 (Postman)
## Study 생성

### POST /api/studies
```
{
  "name": "오늘의 습관",
  "nickname": "킴명",
  "password": "1234"
}
```
## 습관 생성

### POST /api/studies/1/habits
```
{
  "name": "물 마시기"
}
```
## 집중 성공

### POST /api/studies/1/focus
```
{
  "timeSec": 1800
}
```
## 이모지 증가

### POST /api/studies/1/emoji
```
{
  "unicode": "🔥"
}
```
📑 API 문서 (Swagger)

Swagger UI에서 전체 API 및 스키마를 확인할 수 있습니다.

http://localhost:3000/api-docs

👨‍💻 개발자 정보

Prisma ORM 사용

MySQL 기반

bcrypt를 통한 비밀번호 암호화

Express 기반 라우트 구조

✔ 상태

현재 기능 기준으로 Swagger 및 README 문서 모두 최신 상태입니다.
프론트 개발자는 이 README + Swagger만으로 개발 가능합니다.

끝.
