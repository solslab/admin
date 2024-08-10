import CryptoJS from "crypto-js";
import { strFromU8, strToU8, unzlibSync } from "fflate";

const md5Hash = "a51fe31b3faaf9cff59cd437d6a3d167";

export namespace Crypto {
  export const decrypt = (data: string, hash?: string) =>
    CryptoJS.AES.decrypt(data, hash || md5Hash).toString(CryptoJS.enc.Utf8);
  export const encrypt = (data: string, hash?: string) =>
    CryptoJS.AES.encrypt(data, hash || md5Hash).toString();

  export const serialize = (data: string) => strToU8(JSON.stringify(data));
  export const deserialize = (data: Uint8Array) => strFromU8(unzlibSync(data));
}
