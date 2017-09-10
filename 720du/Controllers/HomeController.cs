using du720.Entity;
using du720.Filter;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace du720.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult BMap()
        {
            return View();
        }

        public ActionResult Transit(string s, string e)
        {
            if (string.IsNullOrEmpty(s) || string.IsNullOrEmpty(e))
            {
                return Content("请输入起点和终点");
            }
            string xmlPath = "http://openapi.aibang.com/bus/transfer?app_key=f41c8afccc586de03a99c86097e98ccb&city=深圳&start_addr={0}&end_addr={1}&rc=5";
            List<Dictionary<string, object>> listResult = new List<Dictionary<string, object>>();
            DataSet xmlDS = new DataSet();
            xmlDS.ReadXml(string.Format(xmlPath, s, e));
            if (xmlDS != null && xmlDS.Tables.Count > 0 && xmlDS.Tables["segment"] != null)
            {
                DataTable dtSegment = xmlDS.Tables["segment"];
                if (dtSegment != null && dtSegment.Rows.Count > 0)
                {
                    DataRow[] drSegment = dtSegment.Select("segments_Id=0");
                    foreach (DataRow item in drSegment)
                    {
                        Dictionary<string, object> dict = new Dictionary<string, object>();
                        dict.Add("Start", item["start_stat"]);
                        dict.Add("End", item["end_stat"]);
                        dict.Add("LineName", item["line_name"]);
                        dict.Add("Stats", item["stats"]);
                        dict.Add("LineDist", item["line_dist"]);
                        dict.Add("FootDist", item["foot_dist"]);
                        listResult.Add(dict);
                    }
                }
            }
            ViewBag.ListResult = listResult;
            return View();
        }

        [HttpPost, AjaxFilter]
        public ActionResult TransitSearch(string s, string e)
        {
            HandleResult hr = new HandleResult();
            if (string.IsNullOrEmpty(s) || string.IsNullOrEmpty(e))
            {
                hr.Message = "请输入起点和终点";
                return Json(hr);
            }
            Random rnd = new Random();
            string xmlPath = "http://www.szmc.net/szmc/minxl?&startcode={0}&endcode={1}&_=0." + rnd.Next(1000000000);
            List<Dictionary<string, object>> listResult = new List<Dictionary<string, object>>();
            DataSet xmlDS = new DataSet();
            xmlDS.ReadXml(string.Format(xmlPath, s, e));
            if (xmlDS != null && xmlDS.Tables.Count > 0 && xmlDS.Tables["data"] != null)
            {
                DataTable dtSegment = xmlDS.Tables["data"];
                if (dtSegment != null && dtSegment.Rows.Count > 0)
                {
                    foreach (DataRow item in dtSegment.Rows)
                    {
                        Dictionary<string, object> dict = new Dictionary<string, object>();
                        dict.Add("site", item["site"]);
                        dict.Add("sitename", item["sitename"]);
                        dict.Add("sitename2", item["sitename2"]);
                        dict.Add("exsite", item["exsite"]);
                        dict.Add("exsitename", item["exsitename"]);
                        dict.Add("distance", item["distance"]);
                        dict.Add("period", item["period"]);
                        dict.Add("sitecount", item["sitecount"]);
                        dict.Add("price", item["price"]);
                        listResult.Add(dict);
                    }
                }
            }
            hr.StatsCode = 200;
            hr.Data = listResult.Count > 0 ? listResult[0] : null;
            hr.Message = "sucess";
            return Json(hr);
        }
	}
}