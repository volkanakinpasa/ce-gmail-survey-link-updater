import { STORAGE } from './contants';
const { TAG_NAME } = STORAGE;

const getStorage = async (key) =>
  new Promise((resolve) => {
    chrome.storage.sync.get([key], (data) => {
      resolve(data[key]);
    });
  });

const setStorage = (key, value) => {
  new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      resolve();
    });
  });
};

const getTagName = async () => {
  const config = await getStorage(TAG_NAME);
  if (config) {
    return config;
  }
  return null;
};
const setTagName = async (tagName) => {
  await setStorage(TAG_NAME, tagName);
};

const storageUtil = {
  getTagName,
  setTagName,
};

export default storageUtil;
