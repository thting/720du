using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using du720.Filter;

namespace du720.Manage.Controllers
{
    [AdminLoginFilter]
    public class IndexController : Controller
    {
        //
        // GET: /Index/

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
    }
}