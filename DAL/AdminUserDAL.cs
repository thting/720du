using System.Data;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using YiTu.DBUtility;
using du720.Entity;

namespace du720.DAL
{
    public partial class AdminUserDAL
    {
        public static AdminUserEntity GetByUserName(string username)
        {
            AdminUserEntity entity = null;
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@username", SqlDbType.NVarChar, 50, ParameterDirection.Input, username));
            string sql = "select * from AdminUser where username = @username";
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, sql, commandParms))
            {
                if (reader.Read())
                {
                    entity = ConvertToEntityFromDataReader(reader);
                }
            }

            return entity;
        }
    }
}
