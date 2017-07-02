using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace du720.AdminBLL.Attribute
{
    public class AuthenticationTicket
    {
        public AuthenticationTicket()
        {

        }

        public AuthenticationTicket(string name, bool isPersistent, int timeout)
        {
            Version = 2;
            Name = name;
            IsPersistent = isPersistent;
            IsSueDate = DateTime.Now;
            Expiration = DateTime.Now.AddMinutes(timeout);
        }
        public AuthenticationTicket(string name, DateTime isSueDate, DateTime expiration, bool isPersistent, string userData)
        {
            Version = 2;
            Name = name;
            IsPersistent = isPersistent;
            IsSueDate = isSueDate;
            Expiration = expiration;
            UserData = userData;
        }
        public int Version { get; set; }
        public string Name { get; set; }
        public DateTime IsSueDate { get; set; }
        public DateTime Expiration { get; set; }
        public bool IsPersistent { get; set; }
        public string UserData { get; set; }

        public string ToJson()
        {
            var js = new System.Web.Script.Serialization.JavaScriptSerializer();
            var json = js.Serialize(this);
            return json;
        }
    }
}
