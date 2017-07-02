using du720.AdminBLL.Attribute;
using du720.AdminFilter;
using du720.BLL;
using du720.Common;
using du720.Entity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace du720Admin.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/
        [HttpGet]
        public ActionResult Index()
        {
            if (Authentication.GetUserInfo() != null)
            {
                string refurl = Request["returnurl"];
                if (!string.IsNullOrWhiteSpace(refurl))
                {
                    return Redirect(refurl);
                }
                else
                {
                    return RedirectToAction("Default", "Login");
                }
            }
            return View();
        }

        /// <summary>
        /// 用户异步登录
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost, AjaxFilter, ValidateInput(false)]
        public ActionResult Login(string Name, string Pw)
        {
            HandleResult hr = new HandleResult();
            if (string.IsNullOrEmpty(Name) || Commons.IsIncludeSqlInjection(Name))
            {
                hr.StatsCode = 103;
                hr.Message = "姓名不合法";
                return Content(JsonConvert.SerializeObject(hr));
            }

            if (string.IsNullOrEmpty(Pw) || Commons.IsIncludeSqlInjection(Pw))
            {
                hr.StatsCode = 104;
                hr.Message = "密码不合法";
                return Content(JsonConvert.SerializeObject(hr));
            }

            AdminUserEntity model = AdminUserBLL.GetLoginByName(Name);
            if (model != null)
            {
                if (model.PassWord == Commons.GetMD5Hash(Pw))
                {
                    Authentication.SetAuthCookie(model.Id, Name);
                    hr.StatsCode = 200;
                    hr.Message = "登录成功";
                    return Content(JsonConvert.SerializeObject(hr));
                }
                hr.Message = "密码错误";
                return Content(JsonConvert.SerializeObject(hr));
            }
            hr.Message = "用户不存在或不可用";
            return Content(JsonConvert.SerializeObject(hr));
        }

        /// <summary>
        /// 注销
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult LogOut()
        {
            Authentication.SignOut();
            return Redirect("/Login/Index");
        }

        /// <summary>
        /// 登录后显示页
        /// </summary>
        /// <returns></returns>
        [HttpGet, AdminLoginFilter]
        public ActionResult Default()
        {
            return View();
        }
	}
}