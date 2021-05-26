import './jquery';
import './inboxsdk';

import storageUtils from './utils/contentUtils';
import storageUtil from './utils/storageUtil';
import logUtils from './utils/logUtils';

const { getUpdatedTagNameInBody } = storageUtils;

const loadInboxSDK = () => {
  (InboxSDK || window.InboxSDK).load(2, 'sdk_VBVBVB_d5a6243996').then((sdk) => {
    sdk.Compose.registerComposeViewHandler(async (composeView) => {
      const tagName = await storageUtil.getTagName();
      let firstEmail = '';

      const getRecipients = (composeView) => {
        return Array.prototype.concat(composeView.getToRecipients());
      };

      const startReplaceTagName = async (tagName, composeView) => {
        if (!tagName || tagName.length === 0) {
          return;
        }

        const listRecipients = getRecipients(composeView);
        if (!listRecipients || listRecipients.length === 0) {
          firstEmail = '';
          return;
        }

        const to = listRecipients[0];
        if (to.emailAddress === firstEmail) {
          return;
        }

        firstEmail = to.emailAddress;

        const bodyElement = composeView.getBodyElement();
        const body = await getUpdatedTagNameInBody(
          $(bodyElement).html(),
          tagName,
          firstEmail
        );

        if (body) {
          composeView.setBodyHTML(body);
        }
      };

      const interval = setInterval(async () => {
        await startReplaceTagName(tagName, composeView);
      }, 3000);

      composeView.on('presending', async (e) => {
        try {
          await startReplaceTagName(tagName, composeView);
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
      composeView.on('discard', () => {
        clearInterval(interval);
      });

      composeView.on('destroy', () => {
        clearInterval(interval);
      });
    });
  });
};

const onLoad = () => {
  loadInboxSDK();
};

window.addEventListener('load', onLoad, false);
