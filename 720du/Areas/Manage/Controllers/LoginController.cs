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
using Newtonsoft.Json;
using du720.BLL.Attribute;

namespace du720.Manage.Controllers
{
    public class LoginController : Controller
    {
        /// <summary>
        /// 登录页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
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
                    Authentication.SetAuthCookie(model.Id, HttpUtility.UrlEncode(model.UserName, Encoding.GetEncoding("UTF-8")));
                    hr.StatsCode = 200;
                    hr.Message = "登陆成功";
                    return Content(JsonConvert.SerializeObject(hr));
                }
                hr.Message = "用户不存在或密码错误";
                return Content(JsonConvert.SerializeObject(hr));
            }
            hr.Message = "用户不存在或密码错误";
            return Content(JsonConvert.SerializeObject(hr));
        }


        /// <summary>
        /// 注销
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult LogOut()
        {
            Authentication.SignOut();
            return Content(JsonConvert.SerializeObject(""));
        }

    }
}
