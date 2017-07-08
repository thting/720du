using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace du720.Filter
{
    /// <summary>
    /// 前台登录判断
    /// </summary>
    public class LoginFilterAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
            if (!CurrentUser.IsLoged())
            {
                string sheader = filterContext.HttpContext.Request.Headers["X-Requested-With"];
                bool isAjaxRequest = (sheader != null && sheader == "XMLHttpRequest") ? true : false;
                if (isAjaxRequest)
                {
                    ContentResult contentResult = new ContentResult();
                    HandleResult handleResult = new HandleResult(500, "您未登录或登录过期，请登录后重试！", 500403);
                    contentResult.Content = JsonConvert.SerializeObject(handleResult);
                    contentResult.ContentType = "application/json";
                    filterContext.Result = contentResult;
                }
                else
                {
                    string Url = HttpUtility.HtmlEncode(HttpContext.Current.Request.RawUrl);
                    RedirectResult result = new RedirectResult("/sso/index.html?returnurl=" + Url);
                    filterContext.Result = result;
                }
            }
        }
    }
}
