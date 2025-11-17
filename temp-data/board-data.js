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
        category: "partner",
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
        category: "partner",
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
        category: "partner",
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
        category: "partner",
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
        category: "partner",
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
