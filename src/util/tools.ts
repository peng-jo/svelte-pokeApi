export const isMobile = (userAgent: string):boolean => {
  let isPhone:boolean = false;

  if (userAgent.indexOf('iPhone') > -1 ||
      userAgent.indexOf('Android') > -1 ||
      userAgent.indexOf('iPad') > -1 ||
      userAgent.indexOf('iPod') > -1) {
    isPhone = true;
  }

  return isPhone;
};
