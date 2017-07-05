using du720.BLL;
using du720.Common;
using du720.Entity;
using du720.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace du720.Controllers
{
    public class ShopController : Controller
    {
        //
        // GET: /Shop/
        public ActionResult Index(int id = 0, int type = 0)
        {
            ViewBag.StationId = id;
            ViewBag.ShopType = type;
            return View();
        }

        [HttpPost, AjaxFilter]
        public ActionResult GetList(int page, int stationId, int shopType)
        {
            HandleResult hr = new HandleResult();
            if (page < 1)
            {
                page = 1;
            }
            if (stationId < 0 || shopType < 0)
            {
                hr.Message = "参数错误";
                return Json(hr);
            }
            if (shopType <= 0)
            {
                shopType = Enums.eShopType.地铁商铺.GetHashCode();
            }
            PageSet pageSet = new PageSet() { PageIndex = page, PageSize = 20 };
            List<ShopListEntity> list = ShopListBLL.GetPageList(stationId, shopType, pageSet);
            List<Dictionary<string, object>> listResult = new List<Dictionary<string, object>>();
            foreach (var item in list)
            {
                Dictionary<string, object> dict = new Dictionary<string, object>();
                dict.Add("Id", item.Id);
                dict.Add("StationId", item.StationId);
                dict.Add("ShopType", item.ShopType);
                dict.Add("ShopImageUrl", item.ShopImageUrl);
                dict.Add("ShopName", item.ShopName);
                dict.Add("Title", item.Title);
                dict.Add("Summury", item.Summury);
                dict.Add("ShopNo", item.ShopNo);
                dict.Add("Address", item.Address);
                dict.Add("AddTime", item.AddTime);
                listResult.Add(dict);
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

        /// <summary>
        /// 商铺详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Detail(int id)
        {
            ShopListEntity entity = ShopListBLL.GetById(id);
            if (entity == null)
            {
                return Content("商铺不存在");
            }
            return View(entity);
        }

        /// <summary>
        /// 兑换券详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Coupon(int id)
        {
            ShopListEntity entity = ShopListBLL.GetById(id);
            if (entity == null)
            {
                return Content("商铺不存在");
            }
            string code = Commons.GenerateExchangeCode();
            ExchangeCodeBLL.Insert(entity.Id, code);
            ViewBag.Code = code;
            return View(entity);
        }
	}
}