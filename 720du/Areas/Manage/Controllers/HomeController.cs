using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using du720.Filter;

namespace du720.Manage.Controllers
{
    [AdminLoginFilter]
    public class HomeController : Controller
    {
        /// <summary>
        /// 主页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 左边菜单栏
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult left()
        {
            return View();
        }

        /// <summary>
        /// 登录后显示页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult desktop()
        {
            return View();
        }
    }
}