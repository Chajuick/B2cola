(function () {
    const form = document.getElementById('partnershipForm');
    const submitBtn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');
    const fileInput = document.getElementById('fileInput');
    const fileDropzone = document.getElementById('fileDropzone');
    const fileList = document.getElementById('fileList');

    let uploadedFiles = []; // 업로드 파일 저장

    const fileIcons = {
        'pdf': 'fas fa-file-pdf',
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'ppt': 'fas fa-file-powerpoint',
        'pptx': 'fas fa-file-powerpoint',
        'zip': 'fas fa-file-archive',
        'default': 'fas fa-file'
    };

    // 파일 리스트 렌더링
    function renderFiles() {
        fileList.innerHTML = '';
        uploadedFiles.forEach((file, index) => {
            const ext = file.name.split('.').pop().toLowerCase();
            const iconClass = fileIcons[ext] || fileIcons['default'];
            const li = document.createElement('li');
            li.innerHTML = `
                <i class="${iconClass}"></i>
                ${file.name} (${ext.toUpperCase()}, ${Math.round(file.size / 1024)} KB)
                <button type="button" class="partnership-form__file-remove" data-index="${index}">&times;</button>
            `;
            fileList.appendChild(li);
        });
    }

    // 파일 추가
    function addFiles(files) {
        uploadedFiles = uploadedFiles.concat(Array.from(files));
        renderFiles();
    }

    // 파일 선택
    fileInput.addEventListener('change', () => addFiles(fileInput.files));

    // 파일 삭제
    fileList.addEventListener('click', (e) => {
        if (e.target.classList.contains('partnership-form__file-remove')) {
            const index = e.target.getAttribute('data-index');
            uploadedFiles.splice(index, 1);
            renderFiles();
        }
    });

    // 드래그 앤 드롭
    fileDropzone.addEventListener('click', () => fileInput.click());
    fileDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropzone.classList.add('dragover');
    });
    fileDropzone.addEventListener('dragleave', () => fileDropzone.classList.remove('dragover'));
    fileDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropzone.classList.remove('dragover');
        addFiles(e.dataTransfer.files);
    });

    // 폼 제출
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const requiredIds = ['name', 'email', 'type', 'subject', 'message'];
        for (const id of requiredIds) {
            const el = document.getElementById(id);
            if (!el || !el.value.trim()) {
                el && el.focus();
                status.innerHTML = '✖ 필수 항목을 모두 입력해 주세요.';
                status.style.color = '#c53030';
                return;
            }
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        for (const file of uploadedFiles) {
            if (file.size > maxSize) {
                status.innerHTML = '✖ 첨부파일은 최대 10MB까지 업로드 가능합니다.';
                status.style.color = '#c53030';
                return;
            }
        }

        // UX: 제출 상태 표시
        submitBtn.disabled = true;
        submitBtn.innerText = '제출 중...';
        status.innerHTML = '✔ 제안이 접수되었습니다. 곧 담당자가 연락드립니다.<br/>(제출 후 평균 응답 시간: 영업일 기준 3~5일)';
        status.style.color = '#16a34a';

        // 서버 전송 (fetch)
        // const formData = new FormData(form);
        // uploadedFiles.forEach(file => formData.append('files[]', file));
        // fetch(form.action, { method: 'POST', body: formData })
        //   .then(res => console.log(res))
        //   .catch(err => console.error(err));
    });

    // 실시간 버튼 활성화 / 비활성화
    function checkFormValidity() {
        submitBtn.disabled = !form.checkValidity();
    }
    form.addEventListener('input', checkFormValidity);
    form.addEventListener('change', checkFormValidity);
    checkFormValidity();
})();
