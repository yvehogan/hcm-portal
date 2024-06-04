import moment from 'moment-timezone';

export const capitalize = (text: string) => {
  const val = decodeURIComponent(text);
  return val?.split(' ')?.map((item) => `${item.charAt(0).toUpperCase()}${item.slice(1)}`).join(' ');
};

export const concealEmail = (email = '') => email.replace(/(?<=.{2}).(?=[^@]+@)/g, '*');

export const concealPhoneNo = (phone = '') => phone.replace(/(?<=\d{4})\d(?=\d{2})/g, '*');

export const concealValue = (value = '') => (value ? value.replace(/\w/g, '*') : '');

export const logger = (...logs: any) => (process.env.NODE_ENV === 'development'
  // eslint-disable-next-line no-console
  ? console.log(...logs, `(Log time - ${moment().format('LLL')})`)
  : undefined);

export const formatFileUrl = (path?: string) => {
  if (path) return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`;
  return null;
};


export const convertImgToBase64 = (inputFile: File) => {
  if (inputFile === undefined) return '';
  const file = new FileReader();

  return new Promise<string>((resolve, reject) => {
    file.onerror = () => {
      file.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    file.onload = () => {
      resolve(String(file.result));
    };
    file.readAsDataURL(inputFile);
  });
};

