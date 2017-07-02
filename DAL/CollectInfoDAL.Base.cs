﻿using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using YiTu.DBUtility;
namespace du720.DAL
{
    /// <summary>
    /// 数据表CollectInfo的数据操作类
    /// </summary>
    public partial class CollectInfoDAL
    {
        #region ConstVariables
        private const string C_TABLE_NAME = "CollectInfo";
        private const string C_SP_COLLECTINFO_FIELDS = "[Id],[CollectType],[UserName],[Phone],[Reason]";
        private const string C_SP_COLLECTINFO_INSERT = "INSERT INTO [CollectInfo]([CollectType],[UserName],[Phone],[Reason]) VALUES(@CollectType,@UserName,@Phone,@Reason);SET @Id = SCOPE_IDENTITY();";
        private const string C_SP_COLLECTINFO_UPDATE = "UPDATE [CollectInfo] SET [CollectType]=@CollectType,[UserName]=@UserName,[Phone]=@Phone,[Reason]=@Reason WHERE [Id] = @Id";
        private const string C_SP_COLLECTINFO_DELETE = "DELETE [CollectInfo] WHERE [Id] = @Id";
        private const string C_SP_COLLECTINFO_GET = "SELECT [Id],[CollectType],[UserName],[Phone],[Reason] FROM [CollectInfo] WHERE [Id] = @Id";
        #endregion

        private static string ConnectionString
        {
            get
            {
                return System.Configuration.ConfigurationManager.ConnectionStrings["DU720"].ConnectionString;
            }
        }

        /// <summary>
        /// 默认构造函数
        /// </summary>
        private CollectInfoDAL() { }

        /// <summary>
        /// 向数据表中插入一条新记录
        /// </summary>
        /// <param name="entity">Entity.CollectInfoEntity实体类</param>
        /// <remarks>如果表存在自增长字段，插入记录成功后自增长字段值会更新至实体</remarks>
        public static void Insert(Entity.CollectInfoEntity entity)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();
            SqlParameter id_Id = SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Output, null);
            commandParms.Add(id_Id);
            commandParms.Add(SqlHelper.CreateParam("@CollectType", SqlDbType.Int, 0, ParameterDirection.Input, entity.CollectType));
            commandParms.Add(SqlHelper.CreateParam("@UserName", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.UserName));
            commandParms.Add(SqlHelper.CreateParam("@Phone", SqlDbType.VarChar, 11, ParameterDirection.Input, entity.Phone));
            commandParms.Add(SqlHelper.CreateParam("@Reason", SqlDbType.NVarChar, 200, ParameterDirection.Input, entity.Reason));

            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_COLLECTINFO_INSERT, commandParms);
            entity.Id = Convert.ToInt32(id_Id.Value);
        }

        /// <summary>
        /// 获取数据库一条记录实体(根据主键条件)
        /// </summary>
        /// <param name="id">主键字段id</param>
        /// <returns>Entity.CollectInfoEntity实体类</returns>
        public static Entity.CollectInfoEntity GetById(int id)
        {
            Entity.CollectInfoEntity entity = null;
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Input, id));

            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, C_SP_COLLECTINFO_GET, commandParms))
            {
                if (reader.Read())
                {
                    entity = ConvertToEntityFromDataReader(reader);
                }
            }

            return entity;
        }

        /// <summary>
        /// 更新数据库中一条记录(根据主键条件)
        /// </summary>
        /// <param name="entity">Entity.CollectInfoEntity实体类</param>
        public static void Update(Entity.CollectInfoEntity entity)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();

            commandParms.Add(SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Input, entity.Id));
            commandParms.Add(SqlHelper.CreateParam("@CollectType", SqlDbType.Int, 0, ParameterDirection.Input, entity.CollectType));
            commandParms.Add(SqlHelper.CreateParam("@UserName", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.UserName));
            commandParms.Add(SqlHelper.CreateParam("@Phone", SqlDbType.VarChar, 11, ParameterDirection.Input, entity.Phone));
            commandParms.Add(SqlHelper.CreateParam("@Reason", SqlDbType.NVarChar, 200, ParameterDirection.Input, entity.Reason));

            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_COLLECTINFO_UPDATE, commandParms);
        }

        /// <summary>
        /// 删除数据库中一条记录(根据主键条件)
        /// </summary>
        /// <param name="id">主键字段id</param>
        public static void Delete(int id)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Input, id));
            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_COLLECTINFO_DELETE, commandParms);
        }

        /// <summary>
        /// 按条件查询数据表,返回DataTable类型数据
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="dataFields">需返回字段(不能为空,为"*"则返回所有字段)</param>
        /// <param name="orderBy">SQL排序语句(不能为空)，不须带"Order By"关键字</param>
        /// <param name="startRowIndex">记录开始索引，从0开始</param>
        /// <param name="maximumRows">返回记录数量</param>
        /// <returns>DataTable</returns>
        public static DataTable SearchDT(string whereClause, string dataFields, string orderBy, int startRowIndex, int maximumRows)
        {
            if (dataFields.Trim() == "*")
            {
                dataFields = C_SP_COLLECTINFO_FIELDS;
            }
            return SqlListHepler.Search(ConnectionString, C_TABLE_NAME, dataFields, whereClause, orderBy, startRowIndex, maximumRows);
        }


        /// <summary>
        /// 按条件查询数据表,返回 Entity.CollectInfoEntity 数据集
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="orderBy">SQL排序语句(不能为空)，不须带"Order By"关键字</param>
        /// <param name="startRowIndex">记录开始索引，从0开始</param>
        /// <param name="maximumRows">返回记录数量</param>
        public static List<Entity.CollectInfoEntity> Search(string whereClause, string orderBy, int startRowIndex, int maximumRows)
        {
            List<Entity.CollectInfoEntity> list = new List<Entity.CollectInfoEntity>();
            using (SqlDataReader reader = SqlListHepler.SearchDataReader(ConnectionString, C_TABLE_NAME, C_SP_COLLECTINFO_FIELDS, whereClause, orderBy, startRowIndex, maximumRows))
            {
                while (reader.Read())
                {
                    list.Add(ConvertToEntityFromDataReader(reader));
                }
            }
            return list;
        }

        /// <summary>
        /// 按条件查询数据表,返回DataTable类型数据
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="dataFields">需返回字段(不能为空,为"*"则返回所有字段)</param>
        /// <param name="orderBy">SQL排序语句(可为空)，不须带"Order By"关键字</param>
        /// <param name="rowsToReturn">返回记录数量</param>
        /// <returns>DataTable</returns>
        public static DataTable SearchDT(string whereClause, string dataFields, string orderBy, int rowsToReturn)
        {
            if (dataFields.Trim() == "*")
            {
                dataFields = C_SP_COLLECTINFO_FIELDS;
            }
            return SqlListHepler.Search(ConnectionString, C_TABLE_NAME, dataFields, whereClause, orderBy, rowsToReturn);
        }

        /// <summary>
        /// 按条件查询数据表,返回 Entity.CollectInfoEntity 数据集
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="orderBy">SQL排序语句(可为空)，不须带"Order By"关键字</param>
        /// <param name="rowsToReturn">返回记录数量</param>
        public static List<Entity.CollectInfoEntity> Search(string whereClause, string orderBy, int rowsToReturn)
        {
            List<Entity.CollectInfoEntity> list = new List<Entity.CollectInfoEntity>();
            using (SqlDataReader reader = SqlListHepler.SearchDataReader(ConnectionString, C_TABLE_NAME, C_SP_COLLECTINFO_FIELDS, whereClause, orderBy, rowsToReturn))
            {
                while (reader.Read())
                {
                    list.Add(ConvertToEntityFromDataReader(reader));
                }
            }
            return list;
        }

        /// <summary>
        /// 按条件获取记录数量
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <returns>int整型数据</returns>
        public static int SearchCount(string whereClause)
        {
            return SqlListHepler.SearchCount(ConnectionString, C_TABLE_NAME, whereClause);
        }

        /// <summary>
        /// 转换DataRow类型数据记录为实体
        /// </summary>
        private static Entity.CollectInfoEntity ConvertToEntityFromDataRow(DataRow row)
        {
            Entity.CollectInfoEntity entity = new Entity.CollectInfoEntity();
            entity.Id = Convert.ToInt32(row["Id"]);
            entity.CollectType = Convert.ToInt32(row["CollectType"]);
            entity.UserName = row["UserName"].ToString();
            entity.Phone = row["Phone"].ToString();
            entity.Reason = row["Reason"].ToString();

            return entity;
        }

        /// <summary>
        /// 转换SqlDataReader类型数据记录为实体
        /// </summary>
        private static Entity.CollectInfoEntity ConvertToEntityFromDataReader(SqlDataReader reader)
        {
            Entity.CollectInfoEntity entity = new Entity.CollectInfoEntity();
            entity.Id = Convert.ToInt32(reader["Id"]);
            entity.CollectType = Convert.ToInt32(reader["CollectType"]);
            entity.UserName = reader["UserName"].ToString();
            entity.Phone = reader["Phone"].ToString();
            entity.Reason = reader["Reason"].ToString();

            return entity;
        }

    }
}
