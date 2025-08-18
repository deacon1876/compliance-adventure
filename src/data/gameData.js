// 컴플라이언스 시뮬레이터 게임 데이터 (확장판)

// 이미지 import
import characterMain from '../assets/character-main.png';
import characterManager from '../assets/character-manager.png';
import characterColleague from '../assets/character-colleague.png';
import characterClient from '../assets/character-client.png';
import characterSupplier from '../assets/character-supplier.png';
import officeMeetingRoom from '../assets/office-meeting-room.png';
import officeWorkspace from '../assets/office-workspace.png';
import restaurantBusiness from '../assets/restaurant-business.png';
import officeHallway from '../assets/office-hallway.png';
import conferenceRoom from '../assets/conference-room.png';
import computerScreen from '../assets/computer-screen.png';

export const characters = {
  main: {
    name: "정직한 프로",
    role: "프로젝트 매니저",
    image: characterMain
  },
  manager: {
    name: "박 그룹장",
    role: "직속 상사",
    image: characterManager
  },
  colleague: {
    name: "이로운 프로",
    role: "동료",
    image: characterColleague
  },
  client: {
    name: "한실장",
    role: "고객사 담당자",
    image: characterClient

  },
  supplier: {
    name: "정대표",
    role: "협력업체 대표",
    image: characterSupplier
  }
};

export const backgrounds = {
  meetingRoom: officeMeetingRoom,
  office: officeWorkspace,
  restaurant: restaurantBusiness,
  hallway: officeHallway,
  conferenceRoom: conferenceRoom,
  computerScreen: computerScreen
};

export const gameScenarios = {
  intro: {
    id: "intro",
    title: "컴플라이언스 시뮬레이터 - 에피소드 선택",
    background: backgrounds.meetingRoom,
    character: characters.main,
    text: "컴플라이언스 시뮬레이터에 오신 것을 환영합니다!\n\n총 5개의 실무 중심 에피소드 중에서 원하는 시나리오를 선택하여 플레이하세요. 각 에피소드는 실제 직장에서 발생할 수 있는 상황들을 다루며, 올바른 선택을 통해 컴플라이언스 역량을 키울 수 있습니다.\n\n어떤 에피소드부터 시작하시겠습니까?",
    choices: [
      {
        text: "에피소드 1: 계약 검토 및 협상",
        nextScenario: "chapter1_situation",
        points: 0
      },
      {
        text: "에피소드 2: 업체 선정 과정",
        nextScenario: "chapter2_situation",
        points: 0
      },
      {
        text: "에피소드 3: 선물 및 접대 정책",
        nextScenario: "chapter4_situation",
        points: 0
      },
      {
        text: "에피소드 4: 직장 내 괴롭힘 대응",
        nextScenario: "episode1_situation",
        points: 0
      },
      {
        text: "에피소드 5: 담합 및 부정청탁 방지",
        nextScenario: "episode2_situation",
        points: 0
      }
    ]
  },

  // 에피소드 1: 계약 검토 및 협상
  chapter1_situation: {
    id: "chapter1_situation",
    title: "에피소드 1: 계약 검토 및 협상",
    background: backgrounds.meetingRoom,
    character: characters.client,
    text: "대형 프로젝트 계약 협상이 진행 중입니다. 고객사 한실장이 예상보다 훨씬 까다로운 요구사항들을 제시합니다.\n\n\"정직한 프로님, 기존 계약서보다 30% 더 많은 기능을 추가하고, 납기는 그대로 유지하되 품질 보증 기간을 2년으로 연장해주세요. 지연 시 일일 지연료도 지불해주시고요.\"\n\n이는 명백히 불합리한 조건입니다. 어떻게 대응하시겠습니까?",
    choices: [
      {
        text: "네, 고객사 요구사항을 모두 수용하겠습니다.",
        nextScenario: "chapter1_situation2",
        points: -1
      },
      {
        text: "중요한 요구사항들이네요. 저희 내부에서 검토한 후 내일까지 답변드리겠습니다.",
        nextScenario: "chapter1_situation2",
        points: 3
      },
      {
        text: "말씀해주신 요구사항 중 일부는 기존 계약 조건과 상충되는 부분이 있습니다.",
        nextScenario: "chapter1_situation2",
        points: 1
      }
    ]
  },

  chapter1_situation2: {
    id: "chapter1_situation2",
    title: "계약 조건 재검토",
    background: backgrounds.office,
    character: characters.manager,
    text: "박 그룹장이 계약 조건에 대해 조언합니다.\n\n\"정직한 프로, 고객사 요구사항이 까다롭긴 하지만 이 프로젝트를 따내면 우리 팀 실적이 크게 올라갈 거야. 좀 무리해서라도 수주하는 게 어떨까? 나중에 변경 계약으로 조정하면 되잖아.\"\n\n상사의 압박과 원칙 사이에서 어떻게 하시겠습니까?",
    choices: [
      {
        text: "네, 그룹장님 말씀대로 일단 수주부터 하겠습니다.",
        nextScenario: "chapter1_situation3",
        points: -1
      },
      {
        text: "리스크가 너무 큽니다. 조건을 재협상해야 합니다.",
        nextScenario: "chapter1_situation3",
        points: 3
      },
      {
        text: "일부 조건만 수용하고 나머지는 협상해보겠습니다.",
        nextScenario: "chapter1_situation3",
        points: 1
      }
    ]
  },

  chapter1_situation3: {
    id: "chapter1_situation3",
    title: "최종 계약 결정",
    background: backgrounds.meetingRoom,
    character: characters.client,
    text: "최종 계약 협상 자리에서 고객사가 마지막 제안을 합니다.\n\n\"그럼 이렇게 하죠. 기능 추가는 20%로 줄이고, 품질보증 기간은 1.5년, 대신 성공 보너스로 계약금의 10%를 추가로 지급하겠습니다. 어떠세요?\"\n\n이 제안을 어떻게 받아들이시겠습니까?",
    choices: [
      {
        text: "좋은 제안입니다. 바로 계약하겠습니다.",
        nextScenario: "chapter1_end",
        points: 1
      },
      {
        text: "내부 검토 후 내일까지 답변드리겠습니다.",
        nextScenario: "chapter1_end",
        points: 3
      },
      {
        text: "성공 보너스보다는 기본 계약금 인상을 원합니다.",
        nextScenario: "chapter1_end",
        points: 2
      }
    ]
  },

  chapter1_end: {
    id: "chapter1_end",
    title: "계약 협상 결과",
    background: backgrounds.office,
    character: characters.main,
    text: "계약 협상이 마무리되었습니다. 합리적인 협상과 원칙적인 대응이 중요합니다.",
    choices: [
      {
        text: "에피소드 2: 업체 선정 과정",
        nextScenario: "chapter2_situation",
        points: 0,
        color: "blue"
      },
      {
        text: "에피소드 3: 정보 보안 관리",
        nextScenario: "chapter3_situation",
        points: 0,
        color: "purple"
      },
      {
        text: "에피소드 3: 선물 및 접대 정책",
        nextScenario: "chapter4_situation",
        points: 0,
        color: "green"
      },
      {
        text: "에피소드 4: 직장 내 괴롭힘 대응",
        nextScenario: "episode1_situation",
        points: 0,
        color: "orange"
      },
      {
        text: "에피소드 5: 담합 및 부정청탁 방지",
        nextScenario: "episode2_situation",
        points: 0,
        color: "pink"
      },
      {
        text: "처음 메뉴 가기 및 총점 계산(누적 점수 RESET)",
        nextScenario: "final_score",
        points: 0,
        color: "gray"
      }
    ]
  },

  // 에피소드 2: 업체 선정 과정
  chapter2_situation: {
    id: "chapter2_situation",
    title: "에피소드 2: 업체 선정 과정",
    background: backgrounds.office,
    character: characters.supplier,
    text: "새로운 협력업체 선정 과정에서 한 업체 대표가 개인적으로 접근해왔습니다.\n\n\"정직한 프로님, 저희가 이번 프로젝트에 꼭 참여하고 싶습니다. 공정한 경쟁이겠지만... 혹시 어떤 부분을 중점적으로 준비하면 좋을지 조언해주실 수 있나요?\"\n\n이는 공정한 입찰 과정에 영향을 줄 수 있는 상황입니다.",
    choices: [
      {
        text: "음... 기술적 역량을 좀 더 강조하시면 좋을 것 같아요.",
        nextScenario: "chapter2_situation2",
        points: -1
      },
      {
        text: "죄송하지만 입찰 과정의 공정성을 위해 구체적인 조언은 드릴 수 없습니다.",
        nextScenario: "chapter2_situation2",
        points: 2
      },
      {
        text: "공개된 입찰 공고문을 참고하시면 모든 정보가 있습니다.",
        nextScenario: "chapter2_situation2",
        points: 3
      }
    ]
  },

  chapter2_situation2: {
    id: "chapter2_situation2",
    title: "입찰 평가 과정",
    background: backgrounds.conferenceRoom,
    character: characters.manager,
    text: "입찰 평가 회의에서 박 그룹장이 특정 업체를 강력히 추천합니다.\n\n\"이 업체는 우리와 오래 거래해온 곳이야. 신뢰할 수 있고, 가격도 합리적이야. 다른 업체들은 검증이 안 되어 있어서 리스크가 있을 것 같은데?\"\n\n하지만 객관적 평가 기준으로는 다른 업체가 더 우수합니다.",
    choices: [
      {
        text: "그룹장님 말씀이 맞습니다. 신뢰할 수 있는 업체가 좋겠네요.",
        nextScenario: "chapter2_situation3",
        points: -1
      },
      {
        text: "평가 기준에 따라 객관적으로 판단해야 할 것 같습니다.",
        nextScenario: "chapter2_situation3",
        points: 3
      },
      {
        text: "두 업체 모두 장단점이 있으니 추가 검토가 필요합니다.",
        nextScenario: "chapter2_situation3",
        points: 1
      }
    ]
  },

  chapter2_situation3: {
    id: "chapter2_situation3",
    title: "최종 업체 선정",
    background: backgrounds.office,
    character: characters.colleague,
    text: "이로운 프로가 조용히 다가와서 말합니다.\n\n\"정직한 프로, 들리는 얘기로는 A업체 대표가 그룹장님과 개인적으로 친한 사이래. 그래서 그룹장님이 A업체를 밀고 있는 것 같아. 어떻게 생각해?\"\n\n이런 정보를 알게 된 상황에서 어떻게 하시겠습니까?",
    choices: [
      {
        text: "그런 개인적 관계는 업무와 별개입니다.",
        nextScenario: "chapter2_end",
        points: 1
      },
      {
        text: "투명한 절차를 위해 이해관계를 공개해야 합니다.",
        nextScenario: "chapter2_end",
        points: 3
      },
      {
        text: "일단 조용히 넘어가는 게 좋겠어요.",
        nextScenario: "chapter2_end",
        points: -1
      }
    ]
  },

  chapter2_end: {
    id: "chapter2_end",
    title: "업체 선정 완료",
    background: backgrounds.office,
    character: characters.main,
    text: "업체 선정 과정이 완료되었습니다. 공정하고 투명한 절차가 중요합니다.",
    choices: [
      {
        text: "에피소드 1: 계약 검토 및 협상",
        nextScenario: "chapter1_situation",
        points: 0,
        color: "green"
      },
      {
        text: "에피소드 3: 선물 및 접대 정책",
        nextScenario: "chapter4_situation",
        points: 0,
        color: "orange"
      },
      {
        text: "에피소드 4: 직장 내 괴롭힘 대응",
        nextScenario: "episode1_situation",
        points: 0,
        color: "pink"
      },
      {
        text: "에피소드 5: 담합 및 부정청탁 방지",
        nextScenario: "episode2_situation",
        points: 0,
        color: "teal"
      },
      {
        text: "처음 메뉴 가기 및 총점 계산(누적 점수 RESET)",
        nextScenario: "final_score",
        points: 0,
        color: "gray"
      }
    ]
  },

  // 에피소드 3: 선물 및 접대 정책
  chapter4_situation: {
    id: "chapter4_situation",
    title: "에피소드 3: 선물 및 접대 정책",
    background: backgrounds.restaurant,
    character: characters.client,
    text: "프로젝트가 성공적으로 마무리된 후, 고객사에서 감사의 표시로 고급 레스토랑에서 식사를 대접하겠다고 합니다.\n\n\"정직한 프로님, 이번 프로젝트 정말 만족스러웠습니다. 작은 감사의 표시로 저희가 단골로 다니는 고급 레스토랑에서 식사 한번 하시죠. 가족분들도 함께 모시고 싶습니다.\"\n\n회사의 선물 및 접대 정책을 고려해야 하는 상황입니다.",
    choices: [
      {
        text: "단호한 거절: 회사 정책상 정중히 사양하겠습니다.",
        nextScenario: "chapter4_situation2",
        points: 3
      },
      {
        text: "간단한 식사 정도라면 괜찮을 것 같습니다.",
        nextScenario: "chapter4_situation2",
        points: 0
      },
      {
        text: "감사합니다. 기꺼이 참석하겠습니다.",
        nextScenario: "chapter4_situation2",
        points: -1
      }
    ]
  },

  chapter4_situation2: {
    id: "chapter4_situation2",
    title: "선물 제안",
    background: backgrounds.office,
    character: characters.client,
    text: "며칠 후 고객사에서 다시 연락이 옵니다.\n\n\"식사는 정중히 거절하셨지만, 그래도 감사의 마음을 표현하고 싶어서요. 작은 선물이라도 받아주시면 안 될까요? 명품 시계 하나 준비했는데...\"\n\n이번에는 직접적인 선물 제안입니다.",
    choices: [
      {
        text: "단호한 거절: 회사 정책상 받을 수 없습니다.",
        nextScenario: "chapter4_situation3",
        points: 3
      },
      {
        text: "그 정도 가치라면 좀 부담스럽네요.",
        nextScenario: "chapter4_situation3",
        points: 1
      },
      {
        text: "그렇게 정성스럽게 준비해주셨다면 받겠습니다.",
        nextScenario: "chapter4_situation3",
        points: -2
      }
    ]
  },

  chapter4_situation3: {
    id: "chapter4_situation3",
    title: "동료의 조언",
    background: backgrounds.hallway,
    character: characters.colleague,
    text: "이로운 프로가 복도에서 조용히 말합니다.\n\n\"정직한 프로, 너무 원칙적으로 굴면 고객사와 관계가 나빠질 수도 있어. 다른 회사들은 다 받는다던데... 우리만 너무 까다롭게 구는 거 아닐까?\"\n\n동료의 조언에 어떻게 반응하시겠습니까?",
    choices: [
      {
        text: "그래도 원칙은 지켜야죠. 장기적으로 더 좋을 거예요.",
        nextScenario: "chapter4_end",
        points: 3
      },
      {
        text: "고민이 되네요. 상황을 봐서 판단해야겠어요.",
        nextScenario: "chapter4_end",
        points: 0
      },
      {
        text: "맞는 말이에요. 너무 융통성 없게 굴었나 봐요.",
        nextScenario: "chapter4_end",
        points: -1
      }
    ]
  },

  chapter4_end: {
    id: "chapter4_end",
    title: "접대 정책 상황 완료",
    background: backgrounds.office,
    character: characters.main,
    text: "선물 및 접대 관련 상황이 마무리되었습니다. 명확한 원칙과 정책 준수가 중요합니다.",
    choices: [
      {
        text: "에피소드 1: 계약 검토 및 협상",
        nextScenario: "chapter1_situation",
        points: 0,
        color: "purple"
      },
      {
        text: "에피소드 2: 업체 선정 과정",
        nextScenario: "chapter2_situation",
        points: 0,
        color: "green"
      },
      {
        text: "에피소드 3: 정보 보안 관리",
        nextScenario: "chapter3_situation",
        points: 0,
        color: "teal"
      },
      {
        text: "에피소드 4: 직장 내 괴롭힘 대응",
        nextScenario: "episode1_situation",
        points: 0,
        color: "blue"
      },
      {
        text: "에피소드 5: 담합 및 부정청탁 방지",
        nextScenario: "episode2_situation",
        points: 0,
        color: "pink"
      },
      {
        text: "처음 메뉴 가기 및 총점 계산(누적 점수 RESET)",
        nextScenario: "final_score",
        points: 0,
        color: "gray"
      }
    ]
  },

  // 에피소드 4: 직장 내 괴롭힘
  episode1_situation: {
    id: "episode1_situation",
    title: "에피소드 4: 직장 내 괴롭힘",
    background: backgrounds.conferenceRoom,
    character: characters.manager,
    text: "프로젝트 리뷰 회의 중입니다. 박 그룹장이 신입사원 김신입에게 반복적으로 욕설을 하며 인격 모독을 하고 있습니다.\n\n\"김신입! 이것도 못해? 정말 쓸모없네. 이런 식으로 일할 거면 회사 그만둬!\" \n\n다른 팀원들도 불편해하지만 아무도 말하지 않습니다. 당신은 어떻게 하시겠습니까?",
    choices: [
      {
        text: "웃어넘기거나 침묵한다.",
        nextScenario: "episode1_situation2",
        points: -1
      },
      {
        text: "회의 후 피해자에게만 조용히 이야기한다.",
        nextScenario: "episode1_situation2",
        points: 1
      },
      {
        text: "즉시 제지하고 회의 주제로 돌린다.",
        nextScenario: "episode1_situation2",
        points: 3
      }
    ]
  },

  episode1_situation2: {
    id: "episode1_situation2",
    title: "과도한 업무 지시",
    background: backgrounds.office,
    character: characters.manager,
    text: "며칠 후, 박 그룹장이 김신입에게 직무 범위를 벗어난 과도한 업무를 지시합니다.\n\n\"김신입, 이 프로젝트 지연은 네 책임이야. 주말에도 나와서 다른 팀 일까지 처리해. 그리고 내 개인 업무도 좀 도와줘.\"\n\n명백히 부당한 지시입니다.",
    choices: [
      {
        text: "업무 범위를 명확히 하고 적절한 절차로 알린다.",
        nextScenario: "episode1_situation3",
        points: 3
      },
      {
        text: "아무 말도 하지 않는다.",
        nextScenario: "episode1_situation3",
        points: -1
      },
      {
        text: "대신 일을 처리해준다.",
        nextScenario: "episode1_situation3",
        points: 0
      }
    ]
  },

  episode1_situation3: {
    id: "episode1_situation3",
    title: "따돌림과 정보 차단",
    background: backgrounds.conferenceRoom,
    character: characters.colleague,
    text: "전체 회의에서 특정 직원이 의도적으로 제외되고, 중요한 회의 자료도 전달받지 못했습니다. 이로운 프로가 말합니다.\n\n\"최신입 프로가 또 전체 회의에 참석하지 못했네. 그리고 오늘 중요한 회의 자료도 못 받았다던데... 이건 좀 심한 것 같아.\"\n\n어떻게 대응하시겠습니까?",
    choices: [
      {
        text: "즉시 배제를 지적하고 필요한 정보를 전달한다.",
        nextScenario: "episode1_end",
        points: 3
      },
      {
        text: "무시한다.",
        nextScenario: "episode1_end",
        points: -1
      },
      {
        text: "농담조로만 언급한다.",
        nextScenario: "episode1_end",
        points: 0
      }
    ]
  },

  episode1_end: {
    id: "episode1_end",
    title: "직장 내 괴롭힘 대응 완료",
    background: backgrounds.office,
    character: characters.main,
    text: "직장 내 괴롭힘 상황이 해결되었습니다. 즉각적이고 공개적인 대응이 중요합니다.",
    choices: [
      {
        text: "에피소드 1: 계약 검토 및 협상",
        nextScenario: "chapter1_situation",
        points: 0,
        color: "orange"
      },
      {
        text: "에피소드 2: 업체 선정 과정",
        nextScenario: "chapter2_situation",
        points: 0,
        color: "teal"
      },
      {
        text: "에피소드 3: 정보 보안 관리",
        nextScenario: "chapter3_situation",
        points: 0,
        color: "blue"
      },
      {
        text: "에피소드 3: 선물 및 접대 정책",
        nextScenario: "chapter4_situation",
        points: 0,
        color: "purple"
      },
      {
        text: "에피소드 5: 담합 및 부정청탁 방지",
        nextScenario: "episode2_situation",
        points: 0,
        color: "green"
      },
      {
        text: "처음 메뉴 가기 및 총점 계산(누적 점수 RESET)",
        nextScenario: "final_score",
        points: 0,
        color: "gray"
      }
    ]
  },

  // 에피소드 5: 담합
  episode2_situation: {
    id: "episode2_situation",
    title: "에피소드 5: 담합과 부정청탁",
    background: backgrounds.restaurant,
    character: characters.supplier,
    text: "협력업체 정대표와 식사 자리에서 만났습니다. 대화 중 정대표가 조심스럽게 제안합니다.\n\n\"정직한 프로님, 다음 분기 입찰 자료를 미리 알려주시면... 저희가 고가 콘서트 티켓을 준비했는데 어떠세요? 가족분들과 함께 즐기실 수 있을 거예요.\"\n\n명백한 담합 제안입니다.",
    choices: [
      {
        text: "정중히 거절하고 공정 원칙을 재확인한다.",
        nextScenario: "episode2_situation2",
        points: 3
      },
      {
        text: "농담처럼 받아들이고 티켓을 받는다.",
        nextScenario: "episode2_situation2",
        points: -2
      },
      {
        text: "생각해 보겠다고 한다.",
        nextScenario: "episode2_situation2",
        points: 0
      }
    ]
  },

  episode2_situation2: {
    id: "episode2_situation2",
    title: "동료의 압박",
    background: backgrounds.office,
    character: characters.colleague,
    text: "이로운 프로가 조용히 말합니다.\n\n\"정직한 프로, 다들 이 정도는 한다던데... 너무 원칙만 고집하면 우리만 손해 아닐까? 다른 팀들은 어떻게 하는지 알아?\"\n\n동료의 압박에 어떻게 대응하시겠습니까?",
    choices: [
      {
        text: "제안을 기록하고 절차에 따라 보고한다.",
        nextScenario: "episode2_situation3",
        points: 3
      },
      {
        text: "그냥 넘어가고 공급업체와만 이야기한다.",
        nextScenario: "episode2_situation3",
        points: -1
      },
      {
        text: "비공식 경고만 준다.",
        nextScenario: "episode2_situation3",
        points: 0
      }
    ]
  },

  episode2_situation3: {
    id: "episode2_situation3",
    title: "평판 공격",
    background: backgrounds.hallway,
    character: characters.supplier,
    text: "며칠 후 정대표가 다른 직원들에게 \"정직한 프로는 협조적이지 않다\"는 소문을 퍼뜨리고 있다는 소식을 듣습니다.\n\n복도에서 정대표와 마주쳤을 때 어떻게 대응하시겠습니까?",
    choices: [
      {
        text: "문서화 후 상부에 보고한다.",
        nextScenario: "episode2_end",
        points: 3
      },
      {
        text: "무시한다.",
        nextScenario: "episode2_end",
        points: 0
      },
      {
        text: "공급업체에 직접 전화해 해명한다.",
        nextScenario: "episode2_end",
        points: -1
      }
    ]
  },

  episode2_end: {
    id: "episode2_end",
    title: "담합 방지 상황 완료",
    background: backgrounds.office,
    character: characters.main,
    text: "담합 및 부정청탁 상황이 해결되었습니다. 초기 거절과 공식 절차 대응이 중요합니다.",
    choices: [
      {
        text: "에피소드 1: 계약 검토 및 협상",
        nextScenario: "chapter1_situation",
        points: 0,
        color: "pink"
      },
      {
        text: "에피소드 2: 업체 선정 과정",
        nextScenario: "chapter2_situation",
        points: 0,
        color: "purple"
      },
      {
        text: "에피소드 3: 정보 보안 관리",
        nextScenario: "chapter3_situation",
        points: 0,
        color: "green"
      },
      {
        text: "에피소드 3: 선물 및 접대 정책",
        nextScenario: "chapter4_situation",
        points: 0,
        color: "teal"
      },
      {
        text: "에피소드 4: 직장 내 괴롭힘 대응",
        nextScenario: "episode1_situation",
        points: 0,
        color: "orange"
      },
      {
        text: "처음 메뉴 가기 및 총점 계산(누적 점수 RESET)",
        nextScenario: "final_score",
        points: 0,
        color: "gray"
      }
    ]
  },

  // 최종 점수 화면
  final_score: {
    id: "final_score",
    title: "최종 점수",
    background: backgrounds.office,
    character: characters.main,
    text: "컴플라이언스 시뮬레이터를 플레이해주셔서 감사합니다!\n\n실무에서 마주할 수 있는 다양한 컴플라이언스 상황들을 경험해보셨습니다. 올바른 판단과 원칙적인 대응이 건전한 조직문화를 만드는 첫걸음입니다.",
    choices: [
      {
        text: "다시 플레이하기",
        nextScenario: "intro",
        points: 0
      }
    ]
  },

  // 게임 종료 (기존 ending 유지)
  ending: {
    id: "ending",
    title: "게임 완료",
    background: backgrounds.office,
    character: characters.main,
    text: "컴플라이언스 시뮬레이터를 플레이해주셔서 감사합니다!\n\n실무에서 마주할 수 있는 다양한 컴플라이언스 상황들을 경험해보셨습니다. 올바른 판단과 원칙적인 대응이 건전한 조직문화를 만드는 첫걸음입니다.",
    choices: [
      {
        text: "다시 플레이하기",
        nextScenario: "intro",
        points: 0
      }
    ]
  }
};



// 유틸리티 함수들
export const getScenario = (scenarioId) => {
  return gameScenarios[scenarioId] || gameScenarios.intro;
};

export const calculateFinalScore = (totalPoints) => {
  if (totalPoints >= 18) return { grade: 'A+', message: '완벽한 컴플라이언스 전문가!' };
  if (totalPoints >= 15) return { grade: 'A', message: '우수한 컴플라이언스 역량!' };
  if (totalPoints >= 12) return { grade: 'B+', message: '양호한 컴플라이언스 이해!' };
  if (totalPoints >= 9) return { grade: 'B', message: '기본적인 컴플라이언스 지식!' };
  if (totalPoints >= 6) return { grade: 'C+', message: '추가 학습이 필요합니다.' };
  if (totalPoints >= 3) return { grade: 'C', message: '컴플라이언스 교육을 받으세요.' };
  return { grade: 'D', message: '즉시 컴플라이언스 교육이 필요합니다!' };
};

