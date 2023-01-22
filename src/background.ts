async function backgroundMain(): Promise<void> {
  // 탭이 업데이트 되면 할 일 등록
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // console.log('onUpdated', tabId, changeInfo, tab);
    if (changeInfo.status === 'complete') {
      if (tab.url === 'https://twitter.com' || tab.url === 'https://twitter.com/home') {
        chrome.tabs.sendMessage(tabId, { action: 'tabsUpdate', tab: tab });
      }
    }
  });
}

backgroundMain();
