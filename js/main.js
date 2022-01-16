
(() => {

    let yOffset = 0; //window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
    let currentScene = 0; //현재 활성화 된 씬 (scroll-section)

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
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                messageA_opacity: [0,1]
            }
        },
        {
            //1
            type: 'normal',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1') 
            } 
        },
        {
            //2
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2') 
            }  
        },
        {
            //3
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-3') 
            } 
        },

    ];

    function setLayout() {
        //각 스크룔 섹션의 높이 세팅
        for (let i=0; i<sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
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

    function playAnimation(){
        switch(currentScene) {
            case 0:
                // console.log('0 play');
                break;
            case 1:
                // console.log('1 play');
                break;
            case 2:
                // console.log('2 play');
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
        prevScrollHeight = 0;
        for(let i = 0; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene ++;
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
        //(아래 방향으로 스크롤)현재 y 위치가 이전 scene들의 높이+지금 secen의 높이보다 커지면 증가  

        if(yOffset < prevScrollHeight){
            if (currentScene==0) return; //브라우저 바운스 효과로 인해 yoffset이 -가 되는 경우가 있어 scene이 음수가 되는것을 방지
            currentScene --; 
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
        //(위 방향으로 스크롤) 현재 y 위치가 이전 scene들의 높이보다 작아지면 감소
        
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