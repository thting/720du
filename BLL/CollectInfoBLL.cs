using du720.DAL;
using du720.Entity;
namespace du720.BLL
{
    /// <summary>
    /// 数据表CollectInfo的业务逻辑类
    /// </summary>
    public class CollectInfoBLL
    {
        /// <summary>
        /// 插入实体
        /// </summary>
        /// <param name="entity"></param>
        public static void Insert(CollectInfoEntity entity)
        {
            CollectInfoDAL.Insert(entity);
        }
    }
}
