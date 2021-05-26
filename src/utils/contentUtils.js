import logUtils from './logUtils';

function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function encodeURIString(string) {
  return encodeURIComponent(string);
}

const avoidSending = (e) => {
  if (e) e.cancel();
  logUtils.consoleLog('avoidSending');
};

const regexFlag = 'gi';

const getRegex = (regexPattern) => {
  const encoded = encodeURIString(regexPattern);
  return new RegExp(`${escapeRegExp(regexPattern)}|${encoded}`, regexFlag);
};

const updateQueryParameterInLinks = (
  bodyElement,
  tagName,
  regexValueToUpdate
) => {
  logUtils.consoleLog('updateQueryParameterInLinks');
  $(bodyElement)
    .find('a')
    .each((i, node) => {
      logUtils.consoleLog('each');
      const href = $(node).attr('href');
      const hrefReplaced = href.replace(getRegex(tagName), regexValueToUpdate);
      $(node).attr('href', hrefReplaced);
    });
  logUtils.consoleLog('updateQueryParameterInLinks bitti');
};

const getUpdatedTagNameInBody = async (
  bodyHtml,
  tagName,
  regexValueToUpdate
) => {
  const exp = new RegExp(getRegex(tagName), 'gim');
  var match = exp.exec(bodyHtml);
  if (match) {
    bodyHtml = bodyHtml.replace(exp, regexValueToUpdate);
    return bodyHtml;
  } else null;
};

const contentUtils = {
  updateQueryParameterInLinks,
  avoidSending,
  getUpdatedTagNameInBody,
};
export default contentUtils;
