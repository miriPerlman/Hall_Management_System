using BL.Api;
using Dal.models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController : Controller
    {
            IBLdish dishActions;
            public DishController(IBlManager bl)
            {
            dishActions = bl.Bldish;
            }

    [HttpPost]
            public ActionResult<Dish> CreateNewDish([FromBody] Dish dish)
            {
            dishActions.Create(dish);
                return dish;
            }
        }
}
