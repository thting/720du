using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace du720.Entity
{
    /// <summary>
    /// 分页参数设置
    /// </summary>
    public sealed class PageSet
    {
        public PageSet()
        {
            this.PageIndex = 1;
            this.PageSize = 10;
        }

        /// <summary>
        /// 当前页面序号
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// 每页显示的记录数
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// 总页数
        /// </summary>
        public int PageCount { get; set; }

        /// <summary>
        /// 总记录数
        /// </summary>
        public int RecordCount { get; set; }
    }
}
