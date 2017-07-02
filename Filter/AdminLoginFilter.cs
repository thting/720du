using du720.AdminBLL.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace du720.Filter
{
    /// <summary>
    /// 后台登录判断
    /// </summary>
    public class AdminLoginFilterAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            //base.OnAuthorization(filterContext);
            if (Authentication.GetUserInfo() == null)
            {
                var reurl = filterContext.RequestContext.HttpContext.Request.Url.AbsoluteUri.ToLower();
                filterContext.Result = new RedirectResult("/manage/login?returnUrl=" + reurl);
            }
        }
    }
}
