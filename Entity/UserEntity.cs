using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace du720.Entity
{
    /// <summary>
    /// 数据表User的实体类
    /// </summary>
    [Serializable]
    public class UserEntity
    {
        #region Private Parameters
        private int _UserID;
        private string _UserName;
        private string _Password;
        private int _RoleID;
        #endregion

        #region Public Properties

        public int UserID
        {
            get { return this._UserID; }
            set { this._UserID = value; }
        }

        public string UserName
        {
            get { return this._UserName; }
            set { this._UserName = value; }
        }

        public string Password
        {
            get { return this._Password; }
            set { this._Password = value; }
        }

        public int RoleID
        {
            get { return this._RoleID; }
            set { this._RoleID = value; }
        }

        #endregion
    }
}
