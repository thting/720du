using System;
namespace du720.Entity
{
    /// <summary>
    /// 数据表AdminUser的实体类
    /// </summary>
    [Serializable]
    public class AdminUserEntity
    {
        #region Private Parameters
        private int _Id;
        private string _UserName;
        private string _PassWord;
        private DateTime _AddTime;
        #endregion

        #region Public Properties

        public int Id
        {
            get { return this._Id; }
            set { this._Id = value; }
        }

        public string UserName
        {
            get { return this._UserName; }
            set { this._UserName = value; }
        }

        public string PassWord
        {
            get { return this._PassWord; }
            set { this._PassWord = value; }
        }

        public DateTime AddTime
        {
            get { return this._AddTime; }
            set { this._AddTime = value; }
        }

        #endregion
    }
}
