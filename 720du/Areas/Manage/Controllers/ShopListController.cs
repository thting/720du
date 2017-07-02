using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using du720.Filter;
using du720.Entity;
using du720.Common;
using du720.BLL;

namespace du720.Manage.Controllers
{
    [AdminLoginFilter]
    public class ShopListController : Controller
    {
        /// <summary>
        /// 商铺列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult List()
        {
            return View();
        }

        /// <summary>
        /// 商铺列表
        /// </summary>
        /// <returns></returns>
        [HttpPost, AjaxFilter]
        public ActionResult GetList(int stationId, int shopType, int page = 1, int pageSize = 10)
        {
            HandleResult hr = new HandleResult();
            PageSet pageSet = new PageSet() { PageIndex = page, PageSize = pageSize };
            ViewBag.Data = null;
            List<ShopListEntity> list = ShopListBLL.GetPageList(stationId, shopType, pageSet);
            ViewBag.Data = list;
            ViewBag.RecordCount = pageSet.RecordCount;
            ViewBag.TotalPage = Math.Ceiling(pageSet.RecordCount / (pageSet.PageSize * 1.0));
            return PartialView("PartialList");
        }


        ///// <summary>
        ///// 使用或删除焦点图片
        ///// </summary>
        ///// <param name="id"></param>
        ///// <param name="visible"></param>
        ///// <returns></returns>
        //[HttpPost, AjaxFilter]
        //public ActionResult SetVisible(int id, int visible)
        //{
        //    HandleResult hr = new HandleResult();
        //    visible = visible == 0 ? 1 : 0;//状态转化
        //    FocusImageBLL.SetVisible(id, visible);
        //    hr.StatsCode = 200;
        //    hr.Message = "操作成功";
        //    return Content(JsonConvert.SerializeObject(hr));
        //}

        ///// <summary>
        ///// 新增或编辑焦点图片
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        //[HttpGet]
        //public ActionResult Add(int id = 0)
        //{
        //    FocusImageEntity entity = null;
        //    int FocusImageId = 0;
        //    if (id > 0)
        //    {
        //        FocusImageId = id;
        //        entity = FocusImageBLL.GetById(FocusImageId);
        //        if (entity == null)
        //        {
        //            return Redirect("/error404.htm");
        //        }
        //    }
        //    ViewBag.Entity = entity;
        //    ViewBag.Id = FocusImageId;
        //    return View();

        //}


        ///// <summary>
        ///// 保存新增或编辑焦点图片
        ///// </summary>
        ///// <param name="collection"></param>
        ///// <returns></returns>
        //[HttpPost, JsonException, ValidateInput(false)]
        //public ActionResult Add(FormCollection collection)
        //{
        //    HandleResult hr = new HandleResult();
        //    FocusImageEntity entity = new FocusImageEntity();
        //    int id = ConvertHelper.StringToInt(collection["hidId"]);//主键id
        //    if (id > 0)
        //    {
        //        entity = FocusImageBLL.GetById(id);
        //    }
        //    hr = CheckInfo(collection, entity);
        //    if (hr.StatsCode == 500)
        //    {
        //        return Content(JsonConvert.SerializeObject(hr));
        //    }
        //    if (id > 0)
        //    {
        //        //修改
        //        FocusImageBLL.Update(entity);
        //        hr.Message = "修改成功";
        //    }
        //    else
        //    {
        //        entity.AddTime = DateTime.Now;
        //        entity.Operator = Authentication.GetUserEntity().UserName;
        //        entity.Visible = 1; 

        //        FocusImageBLL.Insert(entity);
        //        hr.Message = "添加成功";
        //    }
        //    hr.StatsCode = 200;
        //    return Content(JsonConvert.SerializeObject(hr));
        //}

        ///// <summary>
        ///// 检查信息
        ///// </summary>
        ///// <param name="collection"></param>
        ///// <param name="entity"></param>
        ///// <returns></returns>
        //private HandleResult CheckInfo(FormCollection collection, FocusImageEntity entity)
        //{
        //    HandleResult hr = new HandleResult();

        //    if (string.IsNullOrEmpty(collection["txtRemark"].Trim()))
        //    {
        //        hr.Message = "图片描述不能为空";
        //        return hr;
        //    }
        //    if (collection["txtRemark"].Trim().Length > 20)
        //    {
        //        hr.Message = "图片描述长度不能大于20，现已输入：" + collection["txtRemark"].Trim().Length;
        //        return hr;
        //    }
        //    entity.Remark = collection["txtRemark"].Trim();
           
        //    if (string.IsNullOrEmpty(collection["txtLinkUrl"].Trim()))
        //    {
        //        hr.Message = "链接地址不能为空";
        //        return hr;
        //    }
        //    entity.LinkUrl = collection["txtLinkUrl"].Trim();

        //    entity.Sort = ConvertHelper.StringToInt(collection["txtSort"]);
        //    if (entity.Sort == 0)
        //    {
        //        hr.Message = "排序必须大于0";
        //        return hr;
        //    }

        //    if (string.IsNullOrEmpty(collection["txtImagePath"].Trim()))
        //    {
        //        hr.Message = "图片没有上传";
        //        return hr;
        //    }
        //    entity.ImageUrl = collection["txtImagePath"].Trim();

        //    if (string.IsNullOrEmpty(collection["txtColorValue"].Trim()))
        //    {
        //        hr.Message = "颜色没有确定";
        //        return hr;
        //    }
        //    entity.ColorValue = collection["txtColorValue"].Trim();
          
        //    entity.Operator = SZHome.Gold.BLL.Attribute.Authentication.GetUserEntity().UserName;
        //    if (entity.Id == 0)//添加
        //    {
        //        entity.AddTime = DateTime.Now;
        //        entity.Visible = 1;
        //    }
        //    hr.StatsCode = 200;
        //    return hr;
        //}

    }
}