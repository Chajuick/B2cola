// KSIC 코드
const ksicCode = [
    { id: 1, code: "C", name: "제조업" },
    { id: 2, code: "C1", name: "기계·부품 제조" },
    { id: 3, code: "C2", name: "전자·전기 기기 제조" },
    { id: 4, code: "C3", name: "자동차·운송장비 제조" },
    { id: 5, code: "C4", name: "금속·철강·비철금속 가공" },
    { id: 6, code: "C5", name: "화학·플라스틱·고무" },
    { id: 7, code: "C6", name: "식품·음료 제조" },
    { id: 8, code: "C7", name: "건축자재 제조" },

    { id: 20, code: "J", name: "IT 서비스" },
    { id: 21, code: "P", name: "교육 서비스" },
    { id: 22, code: "Q", name: "의료·복지 서비스" },
    { id: 23, code: "M", name: "디자인·컨설팅·전문서비스" },
    { id: 24, code: "R", name: "문화·여가·엔터테인먼트" },

    { id: 30, code: "G", name: "도매/소매업" },
    { id: 31, code: "H", name: "물류·운송업" },

    { id: 40, code: "F", name: "건설업" },
    { id: 41, code: "L", name: "부동산업" },

    { id: 50, code: "O", name: "공공기관" },
    { id: 51, code: "Q2", name: "사회복지/비영리단체" },
    { id: 52, code: "S", name: "협회/조합/NGO" },

    { id: 60, code: "D", name: "에너지 공급" },
    { id: 61, code: "E", name: "수도·하수·폐기물 처리 및 재활용" }
];

// 1차 대분류 (MainCategory)
const mainCategory = [
    { id: 1, name: "제조업" },
    { id: 2, name: "서비스업" },
    { id: 3, name: "유통·물류" },
    { id: 4, name: "건설·부동산" },
    { id: 5, name: "공공·비영리" },
    { id: 6, name: "에너지·환경" }
];

// 2차 소분류 (SubCategory)
const subsCategory = [
    { id: 101, main_id: 1, name: "기계·부품 제조" },
    { id: 102, main_id: 1, name: "전자·전기 기기 제조" },
    { id: 103, main_id: 1, name: "자동차·운송장비 제조" },
    { id: 104, main_id: 1, name: "금속·철강·비철금속 가공" },
    { id: 105, main_id: 1, name: "화학·플라스틱·고무" },
    { id: 106, main_id: 1, name: "식품·음료 제조" },
    { id: 107, main_id: 1, name: "건축자재 제조" },

    { id: 201, main_id: 2, name: "IT 서비스" },
    { id: 202, main_id: 2, name: "교육 서비스" },
    { id: 203, main_id: 2, name: "의료·복지 서비스" },
    { id: 204, main_id: 2, name: "디자인·컨설팅·전문서비스" },
    { id: 205, main_id: 2, name: "문화·여가·엔터테인먼트" },

    { id: 301, main_id: 3, name: "도매/소매업" },
    { id: 302, main_id: 3, name: "물류·운송업" },

    { id: 401, main_id: 4, name: "건설업" },
    { id: 402, main_id: 4, name: "부동산업" },

    { id: 501, main_id: 5, name: "공공기관" },
    { id: 502, main_id: 5, name: "사회복지/비영리단체" },
    { id: 503, main_id: 5, name: "협회/조합/NGO" },

    { id: 601, main_id: 6, name: "에너지 공급" },
    { id: 602, main_id: 6, name: "수도·하수·폐기물 처리 및 재활용" }
];

// 1차 대분류 ↔ KSIC 매핑
const mainKsicMapping = [
    { main_id: 1, ksic_id: 1 },
    { main_id: 2, ksic_id: 20 },
    { main_id: 2, ksic_id: 21 },
    { main_id: 2, ksic_id: 22 },
    { main_id: 2, ksic_id: 23 },
    { main_id: 2, ksic_id: 24 },
    { main_id: 3, ksic_id: 30 },
    { main_id: 3, ksic_id: 31 },
    { main_id: 4, ksic_id: 40 },
    { main_id: 4, ksic_id: 41 },
    { main_id: 5, ksic_id: 50 },
    { main_id: 5, ksic_id: 51 },
    { main_id: 5, ksic_id: 52 },
    { main_id: 6, ksic_id: 60 },
    { main_id: 6, ksic_id: 61 }
];

// 2차 소분류 ↔ KSIC 매핑
const subKsicMapping = [
    { sub_id: 101, ksic_id: 2 },
    { sub_id: 102, ksic_id: 3 },
    { sub_id: 103, ksic_id: 4 },
    { sub_id: 104, ksic_id: 5 },
    { sub_id: 105, ksic_id: 6 },
    { sub_id: 106, ksic_id: 7 },
    { sub_id: 107, ksic_id: 8 },

    { sub_id: 201, ksic_id: 20 },
    { sub_id: 202, ksic_id: 21 },
    { sub_id: 203, ksic_id: 22 },
    { sub_id: 204, ksic_id: 23 },
    { sub_id: 205, ksic_id: 24 },

    { sub_id: 301, ksic_id: 30 },
    { sub_id: 302, ksic_id: 31 },

    { sub_id: 401, ksic_id: 40 },
    { sub_id: 402, ksic_id: 41 },

    { sub_id: 501, ksic_id: 50 },
    { sub_id: 502, ksic_id: 51 },
    { sub_id: 503, ksic_id: 52 },

    { sub_id: 601, ksic_id: 60 },
    { sub_id: 602, ksic_id: 61 }
];