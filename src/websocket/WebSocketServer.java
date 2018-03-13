package websocket;

import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.buffer.PooledByteBufAllocator;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;

import java.util.concurrent.TimeUnit;

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
public class WebSocketServer
{
	private int serverPort=-1;
	private EventLoopGroup bossGroup=null;
    private EventLoopGroup workerGroup=null;
	private ServerBootstrap bootStrap = null;
	
	public static final int ACCEPT_MULTI_CONNECTION=1;
	public static final int ACCEPT_SINGLE_CONNECTION=0;	
	//-------------------------------------------------------------------------------------------   
	/**
	 * It is a standard server object
	 * @param logger message logger
	 */
	public WebSocketServer()
	{
		bootStrap = new ServerBootstrap();
		workerGroup=new NioEventLoopGroup();
		bossGroup=new NioEventLoopGroup();
		bootStrap.group(bossGroup, workerGroup);
		bootStrap.childHandler(new WebSocketServerInitializer());
		bootStrap.channel(NioServerSocketChannel.class);
		bootStrap.handler(new LoggingHandler(LogLevel.INFO));
	}
	/**
	 * Server listening port
	 * @param port no. that server to listen
	 */
	public void setServerPort(int port)
	{
		serverPort=port;
	}	
	/**
	 * Start the server
	 */
	public void start() throws IllegalArgumentException  
	{
		bootStrap.childOption(ChannelOption.ALLOCATOR, PooledByteBufAllocator.DEFAULT);
		bootStrap.bind(serverPort);
	}
	/**
	 * Stop the server
	 */
	public void stop()
	{
		if (bossGroup!=null)
		{	
			bossGroup.shutdownGracefully(0,0,TimeUnit.MILLISECONDS);
		}
		if (workerGroup!=null)
		{	
			workerGroup.shutdownGracefully(0,0,TimeUnit.MILLISECONDS);
		}
        bossGroup=null;
        workerGroup=null;
        bootStrap = null;
	}
	
	public static void main(String[] args) 
	{
		WebSocketServer s=new WebSocketServer();
		s.setServerPort(4466);
		s.start();
		
	}
}
