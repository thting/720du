using du720.DAL;
using du720.Entity;
namespace du720.BLL
{
    /// <summary>
    /// 数据表AdminUser的业务逻辑类
    /// </summary>
    public class AdminUserBLL
    {
        public static AdminUserEntity GetLoginByName(string username)
        {
            return AdminUserDAL.GetByUserName(username);
        }
    }
}
