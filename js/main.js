(() => {
    
    let yOffset = 0; //window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0;//현재 스크롤 위치보다 위쪽 스크롤 섹션들의 높이값 합
    let currentScene = 0;//현재 활성화된 씬(scroll-section)
    let enterNewScene = false; //새로운 씬이 시작되는 순간

    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5,   //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-1 .main-message.b'),
                messageC: document.querySelector('#scroll-section-2 .main-message.c'),
                messageD: document.querySelector('#scroll-section-3 .main-message.d')
            },
            values: {
                messageA_opacity: [0, 1]
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
        }
    ];

    function setLayout() {
        //각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        console.log(sceneInfo);

        yOffset = window.pageYOffset;

        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function calcValues(values, currentYOffset) {
        let rv;
        //console.log(values);
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        //console.log(scrollRatio);
        rv = scrollRatio * ((values[1] - values[0]) + values[0] );
        console.log(rv);
        return rv;
    }

    //스크롤 애니메이션
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        //console.log(currentScene, currentYOffset);

        switch (currentScene) {
            case 0:
                //console.log('0 play');
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                //console.log(values.messageA_opacity);
                objs.messageA.style.opacity = messageA_opacity_in;
                break;
            case 1:
                    //console.log('1 play');
                break;
            case 2:
                    //console.log('2 play');
                break;
            case 3:
                    //console.log('3 play');
                break;

        }
    }

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        //console.log(currentScene);
        if (enterNewScene) return;
        
        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        //console.log(yOffset);
        scrollLoop();
    });
    //window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
    //setLayout();

})();