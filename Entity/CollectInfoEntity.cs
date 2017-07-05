using System;
namespace du720.Entity
{
    /// <summary>
    /// 数据表CollectInfo的实体类
    /// </summary>
    [Serializable]
    public class CollectInfoEntity
    {
        #region Private Parameters
        private int _Id;
        private int _CollectType;
        private string _UserName;
        private string _Phone;
        private string _Reason;
        private DateTime _AddTime;
        #endregion

        #region Public Properties

        public int Id
        {
            get { return this._Id; }
            set { this._Id = value; }
        }

        /// <summary>
        /// 征集类型
        /// </summary>
        public int CollectType
        {
            get { return this._CollectType; }
            set { this._CollectType = value; }
        }

        public string UserName
        {
            get { return this._UserName; }
            set { this._UserName = value; }
        }

        public string Phone
        {
            get { return this._Phone; }
            set { this._Phone = value; }
        }

        public string Reason
        {
            get { return this._Reason; }
            set { this._Reason = value; }
        }

        public DateTime AddTime
        {
            get { return this._AddTime; }
            set { this._AddTime = value; }
        }

        #endregion
    }
}
