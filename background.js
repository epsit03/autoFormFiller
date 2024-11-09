chrome.runtime.onInstalled.addListener(() => {
    console.log("AutoFill Extension Installed.");
  });
  
  // Injects content script to active tabs when needed
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  });
  