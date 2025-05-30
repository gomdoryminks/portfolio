window.onload = function() {
    //브라우저 체크
    const userAgent = navigator.userAgent.toLowerCase();

    //모바일에서 100vh 오류 해결방법
    const setHeightVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setHeightVh();

    //ios(아이폰, 아이패드, 아이팟) 전용 css 적용
    if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1 || userAgent.indexOf("ipod") > -1) {
        let cssIosLink = document.createElement("link");
        cssIosLink.href = "../css/2025/style-ios.css";
        cssIosLink.async = false;
        cssIosLink.rel = "stylesheet";
        cssIosLink.type = "text/css";
        document.head.appendChild(cssIosLink);
    }

    //리사이즈시
    window.addEventListener('resize', function() {
        setHeightVh();
    });

    //컨텐츠 영역내 스크롤시
    // const scrollObjs = document.querySelectorAll(".aljam__inner-fix .aljam__page, .aljam__box");
    // Array.from(scrollObjs).forEach((scrollObj) => {
    //     scrollObj.addEventListener('scroll', function() {
    //         if (scrollObj.scrollTop === 0) {
    //             scrollObj.style.overscrollBehaviorY = 'auto';
    //         } else {
    //             scrollObj.style.overscrollBehaviorY = 'none';
    //         }
    //     });
    // });

    //리스트 검색 swiper 슬라이드
    const searchListObjs = document.querySelectorAll(".aljam__searchlist");
    Array.from(searchListObjs).forEach((searchListObj) => {
        new Swiper(searchListObj, {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 6,
            autoHeight: true,
            watchOverflow: true,
        });
    });

    //첨부사진 swiper 슬라이드
    const fileListObjs = document.querySelectorAll(".aljam__file-list");
    Array.from(fileListObjs).forEach((fileListObj) => {
        new Swiper(fileListObj, {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 10,
            autoHeight: true,
            watchOverflow: true,
        });
    });

    //최근 검색어 swiper 슬라이드
    const recentSearchListObjs = document.querySelectorAll(".aljam__search-recent .aljam__search-list");
    Array.from(recentSearchListObjs).forEach((recentSearchListObj) => {
        new Swiper(recentSearchListObj, {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 10,
            autoHeight: true,
            watchOverflow: true,
        });
    });

    //텍스트 크기 설정
    const textObjs = document.querySelectorAll("input[type='text'], textarea");
    Array.from(textObjs).forEach((textObj) => {
        const textId = textObj.id;
        const textSizeObj = document.querySelector(`.aljam__text-size[data-text-id='${textId}']`);
        if (textSizeObj) {
            textObj.addEventListener('input', () => {
                // const byteLength = new TextEncoder().encode(textObj.value).length;
                const byteLength = textObj.value.length;
                textSizeObj.querySelector(".text-size").textContent = byteLength;
            });
        }
    });

    //탭버튼 선택시 연결된 패널 영역이 노출되도록 설정
    const tabBtns = document.querySelectorAll(".aljam__tablist>.aljam__tab");
    const tabPanels = document.querySelectorAll(".aljam__panel");
    Array.from(tabBtns).forEach((tabBtn, idx) => {
        const tabPanelId = tabBtn.getAttribute('aria-controls');
        if (tabPanelId) {
            tabBtn.addEventListener('click', () => {
                Array.from(tabBtns).forEach((tabBtn2) => {
                    tabBtn2.setAttribute('aria-selected', false);
                });
                Array.from(tabPanels).forEach((tabPanel) => {
                    tabPanel.classList.remove('on');
                });
                tabBtn.setAttribute('aria-selected', true);
                document.getElementById(tabPanelId)?.classList.add("on");
                document.querySelector(".aljam__box")?.scrollTo(0, 0);
            });
            if (idx == 0) {
                tabBtn.click();
            }
        }
    });

    //첨부사진 추가하기
    const fileObjs = document.querySelectorAll(".aljam__filebox .aljam__file");
    Array.from(fileObjs).forEach((fileObj) => {
        const boxObj = fileObj.closest(".aljam__filebox");
        fileObj.addEventListener('change', (e) => {
            const dataFileName = fileObj.dataset.fileName;
            const cloneFileObj = fileObj.cloneNode(true);
            const addFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e2) {
                const liObj = document.createElement('li');
                if (dataFileName) {
                    cloneFileObj.setAttribute('name', `${dataFileName}[]`);
                }
                liObj.classList.add("swiper-slide");
                liObj.append(cloneFileObj);
                liObj.insertAdjacentHTML('beforeend', `<div class="aljam__file-img" style="background-image: url('${e2.target.result}');"></div>`);
                liObj.insertAdjacentHTML('beforeend', `<button type="button" class="aljam__btn-delete2" onclick="deleteFile(this);"><span class="blind">첨부사진 삭제</span></button>`);
                boxObj.querySelector(".aljam__file-list>ul")?.append(liObj);
            }
            reader.readAsDataURL(addFile);
            if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (userAgent.indexOf("msie") != -1)) {
                //브라우저가 ie일 경우
                fileObj.replaceWith(fileObj.cloneNode(true));
            } else {
                //브라우저가 ie가 아닐 경우
                fileObj.value = "";
            }
        });
    });

    //댓글과 답글 입력시 폼 높이 설정
    const textareaObjs = document.querySelectorAll(".aljam__commentform textarea, .aljam__replyform textarea");
    Array.from(textareaObjs).forEach((textareaObj) => {
        setTextareaHeight(textareaObj);
    });

    //수정하기 버튼 + 답글쓰기 버튼 + 댓글 폼 + 답글 폼 외의 영역 클릭시 댓글 폼 + 답글 폼 닫기
    document.addEventListener('click', (e) => {
        const modifyBtnObjs = document.querySelectorAll(".aljam__comment-info .aljam__btn-modify");
        const replyBtnObjs = document.querySelectorAll(".aljam__comment-info .aljam__btn-reply");
        const commentObjs = document.querySelectorAll(".aljam__comment-info .aljam__commentform");
        const replyObjs = document.querySelectorAll(".aljam__comment-info .aljam__replyform");
        let closeFlag = true;
        Array.from(modifyBtnObjs).forEach((modifyBtnObj) => {
            if (modifyBtnObj.contains(e.target)) {
                closeFlag = false;
            }
        });
        Array.from(replyBtnObjs).forEach((replyBtnObj) => {
            if (replyBtnObj.contains(e.target)) {
                closeFlag = false;
            }
        });
        Array.from(commentObjs).forEach((commentObj) => {
            if (commentObj.contains(e.target)) {
                closeFlag = false;
            }
        });
        Array.from(replyObjs).forEach((replyObj) => {
            if (replyObj.contains(e.target)) {
                closeFlag = false;
            }
        });
        if (closeFlag) {
            closeComment();
        }
    });
}

//첨부사진 삭제하기
function deleteFile(obj) {
    const liObj = obj.closest("li");
    liObj?.remove();
}

//textarea 입력시 폼 높이 설정
function setTextareaHeight(obj) {
    obj.addEventListener('input', () => {
        obj.style.height = 'auto';
        obj.style.height = `${obj.scrollHeight}px`;
    });
}

//댓글 폼 열기
function openComment(obj, idx='') {
    closeComment();
    const infoObj = obj.closest(".aljam__comment-info");
    if (infoObj) {
        if (idx > 0) {
            //댓글을 수정할 경우
            const btnUlObj = obj.closest("ul");
            const descObj = infoObj.querySelector(".aljam__info-desc");
            const descInfoObj = descObj?.closest(".aljam__comment-info");
            const modifyObj = descInfoObj?.querySelector(".aljam__commentform[data-comment-idx]");
            if (!modifyObj) {
                const formObj = document.createElement('div');
                formObj.classList.add("aljam__commentform");
                formObj.setAttribute('data-comment-idx', idx);

                //댓글 폼 안에 내용을 수정해야 하는 경우 아래 html에서 수정
                formObj.innerHTML = `
                    <form id="" name="" method="" action="">
                        <label>
                            <span class="sr-only">댓글 수정</span>
                            <textarea id="" name="" rows="1">${"첫 낮잠을 10시 전이면 두시간 재워도 된다고 하셨는데 10시 전에 잠이들면 두 시간 낮잠을 재워도 된다는 걸까요? 평소에 솔루션을 주셨을 땐 기상 시간이 늦춰졌었는데 최근에 당겨졌었어요 ㅜㅜ ."}</textarea>
                        </label>
                        <button type="button" class="aljam__btn-txt" onclick="modifyComment(this, ${idx});">
                            <span>수정</span>
                        </button>
                    </form>
                `;
                
                descObj?.after(formObj);
                setTextareaHeight(formObj.querySelector("textarea"));
            }
            descInfoObj?.classList.add("modify-on");
            btnUlObj?.classList.remove("on");
        }
    }
}

//댓글 등록하기
function addComment(obj) {
    const listObj = document.querySelector(".aljam__comment-list");
    if (listObj) {
        const boxObj = document.querySelector(".aljam__box");
        const commentObj = obj.closest(".aljam__commentform");
        const textareaObj = commentObj?.querySelector("textarea");
        const formObj = document.createElement('li');

        //댓글 폼 안에 내용을 수정해야 하는 경우 아래 html에서 수정
        formObj.innerHTML = `
            <div class="aljam__comment-info">
                <div class="aljam__comment-info-item">
                    <span class="aljam__info-picture"><img src="${"../assets/images/2025/img-detail-02.png"}" alt="사용자 계정 이미지"></span>
                    <span class="aljam__info-id">${"반짝반짝 작은별"}</span>
                    <span class="tag-date">${"125일"}</span>
                    <span class="aljam__info-time">${"10분 전"}</span>
                    <div class="aljam__info-more">
                        <button type="button" class="aljam__btn-more" onclick="toggleCommentBtn(this);">
                            <span class="blind">더보기</span>
                        </button>
                        <ul class="aljam__layer-more" role="dialog" aria-modal="true">
                            <li>
                                <button type="button" class="aljam__btn-txt" onclick="">
                                    <span>신고하기</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="aljam__btn-txt" onclick="">
                                    <span>차단하기</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="aljam__btn-txt aljam__btn-modify" onclick="openComment(this, ${3});">
                                    <span>수정하기</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="aljam__btn-txt" onclick="">
                                    <span>삭제하기</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="aljam__comment-info-item">
                    <div class="aljam__info-desc">${"ADD! 첫 낮잠을 10시 전이면 두시간 재워도 된다고 하셨는데 10시 전에 잠이들면 두 시간 낮잠을 재워도 된다는 걸까요? 평소에 솔루션을 주셨을 땐 기상 시간이 늦춰졌었는데 최근에 당겨졌었어요 ㅜㅜ ."}</div>
                </div>
                <div class="aljam__comment-info-item">
                    <div class="aljam__info-etc">
                        <button type="button" class="aljam__btn-txt aljam__btn-reply" onclick="openReply(this);">
                            <span>답글쓰기</span>
                        </button>
                    </div>
                    <div class="aljam__info-etc">
                        <button type="button" class="aljam__btn-txt" onclick="">
                            <span>공감</span>
                            <span class="sympathy-cnt">0</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        listObj.append(formObj);

        if (textareaObj) {
            textareaObj.value = "";
            textareaObj.style.height = 'auto';
            textareaObj.style.height = `${textareaObj.scrollHeight}px`;
            if (boxObj) {
                boxObj.scrollTo(0, boxObj.scrollHeight);
            }
        }
    }
}

//댓글 수정하기
function modifyComment(obj, idx) {
    if (idx > 0) {
        const infoObj = obj.closest(".aljam__comment-info");
        if (infoObj) {
            const descObj = infoObj.querySelector(".aljam__info-desc");
            if (descObj) {
                //수정된 댓글 내용 업데이트
                let descHtml = `NEW! 첫 낮잠을 10시 전이면 두시간 재워도 된다고 하셨는데 10시 전에 잠이들면 두 시간 낮잠을 재워도 된다는 걸까요? 평소에 솔루션을 주셨을 땐 기상 시간이 늦춰졌었는데 최근에 당겨졌었어요 ㅜㅜ .`;
                descObj.innerHTML = descHtml;
            }
            obj.remove();
            infoObj.classList.remove("modify-on");
        }
    }
}

//답글 폼 열기
function openReply(obj, idx='') {
    closeComment();
    const infoObj = obj.closest(".aljam__comment-info");
    if (infoObj) {
        if (idx > 0) {
            //답글을 수정할 경우
            const btnUlObj = obj.closest("ul");
            const descObj = infoObj.querySelector(".aljam__info-desc");
            const descInfoObj = descObj?.closest(".aljam__comment-info");
            const modifyObj = descInfoObj?.querySelector(".aljam__replyform[data-reply-idx]");
            if (!modifyObj) {
                const formObj = document.createElement('div');
                formObj.classList.add("aljam__replyform");
                formObj.setAttribute('data-reply-idx', idx);
    
                //답글 폼 안에 내용을 수정해야 하는 경우 아래 html에서 수정
                formObj.innerHTML = `
                    <form id="" name="" method="" action="">
                        <label>
                            <span class="sr-only">답글 수정</span>
                            <textarea id="" name="" rows="1">${"첫 낮잠을 10시 전이면 두시간 재워도 된다고 하셨는데 10시 전에 잠이들면 두 시간 낮잠을 재워도 된다는 걸까요?"}</textarea>
                        </label>
                        <button type="button" class="aljam__btn-txt" onclick="modifyReply(this, ${idx});">
                            <span>수정</span>
                        </button>
                    </form>
                `;
                
                descObj?.after(formObj);
                setTextareaHeight(formObj.querySelector("textarea"));
            }
            descInfoObj?.classList.add("modify-on");
            btnUlObj?.classList.remove("on");
        } else {
            //답글을 등록할 경우
            toggleCommentBtn();
            const liObj = infoObj.closest("li");
            const formObj = document.createElement('div');
            formObj.classList.add("aljam__comment-info");
    
            //답글 폼 안에 내용을 수정해야 하는 경우 아래 html에서 수정
            formObj.innerHTML = `
                <div class="aljam__comment-info-item">
                    <div class="aljam__replyform">
                        <form id="" name="" method="" action="">
                            <label>
                                <span class="sr-only">답글 등록</span>
                                <textarea id="" name="" rows="1"></textarea>
                            </label>
                            <button type="button" class="aljam__btn-txt" onclick="addReply(this);">
                                <span>등록</span>
                            </button>
                        </form>
                    </div>
                </div>
            `;
            
            infoObj.after(formObj);
            liObj?.classList.add("reply-on");
            setTextareaHeight(formObj.querySelector("textarea"));
        }
    }
}

//답글 등록하기
function addReply(obj) {
    const infoObj = obj.closest(".aljam__comment-info");
    if (infoObj) {
        const liObj = infoObj.closest("li");
        const formObj = document.createElement('div');
        formObj.classList.add("aljam__comment-info");

        //답글 폼 안에 내용을 수정해야 하는 경우 아래 html에서 수정
        formObj.innerHTML = `
            <div class="aljam__comment-info-item">
                <span class="aljam__info-picture"><img src="${"../assets/images/2025/img-detail-03.png"}" alt="사용자 계정 이미지"></span>
                <span class="aljam__info-id">${"둥이맘"}</span>
                <span class="tag-date">${"125일"}</span>
                <span class="aljam__info-time">${"5분 전"}</span>
                <div class="aljam__info-more">
                    <button type="button" class="aljam__btn-more" onclick="toggleCommentBtn(this);">
                        <span class="blind">더보기</span>
                    </button>
                    <ul class="aljam__layer-more" role="dialog" aria-modal="true">
                        <li>
                            <button type="button" class="aljam__btn-txt" onclick="">
                                <span>신고하기</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="aljam__btn-txt" onclick="">
                                <span>차단하기</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="aljam__btn-txt aljam__btn-modify" onclick="openReply(this, ${3});">
                                <span>수정하기</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="aljam__btn-txt" onclick="">
                                <span>삭제하기</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="aljam__comment-info-item">
                <div class="aljam__info-desc">${"ADD! 첫 낮잠을 10시 전이면 두시간 재워도 된다고 하셨는데 10시 전에 잠이들면 두 시간 낮잠을 재워도 된다는 걸까요?"}</div>
            </div>
        `;
        liObj?.append(formObj);

        obj.remove();
        liObj?.classList.remove("reply-on");
    }
}

//답글 수정하기
function modifyReply(obj, idx) {
    if (idx > 0) {
        const infoObj = obj.closest(".aljam__comment-info");
        if (infoObj) {
            const descObj = infoObj.querySelector(".aljam__info-desc");
            if (descObj) {
                //수정된 답글 내용 업데이트
                let descHtml = `NEW! 첫 낮잠을 10시 전이면 두시간 재워도 된다고 하셨는데 10시 전에 잠이들면 두 시간 낮잠을 재워도 된다는 걸까요?`;
                descObj.innerHTML = descHtml;
            }
            obj.remove();
            infoObj.classList.remove("modify-on");
        }
    }
}

//댓글과 답글 폼 닫기
function closeComment() {
    const commentObjs = document.querySelectorAll(".aljam__comment-info .aljam__commentform");
    const replyObjs = document.querySelectorAll(".aljam__comment-info .aljam__replyform");
    Array.from(commentObjs).forEach((commentObj) => {
        const dataCommentIdx = commentObj.dataset.commentIdx;
        const infoObj = commentObj.closest(".aljam__comment-info");
        if (infoObj) {
            if (dataCommentIdx > 0) {
                commentObj.remove();
                infoObj.classList.remove("modify-on");
            }
        }
    });
    Array.from(replyObjs).forEach((replyObj) => {
        const dataReplyIdx = replyObj.dataset.replyIdx;
        const infoObj = replyObj.closest(".aljam__comment-info");
        if (infoObj) {
            if (dataReplyIdx > 0) {
                replyObj.remove();
                infoObj.classList.remove("modify-on");
            } else {
                const liObj = infoObj.closest("li");
                infoObj.remove();
                liObj?.classList.remove("reply-on");
            }
        }
    });
}

//댓글과 답글 더보기 레이어 팝업 열기&닫기
function toggleCommentBtn(obj=null) {
    const btnObjs = document.querySelectorAll(".aljam__comment-info .aljam__info-more .aljam__btn-more");
    Array.from(btnObjs).forEach((btnObj) => {
        const infoObj = btnObj.closest(".aljam__info-more");
        const layerObj = infoObj?.querySelector(".aljam__layer-more");
        if (layerObj) {
            if (btnObj == obj) {
                if (layerObj.classList.contains("on")) {
                    layerObj.classList.remove("on");
                } else {
                    layerObj.classList.add("on");
                }
            } else {
                layerObj.classList.remove("on");
            }
        }
    });
}

/* 20250525 수정사항 Start */
//닉네임 수정창 열기&닫기
function toggleProfileBtn(obj) {
    const profileTxtObj = obj.closest(".aljam__profile-txt");
    const profileFormObj = profileTxtObj?.querySelector(".aljam__profile-form");
    if (profileFormObj) {
        if (profileFormObj.classList.contains("on")) {
            profileFormObj.classList.remove("on");
        } else {
            profileFormObj.classList.add("on");
        }
    }
}
/* // 20250525 수정사항 End */

//레이어 팝업 열기
function openLayer(layerId) {
    const layerObj = document.getElementById(`${layerId}`);
    if (layerObj) {
        layerObj.classList.add("on");
        document.body.style.overflow = 'hidden';
    }
}

//레이어 팝업 닫기
function closeLayer(obj) {
    const layerObj = obj.closest('.aljam__layer');
    if (layerObj) {
        layerObj.classList.remove("on");
        document.body.style.overflow = '';
    }
}
