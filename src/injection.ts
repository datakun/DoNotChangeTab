import { OpenWith } from './common/enum';
import { OptionsType } from './common/types';
import { Util } from './common/util';

async function handleTabClick(openWith: OpenWith.ForYou | OpenWith.Following) {
  // 설정값 변경
  let { options } = (await chrome.storage.sync.get('options')) as OptionsType;
  if (!options) {
    // 저장된 값이 없으면 초기값 설정
    options = {
      remember: true,
      lastOpened: OpenWith.ForYou,
    };
  }

  options.lastOpened = openWith;

  await chrome.storage.sync.set({ options });
}

function injectionMain() {
  chrome.runtime.onMessage.addListener((request) => {
    // console.log('injection', request);
    if (request.action === 'tabsUpdate') {
      // 버튼 생성 시간을 위해 기다린다.
      setTimeout(async () => {
        // storage 에서 설정값을 가져온다.
        let { options } = (await chrome.storage.sync.get('options')) as OptionsType;
        if (!options) {
          // 저장된 값이 없으면 초기값 설정
          options = {
            remember: true,
            lastOpened: OpenWith.ForYou,
          };

          await chrome.storage.sync.set({ options });
        }

        const $aForYou = Util.getForYouElement();
        const $aFollowing = Util.getFollowingElement();

        // 추천 / 팔로우 중 버튼 이벤트 등록
        $aForYou.on('click', () => {
          handleTabClick(OpenWith.ForYou);
        });
        $aFollowing.on('click', () => {
          handleTabClick(OpenWith.Following);
        });

        if (options.remember === true) {
          // 적절한 화면 열기
          const isForYouOpened = $aForYou.attr('aria-selected') === 'true';
          if (isForYouOpened) {
            // 만약 지금 추천 탭이 열려 있는 경우, 마지막으로 열었던 탭이 팔로우 중 탭인 경우, 팔로우 중 탭을 열어준다.
            if (options.lastOpened === OpenWith.Following) {
              $aFollowing[0]?.click();
            }
          } else {
            // 추천 탭이 열려 있지 않은 경우, 마지막으로 열었던 탭이 추천 탭인 경우, 추천 탭을 열어준다.
            if (options.lastOpened === OpenWith.ForYou) {
              $aForYou[0]?.click();
            }
          }
        }
      }, 1000);
    }
  });
}

injectionMain();
