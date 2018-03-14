package websocket;

import java.security.KeyFactory;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;

import org.bouncycastle.util.encoders.Base64;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketFrame;
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
/**
 * It is websocket request handler.
 * It can handle text request only.
 * @author SITO3
 *
 */
public class WebSocketFrameHandler extends SimpleChannelInboundHandler<WebSocketFrame>
{
	private MessageCoder messageCoder;
	private boolean isFirstConnect=true;
	private String responseString,requestString;
	@Override
	protected void channelRead0(ChannelHandlerContext ctx, WebSocketFrame frame)
			throws Exception {
		
		if (frame instanceof TextWebSocketFrame) {
			 handleRequest(ctx, frame);
	     } else {
	         String message = "unsupported frame type: " + frame.getClass().getName();
	         throw new UnsupportedOperationException(message);
	     }	
	}
	@Override
	public void channelActive(ChannelHandlerContext ctx)
            throws java.lang.Exception
    {
		//Once the connection is established, init. the message coder.
		try 
		{
			messageCoder=new MessageCoder();
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
    }
	private void handleRequest(ChannelHandlerContext ctx, WebSocketFrame frame) throws Exception
	{
		requestString = ((TextWebSocketFrame) frame).text();
		if (isFirstConnect)
		{
			//if first connect,
			String messageKey=messageCoder.key;
			String ivText=messageCoder.ivText;
			Cipher rsaCipher;
			rsaCipher = Cipher.getInstance("RSA");
			requestString=requestString.replaceAll("-----BEGIN PUBLIC KEY-----\n", "");
			requestString=requestString.replaceAll("\n-----END PUBLIC KEY-----", "");
			byte[] publicBytes = Base64.decode(requestString);
			X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicBytes);
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			rsaCipher.init(Cipher.ENCRYPT_MODE,keyFactory.generatePublic(keySpec)); // init. the RSA coder
			responseString ="{\"messageKey\":\""+messageKey+"\",";
			responseString+="\"ivText\":\""+ivText+"\"}";
			responseString =new String(Base64.encode(rsaCipher.doFinal(responseString.getBytes("UTF-8")))); //encrypt the AES key 
			isFirstConnect=false;
		}
		else
		{
			//For simplicity, just send back incoming message only.
			requestString=messageCoder.decode(requestString);
			responseString=messageCoder.encode(requestString);
		}
		ctx.channel().writeAndFlush(new TextWebSocketFrame(responseString));// send the response to client
	}
}
