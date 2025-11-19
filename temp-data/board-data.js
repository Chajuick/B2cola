/**
     * noticeBoard
     * 기업 협업 제안/요청 게시판 임시 데이터 구조
     *
     * 필드 설명
     * ----------
     id: "",               // 게시글 고유 ID
    companyId: "",        // 작성한 회사 또는 소속 기업 ID
    category: "",         // 게시글 분류 (협업제안 / 협업요청 등)
    title: "",            // 제목
    content: "",          // 본문 내용 (텍스트 또는 HTML)
    createdAt: "",        // 작성일
    validFrom: "",        // 게시물 유효 시작일
    validTo: "",          // 게시물 유효 종료일
    tags: [],             // 검색용 태그 목록
    views: 0,             // 조회수
    isActive: true        // 활성화 여부
    files: ""             // 첨부 파일 ID
 */

const matchingBoard = [
    {
        id: 1,
        companyId: 1,
        category: "proposal",
        title: "전력량계 데이터 분석 기반 협업 제안",
        content: "전력량계 데이터를 활용한 모니터링 시스템 공동 개발 제안을 드립니다.",
        createdAt: "2025-01-03",
        validFrom: "2025-01-03",
        validTo: "2025-02-10",
        tags: ["전력량계", "데이터", "모니터링"],
        views: 32,
        isActive: true,
        files: ""
    },
    {
        id: 2,
        companyId: 3,
        category: "request",
        title: "산업용 자동화 설비 설계 협력 요청",
        content: "맞춤형 자동화 설비 개발을 위한 협력 업체를 모집합니다.",
        createdAt: "2025-01-05",
        validFrom: "2025-01-05",
        validTo: "2025-03-15",
        tags: ["자동화", "설비", "기계"],
        views: 15,
        isActive: true,
        files: ""
    },
    {
        id: 3,
        companyId: 14,
        category: "proposal",
        title: "학산·산학연계 교육 프로그램 공동 운영 제안",
        content: "실습 중심 교육과정 개발을 위한 산학 협력을 제안드립니다.",
        createdAt: "2025-01-08",
        validFrom: "2025-01-08",
        validTo: "2025-02-28",
        tags: ["교육", "산학협력"],
        views: 21,
        isActive: true,
        files: ""
    },
    {
        id: 4,
        companyId: 9,
        category: "request",
        title: "산업용 포장재 신소재 개발을 위한 협업 요청",
        content: "경량 신소재 공동 연구 및 테스트 협업을 요청드립니다.",
        createdAt: "2025-01-11",
        validFrom: "2025-01-11",
        validTo: "2025-04-01",
        tags: ["포장재", "신소재"],
        views: 11,
        isActive: true,
        files: ""
    },
    {
        id: 5,
        companyId: 13,
        category: "proposal",
        title: "브랜딩 및 UI/UX 디자인 지원 제안",
        content: "기업 브랜드 강화와 서비스 UI/UX 개선을 위한 디자인 솔루션을 제공합니다.",
        createdAt: "2025-01-12",
        validFrom: "2025-01-12",
        validTo: "2025-02-20",
        tags: ["디자인", "브랜딩"],
        views: 27,
        isActive: true,
        files: ""
    },
    {
        id: 6,
        companyId: 5,
        category: "request",
        title: "산업 장비 유지보수 분야 협력 업체 모집",
        content: "정기 점검 및 시설 유지보수를 위한 협력 파트너를 찾습니다.",
        createdAt: "2025-01-13",
        validFrom: "2025-01-13",
        validTo: "2025-03-01",
        tags: ["유지보수", "설비"],
        views: 9,
        isActive: true,
        files: ""
    },
    {
        id: 7,
        companyId: 12,
        category: "proposal",
        title: "에너지 관리 플랫폼 기술 교류 제안",
        content: "에너지 소비 최적화 및 분석 기술 교류 협업을 제안드립니다.",
        createdAt: "2025-01-15",
        validFrom: "2025-01-15",
        validTo: "2025-02-28",
        tags: ["에너지", "관리"],
        views: 18,
        isActive: true,
        files: ""
    },
    {
        id: 8,
        companyId: 7,
        category: "request",
        title: "자동화 장비 제어 소프트웨어 개발 협력",
        content: "장비 제어용 소프트웨어 개발이 가능한 업체와 협업을 희망합니다.",
        createdAt: "2025-01-17",
        validFrom: "2025-01-17",
        validTo: "2025-04-15",
        tags: ["자동화", "소프트웨어"],
        views: 14,
        isActive: true,
        files: ""
    },
    {
        id: 9,
        companyId: 11,
        category: "proposal",
        title: "목재 가공 공정 개선 위한 협업 제안",
        content: "목재 건조 및 가공 공정 개선을 위한 기술 협력을 제안드립니다.",
        createdAt: "2025-01-18",
        validFrom: "2025-01-18",
        validTo: "2025-03-05",
        tags: ["목재", "가공"],
        views: 7,
        isActive: true,
        files: ""
    },
    {
        id: 10,
        companyId: 10,
        category: "request",
        title: "전기·통신 설비 프로젝트 협력 업체 모집",
        content: "대형 전기·통신 공사 수주 준비를 위한 협력사를 찾습니다.",
        createdAt: "2025-01-20",
        validFrom: "2025-01-20",
        validTo: "2025-03-30",
        tags: ["전기", "통신"],
        views: 12,
        isActive: false,
        files: ""
    }
];


/**
     * noticeBoard
     * B2콜라 서비스의 공지 및 소식 게시판 데이터 구조
     *
     * 필드 설명
     * ----------
     id: "",              // 게시물 고유 ID
    category: "",         // 분류 (공지 / 시스템 / 업데이트 / 이벤트 등)
    title: "",            // 게시물 제목
    content: "",          // 게시물 본문 내용 (HTML or Text)
    thumbnail: "",        // 목록에서 사용할 썸네일 이미지 경로
    isPinned: false,      // 상단 고정 여부
    authorId: "",         // 작성자 ID
    createdAt: "",        // 작성일 (작성 시각 포함)
    startDate: "",        // 게시물 유효 시작일
    endDate: "",          // 게시물 유효 종료일
    isActive: true,       // 활성화 여부
    tags: [],             // 검색용 태그 리스트
    files: ""             // 첨부 파일 ID
 */

const noticeBoard = [
    {
        id: "POST-001",
        category: "notice",
        title: "서버 점검 안내 (01/15)",
        content: "안정적인 서비스 제공을 위해 1월 15일 새벽 서버 점검을 진행합니다.",
        thumbnail: "/thumb/system_01.png",
        isPinned: true,
        authorId: "admin001",
        createdAt: "2025-01-10 09:00:00",
        startDate: "2025-01-10",
        endDate: "2025-01-16",
        isActive: true,
        tags: ["서버", "점검", "시스템"],
        files: ""
    },
    {
        id: "POST-002",
        category: "notice",
        title: "서비스 정책 변경 안내",
        content: "2025년 2월부터 일부 정책이 변경됩니다.",
        thumbnail: "",
        isPinned: true,
        authorId: "admin002",
        createdAt: "2025-01-08 14:30:00",
        startDate: "2025-01-08",
        endDate: "2025-02-28",
        isActive: true,
        tags: ["정책", "공지"],
        files: ["/files/policy_2025.pdf"]
    },
    {
        id: "POST-003",
        category: "update",
        title: "신규 기능 '스마트 검색' 출시",
        content: "검색 정확도를 개선한 스마트 검색 기능이 베타로 제공됩니다.",
        thumbnail: "/thumb/update_search.png",
        isPinned: false,
        authorId: "dev001",
        createdAt: "2025-01-12 11:00:00",
        startDate: "2025-01-12",
        endDate: "2025-03-01",
        isActive: true,
        tags: ["업데이트", "검색", "베타"],
        files: ""
    },
    {
        id: "POST-004",
        category: "event",
        title: "새해 로그인 보상 이벤트",
        content: "로그인만 해도 특별 보상을 드립니다!",
        thumbnail: "/thumb/event_newyear.png",
        isPinned: false,
        authorId: "event001",
        createdAt: "2025-01-05 10:00:00",
        startDate: "2025-01-05",
        endDate: "2025-01-25",
        isActive: true,
        tags: ["이벤트", "새해"],
        files: ""
    },
    {
        id: "POST-005",
        category: "notice",
        title: "설 연휴 고객센터 운영 안내",
        content: "설 연휴 기간 동안 고객센터 운영 시간이 제한됩니다.",
        thumbnail: "",
        isPinned: false,
        authorId: "admin003",
        createdAt: "2025-01-09 09:30:00",
        startDate: "2025-01-09",
        endDate: "2025-01-20",
        isActive: true,
        tags: ["설날", "공지", "고객센터"],
        files: ""
    },
    {
        id: "POST-006",
        category: "notice",
        title: "로그인 오류 해결 안내",
        content: "일부 사용자에게 발생했던 로그인 오류가 해결되었습니다.",
        thumbnail: "/thumb/system_fix.png",
        isPinned: false,
        authorId: "dev002",
        createdAt: "2025-01-11 15:00:00",
        startDate: "2025-01-11",
        endDate: "2025-02-01",
        isActive: true,
        tags: ["시스템", "로그인", "오류"],
        files: ""
    },
    {
        id: "POST-007",
        category: "update",
        title: "모바일 앱 2.3 업데이트 안내",
        content: "UI 개선 및 여러 오류를 수정했습니다.",
        thumbnail: "",
        isPinned: false,
        authorId: "dev003",
        createdAt: "2025-01-13 12:00:00",
        startDate: "2025-01-13",
        endDate: "2025-03-05",
        isActive: true,
        tags: ["앱", "업데이트", "UI"],
        files: ["/files/app_v23_release.pdf"]
    },
    {
        id: "POST-008",
        category: "event",
        title: "신규 회원 할인 이벤트",
        content: "신규 회원에게 첫 결제 할인 이벤트를 제공합니다.",
        thumbnail: "/thumb/event_discount.png",
        isPinned: false,
        authorId: "event002",
        createdAt: "2025-01-03 08:00:00",
        startDate: "2025-01-03",
        endDate: "2025-01-31",
        isActive: true,
        tags: ["이벤트", "할인", "신규회원"],
        files: ""
    },
    {
        id: "POST-009",
        category: "notice",
        title: "보안 정책 강화 안내",
        content: "2단계 인증이 필수로 전환됩니다.",
        thumbnail: "/thumb/security.png",
        isPinned: false,
        authorId: "admin004",
        createdAt: "2025-01-04 16:00:00",
        startDate: "2025-01-04",
        endDate: "2025-04-01",
        isActive: true,
        tags: ["보안", "공지"],
        files: ""
    },
];


const currentSearchData = [
  "협업", "홍보", "포트폴리오", "인증", "정책", "정부지원", "사업신청", "파트너십",
  "공동개발", "기술이전", "공동프로젝트", "지원사업", "입찰", "제휴문의", "견적요청",
  "보안솔루션", "클라우드", "데이터", "스마트공장", "설비점검", "UI디자인",
  "브랜딩", "SNS홍보", "인력파견", "해외수출", "물류대행", "OEM", "ODM",
  "위탁생산", "전자계약", "정산", "전력관리", "에너지효율", "품질검사",
  "공정개선", "부품조달", "자재관리", "R&D지원", "성과보고", "기업인증",
  "특허", "기술문서", "견적서", "기업소개서", "문자발송", "영업리스트",
  "스펙시트", "프로세스개선"
];

const popularSearchData = [
  // 제조·산업
  "보안", "디자인", "설비", "데이터", "분석", "기반", "IT", "전력", "에너지", "관리",
  "목재", "금형", "사출", "3D프린팅", "금속가공", "가공기술", "절삭", "CNC", "용접",
  "절곡", "도장", "파이프", "스테인리스", "알루미늄", "자동화설비", "PLC제어",
  "센서", "모터", "컨베이어", "유압장치", "공압장치", "전기제어", "수배전반", "냉각설비",
  "포장기계", "레이저절단", "플라스틱", "압출", "회로설계", "PCB", "전자부품",
  "충전기", "배터리", "태양광", "ESS", "철강", "건축자재", "산업안전", "공장자동화",
  "스마트제조", "로봇팔", "AGV", "FA솔루션", "모듈제조", "냉동창고", "냉난방설비",
  "HVAC", "발전기", "전선", "부품조달", "공구", "볼트너트", "유지보수", "정비",
  "기계설계", "설계용역", "OEM제조", "ODM제조", "위탁생산", "계측장비", "측정기",
  "품질검사", "표면처리", "열처리", "도금", "탄소소재", "복합소재", "세라믹",
  "윤활유", "화학약품", "산업용가스", "방폭설비",

  // IT · 소프트웨어
  "AI", "머신러닝", "딥러닝", "OCR", "영상분석", "음성인식", "챗봇", "보안솔루션",
  "네트워크", "서버", "클라우드", "AWS", "Azure", "백업", "DR센터", "가상화",
  "ERP", "MES", "CRM", "SCM", "WMS", "POS", "전자계약", "전자세금계산서",
  "SaaS", "API", "앱개발", "웹개발", "UI/UX", "프론트엔드", "백엔드",
  "데이터레이크", "BI", "빅데이터", "스마트팩토리",

  // 물류·유통
  "물류", "택배", "배송대행", "3PL", "창고임대", "항공화물", "해상운송",
  "포워딩", "수출", "수입", "통관", "포장재", "라벨링", "팔레트", "컨테이너",
  "재고관리", "구매대행", "원자재", "밴더관리",

  // B2B 서비스·컨설팅
  "브랜딩", "마케팅", "SNS광고", "홍보대행", "기업컨설팅", "세무기장", "회계",
  "노무관리", "법률자문", "특허출원", "기술이전", "ISO인증", "기업진단",
  "IR자료", "기업소개서", "행사대행", "교육컨설팅", "B2B영업", "영업대행",
  "리크루팅", "문자발송", "콜센터", "해외시장조사", "바이어발굴",

  // 정부지원·정책
  "정책자금", "중소기업지원", "기술개발사업", "바우처", "R&D지원", "스마트공장고도화",
  "수출바우처", "고용창출장려금", "근로자지원", "로봇보급사업", "정부인증",
  "벤처확인", "메인비즈", "이노비즈", "ESG", "탄소감축",

  // 환경·에너지
  "친환경", "탄소중립", "폐기물처리", "재활용", "집진설비", "수질관리", "공기정화",
  "환경컨설팅", "대기측정", "에너지진단", "전력효율", "LED조명", "열교환기",
  "연료전지", "풍력", "수소", "배출권", "스마트그리드", "ESS관리", "에너지관리시스템"
];
