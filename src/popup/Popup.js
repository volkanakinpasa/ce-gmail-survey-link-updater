import React, { useEffect, useState } from 'react';
import storageUtil from '../utils/storageUtil';
import logUtils from '../utils/logUtils';

import './app.css';

const Popup = () => {
  const [tagName, setTagName] = useState(null);
  const [message, setMessage] = useState(null);

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const save = async () => {
    try {
      await storageUtil.setTagName(tagName);
      showMessage('Saved!');
    } catch (error) {
      logUtils.consoleLog({ error });
      showMessage('Error! Right click here=> "inspect"=> console');
    }
  };

  useEffect(async () => {
    try {
      const tName = await storageUtil.getTagName();
      setTagName(tName);
    } catch (error) {
      logUtils.consoleLog({ error });
      showMessage('Error! Right click here=> "inspect"=> console');
    }
  }, []);

  // const startContent = () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, { type: 'start' });
  //   });
  // };
  return (
    <>
      <div>
        <fieldset>
          <legend>Options</legend>
          <div className='pb-10'>
            <div>Tag Name</div>
            <div>
              <input
                value={tagName ? tagName : ''}
                onChange={(e) => {
                  setTagName(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <div>
              <button
                onClick={(e) => {
                  save();
                }}
              >
                Save
              </button>
              {message && <span>{message}</span>}
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default Popup;
