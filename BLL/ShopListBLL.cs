using du720.Common;
using du720.DAL;
using du720.Entity;
using System.Collections.Generic;
namespace du720.BLL
{
    /// <summary>
    /// 数据表ShopList的业务逻辑类
    /// </summary>
    public class ShopListBLL
    {
        public static ShopListEntity GetById(int id)
        {
            return ShopListDAL.GetById(id);
        }

        /// <summary>
        /// 获取列表-分页
        /// </summary>
        /// <param name="key"></param>        
        /// <param name="visible"></param>
        /// <returns></returns>
        public static List<ShopListEntity> GetPageList(int stationId, int shopType, PageSet pageSet)
        {
            string strWhere = string.Empty;
            if (stationId > 0)
            {
                strWhere += string.Format(" StationId={0} AND ", stationId);
            }
            if (shopType > 0)
            {
                strWhere += string.Format(" ShopType={0} AND ", shopType);
            }
            if (!string.IsNullOrEmpty(strWhere))
            {
                strWhere = strWhere.Remove(strWhere.Length - 4, 4);
            }
            pageSet.RecordCount = ShopListDAL.SearchCount(strWhere);
            return ShopListDAL.Search(strWhere, "Id desc", (pageSet.PageIndex - 1) * pageSet.PageSize, pageSet.PageSize);
        }
    }
}
