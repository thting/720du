using System;
namespace du720.Entity
{
    /// <summary>
    /// 数据表ExchangeCode的实体类
    /// </summary>
    [Serializable]
    public class ExchangeCodeEntity
    {
        #region Private Parameters
        private int _Id;
        private int _ShopId;
        private string _ExchangeCode;
        #endregion

        #region Public Properties

        public int Id
        {
            get { return this._Id; }
            set { this._Id = value; }
        }

        /// <summary>
        /// 商铺id
        /// </summary>
        public int ShopId
        {
            get { return this._ShopId; }
            set { this._ShopId = value; }
        }

        public string ExchangeCode
        {
            get { return this._ExchangeCode; }
            set { this._ExchangeCode = value; }
        }

        #endregion
    }
}
