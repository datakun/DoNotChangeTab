import $ from 'jquery';
import { OpenWith } from './common/enum';
import { OptionsType } from './common/types';

function localizeHtmlPage(elm: Element) {
  const messageRegex = /__MSG_(\w+)__/g;
  for (let i = 0; i < elm.children.length; i++) {
    localizeHtmlPage(elm.children[i]);
    if (elm.children[i].innerHTML.length) {
      elm.children[i].innerHTML = elm.children[i].innerHTML.replace(messageRegex, localizeString);
    }
  }
}

function localizeString(_: string, str: string) {
  return str ? chrome.i18n.getMessage(str) : '';
}

async function popupMain() {
  // 팝업 화면 구성

  // i18n 적용
  localizeHtmlPage(document.body);

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

  // 저장된 값에 따라서 팝업의 라디오 버튼을 체크한다.
  if (options.remember === true) {
    $('#yes').prop('checked', true);
  } else {
    $('#no').prop('checked', true);
  }

  // 라디오 버튼을 체크하면 설정값을 변경한다.
  $('input[class=radioOpenRecent]').on('change', async (e: JQuery.ChangeEvent) => {
    const $target = $(e.target);
    const value = $target.val() as string;
    if (value === 'yes') {
      options.remember = true;
    } else {
      options.remember = false;
    }

    await chrome.storage.sync.set({ options });
  });
}

popupMain();
