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
  console.log({ regexPattern, encoded });
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
      // console.log({ i, node, href: $(node).attr('href') });

      // let match = exp.exec(href);

      // console.log({ match });
      const hrefReplaced = href.replace(getRegex(tagName), regexValueToUpdate);
      // console.log({ hrefReplaced });
      $(node).attr('href', hrefReplaced);
    });
  logUtils.consoleLog('updateQueryParameterInLinks bitti');
};

const contentUtils = { updateQueryParameterInLinks, avoidSending };
export default contentUtils;
