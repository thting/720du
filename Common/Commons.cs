using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace du720.Common
{
    public class Commons
    {
        /// <summary>
        /// 非法字符，去掉--(用于微信opendid判断)
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static bool IsIncludeSqlInjection(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return false;
            }
            return Regex.IsMatch(input, @"'|%|exec |;|\/\*|\*\/", RegexOptions.IgnoreCase);
        }

        /// <summary>
        /// 是否在微信浏览器中打开（true 是 ，false 否）
        /// </summary>
        /// <returns></returns>
        public static bool IsOpenInWXBrowser()
        {
            string Request = System.Web.HttpContext.Current.Request.UserAgent;
            if (!string.IsNullOrEmpty(Request) && (Request.ToLower().IndexOf("micromessenger") > -1))
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 获取web.config中appSettings key对应值
        /// </summary>
        /// <returns></returns>
        public static string GetConfigValue(string key)
        {
            return System.Configuration.ConfigurationSettings.AppSettings[key];
        }

        /// <summary>
        /// MD5加密，传入参数返回加密后的结果
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string GetMD5Hash(String input)
        {
            //作为密码方式加密 
            return System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(input, "MD5");
        }

        public static int GetClientPort()
        {
            int port = 0;
            int.TryParse(HttpContext.Current.Request.ServerVariables["REMOTE_PORT"].ToString(), out port);
            return port;
        }

        /// <summary>
        /// 替换字符串内容（只匹配替换一次）,如果开始结束字符串不能匹配到，则返回原始字符串
        /// </summary>
        /// <param name="strPending">原始字符串</param>
        /// <param name="flagBegin">需替换内容开始字符串</param>
        /// <param name="flagEnd">需替换内容结束字符串</param>
        /// <param name="ReplaceString">目标字符串</param>
        /// <returns></returns>
        public static string StringReplace(string strPending, string flagBegin, string flagEnd, string ReplaceString)
        {
            int intBegin = strPending.IndexOf(flagBegin);
            int intEnd = strPending.IndexOf(flagEnd);
            if (intBegin == -1 || intEnd == -1)
            {
                return strPending;
            }
            intEnd += flagEnd.Length;
            StringBuilder sb = new StringBuilder();
            if (intBegin >= 0 && intBegin <= intEnd)
            {
                sb.Append(strPending.Substring(0, intBegin));
                sb.Append(ReplaceString);
                sb.Append(strPending.Substring(intEnd, strPending.Length - intEnd));
            }
            return sb.ToString();
        }

        /// <summary>
        /// 截取字符串长度(区分汉字、数字、字母的长短问题)
        /// </summary>
        /// <param name="strOrigin">原始字符串</param>
        /// <param name="intLengthLimit">字符长度限制（一个汉字算两个字符长度）</param>
        /// <param name="strMore">超过长度部分显示字符</param>
        /// <remarks>区分汉字数字字母的长短问题，超过固定长度显示固定字符串替代</remarks>
        public static string GetPartOfString(string strOrigin, int intLengthLimit, string strMore)
        {
            if (string.IsNullOrEmpty(strOrigin))
            {
                return string.Empty;
            }
            int bytesLengthStrOrigin = Convert.ToInt32(Encoding.Default.GetBytes(strOrigin).Length);
            int bytesLengthStrMore = Convert.ToInt32(Encoding.Default.GetBytes(strMore).Length);
            if (bytesLengthStrOrigin > intLengthLimit)
            {
                //原始字符长度大于限制长度
                int _sumLength = 0;
                for (int i = 0; i <= strOrigin.Length - 1; i++)
                {
                    _sumLength = (Strings.Asc(strOrigin.Substring(i, 1)) < 0) ? _sumLength + 2 : _sumLength + 1;
                    if (_sumLength == intLengthLimit - bytesLengthStrMore)
                    {
                        strOrigin = strOrigin.Substring(0, i) + strMore;
                        break;
                    }
                    else if (_sumLength > intLengthLimit - bytesLengthStrMore)
                    {
                        strOrigin = strOrigin.Substring(0, i - 1) + strMore;
                        break;
                    }
                }
            }

            return strOrigin;
        }

        /// <summary>
        /// 去除HTML标记
        /// </summary>
        /// <param name="Htmlstring">包括HTML的源码 </param>
        /// <returns>已经去除后的文字</returns>
        public static string NoHTML(string Htmlstring)
        {
            if (string.IsNullOrEmpty(Htmlstring))
            {
                return string.Empty;
            }
            string Re_Str = "";
            if (Htmlstring != null)
            {
                if (Htmlstring != string.Empty)
                {
                    string Pattern = "<\\/*[^<>]*>";
                    Re_Str = Regex.Replace(Htmlstring, Pattern, "");
                }
            }
            return Re_Str.Replace("&nbsp;", "");
        }

        /// <summary>
        /// 公用参数处理
        /// </summary>
        /// <param name="parmas">参数 基本格式parmas-parmas1-parmas2</param>
        /// <returns></returns>
        public static ArrayList ConvertParmas(string parmas)
        {
            ArrayList parmasArray = new ArrayList();
            if (!string.IsNullOrEmpty(parmas))
            {
                string[] parmasArr = parmas.Split('-');
                if (parmasArr.Length > 0)
                {
                    for (int i = 0; i < parmasArr.Length; i++)
                    {
                        parmasArray.Add(parmasArr[i]);
                    }
                }
            }
            return parmasArray;
        }

        /// <summary>
        /// 检测是否手机端   //修改 刘兆伟 20151019
        /// </summary>
        /// <returns></returns>
        public static bool CheckIsMobile(ref string key)
        {
            bool flag = false;
            key = "";
            string agent = (string)HttpContext.Current.Request.UserAgent;
            string[] keywords = new string[] { "iphone", "android", "phone", "mobile", "wap", "netfront", "java", "opera mobi", "opera mini",
                    "ucweb", "windows ce", "symbian", "series", "webos", "sony", "blackberry", "dopod", "nokia", "samsung", "palmsource", "xda",
                    "pieplus", "meizu", "midp", "cldc", "motorola", "foma", "docomo", "up.browser", "up.link", "blazer", "helio", "hosin", "huawei",
                    "novarra", "coolpad", "webos", "techfaith", "palmsource", "alcatel", "amoi", "ktouch", "nexian", "ericsson", "philips", "sagem",
                    "wellcom", "bunjalloo", "maui", "smartphone", "iemobile", "spice", "bird", "zte-", "longcos", "pantech", "gionee", "portalmmm",
                    "jig browser", "hiptop", "benq", "haier", "^lct", "320x320", "240x320", "176x220", "w3c ", "acs-", "alav", "alca", "amoi", "audi",
                    "avan", "benq", "bird", "blac", "blaz", "brew", "cell", "cldc", "cmd-", "dang", "doco", "eric", "hipt", "inno", "ipaq", "java", "jigs",
                    "kddi", "keji", "leno", "lg-c", "lg-d", "lg-g", "lge-", "maui", "maxo", "midp", "mits", "mmef", "mobi", "mot-", "moto", "mwbp",
                    "nec-", "newt", "noki", "oper", "palm", "pana", "pant", "phil", "play", "port", "prox", "qwap", "sage", "sams", "sany", "sch-",
                    "sec-", "send", "seri", "sgh-", "shar", "sie-", "siem", "smal", "smar", "sony", "sph-", "symb", "t-mo", "teli", "tim-", "tosh",
                    "tsm-", "upg1", "upsi", "vk-v", "voda", "wap-", "wapa", "wapi", "wapp", "wapr", "webc", "winw", "winw", "xda", "xda-", "Googlebot-Mobile" };
            if (!string.IsNullOrEmpty(agent))
            {
                foreach (string item in keywords)
                {
                    if (agent.ToLower().IndexOf(item) > -1)
                    {
                        flag = true;
                        key = item;
                        break;
                    }
                }
            }
            return flag;
        }

        /// <summary>
        /// 生产随机兑换码
        /// </summary>
        /// <returns></returns>
        public static string GenerateExchangeCode()
        {
            Random ran = new Random();
            return string.Format("{0}{1}{2}", ran.Next(1000), DateTime.Now.ToString("yyyyMMddHHmmssffff"), ran.Next(1000000));
        }
    }
}
