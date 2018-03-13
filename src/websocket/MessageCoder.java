package websocket;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
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
public class MessageCoder 
{
	//private static int AES_KEY_SIZE = 256 ;
	private static int AES_KEY_SIZE = 128 ;
    private static int IV_SIZE = 16 ;
    
    public String ivText,key;
    private Cipher cipher,decipher;
    public MessageCoder()throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, InvalidAlgorithmParameterException, UnsupportedEncodingException
    {
		KeyGenerator keygen = KeyGenerator.getInstance("AES") ; // Specifying algorithm key will be used for 
		keygen.init(AES_KEY_SIZE) ; // Specifying Key size to be used, Note: This would need JCE Unlimited Strength to be installed explicitly 
		SecretKey aesKey = keygen.generateKey();

		// Generating IV
		byte iv[] = new byte[IV_SIZE];
         
        SecureRandom secRandom = new SecureRandom() ;
        secRandom.nextBytes(iv);
        
		cipher = Cipher.getInstance("AES/CTR/NoPadding");
		decipher = Cipher.getInstance("AES/CTR/NoPadding");
        
		cipher.init(Cipher.ENCRYPT_MODE, aesKey,new IvParameterSpec(iv));
		decipher.init(Cipher.DECRYPT_MODE, aesKey,new IvParameterSpec(iv));
		ivText=Base64.getEncoder().encodeToString(iv);
		key=Base64.getEncoder().encodeToString(aesKey.getEncoded());		
    }
    public String encode(String message) throws IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException
    {
    	byte[] cipherTextInByteArr = cipher.doFinal(message.getBytes("UTF-8"));
    	return Base64.getEncoder().encodeToString(cipherTextInByteArr);
    }
    public String decode(String encodedText) throws IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException
    {
    	byte[] cipherTextInByteArr =Base64.getDecoder().decode(encodedText);
    	byte[] plainTextInByteArr = decipher.doFinal(cipherTextInByteArr);
    	return new String(plainTextInByteArr,"UTF-8");
    }
}
