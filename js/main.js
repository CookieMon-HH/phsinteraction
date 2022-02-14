
(() => {

    let yOffset = 0; //window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
    let currentScene = 0; //현재 활성화 된 씬 (scroll-section)
    let enterNewScene = false; //새로운 scene이 시작된 순간 true

    const sceneInfo = [
        {
            //0
            type: 'sticky', //스크롤에 따른 인터렉션 여부로 type 구분
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-0'), //각 부분을 할당하기 위함
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages:[]
            },
            values: {
                videoImageCount: 300,
                imageSequence: [0,299],
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        {
            //1
            type: 'normal',
            // heightNum: 5,  //type normal에서는 필요 없음 (컨텐츠의 크기에 맞춰 적용)
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'), 
                content: document.querySelector('#scroll-section-1 .description')
            } 
        },
        {
            //2
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin')
            },
            values: {
            messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
            messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
            messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
            messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
            messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
            messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
            messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
            messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
            messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
            messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
            messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
            messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
            pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
            pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
            pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
            pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
            pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
            }
        },
        {
            //3
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption')
            } 
        },

    ];
    
    function setCanvasImages(){
        let imgElem;
        for(let i=0; i < sceneInfo[0].values.videoImageCount; i++){
            imgElem = new Image();  //document.createElement('img')도 가능
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }
    }
    setCanvasImages();

    function setLayout() {
        //각 스크룔 섹션의 높이 세팅
        for (let i=0; i<sceneInfo.length; i++) {
            if (sceneInfo[i].type ==='sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
                sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
            }else if (sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
            
            //html파일 section에 style="height: ##px;" 추가하면 해당 section의 높이가 됨 
            //js파일에서 query selector를 통해 section을 가져오고 style method를 통해 수정 가능
        }

        //setLayout 할 때 마다 currentScene도 설정해줌
        yOffset = window.pageYOffset;
        
        let totalScrollHeight = 0;
        for(let i =0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }

        } 
    }

    function calcValues (values, currentYOffset) {
        let rv;
        //현재 씬에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        
        if (values.length == 3) {
            //start~end 사이의 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd-partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1]-values[0]) + values[0]; 
            }else if (currentYOffset < partScrollStart){
                rv = values[0];
            }else if (currentYOffset > partScrollEnd){
                rv = values[1];
            }
        }else{ 
            rv = scrollRatio * (values[1]-values[0]) + values[0];
        }
        return rv
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        // console.log(currentScene,currentYOffset,scrollHeight,scrollRatio);

        switch(currentScene) {
            case 0:
                // console.log('0 play');
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence],0,0);

                if(scrollRatio <= 0.22) {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                    //1방향 움직임이지만 translate3d가 하드웨어 가속이 보장이 되서 사용
                } else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if(scrollRatio <= 0.42) {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }

                if(scrollRatio <= 0.62) {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
                
                if(scrollRatio <= 0.82) {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }

                break;

            case 2:
                // console.log('2 play');
                if (scrollRatio <= 0.25) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.57) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
    
                if (scrollRatio <= 0.83) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
                break;
            case 3:
                // console.log('3 play');
                break;
        }
    }

    function scrollLoop() {
        //현재 scene을 0으로 시작하고 스크롤할 때 마다 scene 변경 조건을 확인해서 증가시키거나 감소시키는듯 
        //아래서 새로고침해도 스크롤 하면 조건에 들어오니까 바로 찾을 수 있는듯 (setLayout에 세팅 없었을때)
        //현재 화면의 상단과 해당 section이 만나는 경우가 전환시점
        enterNewScene = false;
        prevScrollHeight = 0;
        for(let i = 0; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene ++;
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
        //(아래 방향으로 스크롤)현재 y 위치가 이전 scene들의 높이+지금 secen의 높이보다 커지면 증가  

        if(yOffset < prevScrollHeight){
            enterNewScene = true;
            if (currentScene==0) return; //브라우저 바운스 효과로 인해 yoffset이 -가 되는 경우가 있어 scene이 음수가 되는것을 방지
            currentScene --; 
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
        //(위 방향으로 스크롤) 현재 y 위치가 이전 scene들의 높이보다 작아지면 감소
        
        if(enterNewScene == true)  return; 
        //장면이 전환되는 시점에는 palyanimation을 실행하지 않도록 처리

        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop()
    });
    
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
    
})();
// 스크롤 영역을 배열로 지정
// 함수를 선언하고 바로 호출
// 함수 밖에 선언한 변수들은 전역변수, 다른 파일에서 접근 가능하기 때문에 함수안에 지역변수로 선언


//2022.2.6 참고 사항 : 고화질 비디오 부드럽게 처리하기 
// 고화질의 영상을 그대로 사용하면 완전 버벅임, 아래 3가지 방법 설명 

// <영상으로 하는 방법> 
// 1. 영상를 가져옴 
// 2. 스크롤 비율에 따라 video duration의 시간을 지정
//  (requestAnimationFrame -> current time에 현재 재생 시간 넣기)

// <이미지로 하는 방법> 
// 영상에서 프레임을 쪼개서 이미지로 만들어서 사용 
// 1. 이미지를 가져옴 (전부 로드) 
// 2. 스크롤 비율에 따라 노출 사진 no.를 지정 

// 동영상 프레임 추출 검색 ㄱㄱ

// <캔버스에 그리는 방법> 
// <참고 : 캔버스 객체 기본>
// 캔버스 객체 가져옴(query selector) -> getcontext호출하여 context 객체 가져오기 -> 컨텐스트 객체를 이용해서 그림

// 기본적으로는 이미지로 하는 방법과 절차는 유사
// 이미지방식은 src 속성을 변경, 이번엔 컨텍스트 객체의 drawImage method를 통해 캔버스에 그려줌\
//drawImages(이미지,x,y) 이용하여 그려줌

