using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using du720.Filter;
using du720.BLL;
using du720.Entity;
using du720.Common;
using du720.AdminBLL.Attribute;

namespace du720.Manage.Controllers
{
    public class LoginController : Controller
    {
        [HttpGet]
        public ActionResult Index(string returnUrl = "")
        {
            ViewBag.returnUrl = returnUrl;
            return View();
        }

        [HttpPost, AjaxFilter, ValidateInput(false)]
        public ActionResult Login(string username, string password)
        {
            AdminUserEntity model = AdminUserBLL.GetLoginByName(username);

            if (model != null)
            {
                if (model.PassWord == Commons.GetMD5Hash(password))
                {
                    Authentication.SetAuthCookie(model.Id, HttpUtility.UrlEncode(model.UserName, Encoding.GetEncoding("UTF-8")));
                    return Json(new { code = 0, msg = "登录成功！" });
                }
                return Json(new { code = 1, msg = "密码错误！" });
            }
            return Json(new { code = 2, msg = "用户不存在或不可用！" });
        }

        public ActionResult LogOut()
        {
            try
            {
                Authentication.SignOut();
                return Json(true);
            }
            catch{
                
            }
            return Json(false);
        }
    }
}
