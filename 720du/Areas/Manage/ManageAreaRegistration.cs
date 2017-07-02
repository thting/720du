using System.Web.Mvc;

namespace du720.Areas.Manage
{
    public class ManageAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Manage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Manage_default",
                "Manage/{controller}/{action}/{id}",
                new { controller = "Login", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "du720.Manage.Controllers" }
            );
        }
    }
}