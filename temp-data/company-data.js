const company = [
  {
    id: 1, name: "ESG 경영합동조합dddddddddddd", website: "", detail: "ESG 경영 관련 협업과 프로젝트를 진행하는 조합입니다.", image: "esg4u.png",
    region: "gyeongnam", popularity: 82, cooperating: true, done: 7, membership: 2
  },

  {
    id: 2, name: "한진 시스템", website: "http://han-jin.com/", detail: "LS산전 특약점으로, 전력량계와 원격검침 시스템을 전문 취급하는 기업입니다.", image: "hanjin.png",
    region: "gyeonggi", popularity: 76, cooperating: false, done: 12, membership: 1
  },

  {
    id: 3, name: "마산 노인 일자리 창출 지원센터", website: "http://www.masansj.com/", detail: "지역사회 어르신들을 위한 일자리 창출과 지원 프로그램을 운영합니다.", image: "masansj.png",
    region: "gyeongnam", popularity: 61, cooperating: true, done: 5, membership: 0
  },

  {
    id: 4, name: "마산천막사업", website: "", detail: "천막 및 행사장 설치 관련 서비스를 제공하는 기업입니다.", image: "masantent.png",
    region: "gyeongnam", popularity: 54, cooperating: false, done: 3, membership: 0
  },

  {
    id: 5, name: "마산 시니어클럽", website: "", detail: "어르신 대상 문화, 교육, 취업 지원 프로그램을 운영합니다.", image: "mssenior.png",
    region: "gyeongnam", popularity: 68, cooperating: true, done: 9, membership: 1
  },

  {
    id: 6, name: "셈즈", website: "", detail: "산업용 전자 부품과 장비를 공급하는 기업입니다.", image: "sems.png",
    region: "gyeongbuk", popularity: 47, cooperating: false, done: 2, membership: 0
  },

  {
    id: 7, name: "성도건설", website: "", detail: "주거 및 상업용 건축 프로젝트를 전문으로 수행하는 건설사입니다.", image: "sungdo.jpg",
    region: "gyeongnam", popularity: 73, cooperating: true, done: 11, membership: 2
  },

  {
    id: 8, name: "창원도시재생지원센터", website: "", detail: "도시재생 프로젝트와 커뮤니티 활성화를 지원합니다.", image: "cwurc.png",
    region: "gyeongnam", popularity: 65, cooperating: true, done: 6, membership: 1
  },

  {
    id: 9, name: "삼영엠아이텍", website: "", detail: "기계 자동화 및 산업용 솔루션을 제공하는 기업입니다.", image: "symit.png",
    region: "gyeongbuk", popularity: 59, cooperating: false, done: 4, membership: 0
  },

  {
    id: 10, name: "로지템", website: "", detail: "물류 및 창고 관리 시스템을 전문으로 제공합니다.", image: "logitem.jpg",
    region: "gyeonggi", popularity: 80, cooperating: true, done: 13, membership: 2
  },

  {
    id: 11, name: "김밥1번지", website: "", detail: "프랜차이즈 식음료 업체로, 다양한 김밥 메뉴를 제공합니다.", image: "gimbap1.png",
    region: "gyeongnam", popularity: 71, cooperating: false, done: 1, membership: 0
  },

  {
    id: 12, name: "한국머신툴스", website: "", detail: "산업용 기계와 공작기계 솔루션을 공급하는 기업입니다.", image: "hanmachine.png",
    region: "gyeongbuk", popularity: 74, cooperating: true, done: 8, membership: 1
  },

  {
    id: 13, name: "매직토이", website: "", detail: "완구 및 교육용 장난감을 제조 및 유통합니다.", image: "magictoy.png",
    region: "gyeonggi", popularity: 56, cooperating: false, done: 3, membership: 0
  },

  {
    id: 14, name: "상도TDS", website: "", detail: "산업용 부품 및 솔루션을 제공하는 기술 전문 기업입니다.", image: "sangdotds.jpg",
    region: "gyeongnam", popularity: 69, cooperating: false, done: 5, membership: 1
  },

  {
    id: 15, name: "에스택이앤티", website: "", detail: "IT 및 엔지니어링 서비스 제공, 산업용 솔루션 개발.", image: "stechent.jpg",
    region: "gyeonggi", popularity: 83, cooperating: true, done: 10, membership: 2
  },

  {
    id: 16, name: "대흥기공", website: "", detail: "산업용 장비와 기계 설계, 제작을 전문으로 합니다.", image: "dh-group.jpg",
    region: "gyeongbuk", popularity: 62, cooperating: false, done: 4, membership: 0
  },

  {
    id: 17, name: "누리하임", website: "", detail: "건축 자재 및 주거 솔루션을 제공하는 기업입니다.", image: "nuriheim.jpg",
    region: "gyeongnam", popularity: 66, cooperating: true, done: 7, membership: 1
  },

  {
    id: 18, name: "MIK21", website: "", detail: "산업용 기계와 자동화 설비를 공급합니다.", image: "mik21.jpg",
    region: "gyeongbuk", popularity: 60, cooperating: false, done: 3, membership: 0
  },

  {
    id: 19, name: "카템", website: "", detail: "전자 및 기계 부품 전문 기업입니다.", image: "katem.png",
    region: "gyeongnam", popularity: 78, cooperating: true, done: 9, membership: 2
  },

  {
    id: 20, name: "고려철강", website: "", detail: "철강 제품의 생산 및 유통을 담당하는 기업입니다.", image: "goryesteel.png",
    region: "gyeongbuk", popularity: 72, cooperating: false, done: 6, membership: 1
  }
];


const companySubMapping = [
  { company_id: 1, sub_id: 503 },
  { company_id: 2, sub_id: 102 },
  { company_id: 3, sub_id: 203 },
  { company_id: 4, sub_id: 401 },
  { company_id: 5, sub_id: 502 },
  { company_id: 6, sub_id: 601 },
  { company_id: 7, sub_id: 401 },
  { company_id: 8, sub_id: 501 },
  { company_id: 9, sub_id: 101 },
  { company_id: 10, sub_id: 302 },
  { company_id: 11, sub_id: 306 },
  { company_id: 12, sub_id: 101 },
  { company_id: 13, sub_id: 106 },
  { company_id: 14, sub_id: 101 },
  { company_id: 15, sub_id: 201 },
  { company_id: 16, sub_id: 101 },
  { company_id: 17, sub_id: 401 },
  { company_id: 18, sub_id: 101 },
  { company_id: 19, sub_id: 101 },
  { company_id: 20, sub_id: 104 }
];