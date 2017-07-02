using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace du720.Entity
{
    public class HandleResult
    {
        public HandleResult(int stats, string message)
        {
            this.StatsCode = stats;
            this.Message = message;
        }

        public HandleResult(int stats, string message, object data)
        {
            this.StatsCode = stats;
            this.Message = message;
            this.Data = data;
        }

        public HandleResult()
        {
            this.StatsCode = 500;
            this.Message = "system error";
        }

        /// <summary>
        /// 成功的结果
        /// </summary>
        /// <param name="listData">listData</param>
        /// <param name="totalCount">totalCount</param>
        /// <param name="pageSize">pageSize</param>
        /// <returns></returns>
        public static HandleResult SuccessResult(object listData, int totalCount, int pageSize)
        {
            var data = new
            {
                list = listData,
                recordCount = totalCount,
                pageSize = pageSize
            };
            HandleResult hr = new HandleResult()
            {
                Data = data,
                Message = "success",
                Success = true,
                StatsCode = 200
            };
            return hr;
        }

        /// <summary>
        /// 响应状态码
        /// </summary>
        public int StatsCode { get; set; }

        /// <summary>
        /// 响应消息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 响应数据
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// 是否成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 其它数据
        /// </summary>
        public string Other { get; set; }
    }
}
