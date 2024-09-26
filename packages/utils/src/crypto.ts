import CryptoJS from 'crypto-js';

/**
 * 将给定的字符串编码为 Base64 格式
 *
 * @param text 要编码的字符串
 * @returns 编码后的 Base64 字符串
 */
function encodeToBase64(text: string) {
  // 使用 WordArray.create 方法创建一个字节数组，并使用 toString 方法将其转换为 Base64 格式
  return CryptoJS.enc.Utf8.parse(text).toString(CryptoJS.enc.Base64);
}

/**
 * 将 Base64 编码的字符串解码为原始文本
 *
 * @param base64String 经过 Base64 编码的字符串
 * @returns 解码后的原始文本
 */
function decodeFromBase64(base64String: string) {
  // 使用 Base64 解析方法将 Base64 字符串转换回字节数组，再转换为原始文本
  const bytes = CryptoJS.enc.Base64.parse(base64String);
  return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * 将文本转换为URL安全的Base64编码格式 此函数首先将文本转换为标准Base64编码，然后通过替换其中的特定字符使之成为URL安全的Base64编码
 * 主要用于需要将数据作为URL参数或在URL中传输的场景，确保编码后的数据不会包含在URL中可能引起问题的字符
 *
 * @param text 需要转换的文本字符串
 * @returns 返回URL安全的Base64编码字符串
 */
function urlSafeEncodeToBase64(text: string) {
  // 转换为标准 Base64 格式
  let base64 = encodeToBase64(text);
  // 替换 + 和 / 为 - 和 _
  base64 = base64.replace(/\+/g, '-').replace(/\//g, '_');
  // 去除末尾的 =
  base64 = base64.replace(/[=]+$/, '');
  return base64;
}

/**
 * 从URL安全的Base64字符串解码 此函数旨在处理URL安全的Base64字符串，这种字符串将标准Base64中的+和/替换为-和_ 并且可能没有结尾的=字符。该函数首先将URL安全字符转换回标准Base64字符，
 * 然后添加任何缺失的=字符以确保字符串长度为4的倍数，最后调用decodeFromBase64函数进行解码
 *
 * @param base64String 经过URL安全Base64编码的字符串
 * @returns 解码后的字符串
 */
function urlSafeDecodeFromBase64(base64String: string) {
  // 将 - 和 _ 替换回 + 和 /
  let base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
  // 补齐末尾的 =
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  base64 += padding;
  return decodeFromBase64(base64);
}

export { decodeFromBase64, encodeToBase64, urlSafeDecodeFromBase64, urlSafeEncodeToBase64 };
export class Crypto<T extends object> {
  /** Secret */
  secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  encrypt(data: T): string {
    const dataString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(dataString, this.secret);
    return encrypted.toString();
  }

  decrypt(encrypted: string) {
    const decrypted = CryptoJS.AES.decrypt(encrypted, this.secret);
    const dataString = decrypted.toString(CryptoJS.enc.Utf8);
    try {
      return JSON.parse(dataString) as T;
    } catch {
      // avoid parse error
      return null;
    }
  }
}
