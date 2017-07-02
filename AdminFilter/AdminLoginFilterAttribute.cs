using du720.AdminBLL.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace du720.AdminFilter
{
    /// <summary>
    /// 后台登录判断
    /// </summary>
    public class AdminLoginFilterAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
            if (Authentication.GetUserInfo() == null)
            {
                string url = HttpUtility.HtmlEncode(HttpContext.Current.Request.RawUrl);
                if (url == "/")
                {
                    HttpContext.Current.Response.Redirect("/Login/Index");
                }
                else
                {
                    HttpContext.Current.Response.Redirect("/Login/Index?returnurl=" + url);
                }
                HttpContext.Current.Response.End();
            }
        }
    }
}
