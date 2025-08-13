# 컴플라이언스 시뮬레이터 (Compliance Simulator)

사내 컴플라이언스 교육을 위한 대화형 게임입니다. 실제 직장에서 발생할 수 있는 다양한 상황을 시뮬레이션하여 올바른 컴플라이언스 의사결정을 학습할 수 있습니다.

## 🎮 게임 특징

- **5개의 실무 중심 에피소드**: 계약 협상, 업체 선정, 선물 및 접대, 직장 내 괴롭힘, 담합 방지
- **대화형 스토리텔링**: Choose Your Own Adventure 방식
- **즉시 피드백 시스템**: 선택에 따른 실시간 평가
- **점수 시스템**: 퍼센트 기반 성과 평가
- **재도전 기능**: 더 높은 점수 획득 시에만 반영
- **무작위 선택지**: 암기 방지를 위한 순서 및 색깔 무작위화

## 🚀 라이브 데모



## 📋 에피소드 구성

1. **계약 검토 및 협상**: 불합리한 계약 조건 대응
2. **업체 선정 과정**: 공정한 업체 선정 절차
3. **선물 및 접대 정책**: 고객사 선물 및 접대 제안 대응
4. **직장 내 괴롭힘 대응**: 따돌림 및 정보 차단 상황 해결
5. **담합 및 부정청탁 방지**: 경쟁업체와의 부적절한 제안 거절

## 🛠 기술 스택

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 18+ 
- pnpm (권장) 또는 npm

### 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/yourusername/compliance-simulator.git
cd compliance-simulator

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 브라우저에서 http://localhost:5173 접속
```

### 프로덕션 빌드

```bash
# 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

## 🚀 배포

### GitHub Pages 자동 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

1. GitHub에 저장소 푸시
2. Settings > Pages > Source를 "GitHub Actions"로 설정
3. 코드 변경 시 자동으로 배포됨

### 수동 배포

```bash
# 빌드
pnpm build

# dist 폴더를 웹 서버에 업로드
```

## 📁 프로젝트 구조

```
compliance-adventure-enhanced/
├── src/
│   ├── components/          # React 컴포넌트
│   │   └── GameScreen.jsx   # 메인 게임 화면
│   ├── data/               # 게임 데이터
│   │   └── gameData.js     # 시나리오 및 캐릭터 데이터
│   ├── assets/             # 이미지 및 미디어 파일
│   ├── App.jsx             # 메인 앱 컴포넌트
│   └── main.jsx            # 앱 진입점
├── public/                 # 정적 파일
├── dist/                   # 빌드 결과물
└── package.json            # 프로젝트 설정
```

## 🎯 게임 플레이 가이드

1. **에피소드 선택**: 5개 에피소드 중 원하는 시나리오 선택
2. **상황 분석**: 제시된 상황을 읽고 최적의 선택지 고민
3. **선택 및 피드백**: 선택 후 즉시 평가 및 점수 확인
4. **재도전**: 더 높은 점수를 위한 재도전 가능
5. **총점 확인**: 게임 종료 시 퍼센트 기반 최종 평가

## 📊 평가 시스템

- **90% 이상**: 인테그리티의 컴플라이언스 전문가
- **80% 이상**: 발전 중인 컴플라이언서  
- **70% 이상**: 막 컴플라이언스 공부를 시작한 유망주
- **70% 미만**: 즉시 컴플라이언스 공부가 필요해요!

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해 주세요.

---

**Made with ❤️ for better compliance education**

