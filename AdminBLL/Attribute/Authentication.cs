using du720.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;

namespace du720.AdminBLL.Attribute
{
    public class Authentication
    {
        /// <summary>
        /// 设置用户COOKIE
        /// </summary>
        /// <param name="userInfo">用户信息</param>
        /// <param name="createPersistentCookie">是否持久化</param>
        public static void SetAuthCookie(int UserId, string userName, bool createPersistentCookie = false)
        {
            string userInfo = string.Join(",", UserId.ToString(), HttpUtility.UrlEncode(userName, Encoding.GetEncoding("UTF-8")));
            string skey = MakeServerKey();
            //票据凭证
            FormsAuthenticationTicket _authTicket = new FormsAuthenticationTicket(1, userInfo, DateTime.Now, DateTime.Now.AddDays(1), false, skey);
            string _jsonD = FormsAuthentication.Encrypt(_authTicket);
            //cookie会话模式 关闭浏览器失效
            HttpCookie _authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, _jsonD);
            if (createPersistentCookie)
            {
                _authCookie.Expires = DateTime.Now.AddDays(15);
            }
            _authCookie.HttpOnly = true;
            HttpContext.Current.Response.Cookies.Add(_authCookie);
        }

        //获取用户信息
        public static string GetUserInfo()
        {
            if (HttpContext.Current.User.Identity.IsAuthenticated)
            {
                string userInfo = HttpContext.Current.User.Identity.Name;
                return userInfo;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 从cookie获取用户信息
        /// </summary>
        /// <returns></returns>
        public static UserEntity GetUserEntity()
        {
            if (Authentication.GetUserInfo() != null)
            {

                var obj = Authentication.GetUserInfo().Split(',');
                return new UserEntity()
                {
                    UserID = Convert.ToInt32(obj[0]),
                    UserName = HttpUtility.UrlDecode(obj[1], Encoding.GetEncoding("UTF-8")),
                };
            }
            else
            {
                return new UserEntity();
            }
        }

        //注销
        public static void SignOut()
        {
            System.Web.HttpContext _context = HttpContext.Current;
            _context.Session.Abandon();
            FormsAuthentication.SignOut();
        }

        //产生随机Key
        private static string MakeServerKey()
        {
            //要使用生成KEY的字符
            string[] chars = new string[]{
                "a","b","c","d","e","f","g","h",
                "i","j","k","l","m","n","o","p",
                "q","r","s","t","u","v","w","x",
                "y","z","0","1","2","3","4","5",
                "6","7","8","9","A","B","C","D",
                "E","F","G","H","I","J","K","L",
                "M","N","O","P","Q","R","S","T",
                "U","V","W","X","Y","Z"
              };

            Random ra = new Random(unchecked((int)DateTime.Now.Ticks));
            int num = 8;
            string[] arrNum = new string[num];
            int tmp = 0;
            for (int i = 0; i <= num - 1; i++)
            {
                tmp = ra.Next(0, 61); //随机取数
                arrNum[i] = chars[tmp];
            }
            return "@" + string.Concat(arrNum);
        }
    }
}
