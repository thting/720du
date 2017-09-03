using du720.BLL;
using du720.Common;
using du720.Entity;
using du720.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace du720.Controllers
{
    public class CollectController : Controller
    {
        //
        // GET: /Collect/
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost, AjaxFilter]
        public ActionResult doSave(FormCollection form)
        {
            HandleResult hr = new HandleResult();
            hr.StatsCode = 500;
            hr.Message = "提交失败";

            if (string.IsNullOrWhiteSpace(form["txtUserName"]))
            {
                hr.Message = "请输入联系人。";
                return Json(hr);
            }

            if (string.IsNullOrWhiteSpace(form["txtPhone"]))
            {
                hr.Message = "请输入手机号。";
                return Json(hr);
            }
            else if (!Regex.IsMatch(form["txtPhone"], "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$"))
            {
                hr.Message = "手机号码格式不对。";
                return Json(hr);
            }

            if (string.IsNullOrWhiteSpace(form["txtReason"]))
            {
                hr.Message = "请输入推荐原因。";
                return Json(hr);
            }
            else if (form["txtReason"].ToString().Length > 200)
            {
                hr.Message = "推荐原因不能超过200个字符。";
                return Json(hr);
            }

            int stationId = Convert.ToInt32(form["ddlStationId"]);
            int collectType = Convert.ToInt32(form["ddlType"]);

            if (!Enum.IsDefined(typeof(Enums.eStation), stationId))
            {
                hr.Message = "站点不存在。";
                return Json(hr);
            }

            CollectInfoEntity entityCollect = new CollectInfoEntity();
            entityCollect.StationId = stationId;
            entityCollect.CollectType = collectType;
            entityCollect.UserName = form["txtUserName"].Trim();
            entityCollect.Phone = form["txtPhone"].Trim();
            entityCollect.Reason = form["txtReason"].Trim();
            entityCollect.AddTime = DateTime.Now;
            CollectInfoBLL.Insert(entityCollect);
            hr.StatsCode = 200;
            hr.Message = "提交成功";
            return Json(hr);
        }
	}
}