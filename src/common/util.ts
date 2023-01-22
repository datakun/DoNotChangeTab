import $ from 'jquery';

export class Util {
  static t(message: string): string {
    return chrome.i18n.getMessage(message) ?? message;
  }

  static getForYouElement() {
    const lang = $('html').attr('lang');
    // 기본적으로 'For You', 'Following' 을 찾는다.
    let nameForYou = 'For You';
    if (lang === 'ko') {
      // html 의 lang 속성이 ko 이면 '추천', '팔로우 중' 을 찾는다.
      nameForYou = '추천';
    } else if (lang === 'ja') {
      // html 의 lang 속성의 ja 이면 'おすすめ', 'フォロー中' 을 찾는다.
      nameForYou = 'おすすめ';
    }

    // span 내용이 nameForYou 인 것을 찾는다.
    const $spanForYou = $(`span:contains('${nameForYou}')`);
    // 위에서 찾은 span 위 가장 가까운 a 태그를 찾는다.
    const $aForYou = $spanForYou.closest('a');

    return $aForYou;
  }

  static getFollowingElement() {
    const lang = $('html').attr('lang');
    // 기본적으로 'For You', 'Following' 을 찾는다.
    let nameFollowing = 'Following';
    if (lang === 'ko') {
      // html 의 lang 속성이 ko 이면 '추천', '팔로우 중' 을 찾는다.
      nameFollowing = '팔로우 중';
    } else if (lang === 'ja') {
      // html 의 lang 속성의 ja 이면 'おすすめ', 'フォロー中' 을 찾는다.
      nameFollowing = 'フォロー中';
    }

    // span 내용이 nameFollowing 인 것을 찾는다.
    const spanFollowing = $(`span:contains('${nameFollowing}')`);
    // 위에서 찾은 span 위 가장 가까운 a 태그를 찾는다.
    const $aFollowing = spanFollowing.closest('a');

    return $aFollowing;
  }
}
