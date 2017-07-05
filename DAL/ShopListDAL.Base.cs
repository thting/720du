using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using YiTu.DBUtility;
namespace du720.DAL
{
    /// <summary>
    /// 数据表ShopList的数据操作类
    /// </summary>
    public partial class ShopListDAL
    {
        #region ConstVariables
        private const string C_TABLE_NAME = "ShopList";
        private const string C_SP_SHOPLIST_FIELDS = "[Id],[StationId],[ShopType],[ShopImageUrl],[ShopName],[Title],[Summury],[ShopNo],[Address],[AddTime],[Operateuser]";
        private const string C_SP_SHOPLIST_INSERT = "INSERT INTO [ShopList]([StationId],[ShopType],[ShopImageUrl],[ShopName],[Title],[Summury],[ShopNo],[Address],[AddTime],[Operateuser]) VALUES(@StationId,@ShopType,@ShopImageUrl,@ShopName,@Title,@Summury,@ShopNo,@Address,@AddTime,@Operateuser);SET @Id = SCOPE_IDENTITY();";
        private const string C_SP_SHOPLIST_UPDATE = "UPDATE [ShopList] SET [StationId]=@StationId,[ShopType]=@ShopType,[ShopImageUrl]=@ShopImageUrl,[ShopName]=@ShopName,[Title]=@Title,[Summury]=@Summury,[ShopNo]=@ShopNo,[Address]=@Address,[AddTime]=@AddTime,[Operateuser]=@Operateuser WHERE [Id] = @Id";
        private const string C_SP_SHOPLIST_DELETE = "DELETE [ShopList] WHERE [Id] = @Id";
        private const string C_SP_SHOPLIST_GET = "SELECT [Id],[StationId],[ShopType],[ShopImageUrl],[ShopName],[Title],[Summury],[ShopNo],[Address],[AddTime],[Operateuser] FROM [ShopList] WHERE [Id] = @Id";
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
        private ShopListDAL() { }

        /// <summary>
        /// 向数据表中插入一条新记录
        /// </summary>
        /// <param name="entity">Entity.ShopListEntity实体类</param>
        /// <remarks>如果表存在自增长字段，插入记录成功后自增长字段值会更新至实体</remarks>
        public static void Insert(Entity.ShopListEntity entity)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();
            SqlParameter id_Id = SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Output, null);
            commandParms.Add(id_Id);
            commandParms.Add(SqlHelper.CreateParam("@StationId", SqlDbType.Int, 0, ParameterDirection.Input, entity.StationId));
            commandParms.Add(SqlHelper.CreateParam("@ShopType", SqlDbType.Int, 0, ParameterDirection.Input, entity.ShopType));
            commandParms.Add(SqlHelper.CreateParam("@ShopImageUrl", SqlDbType.VarChar, 200, ParameterDirection.Input, entity.ShopImageUrl));
            commandParms.Add(SqlHelper.CreateParam("@ShopName", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.ShopName));
            commandParms.Add(SqlHelper.CreateParam("@Title", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.Title));
            commandParms.Add(SqlHelper.CreateParam("@Summury", SqlDbType.NVarChar, 100, ParameterDirection.Input, entity.Summury));
            commandParms.Add(SqlHelper.CreateParam("@ShopNo", SqlDbType.VarChar, 10, ParameterDirection.Input, entity.ShopNo));
            commandParms.Add(SqlHelper.CreateParam("@Address", SqlDbType.NVarChar, 100, ParameterDirection.Input, entity.Address));
            commandParms.Add(SqlHelper.CreateParam("@AddTime", SqlDbType.DateTime, 0, ParameterDirection.Input, entity.AddTime));
            commandParms.Add(SqlHelper.CreateParam("@Operateuser", SqlDbType.NVarChar, 10, ParameterDirection.Input, entity.Operateuser));

            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_SHOPLIST_INSERT, commandParms);
            entity.Id = Convert.ToInt32(id_Id.Value);
        }

        /// <summary>
        /// 获取数据库一条记录实体(根据主键条件)
        /// </summary>
        /// <param name="id">主键字段id</param>
        /// <returns>Entity.ShopListEntity实体类</returns>
        public static Entity.ShopListEntity GetById(int id)
        {
            Entity.ShopListEntity entity = null;
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Input, id));

            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, C_SP_SHOPLIST_GET, commandParms))
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
        /// <param name="entity">Entity.ShopListEntity实体类</param>
        public static void Update(Entity.ShopListEntity entity)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();

            commandParms.Add(SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Input, entity.Id));
            commandParms.Add(SqlHelper.CreateParam("@StationId", SqlDbType.Int, 0, ParameterDirection.Input, entity.StationId));
            commandParms.Add(SqlHelper.CreateParam("@ShopType", SqlDbType.Int, 0, ParameterDirection.Input, entity.ShopType));
            commandParms.Add(SqlHelper.CreateParam("@ShopImageUrl", SqlDbType.VarChar, 200, ParameterDirection.Input, entity.ShopImageUrl));
            commandParms.Add(SqlHelper.CreateParam("@ShopName", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.ShopName));
            commandParms.Add(SqlHelper.CreateParam("@Title", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.Title));
            commandParms.Add(SqlHelper.CreateParam("@Summury", SqlDbType.NVarChar, 100, ParameterDirection.Input, entity.Summury));
            commandParms.Add(SqlHelper.CreateParam("@ShopNo", SqlDbType.VarChar, 10, ParameterDirection.Input, entity.ShopNo));
            commandParms.Add(SqlHelper.CreateParam("@Address", SqlDbType.NVarChar, 100, ParameterDirection.Input, entity.Address));
            commandParms.Add(SqlHelper.CreateParam("@AddTime", SqlDbType.DateTime, 0, ParameterDirection.Input, entity.AddTime));
            commandParms.Add(SqlHelper.CreateParam("@Operateuser", SqlDbType.NVarChar, 10, ParameterDirection.Input, entity.Operateuser));

            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_SHOPLIST_UPDATE, commandParms);
        }

        /// <summary>
        /// 删除数据库中一条记录(根据主键条件)
        /// </summary>
        /// <param name="id">主键字段id</param>
        public static void Delete(int id)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Input, id));
            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_SHOPLIST_DELETE, commandParms);
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
                dataFields = C_SP_SHOPLIST_FIELDS;
            }
            return SqlListHepler.Search(ConnectionString, C_TABLE_NAME, dataFields, whereClause, orderBy, startRowIndex, maximumRows);
        }


        /// <summary>
        /// 按条件查询数据表,返回 Entity.ShopListEntity 数据集
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="orderBy">SQL排序语句(不能为空)，不须带"Order By"关键字</param>
        /// <param name="startRowIndex">记录开始索引，从0开始</param>
        /// <param name="maximumRows">返回记录数量</param>
        public static List<Entity.ShopListEntity> Search(string whereClause, string orderBy, int startRowIndex, int maximumRows)
        {
            List<Entity.ShopListEntity> list = new List<Entity.ShopListEntity>();
            using (SqlDataReader reader = SqlListHepler.SearchDataReader(ConnectionString, C_TABLE_NAME, C_SP_SHOPLIST_FIELDS, whereClause, orderBy, startRowIndex, maximumRows))
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
                dataFields = C_SP_SHOPLIST_FIELDS;
            }
            return SqlListHepler.Search(ConnectionString, C_TABLE_NAME, dataFields, whereClause, orderBy, rowsToReturn);
        }

        /// <summary>
        /// 按条件查询数据表,返回 Entity.ShopListEntity 数据集
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="orderBy">SQL排序语句(可为空)，不须带"Order By"关键字</param>
        /// <param name="rowsToReturn">返回记录数量</param>
        public static List<Entity.ShopListEntity> Search(string whereClause, string orderBy, int rowsToReturn)
        {
            List<Entity.ShopListEntity> list = new List<Entity.ShopListEntity>();
            using (SqlDataReader reader = SqlListHepler.SearchDataReader(ConnectionString, C_TABLE_NAME, C_SP_SHOPLIST_FIELDS, whereClause, orderBy, rowsToReturn))
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
        private static Entity.ShopListEntity ConvertToEntityFromDataRow(DataRow row)
        {
            Entity.ShopListEntity entity = new Entity.ShopListEntity();
            entity.Id = Convert.ToInt32(row["Id"]);
            entity.StationId = Convert.ToInt32(row["StationId"]);
            entity.ShopType = Convert.ToInt32(row["ShopType"]);
            if (Convert.IsDBNull(row["ShopImageUrl"])) entity.ShopImageUrl = null; else entity.ShopImageUrl = row["ShopImageUrl"].ToString();
            entity.ShopName = row["ShopName"].ToString();
            entity.Title = row["Title"].ToString();
            if (Convert.IsDBNull(row["Summury"])) entity.Summury = null; else entity.Summury = row["Summury"].ToString();
            entity.ShopNo = row["ShopNo"].ToString();
            if (Convert.IsDBNull(row["Address"])) entity.Address = null; else entity.Address = row["Address"].ToString();
            entity.AddTime = Convert.ToDateTime(row["AddTime"]);
            entity.Operateuser = row["Operateuser"].ToString();

            return entity;
        }

        /// <summary>
        /// 转换SqlDataReader类型数据记录为实体
        /// </summary>
        private static Entity.ShopListEntity ConvertToEntityFromDataReader(SqlDataReader reader)
        {
            Entity.ShopListEntity entity = new Entity.ShopListEntity();
            entity.Id = Convert.ToInt32(reader["Id"]);
            entity.StationId = Convert.ToInt32(reader["StationId"]);
            entity.ShopType = Convert.ToInt32(reader["ShopType"]);
            if (Convert.IsDBNull(reader["ShopImageUrl"])) entity.ShopImageUrl = null; else entity.ShopImageUrl = reader["ShopImageUrl"].ToString();
            entity.ShopName = reader["ShopName"].ToString();
            entity.Title = reader["Title"].ToString();
            if (Convert.IsDBNull(reader["Summury"])) entity.Summury = null; else entity.Summury = reader["Summury"].ToString();
            entity.ShopNo = reader["ShopNo"].ToString();
            if (Convert.IsDBNull(reader["Address"])) entity.Address = null; else entity.Address = reader["Address"].ToString();
            entity.AddTime = Convert.ToDateTime(reader["AddTime"]);
            entity.Operateuser = reader["Operateuser"].ToString();

            return entity;
        }

    }
}
