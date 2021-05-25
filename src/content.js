import './jquery';
import './inboxsdk';

import storageUtils from './utils/contentUtils';
import storageUtil from './utils/storageUtil';
import logUtils from './utils/logUtils';

const { updateQueryParameterInLinks } = storageUtils;

const getRecipients = (composeView) => {
  return Array.prototype.concat(composeView.getToRecipients());
};
const loadInboxSDK = () => {
  (InboxSDK || window.InboxSDK).load(2, 'sdk_VBVBVB_d5a6243996').then((sdk) => {
    sdk.Compose.registerComposeViewHandler(async (composeView) => {
      const tagName = await storageUtil.getTagName();

      composeView.on('presending', async (e) => {
        try {
          const listRecipients = getRecipients(composeView);
          if (!tagName || tagName.length === 0) {
            logUtils.consoleLog('No tag name found');
            return;
          }

          if (!listRecipients || listRecipients.length === 0) {
            logUtils.consoleLog('No recipients found');
            return;
          }

          const bodyElement = composeView.getBodyElement();
          const to = listRecipients[0];
          logUtils.consoleLog('updateQueryParameterInLinks oncesi');
          updateQueryParameterInLinks(bodyElement, tagName, to.emailAddress);
          logUtils.consoleLog('updateQueryParameterInLinks sonrasi');

          // if (hasSurvey() && tagName) {
          // } else {
          //   const confirmed = confirm(
          //     'You are using Survey Chrome Extension enabled and there is no tag name saved in the options. Are you sure you want to send this email without tracking this survey'
          //   );
          //   if (!confirmed) {
          //     avoidSending(e);
          //   }
          // }
        } catch (err) {
          logUtils.consoleLog(err);
          // const confirmed = confirm(
          //   'You are using Survey Chrome Extension enabled and there is no tag name saved in the options. Are you sure you want to send this email without tracking this survey'
          // );
          // if (!confirmed) {
          //   e.cancel();
          //   return;
          // }
        }
      });
    });
  });
};

const onLoad = () => {
  loadInboxSDK();
};

window.addEventListener('load', onLoad, false);
