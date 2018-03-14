/*
 * Copyright 2004-2005 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * This is message code object.
 * It provide 2 functions:
 *    -decode message from server.
 *    -encode message that to be sent to server
 */
function MessageCoder(key,iv)
{
	var ivArray=CryptoJS.enc.Base64.parse(iv);
	var keyArray=CryptoJS.enc.Base64.parse(key);
	this.encode=function(plainText)
				{
					var result;
					var encoded=CryptoJS.AES.encrypt(plainText,
												 keyArray,
												 {
														iv: ivArray,
														mode: CryptoJS.mode.CTR,
														padding: CryptoJS.pad.NoPadding
												  });
					result=encoded.ciphertext.toString(CryptoJS.enc.Base64);
					return  result;
				}
	this.decode=function (encodedText)
				{
					var encryptedArray=CryptoJS.enc.Base64.parse(encodedText);
					var decrypted = CryptoJS.AES.decrypt(
									{ ciphertext:encryptedArray},
									keyArray, 
									{
										iv: ivArray,
										mode: CryptoJS.mode.CTR,
										padding: CryptoJS.pad.NoPadding
									});
		 
					// 转换为 utf8 字符串
					decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
					return decrypted;
				}
}
