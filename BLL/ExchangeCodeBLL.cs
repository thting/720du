using du720.DAL;
using du720.Entity;
namespace du720.BLL
{
    /// <summary>
    /// 数据表ExchangeCode的业务逻辑类
    /// </summary>
    public class ExchangeCodeBLL
    {
        /// <summary>
        /// 插入实体
        /// </summary>
        /// <param name="entity"></param>
        public static void Insert(int shopId, string code)
        {
            ExchangeCodeEntity entity = new ExchangeCodeEntity();
            entity.ShopId = shopId;
            entity.ExchangeCode = code;
            ExchangeCodeDAL.Insert(entity);
        }
    }
}
