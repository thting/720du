using du720.BLL;
using du720.Common;
using du720.Entity;
using du720.Filter;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace du720.Controllers
{
    public class FullShotController : Controller
    {
        /// <summary>
        /// 全景
        /// </summary>
        /// <param name="id">站点id</param>
        /// <returns></returns>
        public ActionResult Index(int id = 1)
        {
            if(!Enum.IsDefined(typeof(Enums.eStation), id))
            {
                return Content("站点不存在");
            }
            ViewBag.StationId = id;
            return View();
        }

        [HttpPost, AjaxFilter]
        public ActionResult GetImgList(int id = 1)
        {
            HandleResult hr = new HandleResult();
            if (!Enum.IsDefined(typeof(Enums.eStation), id))
            {
                id = Enums.eStation.清湖.GetHashCode();
            }
            string xmlPath = "/content/data/fullshot.xml";
            List<Dictionary<string, object>> listResult = new List<Dictionary<string, object>>();
            DataSet xmlDS = new DataSet();
            xmlDS.ReadXml(Server.MapPath(xmlPath));
            if (xmlDS != null && xmlDS.Tables.Count > 0)
            {
                DataTable dtXml = xmlDS.Tables[0];
                if (dtXml != null && dtXml.Rows.Count > 0)
                {
                    DataRow[] drXml = dtXml.Select("stationId=" + id);
                    foreach (DataRow item in drXml)
                    {
                        Dictionary<string, object> dict = new Dictionary<string, object>();
                        dict.Add("Title", item["name"]);
                        dict.Add("Imgs", "/content/" + item["imgs"]);
                        dict.Add("Img", "/content/" + item["img"]);
                        dict.Add("IsPlane", item["isPlane"]);
                        listResult.Add(dict);
                    }
                }
            }

            var data = new
            {
                list = listResult
            };

            hr.StatsCode = 200;
            hr.Data = data;
            hr.Message = "";
            return Json(hr);
        }
	}
}