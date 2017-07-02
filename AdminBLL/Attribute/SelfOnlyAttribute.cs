using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace du720.AdminBLL.Attribute
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public class SelfOnlyAttribute : FilterAttribute, IActionFilter
    {
        void IActionFilter.OnActionExecuted(ActionExecutedContext filterContext)
        {

        }

        void IActionFilter.OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpCookie ManageCookie = filterContext.RequestContext.HttpContext.Request.Cookies[Authentication.AUTH_COOKIE_NAME];
            if (ManageCookie == null)
            {
                var reurl = filterContext.RequestContext.HttpContext.Request.Url.AbsoluteUri.ToLower();
                filterContext.Result = new RedirectResult("/manage/login?returnUrl=" + reurl);
            }
            else
            {
                LoginEntity enity = GetUserInfo();
                filterContext.ActionParameters["User"] = enity;
                filterContext.Controller.ViewBag.UserID = enity.userID;
                filterContext.Controller.ViewBag.UserName = enity.userName;
            }
        }

        /// <summary>
        /// 从cookie获取用户信息
        /// </summary>
        /// <returns></returns>
        private LoginEntity GetUserInfo()
        {
            var obj = Authentication.GetUserInfo().Name.Split(',');
            return new LoginEntity()
            {
                userID = Convert.ToInt32(obj[0]),
                userName = HttpUtility.UrlDecode(obj[1], Encoding.GetEncoding("UTF-8")),
            };
        }
    }
}
