using System;
namespace du720.Entity
{
    /// <summary>
    /// 数据表ShopList的实体类
    /// </summary>
    [Serializable]
    public class ShopListEntity
    {
        #region Private Parameters
        private int _Id;
        private int _StationId;
        private int _ShopType;
        private string _ShopImageUrl;
        private string _ShopName;
        private string _Title;
        private string _Summury;
        private string _ShopNo;
        private string _Address;
        private DateTime _AddTime;
        private string _Operateuser;
        #endregion

        #region Public Properties

        public int Id
        {
            get { return this._Id; }
            set { this._Id = value; }
        }

        /// <summary>
        /// 站台ID
        /// </summary>
        public int StationId
        {
            get { return this._StationId; }
            set { this._StationId = value; }
        }

        /// <summary>
        /// 商铺分类
        /// </summary>
        public int ShopType
        {
            get { return this._ShopType; }
            set { this._ShopType = value; }
        }

        public string ShopImageUrl
        {
            get { return this._ShopImageUrl; }
            set { this._ShopImageUrl = value; }
        }

        /// <summary>
        /// 商铺名
        /// </summary>
        public string ShopName
        {
            get { return this._ShopName; }
            set { this._ShopName = value; }
        }

        /// <summary>
        /// 商铺标题
        /// </summary>
        public string Title
        {
            get { return this._Title; }
            set { this._Title = value; }
        }

        /// <summary>
        /// 商铺简介
        /// </summary>
        public string Summury
        {
            get { return this._Summury; }
            set { this._Summury = value; }
        }

        /// <summary>
        /// 商铺号
        /// </summary>
        public string ShopNo
        {
            get { return this._ShopNo; }
            set { this._ShopNo = value; }
        }

        /// <summary>
        /// 商铺地址
        /// </summary>
        public string Address
        {
            get { return this._Address; }
            set { this._Address = value; }
        }

        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime AddTime
        {
            get { return this._AddTime; }
            set { this._AddTime = value; }
        }

        /// <summary>
        /// 操作人
        /// </summary>
        public string Operateuser
        {
            get { return this._Operateuser; }
            set { this._Operateuser = value; }
        }

        #endregion
    }
}
