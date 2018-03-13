function Utility()
{
}
/**
 * A function to generate a random between 0 and 10 ^ 10;
 */
Utility.getKey=function()
{
	var vNum
	vNum = Math.random()
	vNum = Math.round(vNum*1000000000);
	return vNum;
}
/**
 * A function used to extend one class with another
 * 
 * @param {Object} subClass
 * 		The inheriting class, or subclass
 * @param {Object} baseClass
 * 		The class from which to inherit
 */
Utility.extend = function(subClass, superClass) 
{
	function Dummy() {}
	Dummy.prototype = superClass.prototype;
	subClass.prototype = new Dummy();
	subClass.prototype.constructor = subClass;
	subClass.superClass = superClass;
	subClass.superproto = superClass.prototype;
}
/***************************************************************************/
/*Function name           :checkemail(a)                                   */
/*Usage of this function  :check "a" whether is a valid email address      */ 
/*Input parameter required:a-string variable                               */
/*Return value            :if success ,return true                         */ 
/*                         else return false                               */
/***************************************************************************/
Utility.checkemail=function(a)
{var testresults;
 var str=a;
 //var filter=/^.+@.+\..{2,3}$/
 var filter=/^((?:(?:(?:(\w|~)[~\.\-\+\/]?)*)(\w|~))+)\@((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.([a-zA-Z]{2,6})$|^$/;
 if (filter.test(str)) 
   testresults=true;
 else
  {
    testresults=false;
  }
 return (testresults)
}
/**************************************************************************/
/*Function name           :getBrowserInnerHeight()                        */
/*Usage of this function  :get the height of the browser viewable area    */ 
/*Input parameter required:none                                           */
/*Return value            :Returns the height of the browser viewable area*/ 
/**************************************************************************/
Utility.getBrowserInnerHeight=function()
{
	return (document.all?document.body.clientHeight:window.innerHeight); 
}
/*************************************************************************/
/*Function name           :getBrowserInnerWidth()                        */
/*Usage of this function  :get the width of the browser viewable area    */ 
/*Input parameter required:none                                          */
/*Return value            :Returns the width of the browser viewable area*/ 
/*************************************************************************/
Utility.getBrowserInnerWidth=function()
{
	return (document.all?document.body.clientWidth:window.innerWidth); 
}
/*******************************************************/
/*Function name           :capitalize(val)             */
/*Usage of this function  :capitalize the input value  */ 
/*Input parameter required:val=string to be capitalize */
/*Return value            :Returns the processed string*/ 
/*******************************************************/
Utility.capitalize=function (val)
{
	var newVal = "";
	val = val.split(" ");
	for(var c=0; c < val.length; c++) 
	{
		newVal+= val[c].substring(0,1).toUpperCase();
		newVal+=val[c].substring(1,val[c].length).toLowerCase()+" ";
	}
	return newVal;
}
/***************************************************************/
/*Function name           :escapeForRegExp(msg)                */
/*Usage of this function  :escape Regulare Expression character*/ 
/*Input parameter required:msg=string to be escape             */
/*Return value            :Returns the escaped string          */ 
/***************************************************************/
Utility.escapeForRegExp=function (msg)
{
	msg=msg.replace(":","\\:");
	msg=msg.replace("(","\\(");
	msg=msg.replace(")","\\)");
	msg=msg.replace("+","\\+");
	msg=msg.replace("^","\\^");
	msg=msg.replace("*","\\*");
	msg=msg.replace("{","\\{");
	msg=msg.replace("}","\\}");
	msg=msg.replace("]","\\]");
	msg=msg.replace("[","\\[");
	return msg;
};
/****************************************************************/
/*Function name           :getTime()                            */
/*Usage of this function  :current time in string format        */ 
/*Input parameter required:none 			        */
/*Return value            :Returns current time in string format*/ 
/****************************************************************/
Utility.getTime=function()
{
	var now=new Date();
	var returnString="";
	var h=parseInt(now.getHours());
	var m=parseInt(now.getMinutes());
	if (h<10)
		returnString="0";
	returnString+=h+":";
	if (m<10)
		returnString+="0";
	returnString+=m;
	return returnString;
}
/******************************************************/
/*Function name           :stringReverse(str)         */
/*Usage of this function  :Reverse the input string   */ 
/*Input parameter required:msg=string to be reversed  */
/*Return value            :Returns the reversed string*/ 
/******************************************************/
Utility.stringReverse=function (str) 
{
   if (!str) return '';
   var revstr='';
   for (i = str.length-1; i>=0; i--)
       revstr+=str.charAt(i)
   return revstr;
};

/*****************************************************/
/*Function name           :escapeForHTML(msg)        */
/*Usage of this function  :escape HTML character     */ 
/*Input parameter required:msg=string to be escape   */
/*Return value            :Returns the escaped string*/ 
/*****************************************************/
Utility.escapeForHTML=function (msg)
{
	//msg=msg.replace(/\%/g,"&#37;");
	msg=msg.replace(/\&/g,"&#38;");
	msg=msg.replace(/\>/g,"&gt;");
	msg=msg.replace(/\</g,"&lt;");
	msg=msg.replace(/\n/g,"<br>");
	msg=msg.replace(/\|/g,"&#124;");
	//msg=msg.replace(/\+/g,"&#2b;");
	return msg;
};

/****************************************************************/
/*Function name           :escapeForAjax(msg)                   */
/*Usage of this function  :escape URL character for transmission*/ 
/*Input parameter required:msg=string to be escape              */
/*Return value            :Returns the escaped string           */ 
/****************************************************************/
Utility.escapeForAjax=function (msg)
{
	msg=msg.replace(/\%/g,"%25");
	msg=msg.replace(/\&/g,"%26");
	msg=msg.replace(/\+/g,"%2b");
	return msg;
};
/************************************************************/
/*Function name           :isIEBrowser()                    */
/*Usage of this function  :check the browser whether is ie  */ 
/*Input parameter required:n.a.                             */
/*Return value            :Returns true if the browser is ie*/ 
/************************************************************/
Utility.isIEBrowser=function()
{
	 var agt=navigator.userAgent.toLowerCase();
	 var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
	 return is_ie;
};
/*****************************************************************/
/*Function name           :isFFBrowser()                         */
/*Usage of this function  :check the browser whether is firefox  */ 
/*Input parameter required:n.a.                                  */
/*Return value            :Returns true if the browser is firefox*/ 
/*****************************************************************/
Utility.isFFBrowser=function()
{
	 var agt=navigator.userAgent.toLowerCase();
	 var is_ff =(agt.indexOf("firefox")>-1);
	 return is_ff;
};
/******************************************************************************/
/*Function name           :isBlank(s)                                         */
/*Usage of this function  :check the input string whether only contains spaces*/ 
/*Input parameter required:s=the string to be check                           */
/*Return value            :Returns true if value only contains spaces         */ 
/******************************************************************************/
Utility.isBlank=function (val){                                                                                         
	if(val==null){return true;}                                                                                   
	for(var i=0;i<val.length;i++) {                                                                               
		if ((val.charAt(i)!=' ')&&(val.charAt(i)!="\t")&&(val.charAt(i)!="\n")&&(val.charAt(i)!="\r")){return false;}
		}                                                                                                            
	return true;                                                                                                  
	};
/**********************************************************************/
/*Function name           : trim(strMessage)                          */
/*Usage of this function  :trim all space                             */ 
/*Input parameter required:strMessage=string to be trim               */
/*Return value            :Return the trimmed string                  */ 
/**********************************************************************/
Utility.trim=function (strMessage)
{
	var strResult;
	var charTemp;
	var i;

	strResult = "";

	//remove the left space
	for ( i = 0; i < strMessage.length; i++ )
	{
		charTemp = strMessage.charAt(i);
		if ( charTemp != " " )
		{
			strResult = strMessage.substring(i);
			break;
		}
	}

	//remove the right space
	for ( i = strResult.length-1; i >= 0; i-- )
	{
		charTemp = strResult.charAt(i);
		if ( charTemp != " " )
		{
			strResult = strResult.substring(0,i+1);
			break;
		}
	}
	return (strResult);
};
/*****************************************************************/
/*Function name           :getEventFireObject(e)                 */
/*Usage of this function  :get the object that Fire the Event    */ 
/*Input parameter required:e=event                               */
/*Return value            :Returns the object that Fire the Event*/ 
/*****************************************************************/
Utility.getEventFireObject=function (e)
{
	var evtObj=Utility.getEventObject(e);
	return (window.event?evtObj.srcElement:evtObj.target);
};
/***************************************************/
/*Function name           :getEventObject(e)       */
/*Usage of this function  :get the Event object    */ 
/*Input parameter required:e=event                 */
/*Return value            :Returns the Event object*/ 
/***************************************************/
Utility.getEventObject=function(E)
{
	return (window.event? event : E);
};
	